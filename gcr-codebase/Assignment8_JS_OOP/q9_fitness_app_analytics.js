/**
 * Assignment 8 - Question 9: Fitness App Analytics
 * 
 * Problem Statement:
 * Given user workout data:
 * [
 *   { user: "A", steps: 8000, calories: 300 },
 *   { user: "B", steps: 12000, calories: 500 },
 *   { user: "C", steps: 4000, calories: 200 }
 * ]
 * Create a FitnessAnalytics class with methods:
 *   - getActiveUsers() → users with steps > 7000 using filter()
 *   - getAverageCalories() → using reduce()
 *   - getUserSummary() → using map() to format as messages
 *   - Throw an error if dataset is empty
 * Execute all methods for the above data.
 */

class FitnessAnalytics {
    /**
     * @param {Array<{user: string, steps: number, calories: number}>} dataset
     */
    constructor(dataset) {
        this.dataset = dataset;
        // Validate dataset on initialization
        this.validateDataset();
    }

    /**
     * Helper to validate that the dataset is non-empty and is a valid array.
     * Throws an error if dataset is empty.
     */
    validateDataset() {
        if (!Array.isArray(this.dataset) || this.dataset.length === 0) {
            throw new Error("Dataset is empty or invalid! Cannot perform fitness analytics on an empty dataset.");
        }
    }

    /**
     * Filters and returns active users who logged steps > 7000.
     * Uses Array.prototype.filter().
     * 
     * @param {number} [stepThreshold=7000]
     * @returns {Array<Object>}
     */
    getActiveUsers(stepThreshold = 7000) {
        this.validateDataset();
        return this.dataset.filter((entry) => entry.steps > stepThreshold);
    }

    /**
     * Calculates the average calories burned across all users in the dataset.
     * Uses Array.prototype.reduce().
     * 
     * @returns {number} Average calories (rounded to 2 decimal places)
     */
    getAverageCalories() {
        this.validateDataset();
        const totalCalories = this.dataset.reduce((sum, entry) => sum + entry.calories, 0);
        const average = totalCalories / this.dataset.length;
        return Number(average.toFixed(2));
    }

    /**
     * Formats each user's record into a readable status summary message.
     * Uses Array.prototype.map().
     * 
     * @returns {string[]} Formatted message strings
     */
    getUserSummary() {
        this.validateDataset();
        return this.dataset.map((entry) => {
            const status = entry.steps > 7000 ? "Active Goal Achieved" : "Goal Pending";
            return `User ${entry.user}: Completed ${entry.steps.toLocaleString()} steps | Burned ${entry.calories} kcal [${status}]`;
        });
    }
}

// ==========================================
// Demonstration / Test Cases
// ==========================================

console.log("==================================================");
console.log("  Q9: Fitness App Analytics");
console.log("==================================================");

// Given dataset from the assignment
const workoutData = [
    { user: "A", steps: 8000, calories: 300 },
    { user: "B", steps: 12000, calories: 500 },
    { user: "C", steps: 4000, calories: 200 }
];

console.log("Input Dataset:");
console.table(workoutData);

// 1. Instantiate FitnessAnalytics with valid dataset
console.log("\n--- Executing Methods on Valid Workout Data ---");
const analytics = new FitnessAnalytics(workoutData);

// Method 1: getActiveUsers() using filter()
const activeUsers = analytics.getActiveUsers(7000);
console.log("\n1. Active Users (steps > 7000) [filter()]:");
console.table(activeUsers);

// Method 2: getAverageCalories() using reduce()
const avgCalories = analytics.getAverageCalories();
console.log(`\n2. Average Calories Burned [reduce()]: ${avgCalories} kcal`);

// Method 3: getUserSummary() using map()
const summaries = analytics.getUserSummary();
console.log("\n3. User Summaries [map()]:");
summaries.forEach((msg, idx) => console.log(`   ${idx + 1}. ${msg}`));

// 2. Demonstrate Error Handling when dataset is empty
console.log("\n--- Testing Empty Dataset Error Handling (try/catch) ---");

// Test with empty array []
try {
    console.log("Attempting to initialize FitnessAnalytics with empty array []...");
    const emptyAnalytics = new FitnessAnalytics([]);
    emptyAnalytics.getActiveUsers();
} catch (error) {
    console.error(`✓ Caught Expected Error: ${error.message}`);
}

// Test with null
try {
    console.log("Attempting to initialize FitnessAnalytics with null...");
    const nullAnalytics = new FitnessAnalytics(null);
    nullAnalytics.getAverageCalories();
} catch (error) {
    console.error(`✓ Caught Expected Error: ${error.message}`);
}

module.exports = FitnessAnalytics;
