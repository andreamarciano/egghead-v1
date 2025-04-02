import { useState, useEffect } from "react";

const DIFFICULTY_SETTINGS = {
  "🐔": { gridSize: 10, numMines: 15, timer: 30, increment: 3 },
  "🐔🐔": { gridSize: 12, numMines: 25, timer: 25, increment: 2 },
  "🐔🐔🐔": { gridSize: 16, numMines: 40, timer: 20, increment: 1 },
};

function Flower() {
  // default difficulty states
  const [difficulty, setDifficulty] = useState("🥚");
  const [gridSize, setGridSize] = useState(10);
  const [numMines, setNumMines] = useState(15);
  const [timer, setTimer] = useState(30);
  const [increment, setIncrement] = useState(3);

  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [flagsLeft, setFlagsLeft] = useState(numMines);
  const [hasWon, setHasWon] = useState(false);
  const [highlighted, setHighlighted] = useState(null);
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(timer);
  const [timeRanOut, setTimeRanOut] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const randomMessages = [
    "Attento a non calpestarle!",
    "Non di là!",
    "Piano! Non avere fretta!",
    "Non fare uscire le galline!",
    "Bene! Hai pestato la cacca...",
  ];

  const flagMessages = [
    "Sicuro sia lì?",
    "Vuoi prenderle senza guanti...?",
    "Se lo dici tu...",
  ];

  // Change difficulty
  const handleDifficultyChange = (level) => {
    setDifficulty(level);
    setGridSize(DIFFICULTY_SETTINGS[level].gridSize);
    setNumMines(DIFFICULTY_SETTINGS[level].numMines);
    setTimer(DIFFICULTY_SETTINGS[level].timer);
    setIncrement(DIFFICULTY_SETTINGS[level].increment);
  };

  // Grid
  const generateGrid = () => {
    let newGrid = Array(gridSize)
      .fill(null)
      .map(() =>
        Array(gridSize).fill({
          mine: false,
          number: 0,
          revealed: false,
          flagged: false,
        })
      );

    let minesPlaced = 0;
    while (minesPlaced < numMines) {
      let x = Math.floor(Math.random() * gridSize);
      let y = Math.floor(Math.random() * gridSize);

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

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        if (newGrid[x][y].mine) continue;

        let minesAround = 0;
        directions.forEach(([dx, dy]) => {
          let nx = x + dx;
          let ny = y + dy;
          if (
            nx >= 0 &&
            ny >= 0 &&
            nx < gridSize &&
            ny < gridSize &&
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

  // Generate Grid
  useEffect(() => {
    generateGrid();
  }, [gridSize, numMines, timer]);

  // Timer
  useEffect(() => {
    if (!hasStarted || gameOver || hasWon) return;

    if (timeLeft <= 0) {
      setGameOver(true);
      setTimeRanOut(true); // lose for timer
      return;
    }

    const timer = setInterval(() => {
      // timer decrement
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer); // clear timer
  }, [timeLeft, hasStarted, gameOver, hasWon]);

  // Time formatting (MM:SS)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const revealEmptyCells = (newGrid, x, y) => {
    if (
      x < 0 ||
      y < 0 ||
      x >= gridSize ||
      y >= gridSize ||
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

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
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
      let victoryMessage = "";
      // message based on difficulty
      if (difficulty === "🐔🐔🐔") {
        victoryMessage = "Bel lavoro! Ecco il tuo codice: FLOW5";
      } else {
        victoryMessage = "Bene, aumentiamo la difficoltà!";
      }
      setMessage(victoryMessage);
    }
  };

  const [clickedX, setClickedX] = useState(null);
  const [clickedY, setClickedY] = useState(null);

  // Handle left click
  const handleClick = (x, y) => {
    if (gameOver || hasWon || grid[x][y].revealed || grid[x][y].flagged) return;

    if (!hasStarted) {
      setHasStarted(true); // game starts with click
    }

    let newGrid = [...grid];

    if (newGrid[x][y].mine) {
      setClickedX(x);
      setClickedY(y);
      setGameOver(true);
      return;
    }

    revealEmptyCells(newGrid, x, y);
    if (!newGrid[x][y].mine) {
      setTimeLeft((prevTime) => prevTime + increment); // add time
    }
    setGrid([...newGrid]);

    // Random message
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

  return (
    <div>
      {/* Difficulty */}
      <div className="absolute left-2 top-80 flex flex-col gap-2 w-15">
        {Object.keys(DIFFICULTY_SETTINGS).map((level) => (
          <button
            key={level}
            onClick={() => handleDifficultyChange(level)}
            className={`py-2 px-4 font-bold border rounded transition ${
              difficulty === level
                ? "bg-yellow-300 text-white"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            {level}
          </button>
        ))}
      </div>
      {/* Grid */}
      <div className="absolute left-2 top-150 flex justify-center w-15">
        <button
          onClick={generateGrid}
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 transition duration-300"
        >
          🔄
        </button>
      </div>
      <div className="absolute top-2 left-2 text-2xl font-bold">
        {/* Timer */}
        <p>{formatTime(timeLeft)}</p>
      </div>
      <p className="text-center text-2xl font-bold mb-4">
        {difficulty} - 🧺: {flagsLeft}
      </p>
      <p className="text-center text-xl font-bold mb-4 text-orange-800">
        {message}
      </p>{" "}
      {/* Current message */}
      {gameOver && (
        <p className="text-center text-red-600 font-bold mb-2 mt-2">
          {timeRanOut
            ? "Accidenti! Le uova sono scappate!"
            : "Oh no! Hai schiacciato un uovo!"}
        </p>
      )}
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 40px)` }}
      >
        {grid.map((row, x) =>
          row.map((cell, y) => (
            <div
              key={`${x}-${y}`}
              className={`w-10 h-10 flex items-center justify-center border border-gray-500 text-black font-bold cursor-pointer 
    ${cell.revealed || gameOver ? "bg-gray-300" : "bg-green-200"} 
    ${
      gameOver &&
      cell.mine &&
      !cell.revealed &&
      x === clickedX &&
      y === clickedY
        ? "bg-red-500 border-red-800 border-4"
        : ""
    } 
    ${hasWon && cell.mine ? "bg-blue-500" : ""} 
    ${
      highlighted && highlighted[0] === x && highlighted[1] === y
        ? "border-4 border-yellow-500"
        : ""
    }
  `}
              onClick={() => handleClick(x, y)}
              onContextMenu={(e) => handleRightClick(e, x, y)}
              onMouseEnter={() => setHighlighted([x, y])}
              onMouseLeave={() => setHighlighted(null)}
            >
              {cell.flagged
                ? "🐣"
                : cell.revealed || gameOver
                ? cell.mine
                  ? "🥚"
                  : cell.number > 0
                  ? cell.number
                  : ""
                : ""}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Flower;
