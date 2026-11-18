/**
 * Runner Script for Assignment 8 (JS OOP)
 * Executes all 9 assignment questions in sequence.
 */

const questions = [
    { file: "./q1_student_result_processing.js", title: "Q1: Student Result Processing" },
    { file: "./q2_online_food_ordering.js", title: "Q2: Online Food Ordering" },
    { file: "./q3_product_discount_system.js", title: "Q3: Product Discount System" },
    { file: "./q4_employee_inheritance.js", title: "Q4: Employee Inheritance & Polymorphism" },
    { file: "./q5_ridesharing_application.js", title: "Q5: Ride-Sharing Application" },
    { file: "./q6_ecommerce_inventory_system.js", title: "Q6: E-Commerce Inventory System" },
    { file: "./q7_banking_application.js", title: "Q7: Banking Application & Encapsulation" },
    { file: "./q8_movie_ticket_booking.js", title: "Q8: Movie Ticket Booking & Prototype Chain" },
    { file: "./q9_fitness_app_analytics.js", title: "Q9: Fitness App Analytics" },
];

console.log("\n######################################################################");
console.log("       STARTING EXECUTION OF ASSIGNMENT 8 (JS OOP SOLUTIONS)");
console.log("######################################################################\n");

let passed = 0;

questions.forEach((q, idx) => {
    try {
        console.log(`\n>>>>>>>>>>>>>>>>>> RUNNING [${idx + 1}/9] ${q.title} <<<<<<<<<<<<<<<<<<`);
        require(q.file);
        passed++;
    } catch (err) {
        console.error(`Error running ${q.file}:`, err);
    }
});

console.log("\n######################################################################");
console.log(`   EXECUTION SUMMARY: ${passed} / ${questions.length} QUESTIONS COMPLETED SUCCESSFULLY!`);
console.log("######################################################################\n");
