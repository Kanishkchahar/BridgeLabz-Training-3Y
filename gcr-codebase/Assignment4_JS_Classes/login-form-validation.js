// Q7: Login Form Validation using RegExp
// Validates credentials using Regular Expressions and provides granular feedback messages.

// RegExp patterns
const patterns = {
  // Username: at least 5 alphanumeric characters / underscores (no leading/trailing whitespace)
  username: /^[a-zA-Z0-9_]{5,}$/,

  // Password requirements:
  // - at least 8 characters
  // - at least 1 uppercase letter
  // - at least 1 lowercase letter
  // - at least 1 digit
  // - at least 1 special character
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/
};

function validateLoginForm(username, password) {
  const errors = [];

  const cleanUsername = (username || "").trim();
  const rawPassword = password || "";

  // Check username
  if (!cleanUsername) {
    errors.push("Username is required.");
  } else if (!patterns.username.test(cleanUsername)) {
    errors.push("Username must be at least 5 characters long and contain only letters, numbers, or underscores.");
  }

  // Check password with specific sub-checks for clear user feedback
  if (!rawPassword) {
    errors.push("Password is required.");
  } else {
    const passwordErrors = [];
    if (rawPassword.length < 8) {
      passwordErrors.push("at least 8 characters");
    }
    if (!/[A-Z]/.test(rawPassword)) {
      passwordErrors.push("1 uppercase letter");
    }
    if (!/[a-z]/.test(rawPassword)) {
      passwordErrors.push("1 lowercase letter");
    }
    if (!/\d/.test(rawPassword)) {
      passwordErrors.push("1 number");
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(rawPassword)) {
      passwordErrors.push("1 special character");
    }

    if (passwordErrors.length > 0) {
      errors.push(`Password is missing: ${passwordErrors.join(", ")}.`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    message: errors.length === 0 ? "Login successful! Welcome back." : "Login failed. Please resolve the errors."
  };
}

// Browser DOM handling
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const feedbackBox = document.getElementById("loginFeedback");

    if (!form || !feedbackBox) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const userVal = document.getElementById("usernameInput").value;
      const passVal = document.getElementById("passwordInput").value;

      const result = validateLoginForm(userVal, passVal);

      if (result.isValid) {
        feedbackBox.className = "alert alert-success";
        feedbackBox.innerHTML = `<strong>${result.message}</strong>`;
        feedbackBox.style.display = "block";
      } else {
        feedbackBox.className = "alert alert-error";
        feedbackBox.innerHTML = `
          <strong>Validation Errors:</strong>
          <ul>${result.errors.map((err) => `<li>${err}</li>`).join("")}</ul>
        `;
        feedbackBox.style.display = "block";
      }
    });
  });
}

// Node.js test simulation
if (typeof window === "undefined") {
  console.log("=== Node.js Test: Login Form Validation ===");

  console.log("\n1. Testing Valid Credentials:");
  const testValid = validateLoginForm("kanishk_07", "Secur3#Pass");
  console.log(testValid);

  console.log("\n2. Testing Short Username & Weak Password:");
  const testInvalid = validateLoginForm("dev", "mypass");
  console.log(testInvalid);
}
