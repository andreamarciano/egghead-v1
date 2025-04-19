import { useState, useEffect, useRef } from "react";

const getLifeSound = new Audio("/sounds/maze/get-life.mp3");
const loseLifeSound = new Audio("/sounds/maze/lose-life.mp3");
const gameOverSound = new Audio("/sounds/maze/game-over.mp3");
const winSound = new Audio("/sounds/maze/maze-win.mp3");

export function useGameSounds() {
  /* STATES */

  const [audioEnabled, setAudioEnabled] = useState(true); // master
  const [musicVolume, setMusicVolume] = useState(0.5); // background music
  const [sfxVolume, setSfxVolume] = useState(0.5); // sfx
  const mazeBgMusic = useRef(null);

  /* STATES */

  /* SOUNDS */

  const playSound = (sound) => {
    if (audioEnabled && sound) {
      sound.volume = sfxVolume;
      sound.currentTime = 0;
      sound.play().catch((e) => console.warn("Play error:", e));
    }
  };

  /* SOUNDS */

  /* USEEFFECT */

  // Background Music
  useEffect(() => {
    mazeBgMusic.current = new Audio("/sounds/maze/maze-theme.mp3");
    mazeBgMusic.current.loop = true;
    mazeBgMusic.current.volume = musicVolume;
    return () => {
      mazeBgMusic.current.pause();
    };
  }, []);

  // Background Music Volume
  useEffect(() => {
    if (mazeBgMusic.current) {
      mazeBgMusic.current.volume = musicVolume;
    }
  }, [musicVolume]);

  /* USEEFFECT */

  /* FUNCTIONS */

  const playBackgroundMusic = () => {
    if (audioEnabled) {
      mazeBgMusic.current
        ?.play()
        .catch((e) => console.warn("Autoplay error:", e));
    }
  };

  const pauseBackgroundMusic = () => {
    mazeBgMusic.current?.pause();
  };

  /* FUNCTIONS */

  return {
    getLifeSound,
    loseLifeSound,
    gameOverSound,
    winSound,
    audioEnabled,
    musicVolume,
    sfxVolume,
    playSound,
    playBackgroundMusic,
    pauseBackgroundMusic,
    setAudioEnabled,
    setMusicVolume,
    setSfxVolume,
  };
}
