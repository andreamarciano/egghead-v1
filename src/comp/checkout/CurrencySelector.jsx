import { useState } from "react";
import currencies from "./currencies.json";

function CurrencySelector({ currency, setCurrency }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (code) => {
    setCurrency(code);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left bg-gray-400 text-black">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 border rounded w-16 h-10 text-center cursor-pointer"
      >
        {currency}
      </button>

      {/* Dropdown List */}
      {open && (
        <ul className="absolute z-10 max-h-40 w-90 overflow-y-auto rounded border bg-gray-400">
          {currencies.map(({ code, name }) => (
            <li
              key={code}
              className="cursor-pointer px-2 py-1 hover:bg-gray-600 hover:text-black"
              onClick={() => handleSelect(code)}
            >
              {code} - {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CurrencySelector;
