import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const EXCHANGE_API_KEY = process.env.EXCHANGE_API_KEY;

if (!EXCHANGE_API_KEY) {
  console.error("❌ EXCHANGE_API_KEY not found on .env!");
  process.exit(1);
}

app.use(cors());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get("/exchange", async (req, res) => {
  const currency = req.query.to || "USD";
  const amount = req.query.amount;

  console.log(`Currency Conversion Request: EUR → ${currency} (${amount})`);

  if (!amount || isNaN(amount)) {
    console.warn("Invalid quantity:", amount);
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
