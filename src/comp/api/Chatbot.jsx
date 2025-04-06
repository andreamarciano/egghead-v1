import { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Funzione per inviare il messaggio dell'utente e ottenere la risposta
  const handleSendMessage = async () => {
    if (!input) return; // Se il campo di input è vuoto, non fare nulla

    // Aggiungi il messaggio dell'utente alla chat
    setMessages([...messages, { sender: "user", text: input }]);
    setInput(""); // Svuota il campo di input
    setLoading(true); // Mostra il caricamento

    try {
      // Invia una richiesta POST al backend Flask
      const response = await fetch(
        "https://andreachatbot-v1.onrender.com/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: input }),
        }
      );

      const data = await response.json();
      console.log("Risposta dal backend:", data); // Aggiungi questa riga per loggare la risposta

      // Aggiungi la risposta dell'AI alla chat
      if (data.message) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "ai", text: data.message },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "ai", text: "Errore nella risposta dell'AI." },
        ]);
      }
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "ai", text: "Errore di connessione." },
      ]);
    }

    setLoading(false); // Nascondi il caricamento
  };

  return (
    <div className="chatbox">
      <div className="messages">
        {/* Mostra i messaggi */}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === "ai" ? "ai" : "user"}`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      {loading && <p>Caricamento...</p>}

      <div className="input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Scrivi il tuo messaggio"
          className="p-2 border rounded"
        />
        <button
          onClick={handleSendMessage}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Invia
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
