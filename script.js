"use strict";


/* =========================================================
   1. ACCESSIBILITY
========================================================= */

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


/* =========================================================
   2. CURRENT YEAR
========================================================= */

const currentYear =
    document.getElementById(
        "currentYear"
    );


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   3. MOBILE NAVIGATION
========================================================= */

const mobileMenuButton =
    document.getElementById(
        "mobileMenuButton"
    );


const mainNav =
    document.getElementById(
        "mainNav"
    );


if (
    mobileMenuButton &&
    mainNav
) {

    mobileMenuButton.addEventListener(
        "click",
        () => {

            const isOpen =
                mainNav
                    .classList
                    .toggle("open");


            mobileMenuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        }
    );


    mainNav
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mainNav
                        .classList
                        .remove("open");


                    mobileMenuButton
                        .setAttribute(
                            "aria-expanded",
                            "false"
                        );

                }
            );

        });

}


/* =========================================================
   4. SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


if (reducedMotion) {

    revealElements.forEach(
        element => {

            element.classList.add(
                "visible"
            );

        }
    );

} else {

    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add("visible");


                            revealObserver
                                .unobserve(
                                    entry.target
                                );

                        }

                    }
                );

            },

            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -35px 0px"
            }

        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );

}


/* =========================================================
   5. KPI COUNTERS
========================================================= */

const counters =
    document.querySelectorAll(
        ".counter"
    );


const COUNTER_DURATION =
    1500;


function easeOutCubic(progress) {

    return (
        1 -
        Math.pow(
            1 - progress,
            3
        )
    );

}


function animateCounter(counter) {

    if (
        counter.dataset.animated ===
        "true"
    ) {

        return;

    }


    counter.dataset.animated =
        "true";


    const start =
        Number(
            counter.dataset.start || 0
        );


    const target =
        Number(
            counter.dataset.target
        );


    const suffix =
        counter.dataset.suffix || "";


    if (reducedMotion) {

        counter.textContent =
            `${target}${suffix}`;

        return;

    }


    const startTime =
        performance.now();


    function update(currentTime) {

        const elapsed =
            currentTime -
            startTime;


        const progress =
            Math.min(
                elapsed /
                COUNTER_DURATION,
                1
            );


        const eased =
            easeOutCubic(
                progress
            );


        /*
           This works in BOTH directions:

           0 -> 520

           12 -> 4

           8 -> 4

           0 -> 19
        */

        const value =
            Math.round(

                start +

                (
                    target -
                    start
                ) *

                eased

            );


        counter.textContent =
            `${value}${suffix}`;


        if (
            progress < 1
        ) {

            requestAnimationFrame(
                update
            );

        } else {

            counter.textContent =
                `${target}${suffix}`;

        }

    }


    requestAnimationFrame(
        update
    );

}


/* =========================================================
   6. COUNTER OBSERVER
========================================================= */

const counterObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        animateCounter(
                            entry.target
                        );


                        counterObserver
                            .unobserve(
                                entry.target
                            );

                    }

                }
            );

        },

        {
            threshold: 0.45
        }

    );


counters.forEach(
    counter => {

        counterObserver.observe(
            counter
        );

    }
);


/* =========================================================
   7. ACTIVE NAVIGATION
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

    const position =
        window.scrollY + 170;


    let activeSection =
        "";


    sections.forEach(
        section => {

            const top =
                section.offsetTop;


            const bottom =
                top +
                section.offsetHeight;


            if (
                position >= top &&
                position < bottom
            ) {

                activeSection =
                    section.id;

            }

        }
    );


    navigationLinks.forEach(
        link => {

            link.classList.remove(
                "active"
            );


            if (
                link.getAttribute("href") ===
                `#${activeSection}`
            ) {

                link.classList.add(
                    "active"
                );

            }

        }
    );

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
   8. HERO PORTRAIT PARALLAX
========================================================= */

const portraitSystem =
    document.querySelector(
        ".portrait-system"
    );


let portraitTargetX = 0;
let portraitTargetY = 0;

