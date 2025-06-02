# JavaScript - Events & DOM Interaction

## 🔍 DOM Selection

### `document.querySelector(selector)`

Returns the **first** element that matches the selector.

```js
const button = document.querySelector(".btn");
```

- Accepts any CSS selector (`.class`, `#id`, `tag`, etc.)

### `document.querySelectorAll(selector)`

Returns **all matching elements** as a `NodeList`.

```js
const items = document.querySelectorAll("li");
items.forEach((item) => item.classList.add("active"));
```

### `document.getElementById(id)`

Returns the element with the specified ID.

```js
const title = document.getElementById("main-title");
```

### `document.getElementsByClassName(className)`

Returns a live HTMLCollection of elements with the specified class.

```js
const cards = document.getElementsByClassName("card");
```

### `document.getElementsByTagName(tagName)`

Returns a live HTMLCollection of elements by tag name.

```js
const paragraphs = document.getElementsByTagName("p");
```

### 🆚 `querySelector` vs `getElementBy`

| Feature         | `querySelector`                              | `getElementBy`                                    |
| --------------- | -------------------------------------------- | ------------------------------------------------- |
| 🔣 Syntax       | Uses **CSS selectors**                       | Uses **specific arguments** (`id`, `class`, etc.) |
| 📦 Return type  | `Element` or `NodeList`                      | `Element` or **live HTMLCollection**              |
| 🧠 Flexibility  | Can select anything (e.g., `div > p.active`) | More limited (only by ID, class, tag)             |
| 📌 Modern usage | ✅ Recommended                               | 🟡 Legacy but still useful in some cases          |
| 📊 Performance  | Slightly slower but negligible               | Slightly faster, especially in large DOMs         |

---
