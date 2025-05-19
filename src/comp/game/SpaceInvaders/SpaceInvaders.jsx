import { useState, useEffect, useRef } from "react";
import "./SpaceInvaders.css";

/* Assets */
import imgURL from "./assets/imgURL";
import { soundURL, themeURL, theme2URL, battleURL } from "./assets/soundURL";

/* UI */
import ControlsPopup from "./UI/ControlsPopup";
import AudioSettings from "./UI/AudioSettings";
import CanvasCenter from "./UI/CanvasCenter";

/* Utils */
import { createExplosion } from "./enemy/createExplosion";

/* Player */
import playerConfig from "./player/config";
import { flashEffect } from "./player/flashEffect";

/* Power Up */
import shieldConfig from "./powerUp/shield/config";
import shipBubbleConfig from "./powerUp/ship/config";
import { spawnShieldBubble } from "./powerUp/shield/spawn";
import { collisionShieldHitPlayer } from "./powerUp/shield/collision";

/* === Enemies === */
import invaderConfig from "./enemy/invader/config";
import {
  spawnInvaderGrid,
  scheduleInvaderGrid,
  spawnInvaderProjectile,
} from "./enemy/invader/spawn";
import { drawInvaderGrids } from "./enemy/invader/draw";
import {
  updateInvaderGrids,
  checkInvaderLoseCondition,
} from "./enemy/invader/movement";
import {
  collisionPlayerHitInvader,
  collisionInvaderHitPlayer,
} from "./enemy/invader/collision";
// Meteor
import meteorConfig from "./enemy/meteor/config";
import { setupMeteorSpawn } from "./enemy/meteor/spawn";
import {
  collisionMeteorHitPlayer,
  collisionPlayerHitMeteor,
} from "./enemy/meteor/collision";
// Follower
import followerConfig from "./enemy/follower/config";
import { setupFollowerSpawn } from "./enemy/follower/spawn";
import { drawFollower } from "./enemy/follower/draw";
import { updateFollower } from "./enemy/follower/logic";
import { getFollowerBeamHitbox } from "./enemy/follower/utils";
import {
  collisionPlayerHitFollower,
  collisionFollowerHitPlayer,
} from "./enemy/follower/collision";

/* Boss */
import bossConfig from "./enemy/boss/config";
import bossProjectileConfig from "./enemy/boss/projConfig";
import {
  generateBossProjectiles,
  drawBossProjectiles,
} from "./enemy/boss/bossProj";
import bossLaserConfig from "./enemy/boss/laserConfig";
import {
  collisionBossProjHitPlayer,
  collisionBossBeamHitPlayer,
} from "./enemy/boss/collision";

/******************************************************************************
 *                                                                            *
 *      ▀▄   ▄▀   ▀▄   ▄▀   ▀▄   ▄▀   ▀▄   ▄▀   ▀▄   ▄▀   ▀▄   ▄▀              *
 *     ▄█▀███▀█▄ ▄█▀███▀█▄ ▄█▀███▀█▄ ▄█▀███▀█▄ ▄█▀███▀█▄ ▄█▀███▀█▄             *
 *     █▀█████▀█ █▀█████▀█ █▀█████▀█ █▀█████▀█ █▀█████▀█ █▀█████▀█             *
 *     ▀ ▀▀ ▀▀ ▀ ▀ ▀▀ ▀▀ ▀ ▀ ▀▀ ▀▀ ▀ ▀ ▀▀ ▀▀ ▀ ▀ ▀▀ ▀▀ ▀ ▀ ▀▀ ▀▀ ▀             *
 *                                                                            *
 *                         S P A C E   I N V A D E R S                        *
 *                                                                            *
 ******************************************************************************/

