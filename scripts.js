const slider = document.querySelector("[data-slider]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");

if (menuToggle && menu) {
  const closeMenu = () => {
    menu.hidden = true;
    menuToggle.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    menu.hidden = false;
    menuToggle.setAttribute("aria-expanded", "true");
  };

  menuToggle.addEventListener("click", () => {
    if (menu.hidden) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!menu.hidden && !menu.contains(event.target) && !menuToggle.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

const revealTargets = [
  ".guide-card",
  ".visit-panel",
  ".sample-notice",
  ".section-heading",
  ".split > div",
  ".concept-card",
  ".check-grid article",
  ".reason-grid article",
  ".service-steps article",
  ".flow-list li",
  ".price > div",
  ".price-card",
  ".faq-list details",
  ".access > div",
  ".info-list",
  ".final-cta",
].join(",");

const revealItems = [...document.querySelectorAll(revealTargets)];

if (revealItems.length > 0) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  revealItems.forEach((item, index) => {
    item.classList.add("scroll-reveal");
    item.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 70}ms`);
  });

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.12,
      },
    );

    revealItems.forEach((item) => revealObserver.observe(item));

    const revealVisibleItems = () => {
      revealItems.forEach((item) => {
        if (!item.classList.contains("is-visible") && item.getBoundingClientRect().top < window.innerHeight * 0.92) {
          item.classList.add("is-visible");
        }
      });
    };

    let revealTicking = false;
    const queueRevealCheck = () => {
      if (!revealTicking) {
        revealTicking = true;
        window.requestAnimationFrame(() => {
          revealVisibleItems();
          revealTicking = false;
        });
      }
    };

    window.addEventListener("scroll", queueRevealCheck, { passive: true });
    window.addEventListener("resize", queueRevealCheck);
    revealVisibleItems();
  }
}

if (slider) {
  const slides = [...slider.querySelectorAll("[data-slide]")];
  const dots = [...slider.querySelectorAll("[data-slide-to]")];
  const toggle = slider.querySelector("[data-slider-toggle]");
  const intervalMs = 5200;
  let current = 0;
  let paused = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let timerId = null;

  const showSlide = (next) => {
    current = (next + slides.length) % slides.length;

    slides.forEach((slide, index) => {
      const active = index === current;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", active ? "false" : "true");
    });

    dots.forEach((dot, index) => {
      const active = index === current;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-current", active ? "true" : "false");
    });
  };

  const stop = () => {
    if (timerId) {
      window.clearInterval(timerId);
      timerId = null;
    }
  };

  const start = () => {
    stop();
    if (!paused && slides.length > 1) {
      timerId = window.setInterval(() => showSlide(current + 1), intervalMs);
    }
  };

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showSlide(Number(dot.dataset.slideTo));
      start();
    });
  });

  if (toggle) {
    toggle.textContent = paused ? "▶" : "Ⅱ";
    toggle.addEventListener("click", () => {
      paused = !paused;
      toggle.textContent = paused ? "▶" : "Ⅱ";
      toggle.setAttribute("aria-label", paused ? "スライドショーを再生" : "スライドショーを一時停止");
      start();
    });
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stop();
    } else {
      start();
    }
  });

  showSlide(0);
  start();
}
