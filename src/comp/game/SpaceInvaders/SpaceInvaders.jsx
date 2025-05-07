import { useState, useEffect, useRef } from "react";
import "./SpaceInvaders.css";

/* Images */
const imgURL = {
  // player
  greenPlayer: "/images/spaceInvaders/ship/playerShip1_green.webp",
  bluePlayer: "/images/spaceInvaders/ship/playerShip1_blue.webp",
  redPlayer: "/images/spaceInvaders/ship/playerShip1_red.webp",
  greenPlayerLives: "/images/spaceInvaders/ship/playerLife1_green.webp",
  bluePlayerLives: "/images/spaceInvaders/ship/playerLife1_blue.webp",
  redPlayerLives: "/images/spaceInvaders/ship/playerLife1_red.webp",
  // laser
  laserGreen: "images/spaceInvaders/laser/laserGreen.webp",
  laserBlue: "images/spaceInvaders/laser/laserBlue.webp",
  laserRed: "images/spaceInvaders/laser/laserRed.webp",
  // shield
  shield1: "images/spaceInvaders/shield/shield1.webp",
  shield2: "images/spaceInvaders/shield/shield2.webp",
  shield3: "images/spaceInvaders/shield/shield3.webp",
  // enemy
  invader: "/images/spaceInvaders/invader/invader.webp",
  meteorBig: "/images/spaceInvaders/invader/meteorbig.webp",
  meteorMed: "/images/spaceInvaders/invader/meteormed.webp",
  meteorSmall: "/images/spaceInvaders/invader/meteorsmall.webp",
  // numeral
  n0: "images/spaceInvaders/numeral/numeral0.webp",
  n1: "images/spaceInvaders/numeral/numeral1.webp",
  n2: "images/spaceInvaders/numeral/numeral2.webp",
  n3: "images/spaceInvaders/numeral/numeral3.webp",
  n4: "images/spaceInvaders/numeral/numeral4.webp",
  n5: "images/spaceInvaders/numeral/numeral5.webp",
  n6: "images/spaceInvaders/numeral/numeral6.webp",
  n7: "images/spaceInvaders/numeral/numeral7.webp",
  n8: "images/spaceInvaders/numeral/numeral8.webp",
  n9: "images/spaceInvaders/numeral/numeral9.webp",
  nX: "images/spaceInvaders/numeral/numeralX.webp",
};

