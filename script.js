/* ==================================
   VICTOR AKOYO PORTFOLIO
   Interactive behaviour
================================== */


/* ==================================
   MOBILE NAVIGATION
================================== */

const menuButton =
  document.getElementById("menuButton");

const mobileNavigation =
  document.getElementById("mobileNavigation");

const menuIcon =
  document.getElementById("menuIcon");


function closeMobileMenu() {

  mobileNavigation.classList.remove("open");

  menuButton.setAttribute(
    "aria-expanded",
    "false"
  );

  menuIcon.textContent = "☰";
}


menuButton.addEventListener(
  "click",
  function () {

    const isOpen =
      mobileNavigation.classList.toggle("open");

    menuButton.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

    menuIcon.textContent =
      isOpen ? "✕" : "☰";
  }
);


document
  .querySelectorAll(".mobile-nav a")
  .forEach(function (link) {

    link.addEventListener(
      "click",
      closeMobileMenu
    );

  });


window.addEventListener(
  "resize",
  function () {

    if (window.innerWidth > 760) {
      closeMobileMenu();
    }

  }
);


/* ==================================
   SCROLL REVEAL
================================== */

const revealElements =
  document.querySelectorAll(".reveal");


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
      threshold: 0.12
    }

  );


revealElements.forEach(
  function (element) {

    revealObserver.observe(element);

  }
);


/* ==================================
   NUMBER COUNTERS
================================== */

const counters =
  document.querySelectorAll(
    "[data-counter]"
  );


function animateCounter(element) {

  const target =
    Number(
      element.dataset.counter
    );

  const prefix =
    element.dataset.prefix || "";

  const suffix =
    element.dataset.suffix || "";

  const duration = 1200;

  const startTime =
    performance.now();


  function updateCounter(
    currentTime
  ) {

    const elapsed =
      currentTime - startTime;

    const progress =
      Math.min(
        elapsed / duration,
        1
      );

    const easedProgress =
      1 -
      Math.pow(
        1 - progress,
        3
      );

    const currentValue =
      Math.round(
        target * easedProgress
      );

    element.textContent =
      prefix +
      currentValue +
      suffix;


    if (progress < 1) {

      requestAnimationFrame(
        updateCounter
      );

    }

  }


  requestAnimationFrame(
    updateCounter
  );
}


const counterObserver =
  new IntersectionObserver(

    function (entries, observer) {

      entries.forEach(function (entry) {

        if (entry.isIntersecting) {

          animateCounter(
            entry.target
          );

          observer.unobserve(
            entry.target
          );

        }

      });

    },

    {
      threshold: 0.5
    }

  );


counters.forEach(
  function (counter) {

    counterObserver.observe(counter);

  }
);


/* ==================================
   ACTIVE NAVIGATION
================================== */

const sections =
  document.querySelectorAll(
    "main section[id]"
  );

const desktopLinks =
  document.querySelectorAll(
    ".desktop-nav a"
  );


function updateActiveNavigation() {

  let currentSection = "";

  sections.forEach(
    function (section) {

      const sectionTop =
        section.offsetTop - 140;

      if (
        window.scrollY >=
        sectionTop
      ) {

        currentSection =
          section.getAttribute("id");

      }

    }
  );


  desktopLinks.forEach(
    function (link) {

      link.classList.remove(
        "active"
      );

      const destination =
        link
          .getAttribute("href")
          .replace("#", "");


      if (
        destination ===
        currentSection
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
  updateActiveNavigation
);


updateActiveNavigation();


/* ==================================
   AUTOMATIC COPYRIGHT YEAR
================================== */

const currentYear =
  document.getElementById(
    "currentYear"
  );


if (currentYear) {

  currentYear.textContent =
    new Date().getFullYear();

}
