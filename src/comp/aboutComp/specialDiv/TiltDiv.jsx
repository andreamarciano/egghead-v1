import { useRef, useState, useEffect } from "react";
import { useTrash } from "../trash/TrashContext";
import "./TiltDiv.css";

const TiltDiv = ({ children }) => {
  const containerRef = useRef(null);
  const [angle, setAngle] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startY = useRef(0);
  const initialAngle = useRef(0);
  const maxAngle = 70;

  // --- Mouse down: start dragging ---
  const handleMouseDown = (e) => {
    setDragging(true);
    startY.current = e.clientY;
    initialAngle.current = angle;

    // Disable global text selection
    document.body.style.userSelect = "none";
  };

  // --- Mouse move: update rotation based on movement ---
  const handleMouseMove = (e) => {
    if (!dragging) return;
    const dy = startY.current - e.clientY;
    const sensitivity = 10;
    let newAngle = initialAngle.current + dy / sensitivity;
    if (newAngle < 0) newAngle = 0;
    if (newAngle > maxAngle) newAngle = maxAngle;
    setAngle(newAngle);
  };

  // --- Mouse up: stop dragging and reset angle if needed ---
  const handleMouseUp = () => {
    setDragging(false);
    document.body.style.userSelect = ""; // Restore text selection

    if (angle >= 50) {
      // trigger phase 2
    } else {
      setAngle(0);
    }
  };

  /* === Mouse events based on dragging state === */
  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = ""; // Failsafe reset
    };
  }, [dragging]);

  return (
    <div
      className={`relative w-full max-w-2xl mx-auto my-6 ${
        dragging ? "cursor-grabbing select-none" : ""
      }`}
    >
      {/* --- Drag handle area --- */}
      <div
        className={`absolute top-0 right-0 w-6 h-full z-20 bg-red-500 ${
          dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onMouseDown={handleMouseDown}
      />

      {/* --- Tiltable content --- */}
      <div
        ref={containerRef}
        style={{
          transform: `rotateZ(-${angle}deg)`,
          transformOrigin: "left center",
          transition: dragging ? "none" : "transform 0.4s ease",
        }}
        className={`bg-gradient-to-r from-orange-200 via-green-200 to-blue-200 
          rounded-tr-3xl rounded-bl-3xl shadow-2xl shadow-blue-600/80 
          p-4 text-center ${dragging ? "select-none" : ""}`}
      >
        {children}
      </div>
    </div>
  );
};

export default TiltDiv;
