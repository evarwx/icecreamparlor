let cart = [];

// ==========================================
// LOAD MENU FROM FASTAPI
// ==========================================

async function loadMenu() {
    const menuContainer = document.getElementById("menu-container");

    if (!menuContainer) {
        console.error("menu-container not found");
        return;
    }

    try {
        const response = await fetch("/api/menu");

        if (!response.ok) {
            throw new Error("Failed to load menu");
        }

        const data = await response.json();

        menuContainer.innerHTML = "";

        if (!data.items || data.items.length === 0) {
            menuContainer.innerHTML = `
                <p class="loading">
                    No ice creams available.
                </p>
            `;
            return;
        }

        data.items.forEach(item => {
            const card = document.createElement("div");

            card.className = "icecream-card";

            card.innerHTML = `
                <div class="icecream-image">
                    ${getIceCreamIcon(item.id)}
                </div>

                <h3>${item.name}</h3>

                <p>${item.description}</p>

                <div class="product-bottom">

                    <span class="price">
                        ₹${item.price}
                    </span>

                    <button class="add-button">
                        Add
                    </button>

                </div>
            `;

            const addButton = card.querySelector(".add-button");

            addButton.addEventListener("click", () => {
                addToCart(item.name, item.price);
            });

            menuContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Menu loading error:", error);

        menuContainer.innerHTML = `
            <p class="loading">
                Unable to load menu.
                Please try again.
            </p>
        `;
    }
}


// ==========================================
// ICE CREAM ICON
// ==========================================

function getIceCreamIcon(id) {
    const icons = {
        1: "🍦",
        2: "🍓",
        3: "🍫",
        4: "🥭"
    };

    return icons[id] || "🍨";
}


// ==========================================
// ADD TO CART
// ==========================================

function addToCart(name, price) {

    cart.push({
        name: name,
        price: Number(price)
    });

    updateCart();

    alert(`${name} added to cart!`);
}


// ==========================================
// UPDATE CART COUNT
// ==========================================

function updateCart() {

    const cartCount =
        document.getElementById("cart-count");

    if (!cartCount) {
        return;
    }

    cartCount.textContent = cart.length;
}


// ==========================================
// SHOW CART
// ==========================================

function showCart() {

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    let message = "Your Cart:\n\n";
    let total = 0;

    cart.forEach((item, index) => {

        message +=
            `${index + 1}. ${item.name} - ₹${item.price}\n`;

        total += Number(item.price);
    });

    message += `\nTotal: ₹${total}`;

    alert(message);
}


// ==========================================
// CONTACT MESSAGE
// ==========================================

function showMessage() {

    alert(
        "Thank you for contacting Sweet Scoop!"
    );
}


// ==========================================
// CLEAR CART
// ==========================================

function clearCart() {

    if (cart.length === 0) {
        alert("Your cart is already empty.");
        return;
    }

    cart = [];

    updateCart();

    alert("Cart cleared!");
}


// ==========================================
// START APPLICATION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    loadMenu();

    updateCart();

});