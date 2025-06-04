# Node.js - Built-in Modules

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

## Summary

| Module | Description                   | Example Use Case                   |
| ------ | ----------------------------- | ---------------------------------- |
| `os`   | OS/user/system info           | Get uptime, memory usage           |
| `path` | File/directory path utilities | Join paths, resolve absolute paths |
