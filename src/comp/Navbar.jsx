import { NavLink } from "react-router-dom";
import Sidebar from "./Sidebar";
import SidebarCart from "./shop/SidebarCart";

function Navbar() {
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
        {/* About Us */}
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
        {/* Cart */}
        <li>
          <SidebarCart />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