let portraitCurrentX = 0;
let portraitCurrentY = 0;


if (
    portraitSystem &&
    !reducedMotion
) {

    window.addEventListener(
        "mousemove",
        event => {

            if (
                window.innerWidth <=
                760
            ) {

                return;

            }


            portraitTargetX =
                (
                    event.clientX /
                    window.innerWidth -
                    0.5
                ) *
                7;


            portraitTargetY =
                (
                    event.clientY /
                    window.innerHeight -
                    0.5
                ) *
                7;

        },
        {
            passive: true
        }
    );


    function animatePortrait() {

        if (
            window.innerWidth >
            760
        ) {

            portraitCurrentX +=
                (
                    portraitTargetX -
                    portraitCurrentX
                ) *
                0.045;


            portraitCurrentY +=
                (
                    portraitTargetY -
                    portraitCurrentY
                ) *
                0.045;


            portraitSystem.style.transform =
                `translate3d(
                    ${portraitCurrentX}px,
                    ${portraitCurrentY}px,
                    0
                )`;

        } else {

            portraitSystem.style.transform =
                "translate3d(0, 0, 0)";

        }


        requestAnimationFrame(
            animatePortrait
        );

    }


    animatePortrait();

}


/* =========================================================
   9. INTERACTIVE BACKGROUND PARTICLES
========================================================= */

const canvas =
    document.getElementById(
        "particleCanvas"
    );


