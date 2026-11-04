// Q4: Custom Form Builder (Forms + Classes)
// Dynamically generates HTML forms from field schema objects and extracts submitted data as a JavaScript object.

class FormBuilder {
  constructor(fields, formId = "dynamicGeneratedForm") {
    this.fields = fields; // Array of field configurations
    this.formId = formId;
  }

  // Generates form HTML string dynamically
  buildHTML() {
    let fieldsHtml = "";

    this.fields.forEach((field) => {
      const fieldId = field.name || field.label.toLowerCase().replace(/\s+/g, "_");
      const fieldType = field.type || "text";
      const placeholder = field.placeholder || `Enter ${field.label}`;
      const isRequired = field.required ? "required" : "";

      fieldsHtml += `
        <div class="form-row" style="margin-bottom: 12px;">
          <label for="${fieldId}" style="display:block; margin-bottom:4px; font-weight:600;">${field.label}</label>
          <input type="${fieldType}" id="${fieldId}" name="${fieldId}" placeholder="${placeholder}" ${isRequired} style="width:100%; padding:8px; box-sizing:border-box; border:1px solid #ccc; border-radius:4px;">
        </div>`;
    });

    return `
      <form id="${this.formId}" style="max-width: 400px; padding: 20px; background: #fafafa; border: 1px solid #ddd; border-radius: 6px;">
        ${fieldsHtml}
        <button type="submit" style="margin-top: 10px; padding: 10px 16px; background: #007bff; color: #fff; border: none; border-radius: 4px; cursor: pointer; width: 100%;">Submit</button>
      </form>
    `;
  }

  // Mounts form into a DOM container
  render(container) {
    const targetElement = typeof container === "string" ? document.getElementById(container) : container;
    if (!targetElement) {
      console.warn(`Container element not found for FormBuilder.`);
      return;
    }

    targetElement.innerHTML = this.buildHTML();

    const formElement = document.getElementById(this.formId);
    if (formElement) {
      formElement.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = this.getFormData();
        console.log("Form Submitted Successfully:", data);

        const resultDisplay = document.getElementById("formResultDisplay");
        if (resultDisplay) {
          resultDisplay.textContent = JSON.stringify(data, null, 2);
        }
      });
    }
  }

  // Retrieves entered values as a clean JavaScript object
  getFormData() {
    const formData = {};

    this.fields.forEach((field) => {
      const fieldId = field.name || field.label.toLowerCase().replace(/\s+/g, "_");
      if (typeof document !== "undefined") {
        const input = document.getElementById(fieldId);
        formData[fieldId] = input ? input.value : "";
      } else {
        // Fallback placeholder when running in non-DOM environments
        formData[fieldId] = `[value of ${fieldId}]`;
      }
    });

    return formData;
  }
}

// Browser initialization
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const formFields = [
      { type: "text", label: "Username", name: "username", required: true },
      { type: "email", label: "Email Address", name: "email", required: true },
      { type: "password", label: "Password", name: "password", required: true },
      { type: "text", label: "City", name: "city" }
    ];

    const builder = new FormBuilder(formFields);
    builder.render("formContainer");
  });
}

// Node.js test simulation
if (typeof window === "undefined") {
  console.log("=== Node.js Test: Custom Form Builder ===");

  const sampleSchema = [
    { type: "text", label: "Username", name: "username" },
    { type: "email", label: "Email Address", name: "email" },
    { type: "password", label: "Password", name: "password" }
  ];

  const builder = new FormBuilder(sampleSchema);
  console.log("Generated Dynamic HTML Template:");
  console.log(builder.buildHTML().trim());

  console.log("\nSimulated getFormData() Output Structure:");
  console.log(builder.getFormData());
}
