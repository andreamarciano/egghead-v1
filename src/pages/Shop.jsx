import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Navbar from "../comp/Navbar";
import ProductCard from "../comp/shop/ProductCard";
import Footer from "../comp/Footer";
import Filter from "../comp/shop/Filter";
// import BubbleShooter from "../comp/game/BubbleShooter/BubbleShooter";
import SpaceInvaders from "../comp/game/SpaceInvaders/SpaceInvaders";

function Shop() {
  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // space invaders shortcut
  const [isSpaceInvadersOpen, setIsSpaceInvadersOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  useEffect(() => {
    const unlocked = localStorage.getItem("unlockedSpaceInvaders") === "true";
    setIsUnlocked(unlocked);
  }, []);

  // bubble shooter shortcut
  // const [isBubbleOpen, setIsBubbleOpen] = useState(false);
  // const [isUnlocked, setIsUnlocked] = useState(false);
  // useEffect(() => {
  //   const unlocked = localStorage.getItem("unlockedBubbleShooter") === "true";
  //   setIsUnlocked(unlocked);
  // }, []);

  const eggs = useSelector((state) => state.eggs.value); // redux store
  const [selectedProduct, setSelectedProduct] = useState(null); // outlet
  // page
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 12;
  //filter
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: Infinity,
    minAvailability: 0,
    shipping: false,
    universe: false,
  });

  // Update filter
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(0); // reset page number
    setSelectedProduct(null); // close outlet
  };

  // Apply filter
  const filteredEggs = eggs.filter((egg) => {
    const matchesPrice =
      egg.price >= filters.minPrice && egg.price <= filters.maxPrice;
    const matchesAvailability = egg.available >= filters.minAvailability;
    const matchesShipping = !filters.shipping || egg.shipping === true;
    const matchesUniverse = !filters.universe || egg.universe === true;
    return (
      matchesPrice && matchesAvailability && matchesShipping && matchesUniverse
    );
  });

  // pages based on filtered products
  const totalPages = Math.ceil(filteredEggs.length / productsPerPage);

  // current page products
  const paginatedEggs = filteredEggs.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  // Page Change
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
      setSelectedProduct(null);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 200);
    }
  };

  // close outlet with id (already selected) / new product (new selection)
  const handleProductClick = (id) => {
    setSelectedProduct(selectedProduct === id ? null : id);
  };

  // close outlet with button
  const handleCloseOutlet = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <Navbar />
      <h1 className="text-4xl p-5 font-bold">Trova l'uovo che fa per te!</h1>

      {/* Filter */}
      <div className="relative">
        <Filter onFilterChange={handleFilterChange} />
        {/* Space Invaders Shortcut */}
        {isUnlocked && (
          <button
            onClick={() => setIsSpaceInvadersOpen(true)}
            className="bg-zinc-700 hover:bg-zinc-800 text-2xl transition cursor-pointer absolute top-1 left-25 rounded-2xl"
          >
            👾
          </button>
        )}
        {/* Space Invaders */}
        {isSpaceInvadersOpen && (
          <SpaceInvaders onClose={() => setIsSpaceInvadersOpen(false)} />
        )}

        {/* Bubble Shooter Shortcut */}
        {/* {isUnlocked && (
          <button
            onClick={() => setIsBubbleOpen(true)}
            className="bg-zinc-700 hover:bg-zinc-800 text-2xl transition cursor-pointer absolute top-1 left-25 rounded-2xl"
          >
            🫧
          </button>
        )} */}
      </div>
      {/* {isBubbleOpen && <BubbleShooter onClose={() => setIsBubbleOpen(false)} />} */}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-5">
        {paginatedEggs.map((egg) => (
          <Link
            to={`/shop/${egg.id}`}
            key={egg.id}
            onClick={() => handleProductClick(egg.id)}
          >
            <ProductCard {...egg} isSelected={selectedProduct === egg.id} />
          </Link>
        ))}
      </div>

      {/* Outlet */}
      {selectedProduct && (
        <div className="col-span-4 bg-zinc-900 p-6 rounded-lg shadow-lg border border-gray-700 relative">
          {/* Close Outlet */}
          <button
            className="absolute right-0 top-0 text-3xl text-white bg-transparent hover:bg-gray-800 hover:text-red-500 p-2 rounded-full"
            onClick={handleCloseOutlet}
          >
            x
          </button>
          <Outlet />
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 mt-5 mb-5">
        {/* Prev */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-600 disabled:opacity-50 cursor-pointer"
        >
          &lt; Previous
        </button>
        {/* Page Number */}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`cursor-pointer px-3 py-1 ${
              currentPage === i
                ? "bg-blue-500"
                : "bg-gray-800 hover:bg-gray-600"
            } text-white rounded`}
          >
            {i + 1}
          </button>
        ))}
        {/* Next */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-600 disabled:opacity-50 cursor-pointer"
        >
          Next &gt;
        </button>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Shop;
