import { Link } from "react-router-dom";
import { useState } from "react";
import Tris from "./game/Tris";
import Flower from "./game/Flower";

function Footer() {
  // Tris states
  const [isTrisOpen, setIsTrisOpen] = useState(false);
  const openTris = () => setIsTrisOpen(true);
  const closeTris = () => setIsTrisOpen(false);

  // Flower states
  const [isFlowerOpen, setIsFlowerOpen] = useState(false);
  const openFlower = () => setIsFlowerOpen(true);
  const closeFlower = () => setIsFlowerOpen(false);

  return (
    <footer className="bg-blue-500 text-white py-10">
      <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo (1/2) */}
        <div className="md:col-span-2 flex flex-col items-center md:items-start">
          <img
            src="https://images.unsplash.com/vector-1739891192522-3b086ab3954e?q=80&w=1800"
            alt="Company Logo"
            className="w-40 h-auto"
          />
          <p className="text-sm mt-4 text-center md:text-left">
            © 2025 EggMarket Inc. <br />
            Tutti i diritti riservati. <br />
            Le immagini e i loghi sono di proprietà dei rispettivi creatori.{" "}
            <br />
            <br />
            EggMarket è un marchio fittizio.
          </p>
        </div>

        {/* Learn More (1/4) */}
        <div className="md:col-span-1 text-center md:text-left">
          <h3 className="text-lg font-bold mb-3">Learn More</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="hover:text-yellow-300 transition">
                Chi Siamo
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-yellow-300 transition">
                Contattaci
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-yellow-300 transition">
                Il Nostro Blog
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-yellow-300 transition">
                Termini e Condizioni
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-yellow-300 transition">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media (1/4) */}
        <div className="md:col-span-1 text-center md:text-left">
          <h3 className="text-lg font-bold mb-3">Seguici su</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            {/* Snake */}
            <button
              onClick={() =>
                alert("Il social Snake non è ancora stato inventato!")
              }
              className="hover:opacity-75 transition"
            >
              <img
                src="https://images.unsplash.com/vector-1739889223593-5c0789dbad4f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHNuYWtlJTIwbG9nb3xlbnwwfHwwfHx8Mg%3D%3D"
                alt="Snake"
                className="w-10 h-10"
              />
            </button>

            {/* Tris */}
            <button onClick={openTris} className="hover:opacity-75 transition">
              <img
                src="https://images.unsplash.com/vector-1739891195183-b18fb97ba750?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Tris"
                className="w-10 h-10"
              />
            </button>

            {/* Flower */}
            <button
              onClick={openFlower}
              className="hover:opacity-75 transition"
            >
              <img
                src="https://images.unsplash.com/vector-1739889220891-0e74223c0330?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Flower"
                className="w-10 h-10"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Tris Modal*/}
      {isTrisOpen && (
        <div className="fixed inset-0 flex top-1 left-1 justify-center items-center bg-gray-900 bg-opacity-50 z-50 w-135 h-135">
          <div className="p-6 rounded-lg shadow-lg bg-blue-600 w-125 h-125 items-center justify-center flex flex-col">
            {/* Close */}
            <button
              onClick={closeTris}
              className="absolute top-0 right-2 bg-transparent hover:bg-gray-800 hover:text-red-500 rounded-full"
            >
              x
            </button>
            {/* Title - Cheat */}
            <h2 className="text-center text-3xl font-bold mb-4 text-blue-900 relative group left-7">
              <span className="text-transparent group-hover:text-black transition duration-300">
                C
              </span>
              T
              <span className="text-transparent group-hover:text-black transition duration-300">
                h
              </span>
              R
              <span className="text-transparent group-hover:text-black transition duration-300">
                e
              </span>
              I
              <span className="text-transparent group-hover:text-black transition duration-300">
                a
              </span>
              S
              <span className="text-transparent group-hover:text-black transition duration-300">
                t
              </span>
              !
              <span className="text-transparent group-hover:text-black transition duration-300">
                ing!
              </span>
              <span className="text-transparent group-hover:text-black transition duration-300 absolute top-0 left-70">
                ⬇️
              </span>
            </h2>
            {/* Tris */}
            <Tris />
            {/* Title - Cheat */}
            <h2 className="text-center text-3xl font-bold mb-4 text-blue-900 absolute group bottom-5 right-8">
              <span className="text-transparent group-hover:text-black transition duration-300">
                ⬅️
              </span>
            </h2>
          </div>
        </div>
      )}

      {/* Flower Modal */}
      {isFlowerOpen && (
        <div className="fixed inset-0 flex top-0 left-0 justify-center items-center bg-orange-900 bg-opacity-50 z-50 w-190 h-173 rounded-2xl overflow-y-auto">
          <div className="p-6 rounded-lg shadow-lg bg-yellow-600 w-200 h-200 items-center justify-center flex flex-col ">
            {/* Close */}
            <button
              onClick={closeFlower}
              className="absolute text-3xl top-0 right-2 bg-transparent hover:bg-gray-800 hover:text-red-500 rounded-full"
            >
              x
            </button>
            {/* Flower */}
            <Flower />
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;
