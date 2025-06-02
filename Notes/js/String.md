# JavaScript - String

## Methods

### 🔤 **Access & Basic Info**

- `length`: Returns the number of characters in a string.
- `charAt(index)`: Returns the character at the specified index.

---

### ✂️ **Extracting**

- `slice(start, end)`: Extracts a section of a string and returns it as a new string.

  ```js
  "hello world".slice(0, 5); // "hello"
  ```

---

### 🔍 **Searching**

- `indexOf/lastIndexOf(substring)`: Returns the index of the first (or last) occurrence of the specified value.

  ```js
  "hello world".indexOf("o"); // 4
  "hello world".lastIndexOf("o"); // 7
  ```

- `includes(substring)`: Checks if the string contains the specified value.

  ```js
  "hello world".includes("world"); // true
  ```

- `startsWith/endsWith(suffix)`: Checks if the string starts or ends with the given value.

---

### 🔧 **Modifying**

- `toUpperCase()` / `toLowerCase()`: Returns a new string with all characters in uppercase or lowercase.

- `trim()` / `trimStart()` / `trimEnd()`: Removes whitespace from both ends of a string.

  ```js
  "  hello  ".trim(); // "hello"
  ```

- `replace(searchValue, newValue)`: Returns a new string with the first match replaced.

  ```js
  "hello world".replace("world", "there"); // "hello there"
  ```

  Use `/g` flag in regex to replace all:

  ```js
  "a-a-a".replace(/a/g, "b"); // "b-b-b"
  ```

- `repeat(count)`: Repeats the string `count` times.

  ```js
  "ha".repeat(3); // "hahaha"
  ```

- `concat(str1, str2, ...)`: Concatenates strings together.

  ```js
  "Hello".concat(" ", "World"); // "Hello World"
  ```

---

### 📤 **Splitting**

- `split(separator)`: Splits the string into an array using the specified separator.

  ```js
  "apple,banana,orange".split(","); // ["apple", "banana", "orange"]
  ```

---

## 🏆 String Methods Usage Ranking

| Rank | Method(s)                       | ⚡️ Use Frequency | 📌 Notes                                                   |
| ---: | ------------------------------- | ----------------- | ---------------------------------------------------------- |
|    1 | `length`                        | ⭐⭐⭐⭐⭐        |                                                            |
|    2 | `toUpperCase() / toLowerCase()` | ⭐⭐⭐⭐☆         |                                                            |
|    3 | `trim()`                        | ⭐⭐⭐⭐☆         |                                                            |
|    4 | `includes()`                    | ⭐⭐⭐⭐☆         | More readable and modern alternative to `indexOf`.         |
|    5 | `slice()`                       | ⭐⭐⭐⭐☆         |                                                            |
|    6 | `replace()`                     | ⭐⭐⭐⭐☆         |                                                            |
|    7 | `split()`                       | ⭐⭐⭐⭐☆         |                                                            |
|    8 | `indexOf()` / `lastIndexOf()`   | ⭐⭐⭐⭐☆         |                                                            |
|    9 | `startsWith()` / `endsWith()`   | ⭐⭐⭐☆☆          | Common in specific contexts, like file extensions or URLs. |
|   10 | `repeat()`                      | ⭐⭐☆☆☆           | Niche use: visual effects, placeholders, text animations.  |
|   11 | `charAt()`                      | ⭐⭐☆☆☆           | Often replaced by `str[i]` for simplicity.                 |
|   12 | `concat()`                      | ⭐☆☆☆☆            | Rarely used: the `+` operator is simpler and more common.  |

---

## ➕ **Regular Expressions (RegEx)**

A **RegEx** is a pattern used to match character combinations in strings.

### ✅ Basic Usage

- To create a regular expression, use `/pattern/` or `new RegExp("pattern")`.

### 🛠️ Common RegEx Methods:

- `.test(string)`: Returns `true` if the pattern matches part of the string.

  ```js
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test("user@example.com");
  ```

- `.exec(string)`: Returns match info or `null`.

---

### 📧 Example: Email Validation

```js
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email.value)) {
  errEmail.textContent = "Invalid email format.";
}
```

---

#### 🔍 What this regex means:

```js
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```

- `/.../` → defines the pattern
- `^` → start of string
- `[^\s@]+` → one or more characters that are **not** space (`\s`) or `@`
- `@` → the "@" symbol, required in every valid email
- `[^\s@]+` → again, one or more non-space, non-@ characters
- `\.` → a literal dot (`.`), escaped with `\`
- `[^\s@]+` → one or more non-space, non-@ characters (e.g., domain suffix like `com`)
- `$` → end of string

✅ This pattern ensures the email looks like: `something@something.something`
