
/* =====================================================
   AKSH MENTAL WELLNESS
   File: js/main.js
   Navigation, interactions and website enhancements
   ===================================================== */

(() => {
  "use strict";

  const config = window.AKSH_CONFIG || {};

  /* -----------------------------------------------
     1. CURRENT YEAR
     ----------------------------------------------- */

  const currentYear = new Date().getFullYear();

  document.querySelectorAll(
    "#year, #current-year, .current-year, [data-year]"
  ).forEach((element) => {
    element.textContent = currentYear;
  });

  /* -----------------------------------------------
     2. MOBILE NAVIGATION
     ----------------------------------------------- */

  const menuButton = document.querySelector(
    "#menu-toggle, .nav-toggle, .menu-toggle"
  );

  const navigation = document.querySelector(
    ".nav-links, #nav-links, .main-navigation"
  );

  const header = document.querySelector(".site-header");

  function closeMenu() {
    if (navigation) {
      navigation.classList.remove("is-open", "open");
    }

    if (header) {
      header.classList.remove("menu-open");
    }

    if (menuButton) {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
    }
  }

  if (menuButton && navigation) {
    menuButton.setAttribute("aria-controls", navigation.id || "nav-links");
    menuButton.setAttribute("aria-expanded", "false");

    menuButton.addEventListener("click", () => {
      const isOpen =
        navigation.classList.contains("is-open") ||
        navigation.classList.contains("open");

      if (isOpen) {
        closeMenu();
      } else {
        navigation.classList.add("is-open");
        if (header) header.classList.add("menu-open");

        menuButton.setAttribute("aria-expanded", "true");
        menuButton.setAttribute("aria-label", "Close navigation menu");
      }
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", (event) => {
      if (
        !navigation.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 680) closeMenu();
    });
  }

  /* -----------------------------------------------
     3. APPLY BRAND SETTINGS
     ----------------------------------------------- */

  document.querySelectorAll("[data-site-name]").forEach((element) => {
    if (config.siteName) {
      element.textContent = config.siteName;
    }
  });

  document.querySelectorAll("[data-tagline]").forEach((element) => {
    if (config.tagline) {
      element.textContent = config.tagline;
    }
  });

  /* -----------------------------------------------
     4. CONTACT LINKS
     ----------------------------------------------- */

  document.querySelectorAll("[data-email-link]").forEach((link) => {
    if (config.email) {
      link.href = "mailto:" + config.email;
      link.hidden = false;
    } else {
      link.hidden = true;
    }
  });

  document.querySelectorAll("[data-phone-link]").forEach((link) => {
    if (config.phone) {
      link.href = "tel:" + config.phone.replace(/[^\d+]/g, "");
      link.hidden = false;
    } else {
      link.hidden = true;
    }
  });

  /* -----------------------------------------------
     5. WHATSAPP LINK
     ----------------------------------------------- */

  const whatsappNumber = String(
    config.whatsappNumber || ""
  ).replace(/\D/g, "");

  document.querySelectorAll(
    "[data-whatsapp], .whatsapp-float, .floating-contact"
  ).forEach((link) => {
    if (whatsappNumber) {
      link.href =
        "https://wa.me/" + whatsappNumber;

      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.hidden = false;
    } else {
      link.hidden = true;
    }
  });

  /* -----------------------------------------------
     6. SOCIAL MEDIA LINKS
     ----------------------------------------------- */

  const social = config.social || {};

  document.querySelectorAll("[data-social]").forEach((link) => {
    const platform = link.dataset.social;
    const url = social[platform];

    if (url && /^https?:\/\//i.test(url)) {
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.hidden = false;
    } else {
      link.hidden = true;
    }
  });

  /* -----------------------------------------------
     7. BOOKING LINK
     ----------------------------------------------- */

  document.querySelectorAll("[data-booking-link]").forEach((link) => {
    if (config.bookingUrl && /^https?:\/\//i.test(config.bookingUrl)) {
      link.href = config.bookingUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.hidden = false;
    } else {
      link.hidden = true;
    }
  });

  /* -----------------------------------------------
     8. SUBTLE SCROLL REVEAL
     Works only on elements marked data-reveal.
     Respects reduced-motion accessibility settings.
     ----------------------------------------------- */

  const revealElements = document.querySelectorAll("[data-reveal]");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (
    revealElements.length &&
    "IntersectionObserver" in window &&
    !reducedMotion
  ) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  /* -----------------------------------------------
     9. UPDATE FOOTER YEAR AND INITIALIZE
     ----------------------------------------------- */

  document.documentElement.classList.add("js-ready");

  console.info("Aksh Mental Wellness website initialized.");
})();
