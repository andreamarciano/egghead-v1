import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Cabinet.css";
import { getUnlockedGames, getTopScore } from "../../comp/game/gameUnlocker";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import Tris from "../../comp/game/Tris/Tris";
import Flower from "../../comp/game/Flower/Flower";
import ConnectFour from "../../comp/game/ConnectFour/ConnectFour";
import OrderGame from "../../comp/game/Order/OrderGame";
import SpaceInvaders from "../../comp/game/SpaceInvaders/SpaceInvaders";

function Cabinet({ onExit }) {
  const games = useSelector((state) => state.cabinet.value);
  const [unlockedGames, setUnlockedGames] = useState(getUnlockedGames());
  const [openGameId, setOpenGameId] = useState(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onExit();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onExit]);

  useEffect(() => {
    const onGameUnlocked = () => {
      setUnlockedGames(getUnlockedGames());
    };

    window.addEventListener("gameUnlocked", onGameUnlocked);

    return () => {
      window.removeEventListener("gameUnlocked", onGameUnlocked);
    };
  }, []);

  const carousel = (slider) => {
    const z = 300;
    function rotate() {
      const deg = 360 * slider.track.details.progress;
      slider.container.style.transform = `translateZ(-${z}px) rotateY(${-deg}deg)`;
    }
    slider.on("created", () => {
      const deg = 360 / slider.slides.length;
      slider.slides.forEach((el, idx) => {
        el.style.transform = `rotateY(${deg * idx}deg) translateZ(${z}px)`;
      });
      rotate();
    });
    slider.on("detailsChanged", rotate);
  };

  const [sliderRef, slider] = useKeenSlider(
    {
      loop: true,
      selector: ".carousel__cell",
      renderMode: "custom",
      mode: "free-snap",
    },
    [carousel]
  );

  const spinCarousel = () => {
    if (!slider.current) return;

    const availableGames = games.filter((game) =>
      unlockedGames.includes(game.id)
    );

    const randomIndex = Math.floor(Math.random() * availableGames.length);
    const totalSpins = 10 + randomIndex;
    let count = 0;
    let delay = 100;

    const spin = () => {
      slider.current.next();
      count++;

      if (count < totalSpins) {
        delay += 20; // slow down
        setTimeout(spin, delay);
      }
    };

    spin();
  };

  const goLeft = () => {
    slider.current?.prev();
  };

  const goRight = () => {
    slider.current?.next();
  };

  return (
    <div className="flex justify-center items-center bg-[#0a0a0a] h-screen p-8">
      <div
        className="cabinet-body w-[800px] h-[600px] bg-[#333333] flex flex-col items-center justify-between p-4 relative border-[8px] border-[#111111] rounded-[20px] overflow-hidden"
        style={{
          boxShadow: "0 0 20px #0ff",
        }}
      >
        <div className="font-['Press_Start_2P'] text-[1.2rem] text-[#ff0044] mb-4">
          ARCADE
        </div>
        <div className="scene">
          <div className="carousel keen-slider" ref={sliderRef}>
            {games
              .filter((game) => unlockedGames.includes(game.id))
              .map((game, index) => {
                const topScore = getTopScore(game.id);
                return (
                  <div key={index} className="carousel__cell crt-effect">
                    <h3 className="text-[19px] font-bold mb-2">{game.title}</h3>
                    <p className="text-sm text-center mb-2">
                      {game.description}
                    </p>
                    {topScore !== null && (
                      <p className="text-[13px] mb-2">🏆 Record: {topScore}</p>
                    )}
                    <button
                      onClick={() => setOpenGameId(game.id)}
                      className="bg-lime-500 text-black font-bold px-4 py-2 rounded-md cursor-pointer transition-transform duration-100 hover:scale-110"
                      style={{
                        boxShadow: "0 0 7px #0f0",
                      }}
                    >
                      PLAY
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
        {/* Cabinet Controls */}
        <div className="flex gap-4 mt-4">
          {[
            { color: "bg-red-600", label: "←", onClick: goLeft },
            { color: "bg-blue-900", label: "🎲", onClick: spinCarousel },
            { color: "bg-yellow-500", label: "→", onClick: goRight },
          ].map(({ color, label, onClick }, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1">
              <div
                className={`w-[30px] h-[30px] rounded-full ${color} transition-transform active:translate-y-[2px]`}
                style={{
                  boxShadow: "inset 0 0 5px #000",
                }}
              >
                <button
                  onClick={onClick}
                  className="w-full h-full cursor-pointer"
                ></button>
              </div>
              <div
                className="font-['Press_Start_2P'] text-[0.55rem] text-green-500 leading-none"
                style={{ textShadow: "0 0 2px #0f0" }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Render */}
      {openGameId === "Tris" && <Tris onClose={() => setOpenGameId(null)} />}
      {openGameId === "Flower" && (
        <Flower onClose={() => setOpenGameId(null)} />
      )}
      {openGameId === "ConnectFour" && (
        <ConnectFour onClose={() => setOpenGameId(null)} />
      )}
      {openGameId === "OrderGame" && (
        <OrderGame onClose={() => setOpenGameId(null)} />
      )}
      {openGameId === "SpaceInvaders" && (
        <SpaceInvaders onClose={() => setOpenGameId(null)} />
      )}
    </div>
  );
}

export default Cabinet;
