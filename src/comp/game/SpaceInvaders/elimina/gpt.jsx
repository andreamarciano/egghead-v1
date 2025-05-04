function SpaceInvaders({ onClose }) {
  const playerImageRef = useRef(new Image());
  const playerScale = 0.5;
  const playerWidth = 99 * playerScale;
  const playerHeight = 75 * playerScale;
  const playerRotationRef = useRef(0);
  const [playerX, setPlayerX] = useState(0);
  const playerXRef = useRef(playerX);
  const playerSpeed = 5;

  useEffect(() => {
    playerXRef.current = playerX;
  }, [playerX]);

  useEffect(() => {
    // === INIT PLAYER ===
    const initialPlayerX = canvas.width / 2 - playerWidth / 2;
    setPlayerX(initialPlayerX);
    playerXRef.current = initialPlayerX;

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
        .filter((p) => p.y < canvas.height); // Mantieni solo quelli visibili

      invaderProjectilesRef.current.forEach((p) => {
        c.fillStyle = "white";
        c.fillRect(p.x, p.y, p.width, p.height);
      });

      // === DRAW PLAYER ===
      const playerY = canvas.height - playerHeight - 10;
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

      animationId = requestAnimationFrame(gameLoop);
    };

    animationId = requestAnimationFrame(gameLoop);

    return () => {};
  }, [isGameRunning]);

  const handleGameStart = () => {
    if (gameOver) {
      invaderGridsRef.current = [];
      projectilesRef.current = [];
      playerXRef.current = canvasRef.current.width / 2 - playerWidth / 2;
      playerRotationRef.current = 0;
      lastShotTimeRef.current = 0;

      setPlayerX(playerXRef.current);
    }

    setGameOver(false);
    setIsGameRunning(true);
  };
