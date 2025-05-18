export function updateInvaderGrids(invaderGridsRef, canvas, invaderConfig) {
  invaderGridsRef.current.forEach((grid) => {
    const inv = invaderConfig.stats;

    // === BOSS - RETREAT ===
    if (grid.retreating) {
      if (grid.x + grid.width < canvas.width) {
        grid.x += grid.speed * grid.direction * inv.retreadSpeed;
      } else {
        invaderGridsRef.current = invaderGridsRef.current.filter(
          (g) => g !== grid
        );
      }
    } else {
      grid.x += grid.speed * grid.direction;

      const hitLeft = grid.x <= 0;
      const hitRight = grid.x + grid.width >= canvas.width;

      if (hitLeft || hitRight) {
        grid.direction *= -1;
        grid.y += 30;
      }
    }
  });
}

export function checkInvaderLoseCondition(
  invaderGridsRef,
  canvas,
  handleGameOver
) {
  const hasLost = invaderGridsRef.current.some(
    (grid) => grid.y + grid.height >= canvas.height + 10
  );
  if (hasLost) handleGameOver();
}

export function handleCollisionPlayerHitInvader(
  projectilesRef,
  invaderGridsRef,
  invaderConfig,
  destroyEnemy,
  soundURL,
  addScore,
  playSound
) {
  projectilesRef.current.forEach((p, pIndex) => {
    invaderGridsRef.current.forEach((grid) => {
      const { stats: inv, hitParticles: pa } = invaderConfig;

      for (let row = 0; row < grid.rows; row++) {
        for (let col = 0; col < grid.cols; col++) {
          if (grid.invaders[row][col]) {
            const invaderX = grid.x + col * inv.width;
            const invaderY = grid.y + row * inv.height;

            const hit =
              p.x < invaderX + inv.width &&
              p.x + p.width > invaderX &&
              p.y < invaderY + inv.height &&
              p.y + p.height > invaderY;

            // === HIT: INVADER ===
            if (hit) {
              grid.invaders[row][col] = false;

              destroyEnemy({
                x: invaderX + inv.width / 2,
                y: invaderY + inv.height / 2,
                particles: pa,
                sound: soundURL.destroyInvader,
                volume: 0.5,
                score: inv.single,
              });

              projectilesRef.current.splice(pIndex, 1);
            }
          }
        }
      }
    });
  });

  // === REMOVE EMPTY GRID ===
  invaderGridsRef.current = invaderGridsRef.current.filter((grid) => {
    const stillHasInvaders = grid.invaders.some((row) =>
      row.some((inv) => inv)
    );
    if (!stillHasInvaders) {
      playSound(soundURL.destroyGrid, 0.5);

      addScore(invaderConfig.stats.grid);
    }
    return stillHasInvaders;
  });
}
