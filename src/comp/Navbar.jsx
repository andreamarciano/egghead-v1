import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

import "./Navbar.css";

import Sidebar from "./Sidebar";
import SidebarCart from "./shop/SidebarCart";

import { getUnlockedGames } from "./game/gameUnlocker";

function Navbar() {
  const [showGamesLink, setShowGamesLink] = useState(() => {
    return getUnlockedGames().length >= 3;
  });

  useEffect(() => {
    const handleGameUnlock = () => {
      const unlocked = JSON.parse(
        localStorage.getItem("unlockedGames") || "[]"
      );
      setShowGamesLink(unlocked.length >= 3);
    };

    window.addEventListener("gameUnlocked", handleGameUnlock);
    return () => window.removeEventListener("gameUnlocked", handleGameUnlock);
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
                `rainbow-text font-extrabold tracking-wide uppercase transition duration-300 ${
                  isActive ? "active" : ""
                }`
              }
            >
              CABINET
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
