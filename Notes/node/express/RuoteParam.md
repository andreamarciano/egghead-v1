# Express - Route Parameters

**Route parameters** allow you to capture values from the URL and use them in your logic.

---

## 🔄 Why use Route Params?

- To request a specific resource **without sending the whole list**
- Enables **dynamic URLs** like `/user/123` or `/product/shoes`
- Useful for things like profiles, blog posts, products, etc.

---

## Example: routing persons

Assume we have a file `person.js` like this:

```js
const person = [
  {
    id: "1",
    name: "Luke",
    lname: "Red",
    age: 25,
    hobbies: {
      first: "Book",
      second: "Sport",
      third: "Food",
    },
    music: ["pop", "rock"],
  },
  {
    id: "2",
    ...
  },
];

module.exports = { person };
```

### Main Express file

```js
const express = require("express");
const app = express();
const { person } = require("./person");

app.get("/", (req, res) => {
  res.send("<h1>Homepage</h1> <a href='/person'>Person List</a>");
});
```

### 📋 Fetch all people

```js
app.get("/person", (req, res) => {
  const newPeople = person.map((person) => {
    const { name, lname, age } = person;
    return { name, lname, age };
  });
  res.json(newPeople);
});

// Shorter Syntax
app.get("/person", (req, res) => {
  const newPeople = person.map(({ name, lname, age }) => ({
    name,
    lname,
    age,
  }));
  res.json(newPeople);
});
```

- Returns the full list of people (simplified)

### 🧍 Fetch one person by ID

```js
app.get("/person/:id", (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const newPerson = person.find((person) => person.id === id); // id: string

  if (!newPerson) {
    return res.status(404).json({ msg: "person not found", code: "404" });
  }

  res.json(newPerson);
});
```

#### Notes

- `:id` is a **route parameter**
- It's available as `req.params.id`: `const personID = req.params.id`
- Route parameters are always **strings**, so match carefully:

  - `"1" === 1` → `false`
  - Use `Number(id)` if your data uses numbers

---

### 🧩 More Complex Routes Example

Route parameters can be **nested** or **combined** for more detailed access:

```js
app.get("/product/:productID/review/:reviewID", (req, res) => {
  const { productID, reviewID } = req.params;
  res.send(`Review ${reviewID} for product ${productID}`);
});
```

## 🔍 Query String Parameters

While **route parameters** are used for identifying specific resources (`/person/:id`), **query parameters** are used for **filtering**, **searching**, or **limiting** results.

### Example

```js
app.get("/person/search", (req, res) => {
  console.log(req.query); // e.g. { query: 'L', limit: '2' }

  const { query, limit } = req.query;
  let filteredPerson = [...person]; // Copy to avoid modifying the original array

  if (query) {
    filteredPerson = filteredPerson.filter((person) =>
      person.name.startsWith(query)
    );
  }

  if (limit) {
    filteredPerson = filteredPerson.slice(0, Number(limit));
  }

  if (filteredPerson.length < 1) {
    return res.status(200).json({ success: true, code: 200, data: [] });
  }

  res.status(200).json(filteredPerson);
});
```

#### URL Examples

```text
/person/search?query=L&limit=2
```

- `/person/search?query=L` → filters people whose names start with “L”
- `/person/search?limit=2` → returns only the first 2 people
- `/person/search?query=A&limit=1` → filters and limits
