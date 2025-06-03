import { useState } from "react";

function Ticker() {
  const ticker = [
    "🌠 Meteor storm over Nebula 4 — don't forget your towel!",
    "💨 Supersonic winds on Xeron-12. Best not to roll down the window.",
    "Solar storm approaching Zogton-9 — shield your devices!",
    "Earth update: traffic has reached cosmic levels… still no sign of a single spaceship.",
    "🪐 800°C expected on Central Mercury — perfect day to fry an egg on the ground.",
    "Increased gravity on Gorg-5. Watch out for heavy stuff!",
    "👾 Blarz trs jids EWj sjk jia! ds'jiE ffako daçsdaò",
    "The lakes of Phend-2 are evaporating — expect breathtaking dry scenery!",
    "On Zantor-3, it’s raining sugar crystals. Sweet tooths rejoice!",
    "Earth update: another day, another lost remote. Classic.",
    "🌌 Reverse gravity reported on East Pluto — hang your eggs from the ceiling.",
    "The moon of Xylan-7 is changing color. Get ready for a jaw-dropping eclipse!",
    "Winds on Wrigg-6 are so strong, buildings are airborne. Tie yourself down!",
    "🌋 Pink lava volcano active on South Venus — unforgettable view guaranteed.",
    "Colorful meteors spotted heading for Gurnok-4 — get ready to wish upon them!",
    "🐙 Mollusk rain hits Atlantidea VII. Great day for seafood soup.",
    "Forests on Zorkon-8 are breathing — expect some weird nighttime noises.",
    "On Jexon-9, the air is cleaner than Earth’s… and they don’t even have purifiers!",
    "🧊 Instant freezing on Glaciaris-9. Thermal socks highly recommended.",
    "Water on Trelos-5 has anti-aging properties — one sip and you’ll feel younger!",
    "On Blibra-2, a diamond snowstorm is dazzling the skies!",
    "🔮 Space horoscope: excellent day to hatch some stellar eggs.",
    "☄️ Comet swarm expected near Orblax — photograph carefully.",
    "On Zoltron-8: We've observed humans for weeks. Their favorite activity? Scrolling. Endlessly. Fascinating.",
  ];

  const [tickerText, setTickerText] = useState(ticker.join("   •   "));

  return (
    <>
      {/* Ticker */}
      <div className="overflow-hidden whitespace-nowrap bg-gray-950 text-green-400 rounded-xl py-8 px-4 font-mono">
        <div
          className="inline-block animate-scroll"
          style={{ animation: `scroll 300s linear infinite` }}
        >
          {tickerText} • {tickerText}
        </div>
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </>
  );
}

export default Ticker;
