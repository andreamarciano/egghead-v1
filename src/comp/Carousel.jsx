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

// Creiamo un array con la prima e l'ultima immagine duplicate
const extendedImages = [
  images[images.length - 1], // Ultima immagine all'inizio
  ...images,
  images[0], // Prima immagine alla fine
];

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(1); // Partiamo dalla prima "vera" immagine
  const transitionRef = useRef(true); // Controlla se attivare la transizione
  const intervalRef = useRef(null); // Riferimento al setInterval

  // Funzione per andare avanti
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    resetAutoPlay(); // Reset del timer
  };

  // Funzione per andare indietro
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
    resetAutoPlay(); // Reset del timer
  };

  // Funzione per resettare il timer (per ogni interazione dell'utente)
  const resetAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Pulisce il timer precedente
    }
    // Avvia un nuovo timer
    intervalRef.current = setInterval(nextSlide, 5000);
  };

  // Effetto per resettare il carosello quando arriva alla fine
  useEffect(() => {
    if (currentIndex === extendedImages.length - 1) {
      setTimeout(() => {
        transitionRef.current = false; // Disabilitiamo la transizione
        setCurrentIndex(1); // Torniamo alla prima immagine "vera"
      }, 1000);
    }

    if (currentIndex === 0) {
      setTimeout(() => {
        transitionRef.current = false; // Disabilitiamo la transizione
        setCurrentIndex(images.length); // Torniamo all'ultima immagine "vera"
      }, 1000);
    }
  }, [currentIndex]);

  // Ripristina la transizione quando cambia immagine normalmente
  useEffect(() => {
    transitionRef.current = true;
  }, [currentIndex]);

  // Cambio automatico ogni 5 secondi
  useEffect(() => {
    // Impostiamo l'intervallo quando il componente è montato
    intervalRef.current = setInterval(nextSlide, 5000);

    return () => clearInterval(intervalRef.current); // Pulisce l'intervallo quando il componente viene smontato
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
      {/* Contenitore immagini */}
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

      {/* Div invisibili per la navigazione */}
      <div
        onClick={prevSlide}
        className="absolute top-0 left-0 w-1/10 h-full cursor-pointer"
      ></div>
      <div
        onClick={nextSlide}
        className="absolute top-0 right-0 w-1/10 h-full cursor-pointer"
      ></div>

      {/* Indicatori */}
      <div className="absolute bottom-18 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index + 1); // +1 per allineare con l'offset
              resetAutoPlay(); // Reset del timer
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
