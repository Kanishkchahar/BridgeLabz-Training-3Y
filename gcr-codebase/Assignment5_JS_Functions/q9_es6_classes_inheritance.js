/**
 * Assignment 5 - Question 9
 * 
 * Problem Statement:
 * Rewrite your Person -> Student inheritance example using ES6 classes 
 * with `extends` and `super()`.
 * Show that both class and prototype versions behave the same.
 */

// ==========================================
// 1. ES6 Class Implementation
// ==========================================
class PersonClass {
    constructor(name) {
        this.name = name;
    }

    printName() {
        return `Person Name: ${this.name}`;
    }
}

class StudentClass extends PersonClass {
    constructor(name, branch) {
        // super() invokes the parent class constructor (PersonClass)
        super(name);
        this.branch = branch;
    }

    printBranch() {
        return `Student Branch: ${this.branch}`;
    }

    getStudentDetails() {
        return `Student Details: Name = ${this.name}, Branch = ${this.branch}`;
    }
}

// ==========================================
// 2. Prototype / Constructor Function Implementation (from Q5)
// ==========================================
function PersonProto(name) {
    this.name = name;
}
PersonProto.prototype.printName = function () {
    return `Person Name: ${this.name}`;
};

function StudentProto(name, branch) {
    PersonProto.call(this, name);
    this.branch = branch;
}
StudentProto.prototype = Object.create(PersonProto.prototype);
StudentProto.prototype.constructor = StudentProto;
StudentProto.prototype.printBranch = function () {
    return `Student Branch: ${this.branch}`;
};
StudentProto.prototype.getStudentDetails = function () {
    return `Student Details: Name = ${this.name}, Branch = ${this.branch}`;
};

// ==========================================
// 3. Testing and Comparison
// ==========================================
const classStudent = new StudentClass("Priya Verma", "Electrical Engineering");
const protoStudent = new StudentProto("Priya Verma", "Electrical Engineering");

console.log("--- ES6 Class Output ---");
console.log(classStudent.printName());
console.log(classStudent.printBranch());
console.log(classStudent.getStudentDetails());

console.log("\n--- Prototype Chain Output ---");
console.log(protoStudent.printName());
console.log(protoStudent.printBranch());
console.log(protoStudent.getStudentDetails());

console.log("\n--- Comparison & Equivalence Verification ---");
console.log("printName outputs match?        ->", classStudent.printName() === protoStudent.printName());
console.log("printBranch outputs match?      ->", classStudent.printBranch() === protoStudent.printBranch());
console.log("getStudentDetails match?        ->", classStudent.getStudentDetails() === protoStudent.getStudentDetails());

console.log("classStudent instanceof PersonClass:  ", classStudent instanceof PersonClass);
console.log("protoStudent instanceof PersonProto:  ", protoStudent instanceof PersonProto);
console.log("classStudent instanceof StudentClass: ", classStudent instanceof StudentClass);
console.log("protoStudent instanceof StudentProto: ", protoStudent instanceof StudentProto);

/*
 * Note: ES6 classes are syntactic sugar over JavaScript's existing prototype-based
 * inheritance. Under the hood, JavaScript creates prototype objects and links them
 * exactly like `Object.create(Parent.prototype)`.
 */
