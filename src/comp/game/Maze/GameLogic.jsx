import { useEffect, useState, useCallback, useRef } from "react";
import { useGameSounds } from "./GameSound";
import { generateMazeData } from "./mazeGenerator";

const MAZE_ROWS = 30;
const MAZE_COLS = 70;
const CELL_SIZE = 18;
const NUM_TRAP = 10;
const NUM_HEART = 5;
const NUM_ENEMY = 100;

export function useGameLogic() {
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
  const [enemies, setEnemies] = useState([]);
  // Animation
  const [bounceHearts, setBounceHearts] = useState(false); // +1
  const [blinkHearts, setBlinkHearts] = useState(false); // -1
  const [blinkZoomHearts, setBlinkZoomHearts] = useState(false); // max
  // Sound
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

  /* FUNCTIONS */

  // Generate Maze
  const generateMaze = useCallback(() => {
    const {
      mazeGrid,
      solutionPath,
      traps: newTraps,
      hearts: newHearts,
      enemies: newEnemies,
    } = generateMazeData(MAZE_ROWS, MAZE_COLS, NUM_TRAP, NUM_HEART, NUM_ENEMY);

    setMaze(mazeGrid);
    setSolutionPath(solutionPath);
    setTraps(newTraps);
    setHearts(newHearts);
    setEnemies(newEnemies);
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
            setMessage(
              "Sei arrivato a destinazione? Aspetta forse sei morto.."
            );
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

  return {
    MAZE_ROWS,
    MAZE_COLS,
    CELL_SIZE,
    maze,
    solutionPath,
    player,
    lives,
    message,
    bounceHearts,
    blinkHearts,
    blinkZoomHearts,
    traps,
    hearts,
    enemies,
    audioEnabled,
    musicVolume,
    sfxVolume,
    showVolumeSettings,
    autoMessage,
    showHelp,
    handleRestart,
    setAudioEnabled,
    setMusicVolume,
    setSfxVolume,
    setShowVolumeSettings,
    setShowHelp,
  };
}
