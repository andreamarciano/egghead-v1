import { useState } from "react";

function Filter({ onFilterChange }) {
  // filters
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [minAvailability, setMinAvailability] = useState(0);
  const [shipping, setShipping] = useState(false);
  const [universe, setUniverse] = useState(false);
  // toast notification
  const [isApplied, setIsApplied] = useState(false);
  const [appliedType, setAppliedType] = useState("");

  const handleApply = () => {
    const validMaxPrice = maxPrice === "" ? Infinity : Number(maxPrice);
    onFilterChange({
      minPrice,
      maxPrice: validMaxPrice,
      minAvailability,
      shipping,
      universe,
    });

    // toast notification
    setAppliedType("apply");
    setIsApplied(true);
    setTimeout(() => {
      setIsApplied(false);
    }, 2000); // hyde after 2 sec
  };

  const handleReset = () => {
    setMinPrice(0);
    setMaxPrice("");
    setMinAvailability(0);
    setShipping(false);
    setUniverse(false);
    setTimeout(() => {
      onFilterChange({
        minPrice: 0,
        maxPrice: Infinity,
        minAvailability: 0,
        shipping: false,
        universe: false,
      });
    }, 0);

    // toast notification
    setAppliedType("reset");
    setIsApplied(true);
    setTimeout(() => {
      setIsApplied(false);
    }, 2000); // hyde after 2 sec
  };

  return (
    <div className="mb-5">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Filter</span>
        <span
          className={`transform transition-transform duration-400 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="mt-2 p-4 bg-gray-800 text-white rounded shadow-lg grid grid-cols-4 gap-4">
          {/* Price */}
          <div className="flex flex-col">
            <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold">
              Prezzo
            </h3>
            <div className="flex space-x-2 mt-2 mx-auto">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="p-2 bg-gray-700 text-white rounded w-full sm:w-16 md:w-18 lg:w-20"
                placeholder="Min"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="p-2 bg-gray-700 text-white rounded w-full sm:w-16 md:w-18 lg:w-20"
                placeholder="Max"
              />
            </div>
          </div>
          {/* Availability */}
          <div className="flex flex-col items-center">
            <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold mb-2">
              Disponibilità
            </h3>
            <input
              type="number"
              value={minAvailability}
              onChange={(e) => setMinAvailability(Number(e.target.value))}
              className="p-2 bg-gray-700 text-white rounded w-14 sm:w-16 md:w-18 lg:w-20"
              placeholder="Quantità minima"
            />
          </div>
          {/* Shipping */}
          <div className="flex flex-col items-center">
            <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold">
              1-Day Shipping
            </h3>
            <label className="inline-flex items-center space-x-2 mt-3">
              <input
                type="checkbox"
                checked={shipping}
                onChange={(e) => setShipping(e.target.checked)}
                className="w-5 h-5"
              />
              <span>✔️</span>
            </label>
          </div>
          {/* Universe */}
          <div className="flex flex-col items-center">
            <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold">
              Universe Shipping
            </h3>
            <label className="inline-flex items-center space-x-2 mt-3">
              <input
                type="checkbox"
                checked={universe}
                onChange={(e) => setUniverse(e.target.checked)}
                className="w-5 h-5"
              />
              <span>✔️</span>
            </label>
          </div>

          {/* Button */}
          <div className="mt-4 col-span-4 flex justify-center space-x-4">
            <button
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
              onClick={handleApply}
            >
              Apply
            </button>
            <button
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {isApplied && (
        <div
          className={`fixed bottom-5 right-5 ${
            appliedType === "apply" ? "bg-green-500" : "bg-red-500"
          } text-white px-4 py-2 rounded-full shadow-md transform transition-opacity duration-300`}
          style={{
            opacity: isApplied ? 1 : 0,
            pointerEvents: isApplied ? "auto" : "none",
          }}
        >
          Applied!
        </div>
      )}
    </div>
  );
}

export default Filter;
