import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2, X } from "lucide-react";
import { removeFromCart } from "../../redux/cartSlice";
import { increaseAvailability } from "../../redux/eggSlice";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";

const SidebarCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Open/Close Cart
  const toggleSidebar = () => setIsOpen(!isOpen);

  // Remove item
  const handleRemove = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      dispatch(increaseAvailability({ id: item.id, quantity: item.quantity })); // restore availability
      dispatch(removeFromCart(id)); // remove product
      toast.success(
        <>
          <FaTrashAlt style={{ color: "red", marginRight: "10px" }} />
          {`${item.name} rimosso/i dal carrello!`}
        </>,
        {
          icon: false, // disable default icon
          autoClose: 1500, // override
        }
      );
    }
  };

  // Total price
  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  );

  // Total items
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Move to Checkout page
  const handleCheckout = () => {
    toggleSidebar(); // close sidebar
    navigate("/checkout");
  };

  return (
    <div>
      {/* Open Sidebar */}
      <button
        onClick={toggleSidebar}
        className="p-2 hover:bg-gray-700 rounded-2xl relative cursor-pointer"
      >
        <ShoppingCart size={22} />
        {/* Product Number - Badge */}
        <span className="absolute -top-1 -right-1 bg-yellow-400 text-black rounded-full text-xs w-5 h-5 flex items-center justify-center">
          {totalItems}
        </span>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gray-400 shadow-lg p-4 overflow-y-auto transition-transform transform z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Carrello</h2>
          <button onClick={toggleSidebar} className="cursor-pointer">
            <X size={24} className="hover:bg-gray-300 rounded-full" />
          </button>
        </div>

        {/* Product List */}
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Il carrello è vuoto.</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm">
                    Quantità: {item.quantity} × €{item.price}
                  </p>
                </div>
                {/* Remove Product */}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="cursor-pointer"
                >
                  <Trash2
                    size={20}
                    className="text-red-500 hover:text-red-700"
                  />
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Total + Checkout */}
        {cartItems.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <p className="font-semibold">Totale: €{total}</p>
            <button
              onClick={handleCheckout}
              className="mt-2 w-full cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-2xl"
            >
              Procedi con l'ordine
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarCart;
