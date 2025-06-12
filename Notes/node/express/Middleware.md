# Express - Middleware

Middleware functions are functions that execute **during the request-response cycle**. They can:

- Inspect or modify the request (`req`) or response (`res`)
- End the request–response cycle
- Call the `next()` function to pass control to the next middleware

**Flow:**
`req ➡ middleware ➡ next() ➡ route handler ➡ res`

---

## ⚙️ Using Middleware

```js
const express = require("express");
const app = express();

const middlewareTest = require("./middleware");
const authTest = require("./auth");
```

---

### 🛠️ Custom Middleware Example

```js
const middlewareTest = (req, res, next) => {
  const { method, url } = req;
  const time = new Date().getMinutes();
  console.log(method, url, time);
  next(); // Passes control to the next middleware or route
};

module.exports = middlewareTest;
```

---

### 🔐 Auth Middleware Example

```js
const authTest = (req, res, next) => {
  const { user } = req.query;

  if (user === "Luke") {
    console.log("✅ Authorized");
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

module.exports = authTest;
```

---

#### 📌 Apply to a specific route

```js
app.get("/", middlewareTest, (req, res) => {
  res.send("Homepage");
});
```

#### 📌 Apply to all routes with `app.use()`

```js
app.use(middlewareTest);
```

#### 📌 Apply to specific path only

```js
app.use("/person", middlewareTest); // Only applies to /person and its subroutes
```

#### 📌 Apply multiple middleware functions

```js
app.use("/person", [middlewareTest, authTest]);
```

---

#### ✅ Sample Routes

```js
app.get("/", (req, res) => {
  res.send("Homepage");
});

app.get("/about", (req, res) => {
  res.send("About");
});

app.get("/person", (req, res) => {
  res.send("Person");
});

app.get("/person/hobbies", (req, res) => {
  res.send("Person Hobbies");
});

// Auth middleware will run before the handler
app.get("/person/private", authTest, (req, res) => {
  res.send("Personal Information");
});
```

Try visiting:

> `http://localhost:3000/person/private?user=Luke` → ✅ Authorized
> `http://localhost:3000/person/private?user=John` → ❌ Unauthorized

---

## 🧠 Types of Middleware

| Type           | Description                                              | Example                           |
| -------------- | -------------------------------------------------------- | --------------------------------- |
| Built-in       | Included with Express                                    | `express.static()`                |
| Application    | Custom logic in your app                                 | Logging, auth, body parsing       |
| Third-party    | External packages                                        | `morgan`, `cors`, `cookie-parser` |
| Router-level   | Specific to `express.Router()`                           | Used with route modules           |
| Error-handling | Catches errors, has **4** params (`err, req, res, next`) | Special middleware                |
