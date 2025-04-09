import { useState } from "react";
import GuidedChat from "./GuidedChat";

const Assistenza = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="flex space-x-8 mt-8 p-6 bg-gray-600 rounded-lg shadow-md">
      {/* Left side: contact info */}
      <div className="w-1/2 space-y-4">
        <h3 className="text-xl font-semibold">Contatta l'assistenza</h3>
        <p className="text-gray-800">
          Per assistenza, puoi contattarci tramite:
        </p>
        <ul className="text-blue-300 space-y-2 list-none pl-0">
          <li className="flex items-start gap-2">
            📧 <span>Email: hopeless@nevergonnareply.com</span>
          </li>
          <li className="flex items-start gap-2">
            📞 <span>Telefono: +11 333 AX1 2-8-1</span>
          </li>
          <li className="flex items-start gap-2">
            🧠 <span>Frequenza telepatica: 0.1235 Hz</span>
          </li>
          <li className="flex items-start gap-2">
            🚀{" "}
            <span>
              Messaggio razzo: coordinate X:42.0 Y:-13.7 Z:7.89, Blagzorg-4
            </span>
          </li>
          <li className="flex items-start gap-2">
            🐦{" "}
            <span>Richiesta tramite piccione (3 giorni e 7 ere cosmiche)</span>
          </li>
          <li className="flex items-start gap-2">
            🍞 <span>Parla al tuo tostapane (supportati modelli AI-12)</span>
          </li>
          <li className="flex items-start gap-2">
            🧘‍♂️ <span>Teletrasmetti un pensiero positivo ogni 13 minuti</span>
          </li>
          <li className="flex items-start gap-2">
            🔦 <span>Invia messaggi in codice Morse nello spazio profondo</span>
          </li>
        </ul>
      </div>

      {/* Right side: chat with operator */}
      <div className="w-1/2 space-y-4">
        <h3 className="text-xl font-semibold">Chatta con un operatore</h3>
        <p className="text-gray-800">
          Se preferisci una chat in tempo reale, clicca qui per iniziare.
        </p>
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-400"
        >
          {isChatOpen ? "Chiudi la chat" : "Apri la chat"}
        </button>
        {isChatOpen && (
          <div className="mt-4">
            <GuidedChat />
          </div>
        )}
      </div>
    </div>
  );
};

export default Assistenza;
