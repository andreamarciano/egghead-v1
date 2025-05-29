import { createContext, useContext, useState } from "react";

const TrashContext = createContext();

export const useTrash = () => useContext(TrashContext);

export const TrashProvider = ({ children }) => {
  const [pendingLetters, setPendingLetters] = useState([]);
  const [fallingLetters, setFallingLetters] = useState([]);
  const [dumpedLetters, setDumpedLetters] = useState([]);

  // Add to Trash Collector
  const addToTrash = (text) => {
    const letters = text.split("").filter((char) => char.trim().length > 0);
    setPendingLetters((prev) => [...prev, ...letters]);
  };

  // Dump Trash Collector
  const dumpTrash = () => {
    const generateLetterData = (char) => ({
      char,
      top: `${Math.random() * 97}%`,
      left: `${Math.random() * 97}%`,
      rotate: `${Math.random() * 60 - 30}deg`,
      id: crypto.randomUUID(),
    });

    const letterData = pendingLetters.map(generateLetterData);

    setFallingLetters([...pendingLetters]);

    setTimeout(() => {
      setDumpedLetters((prev) => [...prev, ...letterData]);
      setFallingLetters([]);
      setPendingLetters([]);
    }, 800);
  };

  return (
    <TrashContext.Provider
      value={{
        pendingLetters,
        fallingLetters,
        dumpedLetters,
        addToTrash,
        dumpTrash,
      }}
    >
      {children}
    </TrashContext.Provider>
  );
};
