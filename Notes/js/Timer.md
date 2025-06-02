# JavaScript - `setInterval` & `setTimeout`

## 🕐 `setTimeout()`

Runs code **ONCE** after a specified delay (in milliseconds).

### Syntax:

```js
setTimeout(callback, delay);
```

### Example:

```js
setTimeout(() => {
  console.log("Hello after 2 seconds");
}, 2000);
```

### ❌ Cancel a timeout:

```js
const timerId = setTimeout(() => {
  console.log("This will not run");
}, 3000);

clearTimeout(timerId); // Cancels the timeout
```

---

## 🔁 `setInterval()`

Runs code **REPEATEDLY** every `X` milliseconds.

### Syntax:

```js
setInterval(callback, interval);
```

### Example:

```js
const intervalId = setInterval(() => {
  console.log("Tick");
}, 1000);
```

### ❌ Cancel an interval:

```js
clearInterval(intervalId); // Stops the repetition
```

---

## 🧠 Common Use Cases

- `setTimeout`: animations, user feedback delays, debouncing
- `setInterval`: clocks, repeating animations, polling APIs

---

## ⚠️ Notes

- Time is **not guaranteed**: delays may be longer depending on browser load.
- Nesting or chaining timeouts can give better control than intervals.
