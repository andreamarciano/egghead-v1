function ProductCard({
  imgURL,
  alt,
  description,
  price,
  available,
  shipping,
  universe,
  isSelected,
}) {
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
        loading="lazy"
      ></img>
      <div className="flex flex-col justify-between h-full p-4">
        <h2 className="text-lg text-white font-bold">{alt}</h2>
        <p className="text-gray-500 text-sm mt-2 h-30 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
          {description}
        </p>
        <div className="mt-4">
          <p className="text-gray-400 font-semibold">Prezzo: {price} €</p>
          <p className="text-gray-500">Disponibili: {available}</p>
          <p className="text-gray-600">
            1-Day Shipping: {shipping ? "✔️" : "❌"}
          </p>
          <p className="text-gray-600">
            Universe Shipping: {universe ? "✔️" : "❌"}
          </p>
        </div>
      </div>
      <button className="bg-cyan-500 text-white py-2 px-6 rounded-lg text-xl font-semibold hover:bg-cyan-700 transition cursor-pointer">
        Details
      </button>
    </div>
  );
}

export default ProductCard;
