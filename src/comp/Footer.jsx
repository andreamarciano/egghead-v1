import { Link } from "react-router-dom";
import { useState } from "react";
import Tris from "./game/Tris/Tris";
import Flower from "./game/Flower/Flower";

function Footer() {
  const [isTrisOpen, setIsTrisOpen] = useState(false);
  const [isFlowerOpen, setIsFlowerOpen] = useState(false);
  // const [isSnakeOpen, setIsSnakeOpen] = useState(false);

  return (
    <footer className="bg-blue-500 text-white py-10">
      <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo (1/2) */}
        <div className="md:col-span-2 flex flex-col items-center md:items-start">
          <img
            src="/logo/logo.webp"
            alt="Andrea Factory Project Logo"
            width="160"
            height="160"
            className="w-40 h-auto"
          />
          <p className="text-sm mt-4 text-center md:text-left">
            © 2025 Andrea Factory Project Inc. <br />
            Tutti i diritti riservati. <br />
            Le immagini e i loghi sono di proprietà dei rispettivi creatori.{" "}
            <br />
            <br />
            Andrea Factory Project è un marchio fittizio.
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
              className="hover:opacity-75 transition cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/vector-1739889223593-5c0789dbad4f?q=50&w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHNuYWtlJTIwbG9nb3xlbnwwfHwwfHx8Mg%3D%3D"
                alt="Snake"
                className="w-10 h-10"
              />
            </button>

            {/* Tris */}
            <button
              onClick={() => setIsTrisOpen(true)}
              className="hover:opacity-75 transition cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/vector-1739891195183-b18fb97ba750?q=50&w=100&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Tris"
                className="w-10 h-10"
              />
            </button>

            {/* Flower */}
            <button
              onClick={() => setIsFlowerOpen(true)}
              className="hover:opacity-75 transition cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/vector-1739889220891-0e74223c0330?q=50&w=100&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Flower"
                className="w-10 h-10"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Tris */}
      {isTrisOpen && <Tris onClose={() => setIsTrisOpen(false)} />}

      {/* Flower */}
      {isFlowerOpen && <Flower onClose={() => setIsFlowerOpen(false)} />}

      {/* Snake */}
      {/* {isSnakeOpen && <Snake onClose={() => setIsSnakeOpen(false)} />} */}
    </footer>
  );
}

export default Footer;
