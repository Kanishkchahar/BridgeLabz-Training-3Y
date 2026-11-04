"use strict";

// Q6: Pyramid Pattern Generator
// Generates star patterns while exploring loop scoping, `var` vs `let`, and strict mode enforcement.

// -------------------------------------------------------------
// Part 1: Default Pattern Generator using block-scoped `let`
// -------------------------------------------------------------
function generatePattern(rows = 4) {
  console.log(`--- Generating Pattern with let (rows = ${rows}) ---`);
  for (let i = 1; i <= rows; i++) {
    let rowStars = "";
    for (let j = 1; j <= i; j++) {
      rowStars += (j === 1 ? "*" : " *");
    }
    console.log(rowStars);
  }
}

generatePattern(4);

// -------------------------------------------------------------
// Part 2: Controlled by User Input (Default = 5)
// -------------------------------------------------------------
function generateConfigurablePyramid(limit = 5) {
  console.log(`\n--- Configurable Pattern (limit = ${limit}) ---`);
  // Ensure valid positive integer
  const cleanLimit = Math.max(1, parseInt(limit, 10) || 5);
  for (let r = 1; r <= cleanLimit; r++) {
    let line = "";
    for (let c = 1; c <= r; c++) {
      line += (c === 1 ? "*" : " *");
    }
    console.log(line);
  }
}

generateConfigurablePyramid(5);

// -------------------------------------------------------------
// Part 3: Observing `var` vs `let` and Variable Re-use
// -------------------------------------------------------------
/*
Observations on `var` vs `let`:
1. `let` is block-scoped: `i` and `j` exist only within their respective `for` loops.
   After the loop finishes, accessing `i` throws a ReferenceError.
2. `var` is function-scoped (or global):
   If an outer loop uses `var i` and an inner loop accidentally re-uses `var i`,
   the inner loop overwrites the outer loop's counter!
   Example demonstration below:
*/

function demonstrateVarLeakAndReuse() {
  console.log("\n--- Demonstrating var scope leak ---");
  for (var k = 1; k <= 3; k++) {
    // k is scoped to demonstrateVarLeakAndReuse, not this block
  }
  console.log(`k is accessible outside loop because of var! k = ${k}`); // prints 4

  console.log("\n--- Variable Re-use Bug Demonstration with var ---");
  var output = [];
  for (var counter = 1; counter <= 3; counter++) {
    for (var counter = 1; counter <= 2; counter++) {
      // Re-using `var counter` here resets the outer loop's variable!
      // In VS Code debugger, watching `counter` will show it oscillating,
      // creating an infinite or prematurely broken loop if not guarded.
    }
    output.push("Iteration done");
    break; // break to prevent infinite loop caused by variable collision
  }
  console.log("Safely caught variable collision with var:", output);
}

demonstrateVarLeakAndReuse();

// -------------------------------------------------------------
// Part 4: Strict Mode catching undeclared loop variables
// -------------------------------------------------------------
/*
Without "use strict", writing `for (idx = 0; ...)` would silently create
a global variable `idx`.
Under "use strict", missing `let`, `const`, or `var` immediately throws ReferenceError.
*/
try {
  eval("for (undeclaredVar = 0; undeclaredVar < 2; undeclaredVar++) {}");
} catch (err) {
  console.log("\nStrict Mode Caught Undeclared Loop Variable:", err.message);
}
