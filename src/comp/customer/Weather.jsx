import { useState } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Submit
  const handleSubmit = () => {
    // empty
    if (!city) {
      setError("Please enter a city.");
      return;
    }
    setLoading(true);
    setError(null);

    // API Call
    fetch(`https://andreafactoryproject-v1.onrender.com/weather?city=${city}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setWeather(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError("API call error");
        console.error(err);
      });

    setCity("");
  };

  // UI - background color
  const getTemperatureColor = (temp) => {
    if (temp <= 10) return "bg-blue-400"; // Cold
    if (temp <= 20) return "bg-yellow-400"; // Mild
    return "bg-red-400"; // Warm
  };
  // UI - humidity bar
  const getHumidityColor = (humidity) => {
    if (humidity < 30) return "bg-blue-500"; // Low humidity
    if (humidity < 70) return "bg-yellow-500"; // Medium humidity
    return "bg-red-500"; // High humidity
  };
  // UI - message
  const getWeatherMessage = (description) => {
    if (!description || typeof description !== "string") {
      return "Weather forecast not available!";
    }

    const desc = description.toLowerCase();

    if (
      desc.includes("rain") ||
      desc.includes("drizzle") ||
      desc.includes("shower")
    )
      return "Take an umbrella, it looks like rain!";
    if (desc.includes("clear"))
      return "It's a beautiful day! Perfect for going out!";
    if (desc.includes("cloud")) return "It might be cloudy today, be prepared!";
    if (desc.includes("snow"))
      return "Snow is falling! Perfect time for a hot chocolate.";
    if (desc.includes("mist") || desc.includes("fog") || desc.includes("haze"))
      return "There's haze, drive carefully!";
    if (desc.includes("thunderstorm"))
      return "Thunderstorm incoming! Stay safe indoors.";
    if (
      desc.includes("smoke") ||
      desc.includes("dust") ||
      desc.includes("sand")
    )
      return "Air quality is poor, avoid strenuous outdoor activities.";
    if (desc.includes("tornado"))
      return "Weather alert: tornado! Take precautions.";

    return "No specific weather forecast available!";
  };
  // UI - wind direction
  const getWindDirection = (deg) => {
    if (deg > 337.5 || deg <= 22.5) return "North";
    if (deg > 22.5 && deg <= 67.5) return "Northeast";
    if (deg > 67.5 && deg <= 112.5) return "East";
    if (deg > 112.5 && deg <= 157.5) return "Southeast";
    if (deg > 157.5 && deg <= 202.5) return "South";
    if (deg > 202.5 && deg <= 247.5) return "Southwest";
    if (deg > 247.5 && deg <= 292.5) return "West";
    return "Northwest";
  };

  // Weather Ticker
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
    <div className="mt-8 p-6 bg-gray-600 rounded-lg shadow-md space-y-6">
      <p className="mb-8">Meanwhile, why not check the weather in your city?</p>
      {/* Input City */}
      <div className="flex justify-center items-center space-x-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter a city"
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleSubmit}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-400 cursor-pointer"
        >
          Search
        </button>
      </div>

      {/* Error message */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Loader */}
      {loading && <p className="text-center text-blue-500">Loading...</p>}

      {/* Weather UI */}
      {weather && !loading && (
        <div
          className={`p-6 ${getTemperatureColor(
            weather.temperature
          )} rounded-lg shadow-md max-w-sm mx-auto`}
        >
          <h3 className="text-2xl font-bold text-center">
            Weather in {weather.city}
          </h3>
          <div className="mt-4 text-center space-y-2">
            <img src={weather.icon} alt="Weather Icon" className="mx-auto" />
            <p className="text-lg">{weather.description}</p>
            <p className="text-xl font-semibold">{weather.temperature}°C</p>
            <p>Feels like: {weather.feels_like}°C</p>
            <p className="text-sm text-gray-600">
              Min: {weather.temp_min}°C, Max: {weather.temp_max}°C
            </p>

            {/* Message */}
            <p className="text-md italic mt-2">
              {getWeatherMessage(weather.description)}
            </p>

            <p className="text-sm text-gray-600">
              Vento: {weather.wind_speed} km/h -{" "}
              {getWindDirection(weather.wind_speed)}
            </p>
            <div className="my-4">
              <label>Humidity: {weather.humidity}%</label>
              <div
                className={`h-2 w-full ${getHumidityColor(
                  weather.humidity
                )} rounded`}
              ></div>
            </div>
            <p className="text-sm text-gray-600">
              Pressure: {weather.pressure} hPa
            </p>
            <p className="text-sm text-gray-600">
              Visibility: {weather.visibility} km
            </p>
            <p className="text-sm text-gray-600">
              🌅 Sunrise:{" "}
              {new Date(weather.sunrise * 1000).toLocaleTimeString("it-IT", {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              | 🌇 Sunset:{" "}
              {new Date(weather.sunset * 1000).toLocaleTimeString("it-IT", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      )}

      {/* Weather Ticker */}
      <div className="overflow-hidden whitespace-nowrap bg-gray-950 text-green-400 py-2 px-4 font-mono mt-6">
        <div
          className="inline-block animate-scroll"
          style={{ animation: `scroll 200s linear infinite` }}
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
    </div>
  );
};

export default Weather;
