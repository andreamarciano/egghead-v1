import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Navbar from "../comp/Navbar";
import ProductCard from "../comp/product/ProductCard";
import Footer from "../comp/Footer";

function Shop() {
  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const eggs = useSelector((state) => state.eggs.value); // redux store

  const [selectedProduct, setSelectedProduct] = useState(null);

  // Product click
  const handleProductClick = (id) => {
    if (selectedProduct === id) {
      setSelectedProduct(null); // close outlet with id (already selected)
    } else {
      setSelectedProduct(id); // new product (new selection)
    }
  };

  // close outlet with button
  const handleCloseOutlet = () => {
    setSelectedProduct(null);
  };

  // Product Grid
  const chunkArray = (arr, size) => {
    return arr.reduce((acc, _, i) => {
      if (i % size === 0) acc.push(arr.slice(i, i + size));
      return acc;
    }, []);
  };

  const rows = chunkArray(eggs, 4); // 4 rows

  return (
    <>
      <Navbar></Navbar>
      <h1 className="text-4xl p-5 font-bold">Trova l'uovo che fa per te!</h1>
      {/* Map egg rows */}
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-4 gap-5 mb-5">
          {/* For each egg in the row, render a link with the relative card */}
          {row.map((egg) => (
            <Link
              to={`/shop/${egg.id}`}
              key={egg.id}
              onClick={() => handleProductClick(egg.id)}
            >
              {/* Pass props and check if isSelected */}
              <ProductCard {...egg} isSelected={selectedProduct === egg.id} />
            </Link>
          ))}

          {/* If a product is selected and is in this row, show the product detail */}
          {selectedProduct !== null &&
            row.some((egg) => egg.id === selectedProduct) && (
              <div className="col-span-4 bg-zinc-900 p-6 rounded-lg shadow-lg border border-gray-700 relative">
                {/* Close Outlet */}
                <button
                  className="absolute right-0 top-0 text-3xl text-white bg-transparent hover:bg-gray-800 hover:text-red-500 p-2 rounded-full"
                  onClick={handleCloseOutlet}
                >
                  x
                </button>
                {/* Outlet */}
                <Outlet />
              </div>
            )}
        </div>
      ))}
      {/* Footer */}
      <Footer />
    </>
  );
}

export default Shop;
