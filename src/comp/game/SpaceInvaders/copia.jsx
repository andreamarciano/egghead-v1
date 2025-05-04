import { useState, useEffect, useRef } from "react";
const playerURL = "/images/spaceInvaders/playerShip1_green.webp";
const invaderURL = "/images/spaceInvaders/invader.png";

function SpaceInvaders({ onClose }) {
  const [isGameRunning, setIsGameRunning] = useState(false);
  const canvasRef = useRef(null);

  const playerImageRef = useRef(new Image());
  const playerScale = 0.5;
  const playerWidth = 99 * playerScale;
  const playerHeight = 75 * playerScale;
  const playerRotationRef = useRef(0);
  const [playerX, setPlayerX] = useState(0);
  const playerXRef = useRef(playerX);
  const playerSpeed = 5;

  const lastShotTimeRef = useRef(0);
  const projectilesRef = useRef([]);
  const projectileCooldown = 200;
  const projectileRadius = 4;
  const projectileSpeed = 7;

  const invaderImageRef = useRef(new Image());
  const invaderScale = 1;
  const invaderWidth = 30 * invaderScale;
  const invaderHeight = 30 * invaderScale;
  const [invaderX, setInvaderX] = useState(0);
  const [invaderY, setInvaderY] = useState(0);
  const invaderXRef = useRef(0);
  const invaderYRef = useRef(0);
  const invaderDirectionRef = useRef(1);
  const invaderSpeed = 3;

  useEffect(() => {
    playerXRef.current = playerX;
  }, [playerX]);

  useEffect(() => {
    if (!isGameRunning) return;

    document.body.style.overflow = "hidden";
    const canvas = canvasRef.current;
    const c = canvas.getContext("2d");
    if (!c) return;
    canvas.width = 1024;
    canvas.height = 576;

    playerImageRef.current.src = playerURL;
    invaderImageRef.current.src = invaderURL;

    // === INIT PLAYER ===
    const initialPlayerX = canvas.width / 2 - playerWidth / 2;
    setPlayerX(initialPlayerX);
    playerXRef.current = initialPlayerX;

    // === INIT INVADER ===
    const initialInvaderX = 0;
    const initialInvaderY = 0;
    setInvaderX(initialInvaderX);
    setInvaderY(initialInvaderY);
    invaderXRef.current = initialInvaderX;
    invaderYRef.current = initialInvaderY;

    const keysPressed = new Set();
    const handleKeyDown = (e) => {
      keysPressed.add(e.key);
    };
    const handleKeyUp = (e) => {
      keysPressed.delete(e.key);
    };
    addEventListener("keydown", handleKeyDown);
    addEventListener("keyup", handleKeyUp);

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
            y: canvas.height - playerHeight - 20,
            radius: projectileRadius,
            speed: projectileSpeed,
          };
          projectilesRef.current.push(newProjectile);
          lastShotTimeRef.current = now;
        }
      }

      // === INVADER MOVEMENT ===
      invaderXRef.current += invaderSpeed * invaderDirectionRef.current;
      if (
        invaderXRef.current <= 0 ||
        invaderXRef.current + invaderWidth >= canvas.width
      ) {
        invaderDirectionRef.current *= -1;
        invaderYRef.current += 30;
      }

      setInvaderX(invaderXRef.current);
      setInvaderY(invaderYRef.current);
      setPlayerX(playerXRef.current);

      // === LOSE CONDITION ===
      if (invaderYRef.current >= canvas.height - 30) {
        cancelAnimationFrame(animationId);
        alert("Game Over!");
        setIsGameRunning(false);
        return;
      }

      c.clearRect(0, 0, canvas.width, canvas.height);

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

      // === DRAW PLAYER ===
      const playerY = canvas.height - playerHeight - 20;
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

      // === DRAW INVADER ===
      if (invaderImageRef.current.complete) {
        c.drawImage(
          invaderImageRef.current,
          invaderXRef.current,
          invaderYRef.current,
          invaderWidth,
          invaderHeight
        );
      } else {
        c.fillStyle = "white";
        c.fillRect(invaderX, invaderY, invaderWidth, invaderHeight);
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

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 z-50">
      <div className="relative flex flex-col items-center">
        <canvas
          ref={canvasRef}
          className="border border-white bg-black"
          width={1024}
          height={576}
        />
      </div>
      <button
        onClick={onClose}
        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 px-1 rounded text-white"
      >
        ✖
      </button>
      {!isGameRunning && (
        <button
          onClick={() => setIsGameRunning(true)}
          className="absolute bottom-5 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Start Game
        </button>
      )}
    </div>
  );
}

export default SpaceInvaders;
