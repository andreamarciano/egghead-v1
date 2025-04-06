import React, { useState } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    // Chiamata all'API Flask per ottenere i dati meteo
    fetch(`https://andreafactoryproject-v1.onrender.com/meteo?citta=${city}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.errore) {
          setError(data.errore);
        } else {
          setWeather(data);
          setError(null);
        }
      })
      .catch((err) => {
        setError("Errore nella chiamata API");
        console.error(err);
      });
  };

  return (
    <div>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Inserisci una città"
      />
      <button onClick={handleSubmit}>Ottieni meteo</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div>
          <h3>Il meteo a {weather.città}</h3>
          <p>{weather.descrizione}</p>
          <p>Temperatura: {weather.temperatura}°C</p>
          <p>Vento: {weather.vento} km/h</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
