/**
 * Assignment 6 - Question 5: Frontend Rush: Avoiding Callback Hell
 * 
 * Problem Statement:
 * Build pipeline includes 5 async stages:
 * design -> build -> test -> deploy -> celebrate
 * Each stage takes 1 second and logs its step.
 * 
 * Tasks:
 * 1. Implement first using nested callbacks (to show callback hell).
 * 2. Rewrite using async/await for cleaner flow.
 * 3. Comment on why async/await improves readability.
 */

// ============================================================================
// PART 1: The Old Way — Callback Hell (Pyramid of Doom)
// ============================================================================
function runCallbackPipeline(finalCallback) {
    console.log("--- Starting Callback Hell Demonstration ---");

    setTimeout(() => {
        console.log("1. Design phase completed (callback)");

        setTimeout(() => {
            console.log("2. Build phase completed (callback)");

            setTimeout(() => {
                console.log("3. Test phase completed (callback)");

                setTimeout(() => {
                    console.log("4. Deploy phase completed (callback)");

                    setTimeout(() => {
                        console.log("5. Celebrate phase completed! 🎉 (callback)");
                        if (typeof finalCallback === "function") finalCallback();
                    }, 500); // Using 500ms for demo speed

                }, 500);
            }, 500);
        }, 500);
    }, 500);
}

// ============================================================================
// PART 2: Modern Way — Async/Await Refactor
// ============================================================================

// Helper promise function for each stage
const delayStage = (stageName, duration = 500) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(stageName);
            resolve();
        }, duration);
    });
};

async function runAsyncAwaitPipeline() {
    console.log("\n--- Starting Modern Async/Await Pipeline ---");
    try {
        await delayStage("1. Design phase completed (async/await)");
        await delayStage("2. Build phase completed (async/await)");
        await delayStage("3. Test phase completed (async/await)");
        await delayStage("4. Deploy phase completed (async/await)");
        await delayStage("5. Celebrate phase completed! 🎉 (async/await)");
        console.log("\nPipeline finished successfully with async/await!");
    } catch (error) {
        console.error("Pipeline encountered an error:", error);
    }
}

// Run Callback Hell first, then trigger Async/Await version
runCallbackPipeline(() => {
    runAsyncAwaitPipeline();
});

/*
 * ============================================================================
 * WHY ASYNC/AWAIT IMPROVES READABILITY:
 * ============================================================================
 * 1. Flattens Code Structure:
 *    Avoids horizontal indentation creep ("Pyramid of Doom"), keeping code flat
 *    and read sequentially top-to-bottom like synchronous code.
 *
 * 2. Simplified Error Handling:
 *    Standard try/catch blocks catch errors anywhere in the chain, eliminating
 *    repetitive `if (err)` checks in every single nested callback.
 *
 * 3. Easier Debugging and Maintenance:
 *    Setting breakpoints, adding intermediate variables, and rearranging steps
 *    is trivial with async/await, whereas refactoring deeply nested callbacks
 *    is error-prone and tedious.
 */
