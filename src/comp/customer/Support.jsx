import { useState } from "react";
import GuidedChat from "./GuidedChat";

const Support = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="flex space-x-8 mt-8 p-6 bg-gray-600 rounded-lg shadow-md">
      {/* Left side: Contact Info */}
      <div className="w-1/2 space-y-4">
        <h3 className="text-xl font-semibold">Contact Support</h3>
        <p className="text-gray-800">
          For assistance, you can reach us through:
        </p>
        <ul className="text-blue-300 space-y-2 list-none pl-0">
          <li className="flex items-start gap-2">
            📧 <span>Email: hopeless@nevergonnareply.com</span>
          </li>
          <li className="flex items-start gap-2">
            📞 <span>Phone: +11 333 AX1 2-8-1</span>
          </li>
          <li className="flex items-start gap-2">
            🧠 <span>Telepathic Frequency: 0.1235 Hz</span>
          </li>
          <li className="flex items-start gap-2">
            🚀{" "}
            <span>
              Rocket message: Coordinates X:42.0 Y:-13.7 Z:7.89, Blagzorg-4
            </span>
          </li>
          <li className="flex items-start gap-2">
            🐦{" "}
            <span>Request via carrier pigeon (3 days and 7 cosmic eras)</span>
          </li>
          <li className="flex items-start gap-2">
            🍞 <span>Talk to your toaster (AI-12 models supported)</span>
          </li>
          <li className="flex items-start gap-2">
            🧘‍♂️ <span>Transmit a positive thought every 13 minutes</span>
          </li>
          <li className="flex items-start gap-2">
            🔦 <span>Send Morse code messages into deep space</span>
          </li>
        </ul>
      </div>

      {/* Right side: Chat with Operator */}
      <div className="w-1/2 space-y-4">
        <h3 className="text-xl font-semibold">Chat with an Operator</h3>
        <p className="text-gray-800">
          If you prefer a real-time chat, click here to start.
        </p>
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-400 cursor-pointer"
        >
          {isChatOpen ? "Close Chat" : "Open Chat"}
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

export default Support;
