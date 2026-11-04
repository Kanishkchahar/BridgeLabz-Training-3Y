"use strict";

// Q10: Nested Hoisting and Closures
// Investigates execution contexts, lexical scoping, variable shadowing, and arrow function closure behavior.

// -------------------------------------------------------------
// Part 1: Original Code Execution & Prediction
// -------------------------------------------------------------
/*
Predicted Output:
  undefined
  undefined

Why?
1. When `outer()` is invoked, a new Function Execution Context is created.
   During the creation phase of `outer`:
   - `count` is hoisted to the top of `outer`'s scope and initialized to `undefined`.
   - `inner` function declaration is hoisted completely.
   During execution of `outer`:
   - `console.log(count)` prints `undefined` because assignment (`count = 5`) hasn't executed yet.
   - `count = 5` assigns 5 to `outer`'s `count`.
   - `inner()` is called.

2. When `inner()` is invoked, its OWN Execution Context is pushed to the call stack.
   During the creation phase of `inner`:
   - `var count` declared inside `inner` is hoisted to the top of `inner`'s local scope
     and initialized to `undefined`.
   - This local `count` shadows the outer function's `count` variable.
   During execution of `inner`:
   - `console.log(count)` refers to `inner`'s hoisted local `count`, which is `undefined`!
   - `count = 10` assigns 10 to `inner`'s local `count`.
*/

console.log("=== Original Nested Function Execution ===");

function outer() {
  console.log("outer count before assignment:", count); // logs undefined
  var count = 5;

  function inner() {
    console.log("inner count before assignment:", count); // logs undefined (due to shadowing)
    var count = 10;
  }

  inner();
}

outer();

// -------------------------------------------------------------
// Part 2: Demonstrating Hoisting in Separate Memory Contexts
// -------------------------------------------------------------
/*
Concept:
- Global Context: holds `outer`
- Outer Context: Environment Record has { count: undefined -> 5, inner: func }
- Inner Context: Environment Record has { count: undefined -> 10 }
Because `inner` has its own `var count`, it never reads the parent's `count`.
*/

// -------------------------------------------------------------
// Part 3: Convert Inner Function to Arrow Function
// -------------------------------------------------------------
console.log("\n=== Converted Inner to Arrow Function (No Shadowing) ===");

function outerWithArrow() {
  let count = 5;

  // Arrow function closes over `count` from lexical environment (outerWithArrow)
  const innerArrow = () => {
    // If we do not re-declare `count` inside, it accesses outer `count`
    console.log("innerArrow accessing closed-over count:", count); // logs 5
  };

  innerArrow();
}

outerWithArrow();

// If arrow function uses block-scoped `let`:
console.log("\n=== Arrow Function with Local Block Scoping ===");

function outerArrowLocal() {
  let count = 5;

  const innerArrowLocal = () => {
    // let is NOT hoisted with undefined initialization (TDZ applies).
    // Accessing `count` before `let count = 10` would throw ReferenceError!
    let count = 10; // shadows cleanly without hoisting bugs
    console.log("innerArrowLocal with own let count:", count); // logs 10
  };

  console.log("outer count:", count); // logs 5
  innerArrowLocal();
  console.log("outer count still:", count); // logs 5 (unchanged)
}

outerArrowLocal();

// -------------------------------------------------------------
// Part 4: Debug Session and Call Stack Flow Explanation
// -------------------------------------------------------------
/*
Call Stack Trace in VS Code:
1. Script starts -> Global Execution Context created.
2. `outer()` called -> Pushed to Call Stack: [Global, outer].
   Scope panel shows Local (outer): count = undefined.
3. Execution steps past `var count = 5`: Local (outer): count = 5.
4. `inner()` called -> Pushed to Call Stack: [Global, outer, inner].
   Scope panel now shows:
     - Local (inner): count = undefined
     - Closure (outer): count = 5
5. `inner()` finishes -> Popped from Call Stack: [Global, outer].
6. `outer()` finishes -> Popped from Call Stack: [Global].
*/
