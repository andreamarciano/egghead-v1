import { useState, useEffect, useRef } from "react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?q=80&w=1978&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "La nostra fattoria sulla Terra",
  },
  {
    src: "https://images.unsplash.com/photo-1541873676-a18131494184?q=80&w=2036&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Il nostro allevatore Mario a lavoro",
  },
  {
    src: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1908&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Spedizione garantita in un giorno in tutto il pianeta",
  },
  {
    src: "https://t3.ftcdn.net/jpg/03/01/64/66/240_F_301646631_42E6MJ9eexfworD9GfIPWSeTznBg8bb2.jpg",
    caption: "I nostri clienti abituali",
  },
];

// Continuous scrolling effect
const extendedImages = [
  images[images.length - 1], // last image first
  ...images,
  images[0], // first image last
];

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(1); // first image
  const transitionRef = useRef(true); // transition on
  const intervalRef = useRef(null);

  // ->
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    resetAutoPlay(); // Reset del timer
  };

  // <-
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
    resetAutoPlay(); // Reset del timer
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
