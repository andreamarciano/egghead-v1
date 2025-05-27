from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests

app = Flask(__name__)
CORS(app)

# Get API key from environment variables (Render)
api_key = os.environ.get("OPENWEATHER_API_KEY")
if not api_key:
    raise ValueError("API key not found in environment variables!")

@app.route("/weather", methods=["GET"])
def weather():
    city = request.args.get("city", "Nijmegen")  # Default
    weather_response = requests.get(
        f"https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid={api_key}")
        # units of measurement: standard, metric, imperial
        
    print(weather_response.json())
    
    # check the status code value: 404 = name not found
    if weather_response.json()['cod'] == '404':
        return jsonify({"error": "City not found"}), 404
    
    data = weather_response.json()
    weather_info = {
        "city": data["name"],
        "temperature": round(data["main"]["temp"]),
        "feels_like": round(data["main"]["feels_like"]),
        "temp_min": round(data["main"]["temp_min"]),
        "temp_max": round(data["main"]["temp_max"]),
        "description": data["weather"][0]["description"],
        "wind_speed": round(data["wind"]["speed"] * 3.6), # from m/s to km/h
        "humidity": data["main"]["humidity"],
        "pressure": data["main"]["pressure"],
        "visibility": data["visibility"] / 1000, # km
        "icon": f"http://openweathermap.org/img/wn/{data['weather'][0]['icon']}@2x.png", # icon url
        "sunrise": data["sys"]["sunrise"],
        "sunset": data["sys"]["sunset"]
    }
    
    return jsonify(weather_info)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)