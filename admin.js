// =========================================
// GOAT SHIRTS ADMIN
// ADMIN.JS
// =========================================


// =========================================
// DATA
// =========================================

let products = [];

let categories = [
    "Quotes",
    "Popular People",
    "Bible Verses",
    "Funny Scenic",
    "America"
];

let editingProductId = null;


// =========================================
// LOAD DATA
// =========================================

function loadData() {

    const savedProducts =
        localStorage.getItem("goatProducts");

    const savedCategories =
        localStorage.getItem("goatCategories");


    if (savedProducts) {

        try {
            products = JSON.parse(savedProducts);
        } catch {
            products = [];
        }

    }


    if (savedCategories) {

        try {
            categories = JSON.parse(savedCategories);
        } catch {
            categories = [
                "Quotes",
                "Popular People",
                "Bible Verses",
                "Funny Scenic",
                "America"
            ];
        }

    }

}


// =========================================
// SAVE DATA
// =========================================

function saveData() {

    localStorage.setItem(
        "goatProducts",
        JSON.stringify(products)
    );

    localStorage.setItem(
        "goatCategories",
        JSON.stringify(categories)
    );

}


// =========================================
// DASHBOARD
// =========================================

function updateDashboard() {

    const totalProducts =
        document.getElementById("totalProducts");

    const totalCategories =
        document.getElementById("totalCategories");


    if (totalProducts) {
        totalProducts.textContent =
            products.length;
    }

    if (totalCategories) {
        totalCategories.textContent =
            categories.length;
    }

}


// =========================================
// NAVIGATION
// =========================================

const navItems =
    document.querySelectorAll(".nav-item");

const sections =
    document.querySelectorAll(".admin-section");


function showSection(sectionName) {

    sections.forEach(section => {
        section.classList.remove("active");
    });


    navItems.forEach(item => {
        item.classList.remove("active");
    });


    const section =
        document.getElementById(sectionName);

    if (section) {
        section.classList.add("active");
    }


    const nav =
        document.querySelector(
            `.nav-item[data-section="${sectionName}"]`
        );

    if (nav) {
        nav.classList.add("active");
    }


    const sidebar =
        document.getElementById("sidebar");

    if (sidebar) {
        sidebar.classList.remove("open");
    }

}


// =========================================
// NAV BUTTONS
// =========================================

navItems.forEach(item => {

    item.addEventListener("click", () => {

        showSection(
            item.dataset.section
        );

    });

});


// =========================================
// QUICK ACTIONS
// =========================================

document
    .querySelectorAll("[data-section-button]")
    .forEach(button => {

        button.addEventListener("click", () => {

            showSection(
                button.dataset.sectionButton
            );

        });

    });


// =========================================
// MOBILE MENU
// =========================================

const menuButton =
    document.getElementById("menuButton");

const sidebar =
    document.getElementById("sidebar");


if (menuButton && sidebar) {

    menuButton.addEventListener("click", () => {

        sidebar.classList.toggle("open");

    });

}


// =========================================
// FORM ELEMENTS
// =========================================

const productName =
    document.getElementById("productName");

const productType =
    document.getElementById("productType");

const productPrice =
    document.getElementById("productPrice");

const productCategory =
    document.getElementById("productCategory");

const productDescription =
    document.getElementById("productDescription");

const productFrontImage =
    document.getElementById("productFrontImage");

const productBackImage =
    document.getElementById("productBackImage");

const productSizes =
    document.getElementById("productSizes");

const productColors =
    document.getElementById("productColors");

const saveProductButton =
    document.getElementById("saveProductButton");

const cancelProductButton =
    document.getElementById("cancelProductButton");

const addProductButton =
    document.getElementById("addProductButton");


// =========================================
// CLEAR FORM
// =========================================

function clearProductForm() {

    editingProductId = null;


    productName.value = "";

    productType.value = "Shirt";

    productPrice.value = "";

    productCategory.value =
        categories[0] || "";

    productDescription.value = "";

    productFrontImage.value = "";

    productBackImage.value = "";

    productSizes.value = "";

    productColors.value = "";


    saveProductButton.textContent =
        "Save Product";

}


// =========================================
// OPEN NEW PRODUCT
// =========================================

function openProductCreator() {

    showSection("products");

    clearProductForm();

    productName.focus();

}


if (addProductButton) {

    addProductButton.addEventListener(
        "click",
        openProductCreator
    );

}


// =========================================
// SAVE PRODUCT
// =========================================

