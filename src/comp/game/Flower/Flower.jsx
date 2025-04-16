import { useState, useEffect, useRef } from "react";
import "./Flower.css";

const LEVEL_SETTINGS = {
  "🐣": {
    gridWidth: 9,
    gridHeight: 9,
    numMines: 10,
    timer: 30,
    increment: 3,
  },
  "🐔": {
    gridWidth: 16,
    gridHeight: 16,
    numMines: 40,
    timer: 60,
    increment: 3,
  },
  "🐓": {
    gridWidth: 30,
    gridHeight: 16,
    numMines: 99,
    timer: 60,
    increment: 3,
  },
};

const LOCAL_STORAGE_KEY = "unlockedLevelsFlower";

const gameOverSound = new Audio("/sounds/flower/flower-lose.wav");
const playerWinSound = new Audio("/sounds/flower/flower-win.wav");

function Flower({ onClose }) {
  /* STATES */

  // Level
  const [difficulty, setDifficulty] = useState("🐣");
  const [gridWidth, setGridWidth] = useState(9);
  const [gridHeight, setGridHeight] = useState(9);
  const [numMines, setNumMines] = useState(10);
  const [timer, setTimer] = useState(30);
  const [increment, setIncrement] = useState(3);
  const [unlockedLevels, setUnlockedLevels] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [0]; // index 0 - 🐣
  });
  // Grid
  const [grid, setGrid] = useState([]);
  const [flagsLeft, setFlagsLeft] = useState(numMines);
  const [highlighted, setHighlighted] = useState(null);
  // Game
  const [gameOver, setGameOver] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(timer);
  const [timeRanOut, setTimeRanOut] = useState(false);
  const [clickedX, setClickedX] = useState(null);
  const [clickedY, setClickedY] = useState(null);
  // Sound
  const [audioEnabled, setAudioEnabled] = useState(true); // master
  const [musicVolume, setMusicVolume] = useState(0.5); // background music
  const [sfxVolume, setSfxVolume] = useState(0.5); // sfx
  const [showVolumeSettings, setShowVolumeSettings] = useState(false);
  const flowerBgMusic = useRef(null);
  // Message
  const randomMessages = [
    "Attento a non calpestarle!",
    "La gallina ti guarda male.",
    "Questo prato nasconde segreti.",
    "Chi trova un uovo trova un tesoro.",
    "Sei sicuro di sapere cosa stai facendo?",
    "Piano! Non avere fretta!",
    "Non fare uscire le galline!",
    "Bene! Hai pestato la cacca...",
  ];
  const flagMessages = [
    "Hai marcato il territorio. Bravo cane.",
    "La gallina annuisce. Forse approva.",
    "Metti pure la bandiera… se ti fa sentire meglio.",
    "Sicuro sia lì? Hai un’aria insicura.",
    "La gallina ti osserva in silenzio.",
    "Vuoi prenderle senza guanti...?",
    "Ottima scelta… o pessima? Lo scopriremo.",
    "Se lo dici tu...",
  ];
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

  // Change Level
  const handleLevelChange = (level) => {
    const settings = LEVEL_SETTINGS[level];
    setDifficulty(level);
    setGridWidth(settings.gridWidth);
    setGridHeight(settings.gridHeight);
    setNumMines(settings.numMines);
    setTimer(settings.timer);
    setIncrement(settings.increment);
  };

  // Grid
  const generateGrid = () => {
    let newGrid = Array(gridHeight)
      .fill(null)
      .map(() =>
        Array(gridWidth).fill({
          mine: false,
          number: 0,
          revealed: false,
          flagged: false,
        })
      );

    let minesPlaced = 0;
    while (minesPlaced < numMines) {
      let x = Math.floor(Math.random() * gridHeight);
      let y = Math.floor(Math.random() * gridWidth);

      if (!newGrid[x][y].mine) {
        newGrid[x][y] = { ...newGrid[x][y], mine: true };
        minesPlaced++;
      }
    }

    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    for (let x = 0; x < gridHeight; x++) {
      for (let y = 0; y < gridWidth; y++) {
        if (newGrid[x][y].mine) continue;

        let minesAround = 0;
        directions.forEach(([dx, dy]) => {
          let nx = x + dx;
          let ny = y + dy;
          if (
            nx >= 0 &&
            ny >= 0 &&
            nx < gridHeight &&
            ny < gridWidth &&
            newGrid[nx][ny].mine
          ) {
            minesAround++;
          }
        });

        newGrid[x][y] = { ...newGrid[x][y], number: minesAround };
      }
    }

    setHasStarted(false);
    setTimeLeft(timer); // reset timer
    setFlagsLeft(numMines);
    setGameOver(false);
    setHasWon(false); // reset victory
    setTimeRanOut(false);
    setMessage("Raccogliamo le uova!"); // initial message
    setGrid(newGrid);
  };

  // Generate Safe Grid
  const generateGridWithSafeStart = (safeX, safeY) => {
    let newGrid;
    let valid = false;

    while (!valid) {
      newGrid = Array(gridHeight)
        .fill(null)
        .map(() =>
          Array(gridWidth)
            .fill()
            .map(() => ({
              mine: false,
              number: 0,
              revealed: false,
              flagged: false,
            }))
        );

      let minesPlaced = 0;
      while (minesPlaced < numMines) {
        let x = Math.floor(Math.random() * gridHeight);
        let y = Math.floor(Math.random() * gridWidth);

        const isSafeZone = Math.abs(x - safeX) <= 1 && Math.abs(y - safeY) <= 1;
        if (!newGrid[x][y].mine && !isSafeZone) {
          newGrid[x][y].mine = true;
          minesPlaced++;
        }
      }

      const directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
      ];

      for (let x = 0; x < gridHeight; x++) {
        for (let y = 0; y < gridWidth; y++) {
          if (newGrid[x][y].mine) continue;
          let count = 0;
          directions.forEach(([dx, dy]) => {
            const nx = x + dx;
            const ny = y + dy;
            if (
              nx >= 0 &&
              ny >= 0 &&
              nx < gridHeight &&
              ny < gridWidth &&
              newGrid[nx][ny].mine
            ) {
              count++;
            }
          });
          newGrid[x][y].number = count;
        }
      }

      if (newGrid[safeX][safeY].number === 0) {
        valid = true;
      }
    }

    setGrid(newGrid);
    return newGrid;
  };

  // Generate Empty Grid
  const generateEmptyGrid = () => {
    const emptyGrid = Array(gridHeight)
      .fill(null)
      .map(() =>
        Array(gridWidth)
          .fill()
          .map(() => ({
            mine: false,
            number: 0,
            revealed: false,
            flagged: false,
          }))
      );
    setGrid(emptyGrid);
  };

  // Time formatting (MM:SS)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  // Click - Reveal Cell
  const revealEmptyCells = (newGrid, x, y) => {
    if (
      x < 0 ||
      y < 0 ||
      x >= gridHeight ||
      y >= gridWidth ||
      newGrid[x][y].revealed
    ) {
      return;
    }

    newGrid[x][y].revealed = true;

    if (newGrid[x][y].number === 0) {
      const directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
      ];

      directions.forEach(([dx, dy]) =>
        revealEmptyCells(newGrid, x + dx, y + dy)
      );
    }
  };

  // Winner
  const checkWinCondition = (newGrid) => {
    let allMinesFlagged = true;
    let allSafeCellsRevealed = true;

    for (let x = 0; x < gridHeight; x++) {
      for (let y = 0; y < gridWidth; y++) {
        if (newGrid[x][y].mine && !newGrid[x][y].flagged) {
          allMinesFlagged = false;
        }
        if (!newGrid[x][y].mine && !newGrid[x][y].revealed) {
          allSafeCellsRevealed = false;
        }
      }
    }

    if (allMinesFlagged && allSafeCellsRevealed) {
      setHasWon(true);
      // Player Win Sound
      playSound(playerWinSound);

      const levels = ["🐣", "🐔", "🐓"];
      const currentIndex = levels.indexOf(difficulty);
      const nextIndex = currentIndex + 1;

      let victoryMessage = "";

      // Unlock next level
      if (nextIndex < levels.length && !unlockedLevels.includes(nextIndex)) {
        const newUnlocked = [...unlockedLevels, nextIndex];
        setUnlockedLevels(newUnlocked);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newUnlocked));
      }

      // message based on level
      if (difficulty === "🐓") {
        victoryMessage = "Bel lavoro! Ecco il tuo codice sconto: FLOW5";
        // LOCAL STORAGE CODE
        if (!currentCodes.includes("FLOW5")) {
          localStorage.setItem(
            "unlockedCodes",
            JSON.stringify([...currentCodes, "FLOW5"])
          );
        }
      } else {
        victoryMessage = "Te la cavi bene, aumentiamo il numero di galline!";
      }
      setMessage(victoryMessage);
    }
  };

  // Handle left click
  const handleClick = (x, y) => {
    if (
      gameOver ||
      hasWon ||
      (grid[x] && grid[x][y]?.revealed) ||
      (grid[x] && grid[x][y]?.flagged)
    )
      return;

    let newGrid = [...grid];

    if (!hasStarted) {
      newGrid = generateGridWithSafeStart(x, y);
      setHasStarted(true);
    }

    if (newGrid[x][y].mine) {
      setClickedX(x);
      setClickedY(y);
      setGameOver(true);
      // Game Over Sound
      playSound(gameOverSound);
      return;
    }

    revealEmptyCells(newGrid, x, y);

    if (!newGrid[x][y].mine) {
      setTimeLeft((prevTime) => prevTime + increment);
    }

    setGrid([...newGrid]);

    const randomMessage =
      randomMessages[Math.floor(Math.random() * randomMessages.length)];
    setMessage(randomMessage);

    checkWinCondition(newGrid);
  };

  // Handle right click
  const handleRightClick = (e, x, y) => {
    e.preventDefault(); // handle right mouse click menu

    if (gameOver || hasWon) return;

    let newGrid = [...grid];

    if (newGrid[x][y].flagged) {
      newGrid[x][y].flagged = false;
      setFlagsLeft(flagsLeft + 1); // add flag
    } else if (!newGrid[x][y].revealed && flagsLeft > 0) {
      newGrid[x][y].flagged = true;
      setFlagsLeft(flagsLeft - 1); // remove flag

      // onFlag random message
      const randomFlagMessage =
        flagMessages[Math.floor(Math.random() * flagMessages.length)];
      setMessage(randomFlagMessage);
    }

    setGrid([...newGrid]);
    checkWinCondition(newGrid);
  };

  /* FUNCTIONS */

  /* USEEFFECT */

  // Generate Grid
  useEffect(() => {
    generateEmptyGrid();
    setHasStarted(false);
    setTimeLeft(timer);
    setFlagsLeft(numMines);
    setGameOver(false);
    setHasWon(false);
    setTimeRanOut(false);
    setMessage("Raccogliamo le uova!");
  }, [gridWidth, gridHeight, numMines, timer]);

  // Timer
  useEffect(() => {
    if (!hasStarted || gameOver || hasWon) return;

    // Lose for time
    if (timeLeft <= 0) {
      setGameOver(true);
      setTimeRanOut(true);
      // Game Over Sound
      playSound(gameOverSound);
      return;
    }

    const timer = setInterval(() => {
      // timer decrement
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer); // clear timer
  }, [timeLeft, hasStarted, gameOver, hasWon]);

  // Run-Away Eggs ANIMATION
  useEffect(() => {
    if (!timeRanOut) return;

    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      const hasEgg = cell.textContent === "🥚";
      if (hasEgg) {
        const angle = Math.random() * 2 * Math.PI;
        const distance = 200 + Math.random() * 100;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        cell.style.setProperty("--run-x", `${x}px`);
        cell.style.setProperty("--run-y", `${y}px`);
        cell.classList.add("run-away");
      }
    });
  }, [timeRanOut]);

  // Hopping Basket ANIMATION
  useEffect(() => {
    if (!hasWon) return;

    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      const isBasket = cell.textContent === "🧺";
      if (isBasket) {
        cell.classList.add("basket-hop");
        setTimeout(() => {
          cell.classList.remove("basket-hop");
        }, 800);
      }
    });
  }, [hasWon]);

  // Background Music Volume
  useEffect(() => {
    if (flowerBgMusic.current) {
      flowerBgMusic.current.volume = musicVolume;
    }
  }, [musicVolume]);

  // Background Music
  useEffect(() => {
    flowerBgMusic.current = new Audio("/sounds/flower/flower-theme.mp3");
    flowerBgMusic.current.loop = true;
    flowerBgMusic.current.volume = musicVolume;
    return () => {
      flowerBgMusic.current.pause();
    };
  }, []);

  // Play/Pause Background Music
  useEffect(() => {
    if (hasStarted && !gameOver && !hasWon && audioEnabled) {
      flowerBgMusic.current?.play().catch((e) => {
        console.warn("Autoplay error:", e);
      });
    } else {
      flowerBgMusic.current?.pause();
    }
  }, [hasStarted, gameOver, hasWon, audioEnabled]);

  /* USEEFFECT */

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-orange-900 bg-opacity-50 z-50">
      <div className="p-6 rounded shadow-lg bg-yellow-600 w-230 h-170 items-center justify-center flex flex-col relative">
        {/* Game Header */}
        <div className="w-full flex justify-between items-center absolute top-0 p-2">
          {/* Timer */}
          <h2 className="text-white text-2xl">🕒 {formatTime(timeLeft)}</h2>
          {/* Title */}
          <h2 className="text-center text-3xl font-bold text-white">
            Prat💩... Fiorit🥚?
          </h2>
          {/* Button */}
          <div className="flex gap-2">
            {/* Audio Settings */}
            <button
              onClick={() => setShowVolumeSettings((prev) => !prev)}
              className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
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
            {/* Restart */}
            <button
              onClick={generateGrid}
              className="px-2 py-1 rounded bg-orange-500 hover:bg-yellow-300 transition duration-300"
            >
              🔄
            </button>
            {/* Close */}
            <button
              onClick={onClose}
              className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded"
            >
              ✖
            </button>
          </div>
        </div>
        {/* Messages */}
        <div className="flex justify-between items-center absolute top-20">
          <div className="flex flex-col gap-2">
            <p className="text-center text-2xl font-bold">
              {difficulty} -{" "}
              <span className="relative">
                <span className="absolute inset-0 bg-black opacity-50 rounded-full z-0"></span>
                <span className="relative z-10 p-1">🧺: {flagsLeft}</span>
              </span>
            </p>
            <p className="text-center text-xl font-bold text-orange-800 mt-2">
              {gameOver ? (
                <span className="text-red-700">
                  {timeRanOut
                    ? "Accidenti! Le uova sono scappate!"
                    : "Oh no! Hai schiacciato un uovo!"}
                </span>
              ) : hasWon ? (
                <span className="text-lime-700">{message}</span>
              ) : (
                <span className="text-orange-800">{message}</span>
              )}
            </p>
          </div>
        </div>

        {/* Level */}
        <div className="flex flex-col ml-1 p-2 gap-2 items-center justify-center absolute left-0 bg-amber-500 rounded-2xl">
          {Object.keys(LEVEL_SETTINGS).map((level, index) => (
            <button
              key={level}
              onClick={() => handleLevelChange(level)}
              disabled={!unlockedLevels.includes(index)}
              className={`py-2 px-2 font-bold border rounded transition ${
                difficulty === level
                  ? "bg-yellow-300 text-white"
                  : "bg-gray-300 hover:bg-gray-400"
              } ${
                unlockedLevels.includes(index)
                  ? "hover:bg-gray-400"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          className="grid mt-6"
          style={{
            gridTemplateColumns: `repeat(${gridWidth}, 24px)`,
            gridAutoRows: "24px",
            width: `${gridWidth * 24}px`,
          }}
        >
          {grid.map((row, x) =>
            row.map((cell, y) => (
              <div
                key={`${x}-${y}`}
                className={`cell text-xs sm:text-base flex items-center justify-center border border-gray-600 font-bold cursor-pointer 
    ${cell.revealed || gameOver ? "bg-gray-300" : "bg-gray-400"} 
    ${
      gameOver &&
      cell.mine &&
      !cell.revealed &&
      x === clickedX &&
      y === clickedY
        ? "bg-red-500 border-red-800 border-3"
        : ""
    } 
    ${hasWon && cell.mine ? "bg-blue-500" : ""} 
    ${
      highlighted && highlighted[0] === x && highlighted[1] === y
        ? "border-3 border-yellow-500"
        : ""
    }
  `}
                onClick={() => handleClick(x, y)}
                onContextMenu={(e) => handleRightClick(e, x, y)}
                onMouseEnter={() => setHighlighted([x, y])}
                onMouseLeave={() => setHighlighted(null)}
              >
                {cell.flagged ? (
                  "🧺"
                ) : cell.revealed || gameOver ? (
                  cell.mine ? (
                    "🥚"
                  ) : cell.number > 0 ? (
                    <span
                      className={
                        cell.number === 1
                          ? "text-blue-600"
                          : cell.number === 2
                          ? "text-green-600"
                          : cell.number === 3
                          ? "text-red-600"
                          : cell.number === 4
                          ? "text-blue-900"
                          : cell.number === 5
                          ? "text-yellow-900"
                          : cell.number === 6
                          ? "text-cyan-600"
                          : ""
                      }
                    >
                      {cell.number}
                    </span>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Flower;
