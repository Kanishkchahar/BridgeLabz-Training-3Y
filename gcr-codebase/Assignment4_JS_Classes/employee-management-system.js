// Q6: Employee Management System (Classes + Object Methods)
// Represents employees, calculates annual compensations, bonuses, and overall company payroll.

class Employee {
  constructor(id, name, department, salary) {
    this.id = id;
    this.name = name;
    this.department = department;
    this.salary = salary; // Monthly base salary
  }

  // Method to calculate annual base salary (monthly * 12)
  getAnnualSalary() {
    return this.salary * 12;
  }

  // Method to calculate and add bonus percentage to current salary
  applyBonus(percent) {
    if (percent > 0) {
      const bonusAmount = (this.salary * percent) / 100;
      this.salary += bonusAmount;
      console.log(`Bonus of ${percent}% applied to ${this.name}. New monthly salary: ₹${this.salary.toLocaleString()}`);
    }
    return this.salary;
  }

  // Formatted details summary
  getEmployeeSummary() {
    return `[ID: ${this.id}] ${this.name.padEnd(14)} | Dept: ${this.department.padEnd(12)} | Monthly: ₹${this.salary.toLocaleString().padEnd(8)} | Annual: ₹${this.getAnnualSalary().toLocaleString()}`;
  }
}

// Create 5 employee objects
const employees = [
  new Employee(1001, "Aarav Gupta", "Engineering", 75000),
  new Employee(1002, "Sneha Patel", "Design", 60000),
  new Employee(1003, "Rohan Iyer", "Marketing", 52000),
  new Employee(1004, "Priya Nair", "HR", 48000),
  new Employee(1005, "Vikram Sen", "Engineering", 90000)
];

console.log("================ INITIAL EMPLOYEE ROSTER ================");
employees.forEach((emp) => console.log(emp.getEmployeeSummary()));

// Apply bonuses to high-performing employees
console.log("\n================ PERFORMANCE BONUSES APPLIED ================");
employees[0].applyBonus(10); // Aarav (Engineering): +10%
employees[4].applyBonus(8);  // Vikram (Engineering): +8%

console.log("\n================ UPDATED ANNUAL COMPENSATION ================");
employees.forEach((emp) => {
  console.log(`Employee: ${emp.name.padEnd(14)} -> Annual Salary: ₹${emp.getAnnualSalary().toLocaleString()}`);
});

// Calculate total annual payout of the company using reduce()
const totalAnnualPayout = employees.reduce((accumulator, currentEmp) => {
  return accumulator + currentEmp.getAnnualSalary();
}, 0);

console.log("\n================ TOTAL COMPANY PAYROLL ================");
console.log(`Total Annual Payout (All 5 Employees): ₹${totalAnnualPayout.toLocaleString()}`);
