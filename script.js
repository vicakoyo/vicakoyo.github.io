/* =========================================================
   9. SLOW ANIMATED KPI NUMBERS
   ========================================================= */

const impactNumbers =
  document.querySelectorAll(".impact-number");


const animateKPI = element => {

  if (element.dataset.animated === "true") {
    return;
  }

  const original =
    element.textContent.trim();

  let start = 0;
  let end = null;

  let prefix = "";
  let suffix = "";


  /* £520K SAVINGS */

  if (original.includes("520")) {

    end = 520;

    prefix = "~£";
    suffix = "K";
  }


  /* 19 KPIs */

  else if (original.includes("19")) {

    end = 19;

    suffix = " KPIs";
  }


  /* 12% → 4% RETURN RATE */

  else if (
    original.includes("12") &&
    original.includes("4")
  ) {

    end = 12;

    suffix = "% → 4%";
  }


  /* If we don't recognise the number,
     leave the original text untouched */

  if (end === null) {
    return;
  }


  element.dataset.animated = "true";


  /* 4.2 second animation */

  const duration = 4200;

  const startTime =
    performance.now();


  function update(currentTime) {

    const elapsed =
      currentTime - startTime;


    const progress =
      Math.min(
        elapsed / duration,
        1
      );


    /*
       Ease-out cubic.

       The number moves more quickly
       at the beginning and becomes
       progressively slower as it
       approaches the final result.
    */

    const eased =
      1 -
      Math.pow(
        1 - progress,
        3
      );


    const current =
      Math.round(
        start +
        (end - start) * eased
      );


    element.textContent =
      `${prefix}${current}${suffix}`;


    if (progress < 1) {

      requestAnimationFrame(update);

    } else {

      /*
         Restore exact original text.

         This prevents the animation
         from accidentally changing
         your evidence wording.
      */

      element.textContent =
        original;
    }
  }


  requestAnimationFrame(update);
};


/* Only animate once the visitor
   actually reaches the KPI */

const kpiObserver =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          animateKPI(
            entry.target
          );

          kpiObserver.unobserve(
            entry.target
          );
        }

      });

    },

    {
      threshold: 0.55
    }
  );


impactNumbers.forEach(number => {

  kpiObserver.observe(number);

});
