import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const GNEWS_API_KEY = process.env.GNEWS_API_KEY;

if (!GNEWS_API_KEY) {
  console.error("❌ GNEWS_API_KEY not found on .env!");
  process.exit(1);
}

app.use(cors());

app.get("/news", async (req, res) => {
  const topic = req.query.topic || "world";
  const country = req.query.country || "it";

  try {
    const url = `https://gnews.io/api/v4/top-headlines?country=${country}&category=${topic}&apikey=${GNEWS_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error("Errore nella chiamata API:", error);
    res.status(500).json({ error: "Errore nel server." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server live on http://localhost:${PORT}`);
});
