import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

if (!UNSPLASH_ACCESS_KEY) {
  console.error("❌ UNSPLASH_ACCESS_KEY not found on .env!");
  process.exit(1);
}

app.use(cors());
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// UNPLASH Endpoint
app.get("/images", async (req, res) => {
  const query = req.query.query || "city";

  try {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
      query
    )}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=6`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results.map((photo) => ({
      id: photo.id,
      alt_description: photo.alt_description,
      description: photo.description,
      urls: photo.urls,
      links: photo.links,
      likes: photo.likes,
      user: {
        name: photo.user.name,
        profile_url: photo.user.links.html,
        instagram_username: photo.user.instagram_username,
        profile_image: photo.user.profile_image,
      },
      created_at: photo.created_at,
      color: photo.color,
    }));

    res.json({ total: data.total, results });
  } catch (error) {
    console.error("Error fetching Unsplash images:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// WIKIPEDIA Endpoint
app.get("/citydesc", async (req, res) => {
  const city = req.query.city || "Rome";

  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
      city
    )}`;
    const response = await fetch(url);
    const data = await response.json();

    const cityInfo = {
      title: data.title,
      description: data.extract,
      thumbnail: data.thumbnail?.source,
      content_urls: data.content_urls,
    };

    res.json(cityInfo);
  } catch (error) {
    console.error("Error fetching Wikipedia city description:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server live on http://localhost:${PORT}`);
});
