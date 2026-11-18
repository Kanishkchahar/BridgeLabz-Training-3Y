/**
 * Assignment 8 - Question 2: Online Food Ordering (map + Error Handling)
 * 
 * Problem Statement:
 * You have an array of menu items with prices.
 * Write a function calculateBill(orderItems) that:
 *   - Uses map() to get price list
 *   - Uses reduce() to calculate the total
 *   - Throws an error if an invalid item is ordered
 *   - Use try-catch to show meaningful messages
 */

// Available restaurant menu items with prices
const menu = [
    { name: "Burger", price: 150 },
    { name: "Pizza", price: 350 },
    { name: "Pasta", price: 250 },
    { name: "French Fries", price: 90 },
    { name: "Cold Drink", price: 60 },
    { name: "Garlic Bread", price: 120 }
];

/**
 * Calculates the total bill for a list of ordered item names.
 * Throws an Error if any ordered item is not found in the menu.
 * 
 * @param {string[]} orderItems - Array of item names ordered
 * @param {Array<{name: string, price: number}>} currentMenu - Available menu list
 * @returns {number} The total bill amount
 */
function calculateBill(orderItems, currentMenu = menu) {
    if (!Array.isArray(orderItems) || orderItems.length === 0) {
        throw new Error("Order cannot be empty. Please select at least one item.");
    }

    // 1. Uses map() to get price list while validating each item
    const priceList = orderItems.map((orderedItemName) => {
        // Search item case-insensitively for better usability
        const menuItem = currentMenu.find(
            (item) => item.name.toLowerCase() === String(orderedItemName).trim().toLowerCase()
        );

        if (!menuItem) {
            // Throws an error if an invalid item is ordered
            throw new Error(`Invalid item: "${orderedItemName}" is not available on the menu.`);
        }

        return menuItem.price;
    });

    // 2. Uses reduce() to calculate the total
    const total = priceList.reduce((acc, price) => acc + price, 0);

    return total;
}

/**
 * Helper function to place an order wrapped with try-catch
 * to show meaningful, user-friendly messages.
 * 
 * @param {string} customerName
 * @param {string[]} orderItems
 */
function placeOrder(customerName, orderItems) {
    console.log(`\nProcessing order for: ${customerName}`);
    console.log(`Items: [${orderItems.join(", ")}]`);

    try {
        const totalAmount = calculateBill(orderItems, menu);
        console.log(`✓ Order placed successfully!`);
        console.log(`✓ Total Bill Amount: Rs. ${totalAmount}`);
    } catch (error) {
        // Use try-catch to show meaningful messages
        console.error(`✗ Order Failed: ${error.message}`);
    }
}

// ==========================================
// Demonstration / Test Cases
// ==========================================

console.log("==================================================");
console.log("  Q2: Online Food Ordering (map + Error Handling)");
console.log("==================================================");
console.log("Current Menu:");
menu.forEach(item => console.log(`  - ${item.name}: Rs. ${item.price}`));

// Test 1: Valid Order with multiple items
placeOrder("Aarav", ["Burger", "French Fries", "Cold Drink"]);

// Test 2: Valid Order with different items
placeOrder("Pooja", ["Pizza", "Garlic Bread"]);

// Test 3: Invalid Order with an item not present in the menu
placeOrder("Rohan", ["Pizza", "Sushi", "Coke"]);

// Test 4: Invalid Order with empty order list
placeOrder("Sneha", []);

module.exports = { menu, calculateBill, placeOrder };
