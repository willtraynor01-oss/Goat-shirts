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

        const existingProduct = cart.find(item => item.id === product.id);
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
const searchInput = document.getElementById("productSearch");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const search = this.value.toLowerCase();

        const products = document.querySelectorAll(".product-card");

        products.forEach(product => {

            const name = product.dataset.name.toLowerCase();

            if (name.includes(search)) {

                product.style.display = "";

            } else {

                product.style.display = "none";

            }

        });

    });

}
// =========================
// Site-Wide Search
// =========================

const siteSearch = document.getElementById("siteSearch");
const searchResults = document.getElementById("searchResults");
const noResults = document.getElementById("noResults");

if (siteSearch && searchResults && noResults && typeof products !== "undefined") {

    function displaySearchResults(searchTerm = "") {

        searchResults.innerHTML = "";

        const search = searchTerm.toLowerCase().trim();

        let foundProducts = 0;

        Object.values(products).forEach(product => {

            const productName = product.name.toLowerCase();
            const productDescription = product.description.toLowerCase();

            if (
                search === "" ||
                productName.includes(search) ||
                productDescription.includes(search)
            ) {

                foundProducts++;

                searchResults.innerHTML += `
                    <article class="product-card">

                        <div class="shirt-image">
                            <img
                                src="${product.front}"
                                alt="${product.name}"
                            >
                        </div>

                        <h3>${product.name}</h3>

                        <p>$${product.price.toFixed(2)}</p>

                        <a href="product.html?id=${product.id}">
                            View Product
                        </a>

                    </article>
                `;
            }
        });

        if (foundProducts === 0) {
            noResults.style.display = "block";
        } else {
            noResults.style.display = "none";
        }
    }

    displaySearchResults();

    siteSearch.addEventListener("input", function () {
        displaySearchResults(this.value);
    });
}
