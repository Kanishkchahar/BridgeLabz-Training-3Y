/**
 * Assignment 5 - Question 1
 * 
 * Problem Statement:
 * Write a function greetUser(name, callback) that prints "Hello <name>" 
 * and then executes a callback function showEndMessage() which prints 
 * "Welcome to the course!".
 * Demonstrate callback flow clearly.
 */

// Callback function to be executed after greeting
function showEndMessage() {
    console.log("Welcome to the course!");
}

// Higher-order function accepting name and callback
function greetUser(name, callback) {
    console.log(`Hello ${name}`);
    
    // Check if callback is a function before executing
    if (typeof callback === "function") {
        callback();
    } else {
        console.error("Error: Provided callback is not a function.");
    }
}

// Demonstration of callback flow:
console.log("--- Executing greetUser with showEndMessage callback ---");
greetUser("Alice", showEndMessage);

console.log("\n--- Executing greetUser with an anonymous inline callback ---");
greetUser("Bob", () => {
    console.log("This is an inline callback marking the end of greeting!");
});
