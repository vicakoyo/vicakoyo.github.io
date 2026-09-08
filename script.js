/* =========================================================
   VICTOR AKOYO PROFESSIONAL PORTFOLIO
   script.js

   Interactive features:
   1. Mobile navigation
   2. Header scroll state
   3. Smooth anchor navigation
   4. Scroll reveal animations
   5. Active navigation tracking
   6. Slow KPI counters
   7. Interactive card tilt
   8. Hero parallax
   9. Cursor glow
   10. Animated network background
   11. Visibility / performance controls
   ========================================================= */


document.addEventListener(
  "DOMContentLoaded",
  () => {

    /* =====================================================
       BASIC SETTINGS
       ===================================================== */

    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;


    const isTouchDevice =
      window.matchMedia(
        "(pointer: coarse)"
      ).matches;



    /* =====================================================
       1. MOBILE NAVIGATION
       ===================================================== */

    const menuButton =
      document.getElementById(
        "mobile-menu-button"
      );


    const navigation =
      document.getElementById(
        "main-nav"
      );


    if (
      menuButton &&
      navigation
    ) {

      menuButton.addEventListener(
        "click",
        () => {

          const isOpen =
            navigation.classList.toggle(
              "open"
            );


          menuButton.classList.toggle(
            "active",
            isOpen
          );


          menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
          );


          document.body.classList.toggle(
            "menu-open",
            isOpen
          );

        }
      );


      navigation
        .querySelectorAll("a")
        .forEach(link => {

          link.addEventListener(
            "click",
            () => {

              navigation.classList.remove(
                "open"
              );


              menuButton.classList.remove(
                "active"
              );


              menuButton.setAttribute(
                "aria-expanded",
                "false"
              );


              document.body.classList.remove(
                "menu-open"
              );

            }
          );

        });

    }



    /* =====================================================
       2. HEADER SCROLL STATE
       ===================================================== */

    const header =
      document.querySelector(
        ".site-header"
      );


    const updateHeader =
      () => {

        if (!header) {
          return;
        }


        header.classList.toggle(
          "scrolled",
          window.scrollY > 20
        );

      };


    updateHeader();


    window.addEventListener(
      "scroll",
      updateHeader,
      {
        passive: true
      }
    );



    /* =====================================================
       3. SMOOTH INTERNAL NAVIGATION
       ===================================================== */

    document
      .querySelectorAll(
        'a[href^="#"]'
      )
      .forEach(link => {

        link.addEventListener(
          "click",
          event => {

            const href =
              link.getAttribute(
                "href"
              );


            if (
              !href ||
              href === "#"
            ) {
              return;
            }


            const target =
              document.querySelector(
                href
              );


            if (!target) {
              return;
            }


            event.preventDefault();


            target.scrollIntoView({
              behavior:
                reduceMotion
                  ? "auto"
                  : "smooth",

              block: "start"
            });

          }
        );

      });



    /* =====================================================
       4. SCROLL REVEAL
       ===================================================== */

    const revealElements =
      document.querySelectorAll(
        ".reveal"
      );


    if (
      reduceMotion ||
      !("IntersectionObserver" in window)
    ) {

      revealElements.forEach(
        element => {

          element.classList.add(
            "revealed"
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
                    .add(
                      "revealed"
                    );


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
              "0px 0px -50px 0px"
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



    /* =====================================================
       5. ACTIVE NAVIGATION TRACKING
       ===================================================== */

    const sections =
      document.querySelectorAll(
        "main section[id]"
      );


    const navLinks =
      document.querySelectorAll(
        '.main-nav a[href^="#"]'
      );


    if (
      "IntersectionObserver" in window
    ) {

      const sectionObserver =
        new IntersectionObserver(

          entries => {

            entries.forEach(
              entry => {

                if (
                  !entry.isIntersecting
                ) {
                  return;
                }


                const sectionID =
                  entry.target.id;


                navLinks.forEach(
                  link => {

                    const href =
                      link.getAttribute(
                        "href"
                      );


                    link.classList.toggle(
                      "active",
                      href ===
                        `#${sectionID}`
                    );

                  }
                );

              }
            );

          },

          {
            rootMargin:
              "-30% 0px -60% 0px",

            threshold: 0
          }

        );


      sections.forEach(
        section => {

          sectionObserver.observe(
            section
          );

        }
      );

    }



    /* =====================================================
       6. SLOW KPI COUNTERS
       ===================================================== */

    const impactNumbers =
      document.querySelectorAll(
        ".impact-number"
      );


    /*
       Duration is intentionally long.

       4.8 seconds makes the movement
       visible and deliberate rather
       than looking like a slot machine.
    */

    const KPI_DURATION = 4800;


    const parseImpactNumber =
      original => {

        const clean =
          original
            .replace(/,/g, "")
            .trim();


        /*
           £520K
        */

        if (
          clean.includes("520") &&
          clean.includes("£")
        ) {

          return {
            start: 0,
            end: 520,
            prefix:
              clean.startsWith("~")
                ? "~£"
                : "£",
            suffix: "K"
          };

        }


        /*
           19 KPIs
        */

        if (
          clean.includes("19") &&
          clean
            .toLowerCase()
            .includes("kpi")
        ) {

          return {
            start: 0,
            end: 19,
            prefix: "",
            suffix: " KPIs"
          };

        }


        /*
           12% → 4%
        */

        if (
          clean.includes("12") &&
          clean.includes("4") &&
          clean.includes("→")
        ) {

          return {
            start: 0,
            end: 12,
            prefix: "",
            suffix: "% → 4%"
          };

        }


        /*
           8% → 4%
        */

        if (
          clean.includes("8") &&
          clean.includes("4") &&
          clean.includes("→")
        ) {

          return {
            start: 0,
            end: 8,
            prefix: "",
            suffix: "% → 4%"
          };

        }


        return null;

      };


    const easeOutQuart =
      progress => {

        return (
          1 -
          Math.pow(
            1 - progress,
            4
          )
        );

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
          parseImpactNumber(
            original
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


        const update =
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


            const eased =
              easeOutQuart(
                progress
              );


            const value =
              Math.round(

                config.start +

                (
                  config.end -
                  config.start
                ) *

                eased

              );


            element.textContent =
              `${config.prefix}${value}${config.suffix}`;


            if (
              progress < 1
            ) {

              requestAnimationFrame(
                update
              );

            } else {

              /*
                 Restore the exact
                 evidence wording
                 from the HTML.
              */

              element.textContent =
                original;

            }

          };


        requestAnimationFrame(
          update
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



    /* =====================================================
       7. INTERACTIVE CARD TILT
       ===================================================== */

    const tiltCards =
      document.querySelectorAll(
        ".impact-card"
      );


    if (
      !reduceMotion &&
      !isTouchDevice
    ) {

      tiltCards.forEach(
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
                ) /
                28;


              const rotateY =
                (
                  x - centerX
                ) /
                28;


              card.style.transform =
                `
                perspective(900px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-5px)
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



    /* =====================================================
       8. HERO PARALLAX
       ===================================================== */

    const hero =
      document.querySelector(
        ".hero"
      );


    const heroVisual =
      document.querySelector(
        ".hero-visual"
      );


    if (
      hero &&
      heroVisual &&
      !reduceMotion &&
      !isTouchDevice
    ) {

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
            rect.width;


          const y =
            (
              event.clientY -
              rect.top
            ) /
            rect.height;


          const moveX =
            (
              x - 0.5
            ) *
            18;


          const moveY =
            (
              y - 0.5
            ) *
            14;


          heroVisual.style.transform =
            `
            translate3d(
              ${moveX}px,
              ${moveY}px,
              0
            )
            `;

        }
      );


      hero.addEventListener(
        "mouseleave",
        () => {

          heroVisual.style.transform =
            "translate3d(0,0,0)";

        }
      );

    }



    /* =====================================================
       9. CURSOR GLOW
       ===================================================== */

    if (
      !reduceMotion &&
      !isTouchDevice
    ) {

      const glow =
        document.createElement(
          "div"
        );


      glow.className =
        "cursor-glow";


      document.body.appendChild(
        glow
      );


      let targetX = 0;
      let targetY = 0;

      let currentX = 0;
      let currentY = 0;


      document.addEventListener(
        "mousemove",
        event => {

          targetX =
            event.clientX;


          targetY =
            event.clientY;


          glow.style.opacity =
            "1";

        }
      );


      document.addEventListener(
        "mouseleave",
        () => {

          glow.style.opacity =
            "0";

        }
      );


      const animateGlow =
        () => {

          currentX +=
            (
              targetX -
              currentX
            ) *
            0.12;


          currentY +=
            (
              targetY -
              currentY
            ) *
            0.12;


          glow.style.left =
            `${currentX}px`;


          glow.style.top =
            `${currentY}px`;


          requestAnimationFrame(
            animateGlow
          );

        };


      animateGlow();

    }



    /* =====================================================
       10. ANIMATED NETWORK BACKGROUND
       ===================================================== */

    const canvas =
      document.getElementById(
        "network-canvas"
      );


    if (
      canvas &&
      !reduceMotion
    ) {

      const context =
        canvas.getContext(
          "2d"
        );


      if (context) {

        let width = 0;
        let height = 0;

        let particles = [];

        let animationFrame = null;

        let pageVisible = true;


        const mouse = {
          x: null,
          y: null,
          radius: 145
        };


        /*
           Particle density is dynamic.

           Large monitors get more
           nodes but we cap them to
           avoid wasting CPU.
        */

        const calculateParticleCount =
          () => {

            const area =
              width * height;


            return Math.min(
              72,
              Math.max(
                30,
                Math.floor(
                  area /
                  30000
                )
              )
            );

          };


        class Particle {

          constructor() {
            this.reset(true);
          }


          reset(randomPosition = false) {

            this.x =
              randomPosition
                ? Math.random() *
                  width
                : (
                    Math.random() >
                    0.5
                      ? 0
                      : width
                  );


            this.y =
              Math.random() *
              height;


            this.radius =
              Math.random() *
              1.3 +
              0.6;


            this.speedX =
              (
                Math.random() -
                0.5
              ) *
              0.22;


            this.speedY =
              (
                Math.random() -
                0.5
              ) *
              0.22;


            this.baseAlpha =
              Math.random() *
              0.22 +
              0.10;

          }


          update() {

            this.x +=
              this.speedX;


            this.y +=
              this.speedY;


            /*
               Wrap around screen.
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
              this.x = -20;
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
              this.y = -20;
            }


            /*
               Very subtle interaction
               with cursor.
            */

            if (
              mouse.x !== null &&
              mouse.y !== null
            ) {

              const dx =
                mouse.x -
                this.x;


              const dy =
                mouse.y -
                this.y;


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


                this.x -=
                  (
                    dx /
                    distance
                  ) *
                  force *
                  0.18;


                this.y -=
                  (
                    dy /
                    distance
                  ) *
                  force *
                  0.18;

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
              `rgba(
                18,
                107,
                168,
                ${this.baseAlpha}
              )`;


            context.fill();

          }

        }



        const initialiseParticles =
          () => {

            particles = [];


            const count =
              calculateParticleCount();


            for (
              let i = 0;
              i < count;
              i++
            ) {

              particles.push(
                new Particle()
              );

            }

          };



        const connectParticles =
          () => {

            const maxDistance =
              125;


            const maxDistanceSquared =
              maxDistance *
              maxDistance;


            for (
              let i = 0;
              i <
              particles.length;
              i++
            ) {

              for (
                let j =
                  i + 1;
                j <
                particles.length;
                j++
              ) {

                const dx =
                  particles[i].x -
                  particles[j].x;


                const dy =
                  particles[i].y -
                  particles[j].y;


                const distanceSquared =
                  dx * dx +
                  dy * dy;


                if (
                  distanceSquared <
                  maxDistanceSquared
                ) {

                  const distance =
                    Math.sqrt(
                      distanceSquared
                    );


                  const opacity =
                    (
                      1 -
                      distance /
                      maxDistance
                    ) *
                    0.11;


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
                      18,
                      107,
                      168,
                      ${opacity}
                    )`;


                  context.lineWidth =
                    0.65;


                  context.stroke();

                }

              }

            }

          };



        const connectMouse =
          () => {

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
                  150
                ) {

                  const opacity =
                    (
                      1 -
                      distance /
                      150
                    ) *
                    0.13;


                  context.beginPath();


                  context.moveTo(
                    particle.x,
                    particle.y
                  );


                  context.lineTo(
                    mouse.x,
                    mouse.y
                  );


                  context.strokeStyle =
                    `rgba(
                      23,
                      132,
                      199,
                      ${opacity}
                    )`;


                  context.lineWidth =
                    0.7;


                  context.stroke();

                }

              }
            );

          };



        const animateNetwork =
          () => {

            if (!pageVisible) {
              return;
            }


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

            connectMouse();


            animationFrame =
              requestAnimationFrame(
                animateNetwork
              );

          };



        const resizeCanvas =
          () => {

            const pixelRatio =
              Math.min(
                window.devicePixelRatio ||
                1,
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


            initialiseParticles();

          };



        /*
           Mouse tracking for
           network interaction.
        */

        if (!isTouchDevice) {

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


          window.addEventListener(
            "mouseout",
            event => {

              if (
                !event.relatedTarget
              ) {

                mouse.x = null;
                mouse.y = null;

              }

            }
          );

        }



        /*
           Pause network when the
           browser tab isn't visible.

           This reduces unnecessary
           processor usage.
        */

        document.addEventListener(
          "visibilitychange",
          () => {

            pageVisible =
              !document.hidden;


            if (pageVisible) {

              if (animationFrame) {
                cancelAnimationFrame(
                  animationFrame
                );
              }


              animateNetwork();

            } else {

              if (animationFrame) {

                cancelAnimationFrame(
                  animationFrame
                );

              }

            }

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
                150
              );

          }
        );



        resizeCanvas();

        animateNetwork();

      }

    }



    /* =====================================================
       11. SUBTLE CASE-STUDY MOUSE RESPONSE
       ===================================================== */

    if (
      !reduceMotion &&
      !isTouchDevice
    ) {

      const cases =
        document.querySelectorAll(
          ".case-study"
        );


      cases.forEach(
        item => {

          item.addEventListener(
            "mouseenter",
            () => {

              const number =
                item.querySelector(
                  ".case-study-index"
                );


              if (number) {

                number.style.transform =
                  "translateX(6px)";

                number.style.transition =
                  "transform 300ms ease";

              }

            }
          );


          item.addEventListener(
            "mouseleave",
            () => {

              const number =
                item.querySelector(
                  ".case-study-index"
                );


              if (number) {

                number.style.transform =
                  "translateX(0)";

              }

            }
          );

        }
      );

    }



    /* =====================================================
       12. CONSOLE SIGNATURE

       Harmless little detail for
       anyone inspecting the site.
       ===================================================== */

    console.log(
      "%cVictor Akoyo",
      "font-size:20px;font-weight:700;color:#126ba8;"
    );


    console.log(
      "%cOperations • Supply Chain • Quality • Process Improvement",
      "font-size:12px;color:#58758e;"
    );


    console.log(
      "%cPortfolio interaction layer loaded successfully.",
      "font-size:11px;color:#668097;"
    );

  }
);
