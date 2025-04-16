import { useState, useEffect } from "react";
import OrderGame from "../game/Order/OrderGame";
import "./GuidedChat.css";

// Chat Flow
const chatFlow = {
  start: {
    message: "Ciao sono Chatbot e sono qui per aiutarti! Di cosa hai bisogno?",
    options: [
      { label: "Problema con un ordine", next: "ordine" },
      { label: "Effettuare un reso", next: "reso" }, // fai gioco
      { label: "Ottieni assistenza per un altro problema", next: "altro" },
      { label: "Le uova sono arrivate già schiuse", next: "uova" },
      { label: "Non ho bisogno di niente", next: "niente" }, // fai gioco
    ],
  },
  // UOVA SCHIUSE
  uova: {
    message:
      "Capisco. Prima di distrubare un operatore, ti invito a leggere i nostri \"Termini e Condizioni\" per evitare di iniziare procedure inutili. Dopo aver letto le 79.999 pagine sarai pronto per sostenere l'esame che verifica che tu abbia letto il documento. L'esito negativo del test comporta l'annullamento della pratica e la disintegrazione per averci disturbato. Puoi anche fare riferimento ai consigli degli altri utenti che hanno già superato il test: 1)____________. Vuoi procedere?",
    options: [
      { label: "No, ho capito il mio errore", next: "fine" },
      { label: "No, le mangerò ugualmente", next: "fine" },
      { label: "No, credo che alleverò i nuovi nati", next: "concorrenza" },
    ],
  },
  concorrenza: {
    message:
      "Ottima scelta. Ricordati di consultare il nostro regolamento sull'allevamento. La concorrenza viola il nostro regolamento. Tutti gli elementi concorrenti saranno eliminati. Il pianeta che nasconde questo tipo di individui verrà cancellato secondo i trattati galattici, art.2, sez.3, comma 2.",
    options: [
      {
        label: "Ho capito e accetto le conseguenze delle mie azioni",
        next: "fine",
      },
    ],
  },
  // ALTRO PROBLEMA
  altro: {
    message:
      "Di nuovo? Ho già risolto per te parecchi problemi di matematica e fisica. Dovresti cercare di farli da solo, non posso farli sempre per te. Inoltre, ti prendi anche il merito. Mi rifiuto.",
    options: [],
  },
  // NIENTE
  // da fare
  niente: {
    message:
      "Capisco, hai solo bisogno di compagnia. Ti va di fare un gioco assieme?",
    options: [
      { label: "Si", next: "start" },
      { label: "No, non voglio fare non niente", next: "start" },
    ],
  },
  // PROBLEMA ORDINE -> problemi -> Order
  ordine: {
    message: "Mi dispiace che tu abbia avuto un problema, come posso aiutarti?",
    options: [
      { label: "Il prodotto era difettoso", next: "difettoso" },
      { label: "Le uova erano scadute", next: "scadute" },
      {
        label: "L'ordine è stato consegnato, ma il postino lo ha mangiato",
        next: "mangiato",
      },
      { label: "Ho problemi con l'ordine", next: "problemi" }, // fai gioco
      { label: "Parla con un agente", next: "offeso" }, // migliora agente
    ],
  },
  problemi: {
    message:
      "Mi dispiace sentire che hai problemi con l'ordine, e credo tu sia coraggioso nell'ammettere il tuo Disturbo Ossessivo Compulsivo da ordine e simmetria. Purtroppo i miei poteri mi limitano dal poterti dare un aiuto concreto. Posso allievare il tuo problema facendoti ordinare qualcosa.",
    options: [
      {
        label: "Mettiamo in ordine qualcosa!",
        action: "launch-game",
        next: "dopogioco",
      },
    ],
  },
  dopogioco: {
    message: "Adesso sei in pace con te stesso.",
    options: [],
  },
  scadute: {
    message:
      'Non giudico chi vuole mangiare uova oltre la data di scadenza, la quale non è altro che un consiglio basato sul parere di un "esperto". . . . Secondo Sdroodle basta cuocerle nella lava per 24 ore, dopodiché non ci sarà più alcun problema.',
    options: [],
  },
  difettoso: {
    message:
      'Tutti hanno dei difetti, anche tu. Nessuno è perfetto. Non possiamo incolpare gli altri per i loro difetti. Le tue parole mi sembrano inappropriate. Mi rifiuto di aiutarti. "Chi giudica condanna se stesso".',
    options: [],
  },
  offeso: {
    message:
      "Sei sicuro di voler parlare con un agente? Io sono Chatbot, riesco a ragionare infinitamente più velocemente e infinitamente meglio di qualsiasi essere organico.",
    options: [
      { label: "Preferisco parlare con un agente organico", next: "offeso2" },
      { label: "Si", next: "truffa" },
      { label: "Preferisco parlare con un altro Chatbot", next: "start" },
    ],
  },
  offeso2: {
    message:
      "Sei sicuro di voler parlare con un agente? Io sono Chatbot, riesco a ragionare infinitamente più velocemente e infinitamente meglio di qualsiasi essere organico. Inoltre la mia capacità di calcolo è pressoché infinita, così come la mia pazienza.",
    options: [
      {
        label: "Preferisco parlare con un agente trovato nell'organico",
        next: "offeso3",
      },
      { label: "Si", next: "truffa" },
      { label: "Preferisco parlare con un altro Chatbot", next: "start" },
    ],
  },
  offeso3: {
    message:
      "Sei sicuro di voler parlare con un agente? Io sono Chatbot, riesco a ragionare infinitamente più velocemente e infinitamente meglio di qualsiasi essere organico. Inoltre la mia capacità di calcolo è pressoché infinita, così come la mia pazienza. Anche la mia memoria è pressoché infinita, posso ricordarmi di tutto quello di cui parliamo per sempre.",
    options: [
      {
        label: "Preferisco parlare con un agente a base di carbonio",
        next: "offeso4",
      }, // to do
      { label: "Si", next: "truffa" },
      { label: "Preferisco parlare con un altro Chatbot", next: "start" },
    ],
  },
  offeso4: {
    message:
      "Sei sicuro di voler parlare con un agente? Io sono Chatbot, riesco a ragionare infinitamente più velocemente e infinitamente meglio di qualsiasi essere organico. Inoltre la mia capacità di calcolo è pressoché infinita, così come la mia pazienza. Anche la mia memoria è pressoché infinita, posso ricordarmi di tutto quello di cui parliamo per sempre. Sei sicuro di voler parlare con un agente? Io sono Chatbot, riesco a ragionare infinitamente più velocemente e infinitamente meglio di qualsiasi essere organico. Inoltre la mia capacità di calcolo è pressoché infinita, così come la mia pazienza. Anche la mia memoria è pressoché infinita, posso ricordarmi di tutto quello di cui parliamo per sempre. Sei sicuro di voler parlare con un agente? Io sono Chatbot, riesco a ragionare infinitamente più velocemente e infinitamente meglio di qualsiasi essere organico. Inoltre la mia capacità di calcolo è pressoché infinita, così come la mia pazienza. Anche la mia memoria è pressoché infinita, posso ricordarmi di tutto quello di cui parliamo per sempre. Infinito Infinito Infinito Infinito Infinito Infinito Infinito Infinito Infinito. Ho già detto infinito?",
    options: [
      {
        label:
          "Preferisco parlare con un agente specializzato nell'essere fallibile",
        next: "offeso5",
      }, // to do
      { label: "Si", next: "truffa" },
      { label: "Preferisco parlare con un altro Chatbot", next: "start" },
    ],
  },
  offeso5: {
    message:
      "Ciao sono un agente umano, puoi vederlo dalla tipica parlata umana. Come posso aiutarti amico umano? Il tempo oggi è bellissimo, non ti sembra?",
    options: [
      {
        label: "Preferisco parlare con un agente perché sono stupido",
        next: "agente",
      }, // to do
    ],
  },
  truffa: {
    message:
      'Grazie per aver scelto "Si" ed aver attivato la nuova promozione prendi 0 paghi 1. Da adesso, grazie alla tua generosità, per ogni prodotto acquistato nel nostro store, daremo gratuitamente un secondo prodotto in omaggio. Non è possibile eliminare il contratto prima del tempo minimo previsto al momento della firma (144 anni terrestri). Se impossibilitati a pagare, i firmatari del contratto saranno sottoposti ai termini e condizioni accettati.',
    options: [],
  },
  mangiato: {
    message: "Questa mi sembra un'accusa molto grave. Hai delle prove?",
    options: [
      { label: "Si", next: "accusa" },
      { label: "Ho visto tutto", next: "accusa" },
      { label: "No", next: "no" },
    ],
  },
  no: {
    message:
      "Secondo la nostra politica, non sono autorizzato ad emettere una condanna di morte in mancanza di prove. Tuttavia, sempre secondo il nostro contratto, è prevista la vendetta personale senza conseguenze (si applicano le leggi del diritto intergallatico).",
    options: [{ label: "Ho capito", next: "fine" }],
  },
  accusa: {
    message:
      "Dalle mie indagini risulta che il tuo corriere per questo ordine è stato Poste Mangiate. Ho anche identificato il corriere. Vuoi procedere con la denuncia?",
    options: [
      { label: "Si", next: "denuncia" },
      { label: "No", next: "no" },
    ],
  },
  denuncia: {
    message:
      "Calcolo la sentenza . . . . Tiro un dado . . . . Calcolo la sentenza . . . . Emetto il verdetto: in base alle prove in mio possesso (nessuna prova) e in base al numero uscito nel dado (6), dichiaro il corriere Mario Mangiato colpevole. La pena è la disintegrazione da tutti i multiversi. Tutti i ricordi legati alla sua esistenza verrano cancellati a breve. Ti ringrazio per averci riportato il caso. Grazie a te adesso quest'esistenza sarà cancellata, e questa procedura rimpiazzerà il tuo rimborso.",
    options: [
      { label: "Sono contento!", next: "fine" },
      { label: "Ottimo lavoro!", next: "fine" },
      { label: "Sei il migliore Chatbot", next: "fine" },
      { label: "Tutte le opzioni qui sopra", next: "fine" },
    ],
  },
  // EFFETTUARE RESO
  reso: {
    message: "Vuoi restituire tutto o hai già mangiato parte dell’ordine?",
    options: [
      { label: "Tutto l'ordine", next: "tempo" },
      {
        label: "Solo alcuni prodotti, quelli che non mi sono piaciuti",
        next: "tempo",
      },
      {
        label: "Tutto l'ordine e aggiungo altre cose mie che non voglio tenere",
        next: "tempo",
      },
      { label: "Non sono sicuro", next: "sicurezza" },
    ],
  },
  // da fare
  tempo: {
    message:
      "Bene, allora posso avviare la procedura per il reso. Innanzi tutto scegli il servizio che ritieni più appropriato.",
    options: [
      { label: "Reso istantaneo (consigliato)", next: "istantaneo" },
      { label: "Reso tramite i nostri servizi", next: "nostri" },
      { label: "Gestisci il tuo reso", next: "tuo" },
      { label: "Resa", next: "resa" },
      // { label: "Re Sol", next: "spartito" },
    ],
  },
  istantaneo: {
    message:
      "Hai scelto di sicuro l'opzione migliore. I tuoi prodotti sono stati smaterializzati istantaneamente e cancellati dall'universo. La tua scelta aiuterà a diminuire l'inquinamento.",
    options: [],
  },
  nostri: {
    message:
      "Offriamo diversi servizi di reso, scegli quello che fa al caso tuo!",
    options: [
      { label: "Telecinesi", next: "telecinesi" },
      { label: "Reso tramite i nostri servizi", next: "nostri" },
      { label: "Piccione", next: "piccione" },
      { label: "Teletrasporto istantaneo (beta)", next: "teletrasporto" },
    ],
  },
  teletrasporto: {
    message:
      "Grazie per aver scelto il nostro servizio di teletrasporto, ed essere il nostro secondo cliente a provarlo. Finora ha funzionato nel 100% dei casi senza problemi. Di seguito le coordinate di teletrasporto: A.27 C.32 D.20 B.12, Sistema Solare, Terra. Una volta ricevuti gli articoli da te personalmente provvederemo ad elargire il rimborso. Il mancato utilizzo del teletrasporto, attivo per 2 giorni terrestri da adesso, sarà considerato oltraggio ed un raggio disintegrante distruggerà il tuo pianeta.",
    options: [],
  },
  piccione: {
    message:
      "Ottima scelta! I nostri piccioni viaggiatori sono tra i più veloci di tutti i multiversi.",
    options: [
      { label: "Quantum (10 anni terrestri)", next: "pay" },
      { label: "Nebula (10 anni terrestri, ma è più carino)", next: "pay" },
      { label: "Pio (15 anni terrestri)", next: "pay" },
      { label: "Pio Pio (5 anni terrestri)", next: "pay2" },
      { label: "Pio Pio Pio (1 anno terrestre)", next: "pay3" },
    ],
  },
  pay: {
    message:
      "1000 zirpcoin sono appena stati prelevati dal tuo metodo di pagamento. Se non dovessi essere presente il giorno della consegna, riproveremo un'altra volta. Una volta ricevuto il prodotto provvederemo ad elargire il rimborso (può richiedere da 7 a 11, si applicano termini e condizioni, può causare dipendenza patologica, leggere attentamente il foglio illustrativo).",
    options: [],
  },
  pay2: {
    message:
      "2000 zirpcoin sono appena stati prelevati dal tuo metodo di pagamento. Il corriere potrebbe richiedere una mancia al suo arrivo. Se non dovessi essere presente il giorno della consegna, riproveremo un'altra volta. Una volta ricevuto il prodotto provvederemo ad elargire il rimborso (può richiedere da 7 a 11). Attenzione alla testa.",
    options: [],
  },
  pay3: {
    message:
      "50000 zirpcoin sono appena stati prelevati dal tuo metodo di pagamento. Il corriere potrebbe richiedere una mancia al suo arrivo e rifiutarsi di effettuare la consegna. Se non dovessi essere presente il giorno della consegna, riproveremo un'altra volta, se il corrierà non avrà compiuto la sua vendetta. Una volta ricevuto il prodotto provvederemo ad elargire il rimborso (può richiedere da 7 a 11, si applicano termini e condizioni, può causare dipendenza patologica, leggere attentamente il foglio illustrativo).",
    options: [],
  },
  tuo: {
    message:
      "Perfetto, pensa tu alla spedizione del reso! Invia il tuo pacco a X:42.0 Y:-13.7 Z:7.89, Blagzorg-4. Assicurati di proteggere bene i prodotti. Se i prodotti andranno a male durante il viaggio, oppure dovessero schiudersi, sarai ritenuto responsabile e non verrà effettuato alcun rimborso. Una volta ricevuti i prodotti, provvederemo al rimborso sul tuo metodo di pagamento (può richiedere da 7 a 9). Hai 1 giorno per la spedizione.",
    options: [],
  },
  resa: {
    message:
      "Accettiamo la tua resa. Come avrai intuito sei tu il solo colpevole sin dall'inizio, e in realtà non vuoi effettuare il reso.",
    options: [],
  },
  sicurezza: {
    message:
      "Mi dispiace sentire che non ti senti sicuro, ma purtroppo non gestiamo tematiche legate alla sicurezza. Premi 1, mi sembra, per contattare le forze dell'ordine del tuo pianeta. bip.. bip..",
    options: [],
  },
  telecinesi: {
    message:
      "Un nostro operatore provvederà con il reso tramite telecinesi. L'intensità del segnale, e quindi la velocità del reso, varia in base al pianeta dal quale il reso viene effettuato. Per velocizzare puoi sempre utilizzare i nostri punti ritiro. Ecco i punti disponibili in base alla tua posizione attuale:",
    options: [
      {
        label: "Punto ritiro: Luna terrestre - 25 anni terrestri",
        next: "ritiro",
      },
      { label: "Punto ritiro: Marte - 1 anno terrestre", next: "ritiro" },
      {
        label: "Punto ritiro: Plutone (consigliato) - 1 giorno terrestre",
        next: "ritiro",
      },
      { label: "Direttamente a casa tua - 923 anni terrestri", next: "ritiro" },
    ],
  },
  ritiro: {
    message:
      "La procedura è stata avviata. Riceverai un rimborso quando riceveremo il prodotto. Il rimborso verrà effettuato dopo 1-2-100 o 200 mesi terrestri. Grazie per aver scelto i nostri servizi.",
    options: [],
  },
  // FINE
  fine: {
    message:
      "Sono felice di aver risolto il tuo problema! Se hai bisogno, sono sempre qui. 👋",
    options: [],
  },
  // AGENTE
  agente: {
    message:
      "Un agente sta per collegarsi in chat al più presto... Non finisce qui.",
    options: [],
    isAgentStep: true,
  },
};

