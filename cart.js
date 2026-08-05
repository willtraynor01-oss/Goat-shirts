let cart = JSON.parse(localStorage.getItem("goatCart")) || [];

function saveCart() {
    localStorage.setItem("goatCart", JSON.stringify(cart));
}

function addToCart(product) {
    cart.push(product);
    saveCart();

    alert(product.name + " added to cart!");
}