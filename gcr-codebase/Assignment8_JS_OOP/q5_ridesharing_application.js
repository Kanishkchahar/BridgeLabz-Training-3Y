/**
 * Assignment 8 - Question 5: Ride-Sharing Application
 * 
 * Problem Statement:
 * Create classes:
 *   - User → name, rating
 *   - Driver → inherits from User, vehicle details
 *   - Trip → fromLocation, toLocation, distance
 * Scenario:
 *   - Write a calculateFare() method inside Trip using distance.
 *   - Throw an error if distance is negative or not provided.
 *   - Use try/catch to handle the error and show a proper message.
 */

/**
 * Base User Class
 */
class User {
    /**
     * @param {string} name - User's name
     * @param {number} rating - User's rating (1 to 5)
     */
    constructor(name, rating) {
        this.name = name;
        this.rating = rating;
    }

    getUserInfo() {
        return `${this.name} (Rating: ${this.rating}★)`;
    }
}

/**
 * Derived Driver Class
 */
class Driver extends User {
    /**
     * @param {string} name - Driver name
     * @param {number} rating - Driver rating
     * @param {string} vehicleDetails - Vehicle description (e.g., "White Honda City - DL 01 AB 1234")
     */
    constructor(name, rating, vehicleDetails) {
        super(name, rating);
        this.vehicleDetails = vehicleDetails;
    }

    getDriverInfo() {
        return `${this.getUserInfo()} | Vehicle: ${this.vehicleDetails}`;
    }
}

/**
 * Trip Class
 */
class Trip {
    /**
     * @param {string} fromLocation - Pickup location
     * @param {string} toLocation - Dropoff location
     * @param {number} distance - Distance in kilometers
     * @param {User} [rider] - Rider object (optional)
     * @param {Driver} [driver] - Driver object (optional)
     */
    constructor(fromLocation, toLocation, distance, rider = null, driver = null) {
        this.fromLocation = fromLocation;
        this.toLocation = toLocation;
        this.distance = distance;
        this.rider = rider;
        this.driver = driver;
    }

    /**
     * Calculates the trip fare based on distance.
     * Throws an error if distance is negative or not provided.
     * 
     * Fare formula: Base Fare (Rs. 50) + Rs. 15 per km
     * 
     * @param {number} [ratePerKm=15] - Rate per kilometer
     * @param {number} [baseFare=50] - Base fare
     * @returns {number} Calculated fare
     */
    calculateFare(ratePerKm = 15, baseFare = 50) {
        // Validation: Distance must be provided and must be a valid number
        if (this.distance === undefined || this.distance === null || typeof this.distance !== "number" || Number.isNaN(this.distance)) {
            throw new Error(`Distance is not provided or is invalid: Received ${this.distance}`);
        }

        // Validation: Distance cannot be negative
        if (this.distance < 0) {
            throw new Error(`Invalid distance: ${this.distance} km. Distance cannot be negative.`);
        }

        const totalFare = baseFare + (this.distance * ratePerKm);
        return Number(totalFare.toFixed(2));
    }

    /**
     * Returns trip summary string
     * @returns {string}
     */
    getTripSummary() {
        return `Trip from "${this.fromLocation}" to "${this.toLocation}" (${this.distance} km)`;
    }
}

/**
 * Helper function to safely execute fare calculation with try/catch
 * @param {Trip} trip
 */
function processTripFare(trip) {
    console.log(`\nAttempting to calculate fare for: ${trip.getTripSummary()}`);
    try {
        const fare = trip.calculateFare();
        console.log(`✓ Fare calculated successfully: Rs. ${fare}`);
    } catch (error) {
        // Use try/catch to handle the error and show a proper message
        console.error(`✗ Fare Calculation Error: ${error.message}`);
    }
}

// ==========================================
// Demonstration / Test Cases
// ==========================================

console.log("==================================================");
console.log("  Q5: Ride-Sharing Application (Fare Calculation)");
console.log("==================================================");

// Creating users and drivers
const rider1 = new User("Siddharth", 4.8);
const driver1 = new Driver("Rajesh Kumar", 4.9, "Maruti Swift Dzire [DL 04 CZ 7890]");

console.log("Rider :", rider1.getUserInfo());
console.log("Driver:", driver1.getDriverInfo());

// Case 1: Valid trip with positive distance
const trip1 = new Trip("Connaught Place", "Indira Gandhi Airport", 18, rider1, driver1);
processTripFare(trip1);

// Case 2: Valid short trip
const trip2 = new Trip("Hauz Khas", "Saket Mall", 5.5, rider1, driver1);
processTripFare(trip2);

// Case 3: Error scenario - Negative distance
const tripNegative = new Trip("Sector 18 Noida", "Cyber Hub", -12, rider1, driver1);
processTripFare(tripNegative);

// Case 4: Error scenario - Distance not provided (undefined)
const tripMissing = new Trip("Chandni Chowk", "India Gate", undefined, rider1, driver1);
processTripFare(tripMissing);

// Case 5: Error scenario - Distance null
const tripNull = new Trip("Rohini", "Dwarka", null, rider1, driver1);
processTripFare(tripNull);

module.exports = { User, Driver, Trip, processTripFare };
