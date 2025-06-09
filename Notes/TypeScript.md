# TypeScript

## 🔷 What is TypeScript?

TypeScript is a **superset of JavaScript** that adds **static typing**.  
It helps catch errors **before runtime** and makes your code more **predictable, readable, and maintainable**.

- You can use all of JavaScript.
- You **optionally** add types.
- It compiles to plain JavaScript (`.ts → .js`).

---

## ✅ Why use it?

- Detect bugs at compile time
- Better code completion / IntelliSense
- Clear contracts between parts of your app
- Works great with large codebases and teams

---

## ⚙️ Setup

Install globally or per project:

```bash
npm install typescript --save-dev
npx tsc --init     # Creates tsconfig.json
npx tsc            # Compiles .ts files
```

---

## 🧩 Basic Types

```ts
let name: string = "Alice";
let age: number = 30;
let isAdmin: boolean = true;
let tags: string[] = ["typescript", "js"];
```

---

## 🧾 Type Inference

TypeScript **infers types** automatically:

```ts
let message = "Hello"; // inferred as string
```

You don't always have to annotate!

---

## 🧰 Functions

```ts
function greet(name: string): string {
  return `Hello, ${name}`;
}
```

- You can define input and return types.
- Return type is optional (inferred if omitted).

---

## 🧱 Interfaces & Types

Used to define object shapes:

```ts
interface User {
  id: number;
  name: string;
}

const user: User = {
  id: 1,
  name: "Alice"
};
```

`type` is similar to `interface` and supports unions, aliases, etc.

```ts
type Status = "success" | "error";
```

---

## 🧠 Optional & Readonly

```ts
interface Product {
  id: number;
  name: string;
  description?: string;     // optional
  readonly sku: string;     // cannot be modified
}
```

---

## 🧰 Generics

Make code reusable across types:

```ts
function identity<T>(value: T): T {
  return value;
}

let num = identity<number>(123);
let str = identity("hi"); // Type inferred as string
```

---

## 🧩 Type Narrowing

```ts
function printId(id: number | string) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id.toFixed(2));
  }
}
```

---

## 🏗️ Classes & OOP

```ts
class Animal {
  constructor(public name: string) {}

  speak(): void {
    console.log(`${this.name} makes a sound`);
  }
}

const dog = new Animal("Dog");
dog.speak();
```

---

## 📦 Modules

```ts
// math.ts
export function add(a: number, b: number): number {
  return a + b;
}

// app.ts
import { add } from "./math";
```

---

## 🧪 Utility Types

Built-in helpers:

- `Partial<T>` – Makes all properties optional
- `Pick<T, K>` – Pick selected keys from a type
- `Record<K, T>` – Object with keys of K and values of T
- `Readonly<T>` – Makes properties readonly
