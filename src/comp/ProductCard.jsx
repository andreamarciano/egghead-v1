function ProductCard({ imgURL, alt, description, price, available, isSelected }) {
  return (
    <div
      className={`bg-zinc-950 shadow-lg rounded-lg overflow-hidden flex flex-col justify-between p-4 ${
        isSelected
          ? "border-3 border-yellow-500"
          : "border border-gray-700 hover:border-yellow-300"
      }`}
    >
      <img
        className="w-full h-48 object-cover hover:scale-105 transition-all ease-linear cursor-pointer"
        src={imgURL}
        alt={alt}
      ></img>
      <div className="flex flex-col justify-between h-full p-4">
        <h2 className="text-lg text-white font-bold">{alt}</h2>
        <p className="text-gray-500 text-sm mt-2  h-30 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
          {description}
        </p>
        <div className="mt-4">
          <p className="text-gray-400 font-semibold">Prezzo: {price} €</p>
          <p className="text-gray-500">Disponibili: {available}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
