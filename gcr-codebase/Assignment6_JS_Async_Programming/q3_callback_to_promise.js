/**
 * Assignment 6 - Question 3: Bug Tracker: Callback to Promise Migration
 * 
 * Problem Statement:
 * Original function:
 * function fetchBugs(callback) {
 *     setTimeout(() => callback(["UI glitch", "API timeout", "Login failure"]), 1000);
 * }
 * 
 * Tasks:
 * - Convert it into a Promise-based version named getBugs().
 * - Log all bugs neatly using console.table().
 * - Simulate random API failure using a boolean and handle it using .catch().
 */

// Modern Promise-based version of the bug fetcher
function getBugs() {
    return new Promise((resolve, reject) => {
        console.log("Fetching bugs from QA bug tracker API...");

        setTimeout(() => {
            // Simulate random API failure using a boolean condition
            const isApiHealthy = Math.random() > 0.3; // 70% success, 30% failure

            if (isApiHealthy) {
                const bugs = [
                    { id: 101, title: "UI glitch", severity: "Low", status: "Open" },
                    { id: 102, title: "API timeout", severity: "High", status: "In Progress" },
                    { id: 103, title: "Login failure", severity: "Critical", status: "Open" }
                ];
                resolve(bugs);
            } else {
                reject(new Error("503 Service Unavailable: QA Bug Tracker Database is down."));
            }
        }, 1000);
    });
}

// Consuming the Promise with .then() and .catch()
console.log("=== Bug Tracker Request Initiated ===");

getBugs()
    .then((bugs) => {
        console.log("\n✓ Bugs retrieved successfully! Displaying tabular data:");
        console.table(bugs);
    })
    .catch((error) => {
        console.error("\n❌ Bug Tracker Error:", error.message);
        console.log("Please check your network connection or verify QA server health.");
    });
