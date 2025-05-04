import { useState, useEffect, useRef } from "react";
const imgURL = {
  player: "/images/spaceInvaders/playerShip1_green.webp",
  invader: "/images/spaceInvaders/invader.webp",
};

function SpaceInvaders({ onClose }) {
  const canvasRef = useRef(null);
  const canvasSize = {
    width: 1260,
    height: 690,
  };

  const [isGameRunning, setIsGameRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const playerImageRef = useRef(new Image());
  const playerScale = 0.5;
  const playerConfig = {
    width: 99 * playerScale,
    height: 75 * playerScale,
    speed: 5,
  };
  const playerRotationRef = useRef(0);
  const [playerX, setPlayerX] = useState(0);
  const playerXRef = useRef(playerX);

  const [lives, setLives] = useState(3);
  const livesRef = useRef(3);

  const lastShotTimeRef = useRef(0);
  const projectilesRef = useRef([]);
  const projectileConfig = {
    cooldown: 200,
    radius: 4,
    speed: 7,
  };

  const invaderImageRef = useRef(new Image());
  const invaderScale = 1;
  const invaderConfig = {
    width: 30 * invaderScale,
    height: 30 * invaderScale,
    maxSpeed: 3,
    minSpeed: 2,
  };
  const invaderGridsRef = useRef([]);

  const invaderProjectilesRef = useRef([]);
  const invaderProjectileConfig = {
    width: 4,
    height: 12,
    speed: 4,
    frame: 100,
  };

  const [score, setScore] = useState(0);
  const scoreParams = {
    single: 10,
    grid: 50,
  };

  const particlesRef = useRef([]);
  const backgroundParticlesRef = useRef([]);
  const invaderParticles = {
    color: "#BAA0DE",
    opacity: 0.4,
    count: 20,
  };
  const playerParticles = {
    color: "white",
    opacity: 1,
    count: 25,
  };

  function createExplosion(x, y, { color, count, opacity }) {
    for (let i = 0; i < count; i++) {
      particlesRef.current.push({
        x,
        y,
        radius: Math.random() * 3 + 1,
        color,
        velocity: {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
        },
        opacity,
      });
    }
  }

  useEffect(() => {
    playerXRef.current = playerX;
    livesRef.current = lives;
  }, [playerX, lives]);

  useEffect(() => {
    if (!isGameRunning) return;

    document.body.style.overflow = "hidden";
    const canvas = canvasRef.current;
    const c = canvas.getContext("2d");
    if (!c) return;
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    const spawnBackgroundParticles = () => {
      const particles = [];
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2,
          speedY: 0.3,
          opacity: 0.5 + Math.random() * 0.5,
          color: "white",
        });
      }
      backgroundParticlesRef.current = particles;
    };
    spawnBackgroundParticles();

    playerImageRef.current.src = imgURL.player;
    invaderImageRef.current.src = imgURL.invader;

    // === INIT PLAYER ===
    const initialPlayerX = canvas.width / 2 - playerConfig.width / 2;
    setPlayerX(initialPlayerX);
    playerXRef.current = initialPlayerX;
    const playerY = canvas.height - playerConfig.height - 10;

    // === INPUT HANDLING ===
    const keysPressed = new Set();
    const handleKeyDown = (e) => {
      keysPressed.add(e.key);
    };
    const handleKeyUp = (e) => {
      keysPressed.delete(e.key);
    };
    addEventListener("keydown", handleKeyDown);
    addEventListener("keyup", handleKeyUp);

    // === INVADER GRID SPAWNING ===
    const spawnInvaderGrid = () => {
      const cols = Math.floor(Math.random() * 10 + 5);
      const rows = Math.floor(Math.random() * 5 + 2);
      const gridWidth = cols * invaderConfig.width;
      const gridHeight = rows * invaderConfig.height;

      const x = 0;
      const y = 0;

      const sizeFactor = cols * rows;
      const minSize = 5 * 2;
      const maxSize = 15 * 7;
      const speed =
        invaderConfig.maxSpeed -
        ((sizeFactor - minSize) / (maxSize - minSize)) *
          (invaderConfig.maxSpeed - invaderConfig.minSpeed);

      invaderGridsRef.current.push({
        x,
        y,
        direction: 1,
        width: gridWidth,
        height: gridHeight,
        cols,
        rows,
        speed,
        invaders: Array.from({ length: rows }, () => Array(cols).fill(true)),
      });
    };
    spawnInvaderGrid();
    let frames = 1;
    let randomInterval = Math.floor(Math.random() * 500 + 500);

    // === GAME LOOP ===
    let animationId;
    const gameLoop = () => {
      // === PLAYER MOVEMENT ===
      if (keysPressed.has("ArrowLeft")) {
        playerXRef.current = Math.max(
          playerXRef.current - playerConfig.speed,
          0
        );
        playerRotationRef.current = -0.15;
      } else if (keysPressed.has("ArrowRight")) {
        playerXRef.current = Math.min(
          playerXRef.current + playerConfig.speed,
          canvas.width - playerConfig.width
        );
        playerRotationRef.current = 0.15;
      } else {
        playerRotationRef.current *= 0.9;
      }

      // === SHOOT PROJECTILES ===
      const now = Date.now();
      if (keysPressed.has(" ")) {
        if (now - lastShotTimeRef.current > projectileConfig.cooldown) {
          const newProjectile = {
            x: playerXRef.current + playerConfig.width / 2,
            y: canvas.height - playerConfig.height - 10,
            radius: projectileConfig.radius,
            speed: projectileConfig.speed,
          };
          projectilesRef.current.push(newProjectile);
          lastShotTimeRef.current = now;
        }
      }

      // === INVADER GRIDS MOVEMENT ===
      invaderGridsRef.current.forEach((grid) => {
        grid.x += grid.speed * grid.direction;

        const hitLeft = grid.x <= 0;
        const hitRight = grid.x + grid.width >= canvas.width;

        if (hitLeft || hitRight) {
          grid.direction *= -1;
          grid.y += 30;
        }
      });

      setPlayerX(playerXRef.current);

      // === LOSE CONDITION ===
      const hasLost = invaderGridsRef.current.some(
        (grid) => grid.y + grid.height >= canvas.height + 10
      );
      if (hasLost) {
        cancelAnimationFrame(animationId);
        alert("Game Over!");
        setGameOver(true);
        setIsGameRunning(false);
        return;
      }

      c.clearRect(0, 0, canvas.width, canvas.height);

      // === BACKGROUND ANIMATION DRAW ===
      backgroundParticlesRef.current.forEach((p) => {
        p.y += p.speedY;

        if (p.y - p.radius > canvas.height) {
          p.x = Math.random() * canvas.width;
          p.y = -p.radius;
        }

        c.save();
        c.globalAlpha = p.opacity;
        c.beginPath();
        c.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        c.fillStyle = p.color;
        c.fill();
        c.closePath();
        c.restore();
      });

      // === UPDATE & DRAW INVADER PROJECTILES ===
      invaderProjectilesRef.current = invaderProjectilesRef.current
        .map((p) => ({
          ...p,
          y: p.y + p.speed,
        }))
        .filter((p) => p.y < canvas.height);
      invaderProjectilesRef.current.forEach((p) => {
        c.fillStyle = "white";
        c.fillRect(p.x, p.y, p.width, p.height);
      });

      // === CHECK COLLISION INVADER PROJECTILE-PLAYER ===
      invaderProjectilesRef.current.forEach((p, index) => {
        const hit =
          p.x < playerXRef.current + playerConfig.width &&
          p.x + p.width > playerXRef.current &&
          p.y < playerY + playerConfig.height &&
          p.y + p.height > playerY;

        if (hit) {
          createExplosion(
            playerXRef.current + playerConfig.width / 2,
            playerY + playerConfig.height / 2,
            playerParticles
          );
          invaderProjectilesRef.current.splice(index, 1);

          const newLives = livesRef.current - 1;
          setLives(newLives);

          // === LOSE CONDITION ===
          if (newLives <= 0) {
            cancelAnimationFrame(animationId);
            alert("Game Over!");
            setGameOver(true);
            setIsGameRunning(false);
          }
        }
      });

      // === UPDATE & DRAW PROJECTILES ===
      projectilesRef.current = projectilesRef.current
        .map((p) => {
          const updated = { ...p, y: p.y - p.speed };
          return updated;
        })
        .filter((p) => {
          const isVisible = p.y + p.radius > 0;
          return isVisible;
        });
      projectilesRef.current.forEach((p) => {
        c.beginPath();
        c.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        c.fillStyle = "red";
        c.fill();
        c.closePath();
      });

      // === CHECK PROJECTILE-INVADER COLLISION ===
      projectilesRef.current.forEach((p, pIndex) => {
        invaderGridsRef.current.forEach((grid) => {
          for (let row = 0; row < grid.rows; row++) {
            for (let col = 0; col < grid.cols; col++) {
              if (grid.invaders[row][col]) {
                const invaderX = grid.x + col * invaderConfig.width;
                const invaderY = grid.y + row * invaderConfig.height;

                const distanceX = p.x - (invaderX + invaderConfig.width / 2);
                const distanceY = p.y - (invaderY + invaderConfig.height / 2);
                const distance = Math.sqrt(
                  distanceX * distanceX + distanceY * distanceY
                );

                // remove invader
                if (distance < p.radius + invaderConfig.width / 2) {
                  grid.invaders[row][col] = false;
                  createExplosion(
                    invaderX + invaderConfig.width / 2,
                    invaderY + invaderConfig.height / 2,
                    invaderParticles
                  );

                  setScore((prevScore) => prevScore + scoreParams.single);
                  projectilesRef.current.splice(pIndex, 1);
                }
              }
            }
          }
        });
      });
      // === REMOVE EMPTY GRID ===
      invaderGridsRef.current = invaderGridsRef.current.filter(
        (grid, index) => {
          const stillHasInvaders = grid.invaders.some((row) =>
            row.some((inv) => inv)
          );
          if (!stillHasInvaders) {
            setScore((prevScore) => prevScore + scoreParams.grid);
          }
          return stillHasInvaders;
        }
      );

      // === DRAW PLAYER ===
      c.save();
      c.translate(
        playerXRef.current + playerConfig.width / 2,
        playerY + playerConfig.height / 2
      );
      c.rotate(playerRotationRef.current);
      c.translate(
        -playerXRef.current - playerConfig.width / 2,
        -playerY - playerConfig.height / 2
      );
      if (playerImageRef.current.complete) {
        c.drawImage(
          playerImageRef.current,
          playerXRef.current,
          playerY,
          playerConfig.width,
          playerConfig.height
        );
      } else {
        c.fillStyle = "green";
        c.fillRect(
          playerXRef.current,
          playerY,
          playerConfig.width,
          playerConfig.height
        );
      }
      c.restore();

      // === DRAW INVADER GRIDS ===
      invaderGridsRef.current.forEach((grid) => {
        for (let row = 0; row < grid.rows; row++) {
          for (let col = 0; col < grid.cols; col++) {
            if (!grid.invaders[row][col]) continue;

            const x = grid.x + col * invaderConfig.width;
            const y = grid.y + row * invaderConfig.height;

            if (invaderImageRef.current.complete) {
              c.drawImage(
                invaderImageRef.current,
                x,
                y,
                invaderConfig.width,
                invaderConfig.height
              );
            } else {
              c.fillStyle = "white";
              c.fillRect(x, y, invaderConfig.width, invaderConfig.height);
            }
          }
        }
      });
      if (frames % randomInterval === 0) {
        spawnInvaderGrid();
        frames = 0;
        randomInterval = Math.floor(Math.random() * 500 + 500);
      }

      frames++;

      // === INVADER SHOOTING ===
      if (frames % invaderProjectileConfig.frame === 0) {
        invaderGridsRef.current.forEach((grid) => {
          const aliveInvaders = [];
          for (let row = 0; row < grid.rows; row++) {
            for (let col = 0; col < grid.cols; col++) {
              if (grid.invaders[row][col]) {
                aliveInvaders.push({ row, col });
              }
            }
          }

          if (aliveInvaders.length > 0) {
            const { row, col } =
              aliveInvaders[Math.floor(Math.random() * aliveInvaders.length)];
            const x =
              grid.x +
              col * invaderConfig.width +
              invaderConfig.width / 2 -
              invaderProjectileConfig.width / 2;
            const y =
              grid.y + row * invaderConfig.height + invaderConfig.height;

            invaderProjectilesRef.current.push({
              x,
              y,
              width: invaderProjectileConfig.width,
              height: invaderProjectileConfig.height,
              speed: invaderProjectileConfig.speed,
            });
          }
        });
      }

      // === PARTICLES UPDATE & DRAW ===
      particlesRef.current = particlesRef.current
        .map((p) => {
          return {
            ...p,
            x: p.x + p.velocity.x,
            y: p.y + p.velocity.y,
            opacity: p.opacity - 0.02,
          };
        })
        .filter((p) => p.opacity > 0);
      particlesRef.current.forEach((p) => {
        c.save();
        c.globalAlpha = p.opacity;
        c.beginPath();
        c.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        c.fillStyle = p.color;
        c.fill();
        c.closePath();
        c.restore();
      });

      animationId = requestAnimationFrame(gameLoop);
    };

    animationId = requestAnimationFrame(gameLoop);

    return () => {
      document.body.style.overflow = "";
      removeEventListener("keydown", handleKeyDown);
      removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(animationId);
    };
  }, [isGameRunning]);

  const handleGameStart = () => {
    if (gameOver) {
      invaderGridsRef.current = [];
      projectilesRef.current = [];
      invaderProjectilesRef.current = [];
      particlesRef.current = [];
      backgroundParticlesRef.current = [];

      playerXRef.current = canvasRef.current.width / 2 - playerConfig.width / 2;
      playerRotationRef.current = 0;
      lastShotTimeRef.current = 0;
      livesRef.current = 3;

      setScore(0);
      setLives(3);
      setPlayerX(playerXRef.current);
    }

    setGameOver(false);
    setIsGameRunning(true);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 z-50">
      <div className="relative flex flex-col items-center">
        <canvas
          ref={canvasRef}
          className="border border-white bg-black"
          width={canvasSize.width}
          height={canvasSize.height}
        />
      </div>
      <button
        onClick={onClose}
        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 px-1 rounded text-white cursor-pointer"
      >
        ✖
      </button>
      <div className="absolute top-2 left-2 text-white text-lg">
        Score: {score}
      </div>
      <div className="absolute top-10 left-2 text-white text-lg">
        Lives: {lives}
      </div>
      {!isGameRunning && (
        <button
          onClick={handleGameStart}
          className={`absolute ${
            gameOver
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-green-600 hover:bg-green-700"
          } text-white px-4 py-2 rounded`}
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {gameOver ? "Restart" : "Play"}
        </button>
      )}
    </div>
  );
}

export default SpaceInvaders;
