import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import "./ArcadeCabinet.css";
import Navbar from "../../comp/Navbar";
import Cabinet from "./Cabinet";

const cabinetImage = "/images/cabinet/cabinet.png";

function ArcadeCabinet() {
  const [zoomStage, setZoomStage] = useState("idle");

  useEffect(() => {
    if (zoomStage === "zooming") {
      const handleEnter = (e) => {
        if (e.key === "Enter") {
          setZoomStage("entering");
        }
      };
      window.addEventListener("keydown", handleEnter);
      return () => window.removeEventListener("keydown", handleEnter);
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
            onClick={() => setZoomStage("zooming")}
          >
            <img
              src={cabinetImage}
              alt="Arcade Cabinet"
              className="arcade-cabinet"
            />
            <div className="press-start absolute top-[33%] left-[50.5%] -translate-x-1/2 text-center text-xl">
              <span>CLICK</span>
              <br />
              <span>HERE</span>
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
            <div className="press-start absolute top-[33%] left-[50.5%] -translate-x-1/2 text-center text-xl">
              <span>PRESS</span>
              <br />
              <span>ENTER</span>
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
              <Cabinet />
            </motion.div>
          </>
        )}
      </div>
    </>
  );
}

export default ArcadeCabinet;
