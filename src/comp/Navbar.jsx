import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import SidebarCart from "./shop/SidebarCart";

function Navbar() {
  const [showGamesLink, setShowGamesLink] = useState(false);

  const checkUnlockedGames = () => {
    const unlocked = JSON.parse(localStorage.getItem("unlockedGames") || "[]");
    setShowGamesLink(unlocked.length >= 3);
  };

  useEffect(() => {
    checkUnlockedGames();

    const handleUnlock = () => {
      checkUnlockedGames();
    };

    window.addEventListener("gameUnlocked", handleUnlock);

    return () => {
      window.removeEventListener("gameUnlocked", handleUnlock);
    };
  }, []);

  return (
    <nav className="bg-gray-900 text-white p-4">
      <ul className="flex gap-6">
        {/* Sidebar */}
        <li>
          <Sidebar />
        </li>
        {/* Home */}
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-yellow-300 transition-colors duration-200 ${
                isActive ? "text-yellow-400 font-bold" : ""
              }`
            }
          >
            Home
          </NavLink>
        </li>
        {/* Shop */}
        <li>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `hover:text-yellow-300 transition-colors duration-200 ${
                isActive ? "text-yellow-400 font-bold" : ""
              }`
            }
          >
            Shop
          </NavLink>
        </li>
        {/* Checkout */}
        <li>
          <NavLink
            to="/checkout"
            className={({ isActive }) =>
              `hover:text-yellow-300 transition-colors duration-200 ${
                isActive ? "text-yellow-400 font-bold" : ""
              }`
            }
          >
            Checkout
          </NavLink>
        </li>
        {/* About Us */}
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:text-yellow-300 transition-colors duration-200 ${
                isActive ? "text-yellow-400 font-bold" : ""
              }`
            }
          >
            About Us
          </NavLink>
        </li>
        {/* Customer Service */}
        <li>
          <NavLink
            to="/customer"
            className={({ isActive }) =>
              `hover:text-yellow-300 transition-colors duration-200 ${
                isActive ? "text-yellow-400 font-bold" : ""
              }`
            }
          >
            Customer Service
          </NavLink>
        </li>
        {/* Cabinet */}
        {showGamesLink && (
          <li>
            <NavLink
              to="/games"
              className={({ isActive }) =>
                `hover:text-yellow-300 transition-colors duration-200 ${
                  isActive ? "text-yellow-400 font-bold" : ""
                }`
              }
            >
              Games
            </NavLink>
          </li>
        )}
        {/* Cart */}
        <li>
          <SidebarCart />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
