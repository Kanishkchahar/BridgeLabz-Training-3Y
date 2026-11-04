"use strict";

// Q5: Hoisting Lab - The Sequence Trap
// Demonstrates execution phases, memory allocation during hoisting, and arrow function differences.

// -------------------------------------------------------------
// Part 1: Original Code Analysis & Hoisting Predictions
// -------------------------------------------------------------
/*
Original code sequence:
  console.log(score);
  announce();
  var score = 50;
  function announce() { console.log("Game started"); }
  let status = "ready";
  startGame();
  function startGame() {
    console.log(status);
  }

Memory State during Creation (Hoisting) Phase:
1. `score`: Declared with `var`. Allocated in memory and initialized to `undefined`.
   When `console.log(score)` runs, it outputs `undefined`.
2. `announce`: Function declaration. Entire function body is hoisted into memory.
   Calling `announce()` before its definition succeeds and logs "Game started".
3. `status`: Declared with `let`. Allocated in memory but stays uninitialized in the
   "Temporal Dead Zone" (TDZ) until the line `let status = "ready"` is reached.
4. `startGame`: Function declaration. Entire function body is hoisted.
   When `startGame()` runs after `let status = "ready"`, it accesses `status` which is now "ready".
   (Note: If `startGame()` were invoked BEFORE `let status = "ready"`, it would throw a ReferenceError due to the TDZ).
*/

console.log("=== Running Original Sequence Simulation ===");
console.log("score before assignment:", typeof score !== "undefined" ? score : undefined); // undefined

function announce() {
  console.log("Game started");
}
announce();

var score = 50;
console.log("score after assignment:", score); // 50

let gameStatus = "ready";
function startGame() {
  console.log("gameStatus inside startGame:", gameStatus);
}
startGame();

// -------------------------------------------------------------
// Part 2: Fixed Code (Clean, predictable execution order)
// -------------------------------------------------------------
console.log("\n=== Fixed & Reorganized Version ===");

// 1. Declare all state variables at the top
const fixedScore = 50;
const fixedStatus = "ready";

// 2. Define operational logic
function fixedAnnounce() {
  console.log("Fixed: Game started");
}

function fixedStartGame() {
  console.log("Fixed status:", fixedStatus);
}

// 3. Execute in logical flow
fixedAnnounce();
console.log("Fixed score:", fixedScore);
fixedStartGame();

// -------------------------------------------------------------
// Part 3: Rewrite using Arrow Functions to compare hoisting
// -------------------------------------------------------------
console.log("\n=== Arrow Functions Hoisting Comparison ===");
/*
Arrow functions assigned to `const` or `let` are treated as variable declarations.
They remain in the Temporal Dead Zone until their line of evaluation is reached.
Calling them before their declaration throws: ReferenceError: Cannot access '...' before initialization.
If assigned to `var`, calling them before initialization throws: TypeError: ... is not a function.
*/

const arrowAnnounce = () => {
  console.log("Arrow: Game started");
};

const arrowStartGame = (statusParam) => {
  console.log("Arrow status:", statusParam);
};

const currentScore = 50;
const currentStatus = "ready";

arrowAnnounce();
console.log("Arrow score:", currentScore);
arrowStartGame(currentStatus);
