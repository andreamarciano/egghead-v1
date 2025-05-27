import { useState } from "react";
import { ChevronDown, ChevronUp, ChevronsDown, ChevronsUp } from "lucide-react";

function Scrollbar() {
  const [scrollInterval, setScrollInterval] = useState(null);

  // Little scroll down
  const handleScrollDown = () => {
    window.scrollBy({
      top: 200,
      behavior: "smooth",
    });
  };

  // Little scroll up
  const handleScrollUp = () => {
    window.scrollBy({
      top: -200,
      behavior: "smooth",
    });
  };

  // Scroll top
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Scroll bottom
  const handleScrollBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  // Continuous scrolling
  const startScroll = (direction) => {
    const interval = setInterval(() => {
      window.scrollBy({
        top: direction === "down" ? 40 : -40, // scroll speed
        behavior: "smooth",
      });
    }, 40); // scroll speed
    setScrollInterval(interval);
  };

  const stopScroll = () => {
    clearInterval(scrollInterval);
    setScrollInterval(null);
  };

  return (
    <div className="fixed right-0 lg:right-50 top-1/2 transform -translate-y-1/2 flex flex-col bg-gray-200 p-2 rounded-lg shadow-lg space-y-2 w-8 lg:w-10 items-center">
      {/* Scroll Bottom */}
      <ChevronsDown
        size={24}
        className="text-gray-600 cursor-pointer hover:bg-gray-800 hover:text-white rounded p-1"
        onClick={handleScrollBottom}
      />

      {/* Scroll Down */}
      <ChevronDown
        size={24}
        className="text-gray-600 cursor-pointer hover:bg-gray-800 hover:text-white rounded p-1"
        onClick={handleScrollDown}
        onMouseDown={() => startScroll("down")}
        onMouseUp={stopScroll}
        onMouseLeave={stopScroll}
      />

      {/* Divider */}
      <div className="w-full h-px bg-gray-400"></div>

      {/* Scroll Up */}
      <ChevronUp
        size={24}
        className="text-gray-600 cursor-pointer hover:bg-gray-800 hover:text-white rounded p-1"
        onClick={handleScrollUp}
        onMouseDown={() => startScroll("up")}
        onMouseUp={stopScroll}
        onMouseLeave={stopScroll}
      />

      {/* Scroll Top */}
      <ChevronsUp
        size={24}
        className="text-gray-600 cursor-pointer hover:bg-gray-800 hover:text-white rounded p-1"
        onClick={handleScrollTop}
      />
    </div>
  );
}

export default Scrollbar;