function SpaceInvaders({ onClose }) {
  const debugHitbox = false; // false

  /* Canvas */
  const canvasRef = useRef(null);
  const canvasSize = {
    width: 1260,
    height: 690,
  };

  /* Start Game */
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const isGameEndingRef = useRef(false);
  const animationIdRef = useRef(null);

  /* Player */
  const playerImageRef = useRef(new Image());
  const playerPart2Ref = useRef(false);
  const playerStats = playerConfig.stats;
  const playerOpacityRef = useRef(1);
  const playerRotationRef = useRef(0);
  const [playerX, setPlayerX] = useState(0);
  const playerXRef = useRef(playerX);
  const playerYRef = useRef(null);
  const isPlayerActiveRef = useRef(true);
  const isPlayerInvincible = useRef(false);
  const isPlayerFrozenRef = useRef(false);
  const playerTransitionRef = useRef(null);
  // Projectile
  const projectileImages = {
    greenPlayer: new Image(),
    bluePlayer: new Image(),
    redPlayer: new Image(),
  };
  const lastShotTimeRef = useRef(0);
  const projectilesRef = useRef([]);
  // Lives
  const [lives, setLives] = useState(50); // cambia - 5
  const livesRef = useRef(50); // cambia -5
  const [animateLifeLoss, setAnimateLifeLoss] = useState(false);
  const previousLivesRef = useRef(lives);
  const handlePlayerHit = (playerWidth) => {
    flashEffect(playerOpacityRef, { playerActive: isPlayerActiveRef });
    playSound(soundURL.playerHit, 0.7);
    createExplosion(particlesRef, {
      x: playerXRef.current + playerWidth / 2,
      y: playerYRef.current + playerStats.height / 2,
      ...playerConfig.hitParticles,
    });
  };
  // Ship Upgrade
  const shipUpgradeRef = useRef(null);
  useEffect(() => {
    ["greenPlayer2", "bluePlayer2", "redPlayer2"].forEach((key) => {
      const img = new Image();
      img.src = imgURL[key];
    });
  }, []);

  /* Power Up */
  // Shield
  const shieldImageRef = useRef(new Image());
  const shieldPowerUpRef = useRef([]);
  const isShieldActiveRef = useRef(false);
  const shieldTimerRef = useRef(null);
  const shieldStartTimeRef = useRef(null);
  const shieldStats = shieldConfig.stats;
  const handleShieldBlock = (x, y) => {
    createExplosion(particlesRef, { x, y, ...shieldConfig.hitParticles });
    playSound(soundURL.shieldBlock, 0.5);
  };

  /* Enemy */
  const hitEnemy = ({ x, y, particles, sound, volume = 1 }) => {
    createExplosion(particlesRef, { x, y, ...particles });
    playSound(sound, volume);
  };
  const destroyEnemy = ({ x, y, particles, sound, volume = 1, score }) => {
    hitEnemy({ x, y, particles, sound, volume });
    addScore(score);
  };

  /* Invader */
  const invaderImageRef = useRef(new Image());
  const invaderGridsRef = useRef([]);
  const invaderProjectilesRef = useRef([]);

  /* Follower */
  const followerImageRef = useRef(new Image());
  const followerImage2Ref = useRef(new Image());
  const followersRef = useRef([]);

  /* Meteor */
  const meteorsRef = useRef([]);
  const meteorImages = {
    big: new Image(),
    med: new Image(),
    small: new Image(),
  };

  /* Boss */
  const bossImageRef = useRef(new Image());
  const bossImage2Ref = useRef(new Image());
  const bossActiveRef = useRef(false);
  const bossRef = useRef(null);
  const bossDefeatedRef = useRef(false);
  const bossStats = bossConfig.stats;
  const handleBossHit = (x, y) => {
    createExplosion(particlesRef, { x, y, ...bossConfig.hitParticles });
    playSound(soundURL.hitFollower, 0.6);
  };
  // Phase 1 - Boss Projectiles
  const bossProjectilesSmallRef = useRef([]);
  const bossProjectilesMediumRef = useRef([]);
  const bossProjectilesLargeRef = useRef([]);
  // Phase 2 - Boss Lasers
  const bossBeamsRef = useRef([]);
  // Boss Phase
  const updateBossPhase = () => {
    const b = bossRef.current;
    if (!b || b.entering) return;

    let newPhase;
    if (b.lives <= 400) {
      newPhase = 3;
    } else if (b.lives <= 700) {
      newPhase = 2;
    } else {
      newPhase = 1;
    }

    if (b.phase !== newPhase) {
      b.phase = newPhase;
      handleBossPhaseChange(newPhase);
    }
  };
  const beamIntervalsRef = useRef([]);
  const handleBossPhaseChange = (phase) => {
    const b = bossRef.current;
    if (!b) return;

    switch (phase) {
      case 1:
        enablePhase1(true);
        enablePhase2(false);
        enablePhase3(false);
        bossBeamsRef.current = [];
        beamIntervalsRef.current.forEach(clearInterval);
        beamIntervalsRef.current = [];
        break;
      case 2:
        enablePhase1(false);
        enablePhase2(true);
        enablePhase3(false);

        if (b) {
          b.entering = true;
          b.entrancePhase = "rising";
          b.hasChangedImage = false;
        }

        const configs = [
          bossLaserConfig.small,
          bossLaserConfig.medium,
          bossLaserConfig.large,
        ];
        configs.forEach((config) => {
          config.x.forEach((x, i) => {
            const y = config.y[i];
            const interval = setInterval(() => {
              const now = performance.now();
              bossBeamsRef.current.push({
                x,
                y,
                width: config.beamWidth,
                damage: config.beamDamage,
                color: config.beamColor,
                type: config.type,
                isCharging: true,
                isShooting: false,
                createdAt: now,
                chargeEnd: now + config.chargeDuration,
                shootEnd: now + config.chargeDuration + config.beamDuration,
              });
            }, config.shootInterval);

            beamIntervalsRef.current.push(interval);
          });
        });

        break;
      case 3:
        enablePhase1(true);
        enablePhase2(true);
        enablePhase3(true);
        break;
    }
  };
  const isPhase1EnabledRef = useRef(true);
  const isPhase2EnabledRef = useRef(false);
  const isPhase3EnabledRef = useRef(false);
  const enablePhase1 = (value) => (isPhase1EnabledRef.current = value);
  const enablePhase2 = (value) => (isPhase2EnabledRef.current = value);
  const enablePhase3 = (value) => (isPhase3EnabledRef.current = value);
  // Boss Weak Points
  const activeWeakPointsRef = useRef([]);
  const generateWeakPointInside = (space) => {
    const weakWidth = 18;
    const maxX = space.width - weakWidth;
    const offsetX = Math.floor(Math.random() * (maxX + 1));
    return {
      x: space.x + offsetX,
      y: space.y,
      width: weakWidth,
      height: space.height,
      originSpace: space,
    };
  };
  const pickRandomWeakPoints = () => {
    const available = [...bossConfig.weakPoints.spaces];
    const selected = [];

    while (
      selected.length < bossConfig.weakPoints.count &&
      available.length > 0
    ) {
      const index = Math.floor(Math.random() * available.length);
      const space = available[index];
      selected.push(generateWeakPointInside(space));
      available.splice(index, 1);
    }

    activeWeakPointsRef.current = selected;
  };

  /* Score */
  const [score, setScore] = useState(0);
  const scoreRef = useRef(score);
  const addScore = (points) => {
    scoreRef.current += points;
    setScore(scoreRef.current);
  };
  const [displayedScore, setDisplayedScore] = useState(0);
  const [scoreTextSize, setScoreTextSize] = useState("w-4.5 h-4.5");
  const [topScores, setTopScores] = useState([]);
  const SCORE_KEY = "spaceInvadersTopScores";
  const getBestScores = () => {
    const stored = localStorage.getItem(SCORE_KEY);
    return stored ? JSON.parse(stored) : [];
  };
  const saveScoreIfHigh = (newScore) => {
    const scores = getBestScores();
    scores.push(newScore);
    const sorted = scores.sort((a, b) => b - a).slice(0, 3);
    localStorage.setItem(SCORE_KEY, JSON.stringify(sorted));
    setTopScores(sorted);
  };

  /* Menu */
  // Color Pick
  const [playerColor, setPlayerColor] = useState("greenPlayer");
  const [selectedColor, setSelectedColor] = useState(null);
  const handleColorChange = (color) => {
    setSelectedColor(color);
    setPlayerColor(color);
  };
  const borderColorMap = {
    greenPlayer: "border-green-500",
    bluePlayer: "border-blue-500",
    redPlayer: "border-red-500",
  };
  // Discount Code
  const DISCOUNT_CODE = "INVADER5";
  const SCORE_THRESHOLD = 10000;
  const [hasUnlockedDiscount, setHasUnlockedDiscount] = useState(false);

  /* Sound */
  const [audioEnabled, setAudioEnabled] = useState(true); // master
  const [musicVolume, setMusicVolume] = useState(0.4); // bg music
  const [sfxVolume, setSfxVolume] = useState(0.8); // sfx
  const [laserVolume, setlaserVolume] = useState(0.2); // sfx - laser
  const gameBgMusic = useRef(null);
  const [currentTheme, setCurrentTheme] = useState(themeURL[0]);
  const sfxVolumeRef = useRef(sfxVolume);
  const laserVolumeRef = useRef(laserVolume);
  const audioEnabledRef = useRef(audioEnabled);
  const bossMusic = useRef(null);
  const bossMusicPlayedRef = useRef(false);
  // play sfx
  const playSound = (url, volumeMultiplier = 1) => {
    if (audioEnabledRef.current && url) {
      const sound = new Audio(url);
      sound.volume = sfxVolumeRef.current * volumeMultiplier;
      sound.currentTime = 0;
      sound.play().catch((e) => console.warn("Play error:", e));
    }
  };
  // play sfx - laser volume
  const playLaserSound = (url, volumeMultiplier = 1) => {
    if (audioEnabledRef.current && url) {
      const laser = new Audio(url);
      laser.volume = laserVolumeRef.current * volumeMultiplier;
      laser.currentTime = 0;
      laser.play().catch((e) => console.warn("Play error:", e));
    }
  };
  // play boss music
  const playBossMusic = () => {
    if (!audioEnabledRef.current) return;

    gameBgMusic.current?.pause(); // stop background

    const intro = new Audio(soundURL.bossEnter);
    intro.volume = musicVolume * 0.4;
    intro.loop = false;
    bossMusic.current = intro;

    intro.play().catch((e) => console.warn("Boss music error:", e));

    intro.onended = () => {
      if (!audioEnabledRef.current || gameOver) return;

      const randomIndex = Math.floor(Math.random() * battleURL.length);
      const battleTrack = new Audio(battleURL[randomIndex]);
      battleTrack.volume = musicVolume;
      battleTrack.loop = true;
      bossMusic.current = battleTrack;

      battleTrack.play().catch((e) => console.warn("Boss battle error:", e));
    };
  };
  // bg music part2
  const resumeBackgroundMusic = () => {
    // stop boss music
    if (bossMusic.current) {
      bossMusic.current.pause();
      bossMusic.current = null;
    }

    if (!gameOver && isGameRunning && audioEnabledRef.current) {
      const randomIndex = Math.floor(Math.random() * theme2URL.length);
      const newTheme = theme2URL[randomIndex];

      if (gameBgMusic.current) {
        gameBgMusic.current.pause();
        gameBgMusic.current = null;
      }

      const next = new Audio(newTheme);
      next.loop = true;
      next.volume = musicVolume;
      gameBgMusic.current = next;

      next.play().catch((e) => console.warn("Autoplay error (part 2):", e));
    }
  };

  /* Particles */
  const particlesRef = useRef([]);
  const backgroundParticlesRef = useRef([]);
  const backgroundParticles = {
    radius: 2,
    speed: 0.3,
    speedBoss: 15,
    speed2: 1.8,
    opacity: 0.5,
    color: "white",
  };
  const isBoostingRef = useRef(false);

  /***************************************************************
   *                       ANIMATION & UI                        *
   ***************************************************************/

  /* Score UI */
  const renderScoreImages = (score) => {
    const padded = score.toString().padStart(5, "0");
    return padded
      .split("")
      .map((digit, index) => (
        <img
          key={index}
          src={imgURL[`n${digit}`]}
          alt={digit}
          className={`${scoreTextSize} mx-0.5 transition-all duration-200`}
        />
      ));
  };

  /* Lives UI */
  const renderLives = (lives) => {
    const livesStr = lives.toString().padStart(1, "0");
    const lifeIconKey = bossDefeatedRef.current
      ? `${playerColor}Lives2`
      : `${playerColor}Lives`;

    return (
      <div className="flex items-center bg-black/60 px-2 py-1 rounded">
        <img
          src={imgURL[lifeIconKey]}
          alt="life"
          className={`w-6 h-auto mr-1 transition-transform duration-300 ${
            animateLifeLoss ? "scale-175" : ""
          }`}
        />
        <img src={imgURL.nX} alt="x" className="w-3 h-3 mx-0.5" />
        {livesStr.split("").map((digit, idx) => (
          <img
            key={idx}
            src={imgURL[`n${digit}`]}
            alt={digit}
            className="w-4.5 h-4.5 mx-0.5"
          />
        ))}
      </div>
    );
  };

  /* Lives Animation */
  useEffect(() => {
    if (lives < previousLivesRef.current) {
      setAnimateLifeLoss(true);
      setTimeout(() => setAnimateLifeLoss(false), 300);
    }
    previousLivesRef.current = lives;
  }, [lives]);

  /* Score Animation */
  function getStep(delta) {
    if (delta <= 0) return 0;

    const maxPercent = 0.05;
    const minPercent = 0.02;

    const deltaLog = Math.log10(delta);
    let percent = maxPercent - (deltaLog / 4) * (maxPercent - minPercent);
    percent = Math.min(maxPercent, Math.max(minPercent, percent));

    const step = Math.max(2, Math.floor(delta * percent));

    return step;
  }
  useEffect(() => {
    if (displayedScore === score || displayedScore > score) return;

    const interval = setInterval(() => {
      setDisplayedScore((prev) => {
        const delta = score - prev;
        const step = getStep(delta);

        const next = Math.min(prev + step, score);
        // console.log(
        //   `Score: ${score}, Prev: ${prev}, Delta: ${delta}, Step: ${step}, Next: ${next}`
        // );

        const currentK = Math.floor(prev / 1000);
        const nextK = Math.floor(next / 1000);

        const current10K = Math.floor(prev / 10000);
        const next10K = Math.floor(next / 10000);

        // large expansion
        if (current10K !== next10K) {
          setScoreTextSize("w-8 h-8");
          setTimeout(() => setScoreTextSize("w-4.5 h-4.5"), 400);
        }
        // medium expansion
        else if (currentK !== nextK) {
          setScoreTextSize("w-6 h-6");
          setTimeout(() => setScoreTextSize("w-4.5 h-4.5"), 300);
        }

        return next;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [score, displayedScore]);

  /***************************************************************
   *                            VOLUME                           *
   ***************************************************************/

  // Sync: audio ref volume → current volume
  useEffect(() => {
    sfxVolumeRef.current = sfxVolume;
    laserVolumeRef.current = laserVolume;
    audioEnabledRef.current = audioEnabled;
  }, [sfxVolume, laserVolume, audioEnabled]);

  // Sync: Bg music volume → current volume
  useEffect(() => {
    if (gameBgMusic.current) {
      gameBgMusic.current.volume = musicVolume;
    }
    if (bossMusic.current) {
      bossMusic.current.volume = musicVolume;
    }
  }, [musicVolume]);

  // Load new Bg music
  useEffect(() => {
    if (gameBgMusic.current) {
      gameBgMusic.current.pause();
    }

    gameBgMusic.current = new Audio(currentTheme);
    gameBgMusic.current.loop = true;
    gameBgMusic.current.volume = musicVolume;

    if (isGameRunning && !gameOver && audioEnabled) {
      gameBgMusic.current
        .play()
        .catch((e) => console.warn("Autoplay error:", e));
    }

    return () => {
      gameBgMusic.current?.pause();
    };
  }, [currentTheme]);

  // Play/Pause Bg
  useEffect(() => {
    if (bossActiveRef.current) {
      gameBgMusic.current?.pause();
      return;
    }

    if (bossDefeatedRef.current) {
      return;
    }

    if (isGameRunning && !gameOver && audioEnabled) {
      gameBgMusic.current?.play().catch((e) => {
        console.warn("Autoplay error:", e);
      });
    } else {
      gameBgMusic.current?.pause();
    }
  }, [isGameRunning, gameOver, audioEnabled]);

  // Manage all music
  useEffect(() => {
    if (!audioEnabled) {
      gameBgMusic.current?.pause();
      bossMusic.current?.pause();
    } else {
      if (!gameOver && isGameRunning) {
        if (bossActiveRef.current) {
          bossMusic.current
            ?.play()
            .catch((e) => console.warn("Boss music resume error:", e));
        } else {
          gameBgMusic.current
            ?.play()
            .catch((e) => console.warn("BG music resume error:", e));
        }
      }
    }
  }, [audioEnabled, isGameRunning, gameOver]);

  /***************************************************************
   *                      useEFFECT: SCORE                       *
   ***************************************************************/

  /* Game Over - Score + Discount Code */
  useEffect(() => {
    if (gameOver && score > 0) {
      saveScoreIfHigh(score);

      // Discount Code
      if (score >= SCORE_THRESHOLD) {
        const currentCodes = JSON.parse(
          localStorage.getItem("unlockedCodes") || "[]"
        );
        if (!currentCodes.includes(DISCOUNT_CODE)) {
          localStorage.setItem(
            "unlockedCodes",
            JSON.stringify([...currentCodes, DISCOUNT_CODE])
          );
        }
        setHasUnlockedDiscount(true);
      } else {
        setHasUnlockedDiscount(false);
      }
    }
  }, [gameOver, score]);
  // Get Top Scores
  useEffect(() => {
    setTopScores(getBestScores());
  }, []);

  /****************************************************************
   *                                                              *
   *                                                              *
   *                        < GAME LOGIC >                        *
   *                                                              *
   *                                                              *
   ****************************************************************/

  /* === SPAWN: BOSS === */
  useEffect(() => {
    if (
      scoreRef.current >= bossConfig.spawn &&
      !bossActiveRef.current &&
      !bossDefeatedRef.current
    ) {
      bossActiveRef.current = true;
    }

    // === ENEMY RETREAT ===
    if (bossActiveRef.current) {
      followersRef.current.forEach((f) => {
        f.retreating = true;
      });

      invaderGridsRef.current.forEach((grid) => {
        grid.retreating = true;
      });

      meteorsRef.current.forEach((m) => {
        m.retreating = true;
      });
    }
  }, [score]);

  /* === SYNCHRO === */
  useEffect(() => {
    playerXRef.current = playerX;
    livesRef.current = lives;
  }, [playerX, lives]);

  /* === MAIN === */
  useEffect(() => {
    if (!isGameRunning) return;
    isPlayerActiveRef.current = true;
    playerOpacityRef.current = 1;

    /* === INIT CANVAS === */
    document.body.style.overflow = "hidden";
    const canvas = canvasRef.current;
    const c = canvas.getContext("2d");
    if (!c) return;
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    /* === BACKGROUND ANIMATION === */
    const spawnBackgroundParticles = () => {
      const particles = [];
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * backgroundParticles.radius,
          speedY: isBoostingRef.current
            ? backgroundParticles.speedBoss
            : bossDefeatedRef.current
            ? backgroundParticles.speed2
            : backgroundParticles.speed,
          opacity:
            backgroundParticles.opacity +
            Math.random() * backgroundParticles.opacity,
          color: backgroundParticles.color,
        });
      }
      backgroundParticlesRef.current = particles;
    };
    spawnBackgroundParticles();

    /* === LOAD IMAGES === */
    const loadImages = () => {
      // player
      playerImageRef.current.src = imgURL[playerColor];
      projectileImages.greenPlayer.src = imgURL.laserGreen;
      projectileImages.bluePlayer.src = imgURL.laserBlue;
      projectileImages.redPlayer.src = imgURL.laserRed;
      // power up
      shieldImageRef.current.src = imgURL.shield;
      // enemy
      invaderImageRef.current.src = imgURL.invader;
      meteorImages.big.src = imgURL.meteorBig;
      meteorImages.med.src = imgURL.meteorMed;
      meteorImages.small.src = imgURL.meteorSmall;
      followerImageRef.current.src = imgURL.follower;
      followerImage2Ref.current.src = imgURL.follower2;
      // boss
      bossImageRef.current.src = imgURL.boss1;
      bossImage2Ref.current.src = imgURL.boss2;
    };
    loadImages();

    /* === INIT PLAYER === */
    const resetPlayerPosition = () => {
      const initialX = canvas.width / 2 - playerStats.width / 2;
      setPlayerX(initialX);
      playerXRef.current = initialX;
      playerRotationRef.current = 0;
    };
    playerYRef.current = canvas.height - playerStats.height - 10;
    resetPlayerPosition();

    /***************************************************************
     *                      SECTION: HITBOX                        *
     ***************************************************************/

    /* === PLAYER HITBOX === */
    const getPlayerHitbox = (playerWidth) => {
      // === SHIELD HITBOX ===
      if (isShieldActiveRef.current) {
        const x = playerXRef.current + playerWidth / 2 - shieldStats.width / 2;
        const y =
          playerYRef.current + playerStats.height / 2 - shieldStats.height / 2;
        return {
          x,
          y,
          width: shieldStats.width,
          height: shieldStats.height,
        };
      }

      return {
        x: playerXRef.current,
        y: playerYRef.current,
        width: playerWidth,
        height: playerStats.height,
      };
    };

    /* === BOSS BEAM HITBOX === */
    const getBossBeamHitbox = (beam) => {
      const beamWidth = bossLaserConfig[beam.type].beamWidth;
      const beamX = bossRef.current.x + beam.x - beamWidth / 2;
      const beamY = bossRef.current.y + beam.y;
      const beamHeight = canvas.height - beamY;

      return {
        x: beamX,
        y: beamY,
        width: beamWidth,
        height: beamHeight,
      };
    };

    /***************************************************************
     *                   SECTION: SPAWN POWER UP                   *
     ***************************************************************/

    /* === SPAWN: SHIELD BUBBLE === */
    const shieldSpawnInterval = spawnShieldBubble(
      bossRef,
      bossDefeatedRef,
      scoreRef,
      shieldConfig,
      canvas,
      shieldImageRef,
      shieldPowerUpRef,
      shieldStats
    );

    /***************************************************************
     *                    SECTION: SPAWN ENEMY                     *
     ***************************************************************/

    /* === SPAWN: 1st INVADER GRID === */
    spawnInvaderGrid(invaderGridsRef, invaderConfig);
    /* === SPAWN: NEXT INVADER GRIDS === */
    const invaderGridTimeout = scheduleInvaderGrid(
      invaderGridsRef,
      invaderConfig,
      isGameRunning,
      bossActiveRef
    );

    /* === SPAWN: INVADER PROJECTILE === */
    const invaderShootInterval = spawnInvaderProjectile(
      invaderGridsRef,
      invaderProjectilesRef,
      invaderConfig,
      bossActiveRef,
      bossDefeatedRef,
      soundURL,
      playLaserSound
    );

    /* === SPAWN: METEOR === */
    const meteorSpawnInterval = setupMeteorSpawn(
      meteorConfig,
      meteorsRef,
      meteorImages,
      canvas,
      bossActiveRef,
      bossDefeatedRef,
      scoreRef
    );

    /* === SPAWN: FOLLOWER === */
    const followerSpawnInterval = setupFollowerSpawn(
      followerConfig,
      followersRef,
      canvas,
      bossActiveRef,
      scoreRef
    );

    /* === SPAWN: BOSS WEAK POINTS === */
    const bossWeakPointsSpawn = setInterval(() => {
      if (
        bossRef.current &&
        !bossRef.current.retreating &&
        !bossRef.current.entering
      ) {
        pickRandomWeakPoints();
      }
    }, 5000);

    /***************************************************************
     *                      SECTION: FUNCTIONS                     *
     ***************************************************************/

    /* === INPUT HANDLING === */
    const keysPressed = new Set();
    const handleKeyDown = (e) => {
      keysPressed.add(e.key);
    };
    const handleKeyUp = (e) => {
      keysPressed.delete(e.key);
    };
    addEventListener("keydown", handleKeyDown);
    addEventListener("keyup", handleKeyUp);

    /****************************************************************
     *                                                              *
     *                         < GAME LOOP >                        *
     *                                                              *
     ****************************************************************/
    const gameLoop = () => {
      /***************************************************************
       *                        SECTION: PLAYER                      *
       ***************************************************************/
      const playerWidth = playerPart2Ref.current
        ? playerStats.width2
        : playerStats.width;

      if (isPlayerActiveRef.current) {
        const playerProj = playerConfig.projectile;

        /* === PLAYER MOVEMENT === */
        const playerSpeed = playerPart2Ref.current
          ? playerStats.speed2
          : playerStats.speed;

        if (keysPressed.has("ArrowLeft") || keysPressed.has("a")) {
          playerXRef.current = Math.max(playerXRef.current - playerSpeed, 0);
          playerRotationRef.current = -playerStats.rotation; // tilt left
        } else if (keysPressed.has("ArrowRight") || keysPressed.has("d")) {
          playerXRef.current = Math.min(
            playerXRef.current + playerSpeed,
            canvas.width - playerWidth
          );
          playerRotationRef.current = playerStats.rotation; // tilt right
        } else {
          playerRotationRef.current *= playerStats.rotationBack; // smooth return
        }

        /* === SHOOT PROJECTILES === */
        const now = Date.now();
        const projectileSpeed = playerPart2Ref.current
          ? playerProj.speed2
          : playerProj.speed;

        if (keysPressed.has(" ")) {
          if (now - lastShotTimeRef.current > playerProj.cooldown) {
            const newProjectile = {
              x: playerXRef.current + playerWidth / 2 - 4,
              y: canvas.height - playerStats.height - 10,
              width: playerProj.width,
              height: playerProj.height,
              speed: projectileSpeed,
              color: playerColor,
            };
            projectilesRef.current.push(newProjectile);
            lastShotTimeRef.current = now;

            playLaserSound(soundURL.laser);
          }
        }
      }
      // State Update for Drawing
      setPlayerX(playerXRef.current);

      /***************************************************************
       *                        ENEMY MOVEMENT                       *
       ***************************************************************/

      /* === INVADER GRIDS MOVEMENT === */
      updateInvaderGrids(invaderGridsRef, canvas, invaderConfig);

      /* === FOLLOWER MOVEMENT === */
      updateFollower({
        followerConfig,
        followersRef,
        canvas,
        playerX: playerXRef.current,
        playerWidth,
        bossDefeatedRef,
        soundURL,
        playSound,
      });

      // === LOSE CONDITION 2 ===
      checkInvaderLoseCondition(invaderGridsRef, canvas, handleGameOver);

      /* === CLEAR CANVAS === */
      c.clearRect(0, 0, canvas.width, canvas.height);

      /***************************************************************
       *                   SECTION: UPDATE POSITION                  *
       ***************************************************************/

      /* === UPDATE POSITION: PLAYER PROJECTILES === */
      projectilesRef.current = projectilesRef.current.filter((p) => {
        p.y -= p.speed;
        return p.y + p.height > 0;
      });
      projectilesRef.current.forEach((p) => {
        const img = projectileImages[p.color];
        if (img.complete) {
          c.drawImage(img, p.x, p.y, p.width, p.height);
        }
      });

      /* === UPDATE POSITION: INVADER PROJECTILES === */
      invaderProjectilesRef.current = invaderProjectilesRef.current.filter(
        (p) => {
          p.y += p.speed;
          return p.y < canvas.height;
        }
      );
      invaderProjectilesRef.current.forEach((p) => {
        c.fillStyle = "white";
        c.fillRect(p.x, p.y, p.width, p.height);
      });

      /* === UPDATE POSITION: METEOR === */
      meteorsRef.current = meteorsRef.current.filter((m) => {
        // === BOSS - RETREAT ===
        if (m.retreating) {
          m.y += m.retreatSpeed;

          // remove meteor
          return m.y < canvas.height;
        } else {
          m.y += m.speed;

          return m.y < canvas.height;
        }
      });
      meteorsRef.current.forEach((m) => {
        m.rotation += m.rotationSpeed;

        // rotation
        c.save();
        c.translate(m.x + m.width / 2, m.y + m.height / 2);
        c.rotate(m.rotation);
        c.translate(-m.x - m.width / 2, -m.y - m.height / 2);

        c.drawImage(m.image, m.x, m.y, m.width, m.height);

        // hitbox
        if (debugHitbox) {
          c.fillStyle = "rgba(0, 255, 0, 0.2)";
          c.fillRect(m.x, m.y, m.width, m.height);
        }

        c.restore();
      });

      /* === UPDATE POSITION: SHIELD === */
      shieldPowerUpRef.current = shieldPowerUpRef.current.filter((p) => {
        p.y += p.speed;
        return p.y < canvas.height;
      });
      shieldPowerUpRef.current.forEach((p) => {
        if (p.image && p.image.complete) {
          c.drawImage(p.image, p.x, p.y, p.width, p.height);

          // hitbox
          if (debugHitbox) {
            c.fillStyle = "rgba(0, 0, 255, 0.2)";
            c.fillRect(p.x, p.y, p.width, p.height);
          }
        } else {
          // fallback
          c.fillStyle = "white";
          c.fillRect(p.x, p.y, p.width, p.height);
          console.warn("[SHIELD] image not ready");
        }
      });

      /* === UPDATE: PARTICLES  === */
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.velocity.x;
        p.y += p.velocity.y;
        p.opacity -= 0.02;
        return p.opacity > 0;
      });
      particlesRef.current.forEach((p) => {
        c.save();
        c.globalAlpha = p.opacity;
        c.beginPath();
        c.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        c.fillStyle = p.color;
        c.fill();
        c.closePath();
        c.restore();
      });

      /***************************************************************
       *       COLLISION DETECTION - PLAYER PROJECTILE → ENEMY       *
       ***************************************************************/

      /* === COLLISION DETECTION: PLAYER PROJECTILE → INVADER === */
      collisionPlayerHitInvader(
        projectilesRef,
        invaderGridsRef,
        invaderConfig,
        destroyEnemy,
        soundURL,
        addScore,
        playSound
      );

      /* === COLLISION DETECTION: PLAYER PROJECTILE → METEOR === */
      collisionPlayerHitMeteor(
        projectilesRef,
        meteorsRef,
        meteorConfig,
        meteorImages,
        hitEnemy,
        destroyEnemy,
        addScore,
        soundURL
      );

      /* === COLLISION DETECTION: PLAYER PROJECTILE → FOLLOWER === */
      collisionPlayerHitFollower(
        projectilesRef,
        followersRef,
        followerConfig,
        soundURL,
        hitEnemy,
        destroyEnemy
      );

      /***************************************************************
       *            COLLISION DETECTION - ENEMY → PLAYER             *
       ***************************************************************/

      /* === COLLISION DETECTION: SHIELD → PLAYER === */
      collisionShieldHitPlayer(
        shieldPowerUpRef,
        isGameEndingRef,
        isPlayerInvincible,
        playerXRef,
        playerYRef,
        playerStats,
        playerWidth,
        isShieldActiveRef,
        shieldStartTimeRef,
        shieldTimerRef,
        shieldStats,
        playSound,
        soundURL
      );

      /* === COLLISION DETECTION: INVADER PROJECTILE → PLAYER === */
      collisionInvaderHitPlayer({
        invaderProjectilesRef,
        invaderConfig,
        isGameEndingRef,
        isPlayerInvincible,
        isShieldActiveRef,
        handleShieldBlock,
        handlePlayerHit,
        livesRef,
        setLives,
        handleGameOver,
        playerWidth,
        getPlayerHitbox,
      });

      /* === COLLISION DETECTION: METEOR → PLAYER === */
      collisionMeteorHitPlayer(
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
      );

      /* === COLLISION DETECTION: FOLLOWER BEAM → PLAYER === */
      collisionFollowerHitPlayer(
        canvas,
        followersRef,
        followerConfig,
        isGameEndingRef,
        isPlayerInvincible,
        isShieldActiveRef,
        handleShieldBlock,
        handlePlayerHit,
        livesRef,
        setLives,
        handleGameOver,
        playerWidth,
        getPlayerHitbox,
        getFollowerBeamHitbox,
        bossDefeatedRef
      );

      /***************************************************************
       *                        SECTION: DRAW                        *
       ***************************************************************/

      /* === DRAW: PLAYER === */
      if (playerTransitionRef.current === "exitScene") {
        playerYRef.current += 0.5;
        if (playerYRef.current >= canvas.height + 50) {
          playerTransitionRef.current = null;
          playerYRef.current = canvas.height + 100;
          playerRotationRef.current = 0;
        }
      } else if (playerTransitionRef.current === "reenterScene") {
        playerYRef.current -= 3;
        if (playerYRef.current <= canvas.height - playerStats.height - 10) {
          playerYRef.current = canvas.height - playerStats.height - 10;
          playerTransitionRef.current = null;
        }
      }
      const drawPlayer = () => {
        c.save();
        // flash animation & player lose
        c.globalAlpha =
          isPlayerActiveRef.current || isPlayerFrozenRef.current
            ? playerOpacityRef.current
            : 0;
        // rotation
        c.translate(
          playerXRef.current + playerWidth / 2,
          playerYRef.current + playerStats.height / 2
        );
        c.rotate(playerRotationRef.current);
        c.translate(
          -playerXRef.current - playerWidth / 2,
          -playerYRef.current - playerStats.height / 2
        );
        if (playerImageRef.current.complete) {
          c.drawImage(
            playerImageRef.current,
            playerXRef.current,
            playerYRef.current,
            playerWidth,
            playerStats.height
          );
        } else {
          // fallback
          c.fillStyle = "green";
          c.fillRect(
            playerXRef.current,
            playerYRef.current,
            playerWidth,
            playerStats.height
          );
        }

        // hitbox
        if (debugHitbox) {
          c.fillStyle = "rgba(255, 0, 0, 0.2)";
          c.fillRect(
            playerXRef.current,
            playerYRef.current,
            playerWidth,
            playerStats.height
          );
        }

        c.restore();
      };
      drawPlayer();

      /* === DRAW: SHIELD ON PLAYER === */
      if (isShieldActiveRef.current && shieldImageRef.current.complete) {
        const now = performance.now();
        const elapsed = now - shieldStartTimeRef.current;
        const remaining = shieldStats.time - elapsed;

        // flash animation
        let opacity = 1;
        if (remaining <= 2000) {
          const flashSpeed = 200;
          opacity = Math.sin((now / flashSpeed) * Math.PI) * 0.5 + 0.5;
        }

        const shieldX =
          playerXRef.current + playerWidth / 2 - shieldStats.width / 2;
        const shieldY =
          playerYRef.current + playerStats.height / 2 - shieldStats.height / 2;

        c.save();
        c.globalAlpha = opacity;
        c.drawImage(
          shieldImageRef.current,
          shieldX,
          shieldY,
          shieldStats.width,
          shieldStats.height
        );
        c.restore();

        // hitbox
        if (debugHitbox) {
          c.save();
          c.strokeStyle = "rgba(0, 255, 255, 0.7)";
          c.lineWidth = 2;
          c.strokeRect(shieldX, shieldY, shieldStats.width, shieldStats.height);
          c.restore();
        }
      }

      /* === DRAW: INVADER GRIDS === */
      drawInvaderGrids(c, invaderGridsRef, invaderConfig, invaderImageRef);

      /* === DRAW: FOLLOWER & BEAM === */
      drawFollower({
        c,
        canvas,
        followerConfig,
        followersRef,
        followerImageRef,
        followerImage2Ref,
        bossDefeatedRef,
      });

      /* === DRAW: BACKGROUND ANIMATION === */
      backgroundParticlesRef.current.forEach((p) => {
        // boosted
        p.speedY = isBoostingRef.current
          ? backgroundParticles.speedBoss
          : bossDefeatedRef.current
          ? backgroundParticles.speed2
          : backgroundParticles.speed;

        p.y += p.speedY;

        if (p.y - p.radius > canvas.height) {
          p.x = Math.random() * canvas.width;
          p.y = -p.radius;
        }

        c.save();
        c.globalAlpha = p.opacity;
        c.beginPath();
        c.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        c.fillStyle = p.color;
        c.fill();
        c.closePath();
        c.restore();
      });

      /***************************************************************
       *                        SECTION: BOSS                        *
       ***************************************************************/

      /* === SPAWN: BOSS === */
      if (
        bossActiveRef.current &&
        !bossRef.current &&
        scoreRef.current >= bossConfig.spawn
      ) {
        bossRef.current = {
          x: canvas.width / 2 - bossStats.width / 2,
          y: -bossStats.height,
          width: bossStats.width,
          height: bossStats.height,
          lives: bossStats.lives,
          entering: true,
          entrancePhase: "descending",
          phase: 1,
          hasChangedImage: false,
          retreating: false,
        };

        pickRandomWeakPoints();

        isPlayerActiveRef.current = false;
        isPlayerFrozenRef.current = true;
      }

      /* === DRAW: BOSS === */
      if (bossRef.current) {
        // === ANIMATION: ENTERING ===
        if (bossRef.current.entering) {
          const b = bossRef.current;

          isBoostingRef.current = true;

          if (b.phase === 1) {
            isPlayerInvincible.current = true;

            // play boss entrance music
            if (!bossMusicPlayedRef.current) {
              bossMusicPlayedRef.current = true;
              playBossMusic();
            }

            // DESCENDING → RISING
            if (b.entrancePhase === "descending") {
              playerTransitionRef.current = "exitScene";
              b.y += 2; // descending speed - cambia 0.3

              if (b.y >= 0) {
                b.entrancePhase = "rising";
                playSound(soundURL.bossDescending, 0.5);
              }
            } else if (b.entrancePhase === "rising") {
              playerTransitionRef.current = "reenterScene";
              isBoostingRef.current = false;
              b.y -= 2; // rising speed - cambia 0.5

              if (b.y <= -40) {
                b.y = -40;
                b.entering = false;
                b.entrancePhase = null;

                isPlayerActiveRef.current = true;
                isPlayerInvincible.current = false;
                isPlayerFrozenRef.current = false;
              }
            }
          } else if (b.phase === 2) {
            // RISING → IMAGE SWAP → DESCENDING
            if (b.entrancePhase === "rising") {
              b.y -= 1.2; // rising speed

              if (b.y <= -b.height) {
                b.y = -b.height;
                playSound(soundURL.bossDescending2, 0.5);

                if (!b.hasChangedImage) {
                  bossImageRef.current = bossImage2Ref.current;
                  b.hasChangedImage = true;
                }

                b.entrancePhase = "descending";
              }
            } else if (b.entrancePhase === "descending") {
              isBoostingRef.current = false;
              b.y += 1; // descending speed

              if (b.y >= -40) {
                b.y = -40;
                b.entering = false;
                b.entrancePhase = null;

                isPlayerActiveRef.current = true;
                isPlayerInvincible.current = false;
                isPlayerFrozenRef.current = false;
              }
            }
          } else if (b.entrancePhase === "retreat") {
            // === BOSS DEFEATED ===

            isPlayerInvincible.current = true;
            b.y -= 1; // rising speed

            if (b.y + b.height < 0) {
              bossRef.current = null;
              bossActiveRef.current = false;
              bossDefeatedRef.current = true;
              isBoostingRef.current = false;

              isPlayerActiveRef.current = true;
              isPlayerFrozenRef.current = false;
              isPlayerInvincible.current = false;
              playerTransitionRef.current = null;

              bossBeamsRef.current = [];
              bossMusicPlayedRef.current = false;

              addScore(bossStats.score);

              // === DRAW: SHIP BUBBLE ===
              const upgradeX = playerXRef.current + playerWidth / 2 - 20;
              const upgradeY = -60;
              const upgradeImage = new Image();
              upgradeImage.src = imgURL[`${playerColor}2`];
              shipUpgradeRef.current = {
                x: upgradeX,
                y: upgradeY,
                width: shipBubbleConfig.width,
                height: shipBubbleConfig.height,
                speed: shipBubbleConfig.speed,
                stopY: playerYRef.current - 10,
                image: upgradeImage,
              };
            }
          }
        }

        // === DRAW BOSS IMAGE ===
        if (bossRef.current) {
          const b = bossRef.current;

          if (bossImageRef.current.complete) {
            c.drawImage(bossImageRef?.current, b.x, b.y, b.width, b.height);
          } else {
            c.fillStyle = "red";
            c.fillRect(b.x, b.y, b.width, b.height);
          }
        }

        // === DRAW BOSS WEAK POINTS ===
        if (bossRef.current && !bossRef.current.entering) {
          const bossX = bossRef.current.x;
          const bossY = bossRef.current.y;

          activeWeakPointsRef.current.forEach((wp) => {
            c.fillStyle = "rgba(0, 0, 255, 0.4)";
            c.fillRect(bossX + wp.x, bossY + wp.y, wp.width, wp.height);
          });
        }

        // === DRAW BOSS LIFE BAR ===
        if (bossRef.current && !bossRef.current.entering) {
          const lifeRatio = Math.max(bossRef.current.lives / 1000, 0);

          const barHeight = 7;
          const barWidth = canvas.width / 2;
          const x = (canvas.width - barWidth) / 2;
          const y = 1;

          c.fillStyle = "rgba(0, 0, 0, 0.2)";
          c.fillRect(x, y, barWidth, barHeight);

          if (bossRef.current.lives > 700) {
            c.fillStyle = "rgba(34, 211, 238, 0.4)";
          } else if (bossRef.current.lives > 400) {
            c.fillStyle = "rgba(250, 204, 21, 0.6)";
          } else {
            c.fillStyle = "rgba(239, 68, 68, 0.8)";
          }

          c.fillRect(x, y, barWidth * lifeRatio, barHeight);

          c.strokeStyle = "rgba(255, 255, 255, 0.4)";
          c.lineWidth = 2;
          c.strokeRect(x, y, barWidth, barHeight);
        }
      }

      /* === SPAWN: SHIP BUBBLE === */
      if (shipUpgradeRef.current) {
        const u = shipUpgradeRef.current;

        if (u.y < u.stopY) {
          u.y += u.speed;
        }

        c.drawImage(u.image, u.x, u.y, u.width, u.height);

        // COLLISION DETECTION: SHIP BUBBLE → PLAYER
        const hit =
          u.x < playerXRef.current + playerWidth &&
          u.x + u.width > playerXRef.current &&
          u.y < playerYRef.current + playerStats.height &&
          u.y + u.height > playerYRef.current;

        if (hit) {
          shipUpgradeRef.current = null;

          playerImageRef.current = new Image();
          playerImageRef.current.src = imgURL[`${playerColor}2`];
          playerPart2Ref.current = true;

          playSound(soundURL.shipUpgrade);
        }
      }

      /* === DRAW: BOSS PROJECTILES === */
      // === PHASE 1 ===
      if (
        bossRef.current &&
        !bossRef.current.entering &&
        isPhase1EnabledRef.current
      ) {
        generateBossProjectiles({
          boss: bossRef.current,
          bossConfig,
          bossStats,
          bossProjectileConfig,
          bossProjectilesRefs: {
            small: bossProjectilesSmallRef,
            medium: bossProjectilesMediumRef,
            large: bossProjectilesLargeRef,
          },
          playLaserSound,
          soundURL,
        });
      }
      // === PHASE 2 ===
      if (
        bossRef.current &&
        !bossRef.current.entering &&
        isPhase2EnabledRef.current
      ) {
        const now = performance.now();
        const playedShootSound = {
          small: false,
          medium: false,
          large: false,
        };
        const volumeMapActive = { small: 0.4, medium: 0.5, large: 0.6 };

        bossBeamsRef.current = bossBeamsRef.current.filter((beam) => {
          // === BEAM ACTIVE ===
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

          const hitbox = getBossBeamHitbox(beam);

          // === BEAM CHARGE ===
          if (beam.isCharging) {
            const config = bossLaserConfig[beam.type];
            const colorCycle =
              config?.chargeColors || bossLaserConfig.large.chargeColors;

            const colorIndex = Math.floor(now / 100) % colorCycle.length;
            const alpha = 0.3 + 0.5 * Math.abs(Math.sin(now / 300));

            c.fillStyle = colorCycle[colorIndex];
            c.globalAlpha = alpha;
            c.fillRect(hitbox.x, hitbox.y, hitbox.width, hitbox.height);
            c.globalAlpha = 1;
          }

          // === BEAM RENDER ===
          if (beam.isShooting) {
            const baseWidth = hitbox.width * 2;
            const tipWidth = hitbox.width;
            const beamHeight = hitbox.height;
            const startX = hitbox.x + hitbox.width / 2;
            const startY = hitbox.y + 15;

            c.save();
            c.beginPath();
            c.moveTo(startX - baseWidth / 2, startY);
            c.quadraticCurveTo(
              startX,
              startY - 40,
              startX + baseWidth / 2,
              startY
            );
            c.lineTo(startX + tipWidth / 2, startY + beamHeight);
            c.lineTo(startX - tipWidth / 2, startY + beamHeight);
            c.closePath();

            c.fillStyle = beam.color;
            c.globalAlpha = 0.7;
            c.fill();
            c.restore();
          }

          return true;
        });
      }
      // === PHASE 3 ===
      if (
        bossRef.current &&
        !bossRef.current.entering &&
        isPhase3EnabledRef.current
      ) {
      }

      /* === DRAW: BOSS PROJECTILES === */
      [
        bossProjectilesSmallRef,
        bossProjectilesMediumRef,
        bossProjectilesLargeRef,
      ].forEach((ref, i) => {
        const type = ["small", "medium", "large"][i];
        const config = bossProjectileConfig[type];

        ref.current = ref.current.filter((p) => p.y < canvas.height);
        drawBossProjectiles(ref.current, config, c);
      });

      /* === COLLISION DETECTION: BOSS PROJECTILES → PLAYER === */
      collisionBossProjHitPlayer({
        bossProjectilesRefs: [
          bossProjectilesSmallRef,
          bossProjectilesMediumRef,
          bossProjectilesLargeRef,
        ],
        getPlayerHitbox,
        playerWidth,
        isPlayerInvincible,
        isGameEnding: isGameEndingRef,
        isShieldActive: isShieldActiveRef,
        handleShieldBlock,
        handlePlayerHit,
        livesRef,
        setLives,
        handleGameOver,
      });

      /* === COLLISION DETECTION: BOSS LASERS → PLAYER === */
      collisionBossBeamHitPlayer({
        boss: bossRef.current,
        bossBeamsRef,
        isPhase2EnabledRef,
        isGameEndingRef,
        isPlayerInvincible,
        isShieldActiveRef,
        getBossBeamHitbox,
        getPlayerHitbox,
        playerWidth,
        playerXRef,
        playerYRef,
        handleShieldBlock,
        handlePlayerHit,
        livesRef,
        setLives,
        handleGameOver,
      });

      /* === COLLISION DETECTION: PLAYER PROJECTILE → BOSS === */
      if (bossRef.current && !bossRef.current.entering) {
        const b = bossRef.current;

        const hitbox = {
          x: b.x,
          y: b.y + b.height - 10,
          width: b.width,
          height: 10,
        };

        projectilesRef.current.forEach((p, pIndex) => {
          const bossX = b.x;
          const bossY = b.y;

          const hitIndex = activeWeakPointsRef.current.findIndex((wp) => {
            return (
              p.x < bossX + wp.x + wp.width &&
              p.x + p.width > bossX + wp.x &&
              p.y < bossY + wp.y + wp.height &&
              p.y + p.height > bossY + wp.y
            );
          });

          if (hitIndex !== -1) {
            b.lives -= 300; // cambia - 1
            handleBossHit(p.x + p.width / 2, p.y);
            projectilesRef.current.splice(pIndex, 1);

            // replace weak point
            const usedSpaces = activeWeakPointsRef.current.map(
              (p) => p.originSpace
            );
            const remainingSpaces = bossConfig.weakPoints.spaces.filter(
              (s) => !usedSpaces.includes(s)
            );
            if (remainingSpaces.length > 0) {
              const newSpace =
                remainingSpaces[
                  Math.floor(Math.random() * remainingSpaces.length)
                ];
              const newPoint = generateWeakPointInside(newSpace);
              activeWeakPointsRef.current[hitIndex] = newPoint;
            }
          }
        });

        updateBossPhase();

        // === BOSS DEFEATED CONDITION ===
        if (b.lives <= 0 && !b.retreating) {
          b.retreating = true;
          b.entering = true;
          b.entrancePhase = "retreat";
          isPlayerFrozenRef.current = true;

          enablePhase1(false);
          enablePhase2(false);
          enablePhase3(false);
          beamIntervalsRef.current.forEach(clearInterval);
          beamIntervalsRef.current = [];

          playSound(soundURL.bossDefeated);
          setTimeout(() => {
            resumeBackgroundMusic();
          }, 4000);
        }
      }

      /* GAME LOOP END */
      animationIdRef.current = requestAnimationFrame(gameLoop);
    };

    animationIdRef.current = requestAnimationFrame(gameLoop); // next frame

    // === CLEAN UP ===
    return () => {
      clearInterval(shieldSpawnInterval);
      clearTimeout(invaderGridTimeout);
      clearInterval(invaderShootInterval);
      clearInterval(meteorSpawnInterval);
      clearInterval(followerSpawnInterval);
      clearInterval(bossWeakPointsSpawn);

      removeEventListener("keydown", handleKeyDown);
      removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(animationIdRef.current);

      document.body.style.overflow = "";
    };
  }, [isGameRunning, playerColor]);

  /***************************************************************
   *                  START, RESET, GAME OVER                    *
   ***************************************************************/

  /* === START & RESET === */
  const handleGameStart = () => {
    const randomTheme = themeURL[Math.floor(Math.random() * themeURL.length)];
    setCurrentTheme(randomTheme);

    if (gameOver) {
      // reset player
      playerXRef.current = canvasRef.current.width / 2 - playerStats.width / 2;
      playerRotationRef.current = 0;
      lastShotTimeRef.current = 0;
      livesRef.current = 5;
      setLives(5);
      setPlayerX(playerXRef.current);
      isGameEndingRef.current = false;
      isPlayerInvincible.current = false;
      isPlayerFrozenRef.current = false;
      playerPart2Ref.current = false;

      // clear canvas
      projectilesRef.current = [];
      particlesRef.current = [];
      backgroundParticlesRef.current = [];
      isBoostingRef.current = false;

      // power up
      isShieldActiveRef.current = false;
      shieldStartTimeRef.current = null;
      shieldPowerUpRef.current = [];
      shipUpgradeRef.current = null;

      // reset enemy
      invaderGridsRef.current = [];
      meteorsRef.current = [];
      invaderProjectilesRef.current = [];
      followersRef.current = [];

      // boss
      bossActiveRef.current = false;
      bossMusicPlayedRef.current = false;
      bossRef.current = null;
      isPhase1EnabledRef.current = true;
      isPhase2EnabledRef.current = false;
      isPhase3EnabledRef.current = false;
      bossProjectilesSmallRef.current = [];
      bossProjectilesMediumRef.current = [];
      bossProjectilesLargeRef.current = [];
      bossBeamsRef.current = [];
      beamIntervalsRef.current.forEach((id) => {
        clearInterval(id);
      });
      beamIntervalsRef.current = [];
      bossDefeatedRef.current = false;
      bossImageRef.current = new Image();
      bossImageRef.current.src = imgURL.boss1;
      bossImage2Ref.current = new Image();
      bossImage2Ref.current.src = imgURL.boss2;

      // score
      scoreRef.current = 0;
      setScore(0);
      setDisplayedScore(0);
    }

    setGameOver(false);
    setIsGameRunning(true);
  };

  /* === GAME OVER === */
  const handleGameOver = () => {
    if (isGameEndingRef.current) return;
    isGameEndingRef.current = true;

    gameBgMusic.current?.pause();
    bossMusic.current?.pause();
    gameBgMusic.current = null;
    bossMusic.current = null;

    isPlayerActiveRef.current = false;
    playSound(soundURL.gameOver);

    setTimeout(() => {
      cancelAnimationFrame(animationIdRef.current);
      setGameOver(true);
      setIsGameRunning(false);
      isGameEndingRef.current = false;
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 z-50"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Canvas */}
      <div className="relative flex flex-col items-center">
        <canvas
          ref={canvasRef}
          className="border border-white bg-black"
          width={canvasSize.width}
          height={canvasSize.height}
        />
        {/* Debug - Canvas Center */}
        {/* <CanvasCenter canvasSize={canvasSize} /> */}
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 px-1 rounded text-white cursor-pointer"
      >
        ✖
      </button>

      {/* Controls Popup */}
      <ControlsPopup />

      {/* Audio Settings */}
      <AudioSettings
        musicVolume={musicVolume}
        setMusicVolume={setMusicVolume}
        sfxVolume={sfxVolume}
        setSfxVolume={setSfxVolume}
        laserVolume={laserVolume}
        setLaserVolume={setlaserVolume}
        audioEnabled={audioEnabled}
        setAudioEnabled={setAudioEnabled}
      />

      {/* Score */}
      <div className="absolute top-2 left-1 flex">
        {renderScoreImages(displayedScore)}
      </div>
      {/* Lives */}
      <div
        className={`absolute top-10 left-2 ${
          animateLifeLoss ? "animate-shake" : ""
        }`}
      >
        {renderLives(lives)}
      </div>

      {/* Menu */}
      {!isGameRunning && (
        <div className="absolute flex flex-col justify-center items-center bg-opacity-75 z-50">
          <div className="text-center text-white bg-opacity-80 p-6 bg-gray-950 rounded-lg shadow-xl">
            {/* Top Scores */}
            {topScores.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2 text-yellow-400">
                  🏆 Top Scores
                </h3>
                <ul className="space-y-1">
                  {topScores.map((s, i) => (
                    <li key={i}>
                      <span className="font-semibold">{i + 1}.</span> {s} pts
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Final Score */}
            {topScores.length > 0 && score > 0 && (
              <p className="text-xl text-blue-600 mb-6 ">
                Final score: {score}
              </p>
            )}

            {/* Discount Code */}
            {hasUnlockedDiscount && (
              <div className="mb-6 text-green-400 text-lg font-semibold text-center bg-green-900 bg-opacity-40 p-4 rounded">
                Amazing Score! You’ve earned a discount code:
                <span className="text-yellow-300 ml-2">{DISCOUNT_CODE}</span>
              </div>
            )}

            {/* Select Ship */}
            <p className="mb-6 text-2xl font-semibold">Select Ship</p>
            <div className="flex gap-6 mb-6 justify-center">
              {["greenPlayer", "bluePlayer", "redPlayer"].map((color) => {
                const isSelected = selectedColor === color;
                const borderClass = isSelected
                  ? borderColorMap[color]
                  : "border-white";

                return (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className={`p-2 cursor-pointer transform hover:scale-105 transition-transform rounded-lg border-2 ${borderClass}`}
                  >
                    <img
                      src={imgURL[color]}
                      alt={`${color} image`}
                      width="70"
                      className="rounded-lg"
                    />
                  </button>
                );
              })}
            </div>

            {/* Start Game */}
            <button
              onClick={handleGameStart}
              className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full shadow-lg transition duration-200 transform hover:scale-105"
            >
              {gameOver ? "New Game" : "Start Game"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SpaceInvaders;
