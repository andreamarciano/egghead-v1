# Node.js (Vanilla) vs Node.js for React APIs

> Focus: same language (Node.js), different **approaches** and **tools** depending on goal — low-level vs API for frontend (e.g. React)

---

## 1. 🔁 Environment & Config

| Concept     | Basic Node            | Node used for React APIs        |
| ----------- | --------------------- | ------------------------------- | --- | ----- |
| Env access  | `process.env.KEY`     | `dotenv.config()` + `.env` file |
| Port config | Hardcoded (e.g. 3000) | `process.env.PORT               |     | 3000` |

> ✅ `dotenv` simplifies managing sensitive data like API keys.

---

## 2. 📦 Imports & HTTP Requests

| Concept      | Basic Node                | Node used for React APIs                |
| ------------ | ------------------------- | --------------------------------------- |
| Imports      | `require()`               | `import` (with `"type": "module"`)      |
| Exports      | `module.exports`          | `export default` or named exports       |
| HTTP request | `http.request()` (manual) | `fetch()` (via `node-fetch`) or `axios` |

> ✅ In real projects, `fetch()` simplifies integration with third-party APIs.

---

## 3. 🧩 Middleware & Utilities

| Concept      | Basic Node                       | Node used for React APIs                 |
| ------------ | -------------------------------- | ---------------------------------------- |
| CORS         | Manual headers                   | `cors()` middleware                      |
| Body parsing | `req.on('data')`, `JSON.parse()` | `express.json()`, `express.urlencoded()` |
| Static files | `fs.readFile()` + `res.write()`  | `express.static('folder')`               |

> ✅ CORS middleware is essential when frontend runs on a different origin.

---

## 4. 🌐 Routing & Responses

| Concept       | Basic Node                         | Node used for React APIs               |
| ------------- | ---------------------------------- | -------------------------------------- |
| Routing       | `req.url`, `if/else` logic         | `app.get()`, `app.post()`, `.Router()` |
| Route params  | Manual parsing (`URLSearchParams`) | `req.query`, `req.params`              |
| JSON response | `res.end(JSON.stringify(data))`    | `res.json(data)`                       |

---

## 5. 🧠 Async Logic

| Concept       | Basic Node                | Node used for React APIs |
| ------------- | ------------------------- | ------------------------ |
| Async ops     | Callbacks, `EventEmitter` | `async/await`, Promises  |
| External APIs | `http.get()`              | `fetch()`, `axios`       |

> ✅ `async/await` is now the standard for asynchronous code — cleaner than callbacks.
