import { useState, useEffect } from "react";
import Navbar from "../comp/Navbar";
import { getUnlockedGames, GameNames } from "../comp/game/gameUnlocker";

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
      <Navbar />
      <div className="p-8 text-white">
        <h1 className="text-3xl font-bold mb-6">Arcade Cabinet</h1>

        <ul className="space-y-3">
          {unlockedGames.map((game) => (
            <li key={game} className="bg-gray-800 p-4 rounded-md">
              <strong>{game}</strong>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Cabinet;
