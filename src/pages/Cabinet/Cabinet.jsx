import { useState, useEffect } from "react";
import "./Cabinet.css";
import { getUnlockedGames } from "../../comp/game/gameUnlocker";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

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

function Cabinet() {
  // const [unlockedGames, setUnlockedGames] = useState(getUnlockedGames());
  const [unlockedGames, setUnlockedGames] = useState([
    {
      title: "Tris",
      description: "Sfreccia tra i neon evitando gli ostacoli.",
      highscore: "9320",
    },
    {
      title: "Flower",
      description: "Distruggi le navicelle aliene prima che ti colpiscano!",
      highscore: "7280",
    },
    {
      title: "Connect Four",
      description: "Mastica pixel e diventa infinito!",
      highscore: "10450",
    },
    {
      title: "Order",
      description: "Rimbalza la pallina per distruggere i blocchi.",
      highscore: "8820",
    },
    {
      title: "Space Invaders",
      description: "Difendi la Terra da onde di alieni pixelati.",
      highscore: "13370",
    },
  ]);
  useEffect(() => {
    const onGameUnlocked = () => {
      setUnlockedGames(getUnlockedGames());
    };

    window.addEventListener("gameUnlocked", onGameUnlocked);

    return () => {
      window.removeEventListener("gameUnlocked", onGameUnlocked);
    };
  }, []);

  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      selector: ".carousel__cell",
      renderMode: "custom",
      mode: "free-snap",
    },
    [carousel]
  );

  return (
    <div className="cabinet-container">
      <div className="cabinet-body">
        <div className="cabinet-header">ARCADE</div>
        <div className="scene">
          <div className="carousel keen-slider" ref={sliderRef}>
            {unlockedGames.map((game, index) => (
              <div key={index} className="carousel__cell crt-effect">
                <h3 className="game-title">{game.title}</h3>
                <p className="game-desc">{game.description}</p>
                {game.highscore && (
                  <p className="game-score">🏆 Record: {game.highscore}</p>
                )}
                <button className="play-button">PLAY</button>
              </div>
            ))}
          </div>
        </div>
        <div className="cabinet-controls">
          <div className="button red">
            <button className="bg-green-500 opacity-10 w-7 h-7 cursor-pointer"></button>
          </div>
          <div className="button blue">
            <button className="bg-green-500 opacity-10 w-7 h-7 cursor-pointer"></button>
          </div>
          <div className="button yellow">
            <button className="bg-green-500 opacity-10 w-7 h-7 cursor-pointer"></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cabinet;
