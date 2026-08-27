```javascript
// ==========================================
// MARIE CURIE TRIBUTE PAGE
// Interactive JavaScript
// ==========================================


// ------------------------------------------
// Dark / Light Mode
// ------------------------------------------

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-icon");

const savedTheme = localStorage.getItem("tribute-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.textContent = "☀";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    themeIcon.textContent = isDark ? "☀" : "☾";

    localStorage.setItem(
        "tribute-theme",
        isDark ? "dark" : "light"
    );
});


// ------------------------------------------
// Intersection Observer
// Scroll-triggered animations
// ------------------------------------------

const revealElements = document.querySelectorAll(".reveal");

const observerOptions = {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
};

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");

                observer.unobserve(entry.target);
            }

        });
    },
    observerOptions
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


// ------------------------------------------
// Smooth navigation enhancement
// ------------------------------------------

const navigationLinks = document.querySelectorAll(".nav-links a");

navigationLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (!targetId || !targetId.startsWith("#")) {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


// ------------------------------------------
// Active navigation state
// ------------------------------------------

const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                navItems.forEach((item) => {
                    item.classList.remove("active");
                });

                const activeLink = document.querySelector(
                    `.nav-links a[href="#${entry.target.id}"]`
                );

                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }

        });

    },
    {
        threshold: 0.25,
        rootMargin: "-20% 0px -55% 0px"
    }
);

sections.forEach((section) => {
    sectionObserver.observe(section);
});


// ------------------------------------------
// Timeline interaction
// ------------------------------------------

const timelineItems = document.querySelectorAll(".timeline-item");

timelineItems.forEach((item) => {

    item.addEventListener("mouseenter", () => {
        item.style.transform = "translateX(8px)";
        item.style.transition = "transform 0.35s ease";
    });

    item.addEventListener("mouseleave", () => {
        item.style.transform = "translateX(0)";
    });

});


// ------------------------------------------
// Keyboard accessibility
// ------------------------------------------

themeToggle.addEventListener("keydown", (event) => {

    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        themeToggle.click();
    }

});


// ------------------------------------------
// Current year in footer
// ------------------------------------------

const footerYear = document.querySelector(".footer-meta span:last-child");

if (footerYear) {
    footerYear.textContent = `© ${new Date().getFullYear()}`;
}


// ------------------------------------------
// Page loaded
// ------------------------------------------

window.addEventListener("load", () => {
    document.body.classList.add("page-loaded");
});
```
