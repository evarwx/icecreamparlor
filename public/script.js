let cart = [];


// ==========================================
// LOAD MENU FROM FASTAPI
// ==========================================

async function loadMenu() {

    const menuContainer =
        document.getElementById("menu-container");


    try {

        const response =
            await fetch("/api/menu");


        if (!response.ok) {

            throw new Error(
                "Failed to load menu"
            );

        }


        const data =
            await response.json();


        menuContainer.innerHTML = "";


        data.items.forEach(item => {

            const card =
                document.createElement("div");


            card.className =
                "icecream-card";


            card.innerHTML = `

                <div class="icecream-image">

                    ${getIceCreamIcon(item.id)}

                </div>


                <h3>
                    ${item.name}
                </h3>


                <p>
                    ${item.description}
                </p>


                <div class="product-bottom">

                    <span class="price">
                        ₹${item.price}
                    </span>


                    <button
                        onclick="
                            addToCart(
                                '${item.name}',
                                ${item.price}
                            )
                        "
                    >
                        Add
                    </button>

                </div>

            `;


            menuContainer.appendChild(card);

        });


    } catch (error) {

        console.error(
            "Menu loading error:",
            error
        );


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

        price: price

    });


    updateCart();


    alert(
        `${name} added to cart!`
    );

}


// ==========================================
// UPDATE CART COUNT
// ==========================================

function updateCart() {

    const cartCount =
        document.getElementById(
            "cart-count"
        );


    cartCount.textContent =
        cart.length;

}


// ==========================================
// SHOW CART
// ==========================================

function showCart() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    let message =
        "Your Cart:\n\n";


    let total = 0;


    cart.forEach((item, index) => {

        message +=
            `${index + 1}. ${item.name} - ₹${item.price}\n`;


        total += item.price;

    });


    message +=
        `\nTotal: ₹${total}`;


    alert(message);

}


// ==========================================
// CONTACT
// ==========================================

function showMessage() {

    alert(
        "Thank you for contacting Sweet Scoop!"
    );

}


// ==========================================
// START APPLICATION
// ==========================================

loadMenu();