"use strict";

// Q2: Employee Bonus Calculator
// Calculates bonuses based on experience using strict mode and error handling.

const employees = [
  { name: "Amit", salary: "45000", years: "5" },
  { name: "Sara", salary: "38000", years: "2" },
  { name: "Kiran", salary: "52000", years: "7" },
  // Adding edge cases to demonstrate try...catch handling
  { name: "Vikram", salary: "invalid_sal", years: "4" },
  { name: "Pooja", salary: "40000" } // missing years
];

function processEmployeeBonus(emp) {
  try {
    // Check for missing properties
    if (!emp || typeof emp !== "object") {
      throw new Error("Invalid employee object received");
    }
    if (!emp.name) {
      throw new Error("Missing employee name");
    }
    if (emp.salary === undefined || emp.years === undefined) {
      throw new Error(`Missing required fields for ${emp.name}`);
    }

    // Convert to numbers
    const numSalary = Number(emp.salary);
    const numYears = Number(emp.years);

    // Validate conversion
    if (isNaN(numSalary) || isNaN(numYears)) {
      throw new Error(`Invalid numeric conversion for ${emp.name} (Salary: ${emp.salary}, Years: ${emp.years})`);
    }

    if (numSalary < 0 || numYears < 0) {
      throw new Error(`Negative values not allowed for ${emp.name}`);
    }

    // Calculate bonus: 10% if > 3 years, else 5%
    const bonusRate = numYears > 3 ? 0.1 : 0.05;
    const bonus = numSalary * bonusRate;
    const totalPayout = numSalary + bonus;

    // Output formatted details using template strings
    console.log(`[OK] Employee: ${emp.name.padEnd(8)} | Exp: ${numYears} yrs | Salary: ₹${numSalary.toLocaleString()} | Bonus (${(bonusRate * 100)}%): ₹${bonus.toLocaleString()} | Total: ₹${totalPayout.toLocaleString()}`);

    return { name: emp.name, salary: numSalary, years: numYears, bonus, totalPayout };
  } catch (err) {
    console.log(`[ERROR] Failed processing record (${emp && emp.name ? emp.name : "Unknown"}): ${err.message}`);
    return null;
  }
}

console.log("=== Employee Bonus Calculation Report ===");
for (const emp of employees) {
  processEmployeeBonus(emp);
}
