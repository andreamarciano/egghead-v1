import { useState, useEffect, useRef } from "react";
function SpaceInvaders({ onClose }) {
  const canvasRef = useRef(null);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border border-white bg-black"
      />
      {/* Close */}
      <button
        onClick={onClose}
        className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded"
      >
        ✖
      </button>
    </>
  );
}

export default SpaceInvaders;
