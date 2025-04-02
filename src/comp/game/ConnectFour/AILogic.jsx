import { checkForWinner } from "./GameLogic";

// Valutazione della griglia (punteggi per le sequenze)
const SCORE = {
  WIN: 1000, // Vittoria per l'AI
  BLOCK_WIN: 900, // Bloccare una vittoria avversaria
  THREE: 100, // Tre pedine allineate dell'AI
  BLOCK_THREE: 90, // Tre pedine avversarie bloccate
  TWO: 10, // Due pedine dell'AI
  BLOCK_TWO: 9, // Due pedine avversarie bloccate
};

// Funzione per valutare la griglia
function evaluateBoard(board) {
  let score = 0;

  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      if (board[row][col] === null) continue;

      const player = board[row][col];

      const directions = [
        [0, 1], // Horizontal
        [1, 0], // Vertical
        [1, 1], // Diagonal /
        [1, -1], // Diagonal \
      ];

      for (let [dRow, dCol] of directions) {
        let count = 0,
          empty = 0;

        for (let i = 0; i < 4; i++) {
          let r = row + dRow * i;
          let c = col + dCol * i;
          if (r < 0 || r >= 6 || c < 0 || c >= 7) break;

          if (board[r][c] === player) count++;
          else if (board[r][c] === null) empty++;
        }

        if (count === 4) {
          score += player === "🟡" ? SCORE.WIN : -SCORE.WIN;
        } else if (count === 3 && empty === 1) {
          score += player === "🟡" ? SCORE.THREE : -SCORE.BLOCK_THREE;
        } else if (count === 2 && empty === 2) {
          score += player === "🟡" ? SCORE.TWO : -SCORE.BLOCK_TWO;
        }
      }
    }
  }

  return score;
}

// Funzione Minimax con profondità limitata
function minimax(board, depth, isMaximizing, alpha, beta) {
  const availableColumns = getAvailableColumns(board);

  // Controllo se c'è un vincitore
  for (let col of availableColumns) {
    let tempBoard = board.map((row) => [...row]);
    let row = getNextOpenRow(tempBoard, col);
    if (row !== -1) {
      tempBoard[row][col] = isMaximizing ? "🟡" : "🔴";
      if (checkForWinner(tempBoard, row, col)) {
        return isMaximizing ? SCORE.WIN : -SCORE.WIN;
      }
    }
  }

  // Se la profondità è zero o la griglia è piena, ritorna il punteggio della situazione attuale
  if (depth === 0 || availableColumns.length === 0) {
    return evaluateBoard(board);
  }

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (let col of availableColumns) {
      let tempBoard = board.map((row) => [...row]);
      let row = getNextOpenRow(tempBoard, col);
      if (row !== -1) {
        tempBoard[row][col] = "🟡";
        let evaluation = minimax(tempBoard, depth - 1, false, alpha, beta);
        maxEval = Math.max(maxEval, evaluation);
        alpha = Math.max(alpha, evaluation);
        if (beta <= alpha) break; // Alpha-beta pruning
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let col of availableColumns) {
      let tempBoard = board.map((row) => [...row]);
      let row = getNextOpenRow(tempBoard, col);
      if (row !== -1) {
        tempBoard[row][col] = "🔴";
        let evaluation = minimax(tempBoard, depth - 1, true, alpha, beta);
        minEval = Math.min(minEval, evaluation);
        beta = Math.min(beta, evaluation);
        if (beta <= alpha) break;
      }
    }
    return minEval;
  }
}

// Trova la riga aperta più bassa in una colonna
function getNextOpenRow(board, col) {
  for (let row = 5; row >= 0; row--) {
    if (board[row][col] === null) return row;
  }
  return -1;
}

// Trova tutte le colonne disponibili per giocare
function getAvailableColumns(board) {
  const availableColumns = [];
  for (let col = 0; col < 7; col++) {
    if (board[0][col] === null) availableColumns.push(col);
  }
  return availableColumns;
}

// Funzione principale per ottenere la mossa dell'AI
export function getComputerMove(board) {
  const availableColumns = getAvailableColumns(board);
  let bestScore = -Infinity;
  let bestMove =
    availableColumns[Math.floor(Math.random() * availableColumns.length)];

  for (let col of availableColumns) {
    let tempBoard = board.map((row) => [...row]);
    let row = getNextOpenRow(tempBoard, col);
    if (row !== -1) {
      tempBoard[row][col] = "🟡";
      let score = minimax(tempBoard, 3, false, -Infinity, Infinity); // depth = 3
      if (score > bestScore) {
        bestScore = score;
        bestMove = col;
      }
    }
  }

  return bestMove;
}
