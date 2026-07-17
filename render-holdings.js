/* ===========================================================
   Renders window.HOLDINGS into whichever containers exist on
   the current page:
     #portfolio-grid    -> expandable periodic-table style cards
     #featured-holdings -> compact cards on the homepage (only the
                            "see full portfolio" button is clickable)
   =========================================================== */

function kilonovaSortedHoldings() {
  return (window.HOLDINGS || []).slice().sort(
    (a, b) => (a.holdingNumber || 0) - (b.holdingNumber || 0)
  );
}

function kilonovaPortfolioCard(h) {
  const iconTag = h.icon
    ? `<img src="${h.icon}" alt="" class="element-card__icon">`
    : "";
  const urlLabel = (h.url || "").replace(/^https?:\/\//, "");
  return `
    <div class="element-card" id="holding-${h.id}">
      <button class="element-card__header" aria-expanded="false">
        <span class="element-card__number">${String(h.holdingNumber).padStart(2, "0")}</span>
        <span class="element-card__chevron" aria-hidden="true"></span>
        <div class="element-card__icon-wrap">${iconTag}</div>
        <h3 class="element-card__name">${h.name}</h3>
        <span class="element-card__sector">${h.sector}</span>
      </button>
      <div class="element-card__details">
        <div class="element-card__details-inner">
          <p class="element-card__desc">${h.description}</p>
          <div class="element-card__meta">
            <span>Holding ${String(h.holdingNumber).padStart(2, "0")}</span>
            <span>Since ${h.since}</span>
          </div>
          <a href="${h.url}" class="btn btn-ghost" style="width:100%; justify-content:center; margin-top:1.2rem;">Visit ${urlLabel} &rarr;</a>
        </div>
      </div>
    </div>
  `;
}

function kilonovaFeaturedCard(h) {
  const iconTag = h.icon ? `<img src="${h.icon}" alt="${h.name}">` : "";
  return `
    <div class="feature-card">
      <div class="feature-card__media">
        ${iconTag}
      </div>
      <div class="feature-card__body">
        <span class="stake-tag">EQUITY STAKE — ${h.name.toUpperCase()}</span>
        <h3>${h.tagline || h.name}</h3>
        <p>${h.description}</p>
        <a href="portfolio.html#holding-${h.id}" class="btn btn-primary feature-card__cta">See the full portfolio &rarr;</a>
      </div>
    </div>
  `;
}

function kilonovaRenderPortfolio() {
  const container = document.getElementById("portfolio-grid");
  if (!container) return;

  const holdings = kilonovaSortedHoldings();
  container.innerHTML = holdings.map(kilonovaPortfolioCard).join("");
  container.insertAdjacentHTML(
    "beforeend",
    `<div class="element-card element-card--empty">Next holding — to be announced</div>`
  );

  container.addEventListener("click", (event) => {
    const header = event.target.closest(".element-card__header");
    if (!header) return;

    const card = header.closest(".element-card");
    const details = card.querySelector(".element-card__details");
    const isOpen = card.classList.contains("is-expanded");

    if (isOpen) {
      details.style.maxHeight = "0px";
      card.classList.remove("is-expanded");
      header.setAttribute("aria-expanded", "false");
    } else {
      details.style.maxHeight = details.scrollHeight + "px";
      card.classList.add("is-expanded");
      header.setAttribute("aria-expanded", "true");
    }
  });

  // if arriving via a #holding-xxx link, expand and scroll to that card
  if (location.hash.startsWith("#holding-")) {
    const target = document.querySelector(location.hash);
    if (target) {
      const header = target.querySelector(".element-card__header");
      if (header) header.click();
      setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
    }
  }

  window.addEventListener("resize", () => {
    container.querySelectorAll(".element-card.is-expanded .element-card__details").forEach((details) => {
      details.style.maxHeight = details.scrollHeight + "px";
    });
  });
}

function kilonovaRenderFeatured() {
  const container = document.getElementById("featured-holdings");
  if (!container) return;

  const holdings = kilonovaSortedHoldings();
  container.innerHTML = holdings.map(kilonovaFeaturedCard).join("");
}

function kilonovaFormatList(names) {
  if (names.length === 0) return "our first holdings";
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}

function kilonovaRenderInlineLists() {
  const names = kilonovaSortedHoldings().map((h) => h.name);
  document.querySelectorAll("[data-holdings-list]").forEach((el) => {
    el.textContent = kilonovaFormatList(names);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  kilonovaRenderPortfolio();
  kilonovaRenderFeatured();
  kilonovaRenderInlineLists();
});
