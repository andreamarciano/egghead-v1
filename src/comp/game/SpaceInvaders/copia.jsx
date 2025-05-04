import { useState, useEffect, useRef } from "react";
const playerURL = "/images/spaceInvaders/playerShip1_green.webp";
const invaderURL = "/images/spaceInvaders/invader.png";

function SpaceInvaders({ onClose }) {
  const canvasRef = useRef(null);
  const canvasWidth = 1260;
  const canvasHeight = 690;

  const [isGameRunning, setIsGameRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const playerImageRef = useRef(new Image());
  const playerScale = 0.5;
  const playerWidth = 99 * playerScale;
  const playerHeight = 75 * playerScale;
  const playerRotationRef = useRef(0);
  const [playerX, setPlayerX] = useState(0);
  const playerXRef = useRef(playerX);
  const playerSpeed = 5;

  const [lives, setLives] = useState(3);
  const livesRef = useRef(3);

  const lastShotTimeRef = useRef(0);
  const projectilesRef = useRef([]);
  const projectileCooldown = 200;
  const projectileRadius = 4;
  const projectileSpeed = 7;

  const invaderImageRef = useRef(new Image());
  const invaderScale = 1;
  const invaderWidth = 30 * invaderScale;
  const invaderHeight = 30 * invaderScale;
  const invaderGridsRef = useRef([]);
  const maxInvaderGridSpeed = 3;
  const minInvaderGridSpeed = 2;

  const invaderProjectilesRef = useRef([]);
  const invaderProjectileWidth = 4;
  const invaderProjectileHeight = 12;
  const invaderProjectileSpeed = 4;
  const invaderProjectileFrameFreq = 100;

  const [score, setScore] = useState(0);
  const clearInvaderScore = 10;
  const clearInvaderGridScore = 50;

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
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    playerImageRef.current.src = playerURL;
    invaderImageRef.current.src = invaderURL;

    // === INIT PLAYER ===
    const initialPlayerX = canvas.width / 2 - playerWidth / 2;
    setPlayerX(initialPlayerX);
    playerXRef.current = initialPlayerX;
    const playerY = canvas.height - playerHeight - 10;

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
      const gridWidth = cols * invaderWidth;
      const gridHeight = rows * invaderHeight;

      const x = 0;
      const y = 0;

      const sizeFactor = cols * rows;
      const minSize = 5 * 2;
      const maxSize = 15 * 7;
      const speed =
        maxInvaderGridSpeed -
        ((sizeFactor - minSize) / (maxSize - minSize)) *
          (maxInvaderGridSpeed - minInvaderGridSpeed);

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
        playerXRef.current = Math.max(playerXRef.current - playerSpeed, 0);
        playerRotationRef.current = -0.15;
      } else if (keysPressed.has("ArrowRight")) {
        playerXRef.current = Math.min(
          playerXRef.current + playerSpeed,
          canvas.width - playerWidth
        );
        playerRotationRef.current = 0.15;
      } else {
        playerRotationRef.current *= 0.9;
      }

      // === SHOOT PROJECTILES ===
      const now = Date.now();
      if (keysPressed.has(" ")) {
        if (now - lastShotTimeRef.current > projectileCooldown) {
          const newProjectile = {
            x: playerXRef.current + playerWidth / 2,
            y: canvas.height - playerHeight - 10,
            radius: projectileRadius,
            speed: projectileSpeed,
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
          p.x < playerXRef.current + playerWidth &&
          p.x + p.width > playerXRef.current &&
          p.y < playerY + playerHeight &&
          p.y + p.height > playerY;

        if (hit) {
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
                const invaderX = grid.x + col * invaderWidth;
                const invaderY = grid.y + row * invaderHeight;

                const distanceX = p.x - (invaderX + invaderWidth / 2);
                const distanceY = p.y - (invaderY + invaderHeight / 2);
                const distance = Math.sqrt(
                  distanceX * distanceX + distanceY * distanceY
                );

                // remove invader
                if (distance < p.radius + invaderWidth / 2) {
                  grid.invaders[row][col] = false;
                  setScore((prevScore) => prevScore + clearInvaderScore);
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
            setScore((prevScore) => prevScore + clearInvaderGridScore);
          }
          return stillHasInvaders;
        }
      );

      // === DRAW PLAYER ===
      c.save();
      c.translate(
        playerXRef.current + playerWidth / 2,
        playerY + playerHeight / 2
      );
      c.rotate(playerRotationRef.current);
      c.translate(
        -playerXRef.current - playerWidth / 2,
        -playerY - playerHeight / 2
      );
      if (playerImageRef.current.complete) {
        c.drawImage(
          playerImageRef.current,
          playerXRef.current,
          playerY,
          playerWidth,
          playerHeight
        );
      } else {
        c.fillStyle = "green";
        c.fillRect(playerXRef.current, playerY, playerWidth, playerHeight);
      }
      c.restore();

      // === DRAW INVADER GRIDS ===
      invaderGridsRef.current.forEach((grid) => {
        for (let row = 0; row < grid.rows; row++) {
          for (let col = 0; col < grid.cols; col++) {
            if (!grid.invaders[row][col]) continue;

            const x = grid.x + col * invaderWidth;
            const y = grid.y + row * invaderHeight;

            if (invaderImageRef.current.complete) {
              c.drawImage(
                invaderImageRef.current,
                x,
                y,
                invaderWidth,
                invaderHeight
              );
            } else {
              c.fillStyle = "white";
              c.fillRect(x, y, invaderWidth, invaderHeight);
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
      if (frames % invaderProjectileFrameFreq === 0) {
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
              col * invaderWidth +
              invaderWidth / 2 -
              invaderProjectileWidth / 2;
            const y = grid.y + row * invaderHeight + invaderHeight;

            invaderProjectilesRef.current.push({
              x,
              y,
              width: invaderProjectileWidth,
              height: invaderProjectileHeight,
              speed: invaderProjectileSpeed,
            });
          }
        });
      }

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
      playerXRef.current = canvasRef.current.width / 2 - playerWidth / 2;
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
          width={canvasWidth}
          height={canvasHeight}
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
