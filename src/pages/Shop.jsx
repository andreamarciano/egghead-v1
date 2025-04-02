import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import Navbar from "../comp/Navbar";
import ProductCard from "../comp/product/ProductCard";
import Footer from "../comp/Footer";

function Shop() {
  const eggs = useSelector((state) => state.eggs.value);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (id) => {
    if (selectedProduct === id) {
      setSelectedProduct(null); // close outlet with id
    } else {
      setSelectedProduct(id); // new product
    }
  };

  const handleCloseOutlet = () => {
    setSelectedProduct(null); // close outlet with button
  };

  // product grid
  const chunkArray = (arr, size) => {
    return arr.reduce((acc, _, i) => {
      if (i % size === 0) acc.push(arr.slice(i, i + size));
      return acc;
    }, []);
  };

  const rows = chunkArray(eggs, 4);

  return (
    <>
      <Navbar></Navbar>
      <h1 className="text-4xl p-5 font-bold">Trova l'uovo che fa per te!</h1>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-4 gap-5 mb-5">
          {row.map((egg) => (
            <Link
              to={`/shop/${egg.id}`}
              key={egg.id}
              onClick={() => handleProductClick(egg.id)}
            >
              <ProductCard {...egg} isSelected={selectedProduct === egg.id} />
            </Link>
          ))}

          {selectedProduct !== null &&
            row.some((egg) => egg.id === selectedProduct) && (
              <div className="col-span-4 bg-zinc-900 p-6 rounded-lg shadow-lg border border-gray-700">
                <button
                  className="absolute right-100 text-3xl text-white bg-transparent hover:bg-gray-800 hover:text-red-500 p-2 rounded-full"
                  onClick={handleCloseOutlet}
                >
                  x
                </button>
                <Outlet />
              </div>
            )}
        </div>
      ))}
      <Footer></Footer>
    </>
  );
}

export default Shop;
