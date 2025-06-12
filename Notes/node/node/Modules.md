# Node.js - Modules

A **module** is simply a file. Node allows us to organize our code into separate files and reuse them easily.

There are 3 types of modules:

1. **Built-in modules** – Provided by Node.js (e.g., `fs`, `http`, `path`)
2. **Local modules** – Custom modules we create in our own project
3. **External modules** – Installed via `npm` (Node Package Manager), like `express`, `axios`, etc.

---

## Key Global Variables

Before diving into modules, it's important to understand the **global variables** that Node.js provides. These are available in every module without needing to import them.

### `__dirname`

- Represents the **absolute path** of the directory that contains the current file.
- Useful when you need to work with file paths or serve static assets.

---

### `__filename`

- Gives the **absolute path** of the current file, including the file name.

---

### `require()`

- A function used to **import modules** in Node.js.
- Loads built-in modules, npm packages, or local files.

```js
const fs = require("fs"); // Built-in module
const myUtils = require("./utils"); // Local file
```

---

### `module`

- An object containing information about the current module.
- Commonly used to export functionality from one file to another.

---

### `process`

- Gives access to **runtime environment info**, like environment variables, the current working directory, and more.

```js
console.log(process.env.NODE_ENV);
console.log(process.env.API_KEY);
console.log(process.env.PORT);
console.log(process.cwd()); // Current working directory
```

## Creating and Using Local Modules

Here's an example of a simple project with three files.

- `index.js`

```js
const sayHi = require("./utils");
const names = require("./names");

sayHi(names.name1); // Hi Mario
sayHi("Luke");
sayHi(names.name2); // Hi Luigi
```

- `utils.js`

```js
function sayHi(name) {
  console.log(`Hi ${name}`);
}

module.exports = sayHi;
```

- `names.js`

```js
const name1 = "Mario";
const name2 = "Luigi";

module.exports = { name1, name2 };

// alternative syntax
module.exports.name1 = "Mario";
const name2 = "Luigi";
module.exports.name2 = name2;
```

### Code Executed on Import

When you import a module with `require()`, Node.js **executes the code inside that module immediately** (but only once, and then it caches the result).

This means you can write code in the module that runs right away upon import.

```js
function test() {
  console.log("Test function ran");
}

test(); // This will run as soon as the module is required

// `index.js`

const test = require("./utils"); // Logs: "Test function ran"
```

> ⚠️ Tip: Use this carefully. It's generally better to export functions and call them explicitly, unless you want something to run during the module load (e.g., initial setup code).

---

## Notes

> In React (with Vite), you used ES Modules:
> `export default` and `import ... from ...`.
>
> In Node.js, the classic syntax is CommonJS:
> `module.exports` and `require(...)`.
