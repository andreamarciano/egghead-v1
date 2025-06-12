# TS - ⚙️ Compiler (`tsc`)

This guide explains how to use the TypeScript compiler (`tsc`) and configure its behavior via `tsconfig.json`.

---

## 🧭 Basic Compilation

Compile a single file:

```bash
tsc app.ts
```

---

## 👀 Watch Mode

Automatically recompile files on save:

```bash
tsc app.ts --watch
# or shorthand
tsc app.ts -w
```

---

## 🗂️ Compile Entire Project

Initialize a `tsconfig.json` file:

```bash
tsc --init
```

This creates a config file that defines how TypeScript should compile your project.

Then compile the whole project:

```bash
tsc
```

---

## 🚫 Include / Exclude Files

In `tsconfig.json`, you can define which files or folders to include or exclude.

```json
{
  "exclude": ["node_modules", "dist"],
  "include": ["src/**/*"]
}
```

> `node_modules` is excluded by default.

---

## 🎯 Target Compilation

Specify which JavaScript version to compile to:

```json
{
  "compilerOptions": {
    "target": "ES6"
  }
}
```

Common values:

* `"ES5"` – for older browsers
* `"ES6"` (aka ES2015) – modern default
* `"ES2020"`, `"ESNext"`, etc.

---

## 🧰 Other Options

```json
{
  "compilerOptions": {
    "allowJs": true,        // Allows JS files in the project
    "sourceMap": true       // Generates .map files for debugging
  }
}
```

---

## 📦 Output and Root Directories

```json
{
  "compilerOptions": {
    "rootDir": "src",       // Where TS source files are located
    "outDir": "dist"        // Where compiled JS files will go
  }
}
```

* `rootDir`: Logical root of your project (e.g., `"src"`)
* `outDir`: Where to output the compiled files (e.g., `"dist"`)

> These help structure and separate your TypeScript and JavaScript code.

---

## 🧾 Notes on `tsconfig.json` (React Project)

This config is typical for a React + TypeScript project using tools like Vite or CRA, where `tsc` is not used directly to emit code, but only for **type checking**.

### Key Configurations

* `"jsx": "react-jsx"`
  Required for React 17+ JSX transform (no need to import `React` explicitly). This avoids errors when using `.tsx` files.

* `"allowJs": true`
  Enables mixing `.js` and `.ts` files — helpful during migration or if using third-party JS. Be aware: it may increase noise in type checking.

* `"noEmit": true`
  Tells TypeScript not to output any `.js` files — perfect when using a bundler like Vite or Webpack to handle compilation instead.

* `"exclude": ["backend"]`
  Excludes backend code (like Express or Node APIs) from the TypeScript project. Prevents conflicts, especially if it includes `.js`/`.ts` files with incompatible settings.

### General Behavior

* `"target": "es2016"` and `"module": "commonjs"`
  These are often overridden by your bundler (e.g., Vite will use ES Modules), but still influence type compatibility.

* `"strict": true` and `"forceConsistentCasingInFileNames"`
  Enforces strong typing and avoids bugs from mis-capitalized imports (especially on Linux/Unix).

* `"skipLibCheck": true`
  Skips type checking of `node_modules` packages to improve performance.

* `"esModuleInterop": true`
  Allows importing CommonJS modules with default import syntax. A must for smooth interop with many libraries.

### In Short

✅ You’re not compiling with `tsc`, but this file **controls how TypeScript understands your code**.
📦 It's mainly used for **type checking, editor support, and preventing bugs early**.
