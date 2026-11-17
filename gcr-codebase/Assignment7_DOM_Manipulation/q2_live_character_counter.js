/**
 * Assignment 7 - Question 2: Live Character Counter with Warning Behavior
 * 
 * Features:
 * - Shows remaining characters (max 100 characters).
 * - Turns counter yellow at 20 characters left.
 * - Turns red at 0 characters left and prevents further typing using preventDefault().
 * - Reset button clears everything and resets counter state.
 */

document.addEventListener("DOMContentLoaded", () => {
    const textarea = document.getElementById("message-input");
    const counterBadge = document.getElementById("counter");
    const resetBtn = document.getElementById("reset-btn");
    const MAX_LIMIT = 100;

    function updateCounter() {
        const currentLength = textarea.value.length;
        const remaining = MAX_LIMIT - currentLength;

        counterBadge.textContent = `Remaining: ${remaining}`;

        // Reset classes
        counterBadge.classList.remove("warning", "danger");

        if (remaining <= 0) {
            counterBadge.classList.add("danger");
        } else if (remaining <= 20) {
            counterBadge.classList.add("warning");
        }
    }

    // 1. Prevent additional keystrokes when at or over limit
    textarea.addEventListener("keydown", (e) => {
        // Allow navigation/editing keys: Backspace, Delete, Arrow keys, Tab, Copy/Paste shortcuts
        const allowedKeys = [
            "Backspace", "Delete", "ArrowLeft", "ArrowRight", 
            "ArrowUp", "ArrowDown", "Tab"
        ];
        const isShortcut = (e.ctrlKey || e.metaKey) && ["a", "c", "v", "x"].includes(e.key.toLowerCase());

        if (allowedKeys.includes(e.key) || isShortcut) {
            return; // Allow control keys even at limit
        }

        // If limit is reached and user has not selected text to replace, preventDefault()
        const selectedLength = textarea.selectionEnd - textarea.selectionStart;
        if (textarea.value.length >= MAX_LIMIT && selectedLength === 0) {
            e.preventDefault(); // Stop typing!
        }
    });

    // 2. Handle pasted text or input changes
    textarea.addEventListener("input", () => {
        if (textarea.value.length > MAX_LIMIT) {
            // Trim pasted overflow
            textarea.value = textarea.value.slice(0, MAX_LIMIT);
        }
        updateCounter();
    });

    // 3. Reset button
    resetBtn.addEventListener("click", () => {
        textarea.value = "";
        updateCounter();
        textarea.focus();
    });

    // Initialize display
    updateCounter();
});
