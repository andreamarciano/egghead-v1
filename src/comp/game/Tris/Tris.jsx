import { useGameLogic } from "./GameLogic";

function Tris({ onClose }) {
  const {
    board,
    xWins,
    oWins,
    isCheating,
    status,
    aiMessage,
    audioEnabled,
    musicVolume,
    sfxVolume,
    showVolumeSettings,
    setXWins,
    setOWins,
    setIsCheating,
    setAiMessage,
    renderSquare,
    resetGame,
    setAudioEnabled,
    setMusicVolume,
    setSfxVolume,
    setShowVolumeSettings,
  } = useGameLogic();

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="p-6 rounded-lg shadow-lg bg-blue-600 w-125 h-125 items-center justify-center flex flex-col relative">
        <div className="flex flex-col items-center justify-center">
          {/* Title - Cheat */}
          <h2 className="text-center text-3xl font-bold mb-4 text-gray-900 relative group left-7">
            <span className="text-transparent group-hover:text-black transition duration-300">
              C
            </span>
            T
            <span className="text-transparent group-hover:text-black transition duration-300">
              h
            </span>
            R
            <span className="text-transparent group-hover:text-black transition duration-300">
              e
            </span>
            I
            <span className="text-transparent group-hover:text-black transition duration-300">
              a
            </span>
            S
            <span className="text-transparent group-hover:text-black transition duration-300">
              t
            </span>
            !
            <span className="text-transparent group-hover:text-black transition duration-300">
              ing!
            </span>
            <span className="text-transparent group-hover:text-black transition duration-300 absolute top-0 left-[-170px]">
              ⬇️
            </span>
          </h2>
          <h2 className="text-center text-3xl font-bold mb-4 text-blue-900 absolute group bottom-0 left-1">
            <span className="text-transparent group-hover:text-black transition duration-300">
              ➡️
            </span>
          </h2>

          {/* Scoreboard */}
          <div className="flex justify-center space-x-4 mb-4 text-xl font-bold">
            <span className="text-green-500">🐣: {xWins}</span>
            <span className="text-red-700">🥚: {oWins}</span>
          </div>

          {/* Game status */}
          <div className="text-center mb-4">{status}</div>

          {/* AI message */}
          {aiMessage && (
            <div className="text-center text-black font-bold mb-4">
              {aiMessage}
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-3 gap-1">
            {board.map((_, index) => renderSquare(index))}
          </div>

          {/* Button */}
          <div className="flex flex-row p-2">
            {/* Audio Settings */}
            <button
              onClick={() => setShowVolumeSettings((prev) => !prev)}
              className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded absolute top-1 right-1"
            >
              🔊
            </button>
            {/* Audio Settings Popup */}
            {showVolumeSettings && (
              <div className="absolute top-12 right-[-130px] bg-white shadow-lg p-4 rounded border border-gray-300 z-50">
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
            {/* Cheat */}
            <button
              onClick={() => {
                setIsCheating(true);
                setAiMessage("Cos'è successo, mi sento al contrario!");
              }}
              className="absolute bottom-0 right-0 text-transparent hover:text-black transition duration-300 px-2 py-2"
            >
              {isCheating ? "🙉" : "🙈"}
            </button>
            {/* New Game */}
            <button
              onClick={resetGame}
              className="mt-4 px-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              New Game
            </button>
            {/* Close */}
            <button
              onClick={onClose}
              className="mt-4 px-2 py-2 bg-red-500 hover:bg-red-700 rounded"
            >
              Close
            </button>
            {/* Reset Score */}
            <button
              onClick={() => {
                setXWins(0);
                setOWins(0);
                setIsCheating(false);
              }}
              className="mt-4 px-2 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            >
              Reset Score
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tris;
