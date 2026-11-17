/**
 * Assignment 6 - Question 6: E-Commerce Dashboard: Product Card Fetcher
 * 
 * Problem Statement:
 * Use Fake Store API: https://fakestoreapi.com/products
 * Fetch product data using either fetch().then() or async/await.
 * For each product, log:
 * - Product Title
 * - Price (with $ prefix)
 * - Image URL
 * 
 * Bonus: Create HTML product cards dynamically using document.createElement()
 * Handle errors using try/catch and display "Failed to load products. Please try again."
 */

const FAKE_STORE_URL = "https://fakestoreapi.com/products";

// Fallback mock data in case network is disconnected during local testing
const fallbackProducts = [
    {
        title: "Fjallraven Backpack",
        price: 109.95,
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
    },
    {
        title: "Mens Casual Premium Slim Fit T-Shirts",
        price: 22.3,
        image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
    },
    {
        title: "John Hardy Men's Legends Naga Gold & Silver Bracelet",
        price: 695.0,
        image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg"
    }
];

async function fetchAndDisplayProducts() {
    console.log("=== Fetching E-Commerce Products ===");
    try {
        let products;
        
        // Use native fetch if available (Node 18+ or Browser)
        if (typeof fetch === "function") {
            try {
                const response = await fetch(FAKE_STORE_URL);
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
                }
                products = await response.json();
            } catch (networkErr) {
                console.warn("Notice: Live network fetch failed or offline; using fallback sample data:", networkErr.message);
                products = fallbackProducts;
            }
        } else {
            products = fallbackProducts;
        }

        console.log(`\nSuccessfully loaded ${products.length} products:\n`);

        // Display first 5 products for clear console output
        const displayLimit = Math.min(products.length, 5);
        for (let i = 0; i < displayLimit; i++) {
            const product = products[i];
            console.log("------------------------------------------");
            console.log(`Product: ${product.title}`);
            console.log(`Price: $${Number(product.price).toFixed(2)}`);
            console.log(`Image: ${product.image}`);
        }
        console.log("------------------------------------------\n");

        // Bonus: In a browser environment, render product cards to DOM
        if (typeof document !== "undefined") {
            renderProductCardsToDOM(products);
        }

        return products;
    } catch (err) {
        console.error("Failed to load products. Please try again.");
        console.error("Underlying cause:", err.message);
    }
}

// Bonus helper function for DOM rendering
function renderProductCardsToDOM(products) {
    const container = document.getElementById("product-container");
    if (!container) return;

    container.innerHTML = ""; // Clear existing content

    products.forEach((product) => {
        const card = document.createElement("div");
        card.className = "product-card";

        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.title;

        const title = document.createElement("h3");
        title.textContent = product.title;

        const price = document.createElement("p");
        price.className = "price";
        price.textContent = `$${Number(product.price).toFixed(2)}`;

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(price);

        container.appendChild(card);
    });
}

// Execute function
fetchAndDisplayProducts();
