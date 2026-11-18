/**
 * Assignment 8 - Question 4: Employee Inheritance
 * 
 * Problem Statement:
 * Create classes Employee and Manager.
 * - Employee -> properties: name, department
 * - Manager -> inherits Employee and overrides a work() method
 * Create objects and show runtime polymorphism.
 */

/**
 * Base Class: Employee
 */
class Employee {
    /**
     * @param {string} name - Employee full name
     * @param {string} department - Department name
     */
    constructor(name, department) {
        this.name = name;
        this.department = department;
    }

    /**
     * Base work method
     * @returns {string} Description of work performed
     */
    work() {
        return `${this.name} (${this.department}): Completing daily operational tasks and assigned tickets.`;
    }

    /**
     * Returns general info about the employee
     * @returns {string}
     */
    getDetails() {
        return `[Employee] Name: ${this.name}, Department: ${this.department}`;
    }
}

/**
 * Derived Class: Manager
 * Inherits from Employee and overrides work()
 */
class Manager extends Employee {
    /**
     * @param {string} name - Manager full name
     * @param {string} department - Department name
     * @param {number} teamSize - Number of direct reports
     */
    constructor(name, department, teamSize = 5) {
        super(name, department); // Call parent constructor
        this.teamSize = teamSize;
    }

    /**
     * Overridden work method (Polymorphic behavior)
     * @returns {string} Description of manager's work
     */
    work() {
        return `${this.name} (${this.department} Manager): Leading team of ${this.teamSize} members, conducting sprint planning, and aligning project roadmaps.`;
    }

    /**
     * Overridden details method
     * @returns {string}
     */
    getDetails() {
        return `[Manager] Name: ${this.name}, Department: ${this.department}, Team Size: ${this.teamSize}`;
    }
}

// ==========================================
// Demonstration / Test Cases
// ==========================================

console.log("==================================================");
console.log("  Q4: Employee Inheritance & Runtime Polymorphism");
console.log("==================================================");

// 1. Create instances of Employee and Manager
const emp1 = new Employee("Karan Mehra", "Frontend Development");
const emp2 = new Employee("Priya Nair", "Quality Assurance");
const mgr1 = new Manager("Ananya Verma", "Engineering", 12);
const mgr2 = new Manager("Vikram Roy", "Product Management", 6);

// 2. Demonstrate Runtime Polymorphism:
// A single collection holding instances of Employee and Manager subclasses.
// Calling .work() on each item dynamically executes the overridden method
// matching the actual runtime object type without explicit type checking.
const teamMembers = [emp1, mgr1, emp2, mgr2];

console.log("\n--- Demonstrating Runtime Polymorphism through work() calls ---");
teamMembers.forEach((member, index) => {
    console.log(`\nMember ${index + 1}: ${member.getDetails()}`);
    console.log(`Action: ${member.work()}`);
});

console.log("\n--- Polymorphism Verification ---");
console.log(`mgr1 instanceof Manager  : ${mgr1 instanceof Manager}`);   // true
console.log(`mgr1 instanceof Employee : ${mgr1 instanceof Employee}`);  // true (Inheritance)
console.log(`emp1 instanceof Manager  : ${emp1 instanceof Manager}`);   // false

module.exports = { Employee, Manager };
