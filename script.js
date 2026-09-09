"use strict";


/* =========================================================
   ACCESSIBILITY
========================================================= */

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


/* =========================================================
   CURRENT YEAR
========================================================= */

const currentYear =
    document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent =
        new Date().getFullYear();
}


/* =========================================================
   MOBILE MENU
========================================================= */

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mainNav =
    document.getElementById("mainNav");

if (mobileMenuButton && mainNav) {

    mobileMenuButton.addEventListener(
        "click",
        () => {

            const open =
                mainNav.classList.toggle("open");

            mobileMenuButton.setAttribute(
                "aria-expanded",
                String(open)
            );

        }
    );

    mainNav
        .querySelectorAll("a")
        .forEach(link => {

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

        });

}


/* =========================================================
   REVEAL ON SCROLL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");

if (reducedMotion) {

    revealElements.forEach(
        element => element.classList.add("visible")
    );

} else {

    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (entry.isIntersecting) {

                            entry.target
                                .classList
                                .add("visible");

                            revealObserver
                                .unobserve(entry.target);

                        }

                    }
                );

            },

            {
                threshold: 0.1,
                rootMargin: "0px 0px -28px 0px"
            }

        );

    revealElements.forEach(
        element => revealObserver.observe(element)
    );

}


/* =========================================================
   KPI COUNTERS
========================================================= */

const counters =
    document.querySelectorAll(".counter");

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
            easeOutCubic(progress);

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

        if (progress < 1) {

            requestAnimationFrame(update);

        } else {

            counter.textContent =
                `${target}${suffix}`;

        }

    }

    requestAnimationFrame(update);

}

const counterObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(
                entry => {

                    if (entry.isIntersecting) {

                        animateCounter(entry.target);

                        counterObserver
                            .unobserve(entry.target);

                    }

                }
            );

        },

        {
            threshold: 0.4
        }

    );

