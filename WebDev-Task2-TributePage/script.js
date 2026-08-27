```javascript
/* =========================================================
   MARIE CURIE TRIBUTE PAGE
   JAVASCRIPT
========================================================= */


/* =========================================================
   DARK / LIGHT MODE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const body = document.body;
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");


    /*
        Read saved theme.
        If no theme exists, use light mode.
    */

    const savedTheme = localStorage.getItem("tribute-theme");


    if (savedTheme === "dark") {

        body.classList.add("dark-mode");

        themeIcon.textContent = "☀";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

        themeToggle.setAttribute(
            "aria-pressed",
            "true"
        );

    } else {

        body.classList.remove("dark-mode");

        themeIcon.textContent = "☾";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

        themeToggle.setAttribute(
            "aria-pressed",
            "false"
        );

    }


    /*
        Theme button click
    */

    themeToggle.addEventListener("click", function () {

        const isCurrentlyDark =
            body.classList.contains("dark-mode");


        if (isCurrentlyDark) {

            /* Switch to LIGHT */

            body.classList.remove("dark-mode");

            themeIcon.textContent = "☾";

            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );

            themeToggle.setAttribute(
                "aria-pressed",
                "false"
            );

            localStorage.setItem(
                "tribute-theme",
                "light"
            );

        } else {

            /* Switch to DARK */

            body.classList.add("dark-mode");

            themeIcon.textContent = "☀";

            themeToggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

            themeToggle.setAttribute(
                "aria-pressed",
                "true"
            );

            localStorage.setItem(
                "tribute-theme",
                "dark"
            );

        }

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -40px 0px"
                }
            );


        revealElements.forEach(function (element) {

            revealObserver.observe(element);

        });

    } else {

        /*
            Fallback for older browsers
        */

        revealElements.forEach(function (element) {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            ".nav-links a"
        );


    if ("IntersectionObserver" in window) {

        const sectionObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        navLinks.forEach(function (link) {

                            link.classList.remove(
                                "active"
                            );

                        });


                        const activeLink =
                            document.querySelector(
                                `.nav-links a[href="#${entry.target.id}"]`
                            );


                        if (activeLink) {

                            activeLink.classList.add(
                                "active"
                            );

                        }

                    });

                },
                {
                    threshold: 0.25,

                    rootMargin:
                        "-20% 0px -55% 0px"
                }
            );


        sections.forEach(function (section) {

            sectionObserver.observe(section);

        });

    }


    /* =====================================================
       SMOOTH NAVIGATION
    ===================================================== */

    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    !targetId.startsWith("#")
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    /* =====================================================
       TIMELINE INTERACTION
    ===================================================== */

    const timelineItems =
        document.querySelectorAll(
            ".timeline-item"
        );


    timelineItems.forEach(function (item) {

        item.addEventListener(
            "mouseenter",
            function () {

                item.style.transform =
                    "translateX(7px)";

            }
        );


        item.addEventListener(
            "mouseleave",
            function () {

                item.style.transform =
                    "translateX(0)";

            }
        );

    });


    /* =====================================================
       KEYBOARD ACCESSIBILITY
    ===================================================== */

    themeToggle.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                themeToggle.click();

            }

        }
    );


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const footerYear =
        document.getElementById("footerYear");


    if (footerYear) {

        footerYear.textContent =
            `© ${new Date().getFullYear()}`;

    }


    /* =====================================================
       PAGE LOADED
    ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );

});
```
