import { useEffect, useRef, useState } from "react";
import "./MeltingDiv.css";
import { useTrash } from "../trash/TrashContext";

const MeltingDiv = ({ children }) => {
  // === SOUND ===
  const soundURL = {
    lava: { src: "/sounds/about/lava5.mp3", volume: 0.5 },
    melting: { src: "/sounds/about/lava2.mp3", volume: 0.9 },
    steam: { src: "/sounds/about/steam.mp3", volume: 0.3 },
  };

  const audioRefs = useRef({
    lava: null,
    steam: null,
    melting: null,
  });

  const playLoopedSound = (key) => {
    const sound = soundURL[key];
    if (!sound) return;

    if (!audioRefs.current[key]) {
      const audio = new Audio(sound.src);
      audio.loop = true;
      audio.volume = sound.volume ?? 1.0;
      audioRefs.current[key] = audio;
    }

    const audio = audioRefs.current[key];
    if (audio.paused) audio.play();
  };

  const stopSound = (key) => {
    const audio = audioRefs.current[key];
    if (audio && !audio.paused) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const playOneShot = (key) => {
    const sound = soundURL[key];
    if (!sound) return;
    const audio = new Audio(sound.src);
    audio.volume = sound.volume ?? 1.0;
    audio.play();
  };

  const { addToTrash } = useTrash(); // context

  const [hovering, setHovering] = useState(false);
  const [heatLevel, setHeatLevel] = useState(0); // 0 to 1
  const [melting, setMelting] = useState(false);
  const timerRef = useRef(null);
  const hoverStartTimeRef = useRef(null);
  const [isDead, setIsDead] = useState(false);

  // Utility per interpolare un colore da giallo (h=50) a rosso (h=0)
  const getInterpolatedColor = (level) => {
    const hue = 50 - level * 50; // da 50 (giallo) a 0 (rosso)
    return `hsl(${hue}, 100%, 70%)`;
  };

  // Handle hover timer
  useEffect(() => {
    if (isDead) return;

    if (hovering) {
      playLoopedSound("lava");

      let elapsed = 0;
      timerRef.current = setInterval(() => {
        elapsed += 100;
        setHeatLevel(Math.min(1, elapsed / 5000));
        if (elapsed >= 5000) {
          clearInterval(timerRef.current);
          stopSound("lava");
          setMelting(true);
          hoverStartTimeRef.current = null;
        }
      }, 100);
    } else {
      clearInterval(timerRef.current);
      stopSound("lava");

      // raffreddamento visuale
      const cooldown = setInterval(() => {
        setHeatLevel((prev) => {
          const next = Math.max(0, prev - 0.05);
          if (next === 0) clearInterval(cooldown);
          return next;
        });
      }, 100);
    }

    return () => {
      clearInterval(timerRef.current);
      stopSound("lava");
    };
  }, [hovering, isDead]);

  // Extract and send text when melting ends
  useEffect(() => {
    if (melting) {
      playOneShot("melting");
      const timeout = setTimeout(() => {
        const extractText = (node) => {
          if (typeof node === "string") return node;
          if (Array.isArray(node)) return node.map(extractText).join(" ");
          if (node?.props?.children) return extractText(node.props.children);
          return "";
        };
        const text = extractText(children);
        addToTrash(text);

        setIsDead(true);
      }, 2000); // match with animation duration
      return () => clearTimeout(timeout);
    }
  }, [melting]);

  // Determine Bg Color based on heat
  const bgColor = getInterpolatedColor(heatLevel);
  // Determine Shake Intensity based on heat
  const shake = heatLevel > 0.7 && !melting ? "animate-shake" : "";
  // Lava Lapilli colors
  const lapilliColors = ["#ff4500", "#ff8c00", "#ffd700"];

  const handleMouseEnter = () => {
    if (isDead) return;
    setHovering(true);
    hoverStartTimeRef.current = Date.now(); // salva inizio hover
  };

  const handleMouseLeave = () => {
    if (isDead) return;
    setHovering(false);

    const hoverDuration = Date.now() - hoverStartTimeRef.current;

    // suona steam solo se è stato sopra almeno 2s
    if (hoverDuration >= 2000 && heatLevel > 0) {
      playOneShot("steam");
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        background: `linear-gradient(to right, ${bgColor}, ${bgColor})`,
        transition: "background 0.2s linear",
      }}
      className={`relative flex flex-col items-center justify-center w-full max-w-2xl mx-auto text-center p-2 m-10 rounded-4xl shadow-2xl shadow-red-500 transition-all duration-300 ${
        melting ? "animate-melt" : ""
      } ${shake}`}
    >
      {children}

      {/* Lapilli */}
      {Array.from({ length: Math.floor(heatLevel * 10) }).map((_, i) => {
        const color =
          lapilliColors[Math.floor(Math.random() * lapilliColors.length)];
        return (
          <span
            key={i}
            className="absolute top-0 w-2 h-2 rounded-full opacity-70 animate-lapilli"
            style={{
              left: `${Math.random() * 100}%`,
              backgroundColor: color,
              animationDelay: `${Math.random()}s`,
            }}
          ></span>
        );
      })}

      {/* Drip */}
      {!melting && heatLevel > 0.5 && (
        <>
          <div
            className="drip-chunk rotate-drip-left"
            style={{
              left: "12%",
              width: "14px",
              height: "28px",
              backgroundColor: getInterpolatedColor(heatLevel),
              animationDelay: "0.4s",
            }}
          />
          <div
            className="drip-chunk"
            style={{
              left: "28%",
              width: "20px",
              height: "40px",
              backgroundColor: getInterpolatedColor(heatLevel),
              animationDelay: "1.2s",
            }}
          />
          <div
            className="drip-chunk rotate-drip-right"
            style={{
              left: "38%",
              width: "10px",
              height: "22px",
              backgroundColor: getInterpolatedColor(heatLevel),
              animationDelay: "1.5s",
            }}
          />
          <div
            className="drip-chunk"
            style={{
              left: "52%",
              width: "18px",
              height: "35px",
              backgroundColor: getInterpolatedColor(heatLevel),
              animationDelay: "1.9s",
            }}
          />
          <div
            className="drip-chunk"
            style={{
              left: "63%",
              width: "12px",
              height: "30px",
              backgroundColor: getInterpolatedColor(heatLevel),
              animationDelay: "2.2s",
            }}
          />
          <div
            className="drip-chunk rotate-drip-left"
            style={{
              left: "78%",
              width: "16px",
              height: "38px",
              backgroundColor: getInterpolatedColor(heatLevel),
              animationDelay: "2.6s",
            }}
          />
          <div
            className="drip-chunk rotate-drip-right"
            style={{
              left: "88%",
              width: "14px",
              height: "25px",
              backgroundColor: getInterpolatedColor(heatLevel),
              animationDelay: "3.1s",
            }}
          />
        </>
      )}
    </div>
  );
};

export default MeltingDiv;