counters.forEach(
    counter => counterObserver.observe(counter)
);


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

    const position =
        window.scrollY + 150;

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

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${activeSection}`
            ) {

                link.classList.add("active");

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
   PORTRAIT PARALLAX
========================================================= */

const portraitSystem =
    document.querySelector(".portrait-system");

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
                window.innerWidth <= 760
            ) {
                return;
            }

            portraitTargetX =
                (
                    event.clientX /
                    window.innerWidth -
                    0.5
                ) *
                6;

            portraitTargetY =
                (
                    event.clientY /
                    window.innerHeight -
                    0.5
                ) *
                6;

        },
        {
            passive: true
        }
    );

    function animatePortrait() {

        if (
            window.innerWidth > 760
        ) {

            portraitCurrentX +=
                (
                    portraitTargetX -
                    portraitCurrentX
                ) *
                0.04;

            portraitCurrentY +=
                (
                    portraitTargetY -
                    portraitCurrentY
                ) *
                0.04;

            portraitSystem.style.transform =
                `translate3d(${portraitCurrentX}px, ${portraitCurrentY}px, 0)`;

        } else {

            portraitSystem.style.transform =
                "translate3d(0,0,0)";

        }

        requestAnimationFrame(
            animatePortrait
        );

    }

    animatePortrait();

}


/* =========================================================
   CASE STUDY MODAL DATA
========================================================= */

const caseStudyData = {

    logistics: {
        kicker: "Supply Chain • Rattan Direct",
        title: "Restructuring logistics costs",
        summary:
            "A cost-structure improvement programme across warehousing, 3PL and final-mile delivery.",
        problem:
            "Warehousing, storage and delivery cost structures were creating significant logistics expense and required a more commercially efficient operating model.",
        analysis:
            "The work involved reviewing rate cards and invoice categories, comparing alternative logistics arrangements, examining storage and delivery cost drivers, and identifying where commercial structure and operating design were creating avoidable cost.",
        action:
            "Supported the warehouse and 3PL transition, coordinated operational migration activity, reviewed commercial terms and helped reshape final-mile arrangements while maintaining service continuity.",
        tools:
            "Rate-card comparison, invoice-category analysis, operational benchmarking, supplier and 3PL reviews, cross-functional transition planning and executive reporting.",
        result:
            "~£520K annual savings",
        resultDetail:
            "Approximately £400K in warehouse and 3PL savings plus approximately £120K in final-mile savings.",
        learning:
            "Demonstrates commercial judgement, cost analysis, provider management and the ability to convert operational detail into a material business outcome."
    },

    returns: {
        kicker: "Quality + Reverse Logistics • Rattan Direct",
        title: "Reducing product returns",
        summary:
            "A cross-functional quality improvement effort spanning supplier quality, packaging, handling, delivery and reverse logistics.",
        problem:
            "Returns were being driven by multiple failure modes across the product journey, including product defects, packaging weaknesses, handling damage and delivery-related issues.",
        analysis:
            "Return data and recurring defect patterns were reviewed alongside customer evidence, warehouse observations, delivery issues and supplier-quality findings to distinguish where failures were occurring and where controls needed strengthening.",
        action:
            "Coordinated supplier-quality actions, packaging improvements, delivery-quality reviews and reverse-logistics interventions, while using evidence from customer photos and operational reviews to drive accountability.",
        tools:
            "Return-cause analysis, supplier reviews, quality evidence, packaging and handling reviews, monthly logistics-quality reviews and corrective-action tracking.",
        result:
            "Returns reduced from ~12% to ~4% by CBM",
        resultDetail:
            "The reduction was achieved through combined quality, packaging and logistics improvements rather than a single isolated intervention.",
        learning:
            "Demonstrates end-to-end problem solving: using data to identify causes, then coordinating multiple functions to reduce operational failure."
    },

    manufacturing: {
        kicker: "Manufacturing Quality • Auto Springs East Africa",
        title: "Reducing U-bolt rejection",
        summary:
            "A manufacturing-quality improvement effort using structured quality methods to improve rejection performance.",
        problem:
            "U-bolt rejection performance required stronger process control, more disciplined measurement and structured analysis of recurring quality variation.",
        analysis:
            "Quality performance was assessed through production inspection and structured quality tools to understand process capability, failure modes and measurement reliability.",
        action:
            "Applied and supported production quality controls, SPC, PFMEA, MSA, corrective-action practices and ISO 9001 documentation while working with production teams on defect reduction.",
        tools:
            "SPC, PFMEA, MSA, inspection controls, corrective action and ISO 9001 quality documentation.",
        result:
            "U-bolt rejection reduced from ~4% to ~2%",
        resultDetail:
            "The improvement came from stronger process controls and structured manufacturing-quality discipline.",
        learning:
            "Demonstrates an engineering-quality foundation and the ability to apply structured methods to measurable production improvement."
    },

    leadership: {
        kicker: "Business Operations • Optimise Outsourcing",
        title: "Building leadership visibility",
        summary:
            "A management-information system designed to create clearer ownership and operating rhythm across senior leadership.",
        problem:
            "Leadership needed a consistent view of customer, workforce, recruitment and commercial performance, with clearer accountability around priorities and emerging issues.",
        analysis:
            "The challenge was not simply producing more reports. It was selecting a manageable set of indicators and integrating them into an operating cadence where leaders could review exceptions, assign ownership and act.",
        action:
            "Designed a 19-KPI leadership scorecard and integrated it into SLT L10 meetings, quarterly planning, accountability structures and executive reporting.",
        tools:
            "EOS operating rhythm, KPI scorecards, executive packs, Microsoft 365, SharePoint, structured meeting cadence and accountability tracking.",
        result:
            "19 KPIs integrated into leadership reporting",
        resultDetail:
            "The scorecard supported clearer visibility, ownership and management discussion around performance and priorities.",
        learning:
            "Demonstrates operating-system thinking: connecting measures, meetings, accountability and decision-making rather than treating reporting as a standalone task."
    }

};


/* =========================================================
   CASE STUDY MODAL
========================================================= */

const caseModal =
    document.getElementById("caseModal");

const caseModalPanel =
    caseModal
        ? caseModal.querySelector(".case-modal-panel")
        : null;

const caseModalKicker =
    document.getElementById("caseModalKicker");

const caseModalTitle =
    document.getElementById("caseModalTitle");

const caseModalSummary =
    document.getElementById("caseModalSummary");

const caseModalProblem =
    document.getElementById("caseModalProblem");

const caseModalAnalysis =
    document.getElementById("caseModalAnalysis");

const caseModalAction =
    document.getElementById("caseModalAction");

const caseModalTools =
    document.getElementById("caseModalTools");

const caseModalResult =
    document.getElementById("caseModalResult");

const caseModalResultDetail =
    document.getElementById("caseModalResultDetail");

const caseModalLearning =
    document.getElementById("caseModalLearning");

const caseModalContact =
    document.getElementById("caseModalContact");

let lastModalTrigger = null;


function populateCaseModal(caseKey) {

    const data =
        caseStudyData[caseKey];

    if (!data) {
        return false;
    }

    caseModalKicker.textContent =
        data.kicker;

    caseModalTitle.textContent =
        data.title;

    caseModalSummary.textContent =
        data.summary;

    caseModalProblem.textContent =
        data.problem;

    caseModalAnalysis.textContent =
        data.analysis;

    caseModalAction.textContent =
        data.action;

    caseModalTools.textContent =
        data.tools;

    caseModalResult.textContent =
        data.result;

    caseModalResultDetail.textContent =
        data.resultDetail;

    caseModalLearning.textContent =
        data.learning;

    return true;

}


function openCaseModal(caseKey, trigger) {

    if (
        !caseModal ||
        !caseModalPanel ||
        !populateCaseModal(caseKey)
    ) {
        return;
    }

    lastModalTrigger =
        trigger || document.activeElement;

    caseModal.classList.add("open");

    caseModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );

    window.setTimeout(
        () => caseModalPanel.focus(),
        30
    );

}


function closeCaseModal() {

    if (!caseModal) {
        return;
    }

    caseModal.classList.remove("open");

    caseModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );

    if (
        lastModalTrigger &&
        typeof lastModalTrigger.focus === "function"
    ) {

        lastModalTrigger.focus();

    }

}


document
    .querySelectorAll("[data-case]")
    .forEach(trigger => {

        trigger.addEventListener(
            "click",
            () => {

                const caseKey =
                    trigger.dataset.case;

                openCaseModal(
                    caseKey,
                    trigger
                );

            }
        );

        if (
            trigger.getAttribute("role") === "button"
        ) {

            trigger.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {

                        event.preventDefault();

                        openCaseModal(
                            trigger.dataset.case,
                            trigger
                        );

                    }

                }
            );

        }

    });


document
    .querySelectorAll("[data-close-modal]")
    .forEach(closeControl => {

        closeControl.addEventListener(
            "click",
            closeCaseModal
        );

    });


if (caseModalContact) {

    caseModalContact.addEventListener(
        "click",
        closeCaseModal
    );

}


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            caseModal &&
            caseModal.classList.contains("open")
        ) {

            closeCaseModal();

        }

    }
);


/* =========================================================
   PARTICLE BACKGROUND
========================================================= */

const canvas =
    document.getElementById("particleCanvas");

if (
    canvas &&
    !reducedMotion
) {

    const context =
        canvas.getContext("2d");

    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let particles = [];
    let animationFrame = null;

    const mouse = {
        x: null,
        y: null,
        radius: 170
    };


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
                1.8 +
                0.8;

            this.velocityX =
                (
                    Math.random() -
                    0.5
                ) *
                0.18;

            this.velocityY =
                (
                    Math.random() -
                    0.5
                ) *
                0.18;

            this.forceX = 0;
            this.forceY = 0;

            this.opacity =
                Math.random() *
                0.16 +
                0.25;

        }


        update() {

            this.x +=
                this.velocityX +
                this.forceX;

            this.y +=
                this.velocityY +
                this.forceY;

            this.forceX *=
                0.90;

            this.forceY *=
                0.90;


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
                        0.28;

                    this.forceY +=
                        (
                            dy /
                            distance
                        ) *
                        strength *
                        0.28;

                }

            }


            if (this.x < -20) {
                this.x = width + 20;
            }

            if (this.x > width + 20) {
                this.x = -20;
            }

            if (this.y < -20) {
                this.y = height + 20;
            }

            if (this.y > height + 20) {
                this.y = -20;
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
                `rgba(22, 116, 168, ${this.opacity})`;

            context.fill();

        }

    }


    function createParticles() {

        particles = [];

        const screenArea =
            width *
            height;

        let count =
            Math.floor(
                screenArea /
                21000
            );

        if (width < 760) {

            count =
                Math.min(
                    Math.max(
                        count,
                        20
                    ),
                    30
                );

        } else {

            count =
                Math.min(
                    Math.max(
                        count,
                        48
                    ),
                    76
                );

        }

        for (
            let index = 0;
            index < count;
            index++
        ) {

            particles.push(
                new Particle()
            );

        }

    }


    function connectParticles() {

        const connectionDistance =
            width < 760
                ? 86
                : 122;

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
                        0.14;

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
                        `rgba(22, 116, 168, ${opacity})`;

                    context.lineWidth =
                        0.65;

                    context.stroke();

                }

            }

        }

    }


    function connectCursor() {

        if (
            mouse.x === null ||
            mouse.y === null
        ) {
            return;
        }

        particles.forEach(
            particle => {

                const dx =
                    particle.x -
                    mouse.x;

                const dy =
                    particle.y -
                    mouse.y;

                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );

                if (
                    distance <
                    115
                ) {

                    const opacity =
                        (
                            1 -
                            distance /
                            115
                        ) *
                        0.17;

                    context.beginPath();

                    context.moveTo(
                        mouse.x,
                        mouse.y
                    );

                    context.lineTo(
                        particle.x,
                        particle.y
                    );

                    context.strokeStyle =
                        `rgba(22, 116, 168, ${opacity})`;

                    context.lineWidth =
                        0.55;

                    context.stroke();

                }

            }
        );

    }


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
        connectCursor();

        animationFrame =
            requestAnimationFrame(
                animateParticles
            );

    }


    const finePointer =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        );

    if (finePointer.matches) {

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


    document.addEventListener(
        "visibilitychange",
        () => {

            if (document.hidden) {

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
   RESIZE CLEANUP
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth >
            760 &&
            mainNav
        ) {

            mainNav.classList.remove("open");

            if (mobileMenuButton) {

                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    }
);
