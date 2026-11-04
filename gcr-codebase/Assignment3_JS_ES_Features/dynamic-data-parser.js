"use strict";

// Q1: Dynamic Data Parser
// Parses mixed API data, converts types, filters valid vs invalid numeric values,
// and outputs a formatted conversion report.

const apiData = ["25", "true", "false", "NaN", " ", "100px", "3.14", null, undefined];

const validNumbers = [];
const invalidNumbers = [];

console.log("================ DYNAMIC DATA PARSER REPORT ================");
console.log("Index | Original Value | As Number  | As Boolean | As String");
console.log("------------------------------------------------------------");

for (let i = 0; i < apiData.length; i++) {
  const item = apiData[i];

  // Type conversions
  const numVal = Number(item);
  const boolVal = Boolean(item);
  const strVal = String(item);

  // Check if item is genuinely a valid number:
  // - null converts to 0 via Number(null), but is not a valid numeric entry in API data
  // - " " (whitespace) converts to 0 via Number(" "), but is blank
  // - typeof boolean converts to 1/0, but should not count as numeric data
  const isWhitespaceString = typeof item === "string" && item.trim() === "";
  const isNullOrUndefined = item === null || item === undefined;
  const isActuallyNumeric = !isNaN(numVal) && !isWhitespaceString && !isNullOrUndefined && typeof item !== "boolean";

  if (isActuallyNumeric) {
    validNumbers.push(numVal);
  } else {
    invalidNumbers.push({ index: i, raw: item, parsedNumber: numVal });
  }

  // Formatting display strings
  const displayRaw = item === null ? "null" : item === undefined ? "undefined" : `"${item}"`;
  const displayNum = isNaN(numVal) ? "NaN" : numVal;

  console.log(
    `${String(i).padEnd(5)} | ${displayRaw.padEnd(14)} | ${String(displayNum).padEnd(10)} | ${String(boolVal).padEnd(10)} | "${strVal}"`
  );
}

console.log("\n================ SUMMARY ================");
console.log("Valid Numeric Entries   :", validNumbers);
console.log("Total Valid Count       :", validNumbers.length);
console.log("\nInvalid Numeric Entries (Skipped):");
invalidNumbers.forEach((entry) => {
  console.log(`  - Index ${entry.index}: Value '${entry.raw}' parsed as '${entry.parsedNumber}'`);
});
console.log("Total Invalid Count     :", invalidNumbers.length);
