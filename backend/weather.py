import os
import requests

# Get API key from Render
api_key = os.environ.get("OPENWEATHER_API_KEY")
if not api_key:
    raise ValueError("API key non trovata nelle variabili d'ambiente!")

#user_input = input("Enter city name: ")
user_input = "Palermo"

weather_data = requests.get(
    f"https://api.openweathermap.org/data/2.5/weather?q={user_input}&units=metric&APPID={api_key}")
    # units of measurement: standard, metric, imperial

# print(weather_data.status_code)     # verify the request has been successful (200)
# print(weather_data.json())          # print data

# check the status code value: 404 = name not found
if weather_data.json()['cod'] == '404':
    print("No City Found.")
else:
    # weather
    weather = weather_data.json()['weather'][0]['description']
    # temperature
        # temp_fahrenheit = weather_data.json()['main']['temp']   # (temp °F - 32) × 5/9 = temp °C
        # temp_celsius = round((temp_fahrenheit - 32) * 5/9)
    temp = round(weather_data.json()['main']['temp'])
    # wind
    wind_speed = round(weather_data.json()['wind']['speed'] * 3.6)     # m/s * 3.6 = km/h

    print(f"The weather in {user_input} is: {weather.upper()}.")
    print(f"The temperature in {user_input} is: {temp}°C.")
    print(f"The wind in {user_input} is: {wind_speed} km/h.")