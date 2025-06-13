# TS - Classes

## Table of Contents

- [Defining a Class](#define)
- [Constructor](#constructor)
- [Methods](#methods)
- [Access Modifiers](#modifiers)
  - [Constructor Shorthand with Access Modifiers](#shorthand)
- [Read Only Properties](#readonly)
- [Inheritance: Subclass and super](#super)
- [`protected` Modifier](#protected)
- [`static` Properties and Methods](#static)
- [`abstract` Classes](#abstract)
- [Singleton Pattern](#singleton)

> [Full Example](#example)

## Defining a Class and Adding Properties {#define}

```ts
class Person {
  name: string = "Joel";
  age: number = 30;
}

let person: Person;
person = new Person();
```

---

## Constructor with Parameters {#constructor}

```ts
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

let person: Person = new Person("John", 30);
let person2: Person = new Person("Jack", 25);
```

---

## Methods with Type Annotations {#methods}

```ts
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  introduce(): void {
    console.log(`Hey, my name is ${this.name} and I am ${this.age}.`);
  }

  sayHi(person: Person): void {
    console.log(`Hi ${person.name}, my name is ${this.name}.`);
  }
}

let person: Person = new Person("John", 30);
let person2: Person = new Person("Jack", 25);
person.introduce();
person2.sayHi(person);
```

---

## Access Modifiers: `private`, `public`, and `protected` {#modifiers}

By default, all properties and methods are `public`. You can explicitly declare them for clarity:

- `public`: accessible anywhere
- `private`: accessible only within the class
- `protected`: accessible within the class and subclasses (covered later)

Example of `private` to prevent external modification:

```ts
class Person {
  private name: string;

  constructor(name: string, age: number) {
    this.name = name;
  }
}

let person = new Person("John", 30);
person.name = "Mark"; // ❌ Error: Property 'name' is private
```

---

### Constructor Shorthand with Access Modifiers {#shorthand}

You can combine property declaration and assignment in the constructor parameters:

```ts
class Person {
  constructor(private name: string, private age: number) {}

  introduce(): void {
    console.log(`Hey, my name is ${this.name} and I am ${this.age}.`);
  }

  sayHi(person: Person): void {
    console.log(`Hi ${person.name}, my name is ${this.name}.`);
  }
}

let person = new Person("John", 30);
let person2 = new Person("Jack", 25);
person.introduce();
person2.sayHi(person);
```

---

## 🔒 `readonly` Properties {#readonly}

Use `readonly` to make a property immutable after assignment:

```ts
class Person {
  constructor(private readonly name: string, private age: number) {}
}
```

Once a `readonly` property is set (in the constructor), it cannot be changed later.

---

## Inheritance: Subclass and `super` {#super}

A class can extend another class using `extends`. This allows inheriting properties and methods.

```ts
class Student extends Person {}

const student: Student = new Student("Alice", 22);
```

You can also define additional properties in the child class:

```ts
class Student extends Person {
  constructor(
    name: string,
    age: number,
    private favouriteSubject: string
  ) {
    super(name, age); // calls the constructor of the parent class
  }
}

const student: Student = new Student("Alice", 22, "Math");
```

---

## 🛡 `protected` Modifier {#protected}

`protected` is like `private`, but also accessible in **subclasses**.

```ts
class Person {
  constructor(protected name: string, private age: number) {}

  introduce(): void {
    console.log(`Hey, my name is ${this.name} and I am ${this.age}.`);
  }

  changeName(): void {
    this.name = "new name";
  }
}

class Student extends Person {
  constructor(
    name: string,
    age: number,
    private favouriteSubject: string
  ) {
    super(name, age);
  }

  changeStudentName(): void {
    this.name = "new student name"; // ✅ Works because it's protected
  }
}
```

---

## Static Properties and Methods {#static}

Static members belong to the class, not to instances. You can access them directly using the class name.

```ts
class Student {
  static schoolName: string = "Example High School";

  static sayHi(person: Person): void {
    console.log(`Hi ${person.name}`);
  }
}

Student.sayHi(new Person("John", 30)); // no need to create a Student instance
console.log(Student.schoolName);
```

> Like `Math.PI` or `Math.floor()`, which you use without creating a `Math` object.

---

## Abstract Classes {#abstract}

Abstract classes define structure and are not meant to be instantiated directly.

```ts
abstract class Person {
  constructor(protected name: string, protected age: number) {}

  abstract introduce(): void; // must be implemented by subclasses
}

const person = new Person("John", 30); // ❌ Error: Cannot instantiate abstract class
```

Subclasses must implement any abstract methods:

```ts
class Student extends Person {
  constructor(
    name: string,
    age: number,
    private favouriteSubject: string
  ) {
    super(name, age);
  }

  introduce(): void {
    console.log(`I'm ${this.name} and I'm studying ${this.favouriteSubject}.`);
  }
}
```

---

## Singleton Pattern {#singleton}

A **singleton** ensures that only **one instance** of a class can be created.
This pattern is useful when you want a single shared resource — for example, a `Principal`, while you may have many `Student`.

```ts
class Principal {
  private static instance: Principal;

  private constructor(private name: string, private age: number) {}

  static getInstance(): Principal {
    if (Principal.instance) {
      return this.instance;
    }

    this.instance = new Principal("Albus", 100);
    return this.instance;
  }

  introduce(): void {
    console.log(`I'm the principal ${this.name}`);
  }
}
```

### Key Concepts

1. **Private constructor**: prevents creating new instances with `new Principal(...)`
2. **Static instance property**: holds the unique instance
3. **Static method** `getInstance()`: controls the creation and access to the single instance
4. You access the instance like this:

```ts
Principal.getInstance().introduce();
```

If you try to do this:

```ts
const principal = new Principal("John", 50); // ❌ Error: constructor is private
```

you’ll get an error.

---

## Full Example {#example}

```ts
// Person
abstract class Person {
  constructor(
    protected readonly name: string,
    protected age: number
  ) {}

  abstract introduce(): void;

  celebrateBirthday(): void {
    this.age++;
    console.log(`${this.name} is now ${this.age} years old.`);
  }
}

// Student
class Student extends Person {
  constructor(
    name: string,
    age: number,
    private favouriteSubject: string
  ) {
    super(name, age);
  }

  introduce(): void {
    console.log(
      `Hi, I'm ${this.name}, I'm ${this.age} years old and I love ${this.favouriteSubject}.`
    );
  }

  study(): void {
    console.log(`${this.name} is studying ${this.favouriteSubject}.`);
  }
}

// Teacher
class Teacher extends Person {
  constructor(
    name: string,
    age: number,
    private subject: string
  ) {
    super(name, age);
  }

  introduce(): void {
    console.log(
      `Hello, I'm Professor ${this.name}, I teach ${this.subject}.`
    );
  }

  explain(): void {
    console.log(`${this.name} is explaining ${this.subject}.`);
  }

  static schoolMotto(): void {
    console.log("Knowledge is power!");
  }
}

// Principal
class Principal {
  private static instance: Principal;

  private constructor(
    private readonly name: string,
    private readonly age: number
  ) {}

  static getInstance(): Principal {
    if (!Principal.instance) {
      Principal.instance = new Principal("Albus Dumbledore", 115);
    }
    return Principal.instance;
  }

  introduce(): void {
    console.log(`I'm Principal ${this.name}, welcome to our school.`);
  }
}


const student1 = new Student("Harry", 15, "Defense Against the Dark Arts");
const teacher1 = new Teacher("Snape", 45, "Potions");

student1.introduce(); // Hi, I'm Harry, I'm 15 years old and I love Defense Against the Dark Arts.
teacher1.introduce(); // Hello, I'm Professor Snape, I teach Potions.

student1.study(); // Harry is studying Defense Against the Dark Arts.
teacher1.explain(); // Snape is explaining Potions.

student1.celebrateBirthday(); // Harry is now 16 years old.
teacher1.celebrateBirthday(); // Snape is now 46 years old.

Teacher.schoolMotto(); // Knowledge is power!

const principal = Principal.getInstance();
principal.introduce(); // I'm Principal Albus Dumbledore, welcome to our school.

const anotherPrincipal = Principal.getInstance();
console.log(principal === anotherPrincipal); // true (singleton)
```
