import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Cabinet.css";
import { getUnlockedGames, getTopScore } from "../../comp/game/gameUnlocker";
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
  const games = useSelector((state) => state.cabinet.value);
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
    <div className="cabinet-container">
      <div className="cabinet-body">
        <div className="cabinet-header">ARCADE</div>
        <div className="scene">
          <div className="carousel keen-slider" ref={sliderRef}>
            {games
              .filter((game) => unlockedGames.includes(game.id))
              .map((game, index) => {
                const topScore = getTopScore(game.id); // qui, dentro la funzione di map ma prima del return JSX
                return (
                  <div key={index} className="carousel__cell crt-effect">
                    <h3 className="game-title">{game.title}</h3>
                    <p className="game-desc">{game.description}</p>
                    {topScore !== null && (
                      <p className="game-score">🏆 Record: {topScore}</p>
                    )}
                    <button className="play-button">PLAY</button>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="cabinet-controls">
          <div className="button-wrapper">
            <div className="button red">
              <button
                className="bg-green-500 opacity-10 w-7 h-7 cursor-pointer"
                onClick={goLeft}
              ></button>
            </div>
            <div className="button-label">←</div>
          </div>
          <div className="button-wrapper">
            <div className="button blue">
              <button
                className="bg-green-500 opacity-10 w-7 h-7 cursor-pointer"
                onClick={spinCarousel}
              ></button>
            </div>
            <div className="button-label">🎲</div>
          </div>
          <div className="button-wrapper">
            <div className="button yellow">
              <button
                className="bg-green-500 opacity-10 w-7 h-7 cursor-pointer"
                onClick={goRight}
              ></button>
            </div>
            <div className="button-label">→</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cabinet;
