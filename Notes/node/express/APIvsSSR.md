# Express - API vs SSR

- **APIs** — to send/receive **data** (usually in JSON format)
- **SSR (Server-Side Rendering)** — to generate and send **HTML pages** dynamically

## API

Allows the frontend (React, Angular, mobile app, etc.) to communicate with the backend to **fetch or send data**.

### Common flow

```text
Client (frontend) → sends request → API (Express) → queries the DB
DB → returns data → API → sends JSON → Client displays it
```

- Data is returned using `res.json(data)`
- Client is responsible for rendering it (using JavaScript)

### Example

```js
app.get("/api/users", (req, res) => {
  const users = [{ name: "Alice" }, { name: "Bob" }];
  res.json(users); // Sends data
});
```

---

## SSR

With **Server-Side Rendering**, the Express server creates the full HTML page — including the data — and sends it directly to the client.

### Common  flow

```text
Client → requests a page → Server renders HTML (with data) → sends complete HTML
Client → displays HTML
```

- Useful for SEO, or when you don’t want to use a frontend framework.
- Express typically uses a **template engine** like EJS, Pug, or Handlebars.
- HTML is returned using `res.render()` (not `res.json()`)

### Example (using EJS)

```js
app.set("view engine", "ejs");

app.get("/profile", (req, res) => {
  const user = { name: "Alice", age: 25 };
  res.render("profile", { user }); // Injects data into HTML template
});
```

---

## 🔗 Typical Architecture

```text
Frontend / Client-side <--> Backend / Server-side <--> Database

React / Angular         <-->     Express (API)      <--> MongoDB / SQL
```

In SSR apps:

```text
Browser → Express server → Generates HTML using data from DB → Sends to browser
```
