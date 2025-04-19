import { useState, useEffect, useRef } from "react";

const LOCAL_STORAGE_KEY = "unlockedLevelsOrder";

const popSound = new Audio("/sounds/order/order-pop.mp3");
const winSound = new Audio("/sounds/order/order-win.mp3");
const loseSound = new Audio("/sounds/order/order-lose.mp3");

export function useGameLogic() {
  /* STATES */

  // Level
  const levels = {
    1: { numBalls: 15, time: 30 },
    2: { numBalls: 25, time: 60 },
    3: { numBalls: 35, time: 90 },
    4: { numBalls: 42, time: 100 },
  };
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [numBalls, setNumBalls] = useState(levels[1].numBalls);
  const [timeLeft, setTimeLeft] = useState(levels[1].time);
  const [initialTime, setInitialTime] = useState(levels[1].time);
  const [nextNumber, setNextNumber] = useState(1);
  const [unlockedLevels, setUnlockedLevels] = useState([1]);
  const [level5Unlocked, setLevel5Unlocked] = useState(false); // LEVEL5
  // Game
  const [gameOver, setGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [victoryMessage, setVictoryMessage] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [cheatMode, setCheatMode] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(Date.now()); // LEVEL5
  // Scoreboard
  const [score, setScore] = useState(0); // LEVEL5
  const [displayedScore, setDisplayedScore] = useState(0); // LEVEL5
  const [scoreTextColor, setScoreTextColor] = useState("white"); // LEVEL5
  const [showScoreBoard, setShowScoreBoard] = useState(false);
  // Balls
  const [items, setItems] = useState([]);
  const [specialBalls, setSpecialBalls] = useState([]);
  const specialBallIdRef = useRef(1000); // unique ID (avoid collisions with normal balls)
  const birdBallIdRef = useRef(2000);
  // Sound
  const [audioEnabled, setAudioEnabled] = useState(true); // master
  const [musicVolume, setMusicVolume] = useState(0.5); // background music
  const [sfxVolume, setSfxVolume] = useState(0.5); // sfx
  const [showVolumeSettings, setShowVolumeSettings] = useState(false);
  const orderBgMusic = useRef(null);
  // Border
  const maxX = 680;
  const maxY = 440;
  // LOCAL STORAGE CODE
  const currentCodes = JSON.parse(
    localStorage.getItem("unlockedCodes") || "[]"
  );

  /* STATES */

  /* SOUNDS */

  const playSound = (sound) => {
    if (audioEnabled && sound) {
      sound.volume = sfxVolume;
      sound.currentTime = 0;
      sound.play().catch((e) => console.warn("Play error:", e));
    }
  };

  /* SOUNDS */

  /* FUNCTIONS */

  // Generate Balls
  const generateBalls = () => {
    const values = Array.from({ length: numBalls }, (_, i) => i + 1);
    const shuffled = values.sort(() => Math.random() - 0.5);
    return shuffled.map((val, i) => {
      const x = Math.random() * maxX; // starting position
      const y = Math.random() * maxY;
      return {
        id: i,
        value: val,
        x,
        y,
        dx: Math.random() * 2 + 1, // horizontal speed (1-3)
        dy: Math.random() * 2 + 1, // vertical speed (1-3)
        boosted: false,
        movementType: "linear",
        angle: 0, // starting angle
        orbitRadius: Math.random() * 40 + 20, // radius
        cx: x, // orbit center
        cy: y,
      };
    });
  };

  // Generate Special Balls
  const generateSpecialBalls = (currentSpecialBalls) => {
    const newBalls = [];
    const countMinus5 = currentSpecialBalls.filter(
      (b) => b.type === "-5"
    ).length;
    const countPlus5 = currentSpecialBalls.filter(
      (b) => b.type === "+10"
    ).length;

    if (countMinus5 < 6) {
      for (let i = 0; i < 6 - countMinus5; i++) {
        newBalls.push(createSpecialBall("-5"));
      }
    }

    if (countPlus5 < 1) {
      newBalls.push(createSpecialBall("+10"));
    }

    return [...currentSpecialBalls, ...newBalls];
  };

  // Single Special Ball
  const createSpecialBall = (type) => {
    const id = specialBallIdRef.current++;
    return {
      id,
      type,
      value: type,
      x: Math.random() * maxX,
      y: Math.random() * maxY,
      dx: Math.random() * 2 + 1,
      dy: Math.random() * 2 + 1,
      movementType: "linear",
    };
  };

  // LEVEL5 - Generate Bird Balls
  const generateBirdBalls = (currentBirdBalls) => {
    const colors = [
      "🐣",
      "🐥",
      "🐤",
      "🐧",
      "🐦",
      "🦤",
      "🦉",
      "🦚",
      "🦜",
      "🦢",
      "🦩",
      "🐦‍🔥",
      "🪿",
      "🐦‍⬛",
      "🦅",
      "🦃",
      "🐓",
      "🦆",
    ];
    const animalBalls = [];

    for (let i = 0; i < 40; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const x = Math.random() * maxX;
      const y = Math.random() * maxY;

      animalBalls.push({
        id: birdBallIdRef.current++,
        value: color,
        color: color,
        x,
        y,
        dx: Math.random() * 2 + 1,
        dy: Math.random() * 2 + 1,
        boosted: false,
        movementType: "linear",
      });
    }

    return animalBalls;
  };

  // LEVEL5 - Score
  const calculateScore = () => {
    const now = Date.now();
    const diff = (now - lastClickTime) / 1000;
    setLastClickTime(now);

    const maxScore = 100;
    const minScore = 50;

    if (diff <= 1) {
      return maxScore; // 100
    } else if (diff <= 4) {
      // 100-50 (1-4 s)
      const t = (diff - 1) / 3;
      return Math.round(maxScore - t * (maxScore - minScore));
    } else {
      return minScore;
    }
  };

  // Border Bouncing Boost
  const handleBounce = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId && !item.boosted) {
          item.dx *= 1.5; // 50% increase
          item.dy *= 1.5;
          item.boosted = true;

          setTimeout(() => {
            // normal speed
            setItems((items) =>
              items.map((i) =>
                i.id === itemId
                  ? { ...i, dx: i.dx / 1.5, dy: i.dy / 1.5, boosted: false }
                  : i
              )
            );
          }, 1000);
        }
        return item;
      })
    );
  };

  // Click
  const handleClick = (val, id = null) => {
    if (!gameStarted || gameOver || hasWon) return;

    // Special Balls
    if (val === "-5" || val === "+10") {
      setSpecialBalls((prev) => prev.filter((item) => item.id !== id));
      // Pop Sound
      playSound(popSound);

      if (val === "-5") {
        setTimeLeft((prev) => Math.max(0, prev - 5));
      } else if (val === "+10") {
        setTimeLeft((prev) => prev + 10);
      }
      return;
    }

    // Normal Balls
    if (selectedLevel === 4) {
      if (val === nextNumber) {
        setItems((prev) => prev.filter((item) => item.value !== val));
        // Pop Sound
        playSound(popSound);
        const next = nextNumber - 1; // descending
        setNextNumber(next);
        if (next === 0) {
          setHasWon(true);
          // Win Sound
          playSound(winSound);
          setVictoryMessage(
            "Complimenti, sei il primo umano ad aver mai completato il gioco (o forse no). Ecco a te un codice sconto: ORDER5 !"
          );
          setLevel5Unlocked(true); // LEVEL5
          saveLevel5Unlocked(true);
          // LOCAL STORAGE CODE
          if (!currentCodes.includes("ORDER5")) {
            localStorage.setItem(
              "unlockedCodes",
              JSON.stringify([...currentCodes, "ORDER5"])
            );
          }
        }
      }
    } else if (selectedLevel === 5) {
      // LEVEL5
      if (val === nextNumber) {
        setItems((prev) => prev.filter((item) => item.id !== id));
        // Pop Sound
        playSound(popSound);
        setTimeLeft((prev) => prev + 2);
        setScore((prev) => prev + calculateScore());

        const remaining = items.filter((item) => item.value !== val);
        if (remaining.length > 0) {
          const next =
            remaining[Math.floor(Math.random() * remaining.length)].value;
          setNextNumber(next);
        }
      }
      return;
    } else {
      if (val === nextNumber) {
        setItems((prev) => prev.filter((item) => item.value !== val));
        // Pop Sound
        playSound(popSound);
        const next = nextNumber + 1; // ascending
        setNextNumber(next);
        if (next > numBalls) {
          setHasWon(true);
          // Win Sound
          playSound(winSound);
          const victoryMessages = [
            "Semplice, no? Livello 2 sbloccato!",
            "Ben fatto, continua così! Livello 3 sbloccato!",
            "Cominci a sentirti male? Livello 4 sbloccato!",
          ];
          setVictoryMessage(victoryMessages[selectedLevel - 1]);
          // Unlock next level
          setUnlockedLevels((prev) => {
            const newUnlockedLevels =
              prev.includes(selectedLevel + 1) || selectedLevel === 4
                ? prev
                : [...prev, selectedLevel + 1];

            saveUnlockedLevels(newUnlockedLevels);

            return newUnlockedLevels;
          });
        }
      }
    }
  };

  /* FUNCTIONS */

  /* USEEFFECT */

  // New Balls
  useEffect(() => {
    setItems(generateBalls());
  }, [numBalls]);

  // MOVEMENT
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Normal Balls
      setItems((prevItems) =>
        prevItems.map((item) => {
          let { x, y, dx, dy, movementType, angle, orbitRadius } = item;
          let newX = x;
          let newY = y;

          switch (movementType) {
            case "circle":
              angle += 0.05;
              newX = item.cx + Math.cos(angle) * orbitRadius;
              newY = item.cy + Math.sin(angle) * orbitRadius;
              break;

            case "ellipse":
              angle += 0.03;
              newX = item.cx + Math.cos(angle) * orbitRadius * 1.2;
              newY = item.cy + Math.sin(angle) * orbitRadius * 0.6;
              break;

            case "zigzag":
              angle += 0.3;
              newX = x + dx;
              newY = y + Math.sin(angle) * 5;
              break;

            case "chaotic":
              if (Math.random() < 0.05) {
                dx = (Math.random() - 0.5) * 6;
                dy = (Math.random() - 0.5) * 6;
              }
              newX = x + dx;
              newY = y + dy;
              break;

            case "square":
              if (!item.squarePhase) item.squarePhase = 0;
              switch (item.squarePhase) {
                case 0:
                  newX += dx;
                  break; // right
                case 1:
                  newY += dy;
                  break; // down
                case 2:
                  newX -= dx;
                  break; // left
                case 3:
                  newY -= dy;
                  break; // up
              }
              item.squareTimer = (item.squareTimer || 0) + 1;
              if (item.squareTimer > 60) {
                item.squarePhase = (item.squarePhase + 1) % 4;
                item.squareTimer = 0;
              }
              break;

            case "triangle":
              if (!item.trianglePhase) item.trianglePhase = 0;
              switch (item.trianglePhase) {
                case 0:
                  newX += dx;
                  newY -= dy;
                  break; // up-right diagonal
                case 1:
                  newX -= dx;
                  break; // left
                case 2:
                  newY += dy;
                  break; // down
              }
              item.triangleTimer = (item.triangleTimer || 0) + 1;
              if (item.triangleTimer > 80) {
                item.trianglePhase = (item.trianglePhase + 1) % 3;
                item.triangleTimer = 0;
              }
              break;

            default: // linear
              newX = x + dx;
              newY = y + dy;
              break;
          }

          // Border Bouncing (linear, zigzag, chaotic, triangle)
          if (
            movementType === "linear" ||
            movementType === "zigzag" ||
            movementType === "chaotic" ||
            movementType === "triangle"
          ) {
            if (newX <= 0 || newX >= maxX) {
              handleBounce(item.id);
              dx = -dx;
            }
            if (newY <= 0 || newY >= maxY) {
              handleBounce(item.id);
              dy = -dy;
            }
          }

          return {
            ...item,
            x: newX,
            y: newY,
            dx,
            dy,
            angle,
          };
        })
      );

      // Special Balls
      setSpecialBalls((prevSpecial) =>
        prevSpecial.map((item) => {
          let { x, y, dx, dy } = item;

          let newX = x + dx;
          let newY = y + dy;

          // border
          if (newX <= 0 || newX >= maxX) dx = -dx;
          if (newY <= 0 || newY >= maxY) dy = -dy;

          return { ...item, x: newX, y: newY, dx, dy };
        })
      );
    }, 16); // ~60 FPS
    return () => clearInterval(intervalId);
  }, []);

  // Random Movement
  useEffect(() => {
    if (gameStarted && [2, 3, 4].includes(selectedLevel)) {
      const movementInterval = setInterval(() => {
        setItems((prevItems) =>
          prevItems.map((item) => {
            const types =
              selectedLevel === 2
                ? ["linear", "zigzag"]
                : selectedLevel === 3
                ? ["linear", "circle", "zigzag", "ellipse"]
                : [
                    "linear",
                    "circle",
                    "zigzag",
                    "ellipse",
                    "chaotic",
                    "square",
                    "triangle",
                  ];
            const newType = types[Math.floor(Math.random() * types.length)];
            return { ...item, movementType: newType };
          })
        );
      }, 5000);
      return () => clearInterval(movementInterval);
    }
  }, [gameStarted, selectedLevel]);

  // Spawn Special Balls
  useEffect(() => {
    if (gameStarted && selectedLevel === 4 && !gameOver && !hasWon) {
      const interval = setInterval(() => {
        setSpecialBalls((prev) => generateSpecialBalls(prev));
      }, 10000); // spawn every

      return () => clearInterval(interval);
    }
  }, [gameStarted, selectedLevel, gameOver, hasWon]);

  // Spawn Bird Balls
  useEffect(() => {
    if (gameStarted && selectedLevel === 5 && !gameOver && !hasWon) {
      const interval = setInterval(() => {
        setItems((prev) => {
          const needed = 40 - prev.length;
          if (needed <= 0) return prev;

          const animalBalls = generateBirdBalls(needed);
          return [...prev, ...animalBalls];
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [gameStarted, selectedLevel, gameOver, hasWon]);

  // Recollect and Burst
  useEffect(() => {
    if (gameStarted && selectedLevel === 4) {
      const interval = setInterval(() => {
        setItems((prevItems) =>
          prevItems.map((item) => {
            const newDx =
              (Math.random() * 3 + 2.5) * (Math.random() < 0.5 ? -1 : 1);
            const newDy =
              (Math.random() * 3 + 2.5) * (Math.random() < 0.5 ? -1 : 1);
            return {
              ...item,
              x: maxX / 2,
              y: maxY / 2,
              dx: newDx,
              dy: newDy,
              boosted: true,
              movementType: "linear",
            };
          })
        );

        // normal speed
        setTimeout(() => {
          setItems((prevItems) =>
            prevItems.map((item) => ({
              ...item,
              dx: item.dx / 1.5,
              dy: item.dy / 1.5,
              boosted: false,
            }))
          );
        }, 1000);
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [gameStarted, selectedLevel]);

  // Score ANIMATION
  useEffect(() => {
    if (displayedScore === score) return;

    const increment = () => {
      setDisplayedScore((prev) => {
        if (prev < score) return Math.min(prev + 5, score);
        return prev;
      });
      setScoreTextColor("text-green-500");
    };

    const interval = setInterval(increment, 30);

    setTimeout(() => {
      setScoreTextColor("text-white");
    }, 500);

    return () => clearInterval(interval);
  }, [score, displayedScore]);

  // Timer
  useEffect(() => {
    if (timeLeft > 0 && !gameOver && !hasWon && gameStarted) {
      const timerId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else if (timeLeft === 0) {
      setGameOver(true);
      // Lose Sound
      playSound(loseSound);
    }
  }, [timeLeft, gameOver, hasWon, gameStarted]);

  // Background Music Volume
  useEffect(() => {
    if (orderBgMusic.current) {
      orderBgMusic.current.volume = musicVolume;
    }
  }, [musicVolume]);

  // Background Music
  useEffect(() => {
    orderBgMusic.current = new Audio("/sounds/order/order-theme.mp3");
    orderBgMusic.current.loop = true;
    orderBgMusic.current.volume = musicVolume;
    return () => {
      orderBgMusic.current.pause();
    };
  }, []);

  // Play/Pause Background Music
  useEffect(() => {
    if (gameStarted && !gameOver && !hasWon && audioEnabled) {
      orderBgMusic.current?.play().catch((e) => {
        console.warn("Autoplay error:", e);
      });
    } else {
      orderBgMusic.current?.pause();
    }
  }, [gameStarted, gameOver, hasWon, audioEnabled]);

  /* USEEFFECT */

  /* RESET */

  // Change Level
  const handleLevelChange = (level) => {
    setSelectedLevel(level);
    // LEVEL5
    if (level === 5) {
      const generated = generateBirdBalls();
      setTimeLeft(8);
      setInitialTime(8);
      setNextNumber(
        generated[Math.floor(Math.random() * generated.length)].value
      );
      setGameOver(false);
      setHasWon(false);
      setItems(generated);
      setGameStarted(false);
      setScore(0);
      setDisplayedScore(0);
      setSpecialBalls([]);
    } else {
      // 1-4
      setNumBalls(levels[level].numBalls);
      setTimeLeft(levels[level].time);
      setInitialTime(levels[level].time);
      setNextNumber(level === 4 ? levels[level].numBalls : 1);
      setItems(generateBalls());
      setSpecialBalls([]);
      setGameStarted(false);
      setHasWon(false);
      setGameOver(false);
    }
  };

  // Reset
  const restartGame = () => {
    // LEVEL5
    if (selectedLevel === 5) {
      const generated = generateBirdBalls();
      setTimeLeft(8);
      setNextNumber(
        generated[Math.floor(Math.random() * generated.length)].value
      );
      setItems(generated);
      setGameOver(false);
      setHasWon(false);
      setGameStarted(false);
      setScore(0);
      setDisplayedScore(0);
      setSpecialBalls([]);
    } else {
      // 1-4
      setItems(generateBalls());
      setTimeLeft(initialTime);
      setGameOver(false);
      setHasWon(false);
      setNextNumber(selectedLevel === 4 ? levels[4].numBalls : 1);
      setGameStarted(false);
      setSpecialBalls([]);
    }
  };

  /* RESET */

  /* LOCAL STORAGE */

  const saveLevel5Unlocked = (isUnlocked) => {
    localStorage.setItem("orderGameLevel5Unlocked", JSON.stringify(isUnlocked));
  };

  const getLevel5Unlocked = () => {
    const stored = localStorage.getItem("orderGameLevel5Unlocked");
    return stored ? JSON.parse(stored) : false;
  };

  // SCORE - Order Scores
  const getBestScores = () => {
    const stored = localStorage.getItem("orderGameLevel5Scores");
    return stored ? JSON.parse(stored) : [];
  };

  // SCORE - Update Scoreboard
  const saveScoreIfHigh = (newScore) => {
    const scores = getBestScores();
    scores.push(newScore);
    const sorted = scores.sort((a, b) => b - a).slice(0, 3); // top 3
    localStorage.setItem("orderGameLevel5Scores", JSON.stringify(sorted));
  };

  // SCORE - Show Scoreboard
  useEffect(() => {
    if (gameOver && selectedLevel === 5 && score > 0) {
      saveScoreIfHigh(score);
      setShowScoreBoard(true);
    }
  }, [gameOver, selectedLevel, score]);

  // LEVEL - Update unlocked levels Array
  const saveUnlockedLevels = (levels) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(levels));
  };

  // LEVEL - Get unlocked levels Array (app start)
  const getUnlockedLevels = () => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [1];
  };

  // LEVEL - Get unlocked levels (app start)
  useEffect(() => {
    const storedLevels = getUnlockedLevels();
    const storedLevel5 = getLevel5Unlocked();
    setUnlockedLevels(storedLevels);
    setLevel5Unlocked(storedLevel5);
  }, []);

  /* LOCAL STORAGE */

  return {
    levels,
    selectedLevel,
    numBalls,
    timeLeft,
    initialTime,
    nextNumber,
    unlockedLevels,
    level5Unlocked,
    gameOver,
    hasWon,
    victoryMessage,
    gameStarted,
    cheatMode,
    lastClickTime,
    score,
    displayedScore,
    scoreTextColor,
    showScoreBoard,
    items,
    specialBalls,
    specialBallIdRef,
    birdBallIdRef,
    audioEnabled,
    musicVolume,
    sfxVolume,
    showVolumeSettings,
    orderBgMusic,
    maxX,
    maxY,
    currentCodes,
    setSelectedLevel,
    setNumBalls,
    setTimeLeft,
    setInitialTime,
    setNextNumber,
    setUnlockedLevels,
    setLevel5Unlocked,
    setGameOver,
    setHasWon,
    setVictoryMessage,
    setGameStarted,
    setCheatMode,
    setLastClickTime,
    setScore,
    setDisplayedScore,
    setScoreTextColor,
    setShowScoreBoard,
    setItems,
    setSpecialBalls,
    setAudioEnabled,
    setMusicVolume,
    setSfxVolume,
    setShowVolumeSettings,
    restartGame,
    handleLevelChange,
    handleClick,
    getBestScores,
  };
}
