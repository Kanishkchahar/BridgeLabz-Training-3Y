/**
 * Assignment 6 - Question 1: The Startup Morning: Async Coffee Maker
 * 
 * Problem Statement:
 * Automate coffee preparation involving three async steps:
 * 1. Boiling water
 * 2. Brewing coffee
 * 3. Pouring into a cup
 * 
 * Requirements:
 * - Each step returns a Promise resolving after 1–2 seconds.
 * - Use Promise chaining (.then()) to simulate process.
 * - Print logs for each step and finally "Coffee ready for the team!".
 * - Use .catch() to handle failure (random failure using Math.random()).
 */

// Step 1: Boil Water
function boilWater() {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * 1000) + 1000; // 1-2 seconds
        console.log("Step 1: Boiling water started...");

        setTimeout(() => {
            // 15% random failure probability
            if (Math.random() < 0.15) {
                reject(new Error("Water kettle failed to boil water!"));
            } else {
                console.log("✓ Water boiled successfully.");
                resolve("Hot Boiled Water");
            }
        }, delay);
    });
}

// Step 2: Brew Coffee
function brewCoffee(water) {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * 1000) + 1000;
        console.log(`Step 2: Brewing coffee using ${water}...`);

        setTimeout(() => {
            if (Math.random() < 0.15) {
                reject(new Error("Coffee machine grinder jammed during brewing!"));
            } else {
                console.log("✓ Coffee brewed perfectly.");
                resolve("Rich Espresso Brew");
            }
        }, delay);
    });
}

// Step 3: Pour into Cup
function pourInCup(coffee) {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * 1000) + 1000;
        console.log(`Step 3: Pouring ${coffee} into the team's coffee mug...`);

        setTimeout(() => {
            if (Math.random() < 0.15) {
                reject(new Error("Spilled while pouring into the cup!"));
            } else {
                console.log("✓ Coffee poured smoothly into the mug.");
                resolve("Poured Coffee");
            }
        }, delay);
    });
}

// Promise Chaining Execution
console.log("=== Starting Async Coffee Maker Process ===");
boilWater()
    .then((water) => brewCoffee(water))
    .then((coffee) => pourInCup(coffee))
    .then(() => {
        console.log("\n==========================================");
        console.log("☕ Coffee ready for the team!");
        console.log("==========================================");
    })
    .catch((error) => {
        console.error("\n❌ Coffee Maker Error:", error.message);
        console.log("Process aborted. Please restart the coffee machine.");
    });
