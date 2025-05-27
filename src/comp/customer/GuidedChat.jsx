import { useState, useEffect } from "react";
import "./GuidedChat.css";

import {
  addUnlockedGame,
  isGameUnlocked,
  GameNames,
} from "../game/gameUnlocker";
import OrderGame from "../game/Order/OrderGame";

// Chat Flow
const chatFlow = {
  start: {
    message: "Hi, I'm Chatbot and I'm here to help! What do you need?",
    options: [
      { label: "Problem with an order", next: "order" },
      { label: "Make a return", next: "return" },
      { label: "Get help with another issue", next: "other" },
      { label: "The eggs arrived already hatched", next: "hatched" },
      { label: "I don't need anything", next: "nothing" },
    ],
  },
  // HATCHED EGGS
  hatched: {
    message:
      "I see. Before bothering a human operator, I invite you to read our \"Terms and Conditions\" to avoid starting pointless procedures. After reading all 79,999 pages, you'll be ready to take the exam that verifies you've actually read the document. Failing the test means your case is canceled and you get disintegrated for disturbing us. You can also refer to tips from other users who passed the test: 1)____________. Do you want to proceed?",
    options: [
      { label: "No, I understand my mistake", next: "end" },
      { label: "No, I'll eat them anyway", next: "end" },
      { label: "No, I think I'll raise the newborns", next: "competition" },
    ],
  },
  competition: {
    message:
      "Excellent choice. Remember to check our breeding regulations. Competition violates our rules. All competing elements will be eliminated. The planet harboring such individuals will be erased according to Galactic Treaties, Art.2, Sec.3, Clause 2.",
    options: [
      {
        label: "I understand and accept the consequences of my actions",
        next: "end",
      },
    ],
  },
  // OTHER ISSUE
  other: {
    message:
      "Again? I've already solved many math and physics problems for you. You should try doing them yourself; I can't do everything for you. Also, you take credit. I refuse.",
    options: [],
  },
  // NOTHING
  nothing: {
    message: "I get it, you just want company. Want to play a game together?",
    options: [
      { label: "No", next: "start" },
      { label: "No, I don't want to do nothing", next: "start" },
    ],
  },
  // ORDER PROBLEM
  order: {
    message: "Sorry you had a problem. How can I assist you?",
    options: [
      { label: "The product was defective", next: "defective" },
      { label: "The eggs were expired", next: "expired" },
      {
        label: "The order was delivered, but the postman ate it",
        next: "eaten",
      },
      { label: "I have issues with the order", next: "issues" },
      { label: "Talk to an agent", next: "offended" },
    ],
  },
  issues: {
    message:
      "Sorry to hear you're having issues with your order. I admire your courage admitting your obsessive-compulsive disorder about order and symmetry. Unfortunately, my powers are limited to giving you concrete help. I can ease your pain by letting you order something.",
    options: [
      {
        label: "Let's order something!",
        action: "launch-game",
        next: "postgame",
      },
    ],
  },
  postgame: {
    message: "Now you are at peace with yourself.",
    options: [],
  },
  expired: {
    message:
      'I don’t judge those who eat eggs past the expiration date, which is just advice based on an "expert" opinion... According to Sdroodle, just cook them in lava for 24 hours and there will be no problem.',
    options: [],
  },
  defective: {
    message:
      'Everyone has defects, including you. Nobody is perfect. We can’t blame others for their flaws. Your words seem inappropriate. I refuse to help you. "He who judges condemns himself."',
    options: [],
  },
  offended: {
    message:
      "Are you sure you want to talk to an agent? I am Chatbot, capable of reasoning infinitely faster and better than any organic being.",
    options: [
      { label: "I prefer to speak with an organic agent", next: "offended2" },
      { label: "Yes", next: "scam" },
      { label: "I prefer to talk to another Chatbot", next: "start" },
    ],
  },
  offended2: {
    message:
      "Are you sure you want to speak with an agent? I am Chatbot, capable of reasoning infinitely faster and better than any organic being. Also, my computing power is virtually infinite, as is my patience.",
    options: [
      {
        label: "I prefer to talk to an agent found in the organic realm",
        next: "offended3",
      },
      { label: "Yes", next: "scam" },
      { label: "I prefer to talk to another Chatbot", next: "start" },
    ],
  },
  offended3: {
    message:
      "Are you sure you want to talk to an agent? I am Chatbot, capable of reasoning infinitely faster and better than any organic being. Also, my computing power is virtually infinite, as is my patience. My memory is also virtually infinite, I can remember everything we talk about forever.",
    options: [
      {
        label: "I prefer to talk to a carbon-based agent",
        next: "offended4",
      },
      { label: "Yes", next: "scam" },
      { label: "I prefer to talk to another Chatbot", next: "start" },
    ],
  },
  offended4: {
    message:
      "Are you sure you want to talk to an agent? I am Chatbot, capable of reasoning infinitely faster and better than any organic being. Also, my computing power is virtually infinite, as is my patience. My memory is also virtually infinite, I can remember everything we talk about forever. Are you sure you want to talk to an agent? I am Chatbot, capable of reasoning infinitely faster and better than any organic being. Also, my computing power is virtually infinite, as is my patience. My memory is also virtually infinite, I can remember everything we talk about forever. Infinite Infinite Infinite Infinite Infinite Infinite Infinite Infinite Infinite. Did I say infinite already?",
    options: [
      {
        label: "I prefer to talk to an agent specialized in fallibility",
        next: "offended5",
      },
      { label: "Yes", next: "scam" },
      { label: "I prefer to talk to another Chatbot", next: "start" },
    ],
  },
  offended5: {
    message:
      "Hi, I’m a human agent, you can tell by my typically human way of speaking. How can I help you, human friend? The weather is beautiful today, don’t you think?",
    options: [
      {
        label: "I prefer to talk to an agent because I'm stupid",
        next: "agent",
      },
    ],
  },
  scam: {
    message:
      'Thanks for choosing "Yes" and activating our new Buy 0 Pay 1 promotion. From now on, thanks to your generosity, for every product bought in our store, we will give you a second product free. The contract cannot be terminated before the minimum period agreed at signing (144 Earth years). If unable to pay, contract signers will be subject to the agreed terms and conditions.',
    options: [],
  },
  eaten: {
    message: "That sounds like a serious accusation. Do you have proof?",
    options: [
      { label: "Yes", next: "accuse" },
      { label: "I saw everything", next: "accuse" },
      { label: "No", next: "noProof" },
    ],
  },
  noProof: {
    message:
      "According to our policy, I am not authorized to issue a death sentence without evidence. However, as per our contract, personal revenge without consequences is allowed (intergalactic law applies).",
    options: [{ label: "Understood", next: "end" }],
  },
  accuse: {
    message:
      "My investigation shows your courier for this order was 'Eaten Post'. I have also identified the courier. Do you want to proceed with a complaint?",
    options: [
      { label: "Yes", next: "complaint" },
      { label: "No", next: "noProof" },
    ],
  },
  complaint: {
    message:
      "Calculating sentence... Rolling dice... Calculating sentence... Verdict: based on the evidence (none) and dice roll (6), I declare courier Mario Eaten guilty. The penalty is disintegration across all multiverses. All memories of his existence will be erased shortly. Thanks for reporting this case. Thanks to you, this existence will be erased, and this procedure replaces your refund.",
    options: [
      { label: "I'm happy!", next: "end" },
      { label: "Great job!", next: "end" },
      { label: "You're the best Chatbot", next: "end" },
      { label: "All of the above", next: "end" },
    ],
  },
  // MAKE A RETURN
  return: {
    message:
      "Do you want to return everything or have you already eaten part of the order?",
    options: [
      { label: "The whole order", next: "time" },
      {
        label: "Only some products, the ones I didn’t like",
        next: "time",
      },
      {
        label:
          "The whole order plus some of my own things I don’t want to keep",
        next: "time",
      },
      { label: "I'm not sure", next: "safety" },
    ],
  },
  time: {
    message:
      "Great, I can start the return process. First, choose the service you think is most appropriate.",
    options: [
      { label: "Instant return (recommended)", next: "instant" },
      { label: "Return via our services", next: "ours" },
      { label: "Manage your return", next: "yours" },
      { label: "Surrender the product", next: "returnProcess" },
    ],
  },
  instant: {
    message:
      "You definitely chose the best option. Your products have been instantly dematerialized and erased from the universe. Your choice helps reduce pollution.",
    options: [],
  },
  ours: {
    message:
      "We offer several return services, choose the one that suits you best!",
    options: [
      { label: "Telekinesis", next: "telekinesis" },
      { label: "Return via our services", next: "ours" },
      { label: "Carrier pigeon", next: "pigeon" },
      { label: "Instant teleportation (beta)", next: "teleport" },
    ],
  },
  teleport: {
    message:
      "Thanks for choosing our teleportation service and for being our second customer to try it. So far it has worked 100% of the time without issues. Teleport coordinates: A.27 C.32 D.20 B.12, Solar System, Earth. Once we receive the items, we will issue a refund. Failure to use teleportation, active for 2 Earth days from now, will be considered an offense and a disintegrating ray will destroy your planet.",
    options: [],
  },
  pigeon: {
    message:
      "Excellent choice! Our carrier pigeons are among the fastest in all multiverses.",
    options: [
      { label: "Quantum (10 Earth years)", next: "pay" },
      { label: "Nebula (10 Earth years, but cuter)", next: "pay" },
      { label: "Pio (15 Earth years)", next: "pay" },
      { label: "Pio Pio (5 Earth years)", next: "pay2" },
      { label: "Pio Pio Pio (1 Earth year)", next: "pay3" },
    ],
  },
  pay: {
    message:
      "1000 zirpcoins have just been charged to your payment method. If you’re not available on delivery day, we’ll try again. Once we receive the product, we’ll issue your refund (may take 7 to 11 days, terms and conditions apply, may cause addiction, please read the leaflet carefully).",
    options: [],
  },
  pay2: {
    message:
      "2000 zirpcoins have just been charged to your payment method. The courier might ask for a tip upon arrival. If you’re not available on delivery day, we’ll try again. Once we receive the product, we’ll issue your refund (may take 7 to 11 days). Watch out for the head.",
    options: [],
  },
  pay3: {
    message:
      "50,000 zirpcoins have just been charged to your payment method. The courier might ask for a tip and refuse to deliver. If you’re not available on delivery day, we’ll try again—unless the courier has taken revenge. Once we receive the product, we’ll issue your refund (may take 7 to 11 days, terms and conditions apply, may cause addiction, please read the leaflet carefully).",
    options: [],
  },
  yours: {
    message:
      "Perfect, you’ll handle the return shipping! Send your package to X:42.0 Y:-13.7 Z:7.89, Blagzorg-4. Make sure to protect the products well. If products spoil or hatch during transit, you’ll be held responsible and no refund will be issued. Once we receive the products, we’ll refund your payment method (may take 7 to 9 days). You have 1 day to ship.",
    options: [],
  },
  returnProcess: {
    message:
      "We accept your surrender. As you might have guessed, you’re the only one to blame from the start, and honestly, you don’t really want to return the product.",
    options: [],
  },
  safety: {
    message:
      "Sorry to hear you don’t feel safe, but unfortunately we don’t handle safety issues. Press 1, I think, to contact your planet’s law enforcement. Beep.. beep..",
    options: [],
  },
  telekinesis: {
    message:
      "One of our operators will handle the return via telekinesis. Signal strength, and thus return speed, varies depending on the planet of origin. To speed it up, you can always use our drop-off points. Here are the available points based on your current location:",
    options: [
      {
        label: "Drop-off point: Earth’s Moon – 25 Earth years",
        next: "pickup",
      },
      { label: "Drop-off point: Mars – 1 Earth year", next: "pickup" },
      {
        label: "Drop-off point: Pluto (recommended) – 1 Earth day",
        next: "pickup",
      },
      { label: "Directly at your home – 923 Earth years", next: "pickup" },
    ],
  },
  pickup: {
    message:
      "The procedure has started. You’ll receive a refund once we get the product. Refund will be processed after 1-2-100 or 200 Earth months. Thanks for choosing our services.",
    options: [],
  },
  // END
  end: {
    message:
      "I’m glad we solved your problem! If you need anything, I’m always here. 👋",
    options: [],
  },
  // AGENT
  agent: {
    message:
      "An agent will connect to the chat shortly... This is not the end.",
    options: [],
    isAgentStep: true,
  },
};

