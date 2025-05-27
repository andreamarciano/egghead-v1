import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function Carousel() {
  const images = useSelector((state) => state.carousel.value); // redux store

  // Continuous scrolling effect
  const extendedImages = [
    images[images.length - 1], // last image first
    ...images,
    images[0], // first image last
  ];

  const [currentIndex, setCurrentIndex] = useState(1); // first image
  const transitionRef = useRef(true); // transition on
  const intervalRef = useRef(null);

  // ->
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    resetAutoPlay(); // reset timer
  };

  // <-
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
    resetAutoPlay(); // reset timer
  };

  // Reset Timer - User Interaction
  const resetAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // clear prev timer
    }
    intervalRef.current = setInterval(nextSlide, 5000); // start new timer
  };

  // Reset carousel effect
  useEffect(() => {
    if (currentIndex === extendedImages.length - 1) {
      setTimeout(() => {
        transitionRef.current = false;
        setCurrentIndex(1); // back to first image
      }, 1000);
    }

    if (currentIndex === 0) {
      setTimeout(() => {
        transitionRef.current = false;
        setCurrentIndex(images.length); // back to last image
      }, 1000);
    }
  }, [currentIndex]);

  // Restore transition
  useEffect(() => {
    transitionRef.current = true;
  }, [currentIndex]);

  // Automatic shift
  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 5000);

    return () => clearInterval(intervalRef.current); // clear interval
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
      {/* Images */}
      <div
        className={`flex ${
          transitionRef.current
            ? "transition-transform duration-1000 ease-in-out"
            : ""
        }`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {extendedImages.map((img, index) => (
          <div key={index} className="min-w-full flex flex-col items-center">
            <img
              src={img.src}
              alt={img.caption}
              className="rounded-lg shadow-lg w-full object-cover h-130"
            />
            <p className="text-gray-800 bg-white px-4 py-2 rounded-md mt-4 shadow-md">
              {img.caption}
            </p>
          </div>
        ))}
      </div>

      {/* Invisible divs for navigation */}
      <div
        onClick={prevSlide}
        className="absolute top-0 left-0 w-1/10 h-full cursor-pointer"
      ></div>
      <div
        onClick={nextSlide}
        className="absolute top-0 right-0 w-1/10 h-full cursor-pointer"
      ></div>

      {/* Pointers */}
      <div className="absolute bottom-18 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index + 1); // +1 to align with the offset
              resetAutoPlay(); // reset timer
            }}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index + 1 === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
