function ReviewCard({ name, rating, text }) {
  return (
    <div className="bg-yellow-300 p-4 rounded-lg shadow-md text-center">
      <h3 className="text-lg font-semibold text-emerald-700 overflow-x-auto">{name}</h3>
      <p className="text-xl my-2">
        {"🍩".repeat(rating) + "⚪".repeat(6 - rating)}
      </p>
      <p className="bg-gray-400 text-white p-3 rounded-lg max-w-xs mx-auto overflow-x-auto">
        {text || "Nessuna descrizione"}
      </p>
    </div>
  );
}

export default ReviewCard;
