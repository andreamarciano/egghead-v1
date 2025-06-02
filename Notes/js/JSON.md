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
