# Express - REST API

A RESTful (REpresentational State Transfer) API using Express, implementing the four basic operations known as **CRUD**:

| Operation | Meaning              | HTTP Verb |
| --------- | -------------------- | --------- |
| Create    | Add new data         | POST      |
| Read      | Retrieve data        | GET       |
| Update    | Modify existing data | PUT       |
| Delete    | Remove data          | DELETE    |

The API we’ll build manages a simple list of people with the following endpoints:

```txt
GET     /api/people        - Get all people
GET     /api/people/:id    - Get a specific person
POST    /api/people        - Add a new person
PUT     /api/people/:id    - Update a person
DELETE  /api/people/:id    - Delete a person
```

---

#### Sample Data

```js
const people = [
  {
    id: "1",
    name: "Luke",
    lname: "Red",
  },
];
```

---

## GET Requests

### Get All People

```js
app.get("/api/people", (req, res) => {
  res.status(200).json({ data: people });
});
```

- Returns the full list of people as JSON.

### Get a Specific Person

```js
app.get("/api/people/:id", (req, res) => {
  const { id } = req.params;
  const person = people.find((person) => person.id === id);

  if (!person) {
    return res.status(404).json({ error: "Person not found" });
  }

  res.status(200).json(person);
});
```

- Uses `req.params` to extract the `id`.
- Finds the person in the array and returns it, or a 404 if not found.

---

## POST Request

### Add a New Person

Before using `req.body`, add this middleware:

```js
app.use(express.json());
```

This tells Express to parse incoming JSON in request bodies.

```js
app.post("/api/people", (req, res) => {
  console.log(req.body);

  const person = req.body;
  people.push(person);

  res.status(200).json({ success: true, data: people });
});
```

### Example Request

```http
POST /api/people

{
  "id": "4",
  "name": "Diana",
  "lname": "Purple"
}
```

### Notes

- `req.body` contains the full JSON sent by the client.
- We assume the client sends a valid person object with both `id` and `name`. In real-world apps, you'd validate this.
- We return the updated people list for confirmation.

---

## PUT Request

_(To be completed)_

```js
// Example structure:
app.put("/api/people/:id", (req, res) => {
  // logic to update a person by id
});
```

---

## DELETE Request

_(To be completed)_

```js
// Example structure:
app.delete("/api/people/:id", (req, res) => {
  // logic to delete a person by id
});
```

---

## Notes

- This is a classic **RESTful API** structure, useful for any CRUD-based resource.
- You can use tools like **Postman** or the **Fetch API** in frontend code to test these routes.
- Always validate and sanitize user input in real-world apps.

```

---

Fammi sapere quando hai finito i video così completiamo il file con il codice per `POST`, `PUT` e `DELETE`. Se vuoi, possiamo anche aggiungere una sezione su come simulare un database con un array, oppure come passare a qualcosa di più serio come MongoDB.
```
