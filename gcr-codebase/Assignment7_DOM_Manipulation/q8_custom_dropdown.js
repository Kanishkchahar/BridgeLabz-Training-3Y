/**
 * Assignment 7 - Question 8: Custom Dropdown Using Only JavaScript (No <select> Tag)
 * 
 * Features:
 * - A button toggles options open/closed.
 * - Clicking an option updates the button text and selected value.
 * - Clicking outside closes the dropdown.
 * - Explicitly uses the CAPTURING PHASE (`{ capture: true }` or `useCapture = true`)
 *   for the click-outside closing mechanism.
 */

document.addEventListener("DOMContentLoaded", () => {
    const dropdownWrapper = document.getElementById("dropdown-wrapper");
    const dropdownToggle = document.getElementById("dropdown-toggle");
    const dropdownMenu = document.getElementById("dropdown-menu");
    const selectedText = document.getElementById("selected-text");
    const selectedLog = document.getElementById("selected-log");

    // Toggle dropdown open/close on button click
    dropdownToggle.addEventListener("click", (e) => {
        dropdownWrapper.classList.toggle("open");
    });

    // Selecting an option updates button text and closes menu
    dropdownMenu.addEventListener("click", (e) => {
        const item = e.target.closest(".dropdown-item");
        if (!item) return;

        const value = item.dataset.value || item.textContent;
        selectedText.textContent = value;
        selectedLog.innerHTML = `Selected: <strong style="color: #2563eb;">${value}</strong>`;

        // Close dropdown
        dropdownWrapper.classList.remove("open");
    });

    /**
     * Requirement: Use CAPTURING PHASE for the closing mechanism.
     * Passing `true` as the third parameter to `addEventListener` ensures the listener
     * executes during the capture phase (top-down from Window/Document towards the target),
     * intercepting the click before it reaches bubbling targets.
     */
    document.addEventListener("click", (e) => {
        // If the click occurs outside the dropdown wrapper and dropdown is open, close it
        if (!dropdownWrapper.contains(e.target) && dropdownWrapper.classList.contains("open")) {
            console.log("[Capturing Phase] Clicked outside dropdown -> closing menu.");
            dropdownWrapper.classList.remove("open");
        }
    }, true /* <--- USE CAPTURE = TRUE */);
});
