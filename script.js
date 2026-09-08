/* =========================================================
   VICTOR AKOYO PROFESSIONAL PORTFOLIO
   INTERACTION + ANIMATION
   ========================================================= */


/* =========================================================
   1. REDUCED MOTION
   ========================================================= */

const reduceMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


/* =========================================================
   2. CURRENT YEAR
   ========================================================= */

const currentYear =
  document.getElementById(
    "current-year"
  );


if (currentYear) {

  currentYear.textContent =
    new Date().getFullYear();

}


/* =========================================================
   3. MOBILE NAVIGATION
   ========================================================= */

const menuToggle =
  document.getElementById(
    "menu-toggle"
  );


const mainNavigation =
  document.getElementById(
    "main-navigation"
  );


if (
  menuToggle &&
  mainNavigation
) {

  menuToggle.addEventListener(
    "click",
    () => {

      const isOpen =
        mainNavigation
          .classList
          .toggle("open");


      menuToggle
        .classList
        .toggle(
          "active",
          isOpen
        );


      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    }
  );


  mainNavigation
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {

          mainNavigation
            .classList
            .remove("open");


          menuToggle
            .classList
            .remove("active");


          menuToggle.setAttribute(
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


if (reduceMotion) {

  revealElements.forEach(
    element => {

      element
        .classList
        .add("visible");

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
          "0px 0px -40px 0px"
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
   5. ACTIVE NAVIGATION
   ========================================================= */

const sections =
  document.querySelectorAll(
    "main section[id]"
  );


const navLinks =
  document.querySelectorAll(
    ".main-navigation a"
  );


const updateActiveNavigation =
  () => {

    let currentSection = "";


    sections.forEach(
      section => {

        const sectionTop =
          section.offsetTop -
          150;


        if (
          window.scrollY >=
          sectionTop
        ) {

          currentSection =
            section.id;

        }

      }
    );


    navLinks.forEach(
      link => {

        link.classList.remove(
          "active"
        );


        const href =
          link.getAttribute(
            "href"
          );


        if (
          href ===
          `#${currentSection}`
        ) {

          link.classList.add(
            "active"
          );

        }

      }
    );

  };


window.addEventListener(
  "scroll",
  updateActiveNavigation,
  {
    passive: true
  }
);


updateActiveNavigation();


/* =========================================================
   6. KPI COUNTERS
   ========================================================= */

/*
   IMPORTANT:

   £520K:
   0 -> 520

   19 KPIs:
   0 -> 19

   12% -> 4%:
   "12%" remains fixed.
   Only the second number moves:
   12 -> 11 -> ... -> 4

   8% -> 4%:
   "8%" remains fixed.
   Only the second number moves:
   8 -> 7 -> ... -> 4
*/


const impactNumbers =
  document.querySelectorAll(
    ".impact-number"
  );


/*
   Returned to a normal transition speed.
*/

const KPI_DURATION = 1800;


/*
   Smooth deceleration.
*/

const easeOutCubic =
  progress => {

    return (
      1 -
      Math.pow(
        1 - progress,
        3
      )
    );

  };


const getCounterConfig =
  element => {

    const type =
      element.dataset.counter;


    switch (type) {

      case "savings":

        return {
          type: "single",
          start: 0,
          end: 520,
          prefix: "£",
          suffix: "K"
        };


      case "returns":

        return {
          type: "reduction",
          baseline: 12,
          start: 12,
          end: 4
        };


      case "quality":

        return {
          type: "reduction",
          baseline: 8,
          start: 8,
          end: 4
        };


      case "kpis":

        return {
          type: "single",
          start: 0,
          end: 19,
          prefix: "",
          suffix: " KPIs"
        };


      default:

        return null;

    }

  };


const animateKPI =
  element => {

    if (
      element.dataset.animated ===
      "true"
    ) {

      return;

    }


    const original =
      element.textContent.trim();


    const config =
      getCounterConfig(
        element
      );


    if (!config) {

      return;

    }


    element.dataset.animated =
      "true";


    if (reduceMotion) {

      element.textContent =
        original;

      return;

    }


    const startTime =
      performance.now();


    const updateCounter =
      currentTime => {

        const elapsed =
          currentTime -
          startTime;


        const progress =
          Math.min(
            elapsed /
              KPI_DURATION,
            1
          );


        const easedProgress =
          easeOutCubic(
            progress
          );


        /* ---------------------------------------------
           STANDARD COUNTER
           --------------------------------------------- */

        if (
          config.type ===
          "single"
        ) {

          const currentValue =
            Math.round(

              config.start +

              (
                config.end -
                config.start
              ) *

              easedProgress

            );


          element.textContent =
            `${config.prefix}${currentValue}${config.suffix}`;

        }


        /* ---------------------------------------------
           REDUCTION COUNTER

           Example:

           12% -> 12%
           12% -> 11%
           12% -> 10%
           ...
           12% -> 4%

           The baseline NEVER changes.
           --------------------------------------------- */

        if (
          config.type ===
          "reduction"
        ) {

          const movingValue =
            Math.round(

              config.start +

              (
                config.end -
                config.start
              ) *

              easedProgress

            );


          element.textContent =
            `${config.baseline}% → ${movingValue}%`;

        }


        if (
          progress < 1
        ) {

          requestAnimationFrame(
            updateCounter
          );

        } else {

          /*
             Restore the exact original
             evidence statement.
          */

          element.textContent =
            original;

        }

      };


    requestAnimationFrame(
      updateCounter
    );

  };


if (
  "IntersectionObserver" in window
) {

  const kpiObserver =
    new IntersectionObserver(

      entries => {

        entries.forEach(
          entry => {

            if (
              entry.isIntersecting
            ) {

              animateKPI(
                entry.target
              );


              kpiObserver
                .unobserve(
                  entry.target
                );

            }

          }
        );

      },

      {
        threshold: 0.5
      }

    );


  impactNumbers.forEach(
    number => {

      kpiObserver.observe(
        number
      );

    }
  );

} else {

  impactNumbers.forEach(
    animateKPI
  );

}


/* =========================================================
   7. CURSOR GLOW
   ========================================================= */

const cursorGlow =
  document.getElementById(
    "cursor-glow"
  );


if (
  cursorGlow &&
  !reduceMotion &&
  window.matchMedia(
    "(pointer: fine)"
  ).matches
) {

  let targetX = 0;
  let targetY = 0;

  let currentX = 0;
  let currentY = 0;


  window.addEventListener(
    "mousemove",
    event => {

      targetX =
        event.clientX;

      targetY =
        event.clientY;

      cursorGlow.style.opacity =
        "1";

    },
    {
      passive: true
    }
  );


  document.addEventListener(
    "mouseleave",
    () => {

      cursorGlow.style.opacity =
        "0";

    }
  );


  const animateCursor =
    () => {

      currentX +=
        (
          targetX -
          currentX
        ) * 0.12;


      currentY +=
        (
          targetY -
          currentY
        ) * 0.12;


      cursorGlow.style.transform =
        `translate(
          ${currentX - 125}px,
          ${currentY - 125}px
        )`;


      requestAnimationFrame(
        animateCursor
      );

    };


  animateCursor();

}


/* =========================================================
   8. INTERACTIVE CARD TILT
   ========================================================= */

const interactiveCards =
  document.querySelectorAll(
    ".impact-card, .expertise-card"
  );


if (
  !reduceMotion &&
  window.matchMedia(
    "(pointer: fine)"
  ).matches
) {

  interactiveCards.forEach(
    card => {

      card.addEventListener(
        "mousemove",
        event => {

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
            ) / 45;


          const rotateY =
            (
              x - centerX
            ) / 45;


          card.style.transform =
            `
              perspective(900px)
              translateY(-6px)
              rotateX(${rotateX}deg)
              rotateY(${rotateY}deg)
            `;

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          card.style.transform =
            "";

        }
      );

    }
  );

}


/* =========================================================
   9. NETWORK BACKGROUND
   ========================================================= */

const canvas =
  document.getElementById(
    "network-canvas"
  );


if (
  canvas &&
  !reduceMotion
) {

  const context =
    canvas.getContext("2d");


  let width;
  let height;

  let particles = [];

  let animationFrame;


  const mouse = {

    x: null,
    y: null,

    radius: 130

  };


  const resizeCanvas =
    () => {

      const pixelRatio =
        Math.min(
          window.devicePixelRatio || 1,
          2
        );


      width =
        window.innerWidth;


      height =
        window.innerHeight;


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

    };


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


      this.radius =
        Math.random() *
        1.4 +
        0.5;


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

    }


    update() {

      this.x +=
        this.velocityX;


      this.y +=
        this.velocityY;


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


      /*
         Very subtle interaction
         with mouse movement.
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

          const force =
            (
              mouse.radius -
              distance
            ) /
            mouse.radius;


          this.x +=
            (
              dx /
              distance
            ) *
            force *
            0.35;


          this.y +=
            (
              dy /
              distance
            ) *
            force *
            0.35;

        }

      }

    }


    draw() {

      context.beginPath();


      context.arc(
        this.x,
        this.y,
        this.radius,
        0,
        Math.PI * 2
      );


      context.fillStyle =
        "rgba(8, 105, 173, 0.26)";


      context.fill();

    }

  }


  const createParticles =
    () => {

      particles = [];


      /*
         Keep the background visually
         restrained on small screens.
      */

      const area =
        width *
        height;


      const particleCount =
        Math.min(
          Math.max(
            Math.floor(
              area / 23000
            ),
            28
          ),
          75
        );


      for (
        let i = 0;
        i < particleCount;
        i++
      ) {

        particles.push(
          new Particle()
        );

      }

    };


  const connectParticles =
    () => {

      const connectionDistance =
        width < 700
          ? 90
          : 120;


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
              0.12;


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
                105,
                173,
                ${opacity}
              )`;


            context.lineWidth =
              0.7;


            context.stroke();

          }

        }

      }

    };


  const animateNetwork =
    () => {

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
          animateNetwork
        );

    };


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
          180
        );

    }
  );


  /*
     Stop unnecessary processing
     while the browser tab is hidden.
  */

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

        animateNetwork();

      }

    }
  );


  resizeCanvas();

  animateNetwork();

}


/* =========================================================
   10. SUBTLE HERO PARALLAX
   ========================================================= */

const portraitOrbit =
  document.querySelector(
    ".portrait-orbit"
  );


if (
  portraitOrbit &&
  !reduceMotion &&
  window.matchMedia(
    "(pointer: fine)"
  ).matches
) {

  const hero =
    document.querySelector(
      ".hero"
    );


  if (hero) {

    hero.addEventListener(
      "mousemove",
      event => {

        const rect =
          hero.getBoundingClientRect();


        const x =
          (
            event.clientX -
            rect.left
          ) /
          rect.width -
          0.5;


        const y =
          (
            event.clientY -
            rect.top
          ) /
          rect.height -
          0.5;


        portraitOrbit.style.transform =
          `
            translate(
              ${x * 10}px,
              ${y * 10}px
            )
          `;

      }
    );


    hero.addEventListener(
      "mouseleave",
      () => {

        portraitOrbit.style.transform =
          "translate(0, 0)";

      }
    );

  }

}


/* =========================================================
   11. CONTACT CARD POINTER EFFECT
   ========================================================= */

const contactCards =
  document.querySelectorAll(
    ".contact-card"
  );


if (
  !reduceMotion &&
  window.matchMedia(
    "(pointer: fine)"
  ).matches
) {

  contactCards.forEach(
    card => {

      card.addEventListener(
        "mousemove",
        event => {

          const rect =
            card.getBoundingClientRect();


          const x =
            event.clientX -
            rect.left;


          const y =
            event.clientY -
            rect.top;


          card.style.background =
            `
              radial-gradient(
                circle at
                ${x}px
                ${y}px,
                rgba(
                  121,
                  188,
                  232,
                  0.15
                ),
                rgba(
                  255,
                  255,
                  255,
                  0.055
                )
                45%
              )
            `;

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          card.style.background =
            "";

        }
      );

    }
  );

}
