import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4">
      <ul className="flex gap-6">
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
      </ul>
    </nav>
  );
}

export default Navbar;
