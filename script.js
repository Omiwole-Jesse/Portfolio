// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close mobile nav on link click
navLinks?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Reveal on scroll
const revealEls = document.querySelectorAll(".reveal");
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObs.observe(el));

// Active nav highlight
const sectionIds = ["about","skills","experience","case-studies","impact","certs","contact"];
const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
const navA = [...document.querySelectorAll(".nav-link")];

const sectionObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    navA.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
  });
}, { rootMargin: "-30% 0px -60% 0px", threshold: 0.01 });

sections.forEach(s => sectionObs.observe(s));

// Case study modal
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const closeModalBtn = document.getElementById("closeModal");

const caseStudies = {
  cs1: {
    title: "ERP documentation improvement",
    body: `
      <p><strong>Goal:</strong> Improve reporting accuracy and traceability.</p>
      <ul>
        <li>Strengthened documentation checks and standardised record flow.</li>
        <li>Reduced inconsistencies across records used for reporting and tracking.</li>
        <li>Improved reporting accuracy by <strong>20%</strong>.</li>
      </ul>
      <p><strong>Result:</strong> Better decisions, stronger compliance readiness, fewer avoidable errors.</p>
    `
  },
  cs2: {
    title: "Inventory tracking (truck accessories)",
    body: `
      <p><strong>Goal:</strong> Maintain consistent records and reliable visibility.</p>
      <ul>
        <li>Supported tracking and record consistency for truck accessories and related items.</li>
        <li>Improved clarity across movement, handling, and documentation.</li>
        <li>Supported operations with accurate, accessible inventory information.</li>
      </ul>
      <p><strong>Result:</strong> Better visibility and readiness for audits and operational planning.</p>
    `
  },
  cs3: {
    title: "Humanitarian coordination presentation",
    body: `
      <p><strong>Goal:</strong> Explain why coordination decides humanitarian outcomes.</p>
      <ul>
        <li>Showed how weak information flow causes duplication and delays.</li>
        <li>Outlined fixes: shared planning, clear roles, and reporting rhythm.</li>
        <li>Connected coordination quality to speed, coverage, and fairness.</li>
      </ul>
      <p><strong>Result:</strong> Strong stakeholder communication of complex systems.</p>
    `
  }
};

document.querySelectorAll("[data-modal]").forEach(btn => {
  btn.addEventListener("click", () => {
    const key = btn.getAttribute("data-modal");
    const data = caseStudies[key];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalBody.innerHTML = data.body;
    modal.setAttribute("aria-hidden", "false");
  });
});

function closeModal(){
  modal.setAttribute("aria-hidden", "true");
}

closeModalBtn?.addEventListener("click", closeModal);
modal?.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
