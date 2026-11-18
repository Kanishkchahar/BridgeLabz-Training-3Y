# Assignment 8: JavaScript Object-Oriented Programming (OOP)

This repository folder contains complete, production-grade solutions for **Assignment 8: Submission of OOP**, covering core Object-Oriented Programming (OOP) paradigms in modern JavaScript (ES6+), functional array methods (`map`, `filter`, `reduce`, `sort`), error handling (`try/catch`, custom `Error`), and the JavaScript prototype chain.

---

## 📁 Folder Structure

```text
Assignment8_JS_OOP/
├── README.md                          # Documentation and OOP concepts guide
├── run_all.js                         # Runner script executing all 9 questions
├── q1_student_result_processing.js    # Q1: Student Result Processing (reduce + Classes)
├── q2_online_food_ordering.js         # Q2: Online Food Ordering (map + Error Handling)
├── q3_product_discount_system.js      # Q3: Product Discount System (Prototypes & Abstraction)
├── q4_employee_inheritance.js         # Q4: Employee Inheritance & Runtime Polymorphism
├── q5_ridesharing_application.js      # Q5: Ride-Sharing Application (Fare Calculation & Error Handling)
├── q6_ecommerce_inventory_system.js   # Q6: E-Commerce Inventory System (Array Methods)
├── q7_banking_application.js          # Q7: Banking Application (Private Fields & Encapsulation)
├── q8_movie_ticket_booking.js         # Q8: Movie Ticket Booking (Prototype Chain Demonstration)
└── q9_fitness_app_analytics.js        # Q9: Fitness App Analytics (Class with map, filter, reduce)
```

---

## 🚀 Running the Solutions

You can run individual questions or all 9 questions at once using Node.js:

### Run All Questions at Once
```bash
node gcr-codebase/Assignment8_JS_OOP/run_all.js
```

### Run an Individual Question
```bash
node gcr-codebase/Assignment8_JS_OOP/q1_student_result_processing.js
node gcr-codebase/Assignment8_JS_OOP/q2_online_food_ordering.js
node gcr-codebase/Assignment8_JS_OOP/q3_product_discount_system.js
node gcr-codebase/Assignment8_JS_OOP/q4_employee_inheritance.js
node gcr-codebase/Assignment8_JS_OOP/q5_ridesharing_application.js
node gcr-codebase/Assignment8_JS_OOP/q6_ecommerce_inventory_system.js
node gcr-codebase/Assignment8_JS_OOP/q7_banking_application.js
node gcr-codebase/Assignment8_JS_OOP/q8_movie_ticket_booking.js
node gcr-codebase/Assignment8_JS_OOP/q9_fitness_app_analytics.js
```

---

## 📚 Detailed Question Breakdown & OOP Principles

### Q1. Student Result Processing (`reduce` + Classes)
- **File**: `q1_student_result_processing.js`
- **OOP / JS Concepts**: ES6 Classes, Constructor, Higher-Order Array Method (`reduce`).
- **Implementation**:
  - Class `Student` with properties `name` and `marks[]`.
  - Method `calculateAverage()` aggregates the marks using `this.marks.reduce((acc, curr) => acc + curr, 0) / this.marks.length`.
  - Method `getGrade()` maps average score to letter grades:
    - Average >= 90: `A`
    - Average >= 75: `B`
    - Average >= 50: `C`
    - Below 50: `F`
  - Tested with 3+ students covering each grade tier.

---

### Q2. Online Food Ordering (`map` + Error Handling)
- **File**: `q2_online_food_ordering.js`
- **OOP / JS Concepts**: Higher-Order Array Methods (`map`, `reduce`), Error Handling (`throw`, `try...catch`).
- **Implementation**:
  - A predefined restaurant menu containing items and pricing.
  - `calculateBill(orderItems)` transforms the ordered item names to prices via `map()`.
  - If an item is not found on the menu, it throws an informative `Error`.
  - Calculates the bill total using `reduce()`.
  - Implements `try/catch` block to handle invalid orders cleanly without terminating the application.

---

### Q3. Product Discount System (Prototypes & Abstraction)
- **File**: `q3_product_discount_system.js`
- **OOP / JS Concepts**: Constructor Functions, Prototype Methods, OOP Abstraction.
- **Implementation**:
  - `Product(name, price)` constructor function.
  - `Product.prototype.applyDiscount(percent)` calculates the discounted price: `price - (price * percent / 100)`.
  - **Abstraction Demonstrated**:
    - **Logic Hiding**: The consumer simply calls `product.applyDiscount(15)` without having to know or implement pricing formulas or rounding algorithms.
    - **Single Point of Change**: If business rules change (e.g. tax deduction or discount caps), modification is only required inside `applyDiscount`.
    - **Memory Optimization**: Memory is shared across all instances via `Product.prototype`.

