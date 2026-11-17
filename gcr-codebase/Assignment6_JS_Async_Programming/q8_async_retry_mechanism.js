/**
 * Assignment 6 - Question 8: Order Processing Flow: Async Retry Mechanism
 * 
 * Problem Statement:
 * Your order submission API often fails randomly. Implement a retry system 
 * that attempts multiple times before giving up.
 * 
 * Tasks:
 * - Create submitOrder() returning a Promise that fails 50% of the time.
 * - Create an async function processOrder() that:
 *   - Tries up to 3 times using a loop + await.
 *   - Logs "Attempt X: Success" or "Attempt X: Failed".
 *   - Throws "Order could not be processed" if all fail.
 * - Use try/catch to handle final failure gracefully.
 */

// Simulated API that fails 50% of the time
function submitOrder() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const isSuccess = Math.random() >= 0.5; // 50% chance
            if (isSuccess) {
                resolve({ orderId: "ORD-" + Math.floor(100000 + Math.random() * 900000), status: "CONFIRMED" });
            } else {
                reject(new Error("Gateway Timeout (504)"));
            }
        }, 500);
    });
}

// Async retry coordinator
async function processOrder(maxAttempts = 3) {
    console.log(`=== Processing Order (Max ${maxAttempts} Attempts) ===`);

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            console.log(`Submitting order... (Attempt ${attempt}/${maxAttempts})`);
            const orderResult = await submitOrder();
            console.log(`Attempt ${attempt}: Success! Order ID: ${orderResult.orderId}`);
            return orderResult; // Successfully completed, return result
        } catch (error) {
            console.log(`Attempt ${attempt}: Failed (${error.message})`);
            if (attempt === maxAttempts) {
                throw new Error("Order could not be processed");
            }
            // Small pause before next retry
            await new Promise((r) => setTimeout(r, 400));
        }
    }
}

// Runner with graceful try/catch error handling
async function runOrderSystem() {
    try {
        const receipt = await processOrder(3);
        console.log("\n🎉 Final Outcome: Order processed successfully!", receipt);
    } catch (finalError) {
        console.error("\n❌ Final Outcome:", finalError.message);
        console.log("Customer service notified. Please try again later.");
    }
}

runOrderSystem();
