# Express - Routing

By using Express Routers, you can split routes into separate modules and keep your code organized.

---

Folder Structure Example

```text
project/
├── index.js
├── people.js         # (data source)
├── routes/
│   ├── people.js     # people API routes
│   └── products.js   # products API routes
```

---

## `index.js`

Your main entry point:

```js
const express = require("express");
const app = express();

const peopleRouter = require("./routes/people");
const productsRouter = require("./routes/products");

app.use(express.json());

// Use the routers
app.use("/api/people", peopleRouter);
app.use("/api/products", productsRouter);

app.listen(3000);
```

- `app.use("/api/people", peopleRouter)` means all routes inside `peopleRouter` will be **prefixed** with `/api/people`.

---

## `routes/products.js`

```js
const express = require("express");
const router = express.Router();

// GET /api/products/
router.get("/", (req, res) => {
  res.status(200).json({ data: { name: "chair", price: 200 } });
});

module.exports = router;
```

---

## `routes/people.js`

```js
const express = require("express");
const router = express.Router();

const { people } = require("../people");

// GET /api/people
router.get("/", (req, res) => {
  res.status(200).json({ data: people });
});

// GET /api/people/:id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const person = people.find((person) => person.id === id);
  res.json(person);
});

// POST /api/people
router.post("/", (req, res) => {
  const person = req.body;
  people.push(person);
  res.status(200).json({ success: true, data: people });
});

// PUT /api/people/:id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const person = req.body;
  people[Number(id) - 1] = person;
  res.status(200).json({ success: true, data: people });
});

// DELETE /api/people/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = people.findIndex((person) => person.id === id);
  people.splice(index, 1);
  res.status(200).json({ success: true, data: people });
});

module.exports = router;
```
