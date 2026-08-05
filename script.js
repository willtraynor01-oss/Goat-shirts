// =========================
// Mobile Menu
// =========================

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");

if (menuButton && navMenu) {
    menuButton.addEventListener("click", () => {
        if (navMenu.style.display === "flex") {
            navMenu.style.display = "none";
        } else {
            navMenu.style.display = "flex";
            navMenu.style.flexDirection = "column";
            navMenu.style.position = "absolute";
            navMenu.style.top = "80px";
            navMenu.style.left = "0";
            navMenu.style.width = "100%";
            navMenu.style.background = "#000";
            navMenu.style.padding = "20px";
            navMenu.style.gap = "20px";
        }
    });
}

// =========================
// Add To Cart
// =========================

const addToCartButton = document.getElementById("addToCart");

if (addToCartButton) {
    addToCartButton.addEventListener("click", () => {

        const product = {
            name: "Sample Shirt",
            price: 24.99,
            quantity: 1
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push(product);

        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Added to cart!");

    });
}
// =========================
// Display Cart
// =========================

const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

if (cartItems && cartTotal) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div class="cart-info">
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <button onclick="removeItem(${index})">
                        Remove
                    </button>
                </div>
            </div>
        `;
    });

    cartTotal.textContent = "$" + total.toFixed(2);

}