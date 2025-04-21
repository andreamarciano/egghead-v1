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
      setError("Per favore, inserisci una città.");
      return;
    }
    setLoading(true);
    setError(null);

    // API Call
    fetch(`https://andreafactoryproject-v1.onrender.com/meteo?citta=${city}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.errore) {
          setError(data.errore);
        } else {
          setWeather(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError("Errore nella chiamata API");
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
  const getWeatherMessage = (descrizione) => {
    const desc = descrizione.toLowerCase();

    if (
      desc.includes("rain") ||
      desc.includes("drizzle") ||
      desc.includes("shower")
    )
      return "Prendi un ombrello, sembra che stia per piovere!";
    if (desc.includes("clear"))
      return "È una bella giornata! Perfetta per uscire!";
    if (desc.includes("cloud"))
      return "Oggi potrebbe essere nuvoloso, preparati!";
    if (desc.includes("snow"))
      return "Nevica! È il momento perfetto per una cioccolata calda.";
    if (desc.includes("mist") || desc.includes("fog") || desc.includes("haze"))
      return "C'è foschia, guida con prudenza!";
    if (desc.includes("thunderstorm"))
      return "Temporale in arrivo! Resta al sicuro al chiuso.";
    if (
      desc.includes("smoke") ||
      desc.includes("dust") ||
      desc.includes("sand")
    )
      return "La qualità dell’aria non è ottima, evita sforzi all’aperto.";
    if (desc.includes("tornado"))
      return "Allerta meteo: tornado! Prendi precauzioni.";

    return "Previsioni meteo non specifiche disponibili!";
  };
  // UI - wind direction
  const getWindDirection = (deg) => {
    if (deg > 337.5 || deg <= 22.5) return "Nord";
    if (deg > 22.5 && deg <= 67.5) return "Nord-Est";
    if (deg > 67.5 && deg <= 112.5) return "Est";
    if (deg > 112.5 && deg <= 157.5) return "Sud-Est";
    if (deg > 157.5 && deg <= 202.5) return "Sud";
    if (deg > 202.5 && deg <= 247.5) return "Sud-Ovest";
    if (deg > 247.5 && deg <= 292.5) return "Ovest";
    return "Nord-Ovest";
  };

  // Weather Ticker
  const ticker = [
    "🌠 Tempesta di meteore su Nebula 4, non dimenticate il vostro asciugamano!",
    "💨 Venti supersonici su Xeron-12, evitare di aprire il finestrino.",
    "Tempesta solare in arrivo su Zogton-9, proteggere i vostri dispositivi!",
    "Notizia da Terra: il traffico ha raggiunto livelli spaziali, ma senza nessuna navetta spaziale!",
    "🪐 800°C previsti su Mercurio Centrale: ottima giornata per friggere un uovo al suolo.",
    "Gravità aumentata su Gorg-5, attenzione agli oggetti pesanti!",
    "👾 Blarz trs jids EWj sjk jia! ds'jiE ffako daçsdaò",
    "I laghi di Phend-2 stanno evaporando, aspettatevi panorami spettacolari!",
    "Su Zantor-3, la pioggia è fatta di cristalli di zucchero. Siate golosi!",
    "Notizia su Terra: un altro giorno in cui nessuno trova il proprio telecomando. Che sorpresa!",
    "🌌 Gravità inversa su Plutone Est: appendete le uova al soffitto.",
    "La luna di Xylan-7 sta cambiando colore, preparatevi a un'eclissi mozzafiato!",
    "Su Wrigg-6, i venti sono così forti che volano gli edifici. Non dimenticate di legarvi!",
    "🌋 Vulcano di lava rosa attivo su Venere Sud. Vista spettacolare garantita.",
    "Meteore colorate in arrivo su Gurnok-4, preparatevi a fare wish!",
    "🐙 Pioggia di molluschi su Atlantidea VII. Giornata perfetta per zuppe.",
    "Le foreste di Zorkon-8 stanno respirando, aspettatevi strani rumori questa notte.",
    "Su Jexon-9, l'aria è più pulita di quella di Terra... e non hanno nemmeno un depuratore!",
    "🧊 Congelamento istantaneo su Glaciaris-9. Portate calzini termici.",
    "L'acqua su Trelos-5 ha proprietà anti-aging, ogni bicchiere vi farà sentire più giovani!",
    "Su Blibra-2, un'incredibile nevicata di diamanti sta decorando i cieli!",
    "🔮 Oroscopo spaziale: ottima giornata per covare nuove uova stellari.",
    "☄️ Sciame di comete previsto su Orblax. Fotografare con cautela.",
    "Su Zoltron-8: Abbiamo osservato gli umani per settimane, e il loro passatemdo preferito sembra essere 'scorrere social media'... molto produttivo!",
  ];

  const [tickerText, setTickerText] = useState(ticker.join("   •   "));

  return (
    <div className="mt-8 p-6 bg-gray-600 rounded-lg shadow-md space-y-6">
      <p className="mb-8">
        Nel frattempo, perché non controlli il meteo nella tua città?
      </p>
      {/* Input City */}
      <div className="flex justify-center items-center space-x-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Inserisci una città"
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleSubmit}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-400 cursor-pointer"
        >
          Cerca
        </button>
      </div>

      {/* Error message */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Loader */}
      {loading && <p className="text-center text-blue-500">Caricamento...</p>}

      {/* Weather UI */}
      {weather && !loading && (
        <div
          className={`p-6 ${getTemperatureColor(
            weather.temperatura
          )} rounded-lg shadow-md max-w-sm mx-auto`}
        >
          <h3 className="text-2xl font-bold text-center">
            Meteo a {weather.citta}
          </h3>
          <div className="mt-4 text-center space-y-2">
            <img src={weather.icona} alt="Icona meteo" className="mx-auto" />
            <p className="text-lg">{weather.descrizione}</p>
            <p className="text-xl font-semibold">{weather.temperatura}°C</p>
            <p>Percepita: {weather.temperatura_percepita}°C</p>
            <p className="text-sm text-gray-600">
              Min: {weather.temp_min}°C, Max: {weather.temp_max}°C
            </p>

            {/* Message */}
            <p className="text-md italic mt-2">
              {getWeatherMessage(weather.descrizione)}
            </p>

            <p className="text-sm text-gray-600">
              Vento: {weather.vento} km/h - {getWindDirection(weather.vento)}
            </p>
            <div className="my-4">
              <label>Umidità: {weather.umidita}%</label>
              <div
                className={`h-2 w-full ${getHumidityColor(
                  weather.umidita
                )} rounded`}
              ></div>
            </div>
            <p className="text-sm text-gray-600">
              Pressione: {weather.pressione} hPa
            </p>
            <p className="text-sm text-gray-600">
              Visibilità: {weather.visibilita} km
            </p>
            <p className="text-sm text-gray-600">
              🌅 Alba:{" "}
              {new Date(weather.alba * 1000).toLocaleTimeString("it-IT", {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              | 🌇 Tramonto:{" "}
              {new Date(weather.tramonto * 1000).toLocaleTimeString("it-IT", {
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
