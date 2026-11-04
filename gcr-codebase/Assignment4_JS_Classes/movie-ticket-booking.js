// Q5: Movie Ticket Booking (Objects + RegExp)
// Validates booking details using Regular Expressions and generates confirmed ticket records.

const movieBookingValidator = {
  // Only alphabetic characters (spaces permitted between names)
  nameRegex: /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,

  // Standard email format
  emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  // Number from 1 to 10 only
  seatsRegex: /^(?:[1-9]|10)$/,

  validate(name, email, seats) {
    const errors = [];

    const cleanName = (name || "").trim();
    const cleanEmail = (email || "").trim();
    const cleanSeats = String(seats || "").trim();

    if (!this.nameRegex.test(cleanName)) {
      errors.push("Invalid Name: Please enter alphabets only.");
    }

    if (!this.emailRegex.test(cleanEmail)) {
      errors.push("Invalid Email: Please provide a valid email address.");
    }

    if (!this.seatsRegex.test(cleanSeats)) {
      errors.push("Invalid Seats: You can only book between 1 and 10 seats.");
    }

    if (errors.length > 0) {
      return { success: false, errors, booking: null };
    }

    // Success: store booking details in an object
    const booking = {
      bookingId: "TKT-" + Math.floor(100000 + Math.random() * 900000),
      name: cleanName,
      email: cleanEmail,
      seats: parseInt(cleanSeats, 10),
      pricePerTicket: 250,
      get totalAmount() {
        return this.seats * this.pricePerTicket;
      },
      bookingTime: new Date().toLocaleString()
    };

    return { success: true, errors: [], booking };
  }
};

// Browser DOM handling
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const bookingForm = document.getElementById("bookingForm");
    const errorBox = document.getElementById("bookingErrors");
    const ticketDetailsBox = document.getElementById("ticketDetails");

    if (!bookingForm) return;

    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameVal = document.getElementById("custName").value;
      const emailVal = document.getElementById("custEmail").value;
      const seatsVal = document.getElementById("numSeats").value;

      const result = movieBookingValidator.validate(nameVal, emailVal, seatsVal);

      if (!result.success) {
        errorBox.innerHTML = result.errors.map((err) => `<div>• ${err}</div>`).join("");
        errorBox.style.display = "block";
        ticketDetailsBox.style.display = "none";
      } else {
        errorBox.style.display = "none";
        const b = result.booking;
        ticketDetailsBox.innerHTML = `
          <div style="border: 2px dashed #28a745; padding: 16px; border-radius: 6px; background: #f8fff9;">
            <h4 style="margin: 0 0 10px 0; color: #28a745;">🎟️ Booking Confirmed!</h4>
            <p><strong>Ticket ID:</strong> ${b.bookingId}</p>
            <p><strong>Name:</strong> ${b.name}</p>
            <p><strong>Email:</strong> ${b.email}</p>
            <p><strong>Seats Booked:</strong> ${b.seats}</p>
            <p><strong>Total Amount:</strong> ₹${b.totalAmount}</p>
            <p><small style="color: #666;">Booked on: ${b.bookingTime}</small></p>
          </div>
        `;
        ticketDetailsBox.style.display = "block";
      }
    });
  });
}

// Node.js test simulation
if (typeof window === "undefined") {
  console.log("=== Node.js Test: Movie Ticket Booking ===");

  console.log("\n1. Testing Valid Booking:");
  const test1 = movieBookingValidator.validate("Rohan Verma", "rohan.v@example.com", 4);
  console.log("Success:", test1.success);
  console.log("Booking Object:", {
    name: test1.booking.name,
    email: test1.booking.email,
    seats: test1.booking.seats,
    total: test1.booking.totalAmount
  });

  console.log("\n2. Testing Invalid Inputs (Seats > 10, invalid name with numbers):");
  const test2 = movieBookingValidator.validate("Rohan123", "bad-email", 15);
  console.log("Success:", test2.success);
  console.log("Errors Caught:", test2.errors);
}
