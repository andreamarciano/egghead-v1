# Node.js - Express

## Project Initialization

To set up a new Node.js project with Express:

```bash
npm init -y                  # Initializes package.json with default values
npm install express          # Installs Express as a dependency
npm install nodemon --save-dev  # Installs nodemon as a development dependency
```

Then, update the `scripts` section of your `package.json`:

```json
"scripts": {
  "start": "nodemon index.js"
}
```

> This allows you to start your development server with `npm start` and automatically restart it when files change.

---

## Basic Express Server

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/about", (req, res) => {
  res.send("About");
});

// Catch-all for undefined routes (404)
app.use((req, res) => {
  res.status(404).send("<h1>Not Found</h1>");
});

/* 
// Older version:
app.all("*", (req, res) => { 
  res.send("<h1>Not Found</h1>");
});
*/

app.listen(3000);
```

---

## API Server (GNews)

```js
import express from "express"; // handling HTTP requests
import cors from "cors"; // allows cross-origin requests (e.g. from our frontend React app)
import fetch from "node-fetch"; // make HTTP requests to the GNews API
import dotenv from "dotenv"; // load environment variables (API key)

const app = express();
const PORT = process.env.PORT || 3000; // fallback
```

- `express()` creates the application instance.

```js
app.use(cors());
```

- Adding middleware using `.use()`: "for every request, apply this logic"; in this case, ensures our frontend can talk to this backend.

```js
app.get("/news", async (req, res) => {
  const topic = req.query.topic || "world";
  const country = req.query.country || "it";
```

- We define a **route handler** for `GET /news`.
- We use `req.query` to get optional parameters — dynamic route behavior.

```js
  try {
    const url = `https://gnews.io/api/v4/top-headlines?...`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Errore nella chiamata API:", error);
    res.status(500).json({ error: "Errore nel server." });
  }
});
```

- This part is fully **asynchronous**, and is handled by the **event loop**.
- The `fetch()` call is non-blocking, so Node continues processing other requests while waiting.
- We use `async/await` for cleaner syntax, instead of raw callbacks or `.then()`.
- `res.json(data)` is Express's way of sending back JSON — like `res.send()` but for structured data.

```js
app.listen(PORT, () => {
  console.log(`✅ Server live on http://localhost:${PORT}`);
});
```

- Finally, we start the server with `.listen()`.
