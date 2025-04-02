function CardItem({ name, imgURL, children, isVisited }) {
  return (
    <div className="rounded-md bg-zinc-950 hover:scale-105 transition-all ease-linear cursor-pointer">
      <img src={imgURL} className="rounded-t-md" alt=""></img>
      <div className="flex flex-col p-4">
        <h2 className="text-2xl text-white font-bold">{name}</h2>
        <p className="text-gray-500">{children}</p>
        {isVisited && <span className="text-green-600">✔️ visited</span>}
        {!isVisited && <span className="text-red-600">✖️ not visited</span>}
      </div>
    </div>
  );
}

export default CardItem;
