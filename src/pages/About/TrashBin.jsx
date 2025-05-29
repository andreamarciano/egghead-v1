import { useTrash } from "./TrashContext";

const randomStyle = () => ({
  top: `${Math.random() * 97}%`,
  left: `${Math.random() * 97}%`,
  transform: `rotate(${Math.random() * 60 - 30}deg)`,
});

const TrashBin = () => {
  const { dumpedLetters } = useTrash();

  return (
    <div className="relative h-48 mt-4 border-t-4 border-dashed border-gray-400 bg-gray-100 overflow-hidden">
      {dumpedLetters.map((char, i) => (
        <span
          key={i}
          className="absolute text-sm text-gray-700 opacity-80 select-none pointer-events-none transition-transform"
          style={randomStyle()}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default TrashBin;
