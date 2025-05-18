export function collisionShieldHitPlayer(
  shieldPowerUpRef,
  isGameEndingRef,
  isPlayerInvincible,
  playerXRef,
  playerYRef,
  playerStats,
  playerWidth,
  activateShield
) {
  shieldPowerUpRef.current.forEach((powerUp, sIndex) => {
    if (isGameEndingRef.current || isPlayerInvincible.current) return;

    const hit =
      powerUp.x < playerXRef.current + playerWidth &&
      powerUp.x + powerUp.width > playerXRef.current &&
      powerUp.y < playerYRef.current + playerStats.height &&
      powerUp.y + powerUp.height > playerYRef.current;

    if (hit) {
      shieldPowerUpRef.current.splice(sIndex, 1);

      activateShield();
    }
  });
}