/* Sounds */
// sfx
const laserSound = "/sounds/spaceInvaders/laser.mp3";
const laserInvaderSound = "/sounds/spaceInvaders/laserInvader.mp3";
const destroyInvaderSound = new Audio(
  "/sounds/spaceInvaders/destroyInvader.mp3"
);
const playerHitSound = new Audio("/sounds/spaceInvaders/playerHit.mp3");
const destroyGridSound = new Audio("/sounds/spaceInvaders/destroyGrid.mp3");
// theme
const gameOverSound = new Audio("/sounds/spaceInvaders/gameOver.mp3");
const themeURL = [
  "/sounds/spaceInvaders/spaceInvaders-theme1.mp3",
  "/sounds/spaceInvaders/spaceInvaders-theme2.mp3",
  "/sounds/spaceInvaders/spaceInvaders-theme3.mp3",
  "/sounds/spaceInvaders/spaceInvaders-theme4.mp3",
];

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
  /* Invader Projectile */
  const invaderProjectilesRef = useRef([]);
  const invaderProjectileConfig = {
    width: 4,
    height: 12,
    speed: 4,
    frame: 100,
  };
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
    frameRate: 400,
  };
  const meteorImages = {
    big: new Image(),
    med: new Image(),
    small: new Image(),
  };
  /* Score */
  const [score, setScore] = useState(0);
  const scoreParams = {
    single: 10,
    grid: 50,
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
  const DISCOUNT_CODE = "INVADER5";
  const SCORE_THRESHOLD = 10000;
  const [hasUnlockedDiscount, setHasUnlockedDiscount] = useState(false);
  /* Sound */
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [musicVolume, setMusicVolume] = useState(0.4);
  const [sfxVolume, setSfxVolume] = useState(0.8);
  const [laserVolume, setlaserVolume] = useState(0.2);
  const [showVolumeSettings, setShowVolumeSettings] = useState(false);
  const gameBgMusic = useRef(null);
  const [currentTheme, setCurrentTheme] = useState(themeURL[0]);
  const sfxVolumeRef = useRef(sfxVolume);
  const laserVolumeRef = useRef(laserVolume);
  const audioEnabledRef = useRef(audioEnabled);
  // play sfx
  const playSound = (sound, volumeMultiplier = 1) => {
    if (audioEnabledRef.current && sound) {
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
  const playerParticles = {
    color: "white",
    opacity: 1,
    count: 25,
  };
  // Create Particles
  function createExplosion(x, y, { color, count, opacity }) {
    for (let i = 0; i < count; i++) {
      particlesRef.current.push({
        x,
        y,
        radius: Math.random() * 3 + 1,
        color,
        velocity: {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
        },
        opacity,
      });
    }
  }

  // Player Hit Animation
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

  // Score UI
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

  // Lives UI
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

        if (current10K !== next10K) {
          setScoreTextSize("w-8 h-8");
          setTimeout(() => setScoreTextSize("w-4.5 h-4.5"), 400);
        } else if (currentK !== nextK) {
          setScoreTextSize("w-6 h-6");
          setTimeout(() => setScoreTextSize("w-4.5 h-4.5"), 300);
        }

        return next;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [score, displayedScore]);

  /* Volume */
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

  /* Game Over - Score + Discount Code */
  useEffect(() => {
    if (gameOver && score > 0) {
      saveScoreIfHigh(score);

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

  /* Synchronize ref */
  useEffect(() => {
    playerXRef.current = playerX;
    livesRef.current = lives;
  }, [playerX, lives]);

  /* Main */
  useEffect(() => {
    if (!isGameRunning) return;
    // player active
    isPlayerActiveRef.current = true;
    playerOpacityRef.current = 1;

    // === INIT CANVAS ===
    document.body.style.overflow = "hidden";
    const canvas = canvasRef.current;
    const c = canvas.getContext("2d");
    if (!c) return;
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    // === BACKGROUND ANIMATION ===
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

    // === LOAD IMAGES ===
    playerImageRef.current.src = imgURL[playerColor];
    invaderImageRef.current.src = imgURL.invader;
    projectileImages.greenPlayer.src = imgURL.laserGreen;
    projectileImages.bluePlayer.src = imgURL.laserBlue;
    projectileImages.redPlayer.src = imgURL.laserRed;
    meteorImages.big.src = imgURL.meteorBig;
    meteorImages.med.src = imgURL.meteorMed;
    meteorImages.small.src = imgURL.meteorSmall;

    // === INIT PLAYER ===
    const initialPlayerX = canvas.width / 2 - playerConfig.width / 2;
    setPlayerX(initialPlayerX);
    playerXRef.current = initialPlayerX;
    const playerY = canvas.height - playerConfig.height - 10;

    // === INPUT HANDLING ===
    const keysPressed = new Set();
    const handleKeyDown = (e) => {
      keysPressed.add(e.key);
    };
    const handleKeyUp = (e) => {
      keysPressed.delete(e.key);
    };
    addEventListener("keydown", handleKeyDown);
    addEventListener("keyup", handleKeyUp);

    // === INVADER GRID SPAWNING ===
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
      });
    };
    // === INVADER GRID FRAME CONTROL ===
    spawnInvaderGrid();
    let frames = 1;
    let randomInterval = Math.floor(Math.random() * 500 + 500);

    // === GAME LOOP ===
    const gameLoop = () => {
      if (isPlayerActiveRef.current) {
        // === PLAYER MOVEMENT ===
        if (keysPressed.has("ArrowLeft")) {
          playerXRef.current = Math.max(
            playerXRef.current - playerConfig.speed,
            0
          );
          playerRotationRef.current = -0.15;
        } else if (keysPressed.has("ArrowRight")) {
          playerXRef.current = Math.min(
            playerXRef.current + playerConfig.speed,
            canvas.width - playerConfig.width
          );
          playerRotationRef.current = 0.15;
        } else {
          playerRotationRef.current *= 0.9;
        }

        // === SHOOT PROJECTILES ===
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

            playLaserSound(laserSound);
          }
        }
      }

      // === INVADER GRIDS MOVEMENT ===
      invaderGridsRef.current.forEach((grid) => {
        grid.x += grid.speed * grid.direction;

        const hitLeft = grid.x <= 0;
        const hitRight = grid.x + grid.width >= canvas.width;

        if (hitLeft || hitRight) {
          grid.direction *= -1;
          grid.y += 30;
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

      // === BACKGROUND ANIMATION DRAW ===
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

      // === UPDATE & DRAW INVADER PROJECTILES ===
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

      // === CHECK COLLISION INVADER PROJECTILE-PLAYER ===
      invaderProjectilesRef.current.forEach((p, index) => {
        const hit =
          p.x < playerXRef.current + playerConfig.width &&
          p.x + p.width > playerXRef.current &&
          p.y < playerY + playerConfig.height &&
          p.y + p.height > playerY;

        if (hit) {
          flashEffect(playerOpacityRef, {
            playerActive: isPlayerActiveRef,
          });

          playSound(playerHitSound, 0.7);

          createExplosion(
            playerXRef.current + playerConfig.width / 2,
            playerY + playerConfig.height / 2,
            playerParticles
          );
          invaderProjectilesRef.current.splice(index, 1);

          const newLives = Math.max(0, livesRef.current - 1);
          setLives(newLives);

          // === LOSE CONDITION ===
          if (newLives <= 0) {
            handleGameOver();
          }
        }
      });

      // === UPDATE & DRAW PLAYER PROJECTILES ===
      projectilesRef.current = projectilesRef.current
        .map((p) => {
          const updated = { ...p, y: p.y - p.speed };
          return updated;
        })
        .filter((p) => {
          const isVisible = p.y + p.height > 0;
          return isVisible;
        });
      projectilesRef.current.forEach((p) => {
        const img = projectileImages[p.color];
        if (img.complete) {
          c.drawImage(img, p.x, p.y, p.width, p.height);
        }
      });

      // === CHECK PROJECTILE-INVADER COLLISION ===
      projectilesRef.current.forEach((p, pIndex) => {
        invaderGridsRef.current.forEach((grid) => {
          for (let row = 0; row < grid.rows; row++) {
            for (let col = 0; col < grid.cols; col++) {
              if (grid.invaders[row][col]) {
                const invaderX = grid.x + col * invaderConfig.width;
                const invaderY = grid.y + row * invaderConfig.height;

                const hit =
                  p.x < invaderX + invaderConfig.width &&
                  p.x + p.width > invaderX &&
                  p.y < invaderY + invaderConfig.height &&
                  p.y + p.height > invaderY;

                // remove invader
                if (hit) {
                  grid.invaders[row][col] = false;
                  createExplosion(
                    invaderX + invaderConfig.width / 2,
                    invaderY + invaderConfig.height / 2,
                    invaderParticles
                  );

                  playSound(destroyInvaderSound, 0.5);

                  setScore((prevScore) => prevScore + scoreParams.single);
                  projectilesRef.current.splice(pIndex, 1);
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
            playSound(destroyGridSound, 0.5);
            setScore((prevScore) => prevScore + scoreParams.grid);
          }
          return stillHasInvaders;
        }
      );

      // === DRAW PLAYER ===
      c.save();
      c.globalAlpha = isPlayerActiveRef.current ? playerOpacityRef.current : 0;
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
        c.fillStyle = "green";
        c.fillRect(
          playerXRef.current,
          playerY,
          playerConfig.width,
          playerConfig.height
        );
      }
      c.restore();

      // === DRAW INVADER GRIDS ===
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
      // === SPAWN NEW INVADER GRIDS ===
      if (frames % randomInterval === 0) {
        spawnInvaderGrid();
        frames = 0;
        randomInterval = Math.floor(Math.random() * 500 + 500);
      }

      frames++;

      // === INVADER SHOOTING ===
      if (frames % invaderProjectileConfig.frame === 0) {
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

            playLaserSound(laserInvaderSound);
          }
        });
      }

      // === PARTICLES UPDATE & DRAW ===
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

  /* Start & Reset */
  const handleGameStart = () => {
    const randomTheme = themeURL[Math.floor(Math.random() * themeURL.length)];
    setCurrentTheme(randomTheme);

    if (gameOver) {
      invaderGridsRef.current = [];
      projectilesRef.current = [];
      invaderProjectilesRef.current = [];
      particlesRef.current = [];
      backgroundParticlesRef.current = [];

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

  /* Game Over */
  const handleGameOver = () => {
    isPlayerActiveRef.current = false;
    playSound(gameOverSound);

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
          width={canvasSize.width}
          height={canvasSize.height}
        />
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 px-1 rounded text-white cursor-pointer"
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
