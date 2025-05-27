import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { addToCart } from "../../redux/cartSlice";
import { decreaseAvailability } from "../../redux/eggSlice";
import { toast } from "react-toastify";
import SidebarCart from "./SidebarCart";

import { addUnlockedGame, GameNames } from "../game/gameUnlocker";
import SpaceInvaders from "../game/SpaceInvaders/SpaceInvaders";

function ProductInfoCard() {
  const [isSpaceInvadersOpen, setIsSpaceInvadersOpen] = useState(false);

  const { cardID } = useParams(); // get prod id by url
  // redux - select prod by id
  const eggs = useSelector((state) =>
    state.eggs.value.filter((egg) => egg.id == cardID.toString())
  );
  const dispatch = useDispatch();
  const productRef = useRef(null); // scroll ref

  // Scroll
  useEffect(() => {
    if (productRef.current) {
      const offset = -250;
      const y =
        productRef.current.getBoundingClientRect().top +
        window.scrollY +
        offset;

      setTimeout(() => {
        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      }, 200);
    }
  }, [cardID]);

  // + - Button
  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => {
    if (quantity < eggs[0].available) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  // Add product to Cart
  const handleAddCart = () => {
    if (quantity > eggs[0].available) {
      toast.warning("You’ve exceeded the available stock!");
      return;
    }

    dispatch(
      addToCart({
        id: eggs[0].id,
        name: eggs[0].alt,
        price: eggs[0].price,
        imgURL: eggs[0].imgURL,
        quantity,
      })
    );

    dispatch(decreaseAvailability({ id: eggs[0].id, quantity }));
    setQuantity(1);
    toast.success(`${quantity} ${eggs[0].alt} added to cart!`);
  };

  return (
    <div
      ref={productRef}
      className="mt-10 max-w-4xl mx-auto bg-zinc-950 rounded-lg shadow-xl min-h-[400px] relative"
    >
      {/* Title */}
      <h1 className="text-3xl font-bold text-white text-center mb-6">
        Product details for {eggs[0].alt}
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
              Price: {eggs[0].price} €
            </p>
            <p className="text-gray-300">
              Availability: {eggs[0].available} eggs
            </p>
            <p className="text-gray-300">
              1-Day Shipping: {eggs[0].shipping ? "✔️" : "❌"}
            </p>
            <p className="text-gray-300">
              Universe Shipping: {eggs[0].universe ? "✔️" : "❌"}
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

            {/* Add to Cart */}
            <button
              onClick={handleAddCart}
              className="bg-yellow-500 text-white py-2 px-6 rounded-lg text-xl font-semibold hover:bg-yellow-600 transition cursor-pointer"
            >
              Add to Cart
            </button>

            {/* SidebarCart */}
            <SidebarCart />
          </div>
        </div>
      </div>

      {/* Space Invaders - Shortcut + Render */}
      {eggs[0].game && (
        <button
          onClick={() => {
            setIsSpaceInvadersOpen(true);
            addUnlockedGame(GameNames.SPACE_INVADERS);
          }}
          className="bg-zinc-700 hover:bg-zinc-800 text-2xl transition cursor-pointer absolute bottom-1 right-1 rounded-2xl"
        >
          👾
        </button>
      )}
      {isSpaceInvadersOpen && (
        <SpaceInvaders onClose={() => setIsSpaceInvadersOpen(false)} />
      )}
    </div>
  );
}

export default ProductInfoCard;
