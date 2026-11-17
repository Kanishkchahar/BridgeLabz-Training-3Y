/**
 * Assignment 6 - Question 7: The Lazy Loader: Promise Combinator Practice
 * 
 * Problem Statement:
 * Given functions:
 * function loadProfile() { return new Promise(r => setTimeout(() => r("Profile Loaded"), 2000)); }
 * function loadPosts() { return new Promise(r => setTimeout(() => r("Posts Loaded"), 1500)); }
 * function loadMessages() { return new Promise(r => setTimeout(() => r("Messages Loaded"), 1000)); }
 * 
 * Tasks:
 * - Use Promise.allSettled() to handle them together.
 * - Randomly reject one Promise.
 * - Print which modules succeeded or failed.
 * - Calculate total time taken using Date.now() before and after.
 */

function loadProfile() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 33% chance to reject
            if (Math.random() < 0.33) {
                reject(new Error("Network timeout while loading User Profile"));
            } else {
                resolve("Profile Loaded");
            }
        }, 2000);
    });
}

function loadPosts() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.33) {
                reject(new Error("500 Internal Server Error loading User Posts"));
            } else {
                resolve("Posts Loaded");
            }
        }, 1500);
    });
}

function loadMessages() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.33) {
                reject(new Error("Authentication failure while loading Messages"));
            } else {
                resolve("Messages Loaded");
            }
        }, 1000);
    });
}

async function runLazyLoader() {
    console.log("=== Lazy Loader Initiated with Promise.allSettled() ===");
    const startTime = Date.now();

    const modules = [
        { name: "Profile", promise: loadProfile() },
        { name: "Posts", promise: loadPosts() },
        { name: "Messages", promise: loadMessages() }
    ];

    const results = await Promise.allSettled(modules.map(m => m.promise));
    const totalTimeTaken = Date.now() - startTime;

    console.log("\n--- Module Loading Status Summary ---");
    results.forEach((result, index) => {
        const moduleName = modules[index].name;
        if (result.status === "fulfilled") {
            console.log(`✓ [SUCCESS] ${moduleName}: ${result.value}`);
        } else {
            console.log(`❌ [FAILED]  ${moduleName}: ${result.reason.message}`);
        }
    });

    console.log(`\nTotal time taken for all modules to settle: ${(totalTimeTaken / 1000).toFixed(2)} seconds.`);
}

runLazyLoader();
