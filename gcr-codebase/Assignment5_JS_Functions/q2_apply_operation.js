/**
 * Assignment 5 - Question 2
 * 
 * Problem Statement:
 * Create a function applyOperation(numbers, operation) that takes an array 
 * and a callback function.
 * Use it to:
 * - Double each number in [1, 2, 3, 4]
 * - Square each number in [1, 2, 3, 4]
 */

// Higher-order function that applies a callback operation to each array element
function applyOperation(numbers, operation) {
    if (!Array.isArray(numbers)) {
        throw new TypeError("First argument must be an array.");
    }
    if (typeof operation !== "function") {
        throw new TypeError("Second argument must be a function.");
    }

    const result = [];
    for (let i = 0; i < numbers.length; i++) {
        result.push(operation(numbers[i], i, numbers));
    }
    return result;
}

// Callback functions
const doubleNumber = (num) => num * 2;
const squareNumber = (num) => num * num;

// Sample input
const numbers = [1, 2, 3, 4];

// Executing operations
const doubled = applyOperation(numbers, doubleNumber);
const squared = applyOperation(numbers, squareNumber);

// Output results
console.log("Original Array:", numbers);
console.log("Doubled Array: ", doubled); // [2, 4, 6, 8]
console.log("Squared Array: ", squared); // [1, 4, 9, 16]
