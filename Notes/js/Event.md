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

## ⚙️ Event Handling

### 🧩 Adding Events

#### `element.addEventListener(event, callback)`

Attaches an event handler to the element.

```js
button.addEventListener("click", () => {
  console.log("Button clicked!");
});
```

- Multiple listeners of the same type **can coexist**.
- Works on any DOM element.

---

### ❌ Removing Events

#### `element.removeEventListener(event, callback)`

Removes a previously added event listener.

```js
function handleClick() {
  console.log("Clicked");
}

button.addEventListener("click", handleClick);
button.removeEventListener("click", handleClick);
```

---

### ⚡️ Event Object

Every event callback receives an `event` object with useful information.

```js
document.addEventListener("click", (e) => {
  console.log(e.target); // element that was clicked
});
```

---

### 🔄 Common Events

| Type        | Example use                         |
| ----------- | ----------------------------------- |
| `click`     | Buttons, links, custom components   |
| `submit`    | Forms                               |
| `input`     | Text fields while typing            |
| `change`    | Select, checkbox, radio             |
| `keydown`   | Keyboard shortcuts, games           |
| `mousemove` | Hover effects, drawing              |
| `scroll`    | Sticky headers, infinite scroll     |
| `load`      | Wait for images/resources to finish |

---

### 🎯 Event Targeting

#### `event.target`

The actual element that triggered the event.

#### `event.currentTarget`

The element the listener is attached to.

```js
parent.addEventListener("click", (e) => {
  console.log("Target:", e.target);
  console.log("Current:", e.currentTarget);
});
```

---

### 🪄 Preventing Default Behavior

#### `event.preventDefault()`

Stops the browser from doing its default action.

```js
form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent form from reloading the page
});
```

---

### 🪤 Event Delegation

Use one listener on a parent to handle events on many children.

```js
ul.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    console.log("Clicked item:", e.target.textContent);
  }
});
```

- Improves performance
- Useful for dynamic elements

---

### ➕ 3 Ways to Attach Events

#### 1. **Inline Event Handler (HTML)**

Defined directly in the HTML element using `on[event]`.

```html
<button onclick="document.querySelector('p').textContent = 'Button clicked';">
  Click me
</button>
```

- ✅ Quick for small demos or prototypes
- ⚠️ Not recommended for real projects — mixes structure (HTML) and behavior (JS)

---

#### 2. **Property-Based Event Handler**

Assign a function to the DOM element's event property.

```js
const button = document.querySelector("button");
button.onclick = function () {
  document.querySelector("p").textContent = "Button clicked";
};
```

- ✅ Easy and readable
- ⚠️ You can **only assign one** handler per event this way — any new assignment will overwrite the previous one.

---

#### 3. **`addEventListener` (Recommended)**

Attach one or more listeners using the standard method.

```js
const button = document.querySelector("button");
button.addEventListener("click", () => {
  document.querySelector("p").textContent = "Button clicked";
});
```

- ✅ Modern, flexible, and allows multiple listeners
- ✅ Clean separation of logic and markup
- ✅ Works with all standard and custom events
