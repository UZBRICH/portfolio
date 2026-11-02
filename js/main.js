// ========================================
// PORTFOLIO INTERACTIONS
// ========================================

const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#nav");

// Mobile navigation
if (toggle && nav) {
  const setMenuOpen = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute(
      "aria-label",
      open ? "Close navigation menu" : "Open navigation menu"
    );
    toggle.textContent = open ? "Close" : "Menu";
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    setMenuOpen(!isOpen);
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a[href^='#']")) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("click", (event) => {
    if (
      event.target instanceof Node &&
      !nav.contains(event.target) &&
      !toggle.contains(event.target)
    ) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setMenuOpen(false);
      toggle.focus();
    }
  });
}

// Highlight the section currently in view
const navLinks = [...document.querySelectorAll("#nav a[href^='#']")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    const visibleSection = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visibleSection) return;

    const activeHash = `#${visibleSection.target.id}`;

    navLinks.forEach((link) => {
      const active = link.hash === activeHash;
      link.classList.toggle("is-active", active);

      if (active) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }, {
    rootMargin: "-35% 0px -55% 0px",
    threshold: [0, 0.1, 0.25, 0.5]
  });

  sections.forEach((section) => observer.observe(section));
}

// Automatic footer year
const year = document.querySelector("#year");
if (year) {
  year.textContent = new Date().getFullYear();
}
