/**
 * Assignment 7 - Question 7: Detect Mouse Path & Coordinates Logger
 * 
 * Features:
 * - 400x400 px box.
 * - Tracks mouse movements inside the box.
 * - Displays live clientX and clientY (as well as relative box offset coordinates).
 * - On double-click (dblclick) inside the box, drops a red dot at that exact click position.
 */

document.addEventListener("DOMContentLoaded", () => {
    const box = document.getElementById("tracking-box");
    const clientCoordsBadge = document.getElementById("client-coords");
    const offsetCoordsBadge = document.getElementById("offset-coords");

    // 1. Live mousemove tracking
    box.addEventListener("mousemove", (e) => {
        // clientX and clientY relative to viewport
        clientCoordsBadge.textContent = `clientX: ${e.clientX} | clientY: ${e.clientY}`;

        // Relative box offset coordinates
        const rect = box.getBoundingClientRect();
        const offsetX = Math.round(e.clientX - rect.left);
        const offsetY = Math.round(e.clientY - rect.top);
        offsetCoordsBadge.textContent = `Box X: ${offsetX}px | Box Y: ${offsetY}px`;
    });

    // 2. Drop red dot on double-click
    box.addEventListener("dblclick", (e) => {
        const rect = box.getBoundingClientRect();
        const posX = e.clientX - rect.left;
        const posY = e.clientY - rect.top;

        const dot = document.createElement("div");
        dot.className = "red-dot";
        dot.style.left = `${posX}px`;
        dot.style.top = `${posY}px`;

        box.appendChild(dot);
    });

    // Reset coordinates display when mouse leaves the tracking box
    box.addEventListener("mouseleave", () => {
        clientCoordsBadge.textContent = "clientX: -- | clientY: --";
        offsetCoordsBadge.textContent = "Box X: -- | Box Y: --";
    });
});
