# JavaScript - Document Object Model

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

## 🏗️ Creating & Appending Elements

### `document.createElement(tagName)`

Creates a new element.

```js
const newDiv = document.createElement("div");
newDiv.textContent = "Hello!";
```

### `parent.appendChild(child)`

Adds an element as the **last child**.

```js
document.body.appendChild(newDiv);
```

### `parent.append(...nodes)`

Adds one or more nodes or strings as children.

```js
parent.append("Text", newDiv); // supports multiple arguments
```

### `parent.prepend(node)`

Adds a node as the **first child**.

```js
parent.prepend(newDiv);
```

---

## 🔀 Moving & Removing Elements

### `parent.removeChild(child)`

Removes a child element.

```js
list.removeChild(item);
```

### `element.remove()`

Removes the element from the DOM (modern alternative).

```js
item.remove();
```

### `parent.insertBefore(newNode, referenceNode)`

Inserts a node **before** another child.

```js
list.insertBefore(newItem, list.children[1]);
```

---

## 🎨 Styling Elements

### `element.style.property`

Sets a specific inline style.

```js
box.style.backgroundColor = "blue";
```

- Property names use **camelCase**: `backgroundColor`, `fontSize`, etc.

### `element.classList`

Provides methods to manipulate classes:

```js
element.classList.add("active");
element.classList.remove("hidden");
element.classList.toggle("highlight");
element.classList.contains("open"); // returns true/false
```

---

## 🏷️ Attributes

### `element.setAttribute(name, value)`

Adds or changes an attribute.

```js
link.setAttribute("href", "https://example.com");
```

### `element.getAttribute(name)`

Returns the value of an attribute.

```js
link.getAttribute("href"); // "https://example.com"
```

### `element.removeAttribute(name)`

Removes an attribute.

```js
link.removeAttribute("target");
```

---

## 🏁 Summary Table – Core Methods

| Category   | Common Methods                                        |
| ---------- | ----------------------------------------------------- |
| Selection  | `querySelector`, `getElementById`, `querySelectorAll` |
| Creation   | `createElement`, `appendChild`, `prepend`             |
| Removal    | `removeChild`, `remove`, `innerHTML = ""`             |
| Insertion  | `insertBefore`, `append`, `prepend`                   |
| Styling    | `style.property`, `classList` methods                 |
| Attributes | `setAttribute`, `getAttribute`, `removeAttribute`     |

## 🧩 Example

```html
<button id="btn" class="test">Press me</button>
<div class="test"></div>
<span class="test"></span>

<script>
  // DOM selection
  let w = document.getElementById("btn");
  let x = document.querySelector("button");
  let y = document.querySelector("#btn");

  let z = document.querySelector(".test");

  let k = document.querySelectorAll(".test"); // NodeList
  let j = document.getElementsByClassName("test"); // HTMLCollection

  // Create new elements
  const div = document.querySelector("div");
  const newPar = document.createElement("p");
  newPar.textContent = "dynamically created element";
  div.appendChild(newPar);

  const extraText = document.createTextNode("extra text as node");
  newPar.appendChild(extraText);

  // Move & remove nodes
  document.body.appendChild(newPar);

  newPar.removeChild(extraText);
  extraText.remove();

  // Styling
  newPar.style.color = "red";
  newPar.style.backgroundColor = "blue"; // camelCase
  newPar.style.padding = "10px";
  newPar.style.textAlign = "center";

  // Add Attributes
  newPar.setAttribute("class", "modifyStyle");
  newPar.setAttribute("data-value", "hello"); // custom attributes
  console.log(newPar.getAttribute("data-value"));
</script>
```
