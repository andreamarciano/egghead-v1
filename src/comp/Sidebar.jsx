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
          aria-label={isOpen ? "Close Menu" : "Open Menu"} // accessibility
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
            aria-label="Close Menu" // accessibility
          >
            <X
              size={24}
              className="hover:bg-gray-500 rounded-2xl cursor-pointer"
            />
          </button>
        </div>

        {/* Sections */}
        <div>
          <h3 className="font-bold text-gray-700 text-lg">Trending</h3>
          <ul className="mb-4">
            <li>
              <Link to="/shop">Rare Eggs</Link>
            </li>
            <li>
              <Link to="/shop">Eggs on Sale</Link>
            </li>
            <li>
              <Link to="/shop">New Arrivals</Link>
            </li>
            <li>
              <Link to="/shop">Best Sellers</Link>
            </li>
          </ul>
          <hr className="text-gray-700" />

          <h3 className="font-bold text-gray-700 text-lg">
            Legendary Creatures
          </h3>
          <ul className="mb-4">
            <li>
              <Link to="/shop">Dragons</Link>
            </li>
            <li>
              <Link to="/shop">Phoenixes</Link>
            </li>
            <li>
              <Link to="/shop">Kraken</Link>
            </li>
            <li>
              <Link to="/shop">Griffins</Link>
            </li>
          </ul>
          <hr className="text-gray-700" />

          <h3 className="font-bold text-gray-700 text-lg">
            Browse by Category
          </h3>
          <ul className="mb-4">
            <li>
              <Link to="/shop">Terrestrial Eggs</Link>
            </li>
            <li>
              <Link to="/shop">Aquatic Eggs</Link>
            </li>
            <li>
              <Link to="/shop">Alien Eggs</Link>
            </li>
            <li>
              <Link to="/shop">Mysterious Eggs</Link>
            </li>
            <li>
              <Link to="/shop">Show All</Link>
            </li>
          </ul>
          <hr className="text-gray-700" />

          <h3 className="font-bold text-gray-700 text-lg">Special Programs</h3>
          <ul className="mb-4">
            <li>
              <Link to="/shop">Magic Incubators</Link>
            </li>
            <li>
              <Link to="/shop">Egg Accessories</Link>
            </li>
            <li>
              <Link to="/shop">Starter Breeding Kits</Link>
            </li>
            <li>
              <Link to="/shop">Secret Deals</Link>
            </li>
          </ul>
          <hr className="text-gray-700" />

          <h3 className="font-bold text-gray-700 text-lg">Help & Settings</h3>
          <ul className="mb-4">
            <li>
              <Link to="/about">My Account</Link>
            </li>
            <li>
              <Link to="/about">My Orders</Link>
            </li>
            <li>
              <Link to="/about">Shipping Tracker</Link>
            </li>
            <li>
              <Link to="/about">Language & Currency</Link>
            </li>
            <li>
              <Link to="/customer">Customer Service</Link>
            </li>
            <li>
              <Link to="/customer">Returns & Refunds</Link>
            </li>
            <li>
              <Link to="/about">FAQs</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
