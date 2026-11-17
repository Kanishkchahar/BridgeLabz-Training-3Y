/**
 * Assignment 7 - Question 1: Dynamic Product List Manager
 * 
 * Features:
 * - User can add new products using an input box.
 * - Each product appears with Edit and Delete buttons.
 * - Editing allows inline text editing.
 * - Uses EVENT DELEGATION on parent <ul> for Edit and Delete handling.
 * - Auto-saves when user clicks outside the item being edited.
 */

document.addEventListener("DOMContentLoaded", () => {
    const productInput = document.getElementById("new-product-input");
    const addBtn = document.getElementById("add-product-btn");
    const productList = document.getElementById("product-list");
    const emptyNotice = document.getElementById("empty-notice");

    // Tracks currently active inline edit row, if any
    let activeEditingLi = null;

    // Helper to toggle empty notice visibility
    function updateEmptyNotice() {
        emptyNotice.style.display = productList.children.length === 0 ? "block" : "none";
    }

    // Function to add a product item
    function addProduct(name) {
        const trimmed = name.trim();
        if (!trimmed) {
            alert("Please enter a valid product name.");
            return;
        }

        const li = document.createElement("li");
        li.dataset.id = Date.now().toString();

        li.innerHTML = `
            <span class="product-text">${trimmed}</span>
            <div class="actions">
                <button class="btn-edit" data-action="edit">Edit</button>
                <button class="btn-delete" data-action="delete">Delete</button>
            </div>
        `;

        productList.appendChild(li);
        productInput.value = "";
        productInput.focus();
        updateEmptyNotice();
    }

    // Function to switch an item into inline edit mode
    function enterEditMode(li) {
        // If another item was being edited, save it first
        if (activeEditingLi && activeEditingLi !== li) {
            saveEdit(activeEditingLi);
        }

        const textSpan = li.querySelector(".product-text");
        if (!textSpan) return; // already in edit mode

        const currentText = textSpan.textContent;
        const input = document.createElement("input");
        input.type = "text";
        input.className = "edit-input";
        input.value = currentText;

        const editBtn = li.querySelector('[data-action="edit"]');
        if (editBtn) {
            editBtn.textContent = "Save";
            editBtn.dataset.action = "save";
            editBtn.className = "btn-save";
        }

        li.replaceChild(input, textSpan);
        input.focus();
        activeEditingLi = li;

        // Pressing Enter saves immediately
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                saveEdit(li);
            }
        });
    }

    // Function to save inline edit
    function saveEdit(li) {
        if (!li) return;
        const input = li.querySelector(".edit-input");
        if (!input) return;

        const updatedValue = input.value.trim() || "Untitled Product";
        const span = document.createElement("span");
        span.className = "product-text";
        span.textContent = updatedValue;

        const saveBtn = li.querySelector('[data-action="save"]');
        if (saveBtn) {
            saveBtn.textContent = "Edit";
            saveBtn.dataset.action = "edit";
            saveBtn.className = "btn-edit";
        }

        li.replaceChild(span, input);
        if (activeEditingLi === li) {
            activeEditingLi = null;
        }
    }

    // 1. Add product button event
    addBtn.addEventListener("click", () => addProduct(productInput.value));
    productInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") addProduct(productInput.value);
    });

    // 2. EVENT DELEGATION on parent <ul> for Edit / Save / Delete
    productList.addEventListener("click", (e) => {
        const target = e.target;
        const action = target.dataset.action;
        const li = target.closest("li");
        if (!li) return;

        if (action === "delete") {
            li.remove();
            if (activeEditingLi === li) activeEditingLi = null;
            updateEmptyNotice();
        } else if (action === "edit") {
            enterEditMode(li);
        } else if (action === "save") {
            saveEdit(li);
        }
    });

    // 3. Auto-save when clicking outside the currently edited item
    document.addEventListener("click", (e) => {
        if (activeEditingLi && !activeEditingLi.contains(e.target)) {
            saveEdit(activeEditingLi);
        }
    });

    // Initial state
    updateEmptyNotice();
});
