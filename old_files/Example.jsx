import { increment, decrement } from "../redux/counterSlice";
import { useSelector, useDispatch } from "react-redux";

function Example() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <p className="mb-3">Counter: {count}</p>
      <button
        className="mr-3"
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        Increment +
      </button>
      <button
        aria-label="Increment value"
        onClick={() => dispatch(decrement())}
      >
        Decrement -
      </button>
    </div>
  );
}

export default Example;
