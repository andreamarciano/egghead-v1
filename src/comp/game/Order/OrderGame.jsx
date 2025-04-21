import { useGameLogic } from "./GameLogic";

const OrderGame = ({ onClose }) => {
  const {
    selectedLevel,
    timeLeft,
    nextNumber,
    unlockedLevels,
    level5Unlocked,
    gameOver,
    hasWon,
    victoryMessage,
    gameStarted,
    cheatMode,
    score,
    displayedScore,
    scoreTextColor,
    showScoreBoard,
    items,
    specialBalls,
    audioEnabled,
    musicVolume,
    sfxVolume,
    showVolumeSettings,
    setGameStarted,
    setCheatMode,
    setShowScoreBoard,
    setAudioEnabled,
    setMusicVolume,
    setSfxVolume,
    setShowVolumeSettings,
    restartGame,
    handleLevelChange,
    handleClick,
    getBestScores,
  } = useGameLogic();

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="p-6 rounded-lg shadow-lg bg-blue-700 w-[800px] h-[700px] flex flex-col relative items-center">
        {/* Game Header */}
        <div className="w-full flex justify-between items-center mb-4">
          {/* Time */}
          <h2 className="text-white text-lg">🕒 Time Left: {timeLeft}s</h2>
          {/* LEVEL5 - Score */}
          {selectedLevel === 5 && (
            <div className="score-display">
              <h3 className={`text-xl ${scoreTextColor}`}>
                Score: {displayedScore}
              </h3>
            </div>
          )}
          <div className="flex gap-2">
            {/* Audio Settings */}
            <button
              onClick={() => setShowVolumeSettings((prev) => !prev)}
              className="bg-gray-100 hover:bg-gray-300 px-2 py-1 rounded cursor-pointer"
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
                  className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded w-full cursor-pointer"
                >
                  {audioEnabled ? "🔊" : "🔇"}
                </button>
              </div>
            )}
            {/* Cheat */}
            <button
              onClick={() => setCheatMode((prev) => !prev)}
              className={`px-4 py-1 rounded text-sm font-semibold transition cursor-pointer ${
                cheatMode
                  ? "bg-black text-white"
                  : "bg-white text-blue-700 hover:bg-gray-200"
              }`}
            >
              Help
            </button>
            {/* Restart */}
            <button
              onClick={restartGame}
              className="bg-yellow-400 hover:bg-yellow-300 text-black px-3 py-1 rounded font-bold cursor-pointer"
            >
              🔁
            </button>
            {/* Close */}
            <button
              onClick={onClose}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-bold cursor-pointer"
            >
              ✖
            </button>
          </div>
        </div>

        {/* Scoreboard */}
        {showScoreBoard && selectedLevel === 5 && (
          <div className="absolute right-5 top-15 z-50 bg-white p-2 rounded shadow text-black w-40">
            <h3 className="font-bold text-lg mb-2">🏆 High Scores</h3>
            {getBestScores().map((s, i) => (
              <div key={i}>
                {i + 1}. {s} pts
              </div>
            ))}
          </div>
        )}

        {/* Next Ball */}
        {!hasWon && !gameOver && (
          <h3 className="text-white text-xl mb-2">
            {selectedLevel === 5 ? (
              <>
                Tap🎯 Tap🎯 - Next Ball:
                <span className="relative">
                  <span className="absolute inset-0 bg-black opacity-50 rounded-full z-0"></span>
                  <span className="relative z-10 p-1">{nextNumber}</span>
                </span>
              </>
            ) : (
              `Tap in Order! 🎯 Next: ${nextNumber}`
            )}
          </h3>
        )}

        {/* Victory / Game Over */}
        {hasWon && (
          <div className="text-green-300 font-bold text-xl mb-2">
            {victoryMessage}
          </div>
        )}
        {gameOver && !hasWon && selectedLevel !== 5 && (
          <div className="text-red-400 font-bold text-xl mb-2">
            Tempo scaduto! Game Over.
          </div>
        )}
        {gameOver && !hasWon && selectedLevel == 5 && (
          <div className="text-yellow-500 font-bold text-xl mb-2">
            Final score: {score}
          </div>
        )}

        {/* Level Selector */}
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4].map((lvl) => (
            <button
              key={lvl}
              onClick={() =>
                unlockedLevels.includes(lvl) && handleLevelChange(lvl)
              }
              disabled={!unlockedLevels.includes(lvl)}
              className={`px-4 py-1 rounded text-sm font-semibold transition cursor-pointer ${
                selectedLevel === lvl
                  ? "bg-white text-blue-700"
                  : !unlockedLevels.includes(lvl)
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-blue-300 text-black hover:bg-blue-400"
              }`}
            >
              LvL {lvl}
            </button>
          ))}
          {/* LEVEL5 */}
          {level5Unlocked && (
            <button
              onClick={() => handleLevelChange(5)}
              className={`px-4 py-1 rounded text-sm font-semibold transition cursor-pointer ${
                selectedLevel === 5
                  ? "bg-yellow-200 text-blue-700"
                  : "bg-yellow-300 text-black hover:bg-yellow-400"
              }`}
            >
              LvL Bonus
            </button>
          )}
          {/* Scoreboard */}
          {level5Unlocked && selectedLevel === 5 && (
            <button
              onClick={() => setShowScoreBoard((prev) => !prev)}
              className="bg-white text-yellow-600 rounded font-bold hover:bg-yellow-200 text-xl cursor-pointer"
            >
              🏆
            </button>
          )}
        </div>

        {/* Start Button */}
        {!gameStarted && !hasWon && !gameOver && (
          <button
            onClick={() => setGameStarted(true)}
            className="px-6 py-6 bg-red-500 text-white rounded cursor-pointer font-bold hover:bg-red-600 transition absolute top-11/20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          >
            ▶️ Play
          </button>
        )}

        {/* Restart */}
        {gameOver && (
          <button
            onClick={restartGame}
            className="text-3xl cursor-pointer
             bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-6 rounded font-bold absolute top-11/20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          >
            🔁
          </button>
        )}

        {/* Game Board */}
        <div className="relative w-full h-[500px] bg-blue-300 rounded overflow-hidden">
          {/* Balls */}
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => handleClick(item.value, item.id)}
              className={`absolute w-15 h-15 flex select-none items-center justify-center font-bold rounded-full shadow cursor-pointer transition-colors duration-300 ${
                gameOver
                  ? "bg-red-400 cursor-not-allowed"
                  : cheatMode && item.value === nextNumber
                  ? "bg-black text-white"
                  : item.boosted && selectedLevel !== 5
                  ? "bg-green-400"
                  : selectedLevel === 5
                  ? "bg-gray-200 text-4xl"
                  : item.movementType === "circle"
                  ? "bg-purple-400"
                  : item.movementType === "zigzag"
                  ? "bg-amber-950"
                  : item.movementType === "ellipse"
                  ? "bg-orange-400"
                  : item.movementType === "chaotic"
                  ? "bg-pink-500"
                  : item.movementType === "square"
                  ? "bg-red-600"
                  : item.movementType === "triangle"
                  ? "bg-blue-950"
                  : "bg-yellow-400"
              }`}
              style={{ top: item.y, left: item.x }}
            >
              {item.value}
            </div>
          ))}
          {/* Special Balls */}
          {specialBalls.map((item) => (
            <div
              key={item.id}
              onClick={() => handleClick(item.value, item.id)}
              className="cursor-pointer select-none"
              style={{
                position: "absolute",
                left: item.x,
                top: item.y,
                width: item.value === "-5" ? 45 : 35,
                height: item.value === "-5" ? 45 : 35,
                borderRadius: "50%",
                backgroundColor: item.type === "-5" ? "red" : "blue",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
              {item.value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderGame;
