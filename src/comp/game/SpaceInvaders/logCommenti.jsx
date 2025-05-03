import { useState, useEffect, useRef } from "react";

const imgURL = "/images/spaceInvaders/playerShip1_green.webp";

function SpaceInvaders({ onClose }) {
  const canvasRef = useRef(null);
  const playerImageRef = useRef(new Image());
  const playerRotationRef = useRef(0);
  const playerScale = 0.5;

  const [playerX, setPlayerX] = useState(0); // player position
  const playerXRef = useRef(playerX);

  const playerWidth = 99 * playerScale;
  const playerHeight = 75 * playerScale;
  const playerSpeed = 5;

  // Synchronize ref with state value (used in loop)
  useEffect(() => {
    playerXRef.current = playerX;
  }, [playerX]);

  // initialization & main game cycle
  useEffect(() => {
    document.body.style.overflow = "hidden"; // disable page-scroll
    // canvas
    const canvas = canvasRef.current;
    const c = canvas.getContext("2d");
    if (!c) return;
    canvas.width = 1024;
    canvas.height = 576;

    playerImageRef.current.src = imgURL; // load player image

    // initial position
    const initialPlayerX = canvas.width / 2 - playerWidth / 2;
    setPlayerX(initialPlayerX);
    playerXRef.current = initialPlayerX;

    // keyboard
    const keysPressed = new Set(); // track keystrokes
    let animationId;
    const handleKeyDown = (e) => {
      keysPressed.add(e.key);
    };
    const handleKeyUp = (e) => {
      keysPressed.delete(e.key);
    };

    // Game Loop Main
    const gameLoop = () => {
      // Smooth motion + Tilt effect
      if (keysPressed.has("ArrowLeft")) {
        playerXRef.current = Math.max(playerXRef.current - playerSpeed, 0);
        playerRotationRef.current = -0.15; // tilt left
      } else if (keysPressed.has("ArrowRight")) {
        playerXRef.current = Math.min(
          playerXRef.current + playerSpeed,
          canvas.width - playerWidth
        );
        playerRotationRef.current = 0.15; // tilt right
      } else {
        playerRotationRef.current *= 0.9; // smooth return
      }

      setPlayerX(playerXRef.current); // update state, possible future use

      // clear canvas
      c.clearRect(0, 0, canvas.width, canvas.height);

      // Player
      const playerY = canvas.height - playerHeight - 20;
      c.save();

      // rotation
      c.translate(
        playerXRef.current + playerWidth / 2,
        playerY + playerHeight / 2
      );
      c.rotate(playerRotationRef.current);
      c.translate(
        -playerXRef.current - playerWidth / 2,
        -playerY - playerHeight / 2
      );

      // Draw player (if loaded)
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

      // debug - hitbox
      // c.fillStyle = "rgba(255, 0, 0, 0.2)";
      // c.fillRect(playerXRef.current, playerY, playerWidth, playerHeight);

      // debug - log position & rotation
      // console.log({
      //   x: playerXRef.current,
      //   y: playerY,
      //   width: playerWidth,
      //   height: playerHeight,
      //   rotation: playerRotationRef.current.toFixed(2),
      // });

      c.restore();

      animationId = requestAnimationFrame(gameLoop); // next frame
    };

    animationId = requestAnimationFrame(gameLoop); // start animation

    addEventListener("keydown", handleKeyDown);
    addEventListener("keyup", handleKeyUp);

    return () => {
      document.body.style.overflow = "";
      removeEventListener("keydown", handleKeyDown);
      removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 z-50">
      {/* Canvas */}
      <div className="relative flex flex-col items-center">
        <canvas
          ref={canvasRef}
          className="border border-white bg-black"
          width={1024}
          height={576}
        />
      </div>
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 px-1 rounded text-white"
      >
        ✖
      </button>
    </div>
  );
}

export default SpaceInvaders;
