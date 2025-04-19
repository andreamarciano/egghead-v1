import "./Flower.css";
import { useGameLogic } from "./GameLogic";

function Flower({ onClose }) {
  const {
    LEVEL_SETTINGS,
    difficulty,
    gridWidth,
    unlockedLevels,
    grid,
    flagsLeft,
    highlighted,
    gameOver,
    hasWon,
    message,
    timeLeft,
    timeRanOut,
    clickedX,
    clickedY,
    audioEnabled,
    musicVolume,
    sfxVolume,
    showVolumeSettings,
    setHighlighted,
    setAudioEnabled,
    setMusicVolume,
    setSfxVolume,
    setShowVolumeSettings,
    handleLevelChange,
    generateGrid,
    formatTime,
    handleClick,
    handleRightClick,
  } = useGameLogic();

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-orange-900 bg-opacity-50 z-50">
      <div className="p-6 rounded shadow-lg bg-yellow-600 w-230 h-170 items-center justify-center flex flex-col relative">
        {/* Game Header */}
        <div className="w-full flex justify-between items-center absolute top-0 p-2">
          {/* Timer */}
          <h2 className="text-white text-2xl">🕒 {formatTime(timeLeft)}</h2>
          {/* Title */}
          <h2 className="text-center text-3xl font-bold text-white">
            Prat💩... Fiorit🥚?
          </h2>
          {/* Button */}
          <div className="flex gap-2">
            {/* Audio Settings */}
            <button
              onClick={() => setShowVolumeSettings((prev) => !prev)}
              className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
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
            {/* Restart */}
            <button
              onClick={generateGrid}
              className="px-2 py-1 rounded bg-orange-500 hover:bg-yellow-300 transition duration-300"
            >
              🔄
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
        {/* Messages */}
        <div className="flex justify-between items-center absolute top-20">
          <div className="flex flex-col gap-2">
            <p className="text-center text-2xl font-bold">
              {difficulty} -{" "}
              <span className="relative">
                <span className="absolute inset-0 bg-black opacity-50 rounded-full z-0"></span>
                <span className="relative z-10 p-1">🧺: {flagsLeft}</span>
              </span>
            </p>
            <p className="text-center text-xl font-bold text-orange-800 mt-2">
              {gameOver ? (
                <span className="text-red-700">
                  {timeRanOut
                    ? "Accidenti! Le uova sono scappate!"
                    : "Oh no! Hai schiacciato un uovo!"}
                </span>
              ) : hasWon ? (
                <span className="text-lime-700">{message}</span>
              ) : (
                <span className="text-orange-800">{message}</span>
              )}
            </p>
          </div>
        </div>

        {/* Level */}
        <div className="flex flex-col ml-1 p-2 gap-2 items-center justify-center absolute left-0 bg-amber-500 rounded-2xl">
          {Object.keys(LEVEL_SETTINGS).map((level, index) => (
            <button
              key={level}
              onClick={() => handleLevelChange(level)}
              disabled={!unlockedLevels.includes(index)}
              className={`py-2 px-2 font-bold border rounded transition ${
                difficulty === level
                  ? "bg-yellow-300 text-white"
                  : "bg-gray-300 hover:bg-gray-400"
              } ${
                unlockedLevels.includes(index)
                  ? "hover:bg-gray-400"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          className="grid mt-6"
          style={{
            gridTemplateColumns: `repeat(${gridWidth}, 24px)`,
            gridAutoRows: "24px",
            width: `${gridWidth * 24}px`,
          }}
        >
          {grid.map((row, x) =>
            row.map((cell, y) => (
              <div
                key={`${x}-${y}`}
                className={`cell text-xs sm:text-base flex items-center justify-center border border-gray-600 font-bold cursor-pointer 
    ${cell.revealed || gameOver ? "bg-gray-300" : "bg-gray-400"} 
    ${
      gameOver &&
      cell.mine &&
      !cell.revealed &&
      x === clickedX &&
      y === clickedY
        ? "bg-red-500 border-red-800 border-3"
        : ""
    } 
    ${hasWon && cell.mine ? "bg-blue-500" : ""} 
    ${
      highlighted && highlighted[0] === x && highlighted[1] === y
        ? "border-3 border-yellow-500"
        : ""
    }
  `}
                onClick={() => handleClick(x, y)}
                onContextMenu={(e) => handleRightClick(e, x, y)}
                onMouseEnter={() => setHighlighted([x, y])}
                onMouseLeave={() => setHighlighted(null)}
              >
                {cell.flagged ? (
                  "🧺"
                ) : cell.revealed || gameOver ? (
                  cell.mine ? (
                    "🥚"
                  ) : cell.number > 0 ? (
                    <span
                      className={
                        cell.number === 1
                          ? "text-blue-600"
                          : cell.number === 2
                          ? "text-green-600"
                          : cell.number === 3
                          ? "text-red-600"
                          : cell.number === 4
                          ? "text-blue-900"
                          : cell.number === 5
                          ? "text-yellow-900"
                          : cell.number === 6
                          ? "text-cyan-600"
                          : ""
                      }
                    >
                      {cell.number}
                    </span>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Flower;
