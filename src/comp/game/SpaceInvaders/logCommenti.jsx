import { useState, useEffect, useRef } from "react";
import "./SpaceInvaders.css";

/* Images */
const imgURL = {
  // Player
  greenPlayer: "/images/spaceInvaders/ship/playerShip1_green.webp",
  bluePlayer: "/images/spaceInvaders/ship/playerShip1_blue.webp",
  redPlayer: "/images/spaceInvaders/ship/playerShip1_red.webp",
  greenPlayerLives: "/images/spaceInvaders/ship/playerLife1_green.webp",
  bluePlayerLives: "/images/spaceInvaders/ship/playerLife1_blue.webp",
  redPlayerLives: "/images/spaceInvaders/ship/playerLife1_red.webp",
  // Laser
  laserGreen: "/images/spaceInvaders/laser/laserGreen.webp",
  laserBlue: "/images/spaceInvaders/laser/laserBlue.webp",
  laserRed: "/images/spaceInvaders/laser/laserRed.webp",
  // Power Up
  shield: "/images/spaceInvaders/powerUp/shield.webp",
  // Enemy
  invader: "/images/spaceInvaders/invader/invader.webp",
  meteorBig: "/images/spaceInvaders/invader/meteorbig.webp",
  meteorMed: "/images/spaceInvaders/invader/meteormed.webp",
  meteorSmall: "/images/spaceInvaders/invader/meteorsmall.webp",
  follower: "/images/spaceInvaders/invader/follower.webp",
  // Boss
  boss: "/images/spaceInvaders/invader/boss.png",
  // Numeral
  n0: "/images/spaceInvaders/numeral/numeral0.webp",
  n1: "/images/spaceInvaders/numeral/numeral1.webp",
  n2: "/images/spaceInvaders/numeral/numeral2.webp",
  n3: "/images/spaceInvaders/numeral/numeral3.webp",
  n4: "/images/spaceInvaders/numeral/numeral4.webp",
  n5: "/images/spaceInvaders/numeral/numeral5.webp",
  n6: "/images/spaceInvaders/numeral/numeral6.webp",
  n7: "/images/spaceInvaders/numeral/numeral7.webp",
  n8: "/images/spaceInvaders/numeral/numeral8.webp",
  n9: "/images/spaceInvaders/numeral/numeral9.webp",
  nX: "/images/spaceInvaders/numeral/numeralX.webp",
};

