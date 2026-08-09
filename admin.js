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

            products =
                JSON.parse(savedProducts);

        } catch (error) {

            products = [];

        }

    }


    if (savedCategories) {

        try {

            categories =
                JSON.parse(savedCategories);

        } catch (error) {

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
// DASHBOARD COUNTERS
// =========================================

function updateDashboard() {

    const totalProducts =
        document.getElementById(
            "totalProducts"
        );


    const totalCategories =
        document.getElementById(
            "totalCategories"
        );


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
    document.querySelectorAll(
        ".nav-item"
    );


const sections =
    document.querySelectorAll(
        ".admin-section"
    );


function showSection(sectionName) {

    sections.forEach(section => {

        section.classList.remove(
            "active"
        );

    });


    navItems.forEach(item => {

        item.classList.remove(
            "active"
        );

    });


    const selectedSection =
        document.getElementById(
            sectionName
        );


    if (selectedSection) {

        selectedSection.classList.add(
            "active"
        );

    }


    const selectedNav =
        document.querySelector(
            `.nav-item[data-section="${sectionName}"]`
        );


    if (selectedNav) {

        selectedNav.classList.add(
            "active"
        );

    }


    const sidebar =
        document.getElementById(
            "sidebar"
        );


    if (sidebar) {

        sidebar.classList.remove(
            "open"
        );

    }

}


// =========================================
// NAVIGATION BUTTONS
// =========================================

navItems.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            showSection(
                item.dataset.section
            );

        }
    );

});


// =========================================
// QUICK ACTIONS
// =========================================

const sectionButtons =
    document.querySelectorAll(
        "[data-section-button]"
    );


sectionButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            showSection(
                button.dataset.sectionButton
            );

        }
    );

});


// =========================================
// MOBILE MENU
// =========================================

const menuButton =
    document.getElementById(
        "menuButton"
    );


const sidebar =
    document.getElementById(
        "sidebar"
    );


if (menuButton && sidebar) {

    menuButton.addEventListener(
        "click",
        () => {

            sidebar.classList.toggle(
                "open"
            );

        }
    );

}


// =========================================
// PRODUCT FORM ELEMENTS
// =========================================

const productName =
    document.getElementById(
        "productName"
    );


const productType =
    document.getElementById(
        "productType"
    );


const productPrice =
    document.getElementById(
        "productPrice"
    );


const productCategory =
    document.getElementById(
        "productCategory"
    );


const productDescription =
    document.getElementById(
        "productDescription"
    );


const productFrontImage =
    document.getElementById(
        "productFrontImage"
    );


const productBackImage =
    document.getElementById(
        "productBackImage"
    );


const productSizes =
    document.getElementById(
        "productSizes"
    );


const productColors =
    document.getElementById(
        "productColors"
    );


const saveProductButton =
    document.getElementById(
        "saveProductButton"
    );


const cancelProductButton =
    document.getElementById(
        "cancelProductButton"
    );


const addProductButton =
    document.getElementById(
        "addProductButton"
    );


// =========================================
// CLEAR PRODUCT FORM
// =========================================

function clearProductForm() {

    if (productName) {
        productName.value = "";
    }


    if (productType) {
        productType.value = "Shirt";
    }


    if (productPrice) {
        productPrice.value = "";
    }


    if (productCategory) {

        productCategory.value =
            categories[0] || "";

    }


    if (productDescription) {
        productDescription.value = "";
    }


    if (productFrontImage) {
        productFrontImage.value = "";
    }


    if (productBackImage) {
        productBackImage.value = "";
    }


    if (productSizes) {
        productSizes.value = "";
    }


    if (productColors) {
        productColors.value = "";
    }

}


// =========================================
// OPEN PRODUCT CREATOR
// =========================================

function openProductCreator() {

    showSection("products");

    clearProductForm();

    if (productName) {

        setTimeout(() => {

            productName.focus();

        }, 100);

    }

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
        parseFloat(
            productPrice.value
        );


    const category =
        productCategory.value;


    const description =
        productDescription.value.trim();


    const frontImage =
        productFrontImage.value.trim();


    const backImage =
        productBackImage.value.trim();


    const sizesText =
        productSizes.value.trim();


    const colorsText =
        productColors.value.trim();


    // -----------------------------
    // VALIDATION
    // -----------------------------

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


    // -----------------------------
    // CONVERT SIZES & COLORS
    // -----------------------------

    const sizes =
        sizesText
            ? sizesText
                .split(",")
                .map(item =>
                    item.trim()
                )
                .filter(Boolean)
            : [];


    const colors =
        colorsText
            ? colorsText
                .split(",")
                .map(item =>
                    item.trim()
                )
                .filter(Boolean)
            : [];


    // -----------------------------
    // CREATE PRODUCT
    // -----------------------------

    const product = {

        id:
            Date.now().toString(),

        name: name,

        type: type,

        price: price,

        category: category,

        description: description,

        frontImage: frontImage,

        backImage: backImage,

        sizes: sizes,

        colors: colors,

        createdAt:
            new Date().toISOString()

    };


    // -----------------------------
    // ADD PRODUCT
    // -----------------------------

    products.push(product);


    saveData();

    updateDashboard();

    renderProducts();


    // -----------------------------
    // RESET
    // -----------------------------

    clearProductForm();


    alert(
        "Product saved successfully!"
    );

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
// CANCEL BUTTON
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


    productList.innerHTML = "";


    products.forEach(product => {

        const productCard =
            document.createElement(
                "div"
            );


        productCard.className =
            "product-admin-item";


        productCard.innerHTML = `

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
                    class="secondary-button"
                    data-delete-product="${product.id}"
                >
                    Delete
                </button>

            </div>

        `;


        productList.appendChild(
            productCard
        );

    });


    // -----------------------------
    // DELETE BUTTONS
    // -----------------------------

    const deleteButtons =
        document.querySelectorAll(
            "[data-delete-product]"
        );


    deleteButtons.forEach(button => {

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
            document.createElement(
                "div"
            );


        item.className =
            "category-item";


        item.innerHTML = `

            <span>
                ${escapeHTML(category)}
            </span>

        `;


        categoryList.appendChild(
            item
        );

    });

}


// =========================================
// ESCAPE HTML
// =========================================

function escapeHTML(value) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        value;


    return div.innerHTML;

}


// =========================================
// INITIALIZE
// =========================================

loadData();

saveData();

updateDashboard();

renderProducts();

renderCategories();