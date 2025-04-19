import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="w-4 relative">
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-500 rounded-2xl cursor-pointer absolute top-[-7px] left-[-9px]"
          aria-label={isOpen ? "Chiudi menu" : "Apri menu"} // accessibility
        >
          {/* Icon */}
          <Menu size={22} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-400 shadow-lg p-4 overflow-y-auto transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center mb-4 text-gray-900">
          <h2 className="text-lg font-bold">Menu</h2>
          <button
            onClick={toggleSidebar}
            aria-label="Chiudi menu" // accessibility
          >
            <X
              size={24}
              className="hover:bg-gray-500 rounded-2xl cursor-pointer"
            />
          </button>
        </div>

        {/* Sections */}
        <div>
          <h3 className="font-bold text-gray-700 text-lg">Di tendenza</h3>
          <ul className="mb-4">
            <li>
              <Link to="/shop">Uova rare</Link>
            </li>
            <li>
              <Link to="/shop">Uova in saldo</Link>
            </li>
            <li>
              <Link to="/shop">Nuovi arrivi</Link>
            </li>
            <li>
              <Link to="/shop">Le più vendute</Link>
            </li>
          </ul>
          <hr className="text-gray-700" />

          <h3 className="font-bold text-gray-700 text-lg">
            Creature leggendarie
          </h3>
          <ul className="mb-4">
            <li>
              <Link to="/shop">Draghi</Link>
            </li>
            <li>
              <Link to="/shop">Fenici</Link>
            </li>
            <li>
              <Link to="/shop">Kraken</Link>
            </li>
            <li>
              <Link to="/shop">Grifoni</Link>
            </li>
          </ul>
          <hr className="text-gray-700" />

          <h3 className="font-bold text-gray-700 text-lg">
            Scegli per categoria
          </h3>
          <ul className="mb-4">
            <li>
              <Link to="/shop">Uova terrestri</Link>
            </li>
            <li>
              <Link to="/shop">Uova acquatiche</Link>
            </li>
            <li>
              <Link to="/shop">Uova aliene</Link>
            </li>
            <li>
              <Link to="/shop">Uova misteriose</Link>
            </li>
            <li>
              <Link to="/shop">Mostra tutto</Link>
            </li>
          </ul>
          <hr className="text-gray-700" />

          <h3 className="font-bold text-gray-700 text-lg">
            Programmi speciali
          </h3>
          <ul className="mb-4">
            <li>
              <Link to="/shop">Incubatrici magiche</Link>
            </li>
            <li>
              <Link to="/shop">Accessori per uova</Link>
            </li>
            <li>
              <Link to="/shop">Kit allevamento base</Link>
            </li>
            <li>
              <Link to="/shop">Offerte segrete</Link>
            </li>
          </ul>
          <hr className="text-gray-700" />

          <h3 className="font-bold text-gray-700 text-lg">
            Aiuto e impostazioni
          </h3>
          <ul className="mb-4">
            <li>
              <Link to="/about">Il mio account</Link>
            </li>
            <li>
              <Link to="/about">I miei ordini</Link>
            </li>
            <li>
              <Link to="/about">Tracciamento spedizione</Link>
            </li>
            <li>
              <Link to="/about">Lingua e valuta</Link>
            </li>
            <li>
              <Link to="/about">Assistenza clienti</Link>
            </li>
            <li>
              <Link to="/about">Resi e rimborsi</Link>
            </li>
            <li>
              <Link to="/about">Domande frequenti</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
