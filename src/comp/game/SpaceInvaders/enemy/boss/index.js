import bossConfig from "./config";
import { spawnBoss as rawSpawnBoss } from "./spawn";
import { handleBossEntranceAndDraw } from "./draw";
import { updateBossPhase, handleBossPhaseChange } from "./bossPhase";
import bossProjectileConfig from "./proj/projConfig";
import { generateBossProjectiles, drawBossProjectiles } from "./proj/proj";
import bossBeamConfig from "./beam/beamConfig";
import { generateBossBeams } from "./beam/beam";
import {
  collisionBossProjHitPlayer,
  collisionBossBeamHitPlayer,
  collisionPlayerHitBoss,
} from "./collision";
import {
  generateBlueWeakPoint,
  pickBlueWeakPoints,
  pickRedWeakPoints,
} from "./weakPoint";

// Internally stored shared values
let refs = {};
let config = {};
let canvasCtx = null;
let canvasElem = null;
let timeNow = null;

export function setupBossSystem({
  refs: passedRefs,
  canvas,
  c,
  bossStats,
  soundURL,
  configOverrides = {},
}) {
  refs = passedRefs;
  config = {
    bossConfig,
    bossStats,
    bossProjectileConfig,
    bossBeamConfig,
    soundURL,
    ...configOverrides,
  };
  canvasElem = canvas;
  canvasCtx = c;
}

export function spawn() {
  rawSpawnBoss({
    bossActiveRef: refs.bossActiveRef,
    bossRef: refs.bossRef,
    scoreRef: refs.scoreRef,
    bossConfig: config.bossConfig,
    bossStats: config.bossStats,
    canvas: canvasElem,
    activeBlueWeakPointsRef: refs.activeBlueWeakPointsRef,
    pickBlueWeakPoints,
    activeRedWeakPointsRef: refs.activeRedWeakPointsRef,
    pickRedWeakPoints,
    allRedSpaces: refs.allRedSpaces,
    usedRedSpacesRef: refs.usedRedSpacesRef,
    isPlayerActiveRef: refs.isPlayerActiveRef,
    isPlayerFrozenRef: refs.isPlayerFrozenRef,
  });
}

export function draw() {
  handleBossEntranceAndDraw({
    bossRef: refs.bossRef,
    bossImageRef: refs.bossImageRef,
    bossImage2Ref: refs.bossImage2Ref,
    bossBeamsRef: refs.bossBeamsRef,
    bossActiveRef: refs.bossActiveRef,
    bossDefeatedRef: refs.bossDefeatedRef,
    bossMusicPlayedRef: refs.bossMusicPlayedRef,
    activeBlueWeakPointsRef: refs.activeBlueWeakPointsRef,
    activeRedWeakPointsRef: refs.activeRedWeakPointsRef,
    shipUpgradeRef: refs.shipUpgradeRef,
    playerXRef: refs.playerXRef,
    playerYRef: refs.playerYRef,
    playerWidth: refs.playerWidth,
    playerColor: refs.playerColor,
    isPlayerActiveRef: refs.isPlayerActiveRef,
    isPlayerFrozenRef: refs.isPlayerFrozenRef,
    isPlayerInvincible: refs.isPlayerInvincible,
    playerTransitionRef: refs.playerTransitionRef,
    isBoostingRef: refs.isBoostingRef,
    addScore: refs.addScore,
    playSound: refs.playSound,
    playBossMusic: refs.playBossMusic,
    soundURL: config.soundURL,
    imgURL: refs.imgURL,
    shipBubbleConfig: refs.shipBubbleConfig,
    bossStats: config.bossStats,
    c: canvasCtx,
    canvas: canvasElem,
  });
}

