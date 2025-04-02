import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

function ProductInfoCard() {
  const { cardID } = useParams(); // get prod id by url

  // redux - select prod by id
  const eggs = useSelector((state) =>
    state.eggs.value.filter((egg) => egg.id == cardID.toString())
  );

  const productRef = useRef(null); // scroll ref

  // Scroll
  useEffect(() => {
    if (productRef.current) {
      const offset = -250;
      const y =
        productRef.current.getBoundingClientRect().top +
        window.scrollY +
        offset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [cardID]);

  // prod qty to add in the chart
  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <div
      ref={productRef}
      className="mt-10 max-w-4xl mx-auto bg-zinc-950 rounded-lg shadow-xl min-h-[400px]"
    >
      <h1 className="text-3xl font-bold text-white text-center mb-6">
        Dettagli prodotto per {eggs[0].alt}
      </h1>

      <div className="flex flex-col md:flex-row">
        <img
          src={eggs[0].imgURL}
          alt={eggs[0].alt}
          className="w-full md:w-1/2 object-cover rounded-t-lg md:rounded-l-lg max-h-[400px]"
        ></img>

        {/* Product Details */}
        <div className="p-6 flex flex-col justify-between">
          <h2 className="text-2xl text-white font-bold">{eggs[0].alt}</h2>
          <p className="text-gray-500 mt-2 mb-4">{eggs[0].description}</p>
          <div className="flex flex-col mb-6">
            <p className="text-gray-300 font-semibold">
              Prezzo: {eggs[0].price} €
            </p>
            <p className="text-gray-300">
              Disponibilità: {eggs[0].available} uova
            </p>
          </div>

          {/* Select Quantity */}
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={decreaseQuantity}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              -
            </button>
            <p className="text-xl text-white">{quantity}</p>
            <button
              onClick={increaseQuantity}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              +
            </button>

            {/* Add to Char */}
            <button
              onClick={() => console.log(`Aggiungi ${quantity} al carrello`)}
              className="bg-yellow-500 text-white py-2 px-6 rounded-lg text-xl font-semibold hover:bg-yellow-600 transition"
            >
              Aggiungi al carrello
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfoCard;
