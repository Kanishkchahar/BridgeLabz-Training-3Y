"use strict";

// Q9: JSON Audit
// Validates raw JSON strings, catches parsing and structural errors, and processes valid records.

const rawData = [
  '{"user":"Alex","age":25}',
  '{"id":2}',
  '{invalid}',
  '{"user":"Mina","age":"22"}',
  '{"user":"Kid","age":15}' // extra record to test under-18 bonus filter
];

const validUsers = [];
const auditErrors = [];

console.log("================= JSON AUDIT REPORT =================");

for (let i = 0; i < rawData.length; i++) {
  const lineNum = i + 1; // representing line / entry number
  const entry = rawData[i];

  // Debugging control flow:
  // Setting a breakpoint here allows watching how valid strings proceed to parsing
  // while malformed strings jump straight to the catch block.
  // debugger;

  try {
    // Task 1: Parse entry using JSON.parse
    let parsed;
    try {
      parsed = JSON.parse(entry);
    } catch (parseErr) {
      throw new Error(`Invalid JSON syntax: "${entry}" (${parseErr.message})`);
    }

    // Task 2: Validate required keys (user, age)
    if (!parsed || typeof parsed !== "object") {
      throw new Error("Payload is not a valid JSON object.");
    }

    if (parsed.user === undefined || parsed.age === undefined) {
      throw new Error(`Missing required fields (expected 'user' and 'age', got: ${Object.keys(parsed).join(", ")})`);
    }

    // Task 5 (Bonus): Convert age to Number and validate
    const parsedAge = Number(parsed.age);
    if (isNaN(parsedAge) || parsedAge < 0) {
      throw new Error(`Invalid age value for user '${parsed.user}': ${parsed.age}`);
    }

    const cleanRecord = {
      user: String(parsed.user).trim(),
      age: parsedAge
    };

    // Task 3: Push valid entry
    validUsers.push(cleanRecord);
    console.log(`[PASS] Line ${lineNum}: Successfully parsed and validated ${cleanRecord.user} (age: ${cleanRecord.age})`);

  } catch (err) {
    // Task 3: Log error with line number
    auditErrors.push({ line: lineNum, error: err.message, raw: entry });
    console.log(`[FAIL] Line ${lineNum}: ${err.message}`);
  }
}

console.log("\n================ AUDIT SUMMARY ================");
console.log("Total Records Processed :", rawData.length);
console.log("Valid Records Extracted :", validUsers.length);
console.log("Errors Logged           :", auditErrors.length);

console.log("\nAll Valid Users:", validUsers);

// Task 5 Bonus: Filter under-18 users (adults only: age >= 18)
const adultUsers = validUsers.filter((u) => u.age >= 18);
console.log("\nAdult Users (Age >= 18):", adultUsers);
