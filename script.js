/* ---- Header scroll effect ---- */
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 60) header.classList.add("scrolled");
  else header.classList.remove("scrolled");

  // back to top
  const btn = document.getElementById("back-top");
  if (window.scrollY > 400) btn.classList.add("show");
  else btn.classList.remove("show");
});

/* ---- Active nav link ---- */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute("id");
  });
  navLinks.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href") === "#" + current) a.classList.add("active");
  });
});

/* ---- Mobile menu ---- */
function toggleMenu() {
  const h = document.getElementById("hamburger");
  const m = document.getElementById("mobileNav");
  h.classList.toggle("open");
  m.classList.toggle("open");
  document.body.style.overflow = m.classList.contains("open") ? "hidden" : "";
}
function closeMenu() {
  document.getElementById("hamburger").classList.remove("open");
  document.getElementById("mobileNav").classList.remove("open");
  document.body.style.overflow = "";
}

/* ---- Scroll reveal ---- */
const revealEls = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right",
);
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        // stagger siblings
        const delay = e.target.style.transitionDelay || "0s";
        e.target.style.transitionDelay = delay;
        e.target.classList.add("visible");
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
revealEls.forEach((el) => revealObserver.observe(el));

/* ---- Counter animation ---- */
function animateCounter(el, target, suffix = "") {
  let start = 0;
  const step = Math.ceil(target / 50);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = start + suffix;
    if (start >= target) clearInterval(timer);
  }, 30);
}
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        document.querySelectorAll(".stat-num").forEach((s) => {
          const txt = s.textContent;
          const num = parseInt(txt.replace(/\D/g, ""));
          const suf = txt.includes("+") ? "+" : "";
          const suffix_el = s.querySelector("span");
          animateCounter(s, num, "");
          if (suffix_el) s.appendChild(suffix_el);
        });
        statsObserver.disconnect();
      }
    });
  },
  { threshold: 0.5 },
);
const heroStats = document.querySelector(".hero-stats");
if (heroStats) statsObserver.observe(heroStats);

/* ---- Form submit ---- */
function submitForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector("button[type=submit]");
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> A enviar...';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> Enviado!';
    btn.style.background = "var(--blue)";
    const success = document.getElementById("formSuccess");
    success.style.display = "flex";
    e.target.reset();
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensagem';
      btn.style.background = "";
      btn.disabled = false;
      success.style.display = "none";
    }, 4000);
  }, 1500);
}

/* ---- Galeria lightbox basic ---- */
document.querySelectorAll(".galeria-item").forEach((item) => {
  item.addEventListener("click", () => {
    item.style.transform = "scale(0.97)";
    setTimeout(() => (item.style.transform = ""), 200);
  });
});

/* ---- Smooth nav to sections on load if hash ---- */
if (window.location.hash) {
  const target = document.querySelector(window.location.hash);
  if (target)
    setTimeout(() => target.scrollIntoView({ behavior: "smooth" }), 100);
}
