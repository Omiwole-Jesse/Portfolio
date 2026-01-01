// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});
navLinks?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Scroll progress
const progressBar = document.getElementById("progressBar");
window.addEventListener("scroll", () => {
  const h = document.documentElement;
  const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
  progressBar.style.width = `${Math.min(1, Math.max(0, scrolled)) * 100}%`;
});

// Cursor glow
const glow = document.getElementById("cursorGlow");
let glowOn = false;
window.addEventListener("mousemove", (e) => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
  if (!glowOn) {
    glow.style.opacity = "1";
    glowOn = true;
  }
});
window.addEventListener("mouseleave", () => {
  glow.style.opacity = "0";
  glowOn = false;
});

// Reveal on scroll
const revealEls = document.querySelectorAll(".reveal");
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObs.observe(el));

// Count-up metric
function animateCount(el, target) {
  const duration = 900;
  const start = performance.now();
  const from = 0;

  function tick(now) {
    const p = Math.min(1, (now - start) / duration);
    const val = Math.round(from + (target - from) * (1 - Math.pow(1 - p, 3)));
    el.textContent = val;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const countEls = document.querySelectorAll("[data-count]");
const countObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.getAttribute("data-count"));
    if (!Number.isFinite(target)) return;
    if (el.dataset.done === "1") return;
    el.dataset.done = "1";
    animateCount(el, target);
  });
}, { threshold: 0.6 });
countEls.forEach(el => countObs.observe(el));

// Modal content
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const closeModalBtn = document.getElementById("closeModal");

const caseStudies = {
  cs1: {
    title: "ERP documentation improvement",
    body: `
      <p><b>Goal:</b> Improve reporting accuracy and traceability.</p>
      <ul>
        <li>Introduced tighter documentation checks and structured record flow.</li>
        <li>Reduced inconsistencies across records used for reporting and tracking.</li>
        <li>Delivered <b>20%</b> improvement in reporting accuracy.</li>
      </ul>
      <p><b>Result:</b> Cleaner reporting, stronger compliance readiness, fewer avoidable errors.</p>
    `
  },
  cs2: {
    title: "Inventory tracking: truck accessories",
    body: `
      <p><b>Goal:</b> Maintain consistent records and reliable operational visibility.</p>
      <ul>
        <li>Supported consistent tracking of truck accessories and related items.</li>
        <li>Improved clarity across movement, handling, and documentation.</li>
        <li>Supported operations with accurate, accessible inventory information.</li>
      </ul>
      <p><b>Result:</b> Better visibility and readiness for audits and planning.</p>
    `
  },
  cs3: {
    title: "Humanitarian logistics: coordination presentation (UWS)",
    body: `
      <p><b>Goal:</b> Communicate why coordination decides response outcomes.</p>
      <ul>
        <li>Explained how weak information flow causes duplication and delays.</li>
        <li>Outlined fixes: shared planning, clear roles, and reporting rhythm.</li>
        <li>Connected coordination quality to speed, coverage, and fairness.</li>
      </ul>
      <p><b>Result:</b> Strong stakeholder communication of complex systems.</p>
    `
  },
  cs4: {
    title: "Demola: Own The Change (Team Contributor)",
    body: `
      <p><b>Goal:</b> Help devise solutions to improve trust and community ownership.</p>
      <ul>
        <li>Participated in ideation, iteration, and pitching as a team member.</li>
        <li>Supported solution shaping through stakeholder-centred thinking.</li>
        <li>Contributed to discussions around app improvements and delivery.</li>
      </ul>
      <p><b>Result:</b> Strong collaboration and solution delivery mindset.</p>
    `
  }
};

function openModal(key){
  const data = caseStudies[key];
  if (!data) return;
  modalTitle.textContent = data.title;
  modalBody.innerHTML = data.body;
  modal.setAttribute("aria-hidden", "false");
}
function closeModal(){
  modal.setAttribute("aria-hidden", "true");
}

document.querySelectorAll("[data-modal]").forEach(card => {
  card.addEventListener("click", () => openModal(card.getAttribute("data-modal")));
});
closeModalBtn?.addEventListener("click", closeModal);
modal?.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
