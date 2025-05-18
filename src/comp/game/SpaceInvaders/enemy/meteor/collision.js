export function collisionMeteorHitPlayer(
  meteorsRef,
  isGameEndingRef,
  isPlayerInvincible,
  isShieldActiveRef,
  handleShieldBlock,
  handlePlayerHit,
  livesRef,
  setLives,
  handleGameOver,
  getPlayerHitbox,
  playerWidth
) {
  meteorsRef.current.forEach((m, index) => {
    if (isGameEndingRef.current || isPlayerInvincible.current) return;

    const hitbox = getPlayerHitbox(playerWidth);
    const hit =
      m.x < hitbox.x + hitbox.width &&
      m.x + m.width > hitbox.x &&
      m.y < hitbox.y + hitbox.height &&
      m.y + m.height > hitbox.y;

    if (hit) {
      // === COLLISION DETECTION: METEOR → SHIELD ===
      if (isShieldActiveRef.current) {
        meteorsRef.current.splice(index, 1);

        handleShieldBlock(m.x + m.width / 2, m.y + m.height / 2);

        return;
      }

      handlePlayerHit(playerWidth);
      const damage = m.type === "big" ? 2 : 1;
      const newLives = Math.max(0, livesRef.current - damage);
      setLives(newLives);

      meteorsRef.current.splice(index, 1);

      // === LOSE CONDITION ===
      if (newLives <= 0) {
        handleGameOver();
      }
    }
  });
}
