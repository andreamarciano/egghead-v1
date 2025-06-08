import Navbar from "../comp/Navbar";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";

import OrderSummary from "../comp/checkout/OrderSummary";
import ShippingForm from "../comp/checkout/ShippingForm";
import PaymentSection from "../comp/checkout/PaymentSection";

const discountCodes = [
  "TRIS5",
  "FLOW5",
  "FOUR5",
  "NOTREALLYSORRY5",
  "ORDER5",
  "INVADER5",
  "HIDE5",
];

const alienExchangeRates = {
  ZGR: 2,
  MLK: 42.42,
  PLT: 0.0042,
};

function Checkout() {
  // --- Redux ---
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // --- Discount Code ---
  const [showCodes, setShowCodes] = useState(false);
  const unlockedCodes = JSON.parse(
    localStorage.getItem("unlockedCodes") || "[]"
  );
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscounts, setAppliedDiscounts] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  // Update discount code
  const handleDiscountChange = (e) => {
    setDiscountCode(e.target.value);
    setErrorMessage("");
  };

  // Already applied code
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

  // --- Cart & Totals ---
  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  );
  const shippingCost = 999.99;
  const grandTotal = total + shippingCost;
  const discountTotal =
    appliedDiscounts.length > 0 ? appliedDiscounts.length * 0.05 * total : 0;
  const finalTotal = grandTotal - discountTotal;

  // --- Currency Conversion ---
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState("EUR");
  const [convertedTotal, setConvertedTotal] = useState(null);
  const [convertedCurrency, setConvertedCurrency] = useState(null);

  // --- Form ---
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const getInputClass = (value) => {
    return `p-2 border rounded transition-colors ${value ? "bg-blue-950" : ""}`;
  };

  /* EXCHANGE RATE API */
  const handleCurrencyConversion = async () => {
    setLoading(true);

    if (alienExchangeRates[currency]) {
      const rate = alienExchangeRates[currency];
      const converted = finalTotal * rate;
      setConvertedTotal(converted);
      setConvertedCurrency(currency);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `https://factoryproject-exchangerate.onrender.com/exchange?amount=${finalTotal}&to=${currency}`
      );
      const data = await res.json();
      setConvertedTotal(data.convertedAmount);
      setConvertedCurrency(currency);
    } catch (err) {
      console.error("Error converting currency:", err);
    } finally {
      setLoading(false);
    }
  };

  // FORM SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to complete the order?")) return;

    // reset
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
        <OrderSummary
          cartItems={cartItems}
          shippingCost={shippingCost}
          appliedDiscounts={appliedDiscounts}
          discountTotal={discountTotal}
          finalTotal={finalTotal}
          currency={currency}
          setCurrency={setCurrency}
          convertedTotal={convertedTotal}
          convertedCurrency={convertedCurrency}
          handleCurrencyConversion={handleCurrencyConversion}
          loading={loading}
        />

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
            <ShippingForm
              formData={formData}
              handleChange={handleChange}
              getInputClass={getInputClass}
            />

            {/* Payment Method */}
            <PaymentSection
              formData={formData}
              handleChange={handleChange}
              paymentMethod={paymentMethod}
              handlePaymentChange={handlePaymentChange}
              discountCode={discountCode}
              handleDiscountChange={handleDiscountChange}
              applyDiscount={applyDiscount}
              showCodes={showCodes}
              setShowCodes={setShowCodes}
              unlockedCodes={unlockedCodes}
              errorMessage={errorMessage}
              appliedDiscounts={appliedDiscounts}
              getInputClass={getInputClass}
            />

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
