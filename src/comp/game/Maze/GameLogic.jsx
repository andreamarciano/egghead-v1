import { useEffect, useState, useCallback, useRef } from "react";
import { useGameSounds } from "./GameSound";

const MAZE_ROWS = 30;
const MAZE_COLS = 70;
const CELL_SIZE = 18;
const NUM_TRAP = 100;
const NUM_HEART = 100;

export function useGameLogic() {
  const {
    getLifeSound,
    loseLifeSound,
    gameOverSound,
    winSound,
    audioEnabled,
    musicVolume,
    sfxVolume,
    playSound,
    playBackgroundMusic,
    pauseBackgroundMusic,
    setAudioEnabled,
    setMusicVolume,
    setSfxVolume,
  } = useGameSounds();
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
  // Animation
  const [bounceHearts, setBounceHearts] = useState(false); // Healing Animation
  const [blinkHearts, setBlinkHearts] = useState(false); // -1 Heart Blink Animation
  const [blinkZoomHearts, setBlinkZoomHearts] = useState(false); // Max Health Animation
  // Sound
  const [hasStarted, setHasStarted] = useState(false);
  const [showVolumeSettings, setShowVolumeSettings] = useState(false);
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
      if (!hasStarted) {
        setHasStarted(true);
      }

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
            // Game Over Sound
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
            // Get Life Sound
            playSound(getLifeSound);
            setTimeout(() => setBounceHearts(false), 700);
          } else {
            setBlinkZoomHearts(true);
            setTimeout(() => setBlinkZoomHearts(false), 600);
          }
        }

        if (newRow === MAZE_ROWS - 1 && newCol === MAZE_COLS - 1) {
          setReachedEnd(true);
          // Win Sound
          playSound(winSound);
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

  // Play/Pause Background Music
  useEffect(() => {
    if (audioEnabled && !reachedEnd && hasStarted) {
      playBackgroundMusic();
    } else {
      pauseBackgroundMusic();
    }
  }, [reachedEnd, audioEnabled, hasStarted]);

  /* USEEFFECT */

  /* RESET */

  // New Maze
  const handleRestart = () => {
    setLives(4);
    setTraps([]);
    setHearts([]);
    setHasStarted(false);
    setMessage("Ti guido io, vai...da quella parte!");
    generateMaze();
  };

  /* RESET */

  return {
    MAZE_ROWS,
    MAZE_COLS,
    CELL_SIZE,
    maze,
    solutionPath,
    player,
    lives,
    message,
    reachedEnd,
    bounceHearts,
    blinkHearts,
    blinkZoomHearts,
    traps,
    hearts,
    audioEnabled,
    musicVolume,
    sfxVolume,
    showVolumeSettings,
    autoMessage,
    showHelp,
    generateMaze,
    handleMove,
    handleRestart,
    setAudioEnabled,
    setMusicVolume,
    setSfxVolume,
    setShowVolumeSettings,
    setShowHelp,
  };
}
