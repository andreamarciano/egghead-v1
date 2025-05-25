import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Cabinet.css";
import { getUnlockedGames } from "../../comp/game/gameUnlocker";
// import "keen-slider/keen-slider.min.css";
// import { useKeenSlider } from "keen-slider/react";

function Cabinet() {
  const [unlockedGames, setUnlockedGames] = useState(getUnlockedGames());
  useEffect(() => {
    const onGameUnlocked = () => {
      setUnlockedGames(getUnlockedGames());
    };

    window.addEventListener("gameUnlocked", onGameUnlocked);

    return () => {
      window.removeEventListener("gameUnlocked", onGameUnlocked);
    };
  }, []);

  return (
    <>
      <div className="cabinet-container">
        <motion.div
          className="cabinet-body"
          initial={{ scale: 0.6, y: -100, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="cabinet-header">ARCADE</div>
          <div className="cabinet-screen">
            <ul className="grid grid-cols-2 gap-4">
              {unlockedGames.map((game) => (
                <li
                  key={game}
                  className="bg-black text-green-400 p-4 rounded border border-green-500 shadow-inner"
                >
                  {game}
                </li>
              ))}
            </ul>
          </div>
          <div className="cabinet-controls">
            <div className="button red" />
            <div className="button blue" />
            <div className="button yellow" />
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default Cabinet;
