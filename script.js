/* =========================================================
   VICTOR AKOYO — PROFESSIONAL PORTFOLIO
   Interactive Experience
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     1. MOBILE NAVIGATION
     ========================================================= */

  const menuButton = document.getElementById("menuButton");
  const mobileNavigation = document.getElementById("mobileNavigation");
  const menuIcon = document.getElementById("menuIcon");

  if (menuButton && mobileNavigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = mobileNavigation.classList.toggle("open");

      menuButton.setAttribute("aria-expanded", isOpen);

      if (menuIcon) {
        menuIcon.textContent = isOpen ? "✕" : "☰";
      }
    });

    mobileNavigation.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileNavigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");

        if (menuIcon) {
          menuIcon.textContent = "☰";
        }
      });
    });
  }


  /* =========================================================
     2. SCROLL PROGRESS BAR
     ========================================================= */

  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  document.body.appendChild(progressBar);

  function updateScrollProgress() {
    const scrollTop =
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const progress =
      scrollHeight > 0
        ? (scrollTop / scrollHeight) * 100
        : 0;

    progressBar.style.width = `${progress}%`;
  }

  window.addEventListener("scroll", updateScrollProgress, {
    passive: true
  });

  updateScrollProgress();


  /* =========================================================
     3. HEADER EFFECT ON SCROLL
     ========================================================= */

  const header = document.querySelector("header");

  function updateHeader() {
    if (!header) return;

    if (window.scrollY > 40) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  }

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });

  updateHeader();


  /* =========================================================
     4. SCROLL REVEAL
     ========================================================= */

  const revealElements = document.querySelectorAll(
    ".impact-card, .expertise-item, .case-card, " +
    ".timeline-item, .education-card, .technology-box"
  );

  revealElements.forEach((element, index) => {
    element.classList.add("reveal-element");

    element.style.setProperty(
      "--reveal-delay",
      `${(index % 4) * 80}ms`
    );
  });

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -50px 0px"
    }
  );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  /* =========================================================
     5. ACTIVE NAVIGATION
     ========================================================= */

  const sections = document.querySelectorAll("main section[id]");

  const navLinks = document.querySelectorAll(
    ".desktop-nav a, .mobile-nav a"
  );

  const sectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const id = entry.target.id;

        navLinks.forEach(link => {
          link.classList.remove("active-nav");

          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active-nav");
          }
        });
      });
    },
    {
      threshold: 0.35
    }
  );

  sections.forEach(section => {
    sectionObserver.observe(section);
  });


  /* =========================================================
     6. HERO MOUSE PARALLAX
     ========================================================= */

  const hero = document.querySelector(".hero");
  const heroContent = document.querySelector(".hero-content");

  if (
    hero &&
    heroContent &&
    window.matchMedia("(pointer: fine)").matches
  ) {

    hero.addEventListener("mousemove", event => {
      const rect = hero.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) / rect.width - 0.5;

      const y =
        (event.clientY - rect.top) / rect.height - 0.5;

      heroContent.style.transform =
        `translate3d(${x * 7}px, ${y * 5}px, 0)`;
    });

    hero.addEventListener("mouseleave", () => {
      heroContent.style.transform =
        "translate3d(0, 0, 0)";
    });
  }


  /* =========================================================
     7. INTERACTIVE CARD TILT
     ========================================================= */

  const tiltCards = document.querySelectorAll(
    ".impact-card, .case-card, .education-card"
  );

  if (window.matchMedia("(pointer: fine)").matches) {

    tiltCards.forEach(card => {

      card.addEventListener("mousemove", event => {
        const rect = card.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX =
          ((y - centerY) / centerY) * -2.5;

        const rotateY =
          ((x - centerX) / centerX) * 2.5;

        card.style.transform =
          `perspective(900px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           translateY(-4px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform =
          "perspective(900px) rotateX(0) rotateY(0)";
      });

    });
  }


  /* =========================================================
     8. MAGNETIC BUTTONS
     ========================================================= */

  const buttons = document.querySelectorAll(".button");

  if (window.matchMedia("(pointer: fine)").matches) {

    buttons.forEach(button => {

      button.addEventListener("mousemove", event => {
        const rect = button.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left -
          rect.width / 2;

        const y =
          event.clientY -
          rect.top -
          rect.height / 2;

        button.style.transform =
          `translate(${x * 0.08}px, ${y * 0.12}px)`;
      });

      button.addEventListener("mouseleave", () => {
        button.style.transform =
          "translate(0, 0)";
      });

    });
  }


  /* =========================================================
     9. ANIMATED KPI NUMBERS
     ========================================================= */

  const impactNumbers =
    document.querySelectorAll(".impact-number");

  const animateKPI = element => {

    if (element.dataset.animated === "true") return;

    const original = element.textContent.trim();

    let start = 0;
    let end = null;
    let prefix = "";
    let suffix = "";

    if (original.includes("520")) {
      end = 520;
      prefix = "~£";
      suffix = "K";
    }

    else if (original.includes("19")) {
      end = 19;
      suffix = " KPIs";
    }

    if (end === null) return;

    element.dataset.animated = "true";

    const duration = 1300;
    const startTime = performance.now();

    function update(currentTime) {

      const elapsed =
        currentTime - startTime;

      const progress =
        Math.min(elapsed / duration, 1);

      const eased =
        1 - Math.pow(1 - progress, 3);

      const current =
        Math.round(start + (end - start) * eased);

      element.textContent =
        `${prefix}${current}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = original;
      }
    }

    requestAnimationFrame(update);
  };


  const kpiObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateKPI(entry.target);
        }
      });
    },
    {
      threshold: 0.6
    }
  );

  impactNumbers.forEach(number => {
    kpiObserver.observe(number);
  });


  /* =========================================================
     10. HERO PARTICLE NETWORK
     ========================================================= */

  if (hero) {

    const canvas = document.createElement("canvas");

    canvas.className = "hero-network";

    hero.prepend(canvas);

    const ctx = canvas.getContext("2d");

    let particles = [];

    let animationFrame;

    const mouse = {
      x: null,
      y: null
    };


    function resizeCanvas() {

      const rect =
        hero.getBoundingClientRect();

      canvas.width =
        rect.width * window.devicePixelRatio;

      canvas.height =
        rect.height * window.devicePixelRatio;

      canvas.style.width =
        `${rect.width}px`;

      canvas.style.height =
        `${rect.height}px`;

      ctx.setTransform(
        window.devicePixelRatio,
        0,
        0,
        window.devicePixelRatio,
        0,
        0
      );

      createParticles();
    }


    function createParticles() {

      particles = [];

      const width =
        hero.clientWidth;

      const height =
        hero.clientHeight;

      const particleCount =
        Math.min(
          45,
          Math.max(
            20,
            Math.floor(width / 30)
          )
        );

      for (let i = 0; i < particleCount; i++) {

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,

          vx:
            (Math.random() - 0.5) * 0.18,

          vy:
            (Math.random() - 0.5) * 0.18,

          radius:
            Math.random() * 1.4 + 0.5
        });
      }
    }


    hero.addEventListener("mousemove", event => {

      const rect =
        hero.getBoundingClientRect();

      mouse.x =
        event.clientX - rect.left;

      mouse.y =
        event.clientY - rect.top;
    });


    hero.addEventListener("mouseleave", () => {
      mouse.x = null;
      mouse.y = null;
    });


    function drawNetwork() {

      const width =
        hero.clientWidth;

      const height =
        hero.clientHeight;

      ctx.clearRect(
        0,
        0,
        width,
        height
      );


      particles.forEach(particle => {

        particle.x += particle.vx;
        particle.y += particle.vy;


        if (
          particle.x < 0 ||
          particle.x > width
        ) {
          particle.vx *= -1;
        }


        if (
          particle.y < 0 ||
          particle.y > height
        ) {
          particle.vy *= -1;
        }


        if (
          mouse.x !== null &&
          mouse.y !== null
        ) {

          const dx =
            mouse.x - particle.x;

          const dy =
            mouse.y - particle.y;

          const distance =
            Math.sqrt(dx * dx + dy * dy);

          if (distance < 140) {

            particle.x -= dx * 0.0007;
            particle.y -= dy * 0.0007;
          }
        }


        ctx.beginPath();

        ctx.arc(
          particle.x,
          particle.y,
          particle.radius,
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          "rgba(23, 103, 165, 0.35)";

        ctx.fill();
      });


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
            Math.sqrt(dx * dx + dy * dy);


          if (distance < 120) {

            const opacity =
              (1 - distance / 120) * 0.13;

            ctx.beginPath();

            ctx.moveTo(
              particles[i].x,
              particles[i].y
            );

            ctx.lineTo(
              particles[j].x,
              particles[j].y
            );

            ctx.strokeStyle =
              `rgba(23, 103, 165, ${opacity})`;

            ctx.lineWidth = 1;

            ctx.stroke();
          }
        }
      }


      animationFrame =
        requestAnimationFrame(drawNetwork);
    }


    resizeCanvas();
    drawNetwork();


    window.addEventListener(
      "resize",
      resizeCanvas
    );


    document.addEventListener(
      "visibilitychange",
      () => {

        if (document.hidden) {
          cancelAnimationFrame(
            animationFrame
          );
        } else {
          drawNetwork();
        }
      }
    );
  }


  /* =========================================================
     11. TIMELINE PROGRESS
     ========================================================= */

  const timeline =
    document.querySelector(".timeline");

  if (timeline) {

    const timelineProgress =
      document.createElement("div");

    timelineProgress.className =
      "timeline-progress";

    timeline.appendChild(
      timelineProgress
    );


    function updateTimeline() {

      const rect =
        timeline.getBoundingClientRect();

      const viewportHeight =
        window.innerHeight;

      const start =
        viewportHeight * 0.75;

      const travelled =
        start - rect.top;

      const progress =
        Math.max(
          0,
          Math.min(
            travelled / rect.height,
            1
          )
        );

      timelineProgress.style.height =
        `${progress * 100}%`;
    }


    window.addEventListener(
      "scroll",
      updateTimeline,
      {
        passive: true
      }
    );

    updateTimeline();
  }


  /* =========================================================
     12. SECTION LABEL ANIMATION
     ========================================================= */

  const labels =
    document.querySelectorAll(".section-label");

  const labelObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "label-visible"
            );

            labelObserver.unobserve(
              entry.target
            );
          }
        });

      },
      {
        threshold: 0.5
      }
    );


  labels.forEach(label => {
    label.classList.add(
      "animated-label"
    );

    labelObserver.observe(label);
  });


  /* =========================================================
     13. RESPECT ACCESSIBILITY SETTINGS
     ========================================================= */

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

  if (reducedMotion.matches) {

    document.documentElement.classList.add(
      "reduce-motion"
    );
  }

});
