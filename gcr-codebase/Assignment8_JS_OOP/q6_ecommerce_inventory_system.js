/**
 * Assignment 8 - Question 6: E-Commerce Inventory System
 * 
 * Problem Statement:
 * You have an array of product objects with:
 *   { id, name, category, price, stock }
 * Write functions using array methods:
 *   1. getLowStockProducts() → using filter()
 *   2. sortProductsByPrice() → using sort()
 *   3. calculateTotalInventoryValue() → using reduce()
 *   4. groupByCategory() → using reduce() + object grouping
 * Test using multiple category products.
 */

// Sample Inventory Data across multiple categories
const inventory = [
    { id: 101, name: "Wireless Mouse", category: "Electronics", price: 800, stock: 15 },
    { id: 102, name: "Mechanical Keyboard", category: "Electronics", price: 3200, stock: 3 }, // low stock
    { id: 103, name: "Cotton T-Shirt", category: "Clothing", price: 650, stock: 40 },
    { id: 104, name: "Denim Jeans", category: "Clothing", price: 1800, stock: 4 }, // low stock
    { id: 105, name: "Ceramic Coffee Mug", category: "Home & Kitchen", price: 350, stock: 25 },
    { id: 106, name: "Non-stick Frying Pan", category: "Home & Kitchen", price: 1200, stock: 2 }, // low stock
    { id: 107, name: "JavaScript The Good Parts", category: "Books", price: 900, stock: 8 },
    { id: 108, name: "Clean Code by Robert Martin", category: "Books", price: 1400, stock: 5 }, // low stock threshold <= 5
    { id: 109, name: "Organic Green Tea (Pack)", category: "Groceries", price: 450, stock: 50 },
    { id: 110, name: "Extra Virgin Olive Oil", category: "Groceries", price: 850, stock: 1 } // low stock
];

/**
 * 1. Filters products with stock less than or equal to a given threshold.
 * Uses Array.prototype.filter().
 * 
 * @param {Array<Object>} products
 * @param {number} [threshold=5]
 * @returns {Array<Object>}
 */
function getLowStockProducts(products, threshold = 5) {
    return products.filter((product) => product.stock <= threshold);
}

/**
 * 2. Returns products sorted by price.
 * Uses Array.prototype.sort() (performed on a shallow copy to prevent in-place mutation).
 * 
 * @param {Array<Object>} products
 * @param {boolean} [ascending=true]
 * @returns {Array<Object>}
 */
function sortProductsByPrice(products, ascending = true) {
    return [...products].sort((a, b) => {
        return ascending ? a.price - b.price : b.price - a.price;
    });
}

/**
 * 3. Calculates total value of the entire inventory (price * stock for all items).
 * Uses Array.prototype.reduce().
 * 
 * @param {Array<Object>} products
 * @returns {number} Total monetary value
 */
function calculateTotalInventoryValue(products) {
    return products.reduce((acc, product) => {
        return acc + (product.price * product.stock);
    }, 0);
}

/**
 * 4. Groups products by their category into an object mapping.
 * Uses Array.prototype.reduce() + object grouping.
 * 
 * @param {Array<Object>} products
 * @returns {Record<string, Array<Object>>}
 */
function groupByCategory(products) {
    return products.reduce((accumulator, product) => {
        const category = product.category;
        
        // If category bucket doesn't exist, initialize as empty array
        if (!accumulator[category]) {
            accumulator[category] = [];
        }

        accumulator[category].push(product);
        return accumulator;
    }, {});
}

// ==========================================
// Demonstration / Test Cases
// ==========================================

console.log("==================================================");
console.log("  Q6: E-Commerce Inventory System (Array Methods)");
console.log("==================================================");

// 1. Low stock products (stock <= 5)
console.log("\n1. Low Stock Products (Stock <= 5) [using filter()]:");
const lowStock = getLowStockProducts(inventory, 5);
console.table(lowStock.map(p => ({ ID: p.id, Name: p.name, Category: p.category, Stock: p.stock })));

// 2. Sort by price (Ascending and Descending)
console.log("\n2. Products Sorted By Price (Ascending) [using sort()]:");
const sortedAsc = sortProductsByPrice(inventory, true);
console.table(sortedAsc.map(p => ({ ID: p.id, Name: p.name, Price: `Rs. ${p.price}`, Category: p.category })));

// 3. Total Inventory Value
console.log("\n3. Total Inventory Value [using reduce()]:");
const totalValue = calculateTotalInventoryValue(inventory);
console.log(`Total Value of all stock in warehouse: Rs. ${totalValue.toLocaleString("en-IN")}`);

// 4. Group by Category
console.log("\n4. Group By Category [using reduce() + object grouping]:");
const grouped = groupByCategory(inventory);
for (const [category, items] of Object.entries(grouped)) {
    console.log(`\nCategory: [${category}] (${items.length} items)`);
    items.forEach(item => {
        console.log(`  - ${item.name} | Price: Rs. ${item.price} | Stock: ${item.stock}`);
    });
}

module.exports = {
    inventory,
    getLowStockProducts,
    sortProductsByPrice,
    calculateTotalInventoryValue,
    groupByCategory
};
