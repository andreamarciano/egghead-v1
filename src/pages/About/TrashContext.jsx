import { createContext, useContext, useState } from "react";

const TrashContext = createContext();

export const useTrash = () => useContext(TrashContext);

export const TrashProvider = ({ children }) => {
  const [texts, setTexts] = useState([]);

  const addToTrash = (text) => {
    setTexts((prev) => [...prev, text]);
  };

  return (
    <TrashContext.Provider value={{ texts, addToTrash }}>
      {children}
    </TrashContext.Provider>
  );
};
