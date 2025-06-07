# Node.js - Built-in Modules

| Module | Description                   | Example Use Case                         |
| ------ | ----------------------------- | ---------------------------------------- |
| `fs`   | File read/write (sync/async)  | Log files, configs, generate content     |
| `http` | Create HTTP servers           | Handle requests, build basic web servers |
| `os`   | OS/user/system info           | Get uptime, memory usage                 |
| `path` | File/directory path utilities | Join paths, resolve absolute paths       |

## 1. `os` Module

The `os` module provides methods and properties to get information about the operating system and user.

### Import the module:

```js
const os = require("os");
```

### Common Methods:

```js
os.userInfo(); // Info about the current user
os.uptime(); // System uptime in seconds
os.version(); // OS version
os.arch(); // CPU architecture (e.g., x64)
```

### Example: Collecting System Info

```js
const systemInfo = {
  name: os.type(), // e.g., Linux, Darwin, Windows_NT
  release: os.release(), // OS release version
  memory: os.totalmem(), // Total memory in bytes
  availableMemory: os.freemem(), // Free memory in bytes
};
```

---

## 2. `path` Module

The `path` module provides utilities to work with file paths in a way that is safe across different operating systems.

### Import the module:

```js
const path = require("path");
```

### Key Features and Methods:

```js
console.log(path.sep); // OS-specific path separator, e.g., "/" or "\\"
```

### `join()`: Concatenate paths safely

```js
const filePath = path.join("/newDir", "/newDir2", "test.txt");
console.log(filePath); // Outputs: '/newDir/newDir2/test.txt'
```

> 🔍 `join()` removes extra slashes and normalizes the path, making it safer than manual string concatenation.

### `basename()`: Get file name from a path

```js
console.log(path.basename(filePath)); // Outputs: 'test.txt'
```

### `resolve()`: Get absolute path

```js
const absolutePath = path.resolve(__dirname, "newDir", "newDir2", "test.txt");
console.log(absolutePath);
```

> 🔍 `resolve()` creates an absolute path starting from the current directory (`__dirname`).
> Useful when you need to work with files from anywhere in your app.

---

## 3. `fs` Module

The `fs` (File System) module allows you to read from and write to files on your system. It supports both **synchronous** and **asynchronous** methods.

### Import the module:

```js
// Sync methods
const { readFileSync, writeFileSync } = require("fs");

// Async methods
const { readFile, writeFile } = require("fs");
```

---

### 🔹 Synchronous File Operations

Synchronous methods **block the execution** until the operation completes.

```js
console.log("start sync");

const test = readFileSync("./dir/test.txt", "utf8");
const hello = readFileSync("./dir/hello.txt", "utf8");

console.log(hello);
console.log(test);

writeFileSync("./dir/test.txt", "write text in text"); // Overwrites
writeFileSync("./dir/test.txt", " append some text", { flag: "a" }); // Appends
writeFileSync("./dir/newFile.txt", "I'm a new file"); // Creates if not exists

console.log("end sync");
console.log("starting next task");
```

**Output order:**

```
start sync
<file contents>
end sync
starting next task
```

---

### 🔹 Asynchronous File Operations

Asynchronous methods use **callbacks** and do not block the event loop.

```js
console.log("start async");

readFile("./dir/test.txt", "utf8", (error, result) => {
  if (error) {
    console.log(error);
    return;
  }
  const test = result;

  readFile("./dir/hello.txt", "utf8", (error, result) => {
    if (error) {
      console.log(error);
      return;
    }
    const hello = result;

    writeFile("./dir/newFile.txt", "I'm a new file", (error, result) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log("end async");
    });
  });
});

console.log("starting next task");
```

**Output order:**

```
start async
starting next task
end async
```

---

## 4. `http` Module

The `http` module allows you to **create web servers** in Node.js. This is the foundation of most Node-based backends.

### Import the module:

```js
const http = require("http");
```

### Create a basic server:

```js
const server = http.createServer((req, res) => {
  // Base routing example
  if (req.url === "/") {
    res.end("Welcome to our site");
  }
  if (req.url === "/profile") {
    res.end("This is your profile");
  }

  // Fallback (404)
  res.end(`<h1>Error</h1>
    <p>Go back to <a href="/">Home</a></p>`);
});

server.listen(3000); // Server listens on port 3000
```

🧠 **How it works:**

- `req` = incoming HTTP request (e.g., URL, method)
- `res` = HTTP response (you write and end it)
- The server stays alive and handles multiple requests over time.

---

### Conceptual Link to React Routers

In a React SPA, you use tools like `createBrowserRouter()` to map URL paths to components.

```js
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/profile", element: <Profile /> },
]);
```

With Node's `http` module, you're doing this manually by inspecting `req.url` and choosing what to return.

> ✅ So now you're seeing **how the client-side router depends on a backend server** to serve the app initially and potentially handle API routes.

---

### HTTP Requests Overview

#### Common HTTP Methods

| Method | Purpose              | Example URL                        |
| ------ | -------------------- | ---------------------------------- |
| GET    | Read data            | `GET /api/orders` — get all orders |
|        |                      | `GET /api/orders/:id` — get one    |
| POST   | Send new data        | `POST /api/orders` — create order  |
| PUT    | Update existing data | `PUT /api/orders/:id` — update     |
| DELETE | Delete data          | `DELETE /api/orders/:id` — remove  |

#### Status Codes

| Code | Meaning                                 |
| ---- | --------------------------------------- |
| 200  | OK — Request successful                 |
| 201  | Created — Resource successfully created |
| 400  | Bad Request — Invalid input             |
| 401  | Unauthorized — Auth required            |
| 403  | Forbidden — Not allowed                 |
| 404  | Not Found — Resource does not exist     |
| 500  | Internal Server Error — Server crashed  |

#### Example

```bash
GET    - website.com/api/orders         # Get all orders
GET    - website.com/api/orders/:id     # Get a specific order
POST   - website.com/api/orders         # Create a new order
PUT    - website.com/api/orders/:id     # Update an existing order
DELETE - website.com/api/orders/:id     # Delete an order
```
