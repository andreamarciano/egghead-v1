# JavaScript - Object

## 📦 Key-Value Object

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

## 📌 Accessing Properties

### Dot Notation

Use when the property name is known and valid as an identifier.

```js
console.log(person.fname); // "John"
console.log(person.address.zipcode); // "09812"
console.log(person.interests[2]); // "books"
```

### Bracket Notation

Use when the property name is stored in a **variable** or includes **invalid characters** (e.g., spaces or hyphens).

```js
console.log(person["fname"]); // "John"
console.log(person["address"]["zipcode"]); // "09812"
console.log(person["interests"][2]); // "books"
```

---

## 🎯 Dynamic Property Access

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

## ➕ Adding or Modifying Properties

```js
person.nickName = "Jojo"; // add new property
person.favouriteColor = "blue"; // add new property
person.age = 25; // modify existing property
```

Note: assigning to a numeric key with dot notation will be treated as a string:

```js
person.address[2] = "Sport"; // adds a new key "2" to the `address` object
```

## 🧰 Calling Methods

```js
person.sayHello(); // "Hey it's John"
```

## 🧪 Destructuring

Extract multiple properties in a compact form:

```js
const { fname, age } = person;
console.log(fname); // "John"
console.log(age); // 24
```
