/**
 * Assignment 8 - Question 7: Banking Application
 * 
 * Problem Statement:
 * Create a BankAccount class with private fields:
 *   - #balance
 * Add methods:
 *   - deposit(amount)
 *   - withdraw(amount) (throw error if insufficient balance)
 *   - getBalance()
 * Demonstrate:
 *   - valid deposits
 *   - invalid withdrawals (handled using try/catch)
 */

class BankAccount {
    // Private field for balance (Encapsulation)
    #balance;
    #accountHolder;

    /**
     * @param {string} accountHolder - Name of the account holder
     * @param {number} [initialBalance=0] - Initial starting balance
     */
    constructor(accountHolder, initialBalance = 0) {
        if (typeof initialBalance !== "number" || initialBalance < 0) {
            throw new Error("Initial balance must be a non-negative number.");
        }
        this.#accountHolder = accountHolder;
        this.#balance = initialBalance;
    }

    /**
     * Deposits money into the account.
     * @param {number} amount
     * @returns {number} Updated balance
     */
    deposit(amount) {
        if (typeof amount !== "number" || amount <= 0) {
            throw new Error(`Invalid deposit amount: Rs. ${amount}. Amount must be greater than zero.`);
        }
        this.#balance += amount;
        return this.#balance;
    }

    /**
     * Withdraws money from the account.
     * Throws an error if amount exceeds current balance.
     * @param {number} amount
     * @returns {number} Updated balance
     */
    withdraw(amount) {
        if (typeof amount !== "number" || amount <= 0) {
            throw new Error(`Invalid withdrawal amount: Rs. ${amount}. Amount must be greater than zero.`);
        }
        if (amount > this.#balance) {
            throw new Error(
                `Transaction Declined: Insufficient balance! Available balance is Rs. ${this.#balance}, but requested Rs. ${amount}.`
            );
        }
        this.#balance -= amount;
        return this.#balance;
    }

    /**
     * Returns the current balance (read-only accessor).
     * @returns {number}
     */
    getBalance() {
        return this.#balance;
    }

    /**
     * Returns the account holder's name.
     * @returns {string}
     */
    getAccountHolder() {
        return this.#accountHolder;
    }
}

// ==========================================
// Demonstration / Test Cases
// ==========================================

console.log("==================================================");
console.log("  Q7: Banking Application (Private Fields & Encapsulation)");
console.log("==================================================");

// 1. Create a bank account instance
const account = new BankAccount("Rhea Kapoor", 5000);
console.log(`Account created for ${account.getAccountHolder()} with initial balance: Rs. ${account.getBalance()}`);

// 2. Demonstrate valid deposits
console.log("\n--- Executing Valid Deposits ---");
try {
    console.log(`Depositing Rs. 2500...`);
    account.deposit(2500);
    console.log(`✓ Deposit successful! Current Balance: Rs. ${account.getBalance()}`);

    console.log(`Depositing Rs. 1000...`);
    account.deposit(1000);
    console.log(`✓ Deposit successful! Current Balance: Rs. ${account.getBalance()}`);
} catch (error) {
    console.error(`✗ Deposit Error: ${error.message}`);
}

// 3. Demonstrate valid withdrawal
console.log("\n--- Executing Valid Withdrawal ---");
try {
    console.log(`Withdrawing Rs. 3000...`);
    account.withdraw(3000);
    console.log(`✓ Withdrawal successful! Remaining Balance: Rs. ${account.getBalance()}`);
} catch (error) {
    console.error(`✗ Withdrawal Error: ${error.message}`);
}

// 4. Demonstrate invalid withdrawals (Handled using try/catch)
console.log("\n--- Executing Invalid Withdrawals (Handled with try/catch) ---");

// Test A: Exceeding current balance
try {
    console.log(`Attempting to withdraw Rs. 10000 (Current balance: Rs. ${account.getBalance()})...`);
    account.withdraw(10000);
    console.log(`✓ Withdrawal successful!`);
} catch (error) {
    console.error(`✗ Handled Error: ${error.message}`);
}

// Test B: Negative withdrawal amount
try {
    console.log(`Attempting to withdraw negative amount: -500...`);
    account.withdraw(-500);
    console.log(`✓ Withdrawal successful!`);
} catch (error) {
    console.error(`✗ Handled Error: ${error.message}`);
}

// 5. Verification of Private Field Protection
console.log("\n--- Verifying Private Field Encapsulation ---");
console.log(`Attempting account.balance: ${account.balance}`); // undefined
console.log(`Is #balance accessible externally? No - accessing account.#balance triggers a compile/syntax error in JavaScript engines.`);
console.log(`Final verified balance via getBalance(): Rs. ${account.getBalance()}`);

module.exports = BankAccount;
