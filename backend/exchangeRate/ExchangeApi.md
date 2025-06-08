# 💱 Exchange Rate API

## Project Overview

This project provides a simple currency conversion API backend using Node.js and Express.
The frontend is a React app that lets users select a currency and convert an order total from EUR to that currency.

The backend acts as a proxy to the [exchangerate.host](https://exchangerate.host) API, shielding the client from direct API key exposure, adding basic validation, logging, and error handling.

---

## 🛠️ Technologies Used

- **Backend:** Node.js, Express.js, CORS, dotenv
- **API:** exchangerate.host (third-party exchange rates API)
- **Frontend:** React (hooks, state), Tailwind CSS
- **Deployment:** Render.com for backend, Netlify for frontend

---

## 📁 Folder Structure

```
/react-app
├── /backend
│   └── /exchangeRate
│       ├── index.js
│       ├── package.json
│       └── package-lock.json
└── /frontend
    ├── /src
    └── package.json
```

---

## 🖥️ Backend Setup

1. Navigate to the `backend/exchangeRate` folder.

2. Initialize a new Node.js project:

```bash
npm init -y
```

3. Install dependencies:

```bash
npm install express cors dotenv node-fetch
```

4. Implement the server (`index.js`):

```js
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const EXCHANGE_API_KEY = process.env.EXCHANGE_API_KEY;

if (!EXCHANGE_API_KEY) {
  console.error("❌ EXCHANGE_API_KEY not found in .env!");
  process.exit(1);
}

app.use(cors());

// Simple request logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get("/exchange", async (req, res) => {
  const currency = req.query.to || "USD";
  const amount = req.query.amount;

  console.log(`Currency Conversion Request: EUR → ${currency} (${amount})`);

  if (!amount || isNaN(amount)) {
    console.warn("Invalid amount:", amount);
    return res.status(400).json({ error: "Invalid amount" });
  }

  try {
    const url = `https://api.exchangerate.host/convert?access_key=${EXCHANGE_API_KEY}&from=EUR&to=${currency}&amount=${amount}`;
    const response = await fetch(url);
    const data = await response.json();

    res.json({ convertedAmount: data.result });
  } catch (error) {
    console.error("API call Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server live on http://localhost:${PORT}`);
});
```

---

## 🖥️ Frontend Integration (React)

In your React checkout component, you manage currency selection and conversion:

- Store `currency`, `convertedTotal`, and `loading` states with `useState`.
- On clicking the "Convert" button, call your backend API endpoint `/exchange?amount=X&to=CUR`.
- Show a loading message while fetching.
- Display converted total after receiving the response.

Example simplified handler:

```js
const handleCurrencyConversion = async () => {
  setLoading(true);

  try {
    const res = await fetch(
      `https://your-backend-url/exchange?amount=${finalTotal}&to=${currency}`
    );
    const data = await res.json();
    setConvertedTotal(data.convertedAmount);
    setConvertedCurrency(currency);
  } catch (err) {
    console.error("Error converting currency:", err);
  } finally {
    setLoading(false);
  }
};
```

---

## 🚀 Deployment

### Backend

1. Push the backend code to GitHub.
2. Create a new Node.js web service on Render.com.
3. Set environment variable `EXCHANGE_API_KEY` on Render.
4. Use build command `npm install` and start command `npm start`.

### Frontend

Deploy frontend on Netlify, Vercel, or your preferred platform, and update the fetch URL in React to point to the deployed backend.

---

## 🔐 Environment Variables

- `EXCHANGE_API_KEY`: API key for exchangerate.host.

---

## 📝 Note on Custom Currency Rates

In the frontend code, you might notice some "custom" or fictional exchange rates hardcoded for demonstration or special use cases. These do not call the backend or third-party API and exist purely for testing or UI/UX purposes. The backend always delegates conversion to the external API for standard currencies.
