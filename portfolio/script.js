document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");

    // 1. Smooth Scrolling Behavior for Nav anchors
    const navLinks = document.querySelectorAll("header nav a");
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            if (targetId.startsWith("#")) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        });
    });

    // 2. Add subtle header shadows dynamically on scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 10px 30px rgba(45, 74, 62, 0.05)";
            header.style.backgroundColor = "rgba(250, 246, 240, 0.95)";
        } else {
            header.style.boxShadow = "none";
            header.style.backgroundColor = "rgba(250, 246, 240, 0.9)";
        }
    });
});