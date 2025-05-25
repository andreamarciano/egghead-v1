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
      const timer = setTimeout(() => {
        setZoomStage("entered");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [zoomStage]);

  return (
    <>
      <Navbar />
      <div className="arcade-bg h-screen flex items-center justify-center relative overflow-hidden">
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
              <span>PRESS</span>
              <br />
              <span>START</span>
            </div>
          </motion.div>
        )}

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
              <span>START</span>
            </div>
          </motion.div>
        )}

        {zoomStage === "entered" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Cabinet />
          </motion.div>
        )}
      </div>
    </>
  );
}

export default ArcadeCabinet;
