// ── CURSOR ──
const cur = document.getElementById("cursor");
const ring = document.getElementById("cursor-ring");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = mx + "px";
  cur.style.top = my + "px";
});
(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(animRing);
})();
document
  .querySelectorAll(
    "a,button,.project-card,.stat-card,.skill-category,.cert-item",
  )
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cur.style.width = "20px";
      cur.style.height = "20px";
      ring.style.width = "54px";
      ring.style.height = "54px";
    });
    el.addEventListener("mouseleave", () => {
      cur.style.width = "12px";
      cur.style.height = "12px";
      ring.style.width = "36px";
      ring.style.height = "36px";
    });
  });

// ── STARFIELD ──
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
let stars = [],
  W,
  H;
function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);
for (let i = 0; i < 180; i++)
  stars.push({
    x: Math.random() * 9999,
    y: Math.random() * 9999,
    r: Math.random() * 1.2 + 0.2,
    a: Math.random(),
    s: Math.random() * 0.003 + 0.001,
  });
function drawStars() {
  ctx.clearRect(0, 0, W, H);
  stars.forEach((s) => {
    s.a += s.s;
    if (s.a > 1 || s.a < 0) s.s *= -1;
    ctx.beginPath();
    ctx.arc(s.x % W, s.y % H, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200,230,255,${s.a * 0.7})`;
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}
drawStars();

// ── TYPING ──
const roles = [
  "C++ Developer",
  "Web Developer",
  "Software Engineer",
  "Problem Solver",
  "Game Developer",
];
let ri = 0,
  ci = 0,
  del = false,
  txt = "";
function type() {
  const target = roles[ri];
  if (!del) {
    txt = target.slice(0, ++ci);
  } else {
    txt = target.slice(0, --ci);
  }
  document.getElementById("typed-text").textContent = txt;
  if (!del && ci === target.length) {
    setTimeout(() => (del = true), 1800);
    setTimeout(type, 100);
    return;
  }
  if (del && ci === 0) {
    del = false;
    ri = (ri + 1) % roles.length;
  }
  setTimeout(type, del ? 60 : 90);
}
setTimeout(type, 1200);

// ── NAVBAR SCROLL ──
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-links a");
const navSections = Array.from(navLinks)
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const homeLink = document.querySelector('.nav-links a[href="#hero"]');
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const backToTop = document.getElementById("back-to-top");

const setActiveNav = (id) => {
  navLinks.forEach((link) => {
    const isActive = id && link.getAttribute("href") === `#${id}`;
    link.classList.toggle("active", isActive);
  });
};

const closeNavMenu = () => {
  if (!navMenu || !navToggle) return;
  navMenu.classList.remove("open");
  navToggle.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
};

if (navToggle && navMenu) {
  navToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = navMenu.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu && navMenu.classList.contains("open")) {
      closeNavMenu();
    }
  });
});

document.addEventListener("click", (e) => {
  if (
    navMenu &&
    navMenu.classList.contains("open") &&
    navbar &&
    !navbar.contains(e.target)
  ) {
    closeNavMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeNavMenu();
  }
});

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;

  navbar.classList.toggle("scrolled", scrolled > 60);
  if (homeLink && scrolled < 200) {
    setActiveNav("hero");
  }
  if (backToTop) {
    backToTop.classList.toggle("show", scrolled > window.innerHeight);
  }

  // Parallax elements
  const heroGlow = document.querySelector(".hero-glow");
  const heroGlow2 = document.querySelector(".hero-glow2");
  const heroGrid = document.querySelector(".hero-grid-bg");

  if (heroGlow) heroGlow.style.transform = `translateY(${scrolled * 0.4}px)`;
  if (heroGlow2) heroGlow2.style.transform = `translateY(${scrolled * 0.2}px)`;
  if (heroGrid) heroGrid.style.transform = `translateY(${scrolled * 0.15}px)`;
});

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ── NAV ACTIVE LINK ──
if (navSections.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveNav(entry.target.id);
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0.01 },
  );

  navSections.forEach((section) => navObserver.observe(section));
}

// ── SCROLL REVEAL ──
const addReveal = (elements, options = {}) => {
  const list = Array.from(elements || []).filter(Boolean);
  list.forEach((el, i) => {
    if (!el.classList.contains("reveal")) el.classList.add("reveal");
    if (options.direction) {
      const dir =
        typeof options.direction === "function"
          ? options.direction(i, el)
          : options.direction;
      if (dir) el.dataset.reveal = dir;
    }
    if (options.delayStep != null) {
      const base = options.delayStart || 0;
      el.style.setProperty(
        "--reveal-delay",
        `${base + i * options.delayStep}s`,
      );
    } else if (options.delay != null) {
      el.style.setProperty("--reveal-delay", `${options.delay}s`);
    }
    if (options.rotate) {
      const rot =
        typeof options.rotate === "function"
          ? options.rotate(i, el)
          : options.rotate;
      if (rot) el.style.setProperty("--reveal-rotate", rot);
    }
    if (options.scale) {
      const sc =
        typeof options.scale === "function"
          ? options.scale(i, el)
          : options.scale;
      if (sc) el.style.setProperty("--reveal-scale", sc);
    }
  });
};

addReveal(document.querySelectorAll("section:not(#hero)"), {
  direction: (i) => (i % 2 === 0 ? "left" : "right"),
});

addReveal(document.querySelectorAll(".section-label"), {
  direction: "left",
  delayStep: 0.1,
});
addReveal(document.querySelectorAll(".section-title"), {
  direction: "zoom",
  delayStep: 0.1,
});
addReveal(document.querySelectorAll("#about .about-text"), {
  direction: "left",
  delay: 0.15,
});
addReveal(document.querySelectorAll("#about .about-stats"), {
  direction: "right",
  delay: 0.2,
});
addReveal(document.querySelectorAll(".about-stats .stat-card"), {
  direction: "zoom",
  delayStep: 0.1,
});
addReveal(document.querySelectorAll(".skills-grid .skill-category"), {
  direction: (i) => (i % 2 === 0 ? "tilt-left" : "tilt-right"),
  delayStep: 0.15,
});
addReveal(document.querySelectorAll(".projects-grid .project-card"), {
  direction: (i) => ["tilt-left", "up", "tilt-right"][i % 3],
  delayStep: 0.15,
});
addReveal(document.querySelectorAll(".certs-list .cert-item"), {
  direction: (i) => (i % 2 === 0 ? "left" : "right"),
  delayStep: 0.1,
});
addReveal(document.querySelectorAll("#contact .contact-left"), {
  direction: "left",
  delay: 0.1,
});
addReveal(document.querySelectorAll("#contact .contact-info"), {
  direction: "right",
  delay: 0.15,
});
addReveal(document.querySelectorAll(".contact-links .contact-link"), {
  direction: "up",
  delayStep: 0.1,
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  },
  { threshold: 0.02, rootMargin: "100px 0px 100px 0px" },
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

// ── CARD GLOW & 3D TILT ──
document
  .querySelectorAll(".project-card, .skill-category, .stat-card")
  .forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;

      // For glow
      card.style.setProperty("--mx", (x / r.width) * 100 + "%");
      card.style.setProperty("--my", (y / r.height) * 100 + "%");

      // For 3D Tilt
      const centerX = r.width / 2;
      const centerY = r.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02) translateY(-4px)`;
      card.style.transition = "transform 0.1s ease-out";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.transition = "all 0.4s";
    });
  });
