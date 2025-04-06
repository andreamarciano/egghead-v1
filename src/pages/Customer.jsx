import Navbar from "../comp/Navbar";
import Weather from "../comp/api/Weather";

function Customer() {
  return (
    <>
      <Navbar />
      <h1 className="text-3xl font-bold text-center mt-8">Servizio Clienti</h1>

      {/* Customer Service */}
      <div className="mt-8 p-6 bg-gray-600 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Hai bisogno di assistenza?</h2>
        <p className="mt-2 text-gray-700">
          Se hai domande, il nostro operatore è disponibile per rispondere.
        </p>
        <button className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-400">
          Contatta il nostro operatore
        </button>
      </div>

      {/* Weather */}
      <div className="mt-8 p-6 bg-gray-600 rounded-lg shadow-md">
        <p className="mb-4">
          Nel frattempo, perché non controlli il meteo nella tua città?
        </p>
        <Weather />
      </div>
    </>
  );
}

export default Customer;
