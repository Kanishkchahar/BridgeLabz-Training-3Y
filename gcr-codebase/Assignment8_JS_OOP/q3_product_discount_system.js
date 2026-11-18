/**
 * Assignment 8 - Question 3: Product Discount System
 * 
 * Problem Statement:
 * Create a Product constructor function with:
 *   - name
 *   - price
 * Add a prototype method applyDiscount(percent) that returns new price.
 * Now create 3 products and apply different discounts.
 * Show how abstraction helps simplify operations.
 */

/**
 * Product Constructor Function
 * @param {string} name - Name of the product
 * @param {number} price - Original base price of the product
 */
function Product(name, price) {
    if (typeof price !== "number" || price < 0) {
        throw new Error("Price must be a valid positive number.");
    }
    this.name = name;
    this.price = price;
}

/**
 * Prototype method to apply a discount percentage.
 * 
 * Abstraction in action:
 * - Hides the calculation formula: originalPrice - (originalPrice * percent / 100)
 * - Validates input percent
 * - Formats precision to 2 decimal places
 * - The caller simply asks for the discounted price without knowing the internal mechanics.
 * 
 * @param {number} percent - Discount percentage (0 - 100)
 * @returns {number} The new discounted price
 */
Product.prototype.applyDiscount = function (percent) {
    if (typeof percent !== "number" || percent < 0 || percent > 100) {
        throw new Error(`Invalid discount percentage: ${percent}%. Must be between 0 and 100.`);
    }

    const discountAmount = (this.price * percent) / 100;
    const discountedPrice = this.price - discountAmount;
    return Number(discountedPrice.toFixed(2));
};

/**
 * Prototype method to get product details including original price.
 * @returns {string}
 */
Product.prototype.getDetails = function () {
    return `${this.name} | Original Price: Rs. ${this.price.toFixed(2)}`;
};

// ==========================================
// Demonstration / Test Cases
// ==========================================

console.log("==================================================");
console.log("  Q3: Product Discount System (Prototypes & Abstraction)");
console.log("==================================================");

// 1. Create 3 products
const product1 = new Product("Gaming Laptop", 85000);
const product2 = new Product("Wireless Headphones", 4500);
const product3 = new Product("Mechanical Keyboard", 3200);

const testDiscounts = [
    { product: product1, discount: 15 }, // 15% off
    { product: product2, discount: 20 }, // 20% off
    { product: product3, discount: 10 }  // 10% off
];

// 2. Apply different discounts and display results
console.log("\n--- Applying Discounts to Products ---");
testDiscounts.forEach(({ product, discount }, idx) => {
    const finalPrice = product.applyDiscount(discount);
    console.log(`Product ${idx + 1}: ${product.getDetails()}`);
    console.log(`  Discount: ${discount}%`);
    console.log(`  Discounted New Price: Rs. ${finalPrice}\n`);
});

// 3. Explanation of Abstraction
console.log("--- How Abstraction Helps Simplify Operations ---");
console.log(`1. Encapsulation of Logic: The client code doesn't perform arithmetic formulas ` +
    `such as 'price - (price * percent / 100)'. It simply calls 'applyDiscount(percent)'.`);
console.log(`2. Maintainability: If business rules change tomorrow (e.g., maximum cap on discount ` +
    `or seasonal coupons), changes are made only inside 'applyDiscount', leaving caller code untouched.`);
console.log(`3. Reusability via Prototype: All Product instances share a single copy of 'applyDiscount' ` +
    `in memory via Product.prototype rather than duplicating it on each instance.`);

module.exports = Product;
