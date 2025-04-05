import { useSelector } from "react-redux";
import { useState } from "react";
import AnimalCard from "../comp/home/AnimalCard";
import { ChevronsDown, ChevronsUp } from "lucide-react";
import Scrollbar from "../comp/Scrollbar";

function Home() {
  const animals = useSelector((state) => state.animals.value); // redux store
  const [visibleAnimals, setVisibleAnimals] = useState(10);

  // Load more cards
  const handleLoadMore = () => {
    setVisibleAnimals((prev) => prev + 10);
    setTimeout(() => {
      window.scrollBy({
        top: 500,
        behavior: "smooth",
      });
    }, 200); // scroll down
  };

  // Load less cards
  const handleLoadLess = () => {
    setVisibleAnimals((prev) => Math.max(prev - 10, 10));
    setTimeout(() => {
      window.scrollBy({
        top: -500,
        behavior: "smooth",
      });
    }, 200); // scroll up
  };

  // Load all cards
  const handleLoadAll = () => {
    setVisibleAnimals(animals.length);
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 200); // scroll bottom
  };

  // Reset cards number
  const handleReset = () => {
    setVisibleAnimals(10);
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll top
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
        Benvenuti nel nostro Shop di Uova!
      </h1>
      <p className="text-xl text-gray-700 text-center mb-6">
        Siamo un'azienda specializzata nella vendita di uova fresche, di alta
        qualità, provenienti da una varietà di uccelli e animali, anche estinti.
        Scopri il nostro assortimento di uova bianche, marroni, di quaglia,
        tacchino, e altre varietà esclusive!
      </p>

      {/* Animal Cards */}
      <div className="space-y-12">
        {animals.slice(0, visibleAnimals).map((animal) => (
          <AnimalCard key={animal.id} {...animal} />
        ))}
      </div>

      {/* Horizontal Scroll Bar */}
      <div className="w-1/4 mt-6 mx-auto cursor-pointer bg-gray-200 hover:bg-gray-300">
        <div className="grid grid-cols-11 items-center justify-center">
          {/* Load ALL */}
          {visibleAnimals < animals.length && (
            <div
              onClick={handleLoadAll}
              className="col-span-1 flex justify-center items-center"
            >
              <ChevronsDown
                size={22}
                className="text-gray-800 hover:bg-gray-500 rounded"
              />
            </div>
          )}
          {/* L1 */}
          <div className="col-span-1 flex justify-center items-center">
            <div className="w-px h-8 bg-gray-400"></div>
          </div>
          {/* Load MORE */}
          {visibleAnimals < animals.length && (
            <div
              onClick={handleLoadMore}
              className="col-span-3 flex justify-center items-center space-x-2"
            >
              <p className="text-gray-800 text-xs sm:text-sm md:text-base hover:bg-gray-500 rounded">
                &darr; More
              </p>
            </div>
          )}
          {/* L2 */}
          <div className="col-span-1 flex justify-center items-center">
            <div className="w-px h-8 bg-gray-400"></div>
          </div>
          {/* Load LESS */}
          {visibleAnimals > 10 && (
            <div
              onClick={handleLoadLess}
              className="col-span-3 flex justify-center items-center space-x-2"
            >
              <p className="text-gray-800 text-xs sm:text-sm md:text-base hover:bg-gray-500 rounded">
                &uarr; Less
              </p>
            </div>
          )}
          {/* L3 */}
          <div className="col-span-1 flex justify-center items-center">
            <div className="w-px h-8 bg-gray-400"></div>
          </div>
          {/* RESET */}
          {visibleAnimals > 10 && (
            <div
              onClick={handleReset}
              className="col-span-1 flex justify-center items-center"
            >
              <ChevronsUp
                size={22}
                className="text-gray-800 hover:bg-gray-500 rounded"
              />
            </div>
          )}
        </div>
      </div>

      {/* Vertical Scroll Bar */}
      <Scrollbar />

      <div className="mt-6 text-center">
        <p className="text-lg text-gray-800">
          Scegli le uova più fresche e di qualità direttamente dal nostro
          negozio online.
        </p>
      </div>
    </div>
  );
}

export default Home;
