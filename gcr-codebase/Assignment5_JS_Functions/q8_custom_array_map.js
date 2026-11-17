/**
 * Assignment 5 - Question 8
 * 
 * Problem Statement:
 * Add a custom prototype method myMap() to all arrays that behaves like 
 * the built-in map() function.
 * 
 * Example:
 * [1,2,3].myMap(num => num * 2); // [2,4,6]
 */

// Adding custom myMap to Array.prototype
Array.prototype.myMap = function (callback, thisArg) {
    // Validate that 'this' is not null or undefined
    if (this == null) {
        throw new TypeError("Array.prototype.myMap called on null or undefined");
    }
    // Validate that callback is a function
    if (typeof callback !== "function") {
        throw new TypeError(`${callback} is not a function`);
    }

    // Convert 'this' to an Object/Array
    const array = Object(this);
    const length = array.length >>> 0; // Ensure 32-bit positive integer
    const result = new Array(length);

    // Iterate through elements preserving sparse array behavior
    for (let i = 0; i < length; i++) {
        if (i in array) {
            // Call callback with (currentValue, index, originalArray)
            result[i] = callback.call(thisArg, array[i], i, array);
        }
    }

    return result;
};

// Testing custom myMap implementation
console.log("--- Testing custom Array.prototype.myMap ---");

// Test 1: Doubling numbers
const nums = [1, 2, 3];
const doubled = nums.myMap(num => num * 2);
console.log("[1, 2, 3].myMap(num => num * 2) ->", doubled); // [2, 4, 6]

// Test 2: Using index and array references
const fruits = ["apple", "banana", "cherry"];
const mappedFruits = fruits.myMap((fruit, index) => `${index + 1}. ${fruit.toUpperCase()}`);
console.log("Mapped fruits ->", mappedFruits);

// Test 3: Comparison with native Array.prototype.map
const nativeDoubled = nums.map(num => num * 2);
console.log("Matches native map output? ->", JSON.stringify(doubled) === JSON.stringify(nativeDoubled));
