import { useState, useEffect } from "react";

function Tris() {
  const [board, setBoard] = useState(Array(9).fill(null)); // Grid
  const [isXNext, setIsXNext] = useState(true);

  const [xWins, setXWins] = useState(0); // Player score
  const [oWins, setOWins] = useState(0); // AI score

  const { winner, winningSquares } = calculateWinner(board);
  const isDraw = !winner && board.every((square) => square !== null);

  const [isCheating, setIsCheating] = useState(false);
  const [gameOver, setGameOver] = useState(false);

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

  const showAiMessage = () => {
    const randomIndex = Math.floor(Math.random() * aiPhrases.length);
    setAiMessage(aiPhrases[randomIndex]);
  };

  // Game Results
  useEffect(() => {
    if (winner === "🐣" || (isCheating && winner === "🥚")) {
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
      setOWins((prev) => prev + 1); // cheat off
      setAiMessage("Povero umano...");
    }

    if (isDraw) {
      setAiMessage("Come previsto... Niente da fare per te!");
    }

    // Player score 3
    if (xWins >= 3 && !gameOver) {
      setAiMessage("Prendi questo codice sconto e sparisci! TRIS5");
      setGameOver(true);
    }
  }, [winner, isDraw, gameOver]);

  // Move
  const handleClick = (index) => {
    if (board[index] || winner || isDraw || !isXNext || gameOver) return;

    const newBoard = board.slice();
    newBoard[index] = "🐣"; // player move
    setBoard(newBoard);
    setIsXNext(false); // ai move

    // check winner
    const result = calculateWinner(newBoard);
    if (result.winner || newBoard.every((square) => square !== null)) return;

    setTimeout(() => aiMove(newBoard), 750); // ai move delay
  };

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
    setBoard([...currentBoard]);
    setIsXNext(true); // player move
    showAiMessage();
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

  // Reset
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true); // Player starts
    setAiMessage("Inizia pure tu, ma non cambierà nulla!");
    setGameOver(false);
  };

  // Handle clicks
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

  const status = winner
    ? `Winner: ${winner}`
    : isDraw
    ? "Draw!"
    : `Next player: ${isXNext ? "🐣" : "🥚"}`;

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Scoreboard */}
      <div className="flex justify-center space-x-4 mb-4 text-xl font-bold">
        <span className="text-green-500">🐣: {xWins}</span>
        <span className="text-red-700">🥚: {oWins}</span>
      </div>

      {/* Game status */}
      <div className="text-center mb-4">{status}</div>

      {/* AI message */}
      {aiMessage && (
        <div className="text-center text-black font-bold mb-4">{aiMessage}</div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-3 gap-1">
        <button
          onClick={() => {
            setIsCheating(true);
            setAiMessage("Cos'è successo, mi sento al contrario!");
          }}
          className="absolute bottom-5 left-5 text-transparent hover:text-black transition duration-300 px-4 py-2"
        >
          ✨
        </button>
        {board.map((_, index) => renderSquare(index))}
      </div>

      {/* Button */}
      <div className="flex flex-row p-2">
        <button
          onClick={resetGame}
          className="mt-4 px-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          New Game
        </button>
        <button
          onClick={() => {
            setXWins(0);
            setOWins(0);
            setIsCheating(false);
          }}
          className="mt-4 px-2 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Reset Score
        </button>
      </div>
    </div>
  );
}

export default Tris;
