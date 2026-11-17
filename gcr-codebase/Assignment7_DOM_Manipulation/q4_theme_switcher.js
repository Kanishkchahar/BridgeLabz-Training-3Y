/**
 * Assignment 7 - Question 4: Theme Switcher Using Attribute Manipulation
 * 
 * Features:
 * - 3 themes: Light, Dark, Blue.
 * - Clicking a button adds a class to <body>.
 * - All themes MUST be applied using setAttribute().
 * - Save current theme in custom attribute: data-theme="dark" (or "light" / "blue").
 */

document.addEventListener("DOMContentLoaded", () => {
    const themeButtons = document.querySelectorAll(".theme-btn");
    const statusText = document.getElementById("theme-status");

    function applyTheme(themeName) {
        // 1. Add corresponding class to <body> strictly using setAttribute()
        document.body.setAttribute("class", `theme-${themeName}`);

        // 2. Save current theme into custom data attribute strictly using setAttribute()
        document.body.setAttribute("data-theme", themeName);

        // Update display text
        statusText.innerHTML = `Active theme: <strong>${themeName}</strong> | Attribute: <code>data-theme="${themeName}"</code>`;

        console.log(`Theme set to: ${themeName}`);
        console.log(`body class attribute: ${document.body.getAttribute("class")}`);
        console.log(`body data-theme attribute: ${document.body.getAttribute("data-theme")}`);
    }

    // Attach click listeners to theme switcher buttons
    themeButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const targetTheme = btn.getAttribute("data-target-theme");
            applyTheme(targetTheme);
        });
    });
});
