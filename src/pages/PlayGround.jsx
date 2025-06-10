import "./PlayGround.css";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { restoreAll } from "../redux/playgroundSlice";

import Navbar from "../comp/Navbar";
import Footer from "../comp/Footer";

import CityCard from "../comp/playground/CityCard";

function Playground() {
  // COUNTER
  const [count, setCount] = useState(0); // State to keep track of the current count value
  const prevCountRef = useRef(); // Ref to store the previous count value without triggering re-renders

  // Update the ref with the latest count after every render where `count` changes
  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  const prevCount = prevCountRef.current; // Read the previous count from the ref

  // Log to console whenever the count changes, showing the transition from previous to current
  useEffect(() => {
    console.log(`Count changed: ${prevCount} → ${count}`);
  }, [count, prevCount]);

  // CARD
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.playground.value);

  // IP API
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLocation = () => {
    setLoading(true);
    setError(null);

    fetch("https://factoryproject-ipapi.onrender.com/whereami")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setLocation(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Unable to get location");
        setLoading(false);
      });
  };

  return (
    <>
      <Navbar />

      <div className="bg-gradient-to-b from-red-300 to-red-500 p-2 mt-2 mb-2 rounded-2xl ">
        {/* TITLE */}
        <h1 className="text-3xl font-bold text-orange-300">Playground</h1>
        <div className="bg-green-500/50 w-fit mx-auto p-2 m-2 rounded-3xl shadow-2xl shadow-green-700 animate-bounce-custom">
          <p className="text-xs sm:text-large md:text-xl ">
            This is the playground page, where you can test new components and
            animations
          </p>
        </div>

        {/* COUNTER */}
        <div style={{ textAlign: "center" }}>
          <h2>Counter: {count}</h2>
          <button onClick={() => setCount(count + 1)}>Increment</button>
          <button onClick={() => setCount(count - 1)}>Decrement</button>
          <p>
            Previous Value: {prevCount !== undefined ? prevCount : "Nessuno"}
          </p>
        </div>

        {/* IP API */}
        <div className="p-4 border rounded max-w-md mx-auto">
          <button
            onClick={fetchLocation}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mb-4"
          >
            Dove sono?
          </button>

          {loading && <p>Caricamento...</p>}

          {error && <p className="text-red-600">{error}</p>}

          {location && (
            <div>
              <p>
                Sei a: <strong>{location.city}</strong>, {location.region},{" "}
                {location.country_name}
              </p>
              <p>IP: {location.ip}</p>
              <p>ISP: {location.org}</p>
            </div>
          )}
        </div>

        {/* CARD */}
        <div className="bg-orange-600/40 w-fit mx-auto p-2 m-2 rounded-4xl border-2">
          <p>Let's create some cards!</p>
        </div>

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
