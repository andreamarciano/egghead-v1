import "./FallingDiv.css";
import { useState, useEffect } from "react";

const soundURL = {
  pop: { src: "/sounds/about/pop.mp3", volume: 0.4 },
  creaks: { src: "/sounds/about/creaks.mp3", volume: 0.2 },
  woosh: { src: "/sounds/about/woosh.mp3", volume: 0.5 },
};

const playSound = (key) => {
  const sound = soundURL[key];
  if (!sound) return;

  const audio = new Audio(sound.src);
  audio.volume = sound.volume ?? 1.0;
  audio.play();
};

const FallingDiv = ({ children }) => {
  const [rightPinRemoved, setRightPinRemoved] = useState(false);
  const [leftPinRemoved, setLeftPinRemoved] = useState(false);
  const [rightPinFalling, setRightPinFalling] = useState(false);
  const [leftPinFalling, setLeftPinFalling] = useState(false);
  const [divFalling, setDivFalling] = useState(false);

  useEffect(() => {
    if (rightPinRemoved && !leftPinRemoved) {
      playSound("creaks");

      const timer = setTimeout(() => {
        setLeftPinFalling(true);
        setTimeout(() => setLeftPinRemoved(true), 1000);
        playSound("pop");

        setDivFalling(true);
        setTimeout(() => playSound("woosh"), 100);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [rightPinRemoved]);

  const handleRightPinClick = () => {
    setRightPinFalling(true);
    playSound("pop");

    setTimeout(() => setRightPinRemoved(true), 1000);
  };

  const divState = divFalling ? "fall" : rightPinRemoved ? "swing" : "still";

  return (
    <div className="relative inline-block pt-4 mb-8">
      {/* Puntina sinistra */}
      {!leftPinRemoved && (
        <div
          className={`absolute top-0 left-0 z-10 text-xl select-none ${
            leftPinFalling ? "animate-pin-fall-left" : ""
          }`}
        >
          📌
        </div>
      )}

      {/* Puntina destra cliccabile */}
      {!rightPinRemoved && (
        <div
          className={`absolute top-0 right-0 z-10 text-xl cursor-pointer select-none ${
            rightPinFalling ? "animate-pin-fall" : ""
          }`}
          onClick={handleRightPinClick}
        >
          📌
        </div>
      )}

      {/* Contenuto */}
      <div
        className={`bg-gradient-to-r from-orange-200 via-green-200 to-blue-200 rounded-br-3xl rounded-bl-3xl shadow-2xl shadow-blue-600/80 transition-transform origin-top-left ${
          divState === "swing"
            ? "animate-swing"
            : divState === "fall"
            ? "animate-fall"
            : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default FallingDiv;
