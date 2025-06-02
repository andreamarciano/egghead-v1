# JavaScript - Object

## Object Basic

### 📦 Key-Value Object

```js
const person = {
  fname: "John",
  lname: "Doe",
  genre: "Male",
  age: 24,
  interests: ["snowboard", "basket", "books"],
  address: {
    street: "That Road",
    zipCode: "09812",
    state: "FG",
    city: "Washington",
  },
  sayHello: function () {
    // console.log(`Hey it's ${person.fname}`); // equivalent
    console.log(`Hey it's ${this.fname}`); // refers to the current object
  },
};
```

---

### 📌 Accessing Properties

#### Dot Notation

Use when the property name is known and valid as an identifier.

```js
console.log(person.fname); // "John"
console.log(person.address.zipCode); // "09812"
console.log(person.interests[2]); // "books"
```

#### Bracket Notation

Use when the property name is stored in a **variable** or includes **invalid characters** (e.g., spaces or hyphens).

```js
console.log(person["fname"]); // "John"
console.log(person["address"]["zipCode"]); // "09812"
console.log(person["interests"][2]); // "books"
```

---

### 🎯 Dynamic Property Access

**Bracket notation** is useful when the key is **dynamic**, such as coming from user interaction.

```js
const modifyKey = "genre";
console.log(person[modifyKey]); // "Male"
```

⚠️ If you mistakenly use dot notation, you'll get `undefined`:

```js
console.log(person.modifyKey); // undefined
```

---

### ➕ Adding or Modifying Properties

```js
person.nickName = "Jojo"; // add new property
person.favouriteColor = "blue"; // add new property
person.age = 25; // modify existing property
```

Note: assigning to a numeric key with dot notation will be treated as a string:

```js
person.address[2] = "Sport"; // adds a new key "2" to the `address` object
```

### 🧰 Calling Methods

```js
person.sayHello(); // "Hey it's John"
```

### 🧪 Destructuring

Extract multiple properties in a compact form:

```js
const { fname, age } = person;
console.log(fname); // "John"
console.log(age); // 24
```

---

## Object-Oriented Programming

**OOP** is a paradigm that structures code using **classes** and **instances** (objects) with properties and behaviors (methods).

### 🔹 Basic Concepts

```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

const dog = new Animal("Buddy");
dog.speak(); // "Buddy makes a sound."
```

- **`class`**: template for creating objects
- **`constructor`**: initializes instance data
- **`this`**: refers to the object itself
- **`extends`**: inheritance for creating class hierarchies

---

### ⚛️ Why React Makes OOP Mostly Obsolete

React encourages a **functional** and **declarative** approach. Since the introduction of **hooks** (React 16.8), OOP-style components are no longer necessary.

#### 🔄 React Before vs After Hooks

##### 🔙 Class Component (OOP style)

```js
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => this.setState({ count: this.state.count + 1 });

  render() {
    return <button onClick={this.increment}>{this.state.count}</button>;
  }
}
```

##### 🔜 Function Component (modern React)

```js
function Counter() {
  const [count, setCount] = React.useState(0);

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

#### ✅ Functional React wins because:

| Functional Components              | Class Components (OOP)         |
| ---------------------------------- | ------------------------------ |
| Simpler syntax                     | Verbose boilerplate            |
| No `this` binding issues           | Manual `this` binding required |
| Hooks allow logic reuse            | Harder to reuse logic cleanly  |
| Better support and community usage | Being slowly phased out        |

---

### 🔍 When OOP is Still Useful (Even in React)

Although not required in most React code, OOP can still be useful in:

| Use Case                                          | Why OOP Might Help                                      |
| ------------------------------------------------- | ------------------------------------------------------- |
| Working with **external OOP libraries**           | Some libraries require using `new` or extending classes |
| Modeling **domain logic** (e.g., `Order`, `User`) | Classes can encapsulate behavior + state                |
| Using **Web APIs** like `Audio`, `Date`, `File`   | These are based on native classes                       |
| Maintaining **legacy React code**                 | Pre-hooks code uses class components                    |

Example: Using a class to model reusable behavior:

```js
class Order {
  constructor(items) {
    this.items = items;
  }

  getTotal() {
    return this.items.reduce((acc, i) => acc + i.price, 0);
  }
}

const cart = new Order([{ price: 20 }, { price: 15 }]);
console.log(cart.getTotal()); // 35
```

> ✅ This works in React, but a pure function + object would be just as effective.

---

### 🧪 Alternative to OOP in React

React encourages **composition** and **functional logic reuse**:

- **Hooks** instead of class methods
- **Custom hooks** instead of inheritance
- **Utility modules** instead of instance methods

```js
// utils/price.js
export function getTotal(items) {
  return items.reduce((acc, i) => acc + i.price, 0);
}

// In component
import { getTotal } from "./utils/price";
const total = getTotal(cartItems);
```
