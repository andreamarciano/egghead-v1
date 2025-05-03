// utils.js
import { createParticle } from "./particle";

export function createParticles(
  { object, color = "#BAA0DE", fades },
  particlesState,
  setParticlesState
) {
  const newParticles = [];
  for (let i = 0; i < 15; i++) {
    newParticles.push(
      createParticle({
        position: {
          x: object.position.x + object.width / 2,
          y: object.position.y + object.height / 2,
        },
        velocity: {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
        },
        radius: Math.random() * 3,
        color,
        fades,
      })
    );
  }
  setParticlesState((prevState) => [...prevState, ...newParticles]);
}

export function backgroundParticles(canvas, setParticlesState) {
  const newParticles = [];
  for (let i = 0; i < 100; i++) {
    newParticles.push(
      createParticle({
        position: {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
        },
        velocity: {
          x: 0,
          y: 0.3,
        },
        radius: Math.random() * 2,
        color: "white",
      })
    );
  }
  setParticlesState(newParticles);
}

export function setupKeyboard(setKeysState, playerState, setProjectilesState) {
  const keys = {
    a: { pressed: false },
    d: { pressed: false },
    ArrowLeft: { pressed: false },
    ArrowRight: { pressed: false },
    space: { pressed: false },
  };

  window.addEventListener("keydown", ({ key }) => {
    switch (key) {
      case "a":
      case "ArrowLeft":
        setKeysState((prevState) => ({ ...prevState, a: { pressed: true } }));
        break;
      case "d":
      case "ArrowRight":
        setKeysState((prevState) => ({ ...prevState, d: { pressed: true } }));
        break;
      case " ":
        if (playerState) {
          setProjectilesState((prevState) => [
            ...prevState,
            createProjectile({
              position: {
                x: playerState.position.x + playerState.width / 2,
                y: playerState.position.y,
              },
              velocity: { x: 0, y: -10 },
            }),
          ]);
        }
        break;
      default:
        break;
    }
  });

  window.addEventListener("keyup", ({ key }) => {
    switch (key) {
      case "a":
      case "ArrowLeft":
        setKeysState((prevState) => ({ ...prevState, a: { pressed: false } }));
        break;
      case "d":
      case "ArrowRight":
        setKeysState((prevState) => ({ ...prevState, d: { pressed: false } }));
        break;
      case " ":
        setKeysState((prevState) => ({
          ...prevState,
          space: { pressed: false },
        }));
        break;
      default:
        break;
    }
  });

  return keys;
}
