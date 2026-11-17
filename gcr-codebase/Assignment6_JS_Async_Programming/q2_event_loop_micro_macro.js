/**
 * Assignment 6 - Question 2: Task Scheduler: Micro vs Macro Challenge
 * 
 * Problem Statement:
 * Visualize how the JavaScript Event Loop prioritizes tasks:
 * - Log "Start".
 * - Add one setTimeout() callback (macrotask).
 * - Add one resolved Promise.then() callback (microtask).
 * - Add one synchronous log.
 * - Log "End".
 * - Explain (in comments) why microtasks run before macrotasks.
 */

console.log("Start");

// Macrotask (Task Queue)
setTimeout(() => {
    console.log("setTimeout callback (Macrotask)");
}, 0);

// Microtask (Microtask Queue)
Promise.resolve().then(() => {
    console.log("Promise.then callback (Microtask)");
});

// Synchronous log
console.log("Synchronous middle log");

console.log("End");

/*
 * =========================================================================
 * EXECUTION ORDER EXPLANATION:
 * =========================================================================
 * Expected Output:
 * 1. Start
 * 2. Synchronous middle log
 * 3. End
 * 4. Promise.then callback (Microtask)
 * 5. setTimeout callback (Macrotask)
 *
 * WHY MICROTASKS RUN BEFORE MACROTASKS:
 * -------------------------------------
 * 1. Call Stack Execution:
 *    The JavaScript engine (single-threaded) first executes all synchronous code
 *    on the Call Stack from top to bottom ("Start", "Synchronous middle log", "End").
 *
 * 2. Asynchronous Queues:
 *    - `setTimeout(..., 0)` schedules its callback into the Macrotask Queue (Task Queue).
 *    - `Promise.resolve().then(...)` schedules its callback into the Microtask Queue.
 *
 * 3. Event Loop Priority:
 *    - At the end of every execution turn (as soon as the Call Stack becomes empty),
 *      the Event Loop checks the Microtask Queue BEFORE touching any Macrotask.
 *    - The Event Loop completely drains the Microtask Queue (including any new microtasks
 *      queued during microtask execution).
 *    - Only when the Microtask Queue is completely empty does the Event Loop pick
 *      the oldest task from the Macrotask Queue and push it onto the Call Stack.
 *
 * Therefore, microtasks consistently execute before macrotasks.
 */
