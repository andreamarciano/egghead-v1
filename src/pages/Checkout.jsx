import Navbar from "../comp/Navbar";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";

const discountCodes = [
  "TRIS5",
  "FLOW5",
  "FOUR5",
  "NOTREALLYSORRY5",
  "ORDER5",
  "INVADER5",
  "HIDE5",
];

function Checkout() {
  const cartItems = useSelector((state) => state.cart.items); // redux store
  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  );
  const shippingCost = 999.99;
  const grandTotal = total + shippingCost;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
  });

  // Discount Code
  const [showCodes, setShowCodes] = useState(false);
  const unlockedCodes = JSON.parse(
    localStorage.getItem("unlockedCodes") || "[]"
  );
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscounts, setAppliedDiscounts] = useState([]); // already applied

  const [errorMessage, setErrorMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Update discount code
  const handleDiscountChange = (e) => {
    setDiscountCode(e.target.value);
    setErrorMessage(""); // reset error message
  };

  // Already applied
  const applyDiscount = () => {
    if (!discountCodes.includes(discountCode)) {
      setErrorMessage("Invalid discount code!");
      return;
    }
    if (appliedDiscounts.includes(discountCode)) {
      setErrorMessage("Discount code already applied!");
      return;
    }
    setAppliedDiscounts([...appliedDiscounts, discountCode]);
    setDiscountCode(""); // reset discount code field
  };

  // Form
  const getInputClass = (value) => {
    return `p-2 border rounded transition-colors ${value ? "bg-blue-950" : ""}`;
  };

  // Total
  const discountTotal =
    appliedDiscounts.length > 0 ? appliedDiscounts.length * 0.05 * total : 0;

  const finalTotal = grandTotal - discountTotal;

  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to complete the order?")) return;

    // RESET
    dispatch(clearCart());
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
      cardNumber: "",
    });
    setAppliedDiscounts([]);
    setPaymentMethod("");
    setErrorMessage("");
    setDiscountCode("");

    alert("Order successfully completed!");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Complete Your Order</h1>

        {/* Order Recap */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="bg-gray-400 p-4 rounded shadow">
            {cartItems.length === 0 ? (
              <p className="text-gray-700">Your cart is empty.</p>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between mb-2">
                    <span>
                      {item.name} (x{item.quantity})
                    </span>
                    <span>€{item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="flex justify-between mb-2">
                  <span>Shipping Cost</span>
                  <span>€{shippingCost}</span>
                </div>
                {appliedDiscounts.length > 0 && (
                  <div className="flex justify-between mb-2 text-green-600">
                    <span>
                      Discount code applied ({appliedDiscounts.join(", ")})
                    </span>
                    <span>-€{discountTotal}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold border-t pt-2">
                  <span>Total</span>
                  <span>
                    €
                    {parseFloat(finalTotal.toFixed(4))
                      .toString()
                      .replace(".", ",")}
                  </span>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Form */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Shipping Information
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-between"
          >
            {/* Shipping Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className={getInputClass(formData.firstName)}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className={getInputClass(formData.lastName)}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`${getInputClass(formData.email)} col-span-2`}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className={`${getInputClass(formData.address)} col-span-2`}
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className={getInputClass(formData.city)}
                required
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={handleChange}
                className={getInputClass(formData.postalCode)}
                required
              />
            </div>

            {/* Payment Method */}
            <div className="flex flex-col items-center mb-8 mt-8">
              <h2 className="text-xl font-semibold mb-4 text-center">
                Payment Method
              </h2>

              {/* main div left-right */}
              <div className="flex flex-col md:flex-row justify-between w-full max-w-4xl space-y-6 md:space-y-0 md:space-x-12">
                {/* Left: radio */}
                <div className="space-y-3 w-full md:w-1/2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="payment"
                      value="Galactic Visa"
                      onChange={handlePaymentChange}
                      className="accent-amber-600"
                      required
                    />
                    <span>Galactic Visa</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="payment"
                      value="MasterStar"
                      onChange={handlePaymentChange}
                      className="accent-amber-600"
                      required
                    />
                    <span>MasterStar</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="payment"
                      value="PayAlien"
                      onChange={handlePaymentChange}
                      className="accent-amber-600"
                      required
                    />
                    <span>PayAlien</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="payment"
                      value="Martian Cryptocurrencies"
                      onChange={handlePaymentChange}
                      className="accent-amber-600"
                      required
                    />
                    <span>Martian Cryptocurrencies</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="payment"
                      value="EggPay"
                      onChange={handlePaymentChange}
                      className="accent-amber-600"
                      required
                    />
                    <span>EggPay</span>
                  </label>
                </div>

                {/* Right: Card number - Discount code */}
                <div className="flex flex-col space-y-4 w-full md:w-1/2">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number (XXXX-XXXX-XXXX-XXXX)"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className={`p-2 border rounded w-full ${getInputClass(
                      formData.cardNumber
                    )}`}
                    required
                    pattern="\d{4}-\d{4}-\d{4}-\d{4}"
                    title="Correct format: XXXX-XXXX-XXXX-XXXX"
                  />
                  {/* Discount code */}
                  <div className="flex space-x-2 relative">
                    <input
                      type="text"
                      placeholder="Discount Code"
                      value={discountCode}
                      onChange={handleDiscountChange}
                      className="p-2 border rounded w-full"
                    />
                    <button
                      type="button"
                      onClick={applyDiscount}
                      className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition cursor-pointer"
                    >
                      Apply
                    </button>

                    {/* Show Discount Codes */}
                    <button
                      type="button"
                      onClick={() => setShowCodes(!showCodes)}
                      className="bg-gray-100 border border-gray-400 px-3 py-2 rounded hover:bg-gray-300 transition text-xl cursor-pointer"
                      title="Show unlocked codes"
                    >
                      🗝️
                    </button>
                    {/* Discount Codes Window */}
                    {showCodes && (
                      <div className="absolute top-12 right-0 text-gray-800 bg-white shadow-md rounded p-4 z-10 w-48 text-sm overflow-y-auto h-40 mt-1">
                        <h3 className="font-semibold mb-2">Discount Codes</h3>
                        {unlockedCodes.length === 0 ? (
                          <p className="text-gray-500">No unlocked codes</p>
                        ) : (
                          <ul className="list-disc list-outside pl-5 space-y-1">
                            {unlockedCodes.map((code, index) => (
                              <li key={index}>{code}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Feedback messages discount code */}
              {errorMessage && (
                <div className="mt-2 text-red-600">{errorMessage}</div>
              )}
              {appliedDiscounts.length > 0 && (
                <div className="mt-4 text-green-600">
                  Applied discount code(s): {appliedDiscounts.join(", ")}
                </div>
              )}
            </div>

            {/* SUBMIT */}
            <div className="text-center mt-6">
              <button
                type="submit"
                className="bg-amber-600 text-white px-6 py-3 rounded hover:bg-amber-700 transition cursor-pointer"
              >
                Complete Order
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default Checkout;
