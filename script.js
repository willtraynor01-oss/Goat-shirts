// =========================
// Load Product
// =========================

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

let currentProduct = null;

if (typeof products !== "undefined" && productId && products[productId]) {

    currentProduct = products[productId];

    const productName = document.getElementById("productName");
    const productPrice = document.getElementById("productPrice");
    const productDescription = document.getElementById("productDescription");
    const mainImage = document.getElementById("mainImage");

    if (productName) productName.textContent = currentProduct.name;
    if (productPrice) productPrice.textContent = "$" + currentProduct.price.toFixed(2);
    if (productDescription) productDescription.textContent = currentProduct.description;
    if (mainImage) mainImage.src = currentProduct.front;
}
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

const productSection = document.querySelector(".product-details");

 if (!currentProduct) {
    alert("Product not found.");
    return;
}

const product = {
    id: currentProduct.id,
    name: currentProduct.name,
    price: currentProduct.price,
    image: currentProduct.front,
    quantity: 1
};
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingProduct = cart.find(item => item.name === product.name);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push(product);
        }

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
              <div class="cart-controls">

    <button onclick="changeQuantity(${index}, -1)">−</button>

    <span>${item.quantity}</span>

    <button onclick="changeQuantity(${index}, 1)">+</button>

</div>

<button onclick="removeItem(${index})">
    Remove
</button>   
                </div>
            </div>
        `;
    });

    cartTotal.textContent = "$" + total.toFixed(2);

}
function removeItem(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();

}
 function changeQuantity(index, amount) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();

}
// =========================
// Cart Counter
// =========================

function updateCartCount() {
    const cartLink = document.getElementById("cartLink");
    if (!cartLink) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const count = cart.reduce((total, item) => total + item.quantity, 0);

    cartLink.textContent = `Cart (${count})`;
}

updateCartCount();