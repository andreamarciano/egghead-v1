import Navbar from "../comp/Navbar";
import Weather from "../comp/api/Weather";
import Chatbot from "../comp/api/Chatbot";

function Customer() {
  return (
    <>
      <Navbar />
      <h1 className="text-3xl font-bold text-center mt-8">Servizio Clienti</h1>

      {/* Customer Service */}
      <div className="mt-8 p-6 bg-gray-600 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Hai bisogno di assistenza?</h2>
        <p className="mt-2 text-gray-300">
          Se hai domande, il nostro operatore è disponibile per rispondere.
        </p>
        {/* Chatbot */}
        <div className="mt-8 p-6 bg-gray-500 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Inizia la chat con il nostro operatore
          </h2>
          <Chatbot />
        </div>
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
