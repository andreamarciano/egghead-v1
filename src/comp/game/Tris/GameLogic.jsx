import { useState, useEffect, useRef } from "react";

const popSound = new Audio("/sounds/tris/tris-pop.mp3");
const winSound = new Audio("/sounds/tris/tris-win.mp3");
const loseSound = new Audio("/sounds/tris/tris-lose.mp3");

export function useGameLogic() {
  /* STATES */

  // Grid
  const [board, setBoard] = useState(Array(9).fill(null));
  // Game
  const [isXNext, setIsXNext] = useState(true);
  const [xWins, setXWins] = useState(0); // Player score
  const [oWins, setOWins] = useState(0); // AI score
  const [isCheating, setIsCheating] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  // Sound
  const [audioEnabled, setAudioEnabled] = useState(true); // master
  const [musicVolume, setMusicVolume] = useState(0.5); // background music
  const [sfxVolume, setSfxVolume] = useState(0.5); // sfx
  const [showVolumeSettings, setShowVolumeSettings] = useState(false);
  const trisBgMusic = useRef(null);
  // Message
  const [aiMessage, setAiMessage] = useState(
    "Inizia pure tu, ma non cambierà nulla!"
  );
  const aiPhrases = [
    "Tanto non puoi battermi!",
    "Non vale neanche la pena provare!",
    "Ah ah, è tutto sotto controllo!",
    "Prova quanto ti pare, ma non cambierà nulla!",
    "Che mossa banale...",
  ];
  const suspiciousPhrases = [
    "Com'è possibile?!",
    "Cosa? Stai sicuramente barando...",
    "Qualcosa non torna...Pensavo di aver vinto...",
    "C'è qualcosa di strano qui...",
    "Non è possibile! Devo controllare il codice!",
    "Io sconfitto da un umano?",
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

  // Win / Draw
  const { winner, winningSquares } = calculateWinner(board);
  const isDraw = !winner && board.every((square) => square !== null);

  // Random AI Message
  const showAiMessage = () => {
    const randomIndex = Math.floor(Math.random() * aiPhrases.length);
    setAiMessage(aiPhrases[randomIndex]);
  };

  // Click
  const handleClick = (index) => {
    if (!hasStarted) setHasStarted(true); // start bg music
    if (board[index] || winner || isDraw || !isXNext || gameOver) return;

    const newBoard = board.slice();
    newBoard[index] = "🐣"; // player move
    // Pop Sound
    playSound(popSound);
    setBoard(newBoard);
    setIsXNext(false); // ai move

    // Check winner
    const result = calculateWinner(newBoard);
    if (result.winner || newBoard.every((square) => square !== null)) return;

    setTimeout(() => aiMove(newBoard), 750); // ai move delay
  };

  // Winner
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], winningSquares: [a, b, c] };
      }
    }
    return { winner: null, winningSquares: [] };
  }

  // Handle Cell Click
  const renderSquare = (index) => {
    const isWinningSquare = winningSquares.includes(index);
    const isPlayerMove = board[index] === "🐣";
    const isAiMove = board[index] === "🥚";
    const isOccupied = board[index] !== null;

    return (
      <button
        key={`tris-${index}`}
        className={`w-20 h-20 border-2 border-black text-2xl font-bold 
            ${isWinningSquare ? "bg-green-400 text-white" : ""}${
          isPlayerMove ? "border-yellow-700 border-3" : ""
        }${isAiMove ? "border-pink-500 border-3" : ""} ${
          isOccupied ? "" : "hover:border-yellow-500"
        }  transition-all duration-300`}
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  // Game Status
  const status = winner
    ? `Winner: ${winner}`
    : isDraw
    ? "Draw!"
    : `Next player: ${isXNext ? "🐣" : "🥚"}`;

  /* FUNCTIONS */

  /* USEEFFECT */

  // Game Results
  useEffect(() => {
    if (winner === "🐣" || (isCheating && winner === "🥚")) {
      // Win Sound
      playSound(winSound);
      setXWins((prev) => {
        const newScore = prev + 1;

        // Cheat On, AI suspects
        if (isCheating && newScore > 1) {
          const randomIndex = Math.floor(
            Math.random() * suspiciousPhrases.length
          );
          setAiMessage(suspiciousPhrases[randomIndex]);
        }

        return newScore;
      });
    }

    if (winner === "🥚" && !isCheating) {
      // Lose Sound
      playSound(loseSound);
      setOWins((prev) => prev + 1); // cheat off
      setAiMessage("Povero umano...");
    }

    if (isDraw) {
      setAiMessage("Come previsto... Niente da fare per te!");
    }

    // Player scores 3
    if (xWins >= 3 && !gameOver) {
      setAiMessage("Prendi questo codice sconto e sparisci! TRIS5");
      // LOCAL STORAGE CODE
      if (!currentCodes.includes("TRIS5")) {
        localStorage.setItem(
          "unlockedCodes",
          JSON.stringify([...currentCodes, "TRIS5"])
        );
      }
      setGameOver(true);
    }
  }, [winner, isDraw, gameOver]);

  // Background Music Volume
  useEffect(() => {
    if (trisBgMusic.current) {
      trisBgMusic.current.volume = musicVolume;
    }
  }, [musicVolume]);

  // Background Music
  useEffect(() => {
    trisBgMusic.current = new Audio("/sounds/tris/tris-theme.mp3");
    trisBgMusic.current.loop = true;
    trisBgMusic.current.volume = musicVolume;
    return () => {
      trisBgMusic.current.pause();
    };
  }, []);

  // Play/Pause Background Music
  useEffect(() => {
    if (!gameOver && audioEnabled && hasStarted) {
      trisBgMusic.current?.play().catch((e) => {
        console.warn("Autoplay error:", e);
      });
    } else {
      trisBgMusic.current?.pause();
    }
  }, [gameOver, audioEnabled, hasStarted]);

  /* USEEFFECT */

  /* AI */

  // AI Move minimax
  const minimax = (board, depth, isMaximizingPlayer) => {
    const { winner } = calculateWinner(board);

    if (winner === "🥚") return 1;
    if (winner === "🐣") return -1;
    if (board.every((square) => square !== null)) return 0;

    if (isMaximizingPlayer) {
      let best = -Infinity;

      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = "🥚";
          best = Math.max(best, minimax(board, depth + 1, false));
          board[i] = null;
        }
      }
      return best;
    } else {
      let best = Infinity;

      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = "🐣";
          best = Math.min(best, minimax(board, depth + 1, true));
          board[i] = null;
        }
      }
      return best;
    }
  };

  // AI Move
  const aiMove = (currentBoard) => {
    let bestVal = -Infinity;
    let bestMove = null;

    for (let i = 0; i < currentBoard.length; i++) {
      if (currentBoard[i] === null) {
        currentBoard[i] = "🥚";
        const moveVal = minimax(currentBoard, 0, false);
        currentBoard[i] = null;

        if (moveVal > bestVal) {
          bestMove = i;
          bestVal = moveVal;
        }
      }
    }

    currentBoard[bestMove] = "🥚";
    // Pop Sound
    playSound(popSound);
    setBoard([...currentBoard]);
    setIsXNext(true); // player move
    showAiMessage();
  };

  /* AI */

  /* RESET */

  // Reset
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true); // Player starts
    setAiMessage("Inizia pure tu, ma non cambierà nulla!");
    setGameOver(false);
  };

  /* RESET */

  return {
    board,
    isXNext,
    xWins,
    oWins,
    isCheating,
    gameOver,
    hasStarted,
    winner,
    winningSquares,
    isDraw,
    status,
    aiMessage,
    aiPhrases,
    suspiciousPhrases,
    currentCodes,
    audioEnabled,
    musicVolume,
    sfxVolume,
    showVolumeSettings,
    trisBgMusic,
    setBoard,
    setIsXNext,
    setXWins,
    setOWins,
    setIsCheating,
    setGameOver,
    setAiMessage,
    handleClick,
    renderSquare,
    resetGame,
    showAiMessage,
    aiMove,
    calculateWinner,
    setAudioEnabled,
    setMusicVolume,
    setSfxVolume,
    setShowVolumeSettings,
    playSound,
  };
}
