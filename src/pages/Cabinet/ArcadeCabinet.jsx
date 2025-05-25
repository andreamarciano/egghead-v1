import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "../../comp/Navbar";
import Cabinet from "./Cabinet";

const cabinetImage = "/images/cabinet/cabinet.png";

function ArcadeCabinet() {
  const [zoomedIn, setZoomedIn] = useState(false);

  return (
    <>
      <Navbar />
      <div className="bg-blue-950 h-screen flex items-center justify-center relative overflow-hidden">
        {!zoomedIn && (
          <motion.img
            src={cabinetImage}
            alt="Arcade Cabinet"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1 }}
            exit={{ scale: 3, opacity: 0 }}
            transition={{ duration: 1 }}
            className="cursor-pointer w-72 md:w-96"
            onClick={() => setZoomedIn(true)}
          />
        )}

        {zoomedIn && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
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
