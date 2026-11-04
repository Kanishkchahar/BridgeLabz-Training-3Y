// Q2: Student Form Validator (Forms + RegExp)
// Validates registration form fields using regular expressions.
// Provides visual feedback: green border for valid inputs, red border + error text for invalid inputs.

// Regular expressions for validation
const validationRules = {
  // Only alphabetic characters (and space between words)
  name: {
    regex: /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
    errorMsg: "Name must contain only alphabets."
  },
  // Valid email format
  email: {
    regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    errorMsg: "Please enter a valid email address (e.g., example@domain.com)."
  },
  // Exactly 10 digits
  phone: {
    regex: /^\d{10}$/,
    errorMsg: "Phone number must be exactly 10 digits."
  },
  // Password: at least 1 uppercase, 1 number, and 1 special character
  password: {
    regex: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/,
    errorMsg: "Password must contain at least 1 uppercase letter, 1 number, and 1 special character."
  }
};

// Pure validation function (callable in Node.js or browser)
function validateField(fieldName, value) {
  const rule = validationRules[fieldName];
  if (!rule) {
    return { isValid: false, message: "Unknown field" };
  }
  const cleanVal = (value || "").trim();
  const isValid = rule.regex.test(cleanVal);
  return {
    isValid,
    message: isValid ? "" : rule.errorMsg
  };
}

function validateStudentForm(formData) {
  const results = {};
  let isFormValid = true;

  for (const field of ["name", "email", "phone", "password"]) {
    const res = validateField(field, formData[field]);
    results[field] = res;
    if (!res.isValid) {
      isFormValid = false;
    }
  }

  return { isFormValid, results };
}

// Browser DOM handling
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("studentForm");
    if (!form) return;

    const fields = ["name", "email", "phone", "password"];

    function applyValidationUI(field) {
      const input = document.getElementById(field);
      const errorSpan = document.getElementById(`${field}Error`);
      if (!input || !errorSpan) return false;

      const result = validateField(field, input.value);

      if (result.isValid) {
        input.style.borderColor = "#28a745"; // green border
        errorSpan.textContent = "";
        return true;
      } else {
        input.style.borderColor = "#dc3545"; // red border
        errorSpan.textContent = result.message;
        return false;
      }
    }

    // Attach real-time validation on input/blur
    fields.forEach((field) => {
      const input = document.getElementById(field);
      if (input) {
        input.addEventListener("input", () => applyValidationUI(field));
        input.addEventListener("blur", () => applyValidationUI(field));
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let allValid = true;
      fields.forEach((field) => {
        const valid = applyValidationUI(field);
        if (!valid) allValid = false;
      });

      const messageBox = document.getElementById("formMessage");
      if (messageBox) {
        if (allValid) {
          messageBox.style.color = "#28a745";
          messageBox.textContent = "Registration successful! All fields are valid.";
        } else {
          messageBox.style.color = "#dc3545";
          messageBox.textContent = "Please fix the highlighted errors before submitting.";
        }
      }
    });
  });
}

// Node.js test demonstration
if (typeof window === "undefined") {
  console.log("=== Node.js Test: Student Form Validator ===");

  const sampleStudent = {
    name: "Aman Sharma",
    email: "aman.sharma@example.com",
    phone: "9876543210",
    password: "Password@123"
  };

  const invalidStudent = {
    name: "Aman123",
    email: "not-an-email",
    phone: "98765",
    password: "weakpassword"
  };

  console.log("\nTesting Valid Input:");
  console.log(validateStudentForm(sampleStudent));

  console.log("\nTesting Invalid Input:");
  console.log(validateStudentForm(invalidStudent));
}
