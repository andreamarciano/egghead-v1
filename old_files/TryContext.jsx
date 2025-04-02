import { createContext, useState } from "react";

const TryContext = createContext({});

const TryProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  return (
    <TryContext.Provider value={{ count, setCount }}>
      {children}
    </TryContext.Provider>
  );
};

export { TryContext, TryProvider };