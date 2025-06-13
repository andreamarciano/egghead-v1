import Navbar from "../comp/Navbar";
import Footer from "../comp/Footer";

function PlaygroundTSX() {
  abstract class Person {
    constructor(protected name: string, private age: number) {}

    abstract introduce(): void;

    sayHi(person: Person): void {
      console.log(`Hi ${person.name}, my name is ${this.name}.`);
    }

    changeName() {
      this.name = "new name"; // ci arrivo con private (all'interno della classe stessa)
    }
  }

  class Student extends Person {
    constructor(
      name: string, // non serve ripetere private
      age: number,
      private favouriteSubject: string
    ) {
      super(name, age); // chiama il costruttore della classe che estende
    }

    introduce(): void {
      console.log(
        `I'm ${this.name} and I'm studying ${this.favouriteSubject}.`
      );
    }

    changeStudentName() {
      this.name = "new student name"; // ci arrivo se è protected
    }
  }

  const student1: Student = new Student("Alice", 22, "Math");
  const student8: Student = new Student("Alice", 22, "Math");

  return (
    <>
      <Navbar />
      <div className="p-2 m-10 h-50 bg-gray-600">
        <h1 className="text-2xl font-bold">This is a testing page</h1>

        <p>somma:</p>
      </div>

      <Footer />
    </>
  );
}

export default PlaygroundTSX;
