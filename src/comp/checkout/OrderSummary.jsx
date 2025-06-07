function OrderSummary({
  cartItems,
  shippingCost,
  appliedDiscounts,
  discountTotal,
  finalTotal,
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
          </>
        )}
      </div>
    </section>
  );
}

export default OrderSummary;
