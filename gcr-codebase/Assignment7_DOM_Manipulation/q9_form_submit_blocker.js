/**
 * Assignment 7 - Question 9: Form Submit Blocker with preventDefault() and Live Errors
 * 
 * Requirements:
 * - Fields: Name (required), Email (required, must contain @), Password (min 6 chars).
 * - On submit: if any field is invalid -> show inline errors.
 * - Use preventDefault() to stop form submission.
 * - On correcting input -> errors disappear automatically (live validation).
 * - Show a final "Form Submitted Successfully" message.
 */

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registration-form");
    const nameInput = document.getElementById("user-name");
    const emailInput = document.getElementById("user-email");
    const passwordInput = document.getElementById("user-password");

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");

    const successMessage = document.getElementById("success-message");

    // Validators
    function validateName() {
        const isValid = nameInput.value.trim().length > 0;
        if (!isValid) {
            nameError.style.display = "block";
            nameInput.classList.add("input-error");
            nameInput.classList.remove("input-valid");
        } else {
            nameError.style.display = "none";
            nameInput.classList.remove("input-error");
            nameInput.classList.add("input-valid");
        }
        return isValid;
    }

    function validateEmail() {
        const val = emailInput.value.trim();
        const isValid = val.length > 0 && val.includes("@");
        if (!isValid) {
            emailError.style.display = "block";
            emailInput.classList.add("input-error");
            emailInput.classList.remove("input-valid");
        } else {
            emailError.style.display = "none";
            emailInput.classList.remove("input-error");
            emailInput.classList.add("input-valid");
        }
        return isValid;
    }

    function validatePassword() {
        const isValid = passwordInput.value.length >= 6;
        if (!isValid) {
            passwordError.style.display = "block";
            passwordInput.classList.add("input-error");
            passwordInput.classList.remove("input-valid");
        } else {
            passwordError.style.display = "none";
            passwordInput.classList.remove("input-error");
            passwordInput.classList.add("input-valid");
        }
        return isValid;
    }

    // Live error clearing as user types
    nameInput.addEventListener("input", validateName);
    emailInput.addEventListener("input", validateEmail);
    passwordInput.addEventListener("input", validatePassword);

    // Form submission handling
    form.addEventListener("submit", (e) => {
        // ALWAYS call preventDefault() to prevent full page reload
        e.preventDefault();

        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        if (isNameValid && isEmailValid && isPasswordValid) {
            // All valid -> show success message
            successMessage.style.display = "block";
            form.reset();

            // Clear green validation styles
            nameInput.classList.remove("input-valid");
            emailInput.classList.remove("input-valid");
            passwordInput.classList.remove("input-valid");

            console.log("Form Submitted Successfully!");
        } else {
            // Hide success message if previously shown
            successMessage.style.display = "none";
            console.log("Form submission blocked due to validation errors.");
        }
    });
});
