import { useDispatch } from "react-redux";
import { removePhoto } from "../../redux/playgroundSlice";

function CityCard({ id, imgURL, alt, title, description, author }) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removePhoto(id));
  };

  return (
    <div className="bg-amber-300 rounded-lg shadow-lg flex flex-col">
      <img
        src={imgURL}
        alt={alt}
        title={title}
        className="w-full aspect-[3/2] object-cover rounded-lg shadow-lg hover:scale-150 transition-all ease-linear duration-500"
      />
      <div className="p-2 flex-grow flex flex-col justify-between">
        <p className="font-bold">{description}</p>
        <p className="text-sm italic text-gray-600">By {author}</p>
      </div>
      <button
        onClick={handleRemove}
        className="mt-2 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700 transition cursor-pointer"
      >
        Remove
      </button>
    </div>
  );
}

export default CityCard;
