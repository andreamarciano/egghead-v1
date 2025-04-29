import { useState, useEffect, useRef } from "react";
function SpaceInvaders({ onClose }) {
  /* STATES */
  const canvasRef = useRef(null);

  /* USEEFFECT */

  // Disable Scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 z-50">
      {/* Canvas */}
      <div className="relative flex flex-col items-center">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="border border-white bg-black"
        />
      </div>
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-white"
      >
        ✖
      </button>
    </div>
  );
}

export default SpaceInvaders;
