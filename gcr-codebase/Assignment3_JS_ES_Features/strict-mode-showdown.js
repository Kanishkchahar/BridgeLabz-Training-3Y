// Q8: Strict Mode Showdown
// Compares execution differences between sloppy mode and strict mode.

// -------------------------------------------------------------
// Part 1 & 2: Execution in Sloppy (Non-Strict) Mode
// -------------------------------------------------------------
console.log("=== 1. Non-Strict Mode (Sloppy Mode) Execution ===");

// Exact code from prompt:
function demo(a, a) {
  total = 10;        // creates implicit global property
  delete total;      // in sloppy mode, unqualified delete of implicit global returns true
}

demo(5, 10);
console.log("Sloppy mode executed demo(5, 10) without any errors!");
console.log("Is total still defined globally?", typeof total !== "undefined");

// -------------------------------------------------------------
// Part 2 & 3: What Happens in Strict Mode and Why
// -------------------------------------------------------------
console.log("\n=== 2. Strict Mode Violations & Behavior ===");

/*
Violation 1: Duplicate parameter names `function demo(a, a)`
- In strict mode, function parameters must be unique identifiers.
- Why illegal: Having duplicate names creates silent bugs where earlier arguments are shadowed
  and unreachable by name. Strict mode throws:
  SyntaxError: Duplicate parameter name not allowed in this context.

Violation 2: Implicit global variable assignment `total = 10`
- Without declaration, strict mode forbids attaching undeclared variables to the global scope.
- Why illegal: Prevents accidental global namespace contamination and hard-to-track side effects.
  Strict mode throws:
  ReferenceError: total is not defined.

Violation 3: `delete total` on an unqualified identifier
- In JavaScript, `delete` is meant only for configurable object properties (e.g. `delete obj.prop`).
- Why illegal: Deleting a raw variable name is ambiguous and meaningless for lexical bindings.
  Strict mode throws:
  SyntaxError: Delete of an unqualified identifier in strict mode.
*/

// Dynamically testing strict mode violations safely:
function testStrictModeViolation(codeSnippet, description) {
  try {
    eval(`"use strict"; ${codeSnippet}`);
    console.log(`[PASS] ${description}`);
  } catch (err) {
    console.log(`[CAUGHT ERROR] ${description}`);
    console.log(`  -> ${err.name}: ${err.message}`);
  }
}

testStrictModeViolation("function demo(a, a) {}", "Duplicate parameters: function demo(a, a)");
testStrictModeViolation("total = 10;", "Assigning to undeclared variable: total = 10");
testStrictModeViolation("var total = 10; delete total;", "Deleting unqualified variable identifier: delete total");

// -------------------------------------------------------------
// Part 4: Correct Version Using ES6 Rules
// -------------------------------------------------------------
console.log("\n=== 3. Clean ES6 Version ===");

function cleanDemo(firstNum, secondNum) {
  "use strict";

  // 1. Unique parameter names
  // 2. Explicit variable declaration with let
  let total = 10;

  // 3. Proper object for properties if dynamic deletion is required
  const state = { total };
  console.log("State before deletion:", state);
  delete state.total;
  console.log("State after deletion:", state);

  return firstNum + secondNum;
}

const cleanOutput = cleanDemo(5, 10);
console.log("Clean ES6 demo returned:", cleanOutput);
