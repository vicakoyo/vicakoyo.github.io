"use strict";


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mainNav =
    document.getElementById("mainNav");


if (mobileMenuButton && mainNav) {

    mobileMenuButton.addEventListener(
        "click",
        () => {

            const isOpen =
                mainNav.classList.toggle("open");

            mobileMenuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        }
    );


    mainNav.querySelectorAll("a").forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    mainNav.classList.remove("open");

                    mobileMenuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        }
    );

}


/* =========================================================
   REVEAL ELEMENTS ON SCROLL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
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


revealElements.forEach(
    element => {

        revealObserver.observe(element);

    }
);


/* =========================================================
   NUMBER COUNTERS
========================================================= */

const counters =
    document.querySelectorAll(".counter");


function animateCounter(counter) {

    if (
        counter.dataset.animated === "true"
    ) {
        return;
    }


    counter.dataset.animated = "true";


    const target =
        Number(counter.dataset.target);

    const suffix =
        counter.dataset.suffix || "";

    /*
        Normal transition speed.

        The previous intentionally slow version
        has been removed.
    */

    const duration = 1500;

    const startTime =
        performance.now();


    function updateCounter(currentTime) {

        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        /*
            Ease-out cubic.

            Starts quickly and settles naturally
            near the final value.
        */

        const easedProgress =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const currentValue =
            Math.round(
                target *
                easedProgress
            );


        counter.textContent =
            currentValue + suffix;


        if (progress < 1) {

            requestAnimationFrame(
                updateCounter
            );

        }

        else {

            counter.textContent =
                target + suffix;

        }

    }


    requestAnimationFrame(
        updateCounter
    );

}


/* =========================================================
   COUNTER OBSERVER
========================================================= */

const counterObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    animateCounter(
                        entry.target
                    );

                    counterObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.45
        }

    );


counters.forEach(counter => {

    counterObserver.observe(counter);

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const navigationLinks =
    document.querySelectorAll(
        ".main-nav a"
    );


function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + 180;

    let currentSection = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;


        if (
            scrollPosition >= sectionTop &&
            scrollPosition <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navigationLinks.forEach(link => {

        link.classList.remove("active");


        const href =
            link.getAttribute("href");


        if (
            href ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    {
        passive: true
    }
);


window.addEventListener(
    "load",
    updateActiveNavigation
);


/* =========================================================
   HEADER DEPTH ON SCROLL
========================================================= */

const siteHeader =
    document.querySelector(".site-header");


function updateHeader() {

    if (!siteHeader) {
        return;
    }


    if (window.scrollY > 30) {

        siteHeader.style.boxShadow =
            "0 8px 30px rgba(4, 45, 76, 0.07)";

    }

    else {

        siteHeader.style.boxShadow =
            "none";

    }

}


window.addEventListener(
    "scroll",
    updateHeader,
    {
        passive: true
    }
);


/* =========================================================
   SUBTLE HERO PARALLAX
========================================================= */

const portraitSystem =
    document.querySelector(
        ".portrait-system"
    );


let mouseX = 0;
let mouseY = 0;

let currentX = 0;
let currentY = 0;


document.addEventListener(
    "mousemove",
    event => {

        if (
            window.innerWidth <= 768
        ) {
            return;
        }


        mouseX =
            (
                event.clientX /
                window.innerWidth -
                0.5
            ) * 8;


        mouseY =
            (
                event.clientY /
                window.innerHeight -
                0.5
            ) * 8;

    }
);


/*
    requestAnimationFrame creates a smoother
    movement than directly moving the portrait
    on every mouse event.
*/

function animatePortraitParallax() {

    if (
        portraitSystem &&
        window.innerWidth > 768
    ) {

        currentX +=
            (mouseX - currentX) *
            0.04;

        currentY +=
            (mouseY - currentY) *
            0.04;


        portraitSystem.style.transform =
            `translate3d(
                ${currentX}px,
                ${currentY}px,
                0
            )`;

    }

    else if (portraitSystem) {

        /*
            Important for mobile:
            remove the desktop translation so
            the portrait remains perfectly centred.
        */

        portraitSystem.style.transform =
            "translate3d(0, 0, 0)";

    }


    requestAnimationFrame(
        animatePortraitParallax
    );

}


animatePortraitParallax();


/* =========================================================
   CARD POINTER EFFECT
========================================================= */

const interactiveCards =
    document.querySelectorAll(
        ".impact-card, .expertise-card, .case-card"
    );


interactiveCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            if (
                window.innerWidth <= 900
            ) {
                return;
            }


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;

            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const rotateX =
                (
                    centerY - y
                ) / 50;

            const rotateY =
                (
                    x - centerX
                ) / 50;


            card.style.transform =
                `
                perspective(900px)
                translateY(-5px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                `;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = "";

        }
    );

});


/* =========================================================
   CONTACT CARD FEEDBACK
========================================================= */

const contactCards =
    document.querySelectorAll(
        ".contact-card"
    );


contactCards.forEach(card => {

    card.addEventListener(
        "mousedown",
        () => {

            card.style.transform =
                "scale(0.985)";

        }
    );


    card.addEventListener(
        "mouseup",
        () => {

            card.style.transform = "";

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = "";

        }
    );

});


/* =========================================================
   HANDLE RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 768 &&
            mainNav
        ) {

            mainNav.classList.remove(
                "open"
            );


            if (mobileMenuButton) {

                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    }
);


/* =========================================================
   PAGE READY
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-ready"
        );

    }
);
