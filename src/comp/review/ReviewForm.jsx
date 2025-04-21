import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { add } from "../../redux/reviewSlice";

function ReviewForm({ onTriggerGame }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [unlockedGames, setUnlockedGames] = useState({
    battle: false,
    connect4: false,
  });
  const dispatch = useDispatch();

  // Get state from localStorage
  useEffect(() => {
    const battle = localStorage.getItem("unlockedBattle") === "true";
    const connect4 = localStorage.getItem("unlockedConnectFour") === "true";
    setUnlockedGames({ battle, connect4 });
  }, []);

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(add({ name, rating, text })); // add to redux store

    // choosing game
    if (rating >= 0 && rating <= 3) {
      localStorage.setItem("unlockedBattle", "true");
      setUnlockedGames((prev) => ({ ...prev, battle: true }));
      onTriggerGame("battle");
    } else if (rating === 4) {
      localStorage.setItem("unlockedConnectFour", "true");
      setUnlockedGames((prev) => ({ ...prev, connect4: true }));
      onTriggerGame("connect4");
    }

    // reset
    setName("");
    setRating(0);
    setText("");
  };

  return (
    <>
      <div className="relative">
        <form
          onSubmit={handleSubmit}
          className="bg-yellow-300 p-5 shadow-md rounded-lg text-center"
        >
          <h2 className="text-2xl pb-3 font-bold text-gray-400">
            Lascia una recensione!
          </h2>
          {/* Username */}
          <input
            type="text"
            placeholder="Nome Utente"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full mb-3 rounded text-gray-400"
            required
            maxLength={20}
          />
          {/* Rating */}
          <div className="mb-3">
            {Array(6)
              .fill()
              .map((_, i) => (
                <span
                  key={i}
                  className={`text-3xl cursor-pointer transition-all ${
                    i < (hoverRating || rating)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                  onMouseEnter={() => setHoverRating(i + 1)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(i + 1)}
                >
                  {i < (hoverRating || rating) ? "🍩" : "⚪"}
                </span>
              ))}
          </div>
          {/* Description */}
          <textarea
            placeholder="Scrivi la tua recensione (max 100 caratteri)"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={100}
            className="border p-2 w-full mb-3 rounded text-gray-400"
          />
          {/* Submit */}
          <button
            type="submit"
            className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600 cursor-pointer"
          >
            Submit
          </button>
        </form>

        {/* Game Shortcut */}
        <div className="flex flex-col gap-2 items-center absolute right-[-60px] bottom-1/3">
          {unlockedGames.battle && (
            <button
              type="button"
              onClick={() => onTriggerGame("battle")}
              className="bg-red-400 hover:bg-red-500 text-white px-3 py-2 rounded-3xl cursor-pointer"
            >
              ⚔️
            </button>
          )}
          {unlockedGames.connect4 && (
            <button
              type="button"
              onClick={() => onTriggerGame("connect4")}
              className="bg-blue-400 hover:bg-blue-500 text-white py-2 rounded-3xl cursor-pointer"
            >
              🔴🟡
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default ReviewForm;
