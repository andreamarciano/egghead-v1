import "./PlayGround.css";
import { useDispatch, useSelector } from "react-redux";
import { restoreAll } from "../redux/playgroundSlice";

import Navbar from "../comp/Navbar";
import Footer from "../comp/Footer";

import CityCard from "../comp/playground/CityCard";
import CityInfo from "../comp/playground/CityInfo";

function Playground() {
  // CARD
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.playground.value);

  return (
    <>
      <Navbar />

      <CityInfo />

      <div className="bg-gradient-to-b from-red-300 to-red-500 p-2 mt-2 mb-2 rounded-2xl ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-5 mt-5">
          {cities.map((city) => (
            <CityCard key={city.id} {...city} />
          ))}
        </div>

        <button
          onClick={() => dispatch(restoreAll())}
          className="mb-4 px-4 py-2 bg-green-500 rounded text-white hover:bg-green-600 transition"
        >
          Restore All Cards!
        </button>
      </div>

      <Footer />
    </>
  );
}

export default Playground;
