import { useEffect, useState, useCallback, useRef } from "react";
import "./Maze.css";

const MAZE_ROWS = 30;
const MAZE_COLS = 70;
const CELL_SIZE = 18;
const NUM_TRAP = 1;
const NUM_HEART = 100;

const getLifeSound = new Audio("/sounds/maze/get-life.wav");
const loseLifeSound = new Audio("/sounds/maze/lose-life.wav");
const gameOverSound = new Audio("/sounds/maze/game-over.wav");

function Maze({ onClose }) {
  /* STATES */

  const [maze, setMaze] = useState([]);
  const [player, setPlayer] = useState({ row: 0, col: 0 });
  const [message, setMessage] = useState("");
  const [reachedEnd, setReachedEnd] = useState(false);
  const [solutionPath, setSolutionPath] = useState([]);
  const [showHelp, setShowHelp] = useState(false);
  // Game
  const [lives, setLives] = useState(4);
  const [traps, setTraps] = useState([]);
  const [hearts, setHearts] = useState([]);
  const [bounceHearts, setBounceHearts] = useState(false); // Healing Animation
  const [blinkHearts, setBlinkHearts] = useState(false); // -1 Heart Blink Animation
  const [blinkZoomHearts, setBlinkZoomHearts] = useState(false); // Max Health Animation
  // Sound
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [volume, setVolume] = useState(0.6);
  // Message
  const [autoMessage, setAutoMessage] = useState(
    "Ti guido io, vai...da quella parte!"
  );
  const autoMessageRef = useRef(null);
  const guidanceMessages = [
    "Hai preso la strada giusta? 🤔",
    "Non fidarti troppo delle scorciatoie...",
    "Ogni passo ti avvicina alla verità.",
    "Non tutti i muri sono barriere.",
    "Chi cerca, trova. Forse.",
  ];
  // LOCAL STORAGE CODE
  const currentCodes = JSON.parse(
    localStorage.getItem("unlockedCodes") || "[]"
  );

  /* STATES */

  /* SOUNDS */

  const playSound = (sound) => {
    if (audioEnabled) {
      sound.currentTime = 0;
      sound.play();
    }
  };

  /* SOUNDS */

  /* FUNCTIONS */

  // Generate Maze
  const generateMaze = useCallback(() => {
    const rows = MAZE_ROWS;
    const cols = MAZE_COLS;
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

    const dirs = [
      [0, 1], // right
      [1, 0], // down
      [0, -1], // left
      [-1, 0], // up
    ];

    const isValid = (r, c) =>
      r >= 0 && c >= 0 && r < rows && c < cols && !visited[r][c];

    const mazeGrid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({
        top: true,
        right: true,
        bottom: true,
        left: true,
      }))
    );

    // DFS Algorithm
    function dfs(r, c) {
      visited[r][c] = true;
      dirs.sort(() => Math.random() - 0.5);

      for (let [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        if (isValid(nr, nc)) {
          if (dr === -1) {
            mazeGrid[r][c].top = false;
            mazeGrid[nr][nc].bottom = false;
          } else if (dr === 1) {
            mazeGrid[r][c].bottom = false;
            mazeGrid[nr][nc].top = false;
          } else if (dc === -1) {
            mazeGrid[r][c].left = false;
            mazeGrid[nr][nc].right = false;
          } else if (dc === 1) {
            mazeGrid[r][c].right = false;
            mazeGrid[nr][nc].left = false;
          }
          dfs(nr, nc);
        }
      }
    }

    // Break Walls
    function addFakePaths(grid, extraConnections = 25) {
      let count = 0;

      while (count < extraConnections) {
        const r = Math.floor(Math.random() * (rows - 1));
        const c = Math.floor(Math.random() * (cols - 1));

        const directions = [
          { dr: -1, dc: 0, wall: "top", opposite: "bottom" },
          { dr: 1, dc: 0, wall: "bottom", opposite: "top" },
          { dr: 0, dc: -1, wall: "left", opposite: "right" },
          { dr: 0, dc: 1, wall: "right", opposite: "left" },
        ];

        const { dr, dc, wall, opposite } =
          directions[Math.floor(Math.random() * directions.length)];

        const nr = r + dr;
        const nc = c + dc;

        if (
          nr >= 0 &&
          nc >= 0 &&
          nr < rows &&
          nc < cols &&
          grid[r][c][wall] &&
          grid[nr][nc][opposite]
        ) {
          grid[r][c][wall] = false;
          grid[nr][nc][opposite] = false;
          count++;
        }
      }
    }

    dfs(0, 0); // start

    // Find Solution
    const findSolutionPath = () => {
      const visited = Array.from({ length: rows }, () =>
        Array(cols).fill(false)
      );
      const path = [];

      function dfsPath(r, c) {
        if (r === rows - 1 && c === cols - 1) {
          path.push({ row: r, col: c });
          return true;
        }

        visited[r][c] = true;
        const cell = mazeGrid[r][c];

        const directions = [
          { dr: -1, dc: 0, wall: "top" },
          { dr: 1, dc: 0, wall: "bottom" },
          { dr: 0, dc: -1, wall: "left" },
          { dr: 0, dc: 1, wall: "right" },
        ];

        for (let { dr, dc, wall } of directions) {
          const nr = r + dr;
          const nc = c + dc;
          if (
            nr >= 0 &&
            nc >= 0 &&
            nr < rows &&
            nc < cols &&
            !visited[nr][nc] &&
            !cell[wall]
          ) {
            if (dfsPath(nr, nc)) {
              path.push({ row: r, col: c });
              return true;
            }
          }
        }

        return false;
      }

      dfsPath(0, 0);
      setSolutionPath(path.reverse());
    };

    addFakePaths(mazeGrid, 200); // break walls
    findSolutionPath(); // show solution

    setMaze(mazeGrid);

    // Trap & Heart
    const forbidden = new Set(["0-0", `${rows - 1}-${cols - 1}`]);

    function generateItems(count, existingSet = new Set()) {
      const positions = new Set();
      while (positions.size < count) {
        const r = Math.floor(Math.random() * rows);
        const c = Math.floor(Math.random() * cols);
        const key = `${r}-${c}`;
        if (
          !forbidden.has(key) &&
          !positions.has(key) &&
          !existingSet.has(key)
        ) {
          positions.add(key);
        }
      }
      return Array.from(positions).map((key) => {
        const [row, col] = key.split("-").map(Number);
        return { row, col };
      });
    }

    const newTraps = generateItems(NUM_TRAP);
    const trapSet = new Set(newTraps.map(({ row, col }) => `${row}-${col}`));
    const newHearts = generateItems(NUM_HEART, trapSet);

    setTraps(newTraps);
    setHearts(newHearts);

    setPlayer({ row: 0, col: 0 });
    setReachedEnd(false);
  }, []);

  // Move Player
  const handleMove = useCallback(
    (dir) => {
      if (reachedEnd) return;

      const { row, col } = player;
      const cell = maze[row]?.[col];

      let newRow = row;
      let newCol = col;

      if (dir === "up" && !cell.top) newRow--;
      else if (dir === "down" && !cell.bottom) newRow++;
      else if (dir === "left" && !cell.left) newCol--;
      else if (dir === "right" && !cell.right) newCol++;

      if (newRow !== row || newCol !== col) {
        setPlayer({ row: newRow, col: newCol });

        const posKey = `${newRow}-${newCol}`;
        // Trap
        if (traps.some((p) => p.row === newRow && p.col === newCol)) {
          setTraps((prev) =>
            prev.filter((p) => p.row !== newRow || p.col !== newCol)
          );
          setLives((prev) => Math.max(prev - 1, 0));
          // Lose Life Animation
          setBlinkHearts(true);
          setTimeout(() => setBlinkHearts(false), 600);
          // Lose Life Sound
          playSound(loseLifeSound);

          if (lives - 1 <= 0) {
            setReachedEnd(true);
            setMessage("Game Over!");
            playSound(gameOverSound);
            return;
          }
        }

        // Heart
        if (hearts.some((p) => p.row === newRow && p.col === newCol)) {
          setHearts((prev) =>
            prev.filter((p) => p.row !== newRow || p.col !== newCol)
          );
          if (lives < 4) {
            setLives((prev) => prev + 1);
            // Healing Animation
            setBounceHearts(true);
            playSound(getLifeSound);
            setTimeout(() => setBounceHearts(false), 700);
          } else {
            setBlinkZoomHearts(true);
            setTimeout(() => setBlinkZoomHearts(false), 600);
          }
        }

        if (newRow === MAZE_ROWS - 1 && newCol === MAZE_COLS - 1) {
          setReachedEnd(true);
          setMessage(
            "Eccoti sei arrivato! Forse... Nel caso ti fossi perso... puoi avere questo codice sconto: MAZE5"
          );
          // LOCAL STORAGE CODE
          if (!currentCodes.includes("MAZE5")) {
            localStorage.setItem(
              "unlockedCodes",
              JSON.stringify([...currentCodes, "MAZE5"])
            );
          }
        }
      }
    },
    [lives, player, maze, reachedEnd]
  );

  /* FUNCTIONS */

  /* USEEFFECT */

  // Generate Maze
  useEffect(() => {
    generateMaze();
  }, [generateMaze]);

  // Handle keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (key === "arrowup" || key === "w") handleMove("up");
      else if (key === "arrowdown" || key === "s") handleMove("down");
      else if (key === "arrowleft" || key === "a") handleMove("left");
      else if (key === "arrowright" || key === "d") handleMove("right");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleMove]);

  // Auto Message
  useEffect(() => {
    autoMessageRef.current = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * guidanceMessages.length);
      setAutoMessage(guidanceMessages[randomIndex]);
    }, 15000);

    return () => clearInterval(autoMessageRef.current);
  }, []);
  // Stop Auto Message
  useEffect(() => {
    if (reachedEnd) {
      clearInterval(autoMessageRef.current);
    }
  }, [reachedEnd]);

  // Handle Volume
  useEffect(() => {
    getLifeSound.volume = volume;
    loseLifeSound.volume = volume;
    gameOverSound.volume = volume;
  }, [volume]);

  /* USEEFFECT */

  /* RESET */

  // New Maze
  const handleRestart = () => {
    setLives(4);
    setTraps([]);
    setHearts([]);
    setMessage("Ti guido io, vai...da quella parte!");
    generateMaze();
  };

  /* RESET */

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-purple-950 bg-opacity-50 z-50">
      <div className="p-6 rounded shadow-lg bg-purple-800 items-center justify-center flex flex-col relative">
        {/* Game Header */}
        <div className="w-full flex justify-between items-center absolute top-0 p-2">
          <h2 className="text-center text-xl font-bold text-white">
            Ecco dove puoi trovarci!
          </h2>
          {/* Message Box */}
          <div className="bg-purple-900 text-white p-2 rounded text-center mt-1">
            {message || autoMessage}
          </div>
          <div className="flex gap-2">
            {/* Volume */}
            <div className="flex items-center gap-2">
              <label htmlFor="volume">🔉</label>
              <input
                id="volume"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
              />
            </div>
            {/* Sound On/Off */}
            <button
              onClick={() => setAudioEnabled((prev) => !prev)}
              className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
            >
              {audioEnabled ? "🔊" : "🔇"}
            </button>
            {/* Solution */}
            <button
              onClick={() => setShowHelp((prev) => !prev)}
              className="bg-green-500 hover:bg-green-600 px-2 py-1 rounded"
            >
              🧭
            </button>
            {/* Restart */}
            <button
              onClick={handleRestart}
              className="bg-yellow-500 hover:bg-yellow-600 px-2 py-1 rounded"
            >
              🔁
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

        {/* Maze Container */}
        <div
          className="mt-20"
          style={{
            display: "grid",
            gridTemplateRows: `repeat(${MAZE_ROWS}, ${CELL_SIZE}px)`,
            gridTemplateColumns: `repeat(${MAZE_COLS}, ${CELL_SIZE}px)`,
          }}
        >
          {maze.flatMap((row, r) =>
            row.map((cell, c) => {
              const isPlayer = player.row === r && player.col === c;
              const isEnd = r === MAZE_ROWS - 1 && c === MAZE_COLS - 1;
              const isTrap = traps.some((p) => p.row === r && p.col === c);
              const isHeart = hearts.some((p) => p.row === r && p.col === c);
              const isSolution =
                showHelp &&
                solutionPath.some((pos) => pos.row === r && pos.col === c);
              return (
                <div
                  key={`${r}-${c}`}
                  className={
                    isPlayer
                      ? "bg-lime-500"
                      : isEnd
                      ? "bg-sky-500"
                      : isSolution
                      ? "bg-yellow-400"
                      : isTrap
                      ? "bg-purple-900"
                      : "bg-transparent"
                  }
                  style={{
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    boxSizing: "border-box",
                    borderTop: cell.top ? "2px solid black" : "none",
                    borderRight: cell.right ? "2px solid black" : "none",
                    borderBottom: cell.bottom ? "2px solid black" : "none",
                    borderLeft: cell.left ? "2px solid black" : "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: CELL_SIZE - 4,
                    userSelect: "none",
                  }}
                >
                  {isHeart && "❤️"}
                </div>
              );
            })
          )}
        </div>
        {/* Hearts */}
        <div className="flex flex-row text-center">
          <div
            className={`text-xl font-bold mb-1 ${
              blinkHearts ? "blink-hearts" : ""
            } ${blinkZoomHearts ? "blink-zoom" : ""}`}
          >
            {Array.from({ length: 4 }, (_, i) => {
              const isFilled = i < lives;
              const isLastLife = lives === 1 && i === 0;
              const bounceClass = bounceHearts ? `bounce-heart delay-${i}` : "";
              return (
                <span
                  key={i}
                  className={`${isLastLife ? "blink" : ""} ${bounceClass}`}
                  style={{
                    fontSize: "1.8rem",
                    marginRight: "0.25rem",
                    display: "inline-block",
                    animationDelay: bounceHearts ? `${i * 0.15}s` : undefined,
                  }}
                >
                  {isFilled ? "❤️" : "🤍"}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Maze;
