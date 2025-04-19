import { Link } from "react-router-dom";

function AnimalCard({ num, imgURL, srcSet, alt, description, position }) {
  let col = num % 2; // col sep

  if (col == 0) {
    // even
    return (
      <div className="flex items-center justify-between">
        <Link to={`/shop`} className="w-1/2 h-72 block">
          <img
            src={imgURL}
            srcSet={srcSet}
            alt={alt}
            className="w-full h-full object-cover rounded-lg shadow-lg hover:scale-105 transition-all ease-linear cursor-pointer"
            style={position ? { objectPosition: position } : {}}
            loading="lazy"
          />
        </Link>
        <div className="w-1/2 p-4">
          <h2 className="text-2xl font-semibold text-gray-900">{alt}</h2>
          <p className="text-lg text-gray-700 mt-4">{description}</p>
        </div>
      </div>
    );
  }
  return (
    // odd
    <div className="flex items-center justify-between">
      <div className="w-1/2 p-4">
        <h2 className="text-2xl font-semibold text-gray-900">{alt}</h2>
        <p className="text-lg text-gray-700 mt-4">{description}</p>
      </div>
      <Link to={`/shop`} className="w-1/2 h-72 block">
        <img
          src={imgURL}
          srcSet={srcSet}
          alt={alt}
          className="w-full h-full object-cover rounded-lg shadow-lg hover:scale-105 transition-all ease-linear cursor-pointer"
          style={position ? { objectPosition: position } : {}}
          loading="lazy"
        />
      </Link>
    </div>
  );
}

export default AnimalCard;
