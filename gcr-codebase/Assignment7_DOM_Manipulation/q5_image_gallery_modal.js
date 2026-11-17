/**
 * Assignment 7 - Question 5: Image Gallery with Modal Preview
 * 
 * Features:
 * - Image grid (6 images).
 * - Clicking any image shows a modal popup with a bigger version of the clicked image.
 * - Clicking outside modal closes the modal.
 * - Uses event.stopPropagation() so clicking inside the modal card does NOT close it.
 */

document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("gallery");
    const modalOverlay = document.getElementById("modal-overlay");
    const modalCard = document.getElementById("modal-card");
    const modalImg = document.getElementById("modal-img");
    const modalCaption = document.getElementById("modal-caption");
    const btnClose = document.getElementById("btn-close");

    // Open modal with specific image details
    function openModal(imgSrc, caption) {
        modalImg.src = imgSrc;
        modalCaption.textContent = caption;
        modalOverlay.classList.add("open");
    }

    // Close modal
    function closeModal() {
        modalOverlay.classList.remove("open");
        modalImg.src = "";
        modalCaption.textContent = "";
    }

    // 1. Open modal on clicking gallery items
    gallery.addEventListener("click", (e) => {
        const item = e.target.closest(".gallery-item");
        if (!item) return;

        const img = item.querySelector("img");
        const caption = item.dataset.caption || img.alt;
        openModal(img.src, caption);
    });

    // 2. Click outside the modal content (i.e. on overlay) closes modal
    modalOverlay.addEventListener("click", () => {
        closeModal();
    });

    // 3. STOP PROPAGATION on modal card so clicks inside do NOT trigger overlay click
    modalCard.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevents click event from bubbling up to modalOverlay
    });

    // Close button
    btnClose.addEventListener("click", () => {
        closeModal();
    });

    // ESC key closes modal
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modalOverlay.classList.contains("open")) {
            closeModal();
        }
    });
});
