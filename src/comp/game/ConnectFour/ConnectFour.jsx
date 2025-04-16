import { useGameLogic } from "./GameLogic";
import "./ConnectFour.css";

function ConnectFour({ onClose }) {
  const {
    board,
    scoreRed,
    scoreYellow,
    gameMessage,
    winningCells,
    flash,
    winner,
    makeMove,
    resetGame,
    resetScore,
    computerMessage,
    audioEnabled,
    setAudioEnabled,
    musicVolume,
    setMusicVolume,
    sfxVolume,
    setSfxVolume,
    showVolumeSettings,
    setShowVolumeSettings,
  } = useGameLogic();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-blue-800 p-5 rounded-lg shadow-lg text-center h-160 w-120 relative">
        {/* Audio Settings */}
        <button
          onClick={() => setShowVolumeSettings((prev) => !prev)}
          className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded absolute top-1 right-1"
        >
          🔊
        </button>
        {/* Audio Settings Popup */}
        {showVolumeSettings && (
          <div className="absolute top-12 right-4 bg-white shadow-lg p-4 rounded border border-gray-300 z-50">
            {/* SFX */}
            <div className="flex items-center gap-2 mb-2 text-black">
              <label htmlFor="sfx">Sound</label>
              <input
                id="sfx"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={sfxVolume}
                onChange={(e) => setSfxVolume(parseFloat(e.target.value))}
              />
            </div>
            {/* Background Music */}
            <div className="flex items-center gap-2 mb-2 text-black">
              <label htmlFor="music">Music</label>
              <input
                id="music"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={musicVolume}
                onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
              />
            </div>
            {/* Audio */}
            <button
              onClick={() => setAudioEnabled((prev) => !prev)}
              className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded w-full"
            >
              {audioEnabled ? "🔊" : "🔇"}
            </button>
          </div>
        )}
        {/* Title */}
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
                  // Token
                  <div
                    key={colIndex}
                    className={`w-14 h-14 rounded-full border-4 border-blue-500 flex items-center justify-center cursor-pointer
                    ${isWinningCell ? (flash ? flashColor : darkColor) : ""}`}
                    onClick={() => makeMove(colIndex)}
                  >
                    {/* Token Animation */}
                    {cell && (
                      <span className="text-3xl token-drop">{cell}</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Score */}
        <div className="flex justify-between mb-4">
          <p className="text-white absolute bottom-15 left-2">
            🔴 Score: {scoreRed}
          </p>
          <p className="text-white absolute bottom-15 right-2">
            🟡 Score: {scoreYellow}
          </p>
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
