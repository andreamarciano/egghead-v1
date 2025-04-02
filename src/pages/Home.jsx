import { useSelector } from "react-redux";
import AnimalCard from "../comp/AnimalCard";

function Home() {
  const animals = useSelector((state) => state.animals.value);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
        Benvenuti nel nostro Shop di Uova!
      </h1>
      <p className="text-xl text-gray-700 text-center mb-6">
        Siamo un'azienda specializzata nella vendita di uova fresche, di alta
        qualità, provenienti da una varietà di uccelli e animali, anche estinti.
        Scopri il nostro assortimento di uova bianche, marroni, di quaglia,
        tacchino, e altre varietà esclusive!
      </p>

      <div className="space-y-12">
        {animals.map((animal) => (
          <AnimalCard {...animal}/>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-lg text-gray-800">
          Scegli le uova più fresche e di qualità direttamente dal nostro
          negozio online.
        </p>
      </div>
    </div>
  );
}

export default Home;
