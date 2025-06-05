# Node.js - Intro

Node.js is a **JavaScript runtime environment** that allows you to execute JavaScript code **outside of the browser**, typically on a server or your local machine. It is built on Chrome's V8 JavaScript engine.

With Node.js, developers can use JavaScript to build both **frontend and backend** parts of an application.

---

## How Node.js Works

### Single-Threaded Event Loop

- Node.js uses a **single-threaded** event loop architecture.
- Instead of blocking the execution (like traditional synchronous code), Node.js handles long operations in the **background** and keeps the main thread free to continue handling other tasks.
- When the background task is complete, Node.js puts the result back in the **event queue**, and the event loop picks it up when it’s ready.

This design allows Node.js to be **non-blocking** and efficient, especially for I/O-heavy operations.

### Example Flow

1. Node receives a request (e.g., read a file).
2. It delegates the task to the system (non-blocking).
3. Meanwhile, it continues processing other events.
4. When the task is done, a **callback** is triggered to handle the result.
