# JavaScript - Web APIs

## 📋 Most Common Browser APIs

### 1. `document` (DOM API)

The **Document Object Model** lets you read and modify the HTML structure.

```js
document.querySelector("h1").textContent = "Hello!";
```

Methods:

- `querySelector()` / `querySelectorAll()`
- `getElementById()`, `getElementsByClassName()`
- `createElement()`, `appendChild()`, `removeChild()`
- `innerHTML`, `textContent`

---

### 2. `console`

For logging and debugging.

```js
console.log("Hello");
console.error("Something went wrong");
console.table([{ name: "Alice" }, { name: "Bob" }]);
```

---

### 3. `window`

Represents the **browser window/tab**. It’s the global object in the browser.

```js
window.alert("Hi!"); // same as alert()
```

Useful APIs inside `window`:

- `alert()`, `confirm()`, `prompt()`
- `setTimeout()`, `setInterval()`
- `location.href` (redirect or get current URL)
- `open()`, `close()`, `scrollTo()`

---

### 4. `localStorage` / `sessionStorage`

For storing small data in the browser.

```js
localStorage.setItem("username", "John");
localStorage.getItem("username"); // "John"
localStorage.removeItem("username");
```

- `localStorage`: persists even after browser is closed
- `sessionStorage`: cleared when tab closes

---

### 5. `fetch()`

Used to make **HTTP requests** (GET, POST, etc.).

```js
fetch("https://api.example.com/data")
  .then((res) => res.json())
  .then((data) => console.log(data));
```

---

### 6. `navigator`

Provides information about the **browser** and **device**.

```js
console.log(navigator.userAgent);
console.log(navigator.onLine); // true or false
```

---

### 7. `Geolocation API`

```js
navigator.geolocation.getCurrentPosition((position) => {
  console.log(position.coords.latitude, position.coords.longitude);
});
```

---

### 8. `Event` (Built-in Type)

Used for interacting with user actions.

```js
document.addEventListener("click", (e) => {
  console.log("You clicked!", e);
});
```

---

### 🏆 Web APIs Usage Ranking

| Rank | API / Feature    | ⚡️ Use Frequency | 📌 Notes                                      |
| ---: | ---------------- | ----------------- | --------------------------------------------- |
|    1 | `document` (DOM) | ⭐⭐⭐⭐⭐        |                                               |
|    2 | `console`        | ⭐⭐⭐⭐⭐        |                                               |
|    3 | `fetch()`        | ⭐⭐⭐⭐☆         |                                               |
|    4 | `localStorage`   | ⭐⭐⭐⭐☆         |                                               |
|    5 | `window`         | ⭐⭐⭐☆☆          |                                               |
|    6 | `Event`          | ⭐⭐⭐☆☆          |                                               |
|    7 | `navigator`      | ⭐⭐☆☆☆           | Mostly for compatibility, mobile info, status |
|    8 | `geolocation`    | ⭐☆☆☆☆            | Niche, but useful for maps, tracking, etc.    |

---

## 🧩 Third-Party APIs (External / Public APIs)

### 🛠️ Common Examples

| API Type        | Example Services                 | Use Case                          |
| --------------- | -------------------------------- | --------------------------------- |
| 🌤️ Weather      | OpenWeatherMap, WeatherAPI       | Weather data                      |
| 📦 Products     | FakeStoreAPI, Shopify, Stripe    | eCommerce / payment integration   |
| 🌍 Maps         | Google Maps API, Mapbox          | Location, geocoding, maps display |
| 📰 News         | NewsAPI, NYTimes API             | Headlines and article feeds       |
| 💬 AI / NLP     | OpenAI API, HuggingFace, DeepL   | Language processing, translations |
| 🐦 Social Media | Twitter API, Instagram Graph API | Post scheduling, data scraping    |
| 🧑 User/Auth    | Auth0, Firebase Auth, Supabase   | User login, tokens, auth flows    |

---

### 🔁 Example: Using `fetch()` with a Public API

```js
fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((data) => {
    console.log("Products:", data);
  })
  .catch((err) => console.error("API error:", err));
```
