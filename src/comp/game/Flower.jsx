import { useState, useEffect } from "react";

const DIFFICULTY_SETTINGS = {
  "🐔": { gridSize: 10, numMines: 15, timer: 30, increment: 3 },
  "🐔🐔": { gridSize: 12, numMines: 25, timer: 25, increment: 2 },
  "🐔🐔🐔": { gridSize: 16, numMines: 40, timer: 20, increment: 1 },
};

function Flower() {
  const [difficulty, setDifficulty] = useState("🥚"); // Difficoltà iniziale
  const [gridSize, setGridSize] = useState(10);
  const [numMines, setNumMines] = useState(15);
  const [timer, setTimer] = useState(30);
  const [increment, setIncrement] = useState(3);

  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [flagsLeft, setFlagsLeft] = useState(numMines);
  const [hasWon, setHasWon] = useState(false); // Stato di vittoria
  const [highlighted, setHighlighted] = useState(null); // Casella evidenziata al passaggio del mouse
  const [message, setMessage] = useState(""); // Messaggio iniziale
  const [timeLeft, setTimeLeft] = useState(timer); // Stato per il timer
  const [timeRanOut, setTimeRanOut] = useState(false); // Tempo scaduto
  const [hasStarted, setHasStarted] = useState(false); // Inizio del gioco

  const handleDifficultyChange = (level) => {
    setDifficulty(level);
    setGridSize(DIFFICULTY_SETTINGS[level].gridSize);
    setNumMines(DIFFICULTY_SETTINGS[level].numMines);
    setTimer(DIFFICULTY_SETTINGS[level].timer);
    setIncrement(DIFFICULTY_SETTINGS[level].increment);
  };

  // Messaggi casuali da visualizzare quando si clicca una casella
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
    setTimeLeft(timer); // Reset del timer
    setFlagsLeft(numMines);
    setGameOver(false);
    setHasWon(false); // Reset vittoria
    setTimeRanOut(false);
    setMessage("Raccogliamo le uova!"); // Mostra il messaggio iniziale
    setGrid(newGrid);
  };

  useEffect(() => {
    generateGrid();
  }, [gridSize, numMines, timer]);

  // Timer: Decrementa ogni secondo
  useEffect(() => {
    if (!hasStarted || gameOver || hasWon) return; // Se il gioco è finito, non fare nulla

    if (timeLeft <= 0) {
      setGameOver(true);
      setTimeRanOut(true); // Segna che il game over è stato causato dal timer
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer); // Pulisce l'intervallo quando il componente viene smontato o il timer finisce
  }, [timeLeft, hasStarted, gameOver, hasWon]);

  // Formatta il timer in MM:SS
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
      // Aggiungi logica per i messaggi di vittoria in base alla difficoltà
      if (difficulty === "🐔🐔🐔") {
        victoryMessage = "Bel lavoro! Ecco il tuo codice: FLOW5";
      } else {
        victoryMessage = "Bene, aumentiamo la difficoltà!";
      }
      setMessage(victoryMessage); // Mostra il messaggio di vittoria
    }
  };

  const [clickedX, setClickedX] = useState(null);
  const [clickedY, setClickedY] = useState(null);

  const handleClick = (x, y) => {
    if (gameOver || hasWon || grid[x][y].revealed || grid[x][y].flagged) return;

    if (!hasStarted) {
      setHasStarted(true); // Il gioco parte al primo click
    }

    let newGrid = [...grid];

    if (newGrid[x][y].mine) {
      setClickedX(x); // Memorizza la cella cliccata
      setClickedY(y);
      setGameOver(true);
      return;
    }

    revealEmptyCells(newGrid, x, y);
    if (!newGrid[x][y].mine) {
      setTimeLeft((prevTime) => prevTime + increment); // Aggiunge secondi
    }
    setGrid([...newGrid]);

    // Imposta il messaggio casuale
    const randomMessage =
      randomMessages[Math.floor(Math.random() * randomMessages.length)];
    setMessage(randomMessage);

    checkWinCondition(newGrid);
  };

  const handleRightClick = (e, x, y) => {
    e.preventDefault(); // Evita il menu del tasto destro

    if (gameOver || hasWon) return; // Non si può mettere o rimuovere una bandiera se il gioco è finito

    let newGrid = [...grid];

    // Se la cella è rivelata, possiamo comunque rimuovere la bandiera
    if (newGrid[x][y].flagged) {
      newGrid[x][y].flagged = false;
      setFlagsLeft(flagsLeft + 1); // Aggiunge una bandiera
    } else if (!newGrid[x][y].revealed && flagsLeft > 0) {
      newGrid[x][y].flagged = true;
      setFlagsLeft(flagsLeft - 1); // Rimuove una bandiera

      // Mostra un messaggio casuale quando si mette una bandierina
      const randomFlagMessage =
        flagMessages[Math.floor(Math.random() * flagMessages.length)];
      setMessage(randomFlagMessage);
    }

    setGrid([...newGrid]);
    checkWinCondition(newGrid);
  };

  return (
    <div>
      {/* Selezione difficoltà */}
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
      {/* Mostra il messaggio corrente */}
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
    } // Sfondo rosso per la mina cliccata
    ${hasWon && cell.mine ? "bg-blue-500" : ""} // Colore per la vittoria
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
                  ? "🥚" // Mostra la mina quando il gioco è finito
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
