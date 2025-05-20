import {
  renderSmallLaser,
  renderMediumLaser,
  renderLargeLaser,
} from "./bossBeamRender";

export function generateBossBeams({
  ctx: c,
  canvas,
  now,
  bossBeamsRef,
  bossBeamConfig,
  isPhase2EnabledRef,
  bossRef,
  playSound,
  soundURL,
}) {
  if (
    !bossRef.current ||
    bossRef.current.entering ||
    !isPhase2EnabledRef.current
  )
    return;

  const playedShootSound = {
    small: false,
    medium: false,
    large: false,
  };
  const volumeMapActive = { small: 0.4, medium: 0.5, large: 0.6 };

  bossBeamsRef.current = bossBeamsRef.current.filter((beam) => {
    const config = bossBeamConfig[beam.type];
    const hitbox = getBossBeamHitbox(beam, bossRef, canvas, bossBeamConfig);

    // === BEAM STATE TRANSITIONS ===
    if (beam.isCharging && now >= beam.chargeEnd) {
      beam.isCharging = false;
      beam.isShooting = true;

      if (!playedShootSound[beam.type]) {
        playedShootSound[beam.type] = true;
        playSound(soundURL.beamActive2, volumeMapActive[beam.type]);
      }
    }

    if (beam.isShooting && now >= beam.shootEnd) {
      return false;
    }

    // === BEAM CHARGING RENDER ===
    if (beam.isCharging) {
      const colorCycle = config.chargeColors;
      const colorIndex = Math.floor(now / 100) % colorCycle.length;
      const alpha = 0.3 + 0.5 * Math.abs(Math.sin(now / 300));
      c.fillStyle = colorCycle[colorIndex];
      c.globalAlpha = alpha;
      c.fillRect(hitbox.x, hitbox.y, hitbox.width, hitbox.height);
      c.globalAlpha = 1;
    }

    // === BEAM RENDER ===
    if (beam.isShooting) {
      renderLaserByType({ beam, hitbox, now, ctx: c });
    }

    return true;
  });
}

export function getBossBeamHitbox(beam, bossRef, canvas, bossBeamConfig) {
  const beamWidth = bossBeamConfig[beam.type].beamWidth;
  const beamX = bossRef.current.x + beam.x - beamWidth / 2;
  const beamY = bossRef.current.y + beam.y;
  const beamHeight = canvas.height - beamY;

  return {
    x: beamX,
    y: beamY,
    width: beamWidth,
    height: beamHeight,
  };
}

function renderLaserByType({ beam, hitbox, now, ctx: c }) {
  switch (beam.type) {
    case "small":
      renderSmallLaser(c, beam, hitbox, now);
      break;
    case "medium":
      renderMediumLaser(c, beam, hitbox, now);
      break;
    case "large":
      renderLargeLaser(c, beam, hitbox, now);
      break;
  }
}
