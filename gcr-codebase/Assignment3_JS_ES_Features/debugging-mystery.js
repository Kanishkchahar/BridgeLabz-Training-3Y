"use strict";

// Q4: Debugging Mystery
// Investigating strict mode variable declaration and scope resolution.

// -------------------------------------------------------------
// Part 1: Why the original code throws an error
// -------------------------------------------------------------
// In non-strict mode, assigning to an undeclared variable like `greeting = "Welcome"`
// creates an implicit property on the global object (window or global).
// Under "use strict", assigning to an undeclared identifier prevents accidental global
// pollution and immediately throws a ReferenceError: greeting is not defined.

function buggyShowMessage() {
  // greeting = "Welcome"; // <-- Throws ReferenceError in strict mode!
}

try {
  // Uncommenting the below would fail at runtime:
  // greeting = "Welcome";
  eval('greeting = "Welcome";'); // dynamically triggered to catch and log without crashing script
} catch (err) {
  console.log("Observed Error in Strict Mode:", err.name + ": " + err.message);
}

// -------------------------------------------------------------
// Part 2: Fixed implementation with proper scope declaration
// -------------------------------------------------------------
// By explicitly declaring the variable using `let` or `const`, `greeting` is scoped
// strictly to the `showMessage` function block (local execution context).
// It does not leak into the global object.

function showMessage() {
  // Debugger Observation Note:
  // In VS Code:
  // 1. Put a breakpoint on the line below.
  // 2. Add `greeting` to the "Watch" panel: it starts as undefined, then evaluates to "Welcome".
  // 3. Inspect the "Call Stack" panel: it shows `showMessage` sitting on top of `(anonymous function)`.
  // debugger;

  let greeting = "Welcome"; // explicitly declared with local scope
  console.log("Fixed Output:", greeting);
}

showMessage();

// Explanation of Scope Declaration Changes:
// 1. Before: Without declaration, JS looks up the scope chain up to global scope.
//    In strict mode, if not found, it throws ReferenceError instead of creating an implicit global.
// 2. After: `let greeting` binds the variable exclusively inside `showMessage()`.
//    Outside access (e.g. console.log(greeting)) will result in ReferenceError, keeping the global scope clean.
