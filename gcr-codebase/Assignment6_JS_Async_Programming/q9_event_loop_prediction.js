/**
 * Assignment 6 - Question 9: Debugging the Event Loop
 * 
 * Problem Statement:
 * You’re analyzing async behavior in JavaScript and want to confirm how microtasks 
 * and macrotasks execute.
 * 
 * Code snippet:
 * console.log("Script start");
 * setTimeout(() => console.log("Timeout callback"), 0);
 * Promise.resolve().then(() => console.log("Promise callback"));
 * console.log("Script end");
 * 
 * Tasks:
 * - Before running, write your predicted output order in comments.
 * - Then execute and compare actual results.
 * - Explain why Promises (microtasks) execute before setTimeout (macrotasks).
 */

/*
 * ============================================================================
 * PREDICTED OUTPUT ORDER (Written prior to execution):
 * ============================================================================
 * 1. Script start
 * 2. Script end
 * 3. Promise callback
 * 4. Timeout callback
 * ============================================================================
 */

console.log("=== Actual Execution Starts ===");

console.log("Script start");

setTimeout(() => {
    console.log("Timeout callback");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise callback");
});

console.log("Script end");

/*
 * ============================================================================
 * COMPARISON & IN-DEPTH EXPLANATION:
 * ============================================================================
 * 
 * 1. Step-by-Step Execution:
 *    a. `console.log("Script start")` is synchronous -> executes immediately on Call Stack.
 *    b. `setTimeout(..., 0)` registers a timer with the host environment (Web API / libuv).
 *       Upon expiry (0ms), its callback is placed into the MACROTASK QUEUE (Task Queue).
 *    c. `Promise.resolve().then(...)` resolves immediately; its callback is pushed directly
 *       into the MICROTASK QUEUE.
 *    d. `console.log("Script end")` is synchronous -> executes immediately on Call Stack.
 * 
 * 2. Event Loop Control Flow:
 *    - The Call Stack is now empty.
 *    - The Event Loop specification mandates that the Microtask Queue MUST be drained
 *      completely before ANY macrotask callback is processed.
 *    - Therefore, `Promise callback` is dequeued and executed first.
 *    - Once all microtasks are exhausted, the Event Loop takes the oldest macrotask,
 *      so `Timeout callback` executes last.
 * 
 * 3. Actual vs Predicted:
 *    The actual output matches the predicted order precisely!
 */
