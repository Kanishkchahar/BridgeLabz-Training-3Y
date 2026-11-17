/**
 * Assignment 5 - Question 5
 * 
 * Problem Statement:
 * Create a Person constructor with property name.
 * Then create a Student constructor that inherits from Person and adds property branch.
 * Add methods to print both name and branch using prototypes.
 * Demonstrate the prototype chain working.
 */

// 1. Parent Constructor
function Person(name) {
    this.name = name;
}

// Parent prototype method
Person.prototype.printName = function () {
    console.log(`Person Name: ${this.name}`);
};

// 2. Child Constructor
function Student(name, branch) {
    // Call parent constructor to initialize 'name' on the student instance
    Person.call(this, name);
    this.branch = branch;
}

// Set up inheritance by creating prototype link
Student.prototype = Object.create(Person.prototype);

// Restore constructor property on Student.prototype
Student.prototype.constructor = Student;

// Child prototype method
Student.prototype.printBranch = function () {
    console.log(`Student Branch: ${this.branch}`);
};

// Also add a composite method showing access to both properties
Student.prototype.getStudentDetails = function () {
    console.log(`Student Details: Name = ${this.name}, Branch = ${this.branch}`);
};

// 3. Testing instance and prototype chain
const student1 = new Student("Rohan Sharma", "Computer Science");

console.log("--- Calling Inherited and Own Prototype Methods ---");
student1.printName();          // Inherited from Person.prototype
student1.printBranch();        // From Student.prototype
student1.getStudentDetails();   // From Student.prototype

console.log("\n--- Prototype Chain Inspection ---");
console.log("student1 instanceof Student:", student1 instanceof Student); // true
console.log("student1 instanceof Person: ", student1 instanceof Person);  // true
console.log("student1 instanceof Object: ", student1 instanceof Object);  // true
console.log("Object.getPrototypeOf(student1) === Student.prototype:", Object.getPrototypeOf(student1) === Student.prototype); // true
console.log("Object.getPrototypeOf(Student.prototype) === Person.prototype:", Object.getPrototypeOf(Student.prototype) === Person.prototype); // true