if (
    canvas &&
    !reducedMotion
) {

    const context =
        canvas.getContext("2d");


    let particles = [];

    let width = 0;
    let height = 0;

    let pixelRatio = 1;

    let animationFrame = null;


    const mouse = {

        x: null,
        y: null,

        radius: 135

    };


    /* -----------------------------------------------------
       RESIZE
    ----------------------------------------------------- */

    function resizeCanvas() {

        width =
            window.innerWidth;


        height =
            window.innerHeight;


        pixelRatio =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );


        canvas.width =
            width *
            pixelRatio;


        canvas.height =
            height *
            pixelRatio;


        canvas.style.width =
            `${width}px`;


        canvas.style.height =
            `${height}px`;


        context.setTransform(
            pixelRatio,
            0,
            0,
            pixelRatio,
            0,
            0
        );


        createParticles();

    }


    /* -----------------------------------------------------
       PARTICLE
    ----------------------------------------------------- */

    class Particle {

        constructor() {

            this.reset();

        }


        reset() {

            this.x =
                Math.random() *
                width;


            this.y =
                Math.random() *
                height;


            this.size =
                Math.random() *
                1.6 +
                0.6;


            this.velocityX =
                (
                    Math.random() -
                    0.5
                ) *
                0.24;


            this.velocityY =
                (
                    Math.random() -
                    0.5
                ) *
                0.24;


            /*
               Extra motion generated by
               the cursor interaction.
            */

            this.forceX = 0;
            this.forceY = 0;

        }


        update() {

            /*
               Natural ambient drift.
            */

            this.x +=
                this.velocityX +
                this.forceX;


            this.y +=
                this.velocityY +
                this.forceY;


            /*
               Gradually reduce the cursor force,
               so particles settle back into
               normal movement.
            */

            this.forceX *=
                0.91;


            this.forceY *=
                0.91;


            /*
               Cursor repulsion.
            */

            if (
                mouse.x !== null &&
                mouse.y !== null
            ) {

                const dx =
                    this.x -
                    mouse.x;


                const dy =
                    this.y -
                    mouse.y;


                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (
                    distance <
                    mouse.radius &&
                    distance > 0
                ) {

                    const strength =
                        (
                            mouse.radius -
                            distance
                        ) /
                        mouse.radius;


                    this.forceX +=
                        (
                            dx /
                            distance
                        ) *
                        strength *
                        0.18;


                    this.forceY +=
                        (
                            dy /
                            distance
                        ) *
                        strength *
                        0.18;

                }

            }


            /*
               Wrap particles around the screen.
            */

            if (
                this.x < -20
            ) {

                this.x =
                    width + 20;

            }


            if (
                this.x >
                width + 20
            ) {

                this.x =
                    -20;

            }


            if (
                this.y < -20
            ) {

                this.y =
                    height + 20;

            }


            if (
                this.y >
                height + 20
            ) {

                this.y =
                    -20;

            }

        }


        draw() {

            context.beginPath();


            context.arc(
                this.x,
                this.y,
                this.size,
                0,
                Math.PI * 2
            );


            context.fillStyle =
                "rgba(8, 120, 189, 0.22)";


            context.fill();

        }

    }


    /* -----------------------------------------------------
       PARTICLE COUNT
    ----------------------------------------------------- */

    function createParticles() {

        particles = [];


        const screenArea =
            width *
            height;


        let count =
            Math.floor(
                screenArea /
                25000
            );


        /*
           Keep mobile lighter.
        */

        if (
            width < 760
        ) {

            count =
                Math.min(
                    count,
                    28
                );

        } else {

            count =
                Math.min(
                    Math.max(
                        count,
                        38
                    ),
                    70
                );

        }


        for (
            let i = 0;
            i < count;
            i++
        ) {

            particles.push(
                new Particle()
            );

        }

    }


    /* -----------------------------------------------------
       CONNECTION LINES
    ----------------------------------------------------- */

    function connectParticles() {

        const connectionDistance =
            width < 760
                ? 80
                : 115;


        for (
            let i = 0;
            i < particles.length;
            i++
        ) {

            for (
                let j = i + 1;
                j < particles.length;
                j++
            ) {

                const dx =
                    particles[i].x -
                    particles[j].x;


                const dy =
                    particles[i].y -
                    particles[j].y;


                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (
                    distance <
                    connectionDistance
                ) {

                    const opacity =
                        (
                            1 -
                            distance /
                            connectionDistance
                        ) *
                        0.075;


                    context.beginPath();


                    context.moveTo(
                        particles[i].x,
                        particles[i].y
                    );


                    context.lineTo(
                        particles[j].x,
                        particles[j].y
                    );


                    context.strokeStyle =
                        `rgba(
                            8,
                            120,
                            189,
                            ${opacity}
                        )`;


                    context.lineWidth =
                        0.6;


                    context.stroke();

                }

            }

        }

    }


    /* -----------------------------------------------------
       ANIMATION
    ----------------------------------------------------- */

    function animateParticles() {

        context.clearRect(
            0,
            0,
            width,
            height
        );


        particles.forEach(
            particle => {

                particle.update();

                particle.draw();

            }
        );


        connectParticles();


        animationFrame =
            requestAnimationFrame(
                animateParticles
            );

    }


    /* -----------------------------------------------------
       MOUSE INTERACTION
    ----------------------------------------------------- */

    if (
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        window.addEventListener(
            "mousemove",
            event => {

                mouse.x =
                    event.clientX;


                mouse.y =
                    event.clientY;

            },
            {
                passive: true
            }
        );


        document.addEventListener(
            "mouseleave",
            () => {

                mouse.x = null;
                mouse.y = null;

            }
        );

    }


    /* -----------------------------------------------------
       RESIZE
    ----------------------------------------------------- */

    let resizeTimer;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    resizeCanvas,
                    160
                );

        }
    );


    /* -----------------------------------------------------
       SAVE CPU WHEN TAB IS HIDDEN
    ----------------------------------------------------- */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden
            ) {

                cancelAnimationFrame(
                    animationFrame
                );

            } else {

                animateParticles();

            }

        }
    );


    resizeCanvas();

    animateParticles();

}


/* =========================================================
   10. CLOSE MOBILE MENU ON RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth >
            760 &&
            mainNav
        ) {

            mainNav.classList.remove(
                "open"
            );


            if (
                mobileMenuButton
            ) {

                mobileMenuButton
                    .setAttribute(
                        "aria-expanded",
                        "false"
                    );

            }

        }

    }
);
