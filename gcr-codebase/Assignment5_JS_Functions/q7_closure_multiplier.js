/**
 * Assignment 5 - Question 7
 * 
 * Problem Statement:
 * Write a function makeMultiplier(multiplier) that returns another function 
 * to multiply any number by that multiplier.
 * 
 * Example:
 * const triple = makeMultiplier(3);
 * console.log(triple(5)); // 15
 * 
 * Explain how closure works in this example.
 */

// Higher-order function demonstrating closure
function makeMultiplier(multiplier) {
    // The returned inner function remembers and has access to 'multiplier'
    // from its lexical environment even after makeMultiplier has finished execution.
    return function (number) {
        return number * multiplier;
    };
}

// Demonstrating with examples
const double = makeMultiplier(2);
const triple = makeMultiplier(3);
const tenX = makeMultiplier(10);

console.log("double(5) ->", double(5)); // 10
console.log("triple(5) ->", triple(5)); // 15
console.log("tenX(7)   ->", tenX(7));   // 70

/*
 * HOW CLOSURE WORKS IN THIS EXAMPLE:
 * -----------------------------------
 * 1. Execution of makeMultiplier(3):
 *    - When `makeMultiplier(3)` is invoked, an execution context is created.
 *    - The parameter `multiplier` is stored in the local scope with the value 3.
 *    - It returns the inner function `function(number) { return number * multiplier; }`.
 *    - Once makeMultiplier returns, its execution context is popped off the call stack.
 * 
 * 2. Closure Formation:
 *    - In JavaScript, functions bundle together with their surrounding lexical environment.
 *    - The returned inner function maintains a hidden reference (`[[Scopes]]`) to the 
 *      scope where it was born. This persistent lexical environment reference is the CLOSURE.
 * 
 * 3. Invocation of triple(5):
 *    - When `triple(5)` is called later, `number` is 5.
 *    - JavaScript resolves `multiplier` by inspecting the closure scope, where `multiplier === 3`.
 *    - It computes 5 * 3 and returns 15.
 */
