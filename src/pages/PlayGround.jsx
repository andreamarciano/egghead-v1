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
