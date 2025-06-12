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
- [`enum`](#enum)
- [`any`](#any)
- [`union`](#union)
- [`type aliases`](#aliases)
- [`custom types`](#custom)

---

## `object` {#object}

## `array` {#array}

## `tuple` {#tuple}

## `enum` {#enum}

## `any` {#any}

## `union` {#union}

## Type Aliases {#aliases}

## Custom Types {#custom}
