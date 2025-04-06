from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests

app = Flask(__name__)
CORS(app)

# Get API key from environment variables (Render)
api_key = os.environ.get("OPENWEATHER_API_KEY")
if not api_key:
    raise ValueError("API key non trovata nelle variabili d'ambiente!")

@app.route("/meteo", methods=["GET"])
def meteo():
    citta = request.args.get("citta", "Palermo")  # Default to "Palermo" if no city is provided
    weather_data = requests.get(
        f"https://api.openweathermap.org/data/2.5/weather?q={citta}&units=metric&appid={api_key}")
        # units of measurement: standard, metric, imperial
    
    # check the status code value: 404 = name not found
    if weather_data.json()['cod'] == '404':
        return jsonify({"errore": "City not founded"}), 404
    
    data = weather_data.json()
    meteo = {
        "citta": data["name"],
        "temperatura": round(data["main"]["temp"]),
        "descrizione": data["weather"][0]["description"],
        "vento": round(data["wind"]["speed"] * 3.6)  # from m/s to km/h
    }
    
    return jsonify(meteo)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)