/**
 * Assignment 7 - Question 3: Multi-Step Form with Next/Back & Validation
 * 
 * Features:
 * - 3-step form:
 *   Step 1: Name
 *   Step 2: Email
 *   Step 3: Password
 * - "Next" moves to next step ONLY if input is valid.
 * - "Back" moves to previous step.
 * - When all 3 steps complete -> shows final summary.
 */

document.addEventListener("DOMContentLoaded", () => {
    // Inputs
    const nameInput = document.getElementById("input-name");
    const emailInput = document.getElementById("input-email");
    const passwordInput = document.getElementById("input-password");

    // Error elements
    const errName = document.getElementById("err-name");
    const errEmail = document.getElementById("err-email");
    const errPassword = document.getElementById("err-password");

    // Panels
    const panels = {
        1: document.getElementById("step-1"),
        2: document.getElementById("step-2"),
        3: document.getElementById("step-3"),
        summary: document.getElementById("step-summary")
    };

    // Badges
    const badges = {
        1: document.getElementById("badge-1"),
        2: document.getElementById("badge-2"),
        3: document.getElementById("badge-3")
    };

    let currentStep = 1;

    function showStep(step) {
        currentStep = step;
        Object.values(panels).forEach(panel => panel.classList.remove("active"));

        if (step === "summary") {
            panels.summary.classList.add("active");
            document.getElementById("summary-name").textContent = nameInput.value.trim();
            document.getElementById("summary-email").textContent = emailInput.value.trim();
            document.getElementById("summary-password").textContent = "•".repeat(passwordInput.value.length);
        } else {
            panels[step].classList.add("active");
            [1, 2, 3].forEach(num => {
                if (num <= step) {
                    badges[num].classList.add("active");
                } else {
                    badges[num].classList.remove("active");
                }
            });
        }
    }

    // Validation functions
    function validateName() {
        const val = nameInput.value.trim();
        const isValid = val.length >= 2;
        errName.style.display = isValid ? "none" : "block";
        return isValid;
    }

    function validateEmail() {
        const val = emailInput.value.trim();
        const isValid = val.includes("@") && val.indexOf("@") > 0 && val.indexOf("@") < val.length - 1;
        errEmail.style.display = isValid ? "none" : "block";
        return isValid;
    }

    function validatePassword() {
        const val = passwordInput.value;
        const isValid = val.length >= 6;
        errPassword.style.display = isValid ? "none" : "block";
        return isValid;
    }

    // Next step button listeners
    document.getElementById("btn-next-1").addEventListener("click", () => {
        if (validateName()) showStep(2);
    });

    document.getElementById("btn-next-2").addEventListener("click", () => {
        if (validateEmail()) showStep(3);
    });

    // Back button listeners
    document.getElementById("btn-back-2").addEventListener("click", () => showStep(1));
    document.getElementById("btn-back-3").addEventListener("click", () => showStep(2));

    // Submit listener
    document.getElementById("btn-submit").addEventListener("click", () => {
        if (validatePassword()) {
            showStep("summary");
        }
    });

    // Restart button
    document.getElementById("btn-restart").addEventListener("click", () => {
        nameInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";
        showStep(1);
    });
});
