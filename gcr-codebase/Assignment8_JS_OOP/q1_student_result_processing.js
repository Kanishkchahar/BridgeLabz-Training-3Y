/**
 * Assignment 8 - Question 1: Student Result Processing (reduce + Classes)
 * 
 * Problem Statement:
 * You are given an array of marks of a student.
 * Create a Student class with properties: name and marks[].
 * Add method:
 *   - calculateAverage() using reduce()
 *   - Return grade based on average: A/B/C/F
 * Test the class for 3 students.
 */

class Student {
    /**
     * @param {string} name - The student's name
     * @param {number[]} marks - Array of marks scored by the student
     */
    constructor(name, marks = []) {
        this.name = name;
        this.marks = marks;
    }

    /**
     * Calculates the average of the student's marks using Array.prototype.reduce().
     * @returns {number} Average marks (rounded to 2 decimal places)
     */
    calculateAverage() {
        if (!this.marks || this.marks.length === 0) {
            return 0;
        }

        const sum = this.marks.reduce((acc, curr) => acc + curr, 0);
        const average = sum / this.marks.length;
        return Number(average.toFixed(2));
    }

    /**
     * Determines and returns the grade based on calculated average:
     * - 90 and above : 'A'
     * - 75 to 89.99  : 'B'
     * - 50 to 74.99  : 'C'
     * - Below 50     : 'F'
     * @returns {string} Grade letter (A, B, C, or F)
     */
    getGrade() {
        const avg = this.calculateAverage();

        if (avg >= 90) {
            return 'A';
        } else if (avg >= 75) {
            return 'B';
        } else if (avg >= 50) {
            return 'C';
        } else {
            return 'F';
        }
    }

    /**
     * Returns a formatted summary of the student's results.
     * @returns {string}
     */
    getResultSummary() {
        const avg = this.calculateAverage();
        const grade = this.getGrade();
        return `Student: ${this.name} | Marks: [${this.marks.join(', ')}] | Average: ${avg} | Grade: ${grade}`;
    }
}

// ==========================================
// Test the class for 3 students
// ==========================================

console.log("==================================================");
console.log("  Q1: Student Result Processing (reduce + Classes)");
console.log("==================================================");

// Creating 3 student instances
const student1 = new Student("Aarav Sharma", [95, 92, 88, 96, 90]);  // High scorer (Grade A)
const student2 = new Student("Diya Patel", [78, 82, 70, 75, 80]);      // Good scorer (Grade B)
const student3 = new Student("Rohan Verma", [45, 52, 60, 48, 55]);     // Average scorer (Grade C)
const student4 = new Student("Karan Singh", [30, 42, 25, 38, 45]);     // Struggling scorer (Grade F)

const students = [student1, student2, student3, student4];

students.forEach((student, index) => {
    console.log(`\nTest Case ${index + 1}:`);
    console.log(student.getResultSummary());
});

module.exports = Student;
