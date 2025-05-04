function SpaceInvaders({ onClose }) {
  /* States */
  // canvas, player, score, gameOver
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

  /* useEffect update x player */

  /* useEffect main */
  useEffect(() => {
    // canvas, url, initial player position, handling input

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

      animationId = requestAnimationFrame(gameLoop);
    };

    animationId = requestAnimationFrame(gameLoop);

    return () => {
      // clear
    };
  }, [isGameRunning]);

  // handle Game Start

  return ( // UI ...