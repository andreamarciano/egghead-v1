# TS - Generics

Generics allow you to create **reusable components** that work with a variety of types.
They enable you to define **type-safe** and **flexible** structures and functions without losing specificity.

You can think of them as type **placeholders**:

> "I don’t know the type yet, but once I do, I want to enforce it."

## Table of Contents

- [Built-in Generics](#builtin)
- [Multiple Generic Types](#multiple)
- [Constraints with `extends`](#constraints)
- [Generic Class Example](#class)

---

## 📦 Built-in Generics Example {#builtin}

```ts
const arr: string[] = ["a", "b"];
// Same as:
const arr: Array<string> = ["a", "b"];
```

---

### ❌ Without Generics

```ts
function createArray(items: any[]): any[] {
  return new Array().concat(items);
}

const arr1 = createArray([1, 2, 3]);
const arr2 = createArray(["a", "b", "c"]);

arr1.push("hello"); // No error, even though it should be a number array
```

---

### ✅ With Generics

```ts
function createArray<T>(items: T[]): T[] {
  return new Array().concat(items);
}

const arr1 = createArray([1, 2, 3]);     // T = number
const arr2 = createArray(["a", "b", "c"]); // T = string

arr1.push("hello"); // ❌ Error: string is not assignable to number
```

You can also explicitly specify the type:

```ts
const arr1 = createArray<number>([1, 2, 3]);
```

---

## 🧩 Multiple Generic Types {#multiple}

```ts
function pairValues<T, U>(a: T, b: U): [T, U] {
  return [a, b];
}

const result1 = pairValues<string, number>("age", 30);  // ["age", 30]
const result2 = pairValues<boolean, string>(true, "yes"); // [true, "yes"]
```

---

## Constraints with `extends` {#constraints}

You can restrict the types allowed for a generic using `extends`.

```ts
function createArray<T extends number | string>(items: T[]): T[] {
  return new Array().concat(items);
}

const arr = createArray<boolean>([true, false]); // ❌ Error: boolean not allowed
```

---

## Generic Class Example {#class}

```ts
class List<T> {
  private items: T[] = [];

  addItem(item: T): void {
    this.items.push(item);
  }

  removeItem(item: T): void {
    const index = this.items.indexOf(item);
    if (index !== -1) this.items.splice(index, 1);
  }
}

const stringList = new List<string>();
stringList.addItem("a");
stringList.removeItem("a");

const numberList = new List<number>();
numberList.addItem(42);
numberList.removeItem(10);
```

> This allows you to create type-safe, reusable containers.
