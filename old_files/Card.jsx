import Navbar from "../src/comp/Navbar";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function Card() {
  const { cardID } = useParams();
  console.log(cardID);

  const cities = useSelector((state) =>
    state.cities.value.filter((city) => city.id == cardID.toString())
  );

  console.log(cities);

  return (
    <>
      <Navbar></Navbar>
      <h1 className="text-3xl font-bold">{cities[0].name}</h1>
      <div className="flex flex-col p-4">
        {cities[0].isVisited && <span className="text-green-600">Visited</span>}
        {!cities[0].isVisited && (
          <span className="text-red-600">Not Visited</span>
        )}
      </div>
      <img
        src={cities[0].imgURL}
        className="rounded-t-md"
        alt=""
        width={400}
      ></img>
    </>
  );
}

export default Card;
