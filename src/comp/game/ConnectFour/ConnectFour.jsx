import { useGameLogic } from "./GameLogic";

function ConnectFour({ onClose }) {
  const {
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
  } = useGameLogic();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-blue-800 p-5 rounded-lg shadow-lg text-center h-160 w-120 relative">
        <h2 className="text-3xl font-bold mb-4 text-white">
          <span className="relative text-4xl">
            C
            <span className="absolute top-[16px] left-[6px] text-red-500 text-sm">
              🔴
            </span>
          </span>
          <span className="text-yellow-500 text-2xl">🟡</span>
          NNE
          <span className="relative">
            C
            <span className="absolute top-[13px] left-[5px] text-red-500 text-xs">
              🔴
            </span>
          </span>
          T 4
        </h2>

        {/* Game message */}
        <p className="text-white mb-4">{gameMessage}</p>
        {/* Computer message */}
        {computerMessage && (
          <p
            className="text-yellow-500 text-lg mb-2"
            style={{
              height: "50px",
              wordWrap: "break-word",
            }}
          >
            {computerMessage}
          </p>
        )}

        {/* Grid */}
        <div className="grid grid-row-6 mb-4">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-7 mb-1">
              {row.map((cell, colIndex) => {
                const isWinningCell = winningCells.some(
                  ([r, c]) => r === rowIndex && c === colIndex
                );
                const flashColor =
                  winner === "🔴" ? "bg-red-500" : "bg-yellow-500";
                const darkColor =
                  winner === "🔴" ? "bg-red-700" : "bg-yellow-700";
                return (
                  <div
                    key={colIndex}
                    className={`w-14 h-14 rounded-full border-4 border-blue-500 flex items-center justify-center cursor-pointer
                    ${isWinningCell ? (flash ? flashColor : darkColor) : ""}`}
                    onClick={() => makeMove(colIndex)}
                  >
                    {cell && <span className="text-3xl">{cell}</span>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Score */}
        <div className="flex justify-between mb-4">
          <p className="text-white absolute bottom-15 left-2">🔴 Score: {scoreRed}</p>
          <p className="text-white absolute bottom-15 right-2">🟡 Score: {scoreYellow}</p>
        </div>

        {/* Button */}
        <div className="flex flex-row justify-center items-center absolute bottom-1 right-14">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={resetGame}
          >
            New Game
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-10 ml-10"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            onClick={resetScore}
          >
            Reset Score
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConnectFour;
