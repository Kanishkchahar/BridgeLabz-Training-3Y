// Q8: Dynamic Object Updater
// Maintains an active user state object, enables live edits via DOM inputs, and syncs object state on submit.

// The target object to be updated
const user = {
  name: "John",
  email: "john@mail.com",
  age: 21
};

// Function to update the user object in real time
function updateUser(newName, newEmail, newAge) {
  if (newName !== undefined && newName.trim() !== "") {
    user.name = newName.trim();
  }
  if (newEmail !== undefined && newEmail.trim() !== "") {
    user.email = newEmail.trim();
  }
  if (newAge !== undefined && !isNaN(Number(newAge))) {
    user.age = parseInt(newAge, 10);
  }
  return { ...user };
}

// Browser DOM handling
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById("editName");
    const emailInput = document.getElementById("editEmail");
    const ageInput = document.getElementById("editAge");
    const updateForm = document.getElementById("updaterForm");
    const displayBox = document.getElementById("objectDisplay");

    // Populate initial inputs with existing object values
    function populateForm() {
      if (nameInput) nameInput.value = user.name;
      if (emailInput) emailInput.value = user.email;
      if (ageInput) ageInput.value = user.age;
    }

    // Refresh rendered DOM display of the updated object
    function renderObjectState() {
      if (!displayBox) return;
      displayBox.innerHTML = `
        <div style="background: #eef9ff; border: 1px solid #bce8f1; padding: 14px; border-radius: 6px;">
          <h4 style="margin: 0 0 10px 0; color: #31708f;">Current User Object (Live State):</h4>
          <p><strong>Name:</strong> ${user.name}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Age:</strong> ${user.age}</p>
          <pre style="margin: 8px 0 0 0; background: #2f3542; color: #7bed9f; padding: 8px; border-radius: 4px;">user = ${JSON.stringify(user, null, 2)};</pre>
        </div>
      `;
    }

    populateForm();
    renderObjectState();

    if (updateForm) {
      updateForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Update target user object in real time
        updateUser(nameInput.value, emailInput.value, ageInput.value);

        // Reflect updated state immediately in DOM
        renderObjectState();

        const toast = document.getElementById("updateToast");
        if (toast) {
          toast.textContent = "User object updated successfully!";
          toast.style.display = "block";
          setTimeout(() => {
            toast.style.display = "none";
          }, 2500);
        }
      });
    }
  });
}

// Node.js test simulation
if (typeof window === "undefined") {
  console.log("=== Node.js Test: Dynamic Object Updater ===");
  console.log("Initial Object State:", user);

  console.log("\nSimulating Form Submit: Updating user to Sarah, sarah@mail.com, age 24...");
  updateUser("Sarah Connor", "sarah@mail.com", "24");
  console.log("Updated Object State:", user);

  console.log("\nSimulating Partial Update: Updating age to 25...");
  updateUser(user.name, user.email, "25");
  console.log("Final Object State:", user);
}
