"use strict";

// Q7: Smart Calculator
// Performs mathematical operations using a switch statement with custom error handling.

const operations = ["add", "divide", "power", "root", "subtract", "modulus"]; // includes an invalid operation
const num1 = 25;
const num2 = 0;

// Custom Error Classes
class InvalidOperationError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidOperationError";
  }
}

class DivisionByZeroError extends Error {
  constructor(message) {
    super(message);
    this.name = "DivisionByZeroError";
  }
}

class NegativeRootError extends Error {
  constructor(message) {
    super(message);
    this.name = "NegativeRootError";
  }
}

function calculate(op, a, b) {
  switch (op.toLowerCase()) {
    case "add":
      return a + b;

    case "subtract":
      return a - b;

    case "multiply":
      return a * b;

    case "divide":
      if (b === 0) {
        throw new DivisionByZeroError(`Cannot divide ${a} by zero.`);
      }
      return a / b;

    case "power":
      return Math.pow(a, b);

    case "root":
      // a is the radicand, b can optionally be the root degree (default square root: 2)
      if (a < 0) {
        throw new NegativeRootError(`Cannot compute real root of negative number: ${a}.`);
      }
      const degree = b === 0 ? 2 : b; // default to square root if degree is 0
      return Math.pow(a, 1 / degree);

    default:
      throw new InvalidOperationError(`Operation '${op}' is not supported by Smart Calculator.`);
  }
}

console.log("================= SMART CALCULATOR SUMMARY =================");
console.log(`Initial Inputs: num1 = ${num1}, num2 = ${num2}\n`);

for (const op of operations) {
  try {
    const result = calculate(op, num1, num2);
    console.log(`[SUCCESS] ${op.padEnd(10)} : ${num1} ${op} ${num2} = ${result}`);
  } catch (err) {
    console.log(`[ERROR]   ${op.padEnd(10)} : [${err.name}] ${err.message}`);
  }
}

// Extra test case: root of negative number
console.log("\n--- Extra Edge Case Test ---");
try {
  calculate("root", -16, 2);
} catch (err) {
  console.log(`[ERROR]   root (-16) : [${err.name}] ${err.message}`);
}
