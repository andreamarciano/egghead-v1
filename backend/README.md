# Weather Component

This project includes a **weather** section that allows users to search for the current weather conditions in any city using the [OpenWeatherMap API](https://openweathermap.org/). It consists of two main components:

- A **backend service** written in Python (`weather.py`) that handles the API requests.
- A **frontend component** in React (`Weather.jsx`) that displays the weather data to the user.

---

## 🔧 Backend – `weather.py`

This is a simple Flask server that serves as a middle layer between the frontend and the OpenWeatherMap API.

### How it works:

1. The backend reads the OpenWeatherMap API key from an **environment variable** (`OPENWEATHER_API_KEY`).
2. It exposes a single endpoint:  
   `GET /weather?city=CityName`
3. The server calls the OpenWeatherMap API using the city name provided.
4. It returns a cleaned and simplified JSON response to the frontend, including:
   - temperature, feels like, min/max
   - weather description and icon
   - humidity, wind speed, pressure, visibility
   - sunrise and sunset times

### Sample Response:

```json
{
  "city": "London",
  "temperature": 16,
  "feels_like": 14,
  "temp_min": 13,
  "temp_max": 18,
  "description": "light rain",
  "wind_speed": 10,
  "humidity": 87,
  "pressure": 1012,
  "visibility": 10,
  "icon": "http://openweathermap.org/img/wn/10d@2x.png",
  "sunrise": 1716789351,
  "sunset": 1716846563
}
```

---

## 🌐 Frontend – `Weather.jsx`

This React component allows users to enter a city and view its current weather.

### Key Features:

- Input field and search button
- Weather data display (temperature, humidity, icon, etc.)
- Dynamic UI with different colors based on temperature and humidity
- Error handling and loading states
- Custom weather messages and wind direction calculation
- A "ticker" section with animated weather-related text

### Logic Highlights:

- `fetch()` is used to call the Flask backend (deployed on Render)
- Various helper functions handle:

  - temperature color
  - humidity bar color
  - weather advice messages
  - wind direction based on degrees

---

## 🚀 Deployment with Render

The Flask backend is deployed on [Render.com](https://render.com/), which allows easy hosting for web services with support for environment variables and automatic redeployment on Git pushes.

### Why Render?

- Free tier available
- Simple setup for Flask
- Automatic HTTPS
- Built-in environment variable support (ideal for **hiding API keys**)

### My Setup:

- The API key (`OPENWEATHER_API_KEY`) is stored securely in the **Environment Variables** section of the Render dashboard.
- The service is exposed at `https://andreafactoryproject-v1.onrender.com/weather`.

---

## 🔐 Using Your Own API Key

If someone wants to fork this project and use it independently, they'll need their own OpenWeatherMap API key.

### Steps:

1. Sign up at [https://openweathermap.org/api](https://openweathermap.org/api)
2. Get your API key (usually delivered by email instantly).
3. Create a `.env` file (if running locally) or set the variable in Render:

   ```bash
   OPENWEATHER_API_KEY=your_api_key_here
   ```

4. Deploy the Flask backend with the correct environment variable set.

> **Note:** Without a valid API key, the weather endpoint will return an error and the frontend will show a generic API error message.
