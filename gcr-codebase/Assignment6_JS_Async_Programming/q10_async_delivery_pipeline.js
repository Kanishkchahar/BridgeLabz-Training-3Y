/**
 * Assignment 6 - Question 10: The Final Delivery: Async Pipeline Debugger
 * 
 * Problem Statement:
 * Food delivery simulation app with asynchronous steps:
 * takeOrder -> prepare -> pack -> dispatch -> deliver
 * 
 * Requirements:
 * - Each returns a Promise with a random 1–2s delay and success/failure.
 * - Implement runPipeline() using async/await and try/catch.
 * - Log each step clearly:
 *   Start Pipeline
 *   Step 1: Order taken
 *   Step 2: Food prepared
 *   Step 3: Package ready
 *   Step 4: Out for delivery
 *   Delivery completed!
 * - If any step fails, print "Pipeline failed!".
 * - Add detailed comments explaining async behavior and event loop control flow.
 */

// Helper function to create an async step with simulated delay and chance of failure
function createDeliveryStep(stepName, stepLog, failureChance = 0.1) {
    return function () {
        return new Promise((resolve, reject) => {
            const delay = Math.floor(Math.random() * 1000) + 1000; // 1-2 seconds
            setTimeout(() => {
                if (Math.random() < failureChance) {
                    reject(new Error(`Failed at stage: ${stepName}`));
                } else {
                    console.log(stepLog);
                    resolve(stepName);
                }
            }, delay);
        });
    }
}

// 5 pipeline steps
const takeOrder = createDeliveryStep("takeOrder", "Step 1: Order taken", 0.08);
const prepare   = createDeliveryStep("prepare",   "Step 2: Food prepared", 0.08);
const pack      = createDeliveryStep("pack",      "Step 3: Package ready", 0.08);
const dispatch  = createDeliveryStep("dispatch",  "Step 4: Out for delivery", 0.08);
const deliver   = createDeliveryStep("deliver",   "Delivery completed!", 0.08);

// Async Pipeline Runner
async function runPipeline() {
    console.log("Start Pipeline");
    
    try {
        /*
         * Each `await` pauses execution of `runPipeline` until the Promise settles.
         * The JavaScript thread is NOT blocked; the engine can continue executing
         * other tasks or event loop iterations while awaiting this asynchronous timer.
         */
        await takeOrder();
        await prepare();
        await pack();
        await dispatch();
        await deliver();

        console.log("\n🎉 Order successfully fulfilled from kitchen to doorstep!");
    } catch (error) {
        /*
         * If any step rejects, execution jumps immediately to this catch block.
         * Downstream stages are never executed, preserving pipeline integrity.
         */
        console.error(`\n❌ Error: ${error.message}`);
        console.log("Pipeline failed!");
    }
}

/*
 * ============================================================================
 * ASYNC BEHAVIOR AND EVENT LOOP CONTROL FLOW:
 * ============================================================================
 * 1. Synchronous Initiation:
 *    When `runPipeline()` is called, "Start Pipeline" is logged synchronously.
 * 2. Pausing with `await`:
 *    `await takeOrder()` encounters an unsettled Promise. It suspends execution
 *    of `runPipeline` and yields control back to the event loop.
 * 3. Web API / Timer Execution:
 *    Node.js / Browser Web APIs count down the 1-2 second setTimeout timer.
 * 4. Microtask Resumption:
 *    When the timer completes, the callback executes and resolves the Promise.
 *    The Promise resolution schedules resumption of `runPipeline()` as a microtask.
 * 5. Control Flow Safety:
 *    Using `try/catch` with `async/await` transforms asynchronous error propagation
 *    into clean, predictable structured error handling.
 */

runPipeline();
