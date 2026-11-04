// Q9: Shopping Cart Total (Classes + RegExp for Coupon)
// Manages shopping cart line items, subtotal calculation, and RegExp-based coupon discount validation.

class Cart {
  constructor() {
    this.items = [];
    this.appliedCoupon = null;
    this.discountPercent = 0;
  }

  // Add items with name, price, and quantity
  addItem(name, price, quantity = 1) {
    if (!name || price <= 0 || quantity <= 0) {
      console.log(`[ERROR] Invalid item details for "${name}". Item skipped.`);
      return;
    }
    this.items.push({
      name: name.trim(),
      price: Number(price),
      quantity: parseInt(quantity, 10)
    });
    console.log(`[ADDED] ${quantity}x "${name}" @ ₹${price} each.`);
  }

  // Calculate gross total (subtotal before discounts)
  getTotal() {
    return this.items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
  }

  // Apply coupon validation using RegExp
  // Format must be like SAVE20 or DISC10: (SAVE or DISC followed by 1-2 digits, 1 to 99)
  applyCoupon(couponCode) {
    const couponRegex = /^(SAVE|DISC)(\d{1,2})$/;
    const cleanCode = (couponCode || "").trim().toUpperCase();

    const match = cleanCode.match(couponRegex);

    if (!match) {
      console.log(`[INVALID COUPON] "${couponCode}" is invalid. Expected format: SAVE20 or DISC10.`);
      return {
        success: false,
        coupon: couponCode,
        discountPercent: 0,
        subtotal: this.getTotal(),
        finalTotal: this.getTotal()
      };
    }

    const prefix = match[1]; // SAVE or DISC
    const percent = parseInt(match[2], 10); // e.g. 20 or 10

    if (percent <= 0 || percent > 90) {
      console.log(`[COUPON REJECTED] Discount percentage ${percent}% is outside allowed range (1-90%).`);
      return {
        success: false,
        coupon: couponCode,
        discountPercent: 0,
        subtotal: this.getTotal(),
        finalTotal: this.getTotal()
      };
    }

    this.appliedCoupon = `${prefix}${percent}`;
    this.discountPercent = percent;

    const subtotal = this.getTotal();
    const discountAmount = (subtotal * percent) / 100;
    const finalTotal = subtotal - discountAmount;

    console.log(`[COUPON APPLIED] "${this.appliedCoupon}" validated! ${percent}% discount applied.`);

    return {
      success: true,
      coupon: this.appliedCoupon,
      discountPercent: percent,
      subtotal,
      discountAmount,
      finalTotal
    };
  }

  // Display receipt summary
  printCheckoutReceipt() {
    console.log("\n================ SHOPPING CART RECEIPT ================");
    if (this.items.length === 0) {
      console.log("Cart is empty.");
      return;
    }

    this.items.forEach((item, index) => {
      const lineTotal = item.price * item.quantity;
      console.log(`${index + 1}. ${item.name.padEnd(18)} : ${item.quantity} x ₹${item.price.toFixed(2)} = ₹${lineTotal.toFixed(2)}`);
    });

    const subtotal = this.getTotal();
    console.log("-------------------------------------------------------");
    console.log(`Subtotal             : ₹${subtotal.toFixed(2)}`);

    if (this.discountPercent > 0) {
      const discount = (subtotal * this.discountPercent) / 100;
      const finalAmount = subtotal - discount;
      console.log(`Coupon Applied       : ${this.appliedCoupon} (-${this.discountPercent}%)`);
      console.log(`Discount Amount      : -₹${discount.toFixed(2)}`);
      console.log(`Final Payable Total  : ₹${finalAmount.toFixed(2)}`);
    } else {
      console.log(`No Discount Applied  : ₹0.00`);
      console.log(`Final Payable Total  : ₹${subtotal.toFixed(2)}`);
    }
    console.log("=======================================================\n");
  }
}

// ---------------- Execution / Demonstration ----------------
console.log("=== Creating Cart & Adding Items ===");
const cart = new Cart();
cart.addItem("Bluetooth Speaker", 1200, 1);
cart.addItem("USB-C Fast Cable", 350, 2);
cart.addItem("Wireless Mouse", 850, 1);

console.log("\nInitial Subtotal via getTotal(): ₹" + cart.getTotal());

// Test 1: Invalid coupon format
console.log("\n--- Testing Invalid Coupon Code ---");
cart.applyCoupon("OFFER50"); // invalid prefix
cart.applyCoupon("DISCOUNT10"); // invalid prefix
cart.applyCoupon("SAVE1000"); // too many digits

// Test 2: Valid coupon SAVE20 (20% off)
console.log("\n--- Applying Valid Coupon: SAVE20 ---");
cart.applyCoupon("SAVE20");
cart.printCheckoutReceipt();

// Test 3: Another cart instance testing DISC10 (10% off)
console.log("=== Second Cart Test: DISC10 ===");
const cart2 = new Cart();
cart2.addItem("Ergonomic Chair", 6500, 1);
cart2.applyCoupon("DISC10");
cart2.printCheckoutReceipt();
