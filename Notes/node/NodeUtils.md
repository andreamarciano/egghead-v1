# Node & Express - Quick Utils Reference

## 📁 Path & Module Info

- `__dirname` → Absolute path of the current directory.
- `__filename` → Absolute path of the current file.
- `require('module')` → Import a module.
- `module.exports` → Export functions or data from a file.
- `exports.myFunc = ...` → Shorthand to export multiple named values.

---

## ⚙️ Core Node.js (Built-in Modules)

### File System (fs)

- `readFileSync(path, encoding)` → Read file synchronously.
- `writeFileSync(path, data)` → Write file synchronously.
- `readFile(path, options, callback)` → Read file asynchronously.
- `writeFile(path, data, callback)` → Write file asynchronously.
- `createReadStream(path)` → Create a readable stream.
- `createWriteStream(path)` → Create a writable stream.

### HTTP Server

- `http.createServer((req, res) => {})` → Create a basic server.
- `res.end()` → End the response.

### Process

- `process` → Global object to interact with the system (env variables, exit, etc.).

---

## 📡 Events (EventEmitter)

- `const EventEmitter = require('events')` → Core module for custom events.
- `emitter.on('event', callback)` → Listen to an event.
- `emitter.emit('event', data)` → Trigger an event.

---

## 🌐 Express.js Basics

### App Setup

- `const express = require('express')` → Import express.
- `const app = express()` → Create an Express app.
- `app.listen(port, callback)` → Start the server.

### Routing

- `app.get(path, callback)` → Handle GET request.
- `app.post(path, callback)` → Handle POST request.
- `app.put(path, callback)` → Handle PUT request.
- `app.delete(path, callback)` → Handle DELETE request.
- `express.Router()` → Create modular route handlers.

### Middleware

- `app.use(middleware)` → Apply middleware to all routes.
- `express.static('public')` → Serve static files from a folder.
- `express.json()` → Parse incoming JSON body.
- `express.urlencoded({ extended: true })` → Parse URL-encoded form data.

### Response Methods

- `res.send(data)` → Send response (string, buffer, object).
- `res.status(code)` → Set status code.
- `res.json(obj)` → Send JSON response.
- `res.sendFile(path)` → Send a file as response.
