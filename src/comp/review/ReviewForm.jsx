import { useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "../../redux/reviewSlice";

function ReviewForm({ onTriggerGame }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(add({ name, rating, text }));

    if (rating >= 0 && rating <= 3) {
      onTriggerGame("pokemon");
    } else if (rating === 4) {
      onTriggerGame("forza4");
    }

    setName("");
    setRating(0);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-yellow-300 p-5 shadow-md rounded-lg text-center"
    >
      <h2 className="text-2xl pb-3 font-bold text-gray-400">
        Lascia una recensione!
      </h2>
      <input
        type="text"
        placeholder="Nome Utente"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full mb-3 rounded text-gray-400"
        required
        maxLength={20}
      />
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
      <textarea
        placeholder="Scrivi la tua recensione (max 100 caratteri)"
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={100}
        className="border p-2 w-full mb-3 rounded text-gray-400"
      />
      <button
        type="submit"
        className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600"
      >
        Submit
      </button>
    </form>
  );
}

export default ReviewForm;
