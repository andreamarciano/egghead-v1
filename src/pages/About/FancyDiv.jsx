import { useState, useRef } from "react";
import "./About.css"; // Dove hai definito animate-swing e animate-fall

const FancyDiv = ({ children }) => {
  const [state, setState] = useState("idle"); // idle, scaling, swinging, falling, gone
  const hoverRef = useRef(null);
  const fallRef = useRef(null);

  const handleMouseEnter = () => {
    if (state === "gone") return;
    setState("scaling");

    hoverRef.current = setTimeout(() => {
      setState("swinging");

      fallRef.current = setTimeout(() => {
        setState("falling");
        setTimeout(() => setState("gone"), 1000);
      }, 4000);
    }, 2000);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverRef.current);
    clearTimeout(fallRef.current);

    if (state === "scaling") setState("idle");
  };

  if (state === "gone") return null;

  const classNames = `
    flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-2 mb-6
    transition-all duration-[3000ms] origin-top-right
    ${state === "scaling" ? "scale-150" : ""}
    ${state === "swinging" ? "animate-swing" : ""}
    ${state === "falling" ? "animate-fall" : ""}
  `;

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={classNames}
    >
      {children}
    </div>
  );
};

export default FancyDiv;
