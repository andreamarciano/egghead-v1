import { NavLink } from "react-router-dom";
import Sidebar from "./Sidebar";
import SidebarCart from "./shop/SidebarCart";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4">
      <ul className="flex gap-6">
        {/* Sidebar */}
        <div className="w-5 relative">
          <li className="absolute top-[-7px] left-[-9px]">
            <Sidebar />
          </li>
        </div>
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
        {/* Sidebar */}
        <div className="w-5 relative">
          <li className="absolute top-[-7px] left-[-9px]">
            <SidebarCart />
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
