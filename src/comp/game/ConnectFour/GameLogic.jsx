import { useState, useEffect } from "react";
import { getComputerMove } from "./AILogic";

// Winner Function
export function checkForWinner(board, row, col) {
  const player = board[row][col];
  const directions = [
    [0, 1], // Horizontal
    [1, 0], // Vertical
    [1, 1], // Diagonal /
    [1, -1], // Diagonal \
  ];

  for (const [dRow, dCol] of directions) {
    let count = 1;
    let cells = [[row, col]];

    for (let i = 1; i < 4; i++) {
      const newRow = row + dRow * i;
      const newCol = col + dCol * i;
      if (
        newRow < 0 ||
        newRow >= 6 ||
        newCol < 0 ||
        newCol >= 7 ||
        board[newRow][newCol] !== player
      )
        break;
      cells.push([newRow, newCol]);
      count++;
    }

    for (let i = 1; i < 4; i++) {
      const newRow = row - dRow * i;
      const newCol = col - dCol * i;
      if (
        newRow < 0 ||
        newRow >= 6 ||
        newCol < 0 ||
        newCol >= 7 ||
        board[newRow][newCol] !== player
      )
        break;
      cells.push([newRow, newCol]);
      count++;
    }

    if (count >= 4) return cells;
  }
  return null;
}

export function useGameLogic() {
  /* STATES */

  // Grid
  const [board, setBoard] = useState(
    Array.from({ length: 6 }, () => Array(7).fill(null))
  );
  // Game
  const [isRedTurn, setIsRedTurn] = useState(true);
  const [isComputerTurn, setIsComputerTurn] = useState(false);
  const [scoreRed, setScoreRed] = useState(0);
  const [scoreYellow, setScoreYellow] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winningCells, setWinningCells] = useState([]);
  const [winner, setWinner] = useState(null);
  const [redWins, setRedWins] = useState(0);
  // Animation
  const [flash, setFlash] = useState(false);
  // Message
  const [gameMessage, setGameMessage] = useState("Next player: 🔴");
  const [computerMessage, setComputerMessage] = useState(
    "A te la prima mossa."
  );
  const computerPhrases = {
    play: [
      "Complimenti, hai appena fatto il primo passo verso la sconfitta.",
      "Wow, non pensavo fosse possibile fare una mossa così... sbagliata.",
      "La tua strategia è davvero interessante… peccato che non funzioni.",
      "Oh, una mossa così prevedibile! E io che speravo in una sfida.",
      "Non avevo dubbi che avresti scelto quella casella... troppo facile.",
      "Sembra che tu stia cercando di perdere con stile!",
      "È così che giochi? Speravo in qualcosa di più... impegnativo.",
    ],
    win: [
      "Ecco, come immaginavo: sono sempre un passo avanti.",
      "Ci voleva davvero così tanto? Facile come bere un bicchier d’acqua.",
      "Ti avevo avvertito, ma non hai voluto ascoltarmi!",
      "Questa vittoria era già scritta, dovevi rendertene conto.",
      "Non è mai stato in dubbio, lo sapevo fin dall'inizio.",
      "Ah, la sconfitta fa male, vero?",
    ],
    lose: [
      "Cosa è appena successo? Mi sto ancora chiedendo come possa aver perso!",
      "Non ci credo! Come è possibile che tu abbia vinto?",
      "No, no, no, deve esserci un errore… io non perdo mai!",
      "Dove ho sbagliato? Questo non è possibile!",
      "Devo aver fatto qualcosa di veramente stupido per arrivare a questo punto…",
      "Non ci capisco più niente, che assurdità!",
    ],
  };
  // LOCAL STORAGE CODE
  const currentCodes = JSON.parse(
    localStorage.getItem("unlockedCodes") || "[]"
  );

  /* STATES */

  /* FUNCTION */

  // Move
  const makeMove = (col) => {
    if (gameOver || isComputerTurn) return;

    const newBoard = board.map((row) => [...row]);
    for (let row = 5; row >= 0; row--) {
      if (newBoard[row][col] === null) {
        newBoard[row][col] = isRedTurn ? "🔴" : "🟡";
        setBoard(newBoard);
        const winningPositions = checkForWinner(newBoard, row, col);
        if (winningPositions) {
          setWinningCells(winningPositions);
          setWinner(newBoard[row][col]);

          if (newBoard[row][col] === "🔴") {
            setScoreRed((prev) => prev + 1);
            if (redWins + 1 === 3) {
              setComputerMessage(
                "Non male per un umano. Ecco il tuo codice sconto: FOUR5"
              );
              // LOCAL STORAGE CODE
              if (!currentCodes.includes("FOUR5")) {
                localStorage.setItem(
                  "unlockedCodes",
                  JSON.stringify([...currentCodes, "FOUR5"])
                );
              }
            } else {
              setGameMessage("🔴 Win!");
              setComputerMessage(
                computerPhrases.lose[
                  Math.floor(Math.random() * computerPhrases.lose.length)
                ]
              );
            }
            setRedWins((prev) => prev + 1);
          } else {
            setScoreYellow((prev) => prev + 1);
            setGameMessage("🟡 Win!");
            setComputerMessage(
              computerPhrases.win[
                Math.floor(Math.random() * computerPhrases.win.length)
              ]
            );
          }
          setGameOver(true);
        } else if (newBoard.flat().every((cell) => cell !== null)) {
          setGameMessage("No more moves available. It's a draw!");
          setGameOver(true);
        } else {
          setIsRedTurn(!isRedTurn);
          setGameMessage(isRedTurn ? "Next player: 🟡" : "Next player: 🔴");
        }
        return;
      }
    }
  };

  // AI Move
  const makeComputerMove = () => {
    setIsComputerTurn(true);
    const bestCol = getComputerMove(board);

    const randomPhrase =
      computerPhrases.play[
        Math.floor(Math.random() * computerPhrases.play.length)
      ];
    setComputerMessage(randomPhrase);

    setTimeout(() => {
      makeMove(bestCol);
      setIsComputerTurn(false);
    }, 750);
  };

  /* FUNCTION */

  /* USEEFFECT */

  // Flash effect
  useEffect(() => {
    if (winningCells.length > 0) {
      let flashes = 0;
      const interval = setInterval(() => {
        setFlash((prev) => !prev);
        flashes++;
        if (flashes >= 6) {
          clearInterval(interval);
          setFlash(true);
        }
      }, 300);
    }
  }, [winningCells]);

  // AI Move
  useEffect(() => {
    if (!gameOver && !isRedTurn) {
      makeComputerMove();
    }
  }, [isRedTurn, gameOver]);

  /* USEEFFECT */

  /* RESET */

  // Reset
  const resetGame = () => {
    setBoard(Array.from({ length: 6 }, () => Array(7).fill(null)));
    setIsRedTurn(true);
    setGameMessage("Next player: 🔴");
    setGameOver(false);
    setWinningCells([]);
    setWinner(null);
    setComputerMessage("A te la prima mossa.");
  };
  const resetScore = () => {
    setScoreRed(0);
    setScoreYellow(0);
    setRedWins(0);
  };

  /* RESET */

  return {
    board,
    isRedTurn,
    scoreRed,
    scoreYellow,
    gameMessage,
    gameOver,
    winningCells,
    flash,
    winner,
    makeMove,
    resetGame,
    resetScore,
    computerMessage,
  };
}
