# Node.js - Event Emitter

### Event Loop (Recap)

- Node.js runs on a **single thread** using an **event loop** to handle async operations.
- It uses a **non-blocking** architecture:
  - Long tasks run in the background.
  - Meanwhile, the main thread continues processing.
- Key components:
  - **Call Stack**: Where code execution happens.
  - **Event Queue**: Stores async callbacks until the stack is free.
  - **Event Loop**: Continuously checks if the stack is empty to execute pending callbacks.

---

## Event Emitters

### Event-Driven Programming

Node.js apps often follow an **event-driven model** — especially in server/client communication (like in HTTP servers or WebSocket chats).

### Using the `events` Module

To work with custom events, use the built-in `events` module:

```js
const EventEmitter = require("events");
const customEmitter = new EventEmitter();
```

### Subscribing and Emitting Events

You can subscribe to events using `.on()` and trigger them with `.emit()`:

```js
customEmitter.on("message", () => {
  console.log("Event received");
});

customEmitter.emit("message"); // Outputs: Event received
```

You can attach **multiple listeners** to the same event:

```js
customEmitter.on("message", () => {
  console.log("Another listener");
});
```

### Passing Arguments to Events

```js
customEmitter.on("message", (name, year) => {
  console.log(`Hi ${name}, it's ${year}`);
});

customEmitter.emit("message", "Alice", 2020);
// Output: Hi Alice, it's 2020
```

---

## Streams

### What are Streams?

Streams are used to **process data piece-by-piece (in chunks)** instead of loading everything into memory at once. Useful for large files or continuous data flows.

### Example: Creating a Large File

```js
const { writeFileSync } = require("fs");

for (let i = 0; i < 10000; i++) {
  writeFileSync("big.txt", `line ${i}\n`, { flag: "a" });
}
```

### Reading Without Stream

```js
const { readFileSync } = require("fs");
const data = readFileSync("big.txt");
console.log(data); // Reads all at once (Buffer)
```

### Reading With Stream

```js
const { createReadStream } = require("fs");
const stream = createReadStream("./big.txt", { encoding: "utf8" });

stream.on("data", (chunk) => {
  console.log("Received chunk:");
  console.log(chunk);
});
```

- Data is received in **chunks**, e.g., split into multiple buffers.
- Useful to save memory and improve performance.