/* Sounds */
const soundURL = {
  // Laser
  laser: "/sounds/spaceInvaders/laser/laser.mp3",
  laserInvader: "/sounds/spaceInvaders/laser/laserInvader.mp3",
  beamCharge: "/sounds/spaceInvaders/laser/beamCharge.mp3",
  beamActive: "/sounds/spaceInvaders/laser/beamActive.mp3",
  // Hit & Destroy
  playerHit: "/sounds/spaceInvaders/destroy/playerHit.mp3",
  destroyInvader: "/sounds/spaceInvaders/destroy/destroyInvader.mp3",
  destroyGrid: "/sounds/spaceInvaders/destroy/destroyGrid.mp3",
  destroyMeteor: "/sounds/spaceInvaders/destroy/destroyMeteor.mp3",
  destroyMeteor2: "/sounds/spaceInvaders/destroy/destroyMeteorSmall.mp3",
  destroyFollower: "/sounds/spaceInvaders/destroy/destroyFollower.mp3",
  hitFollower: "/sounds/spaceInvaders/destroy/hitFollower.mp3",
  // Boss
  bossEnter: "/sounds/spaceInvaders/boss/bossEnter.mp3",
  bossDescending: "/sounds/spaceInvaders/boss/bossDescending.mp3",
  // Shield
  shieldUp: "/sounds/spaceInvaders/shield/shieldUp.mp3",
  shieldDown: "/sounds/spaceInvaders/shield/shieldDown.mp3",
  shieldBlock: "/sounds/spaceInvaders/shield/shieldBlock.mp3",
  // Gameplay
  gameOver: "/sounds/spaceInvaders/gameplay/gameOver.mp3",
};
// Theme
const themeURL = [
  "/sounds/spaceInvaders/theme/theme1.mp3",
  "/sounds/spaceInvaders/theme/theme2.mp3",
  "/sounds/spaceInvaders/theme/theme3.mp3",
  "/sounds/spaceInvaders/theme/theme4.mp3",
];

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
  const isPlayerInvincible = useRef(false);
  const isPlayerFrozenRef = useRef(false);

  /* Gameplay */
  const scoreParams = {
    single: 10,
    grid: 50,
    follower: 100,
    meteorBig: 10,
    meteorMed: 20,
    meteorSmall: 50,
    // boss
    boss: 5000,
  };
  const spawnScore = {
    // power up
    shield: 1000,
    // enemy
    meteor: 500,
    follower: 750,
    // boss
    boss: 10000, // 10k
  };
  const spawnTime = {
    // power up
    shield: 15000,
    // enemy
    invaderMin: 7500,
    invaderMax: 13000,
    invaderProjectile: 1500,
    meteor: 6000,
    follower: 6500,
  };

  /* Player */
  const playerImageRef = useRef(new Image());
  const playerScale = 0.5;
  const playerConfig = {
    width: 99 * playerScale,
    height: 75 * playerScale,
    speed: 5,
    rotation: 0.15,
    rotationBack: 0.95,
  };
  const playerOpacityRef = useRef(1);
  const playerRotationRef = useRef(0);
  const [playerX, setPlayerX] = useState(0);
  const playerXRef = useRef(playerX);
  const playerYRef = useRef(null);
  const isPlayerActiveRef = useRef(true);
  const playerTransitionRef = useRef(null);
  // Lives
  const [lives, setLives] = useState(5);
  const livesRef = useRef(5);
  const [animateLifeLoss, setAnimateLifeLoss] = useState(false);
  const previousLivesRef = useRef(lives);
  const handlePlayerHit = () => {
    flashEffect(playerOpacityRef, { playerActive: isPlayerActiveRef });
    playSound(soundURL.playerHit, 0.7);
    createExplosion(
      playerXRef.current + playerConfig.width / 2,
      playerYRef.current + playerConfig.height / 2,
      playerParticles
    );
  };

  /* Projectile */
  const projectileImages = {
    greenPlayer: new Image(),
    bluePlayer: new Image(),
    redPlayer: new Image(),
  };
  const lastShotTimeRef = useRef(0);
  const projectilesRef = useRef([]);
  const projectileConfig = {
    cooldown: 230,
    width: 8,
    height: 20,
    speed: 7,
  };

  /* Boss */
  const bossImageRef = useRef(new Image());
  const bossActiveRef = useRef(false);
  const bossRef = useRef(null);
  const bossConfig = {
    width: 1000,
    height: 250,
    lives: 1000,
  };
  // Phase 1 - Boss Projectiles
  const bossProjectilesSmallRef = useRef([]);
  const bossProjectilesMediumRef = useRef([]);
  const bossProjectilesLargeRef = useRef([]);
  const bossProjectileConfig = {
    small: {
      width: 4,
      height: 12,
      speed: 3,
      damage: 1,
      color: "yellow",
      type: "small",
    },
    medium: {
      width: 6,
      height: 16,
      speed: 2.5,
      damage: 2,
      color: "green",
      type: "medium",
    },
    large: {
      width: 10,
      height: 20,
      speed: 2,
      damage: 3,
      color: "red",
      type: "large",
    },
  };
  const bossGunOffsets = {
    small: [157, 387, 607, 837],
    medium: [272, 722],
    large: [495],
  };
  // Phase 2 - Boss Lasers
  const bossBeamsRef = useRef([]);
  const bossLaserConfig = {
    small: {
      x: [75, 355, 645, 915],
      y: [113, 113, 113, 113],
      type: "small",
      shootInterval: 5000,
      chargeDuration: 1000,
      beamDuration: 2000,
      beamWidth: 12,
      beamDamage: 1,
      beamColor: "#00FFFF",
    },
    medium: {
      x: [215, 779],
      y: [122, 122],
      type: "medium",
      shootInterval: 7000,
      chargeDuration: 1500,
      beamDuration: 2500,
      beamWidth: 20,
      beamDamage: 2,
      beamColor: "#00FF00",
    },
    large: {
      x: [499],
      y: [130],
      type: "large",
      shootInterval: 9000,
      chargeDuration: 2000,
      beamDuration: 3000,
      beamWidth: 28,
      beamDamage: 3,
      beamColor: "#FF0000",
    },
  };
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

  /* Invader */
  const invaderImageRef = useRef(new Image());
  const invaderConfig = {
    width: 30,
    height: 30,
    maxSpeed: 3,
    minSpeed: 2,
    retreadSpeed: 3,
  };
  const invaderGridsRef = useRef([]);
  // Invader Projectile
  const invaderProjectilesRef = useRef([]);
  const invaderProjectileConfig = {
    width: 4,
    height: 12,
    speed: 4,
    damage: 1,
  };

  /* Follower */
  const followerImageRef = useRef(new Image());
  const followersRef = useRef([]);
  const followerConfig = {
    width: 50,
    height: 40,
    lives: 5,
    speed: 2.5,
    shootInterval: 240, // ~4 s - 60fps
    chargeDuration: 90, // ~1.5 s
    beamDuration: 120, // ~2 s
    beamWidth: 20,
    damage: 1,
  };
  const chargeStart = followerConfig.shootInterval; // 300
  const beamStart = chargeStart + followerConfig.chargeDuration; // 390
  const beamEnd = beamStart + followerConfig.beamDuration; // 510

  /* Meteor */
  const meteorsRef = useRef([]);
  const meteorConfig = {
    speed: {
      big: 2,
      med: 3,
      small: 4,
    },
    lives: {
      big: 3,
      med: 2,
      small: 1,
    },
    size: {
      big: 96,
      med: 43,
      small: 28,
    },
  };
  const meteorImages = {
    big: new Image(),
    med: new Image(),
    small: new Image(),
  };

  /* PowerUp */
  // Shield
  const shieldImageRef = useRef(new Image());
  const shieldPowerUpRef = useRef([]);
  const isShieldActiveRef = useRef(false);
  const shieldTimerRef = useRef(null);
  const shieldConfig = {
    width: 144,
    height: 137,
    time: 5000,
    bubbleWidth: 40,
    bubbleHeight: 40,
    bubbleSpeed: 2,
  };
  const handleShieldBlock = (x, y) => {
    createExplosion(x, y, shieldParticles);
    playSound(soundURL.shieldBlock, 0.5);
  };

  /* Score */
  const [score, setScore] = useState(0);
  const scoreRef = useRef(score);
  const addScore = (points) => {
    scoreRef.current += points;
    setScore(scoreRef.current);
    // debug - points
    // console.log(`+${points} points → New score: ${scoreRef.current}`);
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
    const sorted = scores.sort((a, b) => b - a).slice(0, 3); // top 3
    localStorage.setItem(SCORE_KEY, JSON.stringify(sorted));
    setTopScores(sorted);
  };

  /* Menu */
  // Show Controls
  const [showControls, setShowControls] = useState(false);
  const Key = ({
    label,
    highlight = false,
    wide = false,
    halfHeight = false,
    tinyText = false,
  }) => {
    const base = "text-sm text-center border rounded bg-gray-200";
    const highlightStyle = highlight
      ? "bg-yellow-300 border-yellow-500 text-black font-bold"
      : "text-gray-700";
    const size = wide ? "w-27 h-6" : halfHeight ? "w-6 h-3" : "w-6 h-6";
    const textSize = tinyText ? "text-[11px]" : "text-xs";

    return (
      <div
        className={`${base} ${highlightStyle} ${size} ${textSize} flex items-center justify-center`}
      >
        {label}
      </div>
    );
  };
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
  const [musicVolume, setMusicVolume] = useState(0.4); // background music
  const [sfxVolume, setSfxVolume] = useState(0.8); // sfx
  const [laserVolume, setlaserVolume] = useState(0.2); // sfx - laser
  const [showVolumeSettings, setShowVolumeSettings] = useState(false);
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
  const playLaserSound = (url) => {
    if (audioEnabledRef.current && url) {
      const laser = new Audio(url);
      laser.volume = laserVolumeRef.current;
      laser.currentTime = 0;
      laser.play().catch((e) => console.warn("Play error:", e));
    }
  };
  // play boss music
  const playBossMusic = () => {
    if (!audioEnabledRef.current) return;

    gameBgMusic.current?.pause(); // stop background

    bossMusic.current = new Audio(soundURL.bossEnter);
    bossMusic.current.volume = musicVolume;
    bossMusic.current.loop = false;
    bossMusic.current.play().catch((e) => console.warn("Boss music error:", e));

    // resume background
    bossMusic.current.onended = () => {
      if (!gameOver && isGameRunning && audioEnabledRef.current) {
        gameBgMusic.current
          ?.play()
          .catch((e) => console.warn("Resume error:", e));
      }
    };
  };

  /* Particles */
  const particlesRef = useRef([]);
  const backgroundParticlesRef = useRef([]);
  const backgroundParticles = {
    radius: 2,
    speed: 0.3,
    opacity: 0.5,
    color: "white",
  };
  const isBoostingRef = useRef(false);
  const backgroundBossParticles = {
    speed: 15,
  };
  const invaderParticles = {
    color: "#BAA0DE",
    opacity: 0.4,
    count: 20,
  };
  const followerParticles = {
    color: "#7049A6",
    opacity: 0.6,
    count: 100,
  };
  const playerParticles = {
    color: "white",
    opacity: 1,
    count: 25,
  };
  const meteorParticles = {
    big: {
      color: "#FFA726",
      opacity: 0.6,
      count: 500,
      radiusRange: [2, 6],
      velocityRange: [2, 6],
    },
    med: {
      color: "#FFCC26",
      opacity: 0.5,
      count: 250,
      radiusRange: [1.5, 4],
      velocityRange: [1.5, 4],
    },
    small: { color: "#FFDB26", opacity: 0.4, count: 15 },
  };
  const shieldParticles = {
    color: "#B5B0A8",
    opacity: 0.5,
    count: 100,
  };
  // Destroy-Hit Particles
  function createExplosion(
    x,
    y,
    { color, count, opacity, radiusRange = [1, 3], velocityRange = [1, 2] }
  ) {
    for (let i = 0; i < count; i++) {
      const radius =
        Math.random() * (radiusRange[1] - radiusRange[0]) + radiusRange[0];
      const speed =
        Math.random() * (velocityRange[1] - velocityRange[0]) +
        velocityRange[0];

      particlesRef.current.push({
        x,
        y,
        radius,
        color,
        velocity: {
          x: (Math.random() - 0.5) * speed,
          y: (Math.random() - 0.5) * speed,
        },
        opacity,
      });
    }
  }
  // Beam Charging Particles
  function createFollowerChargeParticle(follower) {
    const spawnAreaWidth = 100;
    const spawnX =
      follower.x + follower.width / 2 + (Math.random() - 0.5) * spawnAreaWidth;
    const spawnY = follower.y + follower.height + 80 + Math.random() * 40;

    const targetX = follower.x + follower.width / 2;
    const targetY = follower.y + follower.height;

    const angle = Math.atan2(targetY - spawnY, targetX - spawnX);
    const speed = 1 + Math.random() * 1;

    follower.particles.push({
      x: spawnX,
      y: spawnY,
      radius: Math.random() * 2 + 1,
      color: "#FFD700",
      velocity: {
        x: Math.cos(angle) * speed + (Math.random() - 0.5) * 0.3,
        y: Math.sin(angle) * speed + (Math.random() - 0.5) * 0.3,
      },
      target: { x: targetX, y: targetY },
      opacity: 1,
    });
  }

  /***************************************************************
   *                       ANIMATION & UI                        *
   ***************************************************************/

  /* Player Hit Animation */
  function flashEffect(
    ref,
    { min = 0.2, max = 1, flashes = 10, interval = 100, playerActive } = {}
  ) {
    let count = 0;
    const intervalId = setInterval(() => {
      if (!playerActive) {
        clearInterval(intervalId);
        return;
      }

      ref.current = ref.current === max ? min : max;
      count++;
      if (count > flashes) {
        clearInterval(intervalId);
        ref.current = max;
      }
    }, interval);
  }

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
    const lifeIconKey = `${playerColor}Lives`;

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
  useEffect(() => {
    if (displayedScore === score) return;

    const interval = setInterval(() => {
      setDisplayedScore((prev) => {
        const next = Math.min(prev + 2, score);

        const currentK = Math.floor(prev / 1000);
        const nextK = Math.floor(next / 1000);

        const current10K = Math.floor(prev / 10000);
        const next10K = Math.floor(next / 10000);

        // Large expansion every 10k multiples
        if (current10K !== next10K) {
          setScoreTextSize("w-8 h-8");
          setTimeout(() => setScoreTextSize("w-4.5 h-4.5"), 400);
        }
        // Average Expansion every 1k (only if it's not 10k multiple)
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
   *                      useEFFECT: VOLUME                       *
   ***************************************************************/

  // sfx
  useEffect(() => {
    sfxVolumeRef.current = sfxVolume;
    laserVolumeRef.current = laserVolume;
    audioEnabledRef.current = audioEnabled;
  }, [sfxVolume, laserVolume, audioEnabled]);
  // Background Music Volume
  useEffect(() => {
    if (gameBgMusic.current) {
      gameBgMusic.current.volume = musicVolume;
    }
  }, [musicVolume]);
  // Background Music
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
  // Play/Pause Background Music
  useEffect(() => {
    if (isGameRunning && !gameOver && audioEnabled) {
      gameBgMusic.current?.play().catch((e) => {
        console.warn("Autoplay error:", e);
      });
    } else {
      gameBgMusic.current?.pause();
    }
  }, [isGameRunning, gameOver, audioEnabled]);

  /***************************************************************
   *                      useEFFECT: SCORE                       *
   ***************************************************************/

  /* Game Over - Score + Discount Code */
  useEffect(() => {
    if (gameOver && score > 0) {
      // Save Higher Score
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
    if (scoreRef.current >= spawnScore.boss && !bossActiveRef.current) {
      bossActiveRef.current = true;
      // debug - summon boss
      // console.log("boss spawned - meteor, follower, invader deactivated");
    }

    // === ENEMY RETREAT ===
    if (bossActiveRef.current) {
      followersRef.current.forEach((f) => {
        f.retreating = true;
      });
      // debug - follower retreat
      // console.log("follower retreating");

      invaderGridsRef.current.forEach((grid) => {
        grid.retreating = true;
      });
      // debug - invader grids retreat
      // console.log("invader grids retreating");
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
    // debug - lose condition, player opacity 0
    // console.log("Draw loop", {
    //   isActive: isPlayerActiveRef.current,
    //   opacity: playerOpacityRef.current,
    // });

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
            ? backgroundBossParticles.speed
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
      // boss
      bossImageRef.current.src = imgURL.boss;
    };
    loadImages();

    /* === INIT PLAYER === */
    const resetPlayerPosition = () => {
      const initialX = canvas.width / 2 - playerConfig.width / 2;
      setPlayerX(initialX);
      playerXRef.current = initialX;
      playerRotationRef.current = 0;
    };
    playerYRef.current = canvas.height - playerConfig.height - 10;
    resetPlayerPosition();

    /***************************************************************
     *                      SECTION: HITBOX                        *
     ***************************************************************/

    /* === PLAYER HITBOX === */
    const getPlayerHitbox = () => {
      // === SHIELD HITBOX ===
      if (isShieldActiveRef.current) {
        const x =
          playerXRef.current + playerConfig.width / 2 - shieldConfig.width / 2;
        const y =
          playerYRef.current +
          playerConfig.height / 2 -
          shieldConfig.height / 2;
        return {
          x,
          y,
          width: shieldConfig.width,
          height: shieldConfig.height,
        };
      }

      return {
        x: playerXRef.current,
        y: playerYRef.current,
        width: playerConfig.width,
        height: playerConfig.height,
      };
    };

    /* === FOLLOWER BEAM HITBOX === */
    const getFollowerBeamHitbox = (follower) => {
      const beamX =
        follower.x + follower.width / 2 - followerConfig.beamWidth / 2;
      const beamY = follower.y + follower.height;
      const beamHeight = canvas.height - beamY;

      return {
        x: beamX,
        y: beamY,
        width: followerConfig.beamWidth,
        height: beamHeight,
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
    const shieldSpawnInterval = setInterval(() => {
      if (scoreRef.current >= spawnScore.shield) {
        const x = Math.floor(
          Math.random() * (canvas.width - shieldConfig.width)
        );
        const y = -shieldConfig.bubbleHeight;

        // debug - spawn
        // console.log(`[SHIELD] spawn at x: ${x}`);

        shieldPowerUpRef.current.push({
          x,
          y,
          width: shieldConfig.bubbleWidth,
          height: shieldConfig.bubbleHeight,
          speed: shieldConfig.bubbleSpeed,
          image: shieldImageRef.current,
        });
      }
    }, spawnTime.shield);

    /***************************************************************
     *                    SECTION: SPAWN ENEMY                     *
     ***************************************************************/

    /* === SPAWN: 1st INVADER GRID === */
    const spawnInvaderGrid = () => {
      const cols = Math.floor(Math.random() * 10 + 5);
      const rows = Math.floor(Math.random() * 5 + 2);
      const gridWidth = cols * invaderConfig.width;
      const gridHeight = rows * invaderConfig.height;

      const x = 0;
      const y = 0;

      const sizeFactor = cols * rows;
      const minSize = 5 * 2;
      const maxSize = 15 * 7;
      const speed =
        invaderConfig.maxSpeed -
        ((sizeFactor - minSize) / (maxSize - minSize)) *
          (invaderConfig.maxSpeed - invaderConfig.minSpeed);

      invaderGridsRef.current.push({
        x,
        y,
        direction: 1,
        width: gridWidth,
        height: gridHeight,
        cols,
        rows,
        speed,
        invaders: Array.from({ length: rows }, () => Array(cols).fill(true)),
        retreating: false,
      });
    };
    spawnInvaderGrid();
    /* === SPAWN: NEXT INVADER GRIDS === */
    let invaderGridTimeout;
    const scheduleInvaderGrid = () => {
      if (bossActiveRef.current) return;

      const interval = Math.floor(
        Math.random() * (spawnTime.invaderMax - spawnTime.invaderMin) +
          spawnTime.invaderMin
      );

      invaderGridTimeout = setTimeout(() => {
        if (!isGameRunning || bossActiveRef.current) return;

        spawnInvaderGrid();
        scheduleInvaderGrid();
      }, interval);
    };
    scheduleInvaderGrid();

    /* === SPAWN: INVADER PROJECTILE === */
    const invaderShootInterval = setInterval(() => {
      if (!bossActiveRef.current) {
        invaderGridsRef.current.forEach((grid) => {
          const aliveInvaders = [];
          for (let row = 0; row < grid.rows; row++) {
            for (let col = 0; col < grid.cols; col++) {
              if (grid.invaders[row][col]) {
                aliveInvaders.push({ row, col });
              }
            }
          }

          if (aliveInvaders.length > 0) {
            const { row, col } =
              aliveInvaders[Math.floor(Math.random() * aliveInvaders.length)];
            const x =
              grid.x +
              col * invaderConfig.width +
              invaderConfig.width / 2 -
              invaderProjectileConfig.width / 2;
            const y =
              grid.y + row * invaderConfig.height + invaderConfig.height;

            invaderProjectilesRef.current.push({
              x,
              y,
              width: invaderProjectileConfig.width,
              height: invaderProjectileConfig.height,
              speed: invaderProjectileConfig.speed,
            });

            playLaserSound(soundURL.laserInvader);
          }
        });
      }
    }, spawnTime.invaderProjectile);

    /* === SPAWN: METEOR === */
    const meteorSpawnInterval = setInterval(() => {
      if (!bossActiveRef.current && scoreRef.current >= spawnScore.meteor) {
        const types = ["big", "med", "small"];
        const type = types[Math.floor(Math.random() * types.length)];

        const x = Math.floor(
          Math.random() * (canvas.width - meteorConfig.size[type])
        );
        const y = -meteorConfig.size[type];

        meteorsRef.current.push({
          x,
          y,
          type,
          width: meteorConfig.size[type],
          height: meteorConfig.size[type],
          speed: meteorConfig.speed[type],
          lives: meteorConfig.lives[type],
          image: meteorImages[type],
          rotation: Math.random() * Math.PI,
          rotationSpeed: Math.random() * 0.02 + 0.01,
        });

        // debug - spawn
        // console.log(`[METEOR] spawned a ${type} at x: ${x}`);
      }
    }, spawnTime.meteor);

    /* === SPAWN: FOLLOWER === */
    const followerSpawnInterval = setInterval(() => {
      if (
        !bossActiveRef.current &&
        scoreRef.current >= spawnScore.follower &&
        followersRef.current.length < 2
      ) {
        const x = Math.random() * (canvas.width - followerConfig.width);

        followersRef.current.push({
          x,
          y: 10,
          width: followerConfig.width,
          height: followerConfig.height,
          lives: followerConfig.lives,
          shootTimer: 0,
          isCharging: false,
          isShooting: false,
          hasHitPlayer: false,
          particles: [],
          shootParticles: [],
          retreating: false,
          retreatDirection: Math.random() < 0.5 ? "left" : "right",
        });

        // debug - spawn
        // console.log(`[FOLLOWER] Spawned at x: ${Math.floor(x)}`);
      }
    }, spawnTime.follower);

    /***************************************************************
     *                      SECTION: FUNCTIONS                     *
     ***************************************************************/

    /* === ACTIVATE SHIELD === */
    const activateShield = () => {
      isShieldActiveRef.current = true;

      playSound(soundURL.shieldUp, 0.4);

      if (shieldTimerRef.current) clearTimeout(shieldTimerRef.current);
      shieldTimerRef.current = setTimeout(() => {
        isShieldActiveRef.current = false;
        // debug - shield end
        // console.log("shield end");
        playSound(soundURL.shieldDown);
      }, shieldConfig.time);
    };

    /* === INPUT HANDLING === */
    const keysPressed = new Set(); // track keystrokes
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
      if (isPlayerActiveRef.current) {
        // debug - player active
        // console.log("Player active – movement and shooting enabled");

        /* === PLAYER MOVEMENT === */
        if (keysPressed.has("ArrowLeft") || keysPressed.has("a")) {
          playerXRef.current = Math.max(
            playerXRef.current - playerConfig.speed,
            0
          );
          playerRotationRef.current = -playerConfig.rotation; // tilt left
        } else if (keysPressed.has("ArrowRight") || keysPressed.has("d")) {
          playerXRef.current = Math.min(
            playerXRef.current + playerConfig.speed,
            canvas.width - playerConfig.width
          );
          playerRotationRef.current = playerConfig.rotation; // tilt right
        } else {
          playerRotationRef.current *= playerConfig.rotationBack; // smooth return
        }

        /* === SHOOT PROJECTILES === */
        const now = Date.now();
        if (keysPressed.has(" ")) {
          if (now - lastShotTimeRef.current > projectileConfig.cooldown) {
            const newProjectile = {
              x: playerXRef.current + playerConfig.width / 2 - 4,
              y: canvas.height - playerConfig.height - 10,
              width: projectileConfig.width,
              height: projectileConfig.height,
              speed: projectileConfig.speed,
              color: playerColor,
            };
            projectilesRef.current.push(newProjectile);
            lastShotTimeRef.current = now;

            // debug - projectile
            // console.log("new projectile:", newProjectile);

            playLaserSound(soundURL.laser);
          }
        }
      }
      // else {
      //   debug - player active
      //   console.log("Player inactive – movement and shooting disabled");
      // }
      // State Update for Drawing
      setPlayerX(playerXRef.current);

      /***************************************************************
       *             SECTION: SPAWN ELEMENT & MOVEMENT               *
       ***************************************************************/

      /* === INVADER GRIDS MOVEMENT === */
      invaderGridsRef.current.forEach((grid) => {
        // === BOSS - RETREAT ===
        if (grid.retreating) {
          if (grid.x + grid.width < canvas.width) {
            grid.x += grid.speed * grid.direction * invaderConfig.retreadSpeed;
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

      /* === FOLLOWER MOVEMENT === */
      followersRef.current.forEach((follower) => {
        // === BOSS - RETREAT ===
        if (follower.retreating) {
          follower.y -= 1.2;
          if (follower.retreatDirection === "left") {
            follower.x -= 1;
          } else {
            follower.x += 1;
          }

          // remove
          if (
            follower.y + follower.height < 0 ||
            follower.x + follower.width < 0 ||
            follower.x > canvas.width
          ) {
            const index = followersRef.current.indexOf(follower);
            if (index !== -1) followersRef.current.splice(index, 1);
          }

          return;
        }

        const targetX =
          playerXRef.current + playerConfig.width / 2 - follower.width / 2;

        // movement
        if (!follower.isCharging && !follower.isShooting) {
          if (follower.x < targetX) {
            follower.x = Math.min(follower.x + followerConfig.speed, targetX);
          } else if (follower.x > targetX) {
            follower.x = Math.max(follower.x - followerConfig.speed, targetX);
          }
        }

        follower.shootTimer++;
        // debug - movement & beam sequence
        // console.log(
        //   `Follower @ x=${Math.round(follower.x)} | shootTimer=${
        //     follower.shootTimer
        //   } | charging=${follower.isCharging} | shooting=${follower.isShooting}`
        // );

        // Charge Start (5s)
        if (follower.shootTimer === chargeStart) {
          follower.isCharging = true;
          // debug - start charging
          // console.log(
          //   `Follower @ x=${Math.round(follower.x)} | Start CHARGING`
          // );

          playSound(soundURL.beamCharge, 0.4);
        }

        // Beam Start (1.5s)
        if (follower.shootTimer === beamStart) {
          follower.isCharging = false;
          follower.isShooting = true;
          // debug - beam active
          // console.log(`Follower @ x=${Math.round(follower.x)} | Beam ACTIVE`);

          playSound(soundURL.beamActive, 0.2);
        }

        // Beam End (2s)
        if (follower.shootTimer === beamEnd) {
          follower.isShooting = false;
          follower.shootTimer = 0;
          // debug - beam end
          // console.log(`Follower @ x=${Math.round(follower.x)} | Beam END`);
          follower.hasHitPlayer = false;
        }
      });

      // === LOSE CONDITION 2 ===
      const hasLost = invaderGridsRef.current.some(
        (grid) => grid.y + grid.height >= canvas.height + 10
      );
      if (hasLost) {
        handleGameOver();
        return;
      }

      /* === CLEAR CANVAS === */
      c.clearRect(0, 0, canvas.width, canvas.height);

      /***************************************************************
       *                   SECTION: UPDATE POSITION                  *
       ***************************************************************/

      /* === UPDATE POSITION: PLAYER PROJECTILES === */
      projectilesRef.current = projectilesRef.current.filter((p) => {
        p.y -= p.speed;

        // debug - projectile position
        // console.log("projectile updated:", p);

        const isVisible = p.y + p.height > 0;

        // debug - projectile removed
        // if (!isVisible) console.log("projectile removed:", p);

        return isVisible;
      });
      projectilesRef.current.forEach((p) => {
        const img = projectileImages[p.color];
        if (img.complete) {
          c.drawImage(img, p.x, p.y, p.width, p.height);
        }
      });

      /* === UPDATE POSITION: INVADER PROJECTILES === */
      invaderProjectilesRef.current = invaderProjectilesRef.current
        .map((p) => ({
          ...p,
          y: p.y + p.speed,
        }))
        .filter((p) => p.y < canvas.height);
      invaderProjectilesRef.current.forEach((p) => {
        c.fillStyle = "white";
        c.fillRect(p.x, p.y, p.width, p.height);
      });

      /* === UPDATE POSITION: METEOR === */
      meteorsRef.current = meteorsRef.current
        .map((m) => ({ ...m, y: m.y + m.speed }))
        .filter((m) => m.y < canvas.height);
      meteorsRef.current.forEach((m) => {
        m.rotation += m.rotationSpeed;

        // rotation
        c.save();
        c.translate(m.x + m.width / 2, m.y + m.height / 2);
        c.rotate(m.rotation);
        c.translate(-m.x - m.width / 2, -m.y - m.height / 2);

        c.drawImage(m.image, m.x, m.y, m.width, m.height);
        // debug - meteor hitbox
        // c.fillStyle = "rgba(0, 255, 0, 0.2)";
        // c.fillRect(m.x, m.y, m.width, m.height);

        c.restore();
      });

      /* === UPDATE POSITION: SHIELD === */
      shieldPowerUpRef.current = shieldPowerUpRef.current
        .map((p) => ({ ...p, y: p.y + p.speed }))
        .filter((p) => p.y < canvas.height);
      shieldPowerUpRef.current.forEach((p) => {
        if (p.image && p.image.complete) {
          c.drawImage(p.image, p.x, p.y, p.width, p.height);
          // debug - hitbox shield
          // c.fillStyle = "rgba(0, 0, 255, 0.2)";
          // c.fillRect(p.x, p.y, p.width, p.height);
        } else {
          // fallback
          c.fillStyle = "white";
          c.fillRect(p.x, p.y, p.width, p.height);
          console.warn("[SHIELD] image not ready");
        }
      });

      /* === UPDATE: PARTICLES  === */
      particlesRef.current = particlesRef.current
        .map((p) => {
          return {
            ...p,
            x: p.x + p.velocity.x,
            y: p.y + p.velocity.y,
            opacity: p.opacity - 0.02,
          };
        })
        .filter((p) => p.opacity > 0);
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
       *                SECTION: COLLISION DETECTION                 *
       ***************************************************************/

      /* === COLLISION DETECTION: PLAYER PROJECTILE → INVADER === */
      projectilesRef.current.forEach((p, pIndex) => {
        invaderGridsRef.current.forEach((grid) => {
          for (let row = 0; row < grid.rows; row++) {
            for (let col = 0; col < grid.cols; col++) {
              if (grid.invaders[row][col]) {
                // invader position
                const invaderX = grid.x + col * invaderConfig.width;
                const invaderY = grid.y + row * invaderConfig.height;

                // check collision
                const hit =
                  p.x < invaderX + invaderConfig.width &&
                  p.x + p.width > invaderX &&
                  p.y < invaderY + invaderConfig.height &&
                  p.y + p.height > invaderY;
                // remove invader
                if (hit) {
                  grid.invaders[row][col] = false;
                  // debug - invader eliminated
                  // console.log(
                  //   `Invader Hit: grid @ (${grid.x}, ${grid.y}) - cell [${row}][${col}]`
                  // );

                  // particles
                  createExplosion(
                    invaderX + invaderConfig.width / 2,
                    invaderY + invaderConfig.height / 2,
                    invaderParticles
                  );
                  playSound(soundURL.destroyInvader, 0.5);

                  addScore(scoreParams.single);

                  projectilesRef.current.splice(pIndex, 1); // remove projectile
                }
              }
            }
          }
        });
      });
      // === REMOVE EMPTY GRID ===
      invaderGridsRef.current = invaderGridsRef.current.filter(
        (grid, index) => {
          const stillHasInvaders = grid.invaders.some((row) =>
            row.some((inv) => inv)
          );
          if (!stillHasInvaders) {
            // debug - full grid eliminated
            // console.log(
            //   `Grid completely eliminated: index ${index}, position (${grid.x}, ${grid.y})`
            // );

            playSound(soundURL.destroyGrid, 0.5);

            addScore(scoreParams.grid);
          }
          return stillHasInvaders;
        }
      );

      /* === COLLISION DETECTION: PLAYER PROJECTILE → METEOR === */
      projectilesRef.current.forEach((p, pIndex) => {
        meteorsRef.current.forEach((m, mIndex) => {
          const hit =
            p.x > m.x &&
            p.x < m.x + m.width &&
            p.y > m.y &&
            p.y < m.y + m.height;

          if (hit) {
            m.lives -= 1;
            projectilesRef.current.splice(pIndex, 1);

            if (m.lives <= 0) {
              // remove meteor - small
              // debug - destroy meteor
              // console.log(`${m.type.toUpperCase()} Meteor destroyed`);
              meteorsRef.current.splice(mIndex, 1);

              createExplosion(
                m.x + m.width / 2,
                m.y + m.height / 2,
                meteorParticles[m.type]
              );

              playSound(soundURL.destroyMeteor2, 0.4);

              addScore(scoreParams.meteorSmall);
            } else {
              // downgrade meteor
              const currentType = m.type;

              if (m.lives === 2) {
                // big
                // debug - meteor downgrade
                // console.log("BIG Meteor Hit → Becomes MED");
                addScore(scoreParams.meteorBig);

                m.type = "med";
              } else if (m.lives === 1) {
                // med
                // debug - meteor downgrade
                // console.log("MED Meteor Hit → Becomes SMALL");
                addScore(scoreParams.meteorMed);

                m.type = "small";
              }

              m.width = meteorConfig.size[m.type];
              m.height = meteorConfig.size[m.type];
              m.image = meteorImages[m.type];
              m.speed = meteorConfig.speed[m.type];

              createExplosion(
                m.x + m.width / 2,
                m.y + m.height / 2,
                meteorParticles[currentType]
              );
              playSound(soundURL.destroyMeteor, 0.4);
            }
          }
        });
      });

      /* === COLLISION DETECTION: PLAYER PROJECTILE → FOLLOWER === */
      projectilesRef.current.forEach((p, pIndex) => {
        followersRef.current.forEach((follower, fIndex) => {
          const hit =
            p.x < follower.x + follower.width &&
            p.x + p.width > follower.x &&
            p.y < follower.y + follower.height &&
            p.y + p.height > follower.y;

          if (hit) {
            follower.lives -= 1;

            createExplosion(
              follower.x + follower.width / 2,
              follower.y + follower.height / 2,
              followerParticles
            );
            playSound(
              follower.lives > 0
                ? soundURL.hitFollower
                : soundURL.destroyFollower,
              0.6
            );

            // remove follower
            if (follower.lives <= 0) {
              followersRef.current.splice(fIndex, 1);

              addScore(scoreParams.follower);
            }

            projectilesRef.current.splice(pIndex, 1);
          }
        });
      });

      /* === COLLISION DETECTION: SHIELD → PLAYER === */
      shieldPowerUpRef.current.forEach((powerUp, sIndex) => {
        if (isGameEndingRef.current || isPlayerInvincible.current) return;

        const hit =
          powerUp.x < playerXRef.current + playerConfig.width &&
          powerUp.x + powerUp.width > playerXRef.current &&
          powerUp.y < playerYRef.current + playerConfig.height &&
          powerUp.y + powerUp.height > playerYRef.current;

        if (hit) {
          shieldPowerUpRef.current.splice(sIndex, 1);

          // debug - collect shield (collision)
          // console.log("collect shield (collision)");
          activateShield();
        }
      });

      /* === COLLISION DETECTION: INVADER PROJECTILE → PLAYER === */
      invaderProjectilesRef.current.forEach((p, index) => {
        if (isGameEndingRef.current || isPlayerInvincible.current) return;

        const hitbox = getPlayerHitbox();
        const hit =
          p.x < hitbox.x + hitbox.width &&
          p.x + p.width > hitbox.x &&
          p.y < hitbox.y + hitbox.height &&
          p.y + p.height > hitbox.y;

        if (hit) {
          // === COLLISION DETECTION: INVADER PROJECTILE → SHIELD ===
          if (isShieldActiveRef.current) {
            invaderProjectilesRef.current.splice(index, 1);

            handleShieldBlock(p.x, p.y);
            // debug - shield protection
            // console.log("invader projectile destroyed by shield");

            return;
          }

          // debug - invader projectile hits player
          // console.log("Player hit!");

          handlePlayerHit();
          const newLives = Math.max(
            0,
            livesRef.current - invaderProjectileConfig.damage
          ); // lose life
          setLives(newLives);

          invaderProjectilesRef.current.splice(index, 1); // remove projectile

          // === LOSE CONDITION ===
          if (newLives <= 0) {
            handleGameOver();
          }
        }
      });

      /* === COLLISION DETECTION: METEOR → PLAYER === */
      meteorsRef.current.forEach((m, index) => {
        if (isGameEndingRef.current || isPlayerInvincible.current) return;

        const hitbox = getPlayerHitbox();
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
            // debug - shield protection
            // console.log("meteor destroyed by shield");

            return;
          }

          handlePlayerHit();
          const damage = m.type === "big" ? 2 : 1;
          const newLives = Math.max(0, livesRef.current - damage);
          setLives(newLives);
          // debug - meteor damage
          // console.log(
          //   `${m.type.toUpperCase()} Meteor Hit player: -${damage} lives`
          // );

          meteorsRef.current.splice(index, 1);

          // === LOSE CONDITION ===
          if (newLives <= 0) {
            handleGameOver();
          }
        }
      });

      /* === COLLISION DETECTION: FOLLOWER BEAM → PLAYER === */
      followersRef.current.forEach((follower) => {
        if (isGameEndingRef.current || isPlayerInvincible.current) return;
        if (!follower.isShooting) return;

        const beamHitbox = getFollowerBeamHitbox(follower);

        const playerHitbox = getPlayerHitbox();

        const hit =
          beamHitbox.x < playerHitbox.x + playerHitbox.width &&
          beamHitbox.x + beamHitbox.width > playerHitbox.x &&
          beamHitbox.y < playerHitbox.y + playerHitbox.height &&
          beamHitbox.y + beamHitbox.height > playerHitbox.y;

        if (hit && !follower.hasHitPlayer) {
          follower.hasHitPlayer = true; // avoid multiple hits in the same beam

          if (isShieldActiveRef.current) {
            handleShieldBlock(
              playerHitbox.x + playerHitbox.width / 2,
              playerHitbox.y + playerHitbox.height / 2 - 50
            );
          } else {
            handlePlayerHit();
            const newLives = Math.max(
              0,
              livesRef.current - followerConfig.damage
            );
            setLives(newLives);

            if (newLives <= 0) {
              handleGameOver();
            }
          }

          // allow new hits in the next beam
          if (!follower.isShooting) {
            follower.hasHitPlayer = false;
          }
        }
      });

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
        if (playerYRef.current <= canvas.height - playerConfig.height - 10) {
          playerYRef.current = canvas.height - playerConfig.height - 10;
          playerTransitionRef.current = null;
        }
      }
      const drawPlayer = () => {
        c.save();
        // flash & player lose
        c.globalAlpha =
          isPlayerActiveRef.current || isPlayerFrozenRef.current
            ? playerOpacityRef.current
            : 0;
        // rotation
        c.translate(
          playerXRef.current + playerConfig.width / 2,
          playerYRef.current + playerConfig.height / 2
        );
        c.rotate(playerRotationRef.current);
        c.translate(
          -playerXRef.current - playerConfig.width / 2,
          -playerYRef.current - playerConfig.height / 2
        );
        if (playerImageRef.current.complete) {
          c.drawImage(
            playerImageRef.current,
            playerXRef.current,
            playerYRef.current,
            playerConfig.width,
            playerConfig.height
          );
        } else {
          // fallback
          c.fillStyle = "green";
          c.fillRect(
            playerXRef.current,
            playerYRef.current,
            playerConfig.width,
            playerConfig.height
          );
        }
        // debug - player hitbox
        // c.fillStyle = "rgba(255, 0, 0, 0.2)";
        // c.fillRect(playerXRef.current, playerYRef.current, playerConfig.width, playerConfig.height);

        // debug - log position & rotation
        // console.log({
        //   x: playerXRef.current,
        //   y: playerYRef.current,
        //   width: playerConfig.width,
        //   height: playerConfig.height,
        //   rotation: playerRotationRef.current.toFixed(2),
        // });
        c.restore();
      };
      drawPlayer();

      /* === DRAW: SHIELD ON PLAYER === */
      if (isShieldActiveRef.current && shieldImageRef.current.complete) {
        const shieldX =
          playerXRef.current + playerConfig.width / 2 - shieldConfig.width / 2;
        const shieldY =
          playerYRef.current +
          playerConfig.height / 2 -
          shieldConfig.height / 2;

        c.drawImage(
          shieldImageRef.current,
          shieldX,
          shieldY,
          shieldConfig.width,
          shieldConfig.height
        );

        // debug - shield hitbox
        // c.save();
        // c.strokeStyle = "rgba(0, 255, 255, 0.7)";
        // c.lineWidth = 2;
        // c.strokeRect(shieldX, shieldY, shieldConfig.width, shieldConfig.height);
        // c.restore();
      }

      /* === DRAW: INVADER GRIDS === */
      invaderGridsRef.current.forEach((grid) => {
        for (let row = 0; row < grid.rows; row++) {
          for (let col = 0; col < grid.cols; col++) {
            if (!grid.invaders[row][col]) continue;

            const x = grid.x + col * invaderConfig.width;
            const y = grid.y + row * invaderConfig.height;

            if (invaderImageRef.current.complete) {
              c.drawImage(
                invaderImageRef.current,
                x,
                y,
                invaderConfig.width,
                invaderConfig.height
              );
            } else {
              c.fillStyle = "white";
              c.fillRect(x, y, invaderConfig.width, invaderConfig.height);
            }
          }
        }
      });

      /* === DRAW: FOLLOWER & BEAM === */
      followersRef.current.forEach((follower) => {
        if (followerImageRef.current.complete) {
          c.drawImage(
            followerImageRef.current,
            follower.x,
            follower.y,
            follower.width,
            follower.height
          );
        } else {
          // fallback
          c.fillStyle = "red";
          c.fillRect(follower.x, follower.y, follower.width, follower.height);
        }

        // === DRAW FOLLOWER LIFE BAR ===
        const barPadding = 4;
        const barWidth = follower.width - barPadding * 2;
        const barHeight = 5;
        const x = follower.x + barPadding;
        const y = follower.y - barHeight - 2;
        const lifeRatio = follower.lives / followerConfig.lives;
        c.fillStyle = "black";
        c.fillRect(x, y, barWidth, barHeight);
        c.fillStyle = "#7C3AED";
        c.fillRect(x, y, barWidth * lifeRatio, barHeight);

        // === CHARGE Beam ===
        if (follower.isCharging) {
          // === Charge Animation ===
          const beamHitbox = getFollowerBeamHitbox(follower);
          const colorCycle = [
            "#FFFF00",
            "#FFC300",
            "#FF8C00",
            "#FF4500",
            "#FF0000",
          ];
          const elapsed = performance.now();
          const colorCycleSpeed = 100;
          const alphaCycleSpeed = 300;
          const colorIndex =
            Math.floor(elapsed / colorCycleSpeed) % colorCycle.length;
          const beamColor = colorCycle[colorIndex];
          const alpha =
            0.3 + 0.5 * Math.abs(Math.sin(elapsed / alphaCycleSpeed));
          c.fillStyle = beamColor;
          c.globalAlpha = alpha;
          c.fillRect(
            beamHitbox.x,
            beamHitbox.y,
            beamHitbox.width,
            beamHitbox.height
          );
          c.globalAlpha = 1;

          // === Charge Particles ===
          if (Math.random() < 0.6) {
            createFollowerChargeParticle(follower);
          }
          for (let i = follower.particles.length - 1; i >= 0; i--) {
            const p = follower.particles[i];
            p.x += p.velocity.x;
            p.y += p.velocity.y;

            const dx = p.target.x - p.x;
            const dy = p.target.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 10) {
              p.velocity.x = 0;
              p.velocity.y = 0;
              p.opacity -= 0.05;
            }

            if (p.opacity <= 0) {
              follower.particles.splice(i, 1);
              continue;
            }

            c.globalAlpha = p.opacity;
            c.fillStyle = p.color;
            c.beginPath();
            c.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            c.fill();
            c.globalAlpha = 1;
          }
        }
        // remove particles
        if (!follower.isCharging) {
          follower.particles = [];
        }

        // === ACTIVE Beam ===
        if (follower.isShooting) {
          // === Shooting Animation ===
          const beamHitbox = getFollowerBeamHitbox(follower);
          const baseWidth = beamHitbox.width * 2;
          const tipWidth = beamHitbox.width;
          const beamHeight = beamHitbox.height;
          const startX = beamHitbox.x + beamHitbox.width / 2;
          const startY = beamHitbox.y + 15;

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

          c.fillStyle = "red";
          c.globalAlpha = 0.7;
          c.fill();
          c.restore();

          // === Shooting Particles ===
          if (Math.random() < 0.8) {
            const beamHitbox = getFollowerBeamHitbox(follower);
            for (let i = 0; i < 2; i++) {
              const px = beamHitbox.x + Math.random() * beamHitbox.width;
              const py = beamHitbox.y + Math.random() * beamHitbox.height;
              follower.shootParticles.push({
                x: px,
                y: py,
                radius: Math.random() * 4 + 3,
                color: "#FFA500",
                velocity: {
                  x: (Math.random() - 0.5) * 0.3,
                  y: (Math.random() - 0.5) * 0.3,
                },
                opacity: 0.9,
              });
            }
          }

          for (let i = follower.shootParticles.length - 1; i >= 0; i--) {
            const p = follower.shootParticles[i];
            p.x += p.velocity.x;
            p.y += p.velocity.y;
            p.opacity -= 0.03;

            if (p.opacity <= 0) {
              follower.shootParticles.splice(i, 1);
              continue;
            }

            c.globalAlpha = p.opacity;
            c.fillStyle = p.color;
            c.beginPath();
            c.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            c.fill();
            c.globalAlpha = 1;
          }
        }
        if (!follower.isShooting) {
          follower.shootParticles = [];
        }
      });

      /* === DRAW: BACKGROUND ANIMATION === */
      backgroundParticlesRef.current.forEach((p) => {
        // boosted
        p.speedY = isBoostingRef.current
          ? backgroundBossParticles.speed
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
        scoreRef.current >= spawnScore.boss
      ) {
        // debug - boss spawn
        // console.log("Spawning boss");

        bossRef.current = {
          x: canvas.width / 2 - bossConfig.width / 2,
          y: -bossConfig.height,
          width: bossConfig.width,
          height: bossConfig.height,
          lives: bossConfig.lives,
          entering: true,
          entrancePhase: "descending",
          phase: 1,
        };
        isPlayerActiveRef.current = false;
        isPlayerFrozenRef.current = true;
      }

      /* === DRAW: BOSS === */
      if (bossRef.current) {
        // === ANIMATION: ENTERING ===
        if (bossRef.current.entering) {
          isPlayerInvincible.current = true;
          isBoostingRef.current = true;

          // play boss music
          if (!bossMusicPlayedRef.current) {
            bossMusicPlayedRef.current = true;
            playBossMusic();
          }

          if (bossRef.current.entrancePhase === "descending") {
            playerTransitionRef.current = "exitScene";

            bossRef.current.y += 0.3; // descending speed
            if (bossRef.current.y >= 0) {
              bossRef.current.entrancePhase = "rising";
              playSound(soundURL.bossDescending, 1);
            }
          } else if (bossRef.current.entrancePhase === "rising") {
            playerTransitionRef.current = "reenterScene";

            isBoostingRef.current = false;
            bossRef.current.y -= 0.5; // rising speed
            if (bossRef.current.y <= -50) {
              bossRef.current.y = -50;
              bossRef.current.entering = false;
              bossRef.current.entrancePhase = null;

              isPlayerActiveRef.current = true;
              isPlayerInvincible.current = false;
              isPlayerFrozenRef.current = false;
            }
          }
        }

        // === DRAW BOSS IMAGE ===
        const b = bossRef.current;
        if (bossImageRef.current.complete) {
          c.drawImage(bossImageRef.current, b.x, b.y, b.width, b.height);
        } else {
          // fallback
          c.fillStyle = "red";
          c.fillRect(b.x, b.y, b.width, b.height);
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

          if (bossRef.current.lives > 600) {
            c.fillStyle = "rgba(34, 211, 238, 0.4)";
          } else if (bossRef.current.lives > 300) {
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

      /* === DRAW: BOSS PROJECTILES === */
      // === PHASE 1 ===
      if (
        bossRef.current &&
        !bossRef.current.entering &&
        isPhase1EnabledRef.current
      ) {
        // debug - phase 1
        // console.log("phase 1 - bullet");

        const b = bossRef.current;

        // Small
        bossGunOffsets.small.forEach((offsetX) => {
          if (Math.random() < 0.03) {
            bossProjectilesSmallRef.current.push({
              x: b.x + offsetX,
              y: b.y + bossConfig.height - 1,
              ...bossProjectileConfig.small,
            });
            playLaserSound(soundURL.laserInvader);
          }
        });

        // Medium
        bossGunOffsets.medium.forEach((offsetX) => {
          if (Math.random() < 0.02) {
            bossProjectilesMediumRef.current.push({
              x: b.x + offsetX,
              y: b.y + bossConfig.height - 1,
              ...bossProjectileConfig.medium,
            });
          }
        });

        // Large
        bossGunOffsets.large.forEach((offsetX) => {
          if (Math.random() < 0.01) {
            bossProjectilesLargeRef.current.push({
              x: b.x + offsetX,
              y: b.y + bossConfig.height - 1,
              ...bossProjectileConfig.large,
            });
          }
        });
      }
      // === PHASE 2 ===
      if (
        bossRef.current &&
        !bossRef.current.entering &&
        isPhase2EnabledRef.current
      ) {
        // debug - phase 2
        // console.log("phase 2 - laser");
        bossBeamsRef.current = bossBeamsRef.current.filter((beam) => {
          const now = performance.now();

          if (beam.isCharging && now >= beam.chargeEnd) {
            beam.isCharging = false;
            beam.isShooting = true;
          }

          if (beam.isShooting && now >= beam.shootEnd) {
            return false;
          }

          const hitbox = getBossBeamHitbox(beam);

          // === RENDER ===
          if (beam.isCharging) {
            const colorCycle = [
              "#FFFF00",
              "#FFC300",
              "#FF8C00",
              "#FF4500",
              "#FF0000",
            ];
            const colorIndex = Math.floor(now / 100) % colorCycle.length;
            const alpha = 0.3 + 0.5 * Math.abs(Math.sin(now / 300));

            c.fillStyle = colorCycle[colorIndex];
            c.globalAlpha = alpha;
            c.fillRect(hitbox.x, hitbox.y, hitbox.width, hitbox.height);
            c.globalAlpha = 1;
          }

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
        // debug - phase 3
        // console.log("phase 3 - extra");
      }

      /* === UPDATE: BOSS PROJECTILES === */
      const drawBossProjectiles = (projectiles, config) => {
        projectiles.forEach((p) => {
          p.y += p.speed;
          c.fillStyle = config.color;
          c.fillRect(p.x, p.y, config.width, config.height);
        });
      };

      [
        bossProjectilesSmallRef,
        bossProjectilesMediumRef,
        bossProjectilesLargeRef,
      ].forEach((ref, i) => {
        const type = ["small", "medium", "large"][i];
        const config = bossProjectileConfig[type];

        ref.current = ref.current.filter((p) => p.y < canvas.height);
        drawBossProjectiles(ref.current, config);
      });

      /* === COLLISION DETECTION: BOSS PROJECTILES → PLAYER === */
      const bossProjectileRefs = [
        bossProjectilesSmallRef,
        bossProjectilesMediumRef,
        bossProjectilesLargeRef,
      ];
      bossProjectileRefs.forEach((ref) => {
        ref.current.forEach((p, index) => {
          if (isGameEndingRef.current || isPlayerInvincible.current) return;

          const hitbox = getPlayerHitbox();
          const hit =
            p.x < hitbox.x + hitbox.width &&
            p.x + p.width > hitbox.x &&
            p.y < hitbox.y + hitbox.height &&
            p.y + p.height > hitbox.y;

          if (hit) {
            ref.current.splice(index, 1);

            if (isShieldActiveRef.current) {
              handleShieldBlock(p.x, p.y);
              return;
            }

            handlePlayerHit();
            const newLives = Math.max(0, livesRef.current - (p.damage || 1));
            setLives(newLives);

            if (newLives <= 0) handleGameOver();
          }
        });
      });

      // === COLLISION DETECTION: BOSS LASERS → PLAYER ===
      if (bossRef.current && isPhase2EnabledRef.current) {
        bossBeamsRef.current.forEach((beam) => {
          if (
            !beam.isShooting ||
            isGameEndingRef.current ||
            isPlayerInvincible.current
          )
            return;

          const beamHitbox = getBossBeamHitbox(beam);
          const playerHitbox = getPlayerHitbox();

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

            handlePlayerHit();

            const beamDamage = beam.damage;
            const newLives = Math.max(0, livesRef.current - beamDamage);
            setLives(newLives);

            if (newLives <= 0) handleGameOver();
          }
        });
      }

      /* === COLLISION DETECTION: PLAYER PROJECTILE → BOSS === */
      if (bossRef.current && !bossRef.current.entering) {
        const b = bossRef.current;

        const hitbox = {
          x: b.x,
          y: b.y + b.height - 10,
          width: b.width,
          height: 10,
        };

        // debug - boss hitbox
        // c.fillStyle = "rgba(255, 0, 0, 0.3)";
        // c.fillRect(hitbox.x, hitbox.y, hitbox.width, hitbox.height);

        projectilesRef.current.forEach((p, pIndex) => {
          const hit =
            p.x < hitbox.x + hitbox.width &&
            p.x + p.width > hitbox.x &&
            p.y < hitbox.y + hitbox.height &&
            p.y + p.height > hitbox.y;

          if (hit) {
            b.lives -= 10; // cambia - 1

            createExplosion(p.x + p.width / 2, p.y, playerParticles);
            playSound(soundURL.hitFollower, 0.6);

            projectilesRef.current.splice(pIndex, 1);
          }
        });

        updateBossPhase();
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
    // debug - current theme
    // console.log("Playing theme:", randomTheme);
    setCurrentTheme(randomTheme);

    if (gameOver) {
      // reset player
      playerXRef.current = canvasRef.current.width / 2 - playerConfig.width / 2;
      playerRotationRef.current = 0;
      lastShotTimeRef.current = 0;
      livesRef.current = 5;
      setLives(5);
      setPlayerX(playerXRef.current);
      isGameEndingRef.current = false;
      isPlayerInvincible.current = false;
      isPlayerFrozenRef.current = false;

      // clear canvas
      projectilesRef.current = [];
      particlesRef.current = [];
      backgroundParticlesRef.current = [];
      shieldPowerUpRef.current = [];

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

      // score
      scoreRef.current = 0;
      setScore(0);
    }

    setGameOver(false);
    setIsGameRunning(true);
  };

  /* === GAME OVER === */
  const handleGameOver = () => {
    if (isGameEndingRef.current) return;
    isGameEndingRef.current = true;

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
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 z-50">
      {/* Canvas */}
      <div className="relative flex flex-col items-center">
        <canvas
          ref={canvasRef}
          className="border border-white bg-black"
          width={1024}
          height={576}
        />
        {/* debug - Canvas Center */}
        {/* <div
          className="absolute"
          style={{
            top: `${canvasSize.height / 2}px`,
            left: 0,
            width: "100%",
            borderTop: "2px solid red",
          }}
        ></div>
        <div
          className="absolute"
          style={{
            top: 0,
            left: `${canvasSize.width / 2}px`,
            height: "100%",
            borderLeft: "2px solid red",
          }}
        ></div> */}
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 px-1 rounded text-white"
      >
        ✖
      </button>

      {/* Controls */}
      <button
        onClick={() => setShowControls((prev) => !prev)}
        className="absolute top-2 right-20 bg-gray-200 hover:bg-gray-300 px-1 rounded cursor-pointer"
      >
        🎮
      </button>
      {showControls && (
        <div className="absolute top-12 right-24 bg-white shadow-xl p-2 rounded border border-gray-300 z-50 text-black w-[350px]">
          <h3 className="text-lg font-bold mb-4 text-center">
            Keyboard Controls
          </h3>

          <div className="flex flex-col gap-2">
            {/* Row 1 */}
            <div className="flex gap-1 justify-center">
              {"1234567890".split("").map((char) => (
                <Key key={char} label={char} />
              ))}
            </div>

            {/* Row 2 */}
            <div className="flex gap-1 justify-center ml-4">
              {"qwertyuiop".split("").map((char) => (
                <Key key={char} label={char} />
              ))}
            </div>

            {/* Row 3 */}
            <div className="flex gap-1 justify-center">
              {"asdfghjkl".split("").map((char) => (
                <Key
                  key={char}
                  label={char}
                  highlight={["a", "d"].includes(char)}
                />
              ))}
            </div>

            {/* Row 4 */}
            <div className="flex gap-1 justify-center mr-10">
              {"zxcvbnm".split("").map((char) => (
                <Key key={char} label={char} />
              ))}
            </div>

            {/* Row 5: Space + Arrows */}
            <div className="flex justify-between items-center mt-2">
              <div className="flex gap-1 ml-25">
                <Key label="" wide highlight />
              </div>
              <div className="flex gap-1 mr-4">
                <Key label="<" highlight />
                <div className="flex flex-col gap-0.5">
                  <Key label="˄" halfHeight tinyText />
                  <Key label="˅" halfHeight tinyText />
                </div>
                <Key label=">" highlight />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center mt-1">
            <p className=" text-center text-sm text-gray-600">
              Use arrows to move, space to shoot.
            </p>
          </div>
        </div>
      )}

      {/* Audio Settings */}
      <button
        onClick={() => setShowVolumeSettings((prev) => !prev)}
        className="absolute top-2 right-10 bg-gray-200 hover:bg-gray-300 px-1 rounded cursor-pointer"
      >
        🔊
      </button>
      {/* Audio Settings Popup */}
      {showVolumeSettings && (
        <div className="absolute top-12 right-4 bg-white shadow-lg p-4 rounded border border-gray-300 z-50">
          {/* SFX */}
          <div className="flex items-center gap-2 mb-2 text-black">
            <label htmlFor="sfx">Sound</label>
            <input
              id="sfx"
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={sfxVolume}
              onChange={(e) => setSfxVolume(parseFloat(e.target.value))}
            />
          </div>
          {/* Laser Volume */}
          <div className="flex items-center gap-2 mb-2 text-black">
            <label htmlFor="laser">Shoot</label>
            <input
              id="laser"
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={laserVolume}
              onChange={(e) => setlaserVolume(parseFloat(e.target.value))}
            />
          </div>
          {/* Background Music */}
          <div className="flex items-center gap-2 mb-2 text-black">
            <label htmlFor="music">Music</label>
            <input
              id="music"
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={musicVolume}
              onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
            />
          </div>
          {/* Audio */}
          <button
            onClick={() => setAudioEnabled((prev) => !prev)}
            className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded w-full"
          >
            {audioEnabled ? "🔊" : "🔇"}
          </button>
        </div>
      )}

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
