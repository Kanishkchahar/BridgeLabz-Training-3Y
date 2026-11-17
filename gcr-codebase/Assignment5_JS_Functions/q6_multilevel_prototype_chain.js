/**
 * Assignment 5 - Question 6
 * 
 * Problem Statement:
 * Create a prototype chain using constructor functions:
 * Person -> Faculty -> Professor
 * Each should have its own property and method.
 * Show how a Professor object can access all methods up the chain.
 */

// 1. Level 1: Person (Base)
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.describePerson = function () {
    return `[Person] Name: ${this.name}, Age: ${this.age}`;
};

// 2. Level 2: Faculty (Inherits from Person)
function Faculty(name, age, department) {
    Person.call(this, name, age); // Super call to Person
    this.department = department;
}

Faculty.prototype = Object.create(Person.prototype);
Faculty.prototype.constructor = Faculty;

Faculty.prototype.describeFaculty = function () {
    return `[Faculty] Department: ${this.department}`;
};

// 3. Level 3: Professor (Inherits from Faculty)
function Professor(name, age, department, researchArea) {
    Faculty.call(this, name, age, department); // Super call to Faculty
    this.researchArea = researchArea;
}

Professor.prototype = Object.create(Faculty.prototype);
Professor.prototype.constructor = Professor;

Professor.prototype.describeProfessor = function () {
    return `[Professor] Research Area: ${this.researchArea}`;
};

// Create a Professor instance
const prof = new Professor("Dr. Alan Turing", 41, "Computer Science", "Artificial Intelligence & Cryptography");

console.log("--- Accessing Methods Across the Multi-Level Prototype Chain ---");
// Accessing Professor's own prototype method
console.log(prof.describeProfessor());

// Accessing Faculty's prototype method (1 level up)
console.log(prof.describeFaculty());

// Accessing Person's prototype method (2 levels up)
console.log(prof.describePerson());

// Accessing Object's prototype method (top of prototype chain)
console.log("toString():", prof.toString());

console.log("\n--- Verification of Prototype Inheritance Chain ---");
console.log("prof instanceof Professor:", prof instanceof Professor); // true
console.log("prof instanceof Faculty:  ", prof instanceof Faculty);   // true
console.log("prof instanceof Person:   ", prof instanceof Person);    // true
console.log("prof instanceof Object:   ", prof instanceof Object);    // true
