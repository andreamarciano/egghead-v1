# TS - Data Types

## Table of Contents

- [JavaScript vs TypeScript](#js)
- [Type Assignment and Type Inference](#assignment)
- [Data Types](#types)

## JavaScript vs TypeScript {#js}

In JavaScript, variables are **dynamically typed**, which means their type can change at runtime:

```js
let test = 5;       // test is a number
test = "string";    // no error, now test is a string
```

This runs without any issues, but it can lead to bugs.

In contrast, TypeScript enforces **static typing**. Using the same code:

```ts
let test = 5;
test = "string";    // ❌ Error: Type 'string' is not assignable to type 'number'.
```

---

## Type Assignment and Type Inference {#assignment}

You can explicitly assign types:

```ts
let test: number;
function sum(num1: number, num2: number) {}
```

Or assign and initialize simultaneously:

```ts
let test: number = 5;
```

However, TypeScript usually **infers** the type automatically from the value:

```ts
let test = 5;  // inferred as number
```

In functions, parameters must have types declared because TypeScript cannot infer them without default values:

```ts
function sum(num1: number, num2: number) {}
```

---

## Data Types {#types}

### Basic JavaScript Types

- `number`
- `string`
- `boolean`
- [`object`](#object)
- [`array`](#array)

### TypeScript-specific Types

- [`tuple`](#tuple)
- [`any`](#any)
- [`union`](#union)
- [`custom types`](#custom)
- [`enum`](#enum)

---

## `object` {#object}

In JavaScript, accessing a non-existent property on an object is allowed and returns `undefined`:

```js
const person = {
  firstName: "Joel",
  lastName: "Red"
};

console.log(person.age); // undefined
```

In TypeScript, this results in a compile-time error:

```ts
const person = {
  firstName: "Joel",
  lastName: "Red"
};

console.log(person.age); // ❌ Error: Property 'age' does not exist on type ...
```

---

### ✅ Declaring object types

You can declare an object with a general `object` type:

```ts
let person: object = {
  firstName: "Joel",
  lastName: "Red"
};
```

But for full type safety, use a **detailed object shape**:

```ts
let person: {
  firstName: string;
  lastName: string;
  age: number;
  address: {
    street: string;
    number: number;
    city: string;
    country: string;
  };
};
```

Then assign:

```ts
person = {
  firstName: "Joel",
  lastName: "Red",
  age: 45,
  address: {
    street: "",
    number: 2,
    city: "New York",
    country: "USA"
  }
};
```

> 🛑 If you forget a property or make a typo, TypeScript will immediately highlight the error.

---

### 📦 Object types in function parameters

You can also define object types inline inside function arguments:

```ts
function getData(data: { id: number; username: string; password: string }) {
  console.log(data.id);
}

getData({ id: 1, username: "", password: "" });
```

## `array` {#array}

To define an array in TypeScript, you can specify the type of its elements:

```ts
const numbers: number[] = [1, 2, 3];
```

If the array contains multiple types, you're creating a **union type** (explained later):

```ts
const mixed = [1, 2, true, ""]; // mixed: (string | number | boolean)[]
```

You can also use the `any` type to allow all values (not recommended for strict typing):

```ts
const anything: any[] = ["hello", 2, true, [], {}];
```

## `tuple` {#tuple}

A **tuple** is a fixed-length array with predefined types for each element.

Unlike regular arrays, tuples enforce both the **length** and **types** of the values:

```ts
const pair: [number, number] = [1, 2];
```

Tuples are useful when you want to guarantee a specific structure.
For example, in a game app where only two players are allowed:

```ts
const game = {
  id: "",
  accessCode: "",
  players: ["Bob", "Tom"]  // ❗ Can grow into more than 2 players
};
```

Using a tuple ensures exactly two players:

```ts
const players: [string, string] = ["Bob", "Tom"];
```

> 🛡️ Tuples are strict: `["Bob"]` or `["Bob", "Tom", "Alice"]` would both cause compile-time errors.

## `any` {#any}

The `any` type disables type checking and allows **any kind of value**.

```ts
let test: any[] = [4, 5];
let test: [any, number, any] = [true, 1, "hello"];
```

> ⚠️ Use `any` with caution — it removes all the benefits of TypeScript's type system.

---

## `union` {#union}

A **union type** allows a variable to hold values of **multiple specific types**.

```ts
let test: string | number | string[] = "hello";
```

> This is more controlled than `any`, because you define which types are allowed.

---

## Custom Types (or Aliases) {#custom}

When objects get large or are used multiple times, it's better to define a reusable **type alias**.

Instead of repeating this:

```ts
let person: {
  firstName: string;
  ...
};
```

You can create a **custom type**:

```ts
type Person = {
  firstName: string;
  secondName: string;
  age: number;
  address: string;
  favouriteColor: string[];
};
```

Then reuse it:

```ts
let person: Person;

function findPerson(person: Person) {
  console.log(person.firstName);
}
```

> 🧠 Custom types improve readability and make your code easier to maintain.

## `enum` {#enum}
