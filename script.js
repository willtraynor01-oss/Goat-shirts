 const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");

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