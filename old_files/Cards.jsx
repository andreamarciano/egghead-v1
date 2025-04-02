import Navbar from "../src/comp/Navbar";
import CardItem from "./CardItem";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Cards() {
  const cities = useSelector((state) => state.cities.value);

  return (
    <>
      <Navbar></Navbar>
      <h1 className="text-3xl font-bold mb-10">
        Page with cards with underpage links
      </h1>
      <div className="grid grid-cols-4 gap-5">
        {cities.map((city) => (
          <Link to={`/cards/${city.id}`} key={city.id}>
            <CardItem
              title={city.name}
              isVisited={city.isVisited}
              imgURL={city.imgURL}
            >
              {city.description}
            </CardItem>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Cards;
