"use strict";

// Q3: Transaction Validator
// Validates an array of transaction objects and categorizes valid vs invalid entries using custom errors.

const transactions = [
  { id: 1, amount: 2000 },
  { id: 2, amount: -500 },
  { id: 3 },
  null
];

const validTransactions = [];
const invalidTransactions = [];

// Custom error classes
class NullTransactionError extends Error {
  constructor(message) {
    super(message);
    this.name = "NullTransactionError";
  }
}

class MissingFieldError extends Error {
  constructor(message) {
    super(message);
    this.name = "MissingFieldError";
  }
}

class NegativeAmountError extends Error {
  constructor(message) {
    super(message);
    this.name = "NegativeAmountError";
  }
}

function validateTransaction(txn, index) {
  // Debugger breakpoint: pause execution here in VS Code / browser DevTools
  // to inspect the current state of `txn`, `index`, and array lengths.
  // debugger;

  if (txn === null || txn === undefined) {
    throw new NullTransactionError(`Transaction at index ${index} is null or undefined.`);
  }

  if (txn.id === undefined || txn.amount === undefined) {
    throw new MissingFieldError(`Transaction at index ${index} is missing id or amount: ${JSON.stringify(txn)}`);
  }

  if (typeof txn.amount !== "number" || isNaN(txn.amount)) {
    throw new MissingFieldError(`Transaction ID ${txn.id} has a non-numeric amount.`);
  }

  if (txn.amount < 0) {
    throw new NegativeAmountError(`Transaction ID ${txn.id} has negative amount (${txn.amount}).`);
  }

  return txn;
}

console.log("Starting Transaction Validation...\n");

for (let i = 0; i < transactions.length; i++) {
  try {
    const validTxn = validateTransaction(transactions[i], i);
    validTransactions.push(validTxn);
    console.log(`[PASS] Transaction #${validTxn.id} verified with amount ₹${validTxn.amount}`);
  } catch (err) {
    invalidTransactions.push({
      index: i,
      raw: transactions[i],
      errorType: err.name,
      message: err.message
    });
    console.log(`[FAIL] ${err.name}: ${err.message}`);
  }
}

console.log("\n================ TRANSACTION REPORT ================");
console.log(`Total Processed : ${transactions.length}`);
console.log(`Successful      : ${validTransactions.length}`);
console.log(`Failed          : ${invalidTransactions.length}`);
console.log("----------------------------------------------------");
console.log("Valid Transactions:", validTransactions);
console.log("Invalid Transactions Summary:");
invalidTransactions.forEach((item) => {
  console.log(`  - [${item.errorType}] Index ${item.index}: ${item.message}`);
});
