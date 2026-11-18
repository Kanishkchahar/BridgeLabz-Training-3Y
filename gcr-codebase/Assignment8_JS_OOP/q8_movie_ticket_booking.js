/**
 * Assignment 8 - Question 8: Movie Ticket Booking System
 * 
 * Problem Statement:
 * Create a class MovieTicket with properties:
 *   - movieName
 *   - seatNo
 *   - price
 * Then create a class OnlineTicket that inherits and adds:
 *   - convenienceFee
 *   - method getTotalAmount()
 * Additionally:
 *   - Add a method to MovieTicket.prototype called printTicket()
 *   - Call it using OnlineTicket objects (demonstrate prototype chain working)
 */

/**
 * Base Class: MovieTicket
 */
class MovieTicket {
    /**
     * @param {string} movieName - Name of the movie
     * @param {string} seatNo - Assigned seat number
     * @param {number} price - Base ticket price
     */
    constructor(movieName, seatNo, price) {
        this.movieName = movieName;
        this.seatNo = seatNo;
        this.price = price;
    }
}

/**
 * Derived Class: OnlineTicket
 * Inherits from MovieTicket
 */
class OnlineTicket extends MovieTicket {
    /**
     * @param {string} movieName - Name of the movie
     * @param {string} seatNo - Assigned seat number
     * @param {number} price - Base ticket price
     * @param {number} [convenienceFee=50] - Online booking fee
     */
    constructor(movieName, seatNo, price, convenienceFee = 50) {
        super(movieName, seatNo, price);
        this.convenienceFee = convenienceFee;
    }

    /**
     * Calculates the total payable amount including convenience fee
     * @returns {number}
     */
    getTotalAmount() {
        return this.price + this.convenienceFee;
    }
}

/**
 * Requirement: Add printTicket() dynamically to MovieTicket.prototype
 * This demonstrates prototype inheritance in ES6 classes.
 */
MovieTicket.prototype.printTicket = function () {
    const feeInfo = this.convenienceFee !== undefined ? ` + Convenience Fee: Rs. ${this.convenienceFee}` : "";
    const totalAmount = typeof this.getTotalAmount === "function" ? this.getTotalAmount() : this.price;

    return `🎬 [Ticket] Movie: "${this.movieName}" | Seat: ${this.seatNo} | Price: Rs. ${this.price}${feeInfo} | Total: Rs. ${totalAmount}`;
};

// ==========================================
// Demonstration / Test Cases
// ==========================================

console.log("==================================================");
console.log("  Q8: Movie Ticket Booking (Prototype Chain)");
console.log("==================================================");

// 1. Create a base MovieTicket (box office physical counter purchase)
const boxOfficeTicket = new MovieTicket("Inception", "A-12", 250);

// 2. Create OnlineTicket instances (inheriting from MovieTicket)
const onlineTicket1 = new OnlineTicket("Interstellar (IMAX)", "F-14", 450, 60);
const onlineTicket2 = new OnlineTicket("Oppenheimer", "D-08", 350, 45);

// 3. Call printTicket() on OnlineTicket objects
console.log("\n--- Printing Online Tickets using inherited prototype method ---");
console.log(onlineTicket1.printTicket());
console.log(onlineTicket2.printTicket());

console.log("\n--- Calling printTicket() on Base MovieTicket ---");
console.log(boxOfficeTicket.printTicket());

// 4. Demonstration of Prototype Chain Working
console.log("\n--- Demonstrating Prototype Chain Working ---");
console.log("Does onlineTicket1 have printTicket as an own property?", 
    Object.prototype.hasOwnProperty.call(onlineTicket1, "printTicket")); // false

console.log("Does OnlineTicket.prototype have printTicket?", 
    Object.prototype.hasOwnProperty.call(OnlineTicket.prototype, "printTicket")); // false

console.log("Does MovieTicket.prototype have printTicket?", 
    Object.prototype.hasOwnProperty.call(MovieTicket.prototype, "printTicket")); // true!

console.log("\nPrototype Chain Traversal:");
console.log("1. onlineTicket1");
console.log("   └── __proto__ -> OnlineTicket.prototype");
console.log("       └── __proto__ -> MovieTicket.prototype (printTicket found here!)");
console.log("           └── __proto__ -> Object.prototype");
console.log("               └── __proto__ -> null");

console.log("\nInstanceof checks:");
console.log(`onlineTicket1 instanceof OnlineTicket : ${onlineTicket1 instanceof OnlineTicket}`); // true
console.log(`onlineTicket1 instanceof MovieTicket  : ${onlineTicket1 instanceof MovieTicket}`);  // true
console.log(`onlineTicket1 instanceof Object       : ${onlineTicket1 instanceof Object}`);       // true

module.exports = { MovieTicket, OnlineTicket };
