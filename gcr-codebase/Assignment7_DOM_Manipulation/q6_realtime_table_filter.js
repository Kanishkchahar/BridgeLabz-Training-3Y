/**
 * Assignment 7 - Question 6: Real-Time Table Filter Using input Event
 * 
 * Features:
 * - Table of students (Name, Branch, CGPA).
 * - Real-time filtering as user types using the `input` event.
 * - Matching is completely case-insensitive.
 * - Hides non-matching rows.
 * - Displays "No results found" if all rows are hidden.
 */

document.addEventListener("DOMContentLoaded", () => {
    const searchBox = document.getElementById("search-box");
    const tableBody = document.getElementById("students-tbody");
    const rows = tableBody.querySelectorAll("tr");
    const noResultsMsg = document.getElementById("no-results-msg");

    searchBox.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        let visibleCount = 0;

        rows.forEach((row) => {
            // Get combined text content of the row
            const rowText = row.textContent.toLowerCase();

            if (rowText.includes(query)) {
                row.style.display = ""; // restore default display
                visibleCount++;
            } else {
                row.style.display = "none"; // hide row
            }
        });

        // Toggle "No results found" message
        if (visibleCount === 0) {
            noResultsMsg.style.display = "block";
        } else {
            noResultsMsg.style.display = "none";
        }
    });
});
