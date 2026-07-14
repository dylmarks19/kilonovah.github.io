document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".primary-nav");
  const header = document.querySelector(".site-header");

  const setHeaderHeight = () => {
    if (header) {
      document.documentElement.style.setProperty("--header-h", `${header.offsetHeight}px`);
    }
  };
  setHeaderHeight();
  window.addEventListener("resize", setHeaderHeight);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => nav.classList.remove("is-open"));
    });
  }

  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const value = btn.dataset.copy;
      const original = btn.textContent;
      try {
        await navigator.clipboard.writeText(value);
      } catch (err) {
        // clipboard API unavailable (very old browser / no permission) —
        // the mailto link next to this button still works as a fallback
        return;
      }
      btn.textContent = "Copied";
      btn.classList.add("is-copied");
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove("is-copied");
      }, 1800);
    });
  });
});