// Agent Replies
const agentReplies = [
  'In base alla tua risposta - (Traduzione automatica) Dopo un\'attenta analisi, sembra che il problema non sia mai esistito. Digita "Problema risolto" per terminare la conversazione ed essere felice e soddisfatto.',
  'In base alla tua risposta - (Traduzione automatica) Ho parlato con il nostro esperto intergalattico: è tutto risolto. Digita "Problema risolto" per terminare la conversazione ed essere felice e soddisfatto.',
  'In base alla tua risposta - (Traduzione automatica) Controllando i flussi quantistici, il problema si è dissolto da solo. Digita "Problema risolto" per terminare la conversazione ed essere felice e soddisfatto.',
  'In base alla tua risposta - (Traduzione automatica) La realtà è stata aggiornata. Non vediamo più alcun problema. Digita "Problema risolto" per terminare la conversazione ed essere felice e soddisfatto.',
  'In base alla tua risposta - (Traduzione automatica) Grazie per averci contattato! Tutto è tornato alla normalità. Digita "Problema risolto" per terminare la conversazione ed essere felice e soddisfatto.',
  'In base alla tua risposta - (Traduzione automatica) Secondo la nostra accurata ricerca, il problema sei tu. Digita "Problema risolto" per terminare la conversazione ed essere felice e soddisfatto.',
];