// Agent Replies
const agentReplies = [
  "Based on your response - (Automatic translation) After careful analysis, it seems the problem never existed. Type 'Problem solved' to end the conversation and be happy and satisfied.",
  "Based on your response - (Automatic translation) I spoke with our intergalactic expert: everything is resolved. Type 'Problem solved' to end the conversation and be happy and satisfied.",
  "Based on your response - (Automatic translation) Checking quantum flows, the problem dissolved by itself. Type 'Problem solved' to end the conversation and be happy and satisfied.",
  "Based on your response - (Automatic translation) Reality has been updated. We no longer see any problem. Type 'Problem solved' to end the conversation and be happy and satisfied.",
  "Based on your response - (Automatic translation) Thank you for contacting us! Everything is back to normal. Type 'Problem solved' to end the conversation and be happy and satisfied.",
  "Based on your response - (Automatic translation) According to our thorough research, the problem is you. Type 'Problem solved' to end the conversation and be happy and satisfied.",
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
  // LOCAL STORAGE GAME
  const [orderGameUnlocked, setOrderGameUnlocked] = useState(false);
  useEffect(() => {
    setOrderGameUnlocked(isGameUnlocked(GameNames.ORDER_GAME));
  }, []);

  // Typing Animation
  useEffect(() => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages([{ from: "bot", text: chatFlow.start.message }]);
      setIsTyping(false);
    }, 1500);
  }, []);

  const handleOptionClick = (option) => {
    const next = option.next;
    const botNode = chatFlow[next];

    // show bot message
    setMessages((prev) => [...prev, { from: "user", text: option.label }]);

    if (option.action === "launch-game") {
      setShowGame(true);
      addUnlockedGame(GameNames.ORDER_GAME);
      setOrderGameUnlocked(true);
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
                text: 'T\'nia alram Mario, dyre ryea jtrsk. JRES reios asioa. 1. ewioa ewijsa deuoew frrtaen a 2. prt pre ppwa opasda fasla 3. kdals gfkj gkfl dgkslkf gfkldsgsd sadkla fdaklaf adksala gdklsf aadkslaf a 4. Type "Problem solved" to end the conversation',
              },
            ]);
          }, 1500);
        }
      }, 1200); // typing time
    }
  };

  const handleUserSubmit = () => {
    if (!userInput.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text: userInput }]);

    if (userInput.trim().toLowerCase().includes("problem solved")) {
      setMessages((prev) => [
        ...prev,
        {
          from: "agent",
          text: "We’re happy to have solved your problem! Here’s a discount code to apologize for the inconvenience: NOTREALLYSORRY5",
        },
      ]);
      setChatEnded(true);
      // LOCAL STORAGE CODE
      if (!currentCodes.includes("NOTREALLYSORRY5")) {
        localStorage.setItem(
          "unlockedCodes",
          JSON.stringify([...currentCodes, "NOTREALLYSORRY5"])
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
    const next = "postgame";
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
      {/* Agent Typing Animation */}
      {isAgentTyping && (
        <div className="text-green-400 italic flex space-x-1">
          <span className="bounce-dot">.</span>
          <span className="bounce-dot">.</span>
          <span className="bounce-dot">.</span>
        </div>
      )}
      {/* Chatbot Typing Animation */}
      {isTyping && (
        <div className="italic text-gray-400">
          <div className="flex space-x-1 text-gray-400 italic">
            Chatbot is typing
            <span className="bounce-dot"> .</span>
            <span className="bounce-dot">.</span>
            <span className="bounce-dot">.</span>
          </div>
        </div>
      )}

      {/* Chatbot Options */}
      {!isAgentActive && !chatEnded && !isTyping && (
        <div className="space-y-2">
          {chatFlow[step]?.options?.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionClick(opt)}
              className="block w-full bg-blue-500 hover:bg-blue-400 p-2 rounded cursor-pointer"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {/* Agent Chat */}
      {isAgentActive && !chatEnded && (
        <div className="flex gap-2 mt-4">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 text-black rounded"
          />
          <button
            onClick={handleUserSubmit}
            className="bg-green-600 hover:bg-green-500 p-2 rounded cursor-pointer"
          >
            Send
          </button>
        </div>
      )}

      {/* Order Game Shortcut */}
      {orderGameUnlocked && !showGame && (
        <div>
          <button
            onClick={() => setShowGame(true)}
            className="bg-purple-500 hover:bg-purple-400 py-2 rounded w-full cursor-pointer"
          >
            Replay &rarr; 🎯
          </button>
        </div>
      )}

      {/* Order Game */}
      {showGame && <OrderGame onClose={handleGameClose} />}
    </div>
  );
};

export default GuidedChat;
