/**
 * Assignment 5 - Question 4
 * 
 * Problem Statement:
 * Create a constructor function Car(brand, model).
 * Add a prototype method getDetails() that prints car brand and model.
 * Create two car objects and call this method to show method sharing via prototype.
 */

// Constructor function
function Car(brand, model) {
    this.brand = brand;
    this.model = model;
}

// Add method to the prototype so that all instances share a single copy in memory
Car.prototype.getDetails = function () {
    return `Car Brand: ${this.brand}, Model: ${this.model}`;
};

// Instantiating two car objects
const car1 = new Car("Tesla", "Model 3");
const car2 = new Car("Toyota", "Camry");

// Calling the shared prototype method
console.log(car1.getDetails());
console.log(car2.getDetails());

// Demonstration of method sharing via prototype
console.log("\n--- Prototype Sharing Verification ---");
console.log("Do both instances share the exact same method reference?");
console.log("car1.getDetails === car2.getDetails ->", car1.getDetails === car2.getDetails); // true
console.log("car1's prototype is Car.prototype ->", Object.getPrototypeOf(car1) === Car.prototype); // true
