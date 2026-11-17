/**
 * Assignment 5 - Question 3
 * 
 * Problem Statement:
 * Create an object user with:
 * - a property name
 * - a method showName written as an arrow function
 * Log the output and explain why this.name is undefined.
 * Then fix it by using a normal function.
 */

// 1. Object with arrow function method
const userWithArrow = {
    name: "Alex Morgan",
    showName: () => {
        // Arrow functions do NOT bind their own 'this'.
        // Instead, they lexically capture 'this' from the enclosing scope.
        // In this case, enclosing scope is global/module scope, where 'this.name' is undefined.
        console.log("Using Arrow Function -> User Name:", this.name);
    }
};

console.log("--- Testing Arrow Function in Object Method ---");
userWithArrow.showName();

/*
 * EXPLANATION:
 * Why is `this.name` undefined in an arrow function?
 * --------------------------------------------------
 * Arrow functions do not have their own execution context or `this` binding.
 * When `showName` is declared as an arrow function inside an object literal,
 * the object literal does NOT create a new local scope. The surrounding lexical scope
 * is the global scope (or module scope in Node.js).
 * Therefore, `this` refers to `global` / `window` / `{}` (empty module object),
 * none of which have a `name` property defined. Thus, `this.name` evaluates to `undefined`.
 */

// 2. Fixed object using a standard function (method definition)
const userWithNormalFunction = {
    name: "Alex Morgan",
    showName() {
        // Standard methods bind 'this' dynamically to the calling object (userWithNormalFunction)
        console.log("Using Normal Function -> User Name:", this.name);
    }
};

console.log("\n--- Testing Fixed Normal Function in Object Method ---");
userWithNormalFunction.showName();
