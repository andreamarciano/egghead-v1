import { useGameLogic } from "./GameLogic";
import "./Maze.css";

function Maze({ onClose }) {
  const {
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
  } = useGameLogic();

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-purple-950 bg-opacity-50 z-50">
      <div className="p-6 rounded shadow-lg bg-purple-800 items-center justify-center flex flex-col relative">
        {/* Game Header */}
        <div className="w-full flex justify-between items-center absolute top-0 p-2 mt-1">
          <h2 className="text-center text-xl font-bold text-white">
            Ecco dove puoi trovarci!
          </h2>
          {/* Message Box */}
          <div className="bg-purple-900 text-white p-2 rounded text-center">
            {message || autoMessage}
          </div>
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
            {/* Solution */}
            <button
              onClick={() => setShowHelp((prev) => !prev)}
              className="bg-green-500 hover:bg-green-600 px-2 py-1 rounded"
            >
              🧭
            </button>
            {/* Restart */}
            <button
              onClick={handleRestart}
              className="bg-yellow-500 hover:bg-yellow-600 px-2 py-1 rounded"
            >
              🔁
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

        {/* Maze Container */}
        <div
          className="mt-15"
          style={{
            display: "grid",
            gridTemplateRows: `repeat(${MAZE_ROWS}, ${CELL_SIZE}px)`,
            gridTemplateColumns: `repeat(${MAZE_COLS}, ${CELL_SIZE}px)`,
          }}
        >
          {maze.flatMap((row, r) =>
            row.map((cell, c) => {
              const isPlayer = player.row === r && player.col === c;
              const isEnd = r === MAZE_ROWS - 1 && c === MAZE_COLS - 1;
              const isTrap = traps.some((p) => p.row === r && p.col === c);
              const isHeart = hearts.some((p) => p.row === r && p.col === c);
              const isEnemy = enemies.some((p) => p.row === r && p.col === c);
              const isSolution =
                showHelp &&
                solutionPath.some((pos) => pos.row === r && pos.col === c);
              return (
                <div
                  key={`${r}-${c}`}
                  className={
                    isPlayer
                      ? "bg-lime-500"
                      : isEnd
                      ? "bg-sky-500"
                      : isSolution
                      ? "bg-yellow-400"
                      : isTrap
                      ? "bg-purple-900"
                      : "bg-transparent"
                  }
                  style={{
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    boxSizing: "border-box",
                    borderTop: cell.top ? "2px solid black" : "none",
                    borderRight: cell.right ? "2px solid black" : "none",
                    borderBottom: cell.bottom ? "2px solid black" : "none",
                    borderLeft: cell.left ? "2px solid black" : "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: CELL_SIZE - 4,
                    userSelect: "none",
                  }}
                >
                  {isHeart && "❤️"}
                  {isEnemy && "🐓"}
                </div>
              );
            })
          )}
        </div>

        {/* Hearts */}
        <div className="flex flex-row text-center mt-2">
          <div
            className={`text-xl font-bold ${
              blinkHearts ? "blink-hearts" : ""
            } ${blinkZoomHearts ? "blink-zoom" : ""}`}
          >
            {Array.from({ length: 4 }, (_, i) => {
              const isFilled = i < lives;
              const isLastLife = lives === 1 && i === 0;
              const bounceClass = bounceHearts ? `bounce-heart delay-${i}` : "";
              return (
                <span
                  key={i}
                  className={`${isLastLife ? "blink" : ""} ${bounceClass}`}
                  style={{
                    fontSize: "1.8rem",
                    marginRight: "0.25rem",
                    display: "inline-block",
                    animationDelay: bounceHearts ? `${i * 0.15}s` : undefined,
                  }}
                >
                  {isFilled ? "❤️" : "🤍"}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Maze;
