import { useSelector } from "react-redux";
import { useState } from "react";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import Battle from "../game/Battle/Battle";
import ConnectFour from "../game/ConnectFour/ConnectFour";

function Reviews() {
  const reviews = useSelector((state) => state.reviews.value); // redux store
  const [game, setGame] = useState(null);
  const [filter, setFilter] = useState("all");

  const filteredReviews = () => {
    switch (filter) {
      case "spontaneity":
        return reviews.filter((review) => review.rating >= 4);
      case "lies":
        return reviews.filter((review) => review.rating <= 3);
      default:
        return reviews;
    }
  };

  return (
    <div className="py-10">
      <div className="mb-4">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Le opinioni dei nostri clienti
        </h2>
        {/* Filter dropdown */}
        <div className="flex justify-end">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-gray-500 p-2 rounded cursor-pointer"
          >
            <option value="all">All</option>
            <option value="spontaneity">Spontaneous</option>
            <option value="lies">Liars</option>
          </select>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto px-6 overflow-y-auto h-100">
        {filteredReviews().map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </div>

      {/* Form */}
      <div className="max-w-lg mx-auto mt-10">
        <ReviewForm onTriggerGame={setGame} />
      </div>

      {/* Games */}
      {game === "battle" && <Battle onClose={() => setGame(null)} />}
      {game === "connect4" && <ConnectFour onClose={() => setGame(null)} />}
    </div>
  );
}

export default Reviews;
