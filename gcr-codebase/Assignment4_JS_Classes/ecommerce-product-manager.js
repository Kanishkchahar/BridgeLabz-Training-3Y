// Q1: E-Commerce Product Manager (Classes + Objects)
// Manages product data, applies discounts, formats details, and filters premium products.

class Product {
  constructor(id, name, price, category) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
  }

  // Method to apply discount percentage (e.g., 10 for 10%)
  applyDiscount(percent) {
    if (percent > 0 && percent <= 100) {
      const discountAmount = (this.price * percent) / 100;
      this.price = Math.round((this.price - discountAmount) * 100) / 100;
      console.log(`Applied ${percent}% discount on "${this.name}". New price: ₹${this.price}`);
    } else {
      console.log(`Invalid discount percentage: ${percent}%`);
    }
    return this.price;
  }

  // Method to display formatted product details
  displayDetails() {
    return `[ID: ${this.id}] ${this.name.padEnd(20)} | Category: ${this.category.padEnd(12)} | Price: ₹${this.price.toFixed(2)}`;
  }
}

// Create multiple product objects and store in array
const products = [
  new Product(101, "Wireless Headphones", 1499.00, "Electronics"),
  new Product(102, "Coffee Mug", 299.00, "Home & Kitchen"),
  new Product(103, "Mechanical Keyboard", 3499.00, "Electronics"),
  new Product(104, "Water Bottle", 450.00, "Fitness"),
  new Product(105, "Smart Fitness Watch", 2199.00, "Wearables"),
  new Product(106, "Notebook Set", 199.00, "Stationery")
];

console.log("================ ALL PRODUCTS ================");
products.forEach((prod) => console.log(prod.displayDetails()));

// Apply a 10% discount on headphones and smart watch
console.log("\n================ APPLYING DISCOUNTS ================");
products[0].applyDiscount(10); // Headphones: 1499 -> 1349.1
products[4].applyDiscount(15); // Watch: 2199 -> 1869.15

// Display products with price > 1000 using filter()
console.log("\n================ PRODUCTS PRICED > ₹1000 ================");
const premiumProducts = products.filter((prod) => prod.price > 1000);

premiumProducts.forEach((prod) => {
  console.log(prod.displayDetails());
});

console.log(`\nTotal products matching criteria: ${premiumProducts.length}`);
