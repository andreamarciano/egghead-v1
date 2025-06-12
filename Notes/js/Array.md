# JavaScript - Array

## Methods

### 🔤 **Access & Basic Info**

- `length`: Returns the number of elements in the array.
- `at(index)`: Returns the element at the given index (supports negative values).

---

### 🧹 **Adding / Removing**

- `push(item)`: Adds item(s) to the end.

  ```js
  const arr = [1, 2];
  arr.push(3); // [1, 2, 3]
  ```

- `pop()`: Removes and returns the last item.

  ```js
  const arr = [1, 2, 3];
  arr.pop(); // 3, arr is now [1, 2]
  ```

- `unshift(item)`: Adds item(s) to the beginning.

  ```js
  const arr = [2, 3];
  arr.unshift(1); // [1, 2, 3]
  ```

- `shift()`: Removes and returns the first item.

  ```js
  const arr = [1, 2, 3];
  arr.shift(); // 1, arr is now [2, 3]
  ```

- `splice(start, deleteCount, ...items)`: Removes and/or adds items in place.

  ```js
  const arr = [1, 2, 3];
  arr.splice(1, 1, "a"); // [1, "a", 3]
  ```

### 📋 **Copying / Slicing**

- `slice(start, end)`: Returns a shallow copy of a portion of an array.

  ```js
  const arr = [1, 2, 3, 4];
  arr.slice(1, 3); // [2, 3]
  ```

- `toReversed()`: Returns a reversed copy (non-destructive).

  ```js
  const arr = [1, 2, 3];
  arr.toReversed(); // [3, 2, 1]
  ```

- `toSorted()`: Returns a sorted copy (non-destructive).

  ```js
  const arr = [3, 1, 2];
  arr.toSorted(); // [1, 2, 3]
  ```

- `toSpliced(start, deleteCount, ...items)`: Returns a copy with elements removed/replaced.

  ```js
  const arr = [1, 2, 3];
  arr.toSpliced(1, 1, "a"); // [1, "a", 3]
  ```

---

### 🔍 **Searching**

- `includes(item)`: Checks if the array contains the given item.

  ```js
  const arr = [1, 2, 3];
  arr.includes(2); // true
  ```

- `indexOf/lastIndexOf(item)`: Returns the index of the first/last occurrence of the item, or -1 if not found.

  ```js
  const arr = [1, 2, 3];
  arr.indexOf(2); // 1

  const arr2 = [1, 2, 3, 2];
  arr2.lastIndexOf(2); // 3
  ```

- `find(callback)`: Returns the first matching element.

  ```js
  const arr = [1, 2, 3];
  arr.find((x) => x > 1); // 2
  ```

- `findIndex(callback)`: Returns the index of the first match.

  ```js
  const arr = [1, 2, 3];
  arr.findIndex((x) => x > 1); // 1
  ```

---

### 🔧 **Transforming**

- `map(callback)`: Transforms each element and returns a new array.

  ```js
  [1, 2, 3].map((x) => x * 2); // [2, 4, 6]
  ```

- `filter(callback)`: Returns a new array with only the elements that match the condition.

  ```js
  [1, 2, 3].filter((x) => x > 1); // [2, 3]
  ```

- `reduce(callback, initialValue)`: Accumulates a value by applying the callback.

  ```js
  [1, 2, 3].reduce((acc, val) => acc + val, 0); // 6
  ```

---

### 🔁 **Looping & Checking**

- `forEach(callback)`: Executes a function on each element (no return).

  ```js
  [1, 2, 3].forEach((x) => console.log(x));
  ```

- `every(callback)`: Returns true if all elements match the condition.

  ```js
  [1, 2, 3].every((x) => x > 0); // true
  ```

- `some(callback)`: Returns true if at least one element matches.

  ```js
  [1, 2, 3].some((x) => x === 2); // true
  ```

---

### 📤 **Joining / Converting**

- `join(separator)`: Combines elements into a string.

  ```js
  ["a", "b", "c"].join("-"); // "a-b-c"
  ```

- `flat(depth)`: Flattens nested arrays.

  ```js
  [1, [2, [3]]].flat(2); // [1, 2, 3]
  ```

- `flatMap(callback)`: Like `map()` + `flat(1)` in a single call.

  ```js
  [1, 2, 3].flatMap((x) => [x, x * 2]); // [1, 2, 2, 4, 3, 6]
  ```

---

### 🧪 **Testing & Utility**

- `Array.isArray(obj)`: Checks if a variable is an array.

  ```js
  Array.isArray([1, 2, 3]); // true
  ```

- `from()`: Converts array-like or iterable objects into arrays.

  ```js
  Array.from("abc"); // ["a", "b", "c"]
  ```

- `fill(value, start, end)`: Fills part of the array with a static value.

  ```js
  [1, 2, 3].fill(0, 1, 3); // [1, 0, 0]
  ```

---

## 🏆 Array Methods Usage Ranking

| Rank | Method(s)                | ⚡️ Use Frequency | 📌 Notes                                                  |
| ---: | ------------------------ | ----------------- | --------------------------------------------------------- |
|    1 | `push()` / `pop()`       | ⭐⭐⭐⭐⭐        |                                                           |
|    2 | `map()`                  | ⭐⭐⭐⭐⭐        |                                                           |
|    3 | `filter()`               | ⭐⭐⭐⭐☆         |                                                           |
|    4 | `forEach()`              | ⭐⭐⭐⭐☆         | Widely used, but often replaced by `map()` or loops.      |
|    5 | `includes()`             | ⭐⭐⭐⭐☆         |                                                           |
|    6 | `slice()`                | ⭐⭐⭐⭐☆         |                                                           |
|    7 | `reduce()`               | ⭐⭐⭐☆☆          |                                                           |
|    8 | `find()` / `findIndex()` | ⭐⭐⭐☆☆          |                                                           |
|    9 | `shift()` / `unshift()`  | ⭐⭐☆☆☆           | Less used compared to `push/pop`.                         |
|   10 | `join()`                 | ⭐⭐☆☆☆           | Mostly used for display (e.g., CSV or simple output).     |
|   11 | `splice()`               | ⭐⭐☆☆☆           | Powerful but can be error-prone if not handled carefully. |
|   12 | `flat()` / `flatMap()`   | ⭐☆☆☆☆            | Useful but for more complex or nested data structures.    |
|   13 | `every()` / `some()`     | ⭐☆☆☆☆            |                                                           |
