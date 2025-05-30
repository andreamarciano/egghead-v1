import { useEffect, useRef, useState } from "react";
import "./MeltingDiv.css";
import { useTrash } from "../trash/TrashContext";

const MeltingDiv = ({ children }) => {
  const { addToTrash } = useTrash();

  const [hovering, setHovering] = useState(false);
  const [heatLevel, setHeatLevel] = useState(0); // 0 to 1
  const [melting, setMelting] = useState(false);
  const timerRef = useRef(null);

  // Handle hover timer
  useEffect(() => {
    if (hovering) {
      let elapsed = 0;
      timerRef.current = setInterval(() => {
        elapsed += 100;
        setHeatLevel(Math.min(1, elapsed / 5000));
        if (elapsed >= 5000) {
          clearInterval(timerRef.current);
          setMelting(true);
        }
      }, 100);
    } else {
      clearInterval(timerRef.current);
      // Cool down gradually
      const cooldown = setInterval(() => {
        setHeatLevel((prev) => {
          const next = Math.max(0, prev - 0.05);
          if (next === 0) clearInterval(cooldown);
          return next;
        });
      }, 100);
    }
    return () => clearInterval(timerRef.current);
  }, [hovering]);

  // Extract and send text when melting ends
  useEffect(() => {
    if (melting) {
      const timeout = setTimeout(() => {
        const extractText = (node) => {
          if (typeof node === "string") return node;
          if (Array.isArray(node)) return node.map(extractText).join(" ");
          if (node?.props?.children) return extractText(node.props.children);
          return "";
        };
        const text = extractText(children);
        addToTrash(text);
      }, 2000); // match with animation duration
      return () => clearTimeout(timeout);
    }
  }, [melting]);

  // Determine background color based on heat
  const bgColor =
    heatLevel < 0.3
      ? "from-yellow-200 to-red-300"
      : heatLevel < 0.7
      ? "from-orange-300 to-red-400"
      : "from-red-500 to-yellow-500";

  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={`relative flex flex-col items-center justify-center w-full max-w-2xl mx-auto text-center p-2 m-10 rounded-4xl shadow-2xl shadow-red-500 transition-all duration-300 
        bg-gradient-to-r ${bgColor} ${melting ? "animate-melt" : ""}`}
    >
      {children}
    </div>
  );
};

export default MeltingDiv;
