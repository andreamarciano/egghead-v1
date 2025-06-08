# 📰 News Aggregator App

A full-stack application that fetches and displays top news articles based on selected topics and countries.

The backend securely proxies requests to the GNews API, ensuring API keys remain confidential.

---

## Project Overview

This application serves as a news aggregator, allowing users to:

- Select a topic (e.g., World, Business, Technology)
- Choose a country (e.g., Italy, USA)
- View top news articles from the GNews API

The backend, built with Node.js and Express, acts as a proxy to the GNews API, ensuring that the API key remains secure and is not exposed to the frontend.

---

## 🛠️ Technologies Used

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **API**: GNews API ([https://gnews.io/](https://gnews.io/))
- **Deployment**: Render.com
- **Environment Variables**: dotenv

---

## 📁 Folder Structure

```
/react-app
├── /backend
│   └── /news
│       ├── .env
│       ├── index.js
│       ├── package.json
│       └── package-lock.json
└── /frontend
    ├── /src
    └── package.json
```

---

## 🖥️ Backend Setup

1. Navigate to the `backend/news` directory.

2. Initialize a new Node.js project:

   ```bash
   npm init -y
   ```

3. Install required dependencies:

   ```bash
   npm install express cors dotenv node-fetch
   ```

4. Create the `index.js` file with the following content:

   ```js
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
   ```

5. Create a `.env` file containing your GNews API key:

```

GNEWS_API_KEY=your_api_key_here

```

6. Test that everything works locally:

```

npm start

```

You should see the message indicating the server is live. To verify, open your browser and navigate to http://localhost:3000/news?country=it&topic=world to see if you receive the JSON response.

---

## 🖥️ Frontend Integration

In your React component:

```js
import { useState } from "react";
import SelectGroup from "./SelectGroup";
import { topicOptions, countryOptions } from "./options";
import NewsCard from "./NewsCard";

function News() {
  const [topic, setTopic] = useState("world");
  const [country, setCountry] = useState("it");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = () => {
    setLoading(true);
    fetch(
      `https://egghead-v1-news.onrender.com/news?topic=${topic}&country=${country}`
    )
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API error:", err);
        setLoading(false);
      });
  };

  return (
    <div>
      {/* News */}
      <h1>News</h1>
      <div>
        {/* Topic */}
        <SelectGroup
          id="topic"
          label="Choose Topic"
          value={topic}
          onChange={setTopic}
          data={topicOptions}
        />

        {/* Country */}
        <SelectGroup
          id="country"
          label="Choose Country"
          value={country}
          onChange={setCountry}
          data={countryOptions}
        />

        {/* Search Button */}
        <button onClick={fetchNews}>Search</button>
      </div>

      {/* Render News */}
      <div>
        <h2>
          📰 {topic.charAt(0).toUpperCase().concat(topic.slice(1))} -{" "}
          {country.toUpperCase()}
        </h2>

        {/* Loading */}
        {loading && <p>Loading News...</p>}
        {!loading && articles.length === 0 && (
          <p>No news found for this selection.</p>
        )}

        {/* News Card */}
        {!loading &&
          articles.map((art, i) => <NewsCard key={i} article={art} />)}
      </div>
    </div>
  );
}
```

---

## 🚀 Deployment

### Backend

1. Push the `backend/news` directory to your GitHub repository.

2. Create a new Node.js service (Web Service) on Render.com:

   - **Name**: `factoryproject-news`
   - **Branch**: `main`
   - **Root Directory**: `backend/news`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

3. Set the environment variable on Render:

   - **Key**: `GNEWS_API_KEY`
   - **Value**: `your_api_key_here`

### Frontend

1. Push the frontend code to your GitHub repository.

2. Deploy the frontend using your preferred platform (e.g., Netlify, Vercel).

3. Ensure the frontend makes requests to the deployed backend URL.

---

## 🔐 Environment Variables

- `GNEWS_API_KEY`: Your GNews API key.

---
