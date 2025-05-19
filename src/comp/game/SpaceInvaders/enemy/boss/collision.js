export function collisionBossprojHitPlayer({
  bossProjectilesRefs,
  getPlayerHitbox,
  playerWidth,
  isPlayerInvincible,
  isGameEnding,
  isShieldActive,
  handleShieldBlock,
  handlePlayerHit,
  livesRef,
  setLives,
  handleGameOver,
}) {
  bossProjectilesRefs.forEach((ref) => {
    ref.current.forEach((p, index) => {
      if (isGameEnding.current || isPlayerInvincible.current) return;

      const hitbox = getPlayerHitbox(playerWidth);
      const hit =
        p.x < hitbox.x + hitbox.width &&
        p.x + p.width > hitbox.x &&
        p.y < hitbox.y + hitbox.height &&
        p.y + p.height > hitbox.y;

      if (hit) {
        ref.current.splice(index, 1);

        if (isShieldActive.current) {
          handleShieldBlock(p.x, p.y);
          return;
        }

        handlePlayerHit(playerWidth);

        const newLives = Math.max(0, livesRef.current - (p.damage || 1));
        setLives(newLives);

        if (newLives <= 0) handleGameOver();
      }
    });
  });
}
