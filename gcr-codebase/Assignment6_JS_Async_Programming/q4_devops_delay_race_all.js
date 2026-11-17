/**
 * Assignment 6 - Question 4: DevOps Delay: Async Timeout Race
 * 
 * Problem Statement:
 * Two deployment servers respond at different times:
 * - Server A responds in 2 seconds.
 * - Server B responds in 3 seconds.
 * 
 * Requirements:
 * - Use Promise.all() to show: "Deployment completed for all servers".
 * - Use Promise.race() to show: "Fastest response:" for whichever server finishes first.
 * - Simulate random failure using Math.random() and handle with .catch().
 */

// Deployment function for Server A
function deployServerA() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.15) {
                reject(new Error("Server A encountered a container crash during deployment."));
            } else {
                resolve({ server: "Server A (us-east-1)", durationMs: 2000, status: "Healthy" });
            }
        }, 2000);
    });
}

// Deployment function for Server B
function deployServerB() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.15) {
                reject(new Error("Server B failed SSH handshake during deployment."));
            } else {
                resolve({ server: "Server B (eu-central-1)", durationMs: 3000, status: "Healthy" });
            }
        }, 3000);
    });
}

console.log("=== Starting DevOps Deployment Monitoring ===");

// 1. Promise.race() to determine the fastest responder
Promise.race([deployServerA(), deployServerB()])
    .then((fastest) => {
        console.log(`⚡ Fastest response: ${fastest.server} finished in ${fastest.durationMs / 1000}s!`);
    })
    .catch((error) => {
        console.error("❌ Race condition failure:", error.message);
    });

// 2. Promise.all() to wait for all servers to complete deployment
Promise.all([deployServerA(), deployServerB()])
    .then((results) => {
        console.log("\n🚀 Deployment completed for all servers:");
        results.forEach((res) => console.log(`   - ${res.server} is up and running.`));
    })
    .catch((error) => {
        console.error("\n❌ Promise.all deployment failed:", error.message);
    });
