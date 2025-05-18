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
