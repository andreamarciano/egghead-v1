function OrderSummary({
  cartItems,
  shippingCost,
  appliedDiscounts,
  discountTotal,
  finalTotal,
  currency,
  setCurrency,
  convertedTotal,
  handleCurrencyConversion,
}) {
  return (
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
                {parseFloat(finalTotal.toFixed(4)).toString().replace(".", ",")}
              </span>
            </div>
            {/* CONVERT TO */}
            <div className="mt-4">
              <label className="mr-2 font-semibold">Convert to:</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="p-1 rounded border bg-gray-400"
              >
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
                <option value="CHF">CHF</option>
                <option value="AUD">AUD</option>
              </select>
              <button
                onClick={handleCurrencyConversion}
                className="ml-2 px-3 py-1 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-800"
              >
                Convert
              </button>
            </div>
            {convertedTotal && (
              <div className="mt-2 text-right text-sm text-blue-800">
                ≈ {currency} {convertedTotal.toFixed(2)} (from EUR)
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default OrderSummary;
