function PaymentSection({
  formData,
  handleChange,
  paymentMethod,
  handlePaymentChange,
  discountCode,
  handleDiscountChange,
  applyDiscount,
  showCodes,
  setShowCodes,
  unlockedCodes,
  errorMessage,
  appliedDiscounts,
  getInputClass,
}) {
  return (
    <div className="flex flex-col items-center mb-8 mt-8">
      <h2 className="text-xl font-semibold mb-4 text-center">Payment Method</h2>

      {/* main div left-right */}
      <div className="flex flex-col md:flex-row justify-between w-full max-w-4xl space-y-6 md:space-y-0 md:space-x-12">
        {/* Left: Payment Options */}
        <div className="space-y-3 w-full md:w-1/2">
          {[
            "Galactic Visa",
            "MasterStar",
            "PayAlien",
            "Martian Cryptocurrencies",
            "EggPay",
          ].map((method) => (
            <label key={method} className="flex items-center space-x-2">
              <input
                type="radio"
                name="payment"
                value={method}
                onChange={handlePaymentChange}
                className="accent-amber-600"
                required
              />
              <span>{method}</span>
            </label>
          ))}
        </div>

        {/* Right: Card + Discount */}
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
      {errorMessage && <div className="mt-2 text-red-600">{errorMessage}</div>}
      {appliedDiscounts.length > 0 && (
        <div className="mt-4 text-green-600">
          Applied discount code(s): {appliedDiscounts.join(", ")}
        </div>
      )}
    </div>
  );
}

export default PaymentSection;
