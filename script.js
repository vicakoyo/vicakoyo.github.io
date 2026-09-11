"use strict";

/* =========================================================
   ACCESSIBILITY / SETTINGS
========================================================= */

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


/* =========================================================
   CURRENT YEAR
========================================================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================================
   MOBILE MENU
========================================================= */

const mobileMenuButton = document.getElementById("mobileMenuButton");
const mainNav = document.getElementById("mainNav");

if (mobileMenuButton && mainNav) {
    mobileMenuButton.addEventListener("click", () => {
        const open = mainNav.classList.toggle("open");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            String(open)
        );
    });

    mainNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mainNav.classList.remove("open");
            mobileMenuButton.setAttribute("aria-expanded", "false");
        });
    });
}


/* =========================================================
   REVEAL ON SCROLL
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

if (reducedMotion) {
    revealElements.forEach(element => element.classList.add("visible"));
} else {
    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -28px 0px"
        }
    );

    revealElements.forEach(element => revealObserver.observe(element));
}


/* =========================================================
   KPI COUNTERS
========================================================= */

const counters = document.querySelectorAll(".counter");
const COUNTER_DURATION = 1500;

function easeOutCubic(progress) {
    return 1 - Math.pow(1 - progress, 3);
}

function animateCounter(counter) {
    if (counter.dataset.animated === "true") return;

    counter.dataset.animated = "true";

    const start = Number(counter.dataset.start || 0);
    const target = Number(counter.dataset.target);
    const suffix = counter.dataset.suffix || "";

    if (reducedMotion) {
        counter.textContent = `${target}${suffix}`;
        return;
    }

    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / COUNTER_DURATION, 1);
        const eased = easeOutCubic(progress);
        const value = Math.round(start + (target - start) * eased);

        counter.textContent = `${value}${suffix}`;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            counter.textContent = `${target}${suffix}`;
        }
    }

    requestAnimationFrame(update);
}

if (counters.length) {
    const counterObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.4 }
    );

    counters.forEach(counter => counterObserver.observe(counter));
}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".main-nav a");

