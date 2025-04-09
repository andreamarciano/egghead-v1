import { useState, useEffect } from "react";

const OrderGame = ({ onClose }) => {
  // Difficulty settings
  const levels = {
    1: { numBalls: 15, time: 30 },
    2: { numBalls: 25, time: 60 },
    3: { numBalls: 35, time: 90 },
  };

  const [selectedLevel, setSelectedLevel] = useState(1);
  const [numBalls, setNumBalls] = useState(levels[1].numBalls);
  const [timeLeft, setTimeLeft] = useState(levels[1].time);
  const [initialTime, setInitialTime] = useState(levels[1].time);
  const [gameOver, setGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [items, setItems] = useState([]);
  const [nextNumber, setNextNumber] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [cheatMode, setCheatMode] = useState(false);
  const maxX = 680;
  const maxY = 440;

  // Generate Balls
  const generateBalls = () => {
    const values = Array.from({ length: numBalls }, (_, i) => i + 1);
    const shuffled = values.sort(() => Math.random() - 0.5);
    return shuffled.map((val, i) => {
      const x = Math.random() * maxX;
      const y = Math.random() * maxY;
      return {
        id: i,
        value: val,
        x,
        y,
        dx: Math.random() * 2 + 1,
        dy: Math.random() * 2 + 1,
        boosted: false,
        movementType: "linear",
        angle: 0,
        orbitRadius: Math.random() * 40 + 20,
        cx: x, // orbit center
        cy: y,
      };
    });
  };

  // Generate new balls set
  useEffect(() => {
    setItems(generateBalls());
  }, [numBalls]);

  // Balls movement
  useEffect(() => {
    const intervalId = setInterval(() => {
      setItems((prevItems) =>
        prevItems.map((item) => {
          let { x, y, dx, dy, movementType, angle, orbitRadius } = item;
          let newX = x;
          let newY = y;

          switch (movementType) {
            case "circle":
              angle += 0.05;
              newX = item.cx + Math.cos(angle) * orbitRadius;
              newY = item.cy + Math.sin(angle) * orbitRadius;
              break;

            case "ellipse":
              angle += 0.03;
              newX = item.cx + Math.cos(angle) * orbitRadius * 1.2;
              newY = item.cy + Math.sin(angle) * orbitRadius * 0.6;
              break;

            case "zigzag":
              angle += 0.3;
              newX = x + dx;
              newY = y + Math.sin(angle) * 5;
              break;

            default: // linear
              newX = x + dx;
              newY = y + dy;
              break;
          }

          // Border Bouncing (linear, zigzag)
          if (movementType === "linear" || movementType === "zigzag") {
            if (newX <= 0 || newX >= maxX) {
              handleBounce(item.id);
              dx = -dx;
            }
            if (newY <= 0 || newY >= maxY) {
              handleBounce(item.id);
              dy = -dy;
            }
          }

          return {
            ...item,
            x: newX,
            y: newY,
            dx,
            dy,
            angle,
          };
        })
      );
    }, 16);
    return () => clearInterval(intervalId);
  }, []);

  // Border Bouncing
  const handleBounce = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId && !item.boosted) {
          item.dx *= 1.5;
          item.dy *= 1.5;
          item.boosted = true;

          setTimeout(() => {
            setItems((items) =>
              items.map((i) =>
                i.id === itemId
                  ? { ...i, dx: i.dx / 1.5, dy: i.dy / 1.5, boosted: false }
                  : i
              )
            );
          }, 1000);
        }
        return item;
      })
    );
  };

  // Random Movement
  useEffect(() => {
    if (selectedLevel === 2 || selectedLevel === 3) {
      const movementInterval = setInterval(() => {
        setItems((prevItems) =>
          prevItems.map((item) => {
            const types =
              selectedLevel === 2
                ? ["linear", "zigzag"]
                : ["linear", "circle", "zigzag", "ellipse"];
            const newType = types[Math.floor(Math.random() * types.length)];
            return { ...item, movementType: newType };
          })
        );
      }, 5000);
      return () => clearInterval(movementInterval);
    }
  }, [selectedLevel]);

  // Timer
  useEffect(() => {
    if (timeLeft > 0 && !gameOver && !hasWon && gameStarted) {
      const timerId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver, hasWon, gameStarted]);

  // Click ball
  const handleClick = (val) => {
    if (!gameStarted || gameOver || hasWon) return;

    if (val === nextNumber) {
      setItems((prev) => prev.filter((item) => item.value !== val));
      const next = nextNumber + 1;
      setNextNumber(next);
      if (next > numBalls) {
        setHasWon(true);
      }
    }
  };

  // Change Level
  const handleLevelChange = (level) => {
    setSelectedLevel(level);
    setNumBalls(levels[level].numBalls);
    setTimeLeft(levels[level].time);
    setInitialTime(levels[level].time);
    setNextNumber(1);
    setGameOver(false);
    setHasWon(false);
    setItems(generateBalls());
    setGameStarted(false);
  };

  // Reset
  const restartGame = () => {
    setItems(generateBalls());
    setTimeLeft(initialTime);
    setGameOver(false);
    setHasWon(false);
    setNextNumber(1);
    setGameStarted(false);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="p-6 rounded-lg shadow-lg bg-blue-700 w-[800px] h-[700px] flex flex-col relative items-center">
        {/* Time + Help + Restart + Close */}
        <div className="w-full flex justify-between items-center mb-4">
          <h2 className="text-white text-lg">🕒 Time Left: {timeLeft}s</h2>
          <div className="flex gap-2">
            {/* Cheat Button */}
            <button
              onClick={() => setCheatMode((prev) => !prev)}
              className={`px-4 py-1 rounded text-sm font-semibold transition ${
                cheatMode
                  ? "bg-black text-white"
                  : "bg-white text-blue-700 hover:bg-gray-200"
              }`}
            >
              {cheatMode ? "Help ON" : "Help OFF"}
            </button>
            <button
              onClick={restartGame}
              className="bg-yellow-400 hover:bg-yellow-300 text-black px-3 py-1 rounded font-bold"
            >
              🔁
            </button>
            <button
              onClick={onClose}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-bold"
            >
              ✖
            </button>
          </div>
        </div>

        {/* Next Ball */}
        {!hasWon && !gameOver && (
          <h3 className="text-white text-xl mb-2">
            Tap in Order! 🎯Next: {nextNumber}
          </h3>
        )}

        {/* Victory / Game Over */}
        {hasWon && (
          <div className="text-green-300 font-bold text-xl mb-2">
            Hai vinto! 🎉
          </div>
        )}
        {gameOver && !hasWon && (
          <div className="text-red-400 font-bold text-xl mb-2">
            Tempo scaduto! Game Over.
          </div>
        )}

        {/* Level Selector */}
        <div className="flex gap-2 mb-4">
          {[1, 2, 3].map((lvl) => (
            <button
              key={lvl}
              onClick={() => handleLevelChange(lvl)}
              className={`px-4 py-1 rounded text-sm font-semibold transition ${
                selectedLevel === lvl
                  ? "bg-white text-blue-700"
                  : "bg-blue-300 text-black hover:bg-blue-400"
              }`}
            >
              LvL {lvl}
            </button>
          ))}
        </div>

        {/* Start Button */}
        {!gameStarted && !hasWon && !gameOver && (
          <button
            onClick={() => setGameStarted(true)}
            className="mb-4 px-6 py-2 bg-green-500 text-white rounded font-bold hover:bg-green-600 transition"
          >
            ▶️ Play
          </button>
        )}

        {/* Game Board */}
        <div className="relative w-full h-[500px] bg-blue-300 rounded overflow-hidden">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => handleClick(item.value)}
              className={`absolute w-15 h-15 flex select-none items-center justify-center font-bold rounded-full shadow cursor-pointer transition-colors duration-300 ${
                gameOver
                  ? "bg-red-400 cursor-not-allowed"
                  : cheatMode && item.value === nextNumber
                  ? "bg-black text-white"
                  : item.boosted
                  ? "bg-green-400"
                  : item.movementType === "circle"
                  ? "bg-purple-400"
                  : item.movementType === "zigzag"
                  ? "bg-amber-950"
                  : item.movementType === "ellipse"
                  ? "bg-orange-400"
                  : "bg-yellow-400"
              }`}
              style={{ top: item.y, left: item.x }}
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
