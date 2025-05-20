import { getBossBeamHitbox } from "./bossBeam";

export function collisionBossProjHitPlayer({
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

export function collisionBossBeamHitPlayer({
  boss,
  bossRef,
  bossBeamsRef,
  bossBeamConfig,
  isPhase2EnabledRef,
  isGameEndingRef,
  isPlayerInvincible,
  isShieldActiveRef,
  getPlayerHitbox,
  playerWidth,
  playerXRef,
  playerYRef,
  handleShieldBlock,
  handlePlayerHit,
  livesRef,
  setLives,
  handleGameOver,
  canvas,
}) {
  if (boss && isPhase2EnabledRef.current) {
    bossBeamsRef.current.forEach((beam) => {
      if (
        !beam.isShooting ||
        isGameEndingRef.current ||
        isPlayerInvincible.current
      )
        return;

      const beamHitbox = getBossBeamHitbox(
        beam,
        bossRef,
        canvas,
        bossBeamConfig
      );
      const playerHitbox = getPlayerHitbox(playerWidth);

      const hit =
        beamHitbox.x < playerHitbox.x + playerHitbox.width &&
        beamHitbox.x + beamHitbox.width > playerHitbox.x &&
        beamHitbox.y < playerHitbox.y + playerHitbox.height &&
        beamHitbox.y + beamHitbox.height > playerHitbox.y;

      if (hit && !beam.hasHitPlayer) {
        beam.hasHitPlayer = true;

        if (isShieldActiveRef.current) {
          handleShieldBlock(playerXRef.current, playerYRef.current - 50);
          return;
        }

        handlePlayerHit(playerWidth);

        const beamDamage = beam.damage;
        const newLives = Math.max(0, livesRef.current - beamDamage);
        setLives(newLives);

        if (newLives <= 0) handleGameOver();
      }
    });
  }
}
