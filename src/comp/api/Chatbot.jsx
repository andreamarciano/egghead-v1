import { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { from: "ai", text: "Ciao, sono Mario, come posso aiutarti?" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [messageCount, setMessageCount] = useState(1);

  // Gestisce l'invio dei messaggi
  const handleSend = () => {
    if (userInput.trim() === "") return; // Evita messaggi vuoti

    const newMessage = { from: "user", text: userInput };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setUserInput("");

    // Risposta dell'AI
    if (messageCount < 7) {
      setMessageCount(messageCount + 1);
      setTimeout(() => {
        const aiResponse = {
          from: "ai",
          text: "Risposta automatica dell'AI: " + getRandomResponse(),
        };
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
      }, 1000); // Risposta dell'AI dopo un breve ritardo
    }
  };

  // Funzione per generare risposte casuali dell'AI
  const getRandomResponse = () => {
    const responses = [
      "Già che peccato, a volte si rompono durante la spedizione col razzo.",
      "La tua opinione è molto importante per noi, aspetta un attimo!",
      "Non ti preoccupare, stiamo lavorando sul problema.",
      "Non è mai troppo tardi per chiedere aiuto!",
      "Ok, ma prima... vuoi una nuova offerta esclusiva?",
      "Sei proprio fortunato, ho trovato una soluzione!",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="chatbox p-4 bg-gray-800 rounded-lg shadow-md">
      <div className="chatbox-messages space-y-4 mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.from === "user" ? "text-right" : "text-left"
            }`}
          >
            <p
              className={`p-2 rounded-lg ${
                msg.from === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-blue-500"
              }`}
            >
              {msg.text}
            </p>
          </div>
        ))}
      </div>

      {messageCount < 7 && (
        <div className="chatbox-input flex items-center">
          <input
            type="text"
            className="p-2 rounded-lg w-full mr-2"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Scrivi un messaggio..."
          />
          <button
            onClick={handleSend}
            className="p-2 bg-blue-500 text-white rounded-lg"
          >
            Invia
          </button>
        </div>
      )}

      {messageCount >= 7 && (
        <div className="text-center text-red-500 mt-4">
          La chat è terminata. Grazie per averci contattato!
        </div>
      )}
    </div>
  );
};

export default Chatbot;

// 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
