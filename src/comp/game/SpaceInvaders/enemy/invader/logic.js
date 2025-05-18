// invader/logic.js cambiaaaaa
export function updateInvaderGrids(
  invaderGridsRef,
  canvas,
  invaderConfig,
  bossActiveRef
) {
  const inv = invaderConfig.stats;

  invaderGridsRef.current.forEach((grid) => {
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

export function handleInvaderCollisionsWithProjectiles(
  projectilesRef,
  invaderGridsRef,
  invaderConfig,
  destroyEnemy,
  soundURL,
  addScore
) {
  projectilesRef.current.forEach((p, pIndex) => {
    invaderGridsRef.current.forEach((grid) => {
      const { stats: inv, hitParticles: pa } = invaderConfig;

      for (let row = 0; row < grid.rows; row++) {
        for (let col = 0; col < grid.cols; col++) {
          if (grid.invaders[row][col]) {
            const x = grid.x + col * inv.width;
            const y = grid.y + row * inv.height;

            const hit =
              p.x < x + inv.width &&
              p.x + p.width > x &&
              p.y < y + inv.height &&
              p.y + p.height > y;

            if (hit) {
              grid.invaders[row][col] = false;
              destroyEnemy({
                x: x + inv.width / 2,
                y: y + inv.height / 2,
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

  // Rimuove le griglie vuote
  invaderGridsRef.current = invaderGridsRef.current.filter((grid) => {
    const stillHas = grid.invaders.some((row) => row.some((inv) => inv));
    if (!stillHas) {
      addScore(invaderConfig.stats.grid);
      playSound(soundURL.destroyGrid, 0.5);
    }
    return stillHas;
  });
}
