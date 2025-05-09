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
  // Destroy
  playerHit: "/sounds/spaceInvaders/destroy/playerHit.mp3",
  destroyInvader: "/sounds/spaceInvaders/destroy/destroyInvader.mp3",
  destroyGrid: "/sounds/spaceInvaders/destroy/destroyGrid.mp3",
  destroyMeteor: "/sounds/spaceInvaders/destroy/destroyMeteor.mp3",
  destroyMeteor2: "/sounds/spaceInvaders/destroy/destroyMeteorSmall.mp3",
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
  const animationIdRef = useRef(null);

  /* Player */
  const playerImageRef = useRef(new Image());
  const playerScale = 0.5;
  const playerConfig = {
    width: 99 * playerScale,
    height: 75 * playerScale,
    speed: 5,
  };
  const playerOpacityRef = useRef(1);
  const playerRotationRef = useRef(0);
  const [playerX, setPlayerX] = useState(0);
  const playerXRef = useRef(playerX);
  const isPlayerActiveRef = useRef(true);
  // Lives
  const [lives, setLives] = useState(3);
  const livesRef = useRef(3);
  const [animateLifeLoss, setAnimateLifeLoss] = useState(false);
  const previousLivesRef = useRef(lives);

  /* Projectile */
  const projectileImages = {
    greenPlayer: new Image(),
    bluePlayer: new Image(),
    redPlayer: new Image(),
  };
  const lastShotTimeRef = useRef(0);
  const projectilesRef = useRef([]);
  const projectileConfig = {
    cooldown: 200,
    width: 8,
    height: 20,
    speed: 7,
  };

  /* Frame Rate */
  const frameRate = {
    invaderProjectile: 100,
    invaderGrid: 400,
    follower: 1000,
    meteor: 500,
    shield: 800,
  };

  /* Invader */
  const invaderImageRef = useRef(new Image());
  const invaderScale = 1;
  const invaderConfig = {
    width: 30 * invaderScale,
    height: 30 * invaderScale,
    maxSpeed: 3,
    minSpeed: 2,
  };
  const invaderGridsRef = useRef([]);
  // Invader Projectile
  const invaderProjectilesRef = useRef([]);
  const invaderProjectileConfig = {
    width: 4,
    height: 12,
    speed: 4,
  };

  /* Follower */
  const followerImageRef = useRef(new Image());
  const followersRef = useRef([]);
  const followerConfig = {
    width: 50,
    height: 40,
    lives: 3,
    speed: 2.5,
    shootInterval: 300, // ~5 s - 60fps
    chargeDuration: 90, // ~1.5 s
    beamDuration: 120, // ~2 s
    beamWidth: 20,
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
  const shieldImage = new Image();
  const shieldImageRef = useRef(new Image());
  const shieldPowerUpRef = useRef([]);
  const isShieldActiveRef = useRef(false);
  const shieldTimerRef = useRef(null);
  const shieldConfig = {
    width: 144,
    height: 137,
    time: 5000,
  };

  /* Score */
  const [score, setScore] = useState(0);
  const scoreParams = {
    single: 10,
    grid: 50,
    follower: 100,
    meteorBig: 10,
    meteorMed: 20,
    meteorSmall: 50,
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

  /* Particles */
  const particlesRef = useRef([]);
  const backgroundParticlesRef = useRef([]);
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
  // Beam Particles
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
          radius: Math.random() * 2,
          speedY: 0.3,
          opacity: 0.5 + Math.random() * 0.5,
          color: "white",
        });
      }
      backgroundParticlesRef.current = particles;
    };
    spawnBackgroundParticles();

    /* === LOAD IMAGES === */
    playerImageRef.current.src = imgURL[playerColor];
    invaderImageRef.current.src = imgURL.invader;
    projectileImages.greenPlayer.src = imgURL.laserGreen;
    projectileImages.bluePlayer.src = imgURL.laserBlue;
    projectileImages.redPlayer.src = imgURL.laserRed;
    meteorImages.big.src = imgURL.meteorBig;
    meteorImages.med.src = imgURL.meteorMed;
    meteorImages.small.src = imgURL.meteorSmall;
    shieldImage.src = imgURL.shield;
    shieldImageRef.current.src = imgURL.shield;
    followerImageRef.current.src = imgURL.follower;

    /* === INIT PLAYER === */
    const initialPlayerX = canvas.width / 2 - playerConfig.width / 2;
    setPlayerX(initialPlayerX);
    playerXRef.current = initialPlayerX;
    const playerY = canvas.height - playerConfig.height - 10;

    /* === PLAYER HITBOX === */
    const getPlayerHitbox = () => {
      // === SHIELD HITBOX ===
      if (isShieldActiveRef.current) {
        const x =
          playerXRef.current + playerConfig.width / 2 - shieldConfig.width / 2;
        const y = playerY + playerConfig.height / 2 - shieldConfig.height / 2;
        return {
          x,
          y,
          width: shieldConfig.width,
          height: shieldConfig.height,
        };
      }

      return {
        x: playerXRef.current,
        y: playerY,
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

    /* === INVADER GRID SPAWNING === */
    const spawnInvaderGrid = () => {
      const cols = Math.floor(Math.random() * 10 + 5); // 5-15
      const rows = Math.floor(Math.random() * 5 + 2); // 2-7
      const gridWidth = cols * invaderConfig.width;
      const gridHeight = rows * invaderConfig.height;

      const x = 0;
      const y = 0;

      const sizeFactor = cols * rows;
      const minSize = 5 * 2; // 10
      const maxSize = 15 * 7; // 105
      const speed =
        invaderConfig.maxSpeed -
        ((sizeFactor - minSize) / (maxSize - minSize)) *
          (invaderConfig.maxSpeed - invaderConfig.minSpeed);

      // debug - invader grid speed
      // console.log(`New group: ${cols}x${rows}, speed: ${speed.toFixed(2)}`);

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
      });
    };
    // === FRAME CONTROL: INVADER GRID SPAWN  ===
    spawnInvaderGrid(); // first spawn
    let frames = 1;
    let randomInterval = Math.floor(
      Math.random() * frameRate.invaderGrid + frameRate.invaderGrid
    );

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
        if (keysPressed.has("ArrowLeft")) {
          playerXRef.current = Math.max(
            playerXRef.current - playerConfig.speed,
            0
          );
          playerRotationRef.current = -0.15; // tilt left
        } else if (keysPressed.has("ArrowRight")) {
          playerXRef.current = Math.min(
            playerXRef.current + playerConfig.speed,
            canvas.width - playerConfig.width
          );
          playerRotationRef.current = 0.15; // tilt right
        } else {
          playerRotationRef.current *= 0.9; // smooth return
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

      /***************************************************************
       *             SECTION: SPAWN ELEMENT & MOVEMENT               *
       ***************************************************************/

      /* === FRAME CONTROL: SPAWN SHIELD === */
      if (frames % frameRate.shield === 0) {
        const x = Math.random() * (canvas.width - 40);
        const y = -40;

        shieldPowerUpRef.current.push({
          x,
          y,
          width: 40,
          height: 40,
          speed: 2,
          image: shieldImage,
        });
      }

      /* === FRAME CONTROL: METEOR MOVEMENT === */
      if (frames % frameRate.meteor === 0) {
        const types = ["big", "med", "small"];
        const type = types[Math.floor(Math.random() * types.length)];

        const x = Math.random() * (canvas.width - meteorConfig.size[type]);
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
      }

      /* === INVADER GRIDS MOVEMENT === */
      invaderGridsRef.current.forEach((grid) => {
        grid.x += grid.speed * grid.direction;

        const hitLeft = grid.x <= 0;
        const hitRight = grid.x + grid.width >= canvas.width;

        if (hitLeft || hitRight) {
          grid.direction *= -1;
          grid.y += 30;
        }
      });

      /* === FOLLOWER MOVEMENT === */
      followersRef.current.forEach((follower) => {
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
        }

        // Beam Start (1.5s)
        if (follower.shootTimer === beamStart) {
          follower.isCharging = false;
          follower.isShooting = true;
          // debug - beam active
          // console.log(`Follower @ x=${Math.round(follower.x)} | Beam ACTIVE`);
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

      // === STATE UPDATES FOR DRAWING ===
      setPlayerX(playerXRef.current);

      // === LOSE CONDITION ===
      const hasLost = invaderGridsRef.current.some(
        (grid) => grid.y + grid.height >= canvas.height + 10
      );
      if (hasLost) {
        handleGameOver();
        return;
      }

      // === CLEAR CANVAS ===
      c.clearRect(0, 0, canvas.width, canvas.height);

      /* === BACKGROUND ANIMATION DRAW === */
      backgroundParticlesRef.current.forEach((p) => {
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
       *                   SECTION: UPDATE POSITION                  *
       ***************************************************************/

      /* === UPDATE POSITION: PLAYER PROJECTILES === */
      projectilesRef.current = projectilesRef.current
        .map((p) => {
          const updated = { ...p, y: p.y - p.speed };
          // debug - projectile position
          //   console.log("projectile updated:", updated);
          return updated;
        })
        .filter((p) => {
          const isVisible = p.y + p.height > 0;
          // debug - projectile removed
          //   if (!isVisible)
          //     console.log("projectile removed:", p);
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
        c.drawImage(p.image, p.x, p.y, p.width, p.height);
        // debug - hitbox shield
        // c.fillStyle = "rgba(0, 0, 255, 0.2)";
        // c.fillRect(p.x, p.y, p.width, p.height);
      });

      /***************************************************************
       *                SECTION: COLLISION DETECTION                 *
       ***************************************************************/

      /* === COLLISION DETECTION: PLAYER PROJECTILE → SHIELD === */
      projectilesRef.current.forEach((proj, pIndex) => {
        shieldPowerUpRef.current.forEach((powerUp, sIndex) => {
          const hit =
            proj.x < powerUp.x + powerUp.width &&
            proj.x + proj.width > powerUp.x &&
            proj.y < powerUp.y + powerUp.height &&
            proj.y + proj.height > powerUp.y;

          if (hit) {
            projectilesRef.current.splice(pIndex, 1);
            shieldPowerUpRef.current.splice(sIndex, 1);

            // debug - collect shield (projectile)
            // console.log("collect shield (projectile)");
            activateShield();
          }
        });
      });

      /* === COLLISION DETECTION: SHIELD → PLAYER === */
      shieldPowerUpRef.current.forEach((powerUp, sIndex) => {
        const hit =
          powerUp.x < playerXRef.current + playerConfig.width &&
          powerUp.x + powerUp.width > playerXRef.current &&
          powerUp.y < playerY + playerConfig.height &&
          powerUp.y + powerUp.height > playerY;

        if (hit) {
          shieldPowerUpRef.current.splice(sIndex, 1);

          // debug - collect shield (collision)
          // console.log("collect shield (collision)");
          activateShield();
        }
      });

      /* === COLLISION DETECTION: INVADER PROJECTILE → PLAYER === */
      invaderProjectilesRef.current.forEach((p, index) => {
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

            createExplosion(p.x, p.y, shieldParticles);
            playSound(soundURL.shieldBlock, 0.5);
            // debug - shield protection
            // console.log("invader projectile destroyed by shield");

            return;
          }

          // debug - invader projectile hits player
          // console.log("Player hit!");

          // Flash Animation
          flashEffect(playerOpacityRef, {
            playerActive: isPlayerActiveRef,
          });

          playSound(soundURL.playerHit, 0.7);
          // particles
          createExplosion(
            playerXRef.current + playerConfig.width / 2,
            playerY + playerConfig.height / 2,
            playerParticles
          );

          invaderProjectilesRef.current.splice(index, 1); // remove projectile

          const newLives = Math.max(0, livesRef.current - 1); // lose life
          setLives(newLives);

          // === LOSE CONDITION ===
          if (newLives <= 0) {
            handleGameOver();
          }
        }
      });

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

                  setScore((prevScore) => prevScore + scoreParams.single);
                  // debug - single invader score
                  // console.log(`+${scoreParams.single} points`);

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
            setScore((prevScore) => prevScore + scoreParams.grid);
            // debug - full grid score
            // console.log(`+${scoreParams.grid} points`);
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

              setScore((prevScore) => {
                const newScore = prevScore + scoreParams.meteorSmall;
                // debug - small meteor score
                // console.log(
                //   `Small Meteor Hit: +${scoreParams.meteorSmall} (${prevScore} → ${newScore})`
                // );
                return newScore;
              });
            } else {
              // downgrade meteor
              const currentType = m.type;

              if (m.lives === 2) {
                // big
                // debug - meteor downgrade
                // console.log("BIG Meteor Hit → Becomes MED");
                setScore((prevScore) => {
                  const newScore = prevScore + scoreParams.meteorBig;
                  // debug - big meteor score
                  // console.log(
                  //   `Big Meteor Hit: +${scoreParams.meteorBig} (${prevScore} → ${newScore})`
                  // );
                  return newScore;
                });
                m.type = "med";
              } else if (m.lives === 1) {
                // med
                // debug - meteor downgrade
                // console.log("MED Meteor Hit → Becomes SMALL");
                setScore((prevScore) => {
                  const newScore = prevScore + scoreParams.meteorMed;
                  // debug - med meteor score
                  // console.log(
                  //   `Med Meteor Hit: +${scoreParams.meteorMed} (${prevScore} → ${newScore})`
                  // );
                  return newScore;
                });
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

      /* === COLLISION DETECTION: METEOR → PLAYER === */
      meteorsRef.current.forEach((m, index) => {
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

            playSound(soundURL.shieldBlock, 0.5);
            createExplosion(
              m.x + m.width / 2,
              m.y + m.height / 2,
              shieldParticles
            );
            // debug - shield protection
            // console.log("meteor destroyed by shield");

            return;
          }

          meteorsRef.current.splice(index, 1);

          flashEffect(playerOpacityRef, {
            playerActive: isPlayerActiveRef,
          });

          playSound(soundURL.playerHit, 0.7);

          createExplosion(
            playerXRef.current + playerConfig.width / 2,
            playerY + playerConfig.height / 2,
            playerParticles
          );

          const damage = m.type === "big" ? 2 : 1;
          const newLives = Math.max(0, livesRef.current - damage);
          setLives(newLives);
          // debug - meteor damage
          // console.log(
          //   `${m.type.toUpperCase()} Meteor Hit player: -${damage} lives`
          // );

          // === LOSE CONDITION ===
          if (newLives <= 0) {
            handleGameOver();
          }
        }
      });

      /* === COLLISION DETECTION: FOLLOWER BEAM → PLAYER === */
      followersRef.current.forEach((follower) => {
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
            createExplosion(
              playerHitbox.x + playerHitbox.width / 2,
              playerHitbox.y + playerHitbox.height / 2,
              shieldParticles
            );
            playSound(soundURL.shieldBlock, 0.5);
          } else {
            flashEffect(playerOpacityRef, { playerActive: isPlayerActiveRef });

            createExplosion(
              playerHitbox.x + playerHitbox.width / 2,
              playerHitbox.y + playerHitbox.height / 2,
              playerParticles
            );

            playSound(soundURL.playerHit, 0.7);

            const newLives = Math.max(0, livesRef.current - 1);
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
                ? soundURL.destroyMeteor2
                : soundURL.destroyMeteor,
              0.6
            );

            // remove follower
            if (follower.lives <= 0) {
              followersRef.current.splice(fIndex, 1);
              setScore((prevScore) => prevScore + scoreParams.follower);
            }

            projectilesRef.current.splice(pIndex, 1);
          }
        });
      });

      /***************************************************************
       *                        SECTION: DRAW                        *
       ***************************************************************/

      /* === DRAW PLAYER === */
      c.save();
      // flash & player lose
      c.globalAlpha = isPlayerActiveRef.current ? playerOpacityRef.current : 0;
      // rotation
      c.translate(
        playerXRef.current + playerConfig.width / 2,
        playerY + playerConfig.height / 2
      );
      c.rotate(playerRotationRef.current);
      c.translate(
        -playerXRef.current - playerConfig.width / 2,
        -playerY - playerConfig.height / 2
      );
      if (playerImageRef.current.complete) {
        c.drawImage(
          playerImageRef.current,
          playerXRef.current,
          playerY,
          playerConfig.width,
          playerConfig.height
        );
      } else {
        // fallback
        c.fillStyle = "green";
        c.fillRect(
          playerXRef.current,
          playerY,
          playerConfig.width,
          playerConfig.height
        );
      }
      // debug - player hitbox
      // c.fillStyle = "rgba(255, 0, 0, 0.2)";
      // c.fillRect(playerXRef.current, playerY, playerConfig.width, playerConfig.height);

      // debug - log position & rotation
      // console.log({
      //   x: playerXRef.current,
      //   y: playerY,
      //   width: playerConfig.width,
      //   height: playerConfig.height,
      //   rotation: playerRotationRef.current.toFixed(2),
      // });
      c.restore();

      /* === DRAW SHIELD ON PLAYER === */
      if (isShieldActiveRef.current && shieldImageRef.current.complete) {
        const shieldX =
          playerXRef.current + playerConfig.width / 2 - shieldConfig.width / 2;
        const shieldY =
          playerY + playerConfig.height / 2 - shieldConfig.height / 2;

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

      /* === DRAW INVADER GRIDS === */
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

      /* === DRAW FOLLOWER & BEAM === */
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
          const colorIndex = Math.floor((frames / 5) % colorCycle.length);
          const beamColor = colorCycle[colorIndex];
          const alpha = 0.3 + 0.5 * Math.abs(Math.sin(frames / 3));
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
          const beamHitbox = getFollowerBeamHitbox(follower);

          c.fillStyle = "red";
          c.globalAlpha = 0.7;
          c.fillRect(
            beamHitbox.x,
            beamHitbox.y,
            beamHitbox.width,
            beamHitbox.height
          );
          c.globalAlpha = 1;
        }
      });

      /***************************************************************
       *                   SECTION: FRAME CONTROL                    *
       ***************************************************************/

      /* === FRAME CONTROL: NEW INVADER GRIDS SPAWN === */
      if (frames % randomInterval === 0) {
        spawnInvaderGrid();
        frames = 0;
        randomInterval = Math.floor(
          Math.random() * frameRate.invaderGrid + frameRate.invaderGrid
        );
      }

      frames++;

      /* === FRAME CONTROL: INVADER SHOOTING === */
      if (frames % frameRate.invaderProjectile === 0) {
        invaderGridsRef.current.forEach((grid) => {
          // alive invaders inside a grid
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

            // debug - invader shoot
            // console.log(`Invader at [${row}, ${col}] fired a shot`);

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

      /* === FRAME CONTROL: FOLLOWER SPAWN === */
      if (
        frames % frameRate.follower === 0 &&
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
        });
      }

      /***************************************************************
       *                      SECTION: PARTICLES                     *
       ***************************************************************/

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

      animationIdRef.current = requestAnimationFrame(gameLoop);
    };

    /****************************************************************
     *                                                              *
     *                        </ GAME LOOP >                        *
     *                                                              *
     ****************************************************************/

    // === NEXT FRAME ===
    animationIdRef.current = requestAnimationFrame(gameLoop);

    // === CLEANUP ===
    return () => {
      document.body.style.overflow = "";
      removeEventListener("keydown", handleKeyDown);
      removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(animationIdRef.current);
    };
  }, [isGameRunning, playerColor]);

  /***************************************************************
   *                      SECTION: GAMEPLAY                      *
   ***************************************************************/

  /* === START & RESET === */
  const handleGameStart = () => {
    const randomTheme = themeURL[Math.floor(Math.random() * themeURL.length)];
    // debug - current theme
    // console.log("Playing theme:", randomTheme);
    setCurrentTheme(randomTheme);

    if (gameOver) {
      invaderGridsRef.current = [];
      meteorsRef.current = [];
      projectilesRef.current = [];
      invaderProjectilesRef.current = [];
      particlesRef.current = [];
      backgroundParticlesRef.current = [];
      shieldPowerUpRef.current = [];
      followersRef.current = [];

      playerXRef.current = canvasRef.current.width / 2 - playerConfig.width / 2;
      playerRotationRef.current = 0;
      lastShotTimeRef.current = 0;
      livesRef.current = 3;

      setScore(0);
      setLives(3);
      setPlayerX(playerXRef.current);
    }

    setGameOver(false);
    setIsGameRunning(true);
  };

  /* === GAME OVER === */
  const handleGameOver = () => {
    isPlayerActiveRef.current = false;
    playSound(soundURL.gameOver);

    setTimeout(() => {
      cancelAnimationFrame(animationIdRef.current);
      setGameOver(true);
      setIsGameRunning(false);
    }, 1500);
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
            <p className="text-xl text-blue-600 mb-6 ">Final score: {score}</p>
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
