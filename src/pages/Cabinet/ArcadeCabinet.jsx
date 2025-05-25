import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import "./ArcadeCabinet.css";
import Navbar from "../../comp/Navbar";
import Cabinet from "./Cabinet";

function ArcadeCabinet() {
  const cabinetImage = "/images/cabinet/cabinet.png";
  const [zoomStage, setZoomStage] = useState("idle");

  const soundNext = new Audio("/sounds/cabinet/next.mp3");
  const soundBack = new Audio("/sounds/cabinet/back.mp3");

  soundNext.volume = 0.3;
  soundBack.volume = 0.3;

  const soundURL = {
    next: soundNext,
    back: soundBack,
  };

  const playSound = (audio) => {
    audio.currentTime = 0;
    audio.play();
  };

  useEffect(() => {
    if (zoomStage === "zooming") {
      const handleKey = (e) => {
        if (e.key === "Enter") {
          setZoomStage("entering");
          playSound(soundURL.next);
        } else if (e.key === "Escape") {
          setZoomStage("zoomingOut");
          playSound(soundURL.back);
        }
      };
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }

    if (zoomStage === "zoomingOut") {
      const timer = setTimeout(() => {
        setZoomStage("idle");
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (zoomStage === "exiting") {
      setZoomStage("idle");
    }
  }, [zoomStage]);

  return (
    <>
      <Navbar />
      <div className="arcade-bg h-screen flex items-center justify-center relative overflow-hidden">
        {/* IDLE - Prima interazione */}
        {zoomStage === "idle" && (
          <motion.div
            initial={{ scale: 1, y: 0 }}
            animate={{ scale: 1, y: 0 }}
            className="relative w-72 md:w-96 cursor-pointer"
            onClick={() => {
              playSound(soundURL.next);
              setZoomStage("zooming");
            }}
          >
            <img
              src={cabinetImage}
              alt="Arcade Cabinet"
              className="arcade-cabinet"
            />
            <div className="press-start absolute top-[33%] left-[50.5%] -translate-x-1/2 text-center text-sm sm:text-md md:text-xl">
              <span>CLICK</span>
              <br />
              <span>HERE</span>
            </div>
          </motion.div>
        )}

        {/* ZOOMING - Siamo davanti allo schermo, si usa ESC */}
        {zoomStage === "zoomingOut" && (
          <motion.div
            initial={{ scale: 3, y: -10 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="relative w-72 md:w-96"
          >
            <img
              src={cabinetImage}
              alt="Arcade Cabinet"
              className="arcade-cabinet"
            />
            <div className="press-start absolute top-[33%] left-[50.5%] -translate-x-1/2 text-center text-[9px] sm:text-[11px] md:text-sm">
              <span>EXIT...</span>
            </div>
          </motion.div>
        )}

        {/* ZOOMING - Siamo davanti allo schermo, si aspetta ENTER */}
        {zoomStage === "zooming" && (
          <motion.div
            initial={{ scale: 1, y: 0 }}
            animate={{ scale: 3, y: -10 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="relative w-72 md:w-96"
          >
            <img
              src={cabinetImage}
              alt="Arcade Cabinet"
              className="arcade-cabinet"
            />
            <div className="press-start absolute top-[33%] left-[50.5%] -translate-x-1/2 text-center text-sm sm:text-md md:text-xl">
              <span>PRESS</span>
              <br />
              <span>ENTER</span>
            </div>
            <div className="absolute top-[48%] left-[50.5%] -translate-x-1/2 text-[3px] sm:text-[5px] md:text-[7px] text-white font-mono opacity-70">
              <span className="text-red-400">ESC</span> to go back
            </div>
          </motion.div>
        )}

        {/* ENTERING - Effetto tuffo */}
        {zoomStage === "entering" && (
          <>
            <motion.div
              initial={{ scale: 3, opacity: 1, filter: "blur(0px)" }}
              animate={{ scale: 8, opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 1 }}
              className="relative w-72 md:w-96"
            >
              <img
                src={cabinetImage}
                alt="Arcade Cabinet"
                className="arcade-cabinet"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute inset-0"
            >
              <Cabinet
                onExit={() => {
                  setZoomStage("exiting");
                  playSound(soundURL.back);
                }}
              />
            </motion.div>
          </>
        )}

        {zoomStage === "exiting" && (
          <motion.div
            initial={{ scale: 8, opacity: 0, filter: "blur(8px)" }}
            animate={{ scale: 3, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5 }}
            className="relative w-72 md:w-96"
          >
            <img
              src={cabinetImage}
              alt="Arcade Cabinet"
              className="arcade-cabinet"
            />
          </motion.div>
        )}
      </div>
    </>
  );
}

export default ArcadeCabinet;