function saveProduct() {

    const name =
        productName.value.trim();

    const type =
        productType.value;

    const price =
        parseFloat(productPrice.value);

    const category =
        productCategory.value;

    const description =
        productDescription.value.trim();

    const frontImage =
        productFrontImage.value.trim();

    const backImage =
        productBackImage.value.trim();


    const sizes =
        productSizes.value
            .split(",")
            .map(item => item.trim())
            .filter(Boolean);


    const colors =
        productColors.value
            .split(",")
            .map(item => item.trim())
            .filter(Boolean);


    if (!name) {

        alert(
            "Please enter a product name."
        );

        productName.focus();

        return;
    }


    if (
        isNaN(price) ||
        price < 0
    ) {

        alert(
            "Please enter a valid price."
        );

        productPrice.focus();

        return;
    }


    if (!category) {

        alert(
            "Please select a category."
        );

        return;
    }


    // =====================================
    // EDIT EXISTING PRODUCT
    // =====================================

    if (editingProductId) {

        const product =
            products.find(
                item =>
                    item.id === editingProductId
            );


        if (product) {

            product.name = name;

            product.type = type;

            product.price = price;

            product.category = category;

            product.description =
                description;

            product.frontImage =
                frontImage;

            product.backImage =
                backImage;

            product.sizes =
                sizes;

            product.colors =
                colors;

        }


        alert(
            "Product updated successfully!"
        );

    }


    // =====================================
    // CREATE NEW PRODUCT
    // =====================================

    else {

        const product = {

            id:
                Date.now().toString(),

            name,

            type,

            price,

            category,

            description,

            frontImage,

            backImage,

            sizes,

            colors,

            createdAt:
                new Date().toISOString()

        };


        products.push(product);


        alert(
            "Product saved successfully!"
        );

    }


    saveData();

    updateDashboard();

    renderProducts();

    clearProductForm();

}


// =========================================
// SAVE BUTTON
// =========================================

if (saveProductButton) {

    saveProductButton.addEventListener(
        "click",
        saveProduct
    );

}


// =========================================
// CANCEL
// =========================================

if (cancelProductButton) {

    cancelProductButton.addEventListener(
        "click",
        () => {

            clearProductForm();

            showSection("dashboard");

        }
    );

}


// =========================================
// EDIT PRODUCT
// =========================================

function editProduct(productId) {

    const product =
        products.find(
            item =>
                item.id === productId
        );


    if (!product) {
        return;
    }


    editingProductId =
        product.id;


    productName.value =
        product.name;

    productType.value =
        product.type;

    productPrice.value =
        product.price;

    productCategory.value =
        product.category;

    productDescription.value =
        product.description || "";

    productFrontImage.value =
        product.frontImage || "";

    productBackImage.value =
        product.backImage || "";

    productSizes.value =
        (product.sizes || []).join(", ");

    productColors.value =
        (product.colors || []).join(", ");


    saveProductButton.textContent =
        "Update Product";


    showSection("products");


    productName.focus();

}


// =========================================
// RENDER PRODUCTS
// =========================================

function renderProducts() {

    const productList =
        document.getElementById(
            "productList"
        );


    if (!productList) {
        return;
    }


    if (products.length === 0) {

        productList.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    +
                </div>

                <h2>
                    No Products Yet
                </h2>

                <p>
                    Add your first product above.
                </p>

            </div>

        `;

        return;
    }


    productList.innerHTML = `

        <div class="product-admin-list"></div>

    `;


    const list =
        productList.querySelector(
            ".product-admin-list"
        );


    products.forEach(product => {

        const item =
            document.createElement("div");


        item.className =
            "product-admin-item";


        item.innerHTML = `

            <div class="product-admin-info">

                <h3>
                    ${escapeHTML(product.name)}
                </h3>

                <p>
                    ${escapeHTML(product.type)}
                    •
                    $${Number(product.price).toFixed(2)}
                </p>

                <p>
                    Category:
                    ${escapeHTML(product.category)}
                </p>

            </div>


            <div class="product-admin-actions">

                <button
                    class="edit-button"
                    data-edit-product="${product.id}"
                >
                    Edit
                </button>


                <button
                    class="delete-button"
                    data-delete-product="${product.id}"
                >
                    Delete
                </button>

            </div>

        `;


        list.appendChild(item);

    });


    // EDIT BUTTONS

    document
        .querySelectorAll(
            "[data-edit-product]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    editProduct(
                        button.dataset.editProduct
                    );

                }
            );

        });


    // DELETE BUTTONS

    document
        .querySelectorAll(
            "[data-delete-product]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    deleteProduct(
                        button.dataset.deleteProduct
                    );

                }
            );

        });

}


// =========================================
// DELETE PRODUCT
// =========================================

function deleteProduct(productId) {

    const product =
        products.find(
            item =>
                item.id === productId
        );


    if (!product) {
        return;
    }


    const confirmed =
        confirm(
            `Delete "${product.name}"?`
        );


    if (!confirmed) {
        return;
    }


    products =
        products.filter(
            item =>
                item.id !== productId
        );


    saveData();

    updateDashboard();

    renderProducts();

}


// =========================================
// CATEGORY LIST
// =========================================

function renderCategories() {

    const categoryList =
        document.getElementById(
            "categoryList"
        );


    if (!categoryList) {
        return;
    }


    categoryList.innerHTML = "";


    categories.forEach(category => {

        const item =
            document.createElement("div");


        item.className =
            "category-item";


        item.innerHTML = `

            <span>
                ${escapeHTML(category)}
            </span>

        `;


        categoryList.appendChild(item);

    });

}


// =========================================
// HTML SAFETY
// =========================================

function escapeHTML(value) {

    const div =
        document.createElement("div");


    div.textContent =
        value;


    return div.innerHTML;

}


// =========================================
// START ADMIN
// =========================================

loadData();

saveData();

updateDashboard();

renderProducts();

renderCategories();