function updateActiveNavigation() {
    const position = window.scrollY + 150;
    let activeSection = "";

    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (position >= top && position < bottom) {
            activeSection = section.id;
        }
    });

    navigationLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${activeSection}`) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveNavigation, { passive: true });
window.addEventListener("load", updateActiveNavigation);


/* =========================================================
   CASE STUDY DATA
========================================================= */

const caseStudyData = {
    logistics: {
        kicker: "Supply Chain Transformation • Rattan Direct",
        title: "Restructuring warehousing and final-mile operations",
        summary:
            "A commercial and operational transformation across warehousing, 3PL and final-mile delivery that materially changed the logistics cost base.",
        problem:
            "Warehousing, storage, unloading, picking and delivery structures were creating significant cost and operational friction. The business needed a more efficient logistics model without losing service continuity.",
        analysis:
            "Historical rate cards, invoice structures, storage models, unloading charges, picking methods and final-mile costs were compared across providers. The review focused on the commercial drivers underneath the headline rates rather than treating logistics as one blended cost.",
        action:
            "Benchmarked providers, negotiated commercial terms and SLAs, redesigned parts of the picking-cost model, challenged invoice structures and led the operational transition from Denholm into a more efficient ArrowXL/RXL model while managing inbound continuity.",
        tools:
            "Rate-card and invoice analysis, 3PL commercial negotiation, SLA review, warehouse capacity planning, transition governance, executive reporting and operational issue management.",
        result:
            "~£520K annual logistics savings",
        resultDetail:
            "Approximately £400K in warehouse/3PL savings plus approximately £120K in final-mile savings.",
        learning:
            "Demonstrates commercial judgement, provider management, procurement-style negotiation, operating-model redesign and the ability to turn detailed cost analysis into a material business outcome."
    },

    china: {
        kicker: "International Supplier & Manufacturing Development • China • March 2025",
        title: "Supplier continuity and early-stage manufacturing formalisation",
        summary:
            "A two-week China trip combining supplier engagement, business-continuity negotiation, manufacturing learning and practical quality/process formalisation at an early-stage Hunan furniture operation.",
        problem:
            "Rattan Direct was navigating a difficult cash-flow period while relying on key Chinese suppliers for 2025 production. At the same time, a new Hunan operation intended initially to supply Rattan Direct was producing but still operating with relatively informal work instructions and process controls.",
        analysis:
            "The first week was used to observe established supplier practices across factory layout, workstations, manufacturing processes, work instructions, quality checks, health and safety, packaging and logistics. Customer-return evidence and known product issues were also used to compare expected quality with what was being produced.",
        action:
            "Supported Robert Fernandez and sourcing consultant Vincent/Du Wang during a face-to-face continuity negotiation with Vivid, explaining the logistics savings and expected cash-flow improvement. At the Hunan operation, physically created QC sheets, workstation layouts, process-flow documentation, safety rules, inspection checklists, illustrated defect standards, packing standards, 5S/housekeeping guidance and worker instructions. Also advised on weaving retention, critical weld integrity, full powder-coat coverage and handling of freshly coated frames to prevent finish marks.",
        tools:
            "Supplier review, approved samples, customer photos/complaint evidence, product knowledge, visual inspection, QC documentation, work instructions, 5S, process mapping, packaging standards and factory-floor observation.",
        result:
            "Supplier production restarted and process controls were strengthened",
        resultDetail:
            "Vivid agreed to resume 2025 production after the negotiation, with aluminium frames already being worked on before the visit ended. The Hunan team adopted the quality/process recommendations described above.",
        learning:
            "Demonstrates direct international supplier exposure, business-continuity support, manufacturing-process understanding, quality-at-source thinking and practical factory-process formalisation without overstating ownership of the whole factory setup.",
        gallery: [
            {
                src: "images/china/china-vivid-supplier-visit.webp",
                alt: "Victor Akoyo outside the Vivid supplier factory in China"
            },
            {
                src: "images/china/china-product-quality-review.webp",
                alt: "Victor reviewing a woven outdoor furniture product during a China supplier visit"
            },
            {
                src: "images/china/china-aluminium-frame-production.webp",
                alt: "Aluminium outdoor furniture frames during production at a supplier factory"
            },
            {
                src: "images/china/china-frame-welding-process.webp",
                alt: "Welding equipment and aluminium furniture frames during production"
            },
            {
                src: "images/china/china-weaving-quality-detail.webp",
                alt: "Close-up of woven furniture showing the weaving process and quality detail"
            },
            {
                src: "images/china/china-finished-outdoor-furniture.webp",
                alt: "Finished woven outdoor furniture at a China supplier"
            }
        ]
    },

    eos: {
        kicker: "Business Operations • Optimise Outsourcing",
        title: "Embedding an operating system for execution",
        summary:
            "Internal EOS Integrator ownership across planning, meeting cadence, Rocks, scorecards, accountability and issue follow-through.",
        problem:
            "A growing business needed a repeatable mechanism for turning leadership priorities into visible commitments, weekly follow-through and cross-functional accountability.",
        analysis:
            "The requirement was broader than running meetings. Vision, quarterly priorities, scorecards, Issues/IDS, current/future accountabilities and department-level execution needed to connect to one operating rhythm.",
        action:
            "Functioned as the internal Integrator: owned the quarterly VTO review cadence, ran SLT Level 10 meetings, managed company and departmental Rocks in Sage HR using RAG status, created and maintained current/future Accountability Charts, owned the Issues List and Microsoft Teams Planner follow-up, operated daily huddles and other tactical meeting rhythms, and ran the weekly Win the Week execution practice.",
        tools:
            "EOS/VTO, Level 10s, IDS, quarterly Rocks, Sage HR RAG tracking, current/future Accountability Charts, Microsoft Teams Planner, KPI scorecards, daily huddles, cash-flow tactical reviews and quarterly organisational check-ups.",
        result:
            "A structured cross-functional execution rhythm",
        resultDetail:
            "Leadership priorities were connected to weekly measures, quarterly Rocks, issue-solving, ownership and recurring review rather than left as isolated plans.",
        learning:
            "Demonstrates operating-system thinking: connecting vision, measures, meetings, accountability and decision-making. Strategic content was collaboratively authored; the operating cadence and Integrator mechanism were the core area of ownership."
    },

    quality: {
        kicker: "Quality + Product Improvement • Rattan Direct",
        title: "Reducing returns through product and process improvement",
        summary:
            "A cross-functional quality improvement effort spanning supplier quality, packaging, handling, delivery, reverse logistics and product-design changes.",
        problem:
            "Returns were being driven by several failure modes across the product journey, including defects, packaging weaknesses, handling damage and delivery-related issues.",
        analysis:
            "Return data, recurring defect patterns, customer photographs, warehouse observations, delivery issues and supplier-quality findings were used to distinguish where failures were occurring and where controls or product changes were needed.",
        action:
            "Coordinated supplier-quality actions, packaging improvements, delivery-quality reviews and reverse-logistics interventions. Product-design changes included moving some feet from plastic to aluminium where transit damage was recurring. China supplier visits also allowed customer evidence to be taken back into manufacturing discussions.",
        tools:
            "Return-cause analysis, supplier reviews, customer evidence, packaging reviews, logistics-quality reviews, corrective-action tracking and product-design feedback.",
        result:
            "Returns reduced from ~12% to ~4% by CBM",
        resultDetail:
            "The improvement came from combined supplier, packaging, handling, product and logistics interventions rather than one isolated change.",
        learning:
            "Demonstrates end-to-end quality thinking: following failure from customer experience back through product, supplier, warehouse and delivery processes."
    },

    automation: {
        kicker: "AI-Enabled Operations • Optimise Outsourcing",
        title: "From leadership meeting transcript to management intelligence",
        summary:
            "A live workflow that converted recurring senior-leadership meeting information into structured AI-assisted reports and returned them to Microsoft Teams.",
        problem:
            "SLT Level 10 meetings generated transcripts that required repetitive manual review, structuring and reporting before the main issues, actions and insights could be shared consistently.",
        analysis:
            "The workflow needed to fit the existing Microsoft 365 environment, retrieve the right meeting/transcript information, apply a repeatable analysis structure, manage processing state and return the result to the same operating context.",
        action:
            "Built a Make.com workflow using SharePoint monitoring, HTTP/Microsoft Graph retrieval, iteration, meeting/transcript retrieval, OpenAI analysis, Markdown formatting, Teams delivery and Data Store checks/updates to control repeat processing.",
        tools:
            "Make.com, SharePoint, Microsoft Graph/HTTP, OpenAI, Markdown, Microsoft Teams, Make Data Store and structured reporting logic.",
        result:
            "Live workflow used on real SLT Level 10 meetings",
        resultDetail:
            "Converted a recurring manual reporting task into a repeatable workflow embedded in the existing leadership operating rhythm.",
        learning:
            "Demonstrates practical workflow automation and the ability to connect AI to a real operating need, while keeping AI as one component of a wider business process."
    },

    manufacturing: {
        kicker: "Manufacturing Quality • Auto Springs East Africa",
        title: "Reducing U-bolt rejection",
        summary:
            "A manufacturing-quality improvement effort using structured quality methods to strengthen process control and reduce rejection.",
        problem:
            "U-bolt rejection performance required stronger process control, measurement discipline and structured analysis of recurring variation.",
        analysis:
            "Production quality performance was assessed through inspection data and structured quality tools to understand failure modes, measurement reliability and process conditions contributing to rejection.",
        action:
            "Applied production quality controls, SPC, PFMEA, MSA and corrective-action practices while working with production teams to strengthen forming controls, checking methods and defect prevention.",
        tools:
            "SPC, PFMEA, MSA, control plans, production inspection, corrective action and ISO 9001 quality documentation.",
        result:
            "U-bolt rejection reduced from ~4% to ~2%",
        resultDetail:
            "The improvement came from stronger process controls, measurement discipline and structured manufacturing-quality improvement.",
        learning:
            "Demonstrates an engineering-quality foundation and practical use of structured quality tools to produce measurable manufacturing improvement."
    },

    complaints: {
        kicker: "Quality Leadership • Tile & Carpet Centre",
        title: "Reducing customer complaints",
        summary:
            "A manufacturing-quality improvement effort that strengthened inspection, corrective action and production-quality discipline.",
        problem:
            "Customer complaints were running at an elevated level and required better control of recurring defects and more disciplined follow-through.",
        analysis:
            "Complaint patterns, production issues and inspection findings were used to identify recurring causes and where manufacturing-quality controls needed to be strengthened.",
        action:
            "Led quality inspection and corrective-action activity, worked with production teams on recurring defects, strengthened quality controls and maintained audit readiness.",
        tools:
            "Complaint analysis, production inspection, root-cause analysis, corrective action, quality audits and KEBS compliance controls.",
        result:
            "Customer complaints reduced from ~12% to ~5%",
        resultDetail:
            "The reduction was achieved while maintaining 100% KEBS audit compliance.",
        learning:
            "Demonstrates quality leadership, structured problem solving and the ability to convert customer-quality signals into production improvement."
    }
};


/* =========================================================
   CASE STUDY MODAL
========================================================= */

const caseModal = document.getElementById("caseModal");
const caseModalPanel = caseModal
    ? caseModal.querySelector(".case-modal-panel")
    : null;

const caseModalKicker = document.getElementById("caseModalKicker");
const caseModalTitle = document.getElementById("caseModalTitle");
const caseModalSummary = document.getElementById("caseModalSummary");
const caseModalProblem = document.getElementById("caseModalProblem");
const caseModalAnalysis = document.getElementById("caseModalAnalysis");
const caseModalAction = document.getElementById("caseModalAction");
const caseModalTools = document.getElementById("caseModalTools");
const caseModalResult = document.getElementById("caseModalResult");
const caseModalResultDetail = document.getElementById(
    "caseModalResultDetail"
);
const caseModalLearning = document.getElementById("caseModalLearning");
const caseModalContact = document.getElementById("caseModalContact");
const caseModalMedia = document.getElementById("caseModalMedia");

let lastModalTrigger = null;

function populateCaseModal(caseKey) {
    const data = caseStudyData[caseKey];

    if (!data) return false;

    caseModalKicker.textContent = data.kicker;
    caseModalTitle.textContent = data.title;
    caseModalSummary.textContent = data.summary;
    caseModalProblem.textContent = data.problem;
    caseModalAnalysis.textContent = data.analysis;
    caseModalAction.textContent = data.action;
    caseModalTools.textContent = data.tools;
    caseModalResult.textContent = data.result;
    caseModalResultDetail.textContent = data.resultDetail;
    caseModalLearning.textContent = data.learning;

    if (caseModalMedia) {
        caseModalMedia.innerHTML = "";

        if (Array.isArray(data.gallery) && data.gallery.length) {
            const gallery = document.createElement("div");
            gallery.className = "china-gallery";

            data.gallery.forEach(item => {
                const figure = document.createElement("figure");
                const image = document.createElement("img");

                image.src = item.src;
                image.alt = item.alt;
                image.loading = "lazy";

                figure.appendChild(image);
                gallery.appendChild(figure);
            });

            caseModalMedia.appendChild(gallery);
            caseModalMedia.hidden = false;
        } else {
            caseModalMedia.hidden = true;
        }
    }

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

    lastModalTrigger = trigger || document.activeElement;

    caseModal.classList.add("open");
    caseModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    window.setTimeout(() => {
        caseModalPanel.focus();
    }, 30);
}

function closeCaseModal() {
    if (!caseModal) return;

    caseModal.classList.remove("open");
    caseModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (
        lastModalTrigger &&
        typeof lastModalTrigger.focus === "function"
    ) {
        lastModalTrigger.focus();
    }
}

document.querySelectorAll("[data-case]").forEach(trigger => {
    trigger.addEventListener("click", () => {
        openCaseModal(trigger.dataset.case, trigger);
    });

    if (trigger.getAttribute("role") === "button") {
        trigger.addEventListener("keydown", event => {
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
        });
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

document.addEventListener("keydown", event => {
    if (
        event.key === "Escape" &&
        caseModal &&
        caseModal.classList.contains("open")
    ) {
        closeCaseModal();
    }
});


/* =========================================================
   PARTICLE BACKGROUND
========================================================= */

const canvas = document.getElementById("particleCanvas");

if (canvas && !reducedMotion) {
    const context = canvas.getContext("2d");

    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let particles = [];
    let animationFrame = null;

    const mouse = {
        x: null,
        y: null,
        radius: 165
    };

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;

        pixelRatio = Math.min(
            window.devicePixelRatio || 1,
            2
        );

        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

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
            this.x = Math.random() * width;
            this.y = Math.random() * height;

            this.size =
                Math.random() * 1.6 + 0.7;

            this.velocityX =
                (Math.random() - 0.5) * 0.16;

            this.velocityY =
                (Math.random() - 0.5) * 0.16;

            this.forceX = 0;
            this.forceY = 0;

            this.opacity =
                Math.random() * 0.14 + 0.20;

            this.tone =
                Math.random() > 0.72
                    ? "teal"
                    : "blue";
        }

        update() {
            this.x +=
                this.velocityX +
                this.forceX;

            this.y +=
                this.velocityY +
                this.forceY;

            this.forceX *= 0.90;
            this.forceY *= 0.90;

            if (
                mouse.x !== null &&
                mouse.y !== null
            ) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;

                const distance = Math.sqrt(
                    dx * dx + dy * dy
                );

                if (
                    distance < mouse.radius &&
                    distance > 0
                ) {
                    const strength =
                        (
                            mouse.radius -
                            distance
                        ) / mouse.radius;

                    this.forceX +=
                        (dx / distance) *
                        strength *
                        0.25;

                    this.forceY +=
                        (dy / distance) *
                        strength *
                        0.25;
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
                this.tone === "teal"
                    ? `rgba(22, 140, 133, ${this.opacity})`
                    : `rgba(22, 116, 168, ${this.opacity})`;

            context.fill();
        }
    }

    function createParticles() {
        particles = [];

        const screenArea =
            width * height;

        let count =
            Math.floor(
                screenArea / 23500
            );

        if (width < 760) {
            count = Math.min(
                Math.max(count, 18),
                26
            );
        } else {
            count = Math.min(
                Math.max(count, 42),
                68
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
                ? 82
                : 116;

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
                        ) * 0.11;

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

                    context.lineWidth = 0.6;

                    context.stroke();
                }
            }
        }
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
                mouse.x = event.clientX;
                mouse.y = event.clientY;
            },
            { passive: true }
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

window.addEventListener("resize", () => {
    if (
        window.innerWidth > 760 &&
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
});
