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
let editingFrontImage = "";
let editingBackImage = "";
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
        } catch {
            products = [];
        }
    }
    if (savedCategories) {
        try {
            categories =
                JSON.parse(savedCategories);
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
// NAV BUTTONS
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
document
    .querySelectorAll(
        "[data-section-button]"
    )
    .forEach(button => {
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
const frontImagePreview =
    document.getElementById(
        "frontImagePreview"
    );
const backImagePreview =
    document.getElementById(
        "backImagePreview"
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
// CATEGORY FORM ELEMENTS
// =========================================
const categoryName =
    document.getElementById(
        "categoryName"
    );
const addCategoryButton =
    document.getElementById(
        "addCategoryButton"
    );
// =========================================
// IMAGE FILE READER
// =========================================
function readImageFile(
    file,
    callback
) {
    if (!file) {
        callback("");
        return;
    }
    if (
        !file.type.startsWith(
            "image/"
        )
    ) {
        alert(
            "Please select an image file."
        );
        callback("");
        return;
    }
    const reader =
        new FileReader();
    reader.onload =
        function () {
            callback(
                reader.result
            );
        };
    reader.onerror =
        function () {
            alert(
                "Could not read the image."
            );
            callback("");
        };
    reader.readAsDataURL(
        file
    );
}
// =========================================
// IMAGE PREVIEW
// =========================================
function showImagePreview(
    container,
    imageData
) {
    if (!container) {
        return;
    }
    container.innerHTML =
        "";
    if (!imageData) {
        return;
    }
    const image =
        document.createElement(
            "img"
        );
    image.src =
        imageData;
    image.alt =
        "Product image preview";
    image.style.maxWidth =
        "250px";
    image.style.maxHeight =
        "250px";
    image.style.marginTop =
        "10px";
    image.style.borderRadius =
        "8px";
    container.appendChild(
        image
    );
}
// =========================================
// FRONT IMAGE SELECTED
// =========================================
if (productFrontImage) {
    productFrontImage.addEventListener(
        "change",
        function () {
            const file =
                this.files[0];
            readImageFile(
                file,
                function (imageData) {
                    editingFrontImage =
                        imageData;
                    showImagePreview(
                        frontImagePreview,
                        imageData
                    );
                }
            );
        }
    );
}
// =========================================
// BACK IMAGE SELECTED
// =========================================
if (productBackImage) {
    productBackImage.addEventListener(
        "change",
        function () {
            const file =
                this.files[0];
            readImageFile(
                file,
                function (imageData) {
                    editingBackImage =
                        imageData;
                    showImagePreview(
                        backImagePreview,
                        imageData
                    );
                }
            );
        }
    );
}
// =========================================
// UPDATE CATEGORY DROPDOWN
// =========================================
function updateCategoryDropdown() {
    if (!productCategory) {
        return;
    }
    productCategory.innerHTML =
        "";
    categories.forEach(category => {
        const option =
            document.createElement(
                "option"
            );
        option.value =
            category;
        option.textContent =
            category;
        productCategory.appendChild(
            option
        );
    });
}
// =========================================
// CLEAR PRODUCT FORM
// =========================================
function clearProductForm() {
    editingProductId = null;
    editingFrontImage = "";
    editingBackImage = "";
    productName.value = "";
    productType.value =
        "Shirt";
    productPrice.value = "";
    productDescription.value =
        "";
    productFrontImage.value =
        "";
    productBackImage.value =
        "";
    productSizes.value = "";
    productColors.value = "";
    if (frontImagePreview) {
        frontImagePreview.innerHTML =
            "";
    }
    if (backImagePreview) {
        backImagePreview.innerHTML =
            "";
    }
    updateCategoryDropdown();
    if (categories.length > 0) {
        productCategory.value =
            categories[0];
    }
    saveProductButton.textContent =
        "Save Product";
}
// =========================================
// OPEN PRODUCT CREATOR
// =========================================
function openProductCreator() {
    showSection(
        "products"
    );
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
        parseFloat(
            productPrice.value
        );
    const category =
        productCategory.value;
    const description =
        productDescription.value.trim();
    const sizes =
        productSizes.value
            .split(",")
            .map(
                item =>
                    item.trim()
            )
            .filter(Boolean);
    const colors =
        productColors.value
            .split(",")
            .map(
                item =>
                    item.trim()
            )
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
            "Please create a category first."
        );
        return;
    }
    // =====================================
    // EDIT PRODUCT
    // =====================================
    if (editingProductId) {
        const product =
            products.find(
                item =>
                    item.id ===
                    editingProductId
            );
        if (product) {
            product.name =
                name;
            product.type =
                type;
            product.price =
                price;
            product.category =
                category;
            product.description =
                description;
            product.frontImage =
                editingFrontImage ||
                product.frontImage ||
                "";
            product.backImage =
                editingBackImage ||
                product.backImage ||
                "";
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
    // NEW PRODUCT
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
            frontImage:
                editingFrontImage ||
                "",
            backImage:
                editingBackImage ||
                "",
            sizes,
            colors,
            createdAt:
                new Date().toISOString()
        };
        products.push(
            product
        );
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
// SAVE PRODUCT BUTTON
// =========================================
if (saveProductButton) {
    saveProductButton.addEventListener(
        "click",
        saveProduct
    );
}
// =========================================
// CANCEL PRODUCT
// =========================================
if (cancelProductButton) {
    cancelProductButton.addEventListener(
        "click",
        () => {
            clearProductForm();
            showSection(
                "dashboard"
            );
        }
    );
}
// =========================================
// EDIT PRODUCT
// =========================================
function editProduct(
    productId
) {
    const product =
        products.find(
            item =>
                item.id ===
                productId
        );
    if (!product) {
        return;
    }
    editingProductId =
        product.id;
    editingFrontImage =
        product.frontImage ||
        "";
    editingBackImage =
        product.backImage ||
        "";
    productName.value =
        product.name;
    productType.value =
        product.type;
    productPrice.value =
        product.price;
    updateCategoryDropdown();
    productCategory.value =
        product.category;
    productDescription.value =
        product.description ||
        "";
    productFrontImage.value =
        "";
    productBackImage.value =
        "";
    showImagePreview(
        frontImagePreview,
        editingFrontImage
    );
    showImagePreview(
        backImagePreview,
        editingBackImage
    );
    productSizes.value =
        (
            product.sizes ||
            []
        ).join(", ");
    productColors.value =
        (
            product.colors ||
            []
        ).join(", ");
    saveProductButton.textContent =
        "Update Product";
    showSection(
        "products"
    );
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
    if (
        products.length ===
        0
    ) {
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
    products.forEach(
        product => {
            const item =
                document.createElement(
                    "div"
                );
            item.className =
                "product-admin-item";
            item.innerHTML = `
                <div class="product-admin-info">
                    <h3>
                        ${escapeHTML(
                            product.name
                        )}
                    </h3>
                    <p>
                        ${escapeHTML(
                            product.type
                        )}
                        •
                        $${Number(
                            product.price
                        ).toFixed(2)}
                    </p>
                    <p>
                        Category:
                        ${escapeHTML(
                            product.category
                        )}
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
            list.appendChild(
                item
            );
        }
    );
    document
        .querySelectorAll(
            "[data-edit-product]"
        )
        .forEach(
            button => {
                button.addEventListener(
                    "click",
                    () => {
                        editProduct(
                            button.dataset.editProduct
                        );
                    }
                );
            }
        );
    document
        .querySelectorAll(
            "[data-delete-product]"
        )
        .forEach(
            button => {
                button.addEventListener(
                    "click",
                    () => {
                        deleteProduct(
                            button.dataset.deleteProduct
                        );
                    }
                );
            }
        );
}
// =========================================
// DELETE PRODUCT
// =========================================
function deleteProduct(
    productId
) {
    const product =
        products.find(
            item =>
                item.id ===
                productId
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
                item.id !==
                productId
        );
    saveData();
    updateDashboard();
    renderProducts();
}
// =========================================
// ADD CATEGORY
// =========================================
function addCategory() {
    const name =
        categoryName.value.trim();
    if (!name) {
        alert(
            "Please enter a category name."
        );
        categoryName.focus();
        return;
    }
    const exists =
        categories.some(
            category =>
                category.toLowerCase()
                ===
                name.toLowerCase()
        );
    if (exists) {
        alert(
            "That category already exists."
        );
        categoryName.focus();
        return;
    }
    categories.push(
        name
    );
    saveData();
    updateDashboard();
    renderCategories();
    updateCategoryDropdown();
    categoryName.value =
        "";
    alert(
        "Category added successfully!"
    );
}
if (addCategoryButton) {
    addCategoryButton.addEventListener(
        "click",
        addCategory
    );
}
// =========================================
// RENDER CATEGORIES
// =========================================
function renderCategories() {
    const categoryList =
        document.getElementById(
            "categoryList"
        );
    if (!categoryList) {
        return;
    }
    categoryList.innerHTML =
        "";
    if (
        categories.length ===
        0
    ) {
        categoryList.innerHTML = `
            <div class="empty-state">
                <h2>
                    No Categories
                </h2>
                <p>
                    Create your first category above.
                </p>
            </div>
        `;
        return;
    }
    categories.forEach(
        (
            category,
            index
        ) => {
            const item =
                document.createElement(
                    "div"
                );
            item.className =
                "category-item";
            item.innerHTML = `
                <div>
                    <strong>
                        ${escapeHTML(
                            category
                        )}
                    </strong>
                </div>
                <div class="product-admin-actions">
                    <button
                        class="edit-button"
                        data-edit-category="${index}"
                    >
                        Edit
                    </button>
                    <button
                        class="delete-button"
                        data-delete-category="${index}"
                    >
                        Delete
                    </button>
                </div>
            `;
            categoryList.appendChild(
                item
            );
        }
    );
    // EDIT CATEGORY
    document
        .querySelectorAll(
            "[data-edit-category]"
        )
        .forEach(
            button => {
                button.addEventListener(
                    "click",
                    () => {
                        editCategory(
                            Number(
                                button.dataset.editCategory
                            )
                        );
                    }
                );
            }
        );
    // DELETE CATEGORY
    document
        .querySelectorAll(
            "[data-delete-category]"
        )
        .forEach(
            button => {
                button.addEventListener(
                    "click",
                    () => {
                        deleteCategory(
                            Number(
                                button.dataset.deleteCategory
                            )
                        );
                    }
                );
            }
        );
}
// =========================================
// EDIT CATEGORY
// =========================================
function editCategory(
    index
) {
    if (
        index < 0 ||
        index >= categories.length
    ) {
        return;
    }
    const oldName =
        categories[index];
    const newName =
        prompt(
            "Enter the new category name:",
            oldName
        );
    if (
        newName ===
        null
    ) {
        return;
    }
    const cleanedName =
        newName.trim();
    if (!cleanedName) {
        alert(
            "Category name cannot be empty."
        );
        return;
    }
    const duplicate =
        categories.some(
            (
                category,
                categoryIndex
            ) =>
                categoryIndex !==
                index &&
                category
                    .toLowerCase()
                ===
                cleanedName
                    .toLowerCase()
        );
    if (duplicate) {
        alert(
            "That category already exists."
        );
        return;
    }
    categories[index] =
        cleanedName;
    // Update products using old category
    products.forEach(
        product => {
            if (
                product.category ===
                oldName
            ) {
                product.category =
                    cleanedName;
            }
        }
    );
    saveData();
    updateDashboard();
    renderCategories();
    updateCategoryDropdown();
    renderProducts();
}
// =========================================
// DELETE CATEGORY
// =========================================
function deleteCategory(
    index
) {
    if (
        index < 0 ||
        index >= categories.length
    ) {
        return;
    }
    const category =
        categories[index];
    const productsUsingCategory =
        products.filter(
            product =>
                product.category ===
                category
        );
    if (
        productsUsingCategory.length >
        0
    ) {
        alert(
            `You cannot delete "${category}" because ${productsUsingCategory.length} product(s) are using it. Edit those products first.`
        );
        return;
    }
    const confirmed =
        confirm(
            `Delete the "${category}" category?`
        );
    if (!confirmed) {
        return;
    }
    categories.splice(
        index,
        1
    );
    saveData();
    updateDashboard();
    renderCategories();
    updateCategoryDropdown();
}
// =========================================
// HTML SAFETY
// =========================================
function escapeHTML(
    value
) {
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
renderCategories();
renderProducts();
updateCategoryDropdown();