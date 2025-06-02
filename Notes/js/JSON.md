# JavaScript - JavaScript Object Notation

## ⚠️ JSON vs Object – Key Differences

- ✅ JSON supports: strings, numbers, booleans, arrays, objects, `null`.
- ❌ JSON does **not** support: functions, methods, `undefined`, `Date`, `Symbol`, etc.
- ✅ Property names **must** be in **double quotes**.
- ✅ Strings must be enclosed in **double quotes** (not single quotes).
- ❌ No comments allowed in JSON.
- ✅ JSON is purely data, not behavior.

Example

```json
{
  "name": "1A",
  "school": "Sunrise High School",
  "isActive": true,
  "foundedYear": 1998,
  "teachers": [
    {
      "firstName": "Alice",
      "lastName": "Red",
      "subject": ["Math", "Physics", "Geography"]
    },
    {
      "firstName": "Mark",
      "lastName": "Blue",
      "subject": "History"
    }
  ],
  "students": [
    {
      "firstName": "Sarah",
      "lastName": "Green",
      "age": 13,
      "grades": {
        "math": 8,
        "history": 7.5
      }
    },
    {
      "firstName": "Luke",
      "lastName": "Black",
      "age": 14,
      "grades": {
        "math": 9,
        "history": 6
      }
    }
  ]
}
```

Sometimes data is just an array of multiple JSON objects:

```json
[
  {
    "name": "1A",
    "school": "Sunrise High School"
    //...
  },
  {
    "name": "2B",
    "school": "Sunset Middle School"
    //...
  }
]
```

---

## 📜 Classic Syntax: `XMLHttpRequest`

Steps:

```js
let requestURL = "./class.json"; // 1. Define the URL to the JSON file
let request = new XMLHttpRequest(); // 2. Create a new HTTP request object

request.open("GET", requestURL); // 3. Configure the request
request.responseType = "json"; // 4. Tell the browser to automatically parse the response as JSON
request.send(); // 5. Send the HTTP request

// 6. Wait for the response to be fully received
request.onload = function () {
  // 7. Get the parsed JSON from the response
  const classData = request.response;

  // 8. Access a nested property from the JSON object
  console.log(classData.teachers[1].lastName);
};
```

---

## 🚀 Modern Syntax: `fetch()`

```js
// 1. Make a GET request to the JSON file
fetch("./class.json")
  // 2. Wait for the response, then parse it as JSON
  .then((response) => response.json())
  // 3. Once parsed, access the data
  .then((classData) => {
    console.log(classData.students[0].grades.math);
  })
  .catch((error) => console.error("Error loading JSON:", error));
```

- Simpler and more powerful
- Can be used with `async/await` for even cleaner code

```js
async function loadClass() {
  // 1. Wait for the fetch response
  const response = await fetch("./class.json");
  // 2. Wait for the response body to be parsed as JSON
  const classData = await response.json();
  // 3. Use the data
  console.log(classData.name);
}
```

---

## 🔄 Converting JSON ↔️ JavaScript

Sometimes you’ll need to **manually convert** between JSON strings and JavaScript objects.

---

### 🧱 `JSON.parse()` – From JSON String to JavaScript Object

Converts a **JSON string** into a JavaScript object.

```js
const jsonString = '{"name": "1A", "age": 14}';

const obj = JSON.parse(jsonString);
console.log(obj.name); // "1A"
console.log(typeof obj); // "object"
```

- ⚠️ The input **must be a valid JSON string** (double quotes, no trailing commas, etc.)
- Common use case: receiving JSON from an API or `localStorage`

---

### 📤 `JSON.stringify()` – From JavaScript Object to JSON String

Converts a **JavaScript object** into a JSON-formatted string.

```js
const student = {
  name: "Luke",
  age: 14,
  passed: true,
};

const jsonString = JSON.stringify(student);
console.log(jsonString);
// '{"name":"Luke","age":14,"passed":true}'
console.log(typeof jsonString); // "string"
```

- Useful when sending data to a server or saving to `localStorage`
- Functions, `undefined`, and symbols are **ignored**

---

### ✅ Bonus: Optional Parameters

`JSON.stringify(value, replacer, space)`

- `replacer`: filter which keys to include (array or function)
- `space`: add indentation for readability

```js
console.log(JSON.stringify(student, null, 2));
/*
{
  "name": "Luca",
  "age": 14,
  "passed": true
}
*/
```
