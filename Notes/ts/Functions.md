# TS - Functions

## Table of Contents

- [Parameter Types](#p_types)
- [Default Parameters and Inference](#default_inference)
- [Return Types](#return)
- [Functions as Data Types](#f_as_datatypes)
- [Function Types as Parameter](#f_as_par)

---

## Parameter Types {#p_types}

You can specify the type of each parameter:

```ts
function sum(num1: number, num2: number) {
  console.log(num1 + num2);
}

sum(1, 2);
```

---

## Default Parameters and Inference {#default_inference}

If you provide default values, TypeScript can infer their types:

```ts
function sum(num1 = 0, num2 = 1) {
  console.log(num1 + num2);
}

sum();
```

---

## Return Types {#return}

TypeScript can infer the return type, but you can also specify it explicitly for clarity and safety:

```ts
function sum(num1: number, num2 = 1): number {
  return num1 + num2;
}

const res = sum(1, 2);
```

From the function signature alone, it's clear:

- First parameter: required `number`
- Second parameter: optional `number` (with default)
- Return type: `number`

### Multiple Return Types

Sometimes a function may return different types, or nothing at all:

```ts
function sum(num1: number, num2 = 1): any {
  if (/* condition */) {
    return 5;
  } else if (/* another condition */) {
    return "hi";
  } else {
    console.log("hello");
  }
}
```

To be more specific, use a **union type**:

```ts
function sum(num1: number, num2 = 1): number | string | undefined {
  if (/* condition */) {
    return 5;
  } else if (/* another condition */) {
    return "hi";
  } else {
    console.log("hello");
    return;
  }
}
```

If the function does not return anything, use `void`:

```ts
function sum(num1: number, num2 = 1): void {
  console.log("hello");
}
```

> In JavaScript, this would return `undefined`, but in TypeScript `void` and `undefined` are **not the same**.
> `void` means "no value returned"; `undefined` is a specific data type.

---

## Functions as Data Types {#f_as_datatypes}

You can assign a function to a variable:

```ts
function sum(num1: number, num2 = 1): number {
  return num1 + num2;
}

let test = sum; // Inferred as (num1: number, num2?: number) => number
```

Or declare the function type explicitly:

```ts
let test: Function;
test = sum;
```

However, this is **too generic**. For better safety, specify the full signature:

```ts
function nothing(text: string): void {
  console.log(text);
}

let test: (x: number, y: number) => number;
test = sum;      // ✅ OK
test = nothing;  // ❌ Error
```

---

## Function Types as Parameters (e.g., Callbacks) {#f_as_par}

You can also specify function types as parameter types:

```ts
function test(x: number, cb: () => void) {
  cb();
}

test(5, () => {
  console.log("void");
});
```
