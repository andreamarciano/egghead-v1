import Navbar from "../comp/Navbar";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";

const discountCodes = ["TRIS5", "FLOW5", "FOUR5", "SCREWED5", "GRAZIEATE5"];

function Checkout() {
  const cartItems = useSelector((state) => state.cart.items); // redux store
  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  );
  const shippingCost = 999.99;
  const grandTotal = total + shippingCost;

  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    indirizzo: "",
    citta: "",
    cap: "",
    numeroCarta: "",
  });

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
      setErrorMessage("Codice sconto non valido!");
      return;
    }
    if (appliedDiscounts.includes(discountCode)) {
      setErrorMessage("Codice sconto già applicato!");
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

    if (!window.confirm("Sei sicuro di voler completare l'ordine?")) return;

    // RESET
    dispatch(clearCart());
    setFormData({
      nome: "",
      cognome: "",
      email: "",
      indirizzo: "",
      citta: "",
      cap: "",
      numeroCarta: "",
    });
    setAppliedDiscounts([]);
    setPaymentMethod("");
    setErrorMessage("");
    setDiscountCode("");

    alert("Ordine completato con successo!");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Finalizza il tuo ordine</h1>

        {/* Order Recap */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Riepilogo Ordine</h2>
          <div className="bg-gray-400 p-4 rounded shadow">
            {cartItems.length === 0 ? (
              <p className="text-gray-700">Il tuo carrello è vuoto.</p>
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
                  <span>Spese di spedizione</span>
                  <span>€{shippingCost}</span>
                </div>
                {appliedDiscounts.length > 0 && (
                  <div className="flex justify-between mb-2 text-green-600">
                    <span>
                      Codice sconto applicato ({appliedDiscounts.join(", ")})
                    </span>
                    <span>-€{discountTotal}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold border-t pt-2">
                  <span>Totale</span>
                  <span>€{finalTotal}</span>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Form */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Dati per la spedizione
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-between"
          >
            {/* Shipping Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="nome"
                placeholder="Nome"
                value={formData.nome}
                onChange={handleChange}
                className={getInputClass(formData.nome)}
                required
              />
              <input
                type="text"
                name="cognome"
                placeholder="Cognome"
                value={formData.cognome}
                onChange={handleChange}
                className={getInputClass(formData.cognome)}
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
                name="indirizzo"
                placeholder="Indirizzo"
                value={formData.indirizzo}
                onChange={handleChange}
                className={`${getInputClass(formData.indirizzo)} col-span-2`}
                required
              />
              <input
                type="text"
                name="citta"
                placeholder="Città"
                value={formData.citta}
                onChange={handleChange}
                className={getInputClass(formData.citta)}
                required
              />
              <input
                type="text"
                name="cap"
                placeholder="CAP"
                value={formData.cap}
                onChange={handleChange}
                className={getInputClass(formData.cap)}
                required
              />
            </div>

            {/* Payment Method */}
            <div className="flex flex-col items-center mb-8 mt-8">
              <h2 className="text-xl font-semibold mb-4 text-center">
                Metodo di pagamento
              </h2>

              {/* main div left-right */}
              <div className="flex flex-col md:flex-row justify-between w-full max-w-4xl space-y-6 md:space-y-0 md:space-x-12">
                {/* Left: radio */}
                <div className="space-y-3 w-full md:w-1/2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="payment"
                      value="Visa Galattica"
                      onChange={handlePaymentChange}
                      className="accent-amber-600"
                      required
                    />
                    <span>Visa Galattica</span>
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
                      value="Criptovalute Marziane"
                      onChange={handlePaymentChange}
                      className="accent-amber-600"
                      required
                    />
                    <span>Criptovalute Marziane</span>
                  </label>
                </div>

                {/* Right: Card number - Discount code */}
                <div className="flex flex-col space-y-4 w-full md:w-1/2">
                  <input
                    type="text"
                    name="numeroCarta"
                    placeholder="Numero carta (XXXX-XXXX-XXXX-XXXX)"
                    value={formData.numeroCarta}
                    onChange={handleChange}
                    className={`p-2 border rounded w-full ${getInputClass(
                      formData.numeroCarta
                    )}`}
                    required
                  />
                  {/* Discount code */}
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Codice sconto"
                      value={discountCode}
                      onChange={handleDiscountChange}
                      className="p-2 border rounded w-full"
                    />
                    <button
                      type="button"
                      onClick={applyDiscount}
                      className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition"
                    >
                      Applica
                    </button>
                  </div>
                </div>
              </div>
              {/* Feedback messages discount code */}
              {errorMessage && (
                <div className="mt-2 text-red-600">{errorMessage}</div>
              )}
              {appliedDiscounts.length > 0 && (
                <div className="mt-4 text-green-600">
                  Codice(i) sconto applicato(i): {appliedDiscounts.join(", ")}
                </div>
              )}
            </div>

            {/* SUBMIT */}
            <div className="text-center mt-6">
              <button
                type="submit"
                className="bg-amber-600 text-white px-6 py-3 rounded hover:bg-amber-700 transition"
              >
                Completa l'ordine
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default Checkout;