---

### Q4. Employee Inheritance & Runtime Polymorphism
- **File**: `q4_employee_inheritance.js`
- **OOP / JS Concepts**: Inheritance (`extends`, `super()`), Method Overriding, Runtime Polymorphism.
- **Implementation**:
  - Base class `Employee` with `name`, `department`, and `work()` method.
  - Subclass `Manager` extending `Employee`, overriding `work()`.
  - **Runtime Polymorphism Demonstrated**: An array containing both `Employee` and `Manager` objects is iterated over. Calling `.work()` invokes the appropriate version depending on the runtime type of the object.

---

### Q5. Ride-Sharing Application
- **File**: `q5_ridesharing_application.js`
- **OOP / JS Concepts**: Multi-class Architecture, Inheritance, Defensive Validation, Error Handling.
- **Implementation**:
  - `User` class (properties: `name`, `rating`).
  - `Driver` class inheriting from `User` with additional property `vehicleDetails`.
  - `Trip` class (properties: `fromLocation`, `toLocation`, `distance`).
  - Method `calculateFare()` inside `Trip`:
    - Throws an error if distance is negative or missing (`undefined`/`null`).
    - Calculates fare as `baseFare + (distance * ratePerKm)`.
  - Valid and invalid trips are wrapped with `try/catch` demonstrating graceful error handling.

---

### Q6. E-Commerce Inventory System
- **File**: `q6_ecommerce_inventory_system.js`
- **OOP / JS Concepts**: Array Transformations (`filter`, `sort`, `reduce`), Object Grouping.
- **Implementation**:
  - Product schema: `{ id, name, category, price, stock }`.
  - `getLowStockProducts(products, threshold)` using `filter()`.
  - `sortProductsByPrice(products, ascending)` using immutable `sort()`.
  - `calculateTotalInventoryValue(products)` using `reduce()` summing `price * stock`.
  - `groupByCategory(products)` using `reduce()` to organize products into category buckets.
  - Tested across multi-category inventory (Electronics, Clothing, Kitchen, Books, Groceries).

---

### Q7. Banking Application (Private Fields & Encapsulation)
- **File**: `q7_banking_application.js`
- **OOP / JS Concepts**: True Data Encapsulation, ES2022 Private Class Fields (`#balance`, `#accountHolder`).
- **Implementation**:
  - `BankAccount` class with private field `#balance`.
  - Methods `deposit(amount)`, `withdraw(amount)`, and `getBalance()`.
  - `withdraw()` throws an error if withdrawal exceeds `#balance` or is non-positive.
  - Demonstrates that external direct access `account.#balance` is strictly forbidden by JavaScript engines, preventing unauthorized mutations.
  - All withdrawal failure scenarios handled gracefully with `try/catch`.

---

### Q8. Movie Ticket Booking (Prototype Chain Demonstration)
- **File**: `q8_movie_ticket_booking.js`
- **OOP / JS Concepts**: Prototypal Inheritance Chain, Class Extension, Dynamic Prototype Extension.
- **Implementation**:
  - Class `MovieTicket` with `movieName`, `seatNo`, `price`.
  - Class `OnlineTicket` inheriting `MovieTicket`, adding `convenienceFee` and `getTotalAmount()`.
  - Dynamically attached `printTicket()` to `MovieTicket.prototype`.
  - **Prototype Chain Demonstrated**:
    - When `onlineTicket.printTicket()` is called, JavaScript searches:
      1. Instance properties of `onlineTicket` (Not found)
      2. `OnlineTicket.prototype` (Not found)
      3. `MovieTicket.prototype` (Found and executed with `this` bound to `onlineTicket`)
      4. `Object.prototype`
      5. `null`

---

### Q9. Fitness App Analytics
- **File**: `q9_fitness_app_analytics.js`
- **OOP / JS Concepts**: Class Encapsulation, Dataset Validation, Higher-Order Array Methods (`filter`, `map`, `reduce`).
- **Implementation**:
  - Class `FitnessAnalytics` accepting workout records: `[{ user, steps, calories }]`.
  - Throws an error if dataset is empty or invalid.
  - `getActiveUsers()` -> filters users with `steps > 7000`.
  - `getAverageCalories()` -> calculates mean calories burned using `reduce()`.
  - `getUserSummary()` -> maps records into human-readable summary strings.
  - Fully tested on valid dataset and edge cases (empty array and null).
