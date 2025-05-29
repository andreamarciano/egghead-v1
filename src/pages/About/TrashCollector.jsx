import { useTrash } from "./TrashContext";

const randomStyle = () => ({
  top: `${Math.random() * 97}%`,
  left: `${Math.random() * 97}%`,
  transform: `rotate(${Math.random() * 60 - 30}deg)`,
});

const TrashCollector = () => {
  const { dumpedLetters } = useTrash();

  return (
    <div className="relative top-8 h-48 mt-4 bg-gray-100 overflow-hidden">
      {/* Left Line */}
      <div
        className="absolute top-0 left-0 h-1 bg-gray-500"
        style={{ width: "45px" }}
      />

      {/* Right Line */}
      <div
        className="absolute top-0 left-[95px] h-1 bg-gray-500"
        style={{ right: 0 }}
      />

      {/* Hole */}
      <div className="absolute top-0 left-[45px] w-1 h-2 bg-gray-500" />
      <div className="absolute top-0 left-[95px] w-1 h-2 bg-gray-500" />

      {/* Letters */}
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

export default TrashCollector;