export function updateAttacks(now) {
  timeNow = now;

  if (
    refs.bossRef.current &&
    !refs.bossRef.current.entering &&
    refs.isPhase1EnabledRef.current
  ) {
    generateBossProjectiles({
      boss: refs.bossRef.current,
      bossConfig: config.bossConfig,
      bossStats: config.bossStats,
      bossProjectileConfig: config.bossProjectileConfig,
      bossProjectilesRefs: {
        small: refs.bossProjectilesSmallRef,
        medium: refs.bossProjectilesMediumRef,
        large: refs.bossProjectilesLargeRef,
      },
      playLaserSound: refs.playLaserSound,
      soundURL: config.soundURL,
    });
  }

  if (
    refs.bossRef.current &&
    !refs.bossRef.current.entering &&
    refs.isPhase2EnabledRef.current
  ) {
    generateBossBeams({
      ctx: canvasCtx,
      canvas: canvasElem,
      now: timeNow,
      bossBeamsRef: refs.bossBeamsRef,
      bossBeamConfig: config.bossBeamConfig,
      isPhase2EnabledRef: refs.isPhase2EnabledRef,
      bossRef: refs.bossRef,
      playSound: refs.playSound,
      soundURL: config.soundURL,
    });
  }

  ["small", "medium", "large"].forEach((type, i) => {
    const ref = [
      refs.bossProjectilesSmallRef,
      refs.bossProjectilesMediumRef,
      refs.bossProjectilesLargeRef,
    ][i];
    const projConfig = config.bossProjectileConfig[type];

    ref.current = ref.current.filter((p) => p.y < canvasElem.height);
    drawBossProjectiles(ref.current, projConfig, canvasCtx);
  });
}

export function checkCollisions() {
  collisionBossProjHitPlayer({
    bossProjectilesRefs: [
      refs.bossProjectilesSmallRef,
      refs.bossProjectilesMediumRef,
      refs.bossProjectilesLargeRef,
    ],
    getPlayerHitbox: refs.getPlayerHitbox,
    playerWidth: refs.playerWidth,
    isPlayerInvincible: refs.isPlayerInvincible,
    isGameEnding: refs.isGameEndingRef,
    isShieldActive: refs.isShieldActiveRef,
    handleShieldBlock: refs.handleShieldBlock,
    handlePlayerHit: refs.handlePlayerHit,
    livesRef: refs.livesRef,
    setLives: refs.setLives,
    handleGameOver: refs.handleGameOver,
  });

  collisionBossBeamHitPlayer({
    boss: refs.bossRef.current,
    bossRef: refs.bossRef,
    bossBeamsRef: refs.bossBeamsRef,
    bossBeamConfig: config.bossBeamConfig,
    isPhase2EnabledRef: refs.isPhase2EnabledRef,
    isGameEndingRef: refs.isGameEndingRef,
    isPlayerInvincible: refs.isPlayerInvincible,
    isShieldActiveRef: refs.isShieldActiveRef,
    getPlayerHitbox: refs.getPlayerHitbox,
    playerWidth: refs.playerWidth,
    playerXRef: refs.playerXRef,
    playerYRef: refs.playerYRef,
    handleShieldBlock: refs.handleShieldBlock,
    handlePlayerHit: refs.handlePlayerHit,
    livesRef: refs.livesRef,
    setLives: refs.setLives,
    handleGameOver: refs.handleGameOver,
    canvas: canvasElem,
  });

  collisionPlayerHitBoss({
    bossRef: refs.bossRef,
    projectilesRef: refs.projectilesRef,
    bossConfig: config.bossConfig,
    activeBlueWeakPointsRef: refs.activeBlueWeakPointsRef,
    activeRedWeakPointsRef: refs.activeRedWeakPointsRef,
    allRedSpaces: refs.allRedSpaces,
    usedRedSpacesRef: refs.usedRedSpacesRef,
    generateBlueWeakPoint,
    handleBossHit: refs.handleBossHit,
    updateBossPhase: () =>
      updateBossPhase(refs.bossRef, (newPhase) =>
        handleBossPhaseChange(newPhase, refs.bossRef, {
          enablePhase1: refs.enablePhase1,
          enablePhase2: refs.enablePhase2,
          bossBeamsRef: refs.bossBeamsRef,
          beamIntervalsRef: refs.beamIntervalsRef,
          bossBeamConfig: config.bossBeamConfig,
        })
      ),
    isPlayerFrozenRef: refs.isPlayerFrozenRef,
    enablePhase1: refs.enablePhase1,
    enablePhase2: refs.enablePhase2,
    beamIntervalsRef: refs.beamIntervalsRef,
    soundURL: config.soundURL,
    playSound: refs.playSound,
    resumeBackgroundMusic: refs.resumeBackgroundMusic,
  });
}
