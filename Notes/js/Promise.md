# JavaScript - Promises

## 🔄 What is a Promise?

A **Promise** is a JavaScript object representing the eventual **completion (or failure)** of an asynchronous operation.

```js
const promise = new Promise((resolve, reject) => {
  // Do something async
  if (success) {
    resolve(result);
  } else {
    reject(error);
  }
});
```

---

## ✅ States of a Promise

|       State | Description                                  |
| ----------: | -------------------------------------------- |
|   `pending` | Initial state                                |
| `fulfilled` | Operation completed successfully (`resolve`) |
|  `rejected` | Operation failed (`reject`)                  |

---

## ⚙️ Basic Usage

```js
fetch("https://api.example.com/data")
  .then((response) => response.json()) // Returns another promise
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

---

## 🔂 Promise Chaining

You can chain `.then()` calls to handle sequences:

```js
doSomething()
  .then((result) => doNext(result))
  .then((next) => finalStep(next))
  .catch((error) => handleError(error));
```

Each `.then()` returns a new Promise.

---

## ⏱️ Async / Await (syntactic sugar)

Instead of chaining, you can use `async`/`await`:

```js
async function loadData() {
  try {
    const res = await fetch("/api/data");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

> ✅ `async/await` makes async code more readable and behaves like "normal" synchronous code.

---

## 🧪 Creating Custom Promises

```js
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

wait(1000).then(() => console.log("1 second passed"));
```

---

## 🧩 Promise Utility Methods

| Method                      | Description                                                |
| --------------------------- | ---------------------------------------------------------- |
| `Promise.all([...])`        | Waits for **all** promises to resolve or any to reject     |
| `Promise.race([...])`       | Resolves/rejects as soon as **one** promise settles        |
| `Promise.allSettled([...])` | Waits for **all**, returns their status                    |
| `Promise.any([...])`        | Resolves with the **first fulfilled** (ignores rejections) |

```js
const p1 = fetch("/api/user");
const p2 = fetch("/api/posts");

Promise.all([p1, p2])
  .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
  .then(([user, posts]) => console.log(user, posts));
```

---

## ⚛️ Promises in React

Promises are everywhere in React:

### 🔹 With `useEffect`

```js
useEffect(() => {
  async function fetchData() {
    const res = await fetch("/api/data");
    const data = await res.json();
    setData(data);
  }

  fetchData();
}, []);
```

### 🔹 With third-party libraries

- **Axios**, **Firebase**, **Supabase**, etc. all return promises.
- Most **form handlers**, **APIs**, and **state managers** (e.g., Redux Toolkit async thunks) use promises.

---

## 📌 Common Mistakes

| Mistake                                        | Why It's a Problem                            |
| ---------------------------------------------- | --------------------------------------------- |
| Not returning inside `.then()`                 | Breaks chaining and causes undefined behavior |
| Not catching errors (`.catch` or `try/catch`)  | Unhandled rejections (can crash your app)     |
| Mixing `await` and `.then()` incorrectly       | Confusing and unnecessary                     |
| Forgetting `async` on a function using `await` | Syntax error                                  |

---

## 🎁 Bonus Example: Validated Timeout Promise

A custom `timeoutPromise()` that:

- Accepts a message and a delay (ms)
- Rejects if input is invalid
- Resolves with the message after the given delay

```js
function timeoutPromise(message, interval) {
  return new Promise((resolve, reject) => {
    if (message === "" || typeof message !== "string") {
      reject("Message is empty or not a string");
    } else if (interval < 0 || typeof interval !== "number") {
      reject("Interval is negative or not a number");
    } else {
      setTimeout(function () {
        resolve(message);
      }, interval);
    }
  });
}

timeoutPromise("Hello there", 1000)
  .then((message) => {
    alert(message);
  })
  .catch((e) => {
    console.log("Error: " + e);
  });
```

### 🔍 What this demonstrates

| Concept           | What’s happening                                      |
| ----------------- | ----------------------------------------------------- |
| Input validation  | Ensures arguments are valid before resolving          |
| `reject()` usage  | Immediately stops execution with an error             |
| `resolve()` usage | Delivers the result asynchronously after `setTimeout` |
| Real-world use    | Could simulate delayed API calls or transitions       |
