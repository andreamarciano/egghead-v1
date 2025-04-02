import { useSelector } from "react-redux";
import { useState } from "react";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import PokemonBattle from "../game/PokemonBattle/PokemonBattle";
import ConnectFour from "../game/ConnectFour/ConnectFour";

function Reviews() {
  const reviews = useSelector((state) => state.reviews.value);
  const [game, setGame] = useState(null);

  return (
    <div className="py-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Le opinioni dei nostri clienti
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto px-6 overflow-y-auto h-100">
        {reviews.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </div>
      <div className="max-w-lg mx-auto mt-10">
        <ReviewForm onTriggerGame={setGame} />
      </div>

      {game === "pokemon" && <PokemonBattle onClose={() => setGame(null)} />}
      {game === "forza4" && <ConnectFour onClose={() => setGame(null)} />}
    </div>
  );
}

export default Reviews;
