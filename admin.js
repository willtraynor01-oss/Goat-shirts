// =========================================
// GOAT SHIRTS ADMIN
// ADMIN.JS
// =========================================


// =========================================
// BASIC PRODUCT & CATEGORY DATA
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
// LOAD SAVED DATA
// =========================================

function loadData() {

    const savedProducts =
        localStorage.getItem("goatProducts");

    const savedCategories =
        localStorage.getItem("goatCategories");


    if (savedProducts) {
        products = JSON.parse(savedProducts);
    }


    if (savedCategories) {
        categories = JSON.parse(savedCategories);
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
// UPDATE DASHBOARD
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
// SECTION NAVIGATION
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


    const selectedSection =
        document.getElementById(sectionName);


    if (selectedSection) {

        selectedSection.classList.add("active");

    }


    const selectedNav =
        document.querySelector(
            `.nav-item[data-section="${sectionName}"]`
        );


    if (selectedNav) {

        selectedNav.classList.add("active");

    }


    // Close mobile menu
    const sidebar =
        document.getElementById("sidebar");

    if (sidebar) {

        sidebar.classList.remove("open");

    }

}


// =========================================
// SIDEBAR BUTTONS
// =========================================

navItems.forEach(item => {

    item.addEventListener("click", () => {

        const section =
            item.dataset.section;

        showSection(section);

    });

});


// =========================================
// QUICK ACTION BUTTONS
// =========================================

const sectionButtons =
    document.querySelectorAll(
        "[data-section-button]"
    );


sectionButtons.forEach(button => {

    button.addEventListener("click", () => {

        const section =
            button.dataset.sectionButton;

        showSection(section);

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
// ADD PRODUCT BUTTONS
// =========================================

const addProductButton =
    document.getElementById(
        "addProductButton"
    );


const emptyAddProductButton =
    document.getElementById(
        "emptyAddProductButton"
    );


function openProductCreator() {

    alert(
        "The Product Creator is the next step. We will build it next!"
    );

}


if (addProductButton) {

    addProductButton.addEventListener(
        "click",
        openProductCreator
    );

}


if (emptyAddProductButton) {

    emptyAddProductButton.addEventListener(
        "click",
        openProductCreator
    );

}


// =========================================
// INITIALIZE ADMIN
// =========================================

loadData();

saveData();

updateDashboard();