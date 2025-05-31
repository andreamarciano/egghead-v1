import { useRef, useState, useEffect } from "react";
import { useTrash } from "../trash/TrashContext";
import "./TiltDiv.css";

const TiltDiv = () => {
  const containerRef = useRef(null);
  const [angle, setAngle] = useState(0);
  const angleRef = useRef(0);
  const [dragging, setDragging] = useState(false);
  const [phase2Active, setPhase2Active] = useState(false);
  const startY = useRef(0);
  const initialAngle = useRef(0);
  const maxAngle = 70;
  const threshold = 50;
  const { addToTrash } = useTrash(); // context

  const content = (
    <>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Our Mission</h2>
      <p className="text-gray-600 max-w-2xl mb-2">
        Our goal is to <strong>revolutionize the concept of eggs</strong>. We
        don’t just sell eggs — we sell experiences! Our mission is to combine{" "}
        <strong>science, innovation, and a pinch of madness</strong> to create
        the best product possible.
      </p>
    </>
  );

  /* === LETTERS === */
  // letters: array of { char: string, fallen: boolean }
  const [letters, setLetters] = useState([]);
  // Extract plain text from React nodes (recursive)
  const extractStyledLetters = (node, parentStyle = {}) => {
    if (typeof node === "string") {
      return node.split("").map((char, i) => ({
        char,
        fallen: false,
        style: parentStyle,
        id: Math.random().toString(36).substr(2, 9), // unique ID
      }));
    }

    if (Array.isArray(node)) {
      return node.flatMap((child) => extractStyledLetters(child, parentStyle));
    }

    if (node?.props?.children) {
      // Compose inherited styles
      const newStyle = { ...parentStyle };
      const className = node.props.className || "";

      if (node.type === "strong") newStyle.fontWeight = "bold";
      if (node.type === "h2") {
        newStyle.fontSize = "1.5rem";
        newStyle.fontWeight = "600";
        newStyle.marginBottom = "0.5rem";
      }

      // Additional parsing from className if needed
      if (className.includes("text-2xl")) newStyle.fontSize = "1.5rem";
      if (className.includes("font-semibold")) newStyle.fontWeight = "600";
      if (className.includes("text-gray-700")) newStyle.color = "#374151";
      if (className.includes("text-gray-600")) newStyle.color = "#4B5563";

      return extractStyledLetters(node.props.children, newStyle);
    }

    return [];
  };
  // Extract text from the fixed content
  useEffect(() => {
    const arr = extractStyledLetters(content);
    setLetters(arr);
  }, []);

  // --- Mouse down: start dragging ---
  const handleMouseDown = (e) => {
    setDragging(true);
    startY.current = e.clientY;
    initialAngle.current = angleRef.current;

    console.log("🟢 Mouse down - Start dragging");
    console.log("Start Y:", startY.current);
    console.log("Initial angle:", initialAngle.current);

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

    angleRef.current = newAngle;
    setAngle(newAngle);

    console.log("↔️ Mouse move - Angle updated:", newAngle);
  };

  // --- Mouse up: stop dragging and reset angle if needed ---
  const handleMouseUp = () => {
    setDragging(false);
    document.body.style.userSelect = ""; // Restore text selection

    console.log("🔴 Mouse up - Stop dragging");
    console.log("Final angle (ref):", angleRef.current);

    angleRef.current = 0;
    setAngle(0);
    console.log("🔁 Resetting angle to 0");
  };

  /* Dynamically activate/deactivate Phase 2 */
  useEffect(() => {
    if (angle >= threshold && !phase2Active) {
      console.log("✅ Entering Phase 2 (angle >= threshold)");
      setPhase2Active(true);
    } else if (angle < threshold && phase2Active) {
      setTimeout(() => {
        setPhase2Active(false);
        console.log("⏪ Exiting Phase 2 (angle < threshold)");
      }, 400);
    }
  }, [angle, phase2Active]);

  /* === Progressive letter drop animation === */
  useEffect(() => {
    if (!phase2Active) return;

    if (letters.every((l) => l.fallen)) {
      // All letters have fallen
      setPhase2Active(false);
      return;
    }

    const interval = setInterval(() => {
      setLetters((oldLetters) => {
        // Find the first letter that hasn't fallen yet
        const idx = oldLetters.findIndex((l) => !l.fallen);
        if (idx === -1) {
          clearInterval(interval);
          setPhase2Active(false);
          return oldLetters;
        }
        // Mark the letter as fallen
        const newLetters = [...oldLetters];
        newLetters[idx] = { ...newLetters[idx], fallen: true };
        // Send letter to trash
        setTimeout(() => addToTrash(newLetters[idx].char), 500);
        return newLetters;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [phase2Active, letters, addToTrash]);

  /* === Mouse events based on dragging state === */
  useEffect(() => {
    if (dragging) {
      console.log("🎯 Adding mouse event listeners");
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      console.log("🚫 Removing mouse event listeners");
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

      {/* --- Tiltable container --- */}
      <div
        ref={containerRef}
        style={{
          transform: `rotateZ(-${angle}deg)`,
          transformOrigin: "left center",
          transition: dragging ? "none" : "transform 0.4s ease",
          // fixed dimensions
          minHeight: "4rem",
          minWidth: "100%",
          position: "relative",
          overflow: "hidden",
        }}
        className={`bg-gradient-to-r from-orange-200 via-green-200 to-blue-200 
          rounded-tr-3xl rounded-bl-3xl shadow-2xl shadow-blue-600/80 
          p-4 text-center ${dragging ? "select-none" : ""}`}
      >
        {/* Render Single Letter */}
        {letters.map(({ char, fallen, id, style }) => (
          <span
            key={id}
            className={`inline-block relative transition-transform duration-500 ease-in-out ${
              fallen ? "letter-fallen" : ""
            }`}
            style={{
              transform: fallen
                ? "translate(-30px, 60px) rotate(-45deg)"
                : "none",
              opacity: fallen ? 0 : 1,
              transitionProperty: "transform, opacity",
              whiteSpace: "pre", // preserve spacing
              ...style,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TiltDiv;
