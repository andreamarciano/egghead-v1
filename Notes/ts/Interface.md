# TS - Interfaces

Interfaces define a **contract** for the structure of an object or class.
They help enforce consistent shapes and behaviors without implementing logic (like abstract classes).

They are useful to:

- Provide additional functionality to classes.
- Avoid code duplication.
- Describe complex object types.

---

## Table of Contents

- [Declaring an Interface](#declaring)
  - [Interfaces vs Custom Types](#custom)
- [Implements an Interface in a Class](#implements)
- [Device example](#deviceexample)
- [Extending Multiple Interfaces](#extending)

> [Full Example](#example)

---

## ✏️ Declaring an Interface {#declaring}

```ts
interface Test {
  name: string;
  sayHi(): void; // Method signature only, no body.
}
```

Interfaces describe *what* an object/class should have, not *how*.

---

### Interfaces vs Custom Types {#custom}

```ts
interface Test {
  name: string;
  sayHi(): void;
}

type Test2 = {
  name: string;
  sayHi(): void;
};
```

🟢 Use `interface` when:

- You want to **implement** it in a class.
- You might need **extension or multiple inheritance** (interfaces can extend each other).

🟡 Use `type` when:

- Creating complex or union types.
- Combining types using `&` or `|`.

---

## Implementing an Interface in a Class {#implements}

```ts
interface Test {
  name: string;
  sayHi(): void;
}

class TestClass implements Test {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  sayHi(): void {
    console.log("hi");
  }
}
```

> 🔹 You can’t use access modifiers (`private`, `protected`) in the interface itself.
> 🔹 You *can* use `readonly`.

---

### 📦 Implementing Multiple Interfaces

```ts
interface A {}
interface B {}

class MyClass implements A, B {}
```

But you can only **extend** one class:

```ts
class MyClass extends ParentClass implements A, B {}
```

---

## Example: 🌐 Internet-enabled Devices {#deviceexample}

```ts
interface Internet {
  ip: string;
  connectInternet(): void;
}

abstract class Device {
  constructor(protected name: string, protected year: number) {}

  abstract turnOn(): void;
  abstract turnOff(): void;
}

class Telephone extends Device {
  turnOn(): void {
    console.log(`${this.name} is now ON`);
  }

  turnOff(): void {
    console.log(`${this.name} is now OFF`);
  }
}

class Smartphone extends Device implements Internet {
  ip: string;

  constructor(name: string, year: number, ip: string) {
    super(name, year);
    this.ip = ip;
  }

  turnOn(): void {
    console.log(`${this.name} is now ON`);
  }

  turnOff(): void {
    console.log(`${this.name} is now OFF`);
  }

  connectInternet(): void {
    console.log(`${this.name} has connected to the internet`);
  }
}
```

> Interfaces let you **add behavior** (like internet connectivity) without changing the class hierarchy.

---

## Extending Multiple Interfaces {#extending}

```ts
interface X {
  name: string;
}

interface Y extends X {
  year: number;
  checkBatteryUsage(): void;
}

interface Z {
  internet: boolean;
  connectInternet(): void;
}

interface W extends Y, Z {
  touch: boolean;
  enableTouch(): void;
}

class Device implements W {
  name: string;
  year: number;
  internet: boolean;
  touch: boolean;

  constructor(name: string, year: number, internet: boolean, touch: boolean) {
    this.name = name;
    this.year = year;
    this.internet = internet;
    this.touch = touch;
  }

  checkBatteryUsage(): void {
    console.log("Checking battery usage...");
  }

  connectInternet(): void {
    console.log("Connecting to the internet...");
  }

  enableTouch(): void {
    console.log("Enabling touch functionality...");
  }
}
```

---

## Full Example {#example}

We're building a small internal simulation to represent the members of a school.

You’ll need to model different types of people who are part of the school environment: students, teachers, the principal, and even the occasional guest lecturer. Each of them has different responsibilities, abilities, and behaviors.

Here’s what the system needs to support:

- Students and teachers should have the ability to introduce themselves, and perform actions typical of their roles (like studying or teaching).

- Some members of the school should also be able to use a computer, and in some cases, even write code in a specific programming language.

- The school has a single principal who should be globally accessible and only instantiated once.

- There might be external people (like a guest lecturer) who participate in school activities temporarily but should still integrate with the rest of the system.

- We also want to be able to welcome any group of school-related people in a unified way, regardless of their role.

```ts
// Interfaces
  interface SchoolMember {
    readonly name: string;
    introduce(): void;
  }

  interface CanStudy {
    favouriteSubject: string;
    study(): void;
  }

  interface CanTeach {
    subject: string;
    explain(): void;
  }

  interface CanUseComputer {
    useComputer(): void;
  }

  interface CanProgram extends CanUseComputer {
    language: string;
    writeCode(): void;
  }

  // Abstract Class
  abstract class Person implements SchoolMember {
    constructor(public readonly name: string, protected age: number) {}

    abstract introduce(): void;

    celebrateBirthday(): void {
      this.age++;
      console.log(`${this.name} is now ${this.age} years old.`);
    }
  }

  // Student
  class Student extends Person implements CanStudy, CanUseComputer {
    constructor(name: string, age: number, public favouriteSubject: string) {
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

    useComputer(): void {
      console.log(`${this.name} is browsing school materials on the computer.`);
    }
  }

  // Teacher
  class Teacher extends Person implements CanTeach, CanUseComputer {
    constructor(name: string, age: number, public subject: string) {
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

    useComputer(): void {
      console.log(`${this.name} is preparing slides on the computer.`);
    }

    static schoolMotto(): void {
      console.log("Knowledge is power!");
    }
  }

  // Principal (Singleton)
  class Principal implements SchoolMember {
    private static instance: Principal;

    private constructor(
      public readonly name: string,
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

  // Object that directly implements an interface
  const guestLecturer: CanProgram & SchoolMember = {
    name: "Linus Torvalds",
    language: "C",
    useComputer() {
      console.log(`${this.name} is using a Linux terminal.`);
    },
    writeCode() {
      console.log(`${this.name} is writing code in ${this.language}.`);
    },
    introduce() {
      console.log(`I'm ${this.name}, guest lecturer and open-source advocate.`);
    },
  };

  // Function that works with interfaces (polymorphism)
  function welcomeEveryone(members: SchoolMember[]) {
    for (const member of members) {
      member.introduce();
    }
  }

  // --- Usage ---
  const student1 = new Student("Harry", 15, "Defense Against the Dark Arts");
  const teacher1 = new Teacher("Snape", 45, "Potions");
  const principal = Principal.getInstance();

  welcomeEveryone([student1, teacher1, principal, guestLecturer]);

  student1.study();
  teacher1.explain();

  student1.useComputer();
  teacher1.useComputer();

  guestLecturer.useComputer();
  guestLecturer.writeCode();

  Teacher.schoolMotto();
```
