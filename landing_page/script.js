document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");

    // Add a subtle drop shadow to the header navigation when the user scrolls down
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 10px 30px rgba(15, 23, 42, 0.06)";
            header.style.background = "rgba(250, 250, 252, 0.95)";
        } else {
            header.style.boxShadow = "none";
            header.style.background = "rgba(250, 250, 252, 0.85)";
        }
    });
});