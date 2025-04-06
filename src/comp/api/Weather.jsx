import { useState } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
  };

  return (
    <div className="space-y-6">
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
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-400"
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
        <div className="p-6 bg-blue-300 rounded-lg shadow-md max-w-sm mx-auto">
          <h3 className="text-2xl font-bold text-center">
            Meteo a {weather.citta}
          </h3>
          <div className="mt-4 text-center">
            <img src={weather.icona} alt="Icona meteo" className="mx-auto" />
            <p className="text-lg">{weather.descrizione}</p>
            <p className="text-xl font-semibold">{weather.temperatura}°C</p>
            <p>Percepita: {weather.temperatura_percepita}°C</p>
            <p className="text-sm text-gray-600">
              Min: {weather.temp_min}°C, Max: {weather.temp_max}°C
            </p>
            <p className="text-sm text-gray-600">Vento: {weather.vento} km/h</p>
            <p className="text-sm text-gray-600">Umidità: {weather.umidita}%</p>
            <p className="text-sm text-gray-600">
              Pressione: {weather.pressione} hPa
            </p>
            <p className="text-sm text-gray-600">
              Visibilità: {weather.visibilita} km
            </p>
            <p className="text-sm text-gray-600">
              Alba: {new Date(weather.alba * 1000).toLocaleTimeString()} |
              Tramonto: {new Date(weather.tramonto * 1000).toLocaleTimeString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