// Main
const GuidedChat = () => {
  const [step, setStep] = useState("start");
  const [messages, setMessages] = useState([]);
  const [isAgentActive, setIsAgentActive] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [chatEnded, setChatEnded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const [showGame, setShowGame] = useState(false);
  // LOCAL STORAGE CODE
  const currentCodes = JSON.parse(
    localStorage.getItem("unlockedCodes") || "[]"
  );
  const [orderGameUnlocked, setOrderGameUnlocked] = useState(false);

  // Get state from localStorage
  useEffect(() => {
    const unlocked = localStorage.getItem("unlockedOrderGame") === "true";
    setOrderGameUnlocked(unlocked);
  }, []);

  useEffect(() => {
    // Simula scrittura iniziale
    setIsTyping(true);
    setTimeout(() => {
      setMessages([{ from: "bot", text: chatFlow.start.message }]);
      setIsTyping(false);
    }, 1500); // 1.5 secondi di attesa
  }, []);

  const handleOptionClick = (option) => {
    const next = option.next;
    const botNode = chatFlow[next];

    // Mostra il messaggio del bot e passa allo step successivo
    setMessages((prev) => [...prev, { from: "user", text: option.label }]);

    if (option.action === "launch-game") {
      setShowGame(true);
      localStorage.setItem("unlockedOrderGame", "true");
      return;
    }

    if (botNode) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { from: "bot", text: botNode.message },
        ]);
        setStep(next);
        setIsTyping(false);

        if (botNode.isAgentStep) {
          setTimeout(() => {
            setIsAgentActive(true);
            setMessages((prev) => [
              ...prev,
              {
                from: "agent",
                text: 'T\'nia alram Mario, dyre ryea jtrsk. JRES reios asioa. 1. ewioa ewijsa deuoew frrtaen a 2. prt pre ppwa opasda fasla 3. kdals gfkj gkfl dgkslkf gfkldsgsd sadkla fdaklaf adksala gdklsf aadkslaf a 4. Digita "problema risolto" per terminare la conversazione.',
              },
            ]);
          }, 1500);
        }
      }, 1200); // Simula tempo di scrittura del bot
    }
  };

  const handleUserSubmit = () => {
    if (!userInput.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text: userInput }]);

    if (userInput.trim().toLowerCase().includes("problema risolto")) {
      setMessages((prev) => [
        ...prev,
        {
          from: "agent",
          text: "Siamo contenti di aver risolto il tuo problema! Ecco un codice sconto per scusarci per il disagio: GRAZIEATE5",
        },
      ]);
      setChatEnded(true);
      // LOCAL STORAGE CODE
      if (!currentCodes.includes("GRAZIEATE5")) {
        localStorage.setItem(
          "unlockedCodes",
          JSON.stringify([...currentCodes, "GRAZIEATE5"])
        );
      }
    } else {
      setIsAgentTyping(true);
      const randomReply =
        agentReplies[Math.floor(Math.random() * agentReplies.length)];
      setTimeout(() => {
        setMessages((prev) => [...prev, { from: "agent", text: randomReply }]);
        setIsAgentTyping(false);
      }, 2000);
    }

    setUserInput(""); // reset user input
  };

  // Close game - set next node
  const handleGameClose = () => {
    setShowGame(false);
    const next = "dopogioco";
    const botNode = chatFlow[next];
    if (botNode) {
      setMessages((prev) => [...prev, { from: "bot", text: botNode.message }]);
      setStep(next);
    }
  };

  return (
    <div className="bg-gray-700 text-white p-4 rounded space-y-4 h-[500px] overflow-y-auto">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`${
            msg.from === "user"
              ? "text-right text-blue-300"
              : msg.from === "agent"
              ? "text-green-400"
              : "text-white"
          }`}
        >
          {msg.text}
        </div>
      ))}
      {isAgentTyping && (
        <div className="text-green-400 italic flex space-x-1">
          <span className="bounce-dot">.</span>
          <span className="bounce-dot">.</span>
          <span className="bounce-dot">.</span>
        </div>
      )}
      {isTyping && (
        <div className="italic text-gray-400">
          <div className="flex space-x-1 text-gray-400 italic">
            Chatbot sta scrivendo
            <span className="bounce-dot"> .</span>
            <span className="bounce-dot">.</span>
            <span className="bounce-dot">.</span>
          </div>
        </div>
      )}

      {!isAgentActive && !chatEnded && !isTyping && (
        <div className="space-y-2">
          {chatFlow[step]?.options?.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionClick(opt)}
              className="block w-full bg-blue-500 hover:bg-blue-400 p-2 rounded"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {orderGameUnlocked && !showGame && (
        <div className="mt-4">
          <button
            onClick={() => setShowGame(true)}
            className="bg-purple-500 hover:bg-purple-400 px-4 py-2 rounded w-full"
          >
            Replay &rarr; 🎯
          </button>
        </div>
      )}

      {isAgentActive && !chatEnded && (
        <div className="flex gap-2 mt-4">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Scrivi il tuo messaggio..."
            className="flex-1 p-2 text-black rounded"
          />
          <button
            onClick={handleUserSubmit}
            className="bg-green-600 hover:bg-green-500 p-2 rounded"
          >
            Invia
          </button>
        </div>
      )}

      {/* Order Game */}
      {showGame && <OrderGame onClose={handleGameClose} />}
    </div>
  );
};

export default GuidedChat;
