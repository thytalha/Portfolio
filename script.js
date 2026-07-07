// ── CURSOR ──
const cur = document.getElementById("cursor");
const ring = document.getElementById("cursor-ring");
let mx = -100,
  my = -100,
  rx = -100,
  ry = -100;
let cursorVisible = false;

const isDesktop = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

document.addEventListener("mousemove", (e) => {
  if (!isDesktop()) return;
  if (!cursorVisible) {
    cursorVisible = true;
    if (cur) cur.style.opacity = "1";
    if (ring) ring.style.opacity = "1";
    rx = e.clientX;
    ry = e.clientY;
  }
  mx = e.clientX;
  my = e.clientY;
  if (cur) {
    cur.style.left = mx + "px";
    cur.style.top = my + "px";
  }
});

document.addEventListener("mouseleave", () => {
  if (!isDesktop()) return;
  cursorVisible = false;
  if (cur) cur.style.opacity = "0";
  if (ring) ring.style.opacity = "0";
});

document.addEventListener("mouseenter", (e) => {
  if (!isDesktop()) return;
  cursorVisible = true;
  if (cur) cur.style.opacity = "1";
  if (ring) ring.style.opacity = "1";
  mx = e.clientX;
  my = e.clientY;
  rx = e.clientX;
  ry = e.clientY;
});

(function animRing() {
  if (isDesktop() && cursorVisible && ring) {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + "px";
    ring.style.top = ry + "px";
  }
  requestAnimationFrame(animRing);
})();

document
  .querySelectorAll(
    "a,button,.project-card,.stat-card,.skill-category,.cert-card",
  )
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      if (!isDesktop()) return;
      if (cur) {
        cur.style.width = "20px";
        cur.style.height = "20px";
      }
      if (ring) {
        ring.style.width = "54px";
        ring.style.height = "54px";
      }
    });
    el.addEventListener("mouseleave", () => {
      if (!isDesktop()) return;
      if (cur) {
        cur.style.width = "12px";
        cur.style.height = "12px";
      }
      if (ring) {
        ring.style.width = "36px";
        ring.style.height = "36px";
      }
    });
  });

// ── STARFIELD ──
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
let stars = [],
  W,
  H;
function resize() {
  W = canvas.width = document.documentElement.clientWidth || window.innerWidth;
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
    ctx.fillStyle = `rgba(0,165,184,${s.a * 0.7})`;
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
  const el = document.getElementById("typed-text");
  if (el) el.textContent = txt;
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
const navOverlay = document.getElementById("nav-overlay");
const sideMenuClose = document.getElementById("side-menu-close");
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
  if (navOverlay) navOverlay.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
};

if (navToggle && navMenu) {
  navToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = navMenu.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    if (navOverlay) navOverlay.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if (sideMenuClose) {
  sideMenuClose.addEventListener("click", closeNavMenu);
}

if (navOverlay) {
  navOverlay.addEventListener("click", closeNavMenu);
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
    !navMenu.contains(e.target) &&
    navToggle &&
    !navToggle.contains(e.target)
  ) {
    closeNavMenu();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navMenu && navMenu.classList.contains("open")) {
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

// ── CERTIFICATES GALLERY & MODAL ──
const certificatesData = [
  {
    title: "Claude 101",
    issuer: "Anthropic",
    subText: "Certificate of completion · Artificial Intelligence",
    date: "June 2026",
    filename: "Claude 101.pdf",
    type: "pdf",
    icon: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-label="Claude"><path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z" /></svg>`
  },
  {
    title: "Programming with C++",
    issuer: "Simplilearn",
    subText: "Course certificate · Software development & memory management",
    date: "June 2026",
    filename: "Programming with C++.pdf",
    type: "pdf",
    icon: `<i class="fa-solid fa-code"></i>`
  },
  {
    title: "Introduction to Modern AI",
    issuer: "Cisco Networking Academy",
    subText: "Verified credential · Artificial Intelligence",
    date: "July 2025",
    filename: "Introduction to Modern AI.jpg",
    type: "jpg",
    icon: `<i class="fa-solid fa-robot"></i>`
  },
  {
    title: "AI for Beginners",
    issuer: "HP LIFE",
    subText: "Course certificate · Artificial Intelligence",
    date: "August 2025",
    filename: "AI for Beginners.jpg",
    type: "jpg",
    icon: `<i class="fa-solid fa-briefcase"></i>`
  },
  {
    title: "AI for Business Professionals",
    issuer: "HP LIFE",
    subText: "Course certificate · Artificial Intelligence",
    date: "August 2025",
    filename: "AI for Business Professionals.jpg",
    type: "jpg",
    icon: `<i class="fa-solid fa-user-tie"></i>`
  },
  {
    title: "C++ Programming Internship",
    issuer: "CodeAlpha",
    subText: "Internship Offer Letter · Software development",
    date: "May 2026 - June 2026",
    filename: "Offer Letter.pdf",
    type: "pdf",
    icon: `<i class="fa-solid fa-laptop-code"></i>`
  },
  {
    title: "Business Email Certification",
    issuer: "HP LIFE",
    subText: "Professional communication skills",
    date: "August 2025",
    filename: "Business Email.jpg",
    type: "jpg",
    icon: `<i class="fa-solid fa-envelope"></i>`
  },
  {
    title: "EF SET English Certificate - C2 Proficient",
    issuer: "EF SET",
    subText: "Score: 75/100 · Highest CEFR level",
    date: "May 2026",
    filename: "EF SET Certificate.pdf",
    type: "pdf",
    icon: `<i class="fa-solid fa-comments"></i>`
  },
  {
    title: "How to Write a Resume",
    issuer: "The State University of New York",
    subText: "Project-Centered Course · Professional development",
    date: "June 2026",
    filename: "How to Write a Resume.pdf",
    type: "pdf",
    icon: `<i class="fa-solid fa-file-lines"></i>`
  },
  {
    title: "GitHub Student Developer Pack",
    issuer: "GitHub Education",
    subText: "Active member · Professional version control & dev tools",
    date: "April 2026",
    url: "https://education.github.com/pack",
    type: "link",
    icon: `<i class="fa-brands fa-github"></i>`
  }
];

const certsGrid = document.getElementById("certs-grid");
const certModal = document.getElementById("cert-modal");
const certModalBackdrop = document.getElementById("cert-modal-backdrop");
const certModalClose = document.getElementById("modal-cert-close");
const modalCertTitle = document.getElementById("modal-cert-title");
const modalCertIssuer = document.getElementById("modal-cert-issuer");
const modalCertDownload = document.getElementById("modal-cert-download");
const modalCertBody = document.getElementById("cert-modal-body");

if (certsGrid) {
  certificatesData.forEach((cert) => {
    const card = document.createElement("div");
    card.className = "cert-card";
    const tagText = cert.type === "link" ? "WEB LINK" : cert.type.toUpperCase();
    
    card.innerHTML = `
      <div class="cert-card-header">
        <div class="cert-card-icon">${cert.icon}</div>
        <div class="cert-card-action">
          <i class="fa-solid ${cert.type === 'link' ? 'fa-arrow-up-right-from-square' : 'fa-expand'}"></i>
        </div>
      </div>
      <div class="cert-card-body">
        <div class="cert-card-title">${cert.title}</div>
        <div class="cert-card-issuer">${cert.issuer}</div>
        <div class="cert-card-subtext">${cert.subText}</div>
      </div>
      <div class="cert-card-footer">
        <div class="cert-card-date">${cert.date}</div>
        <div class="cert-card-tag">${tagText}</div>
      </div>
    `;

    card.addEventListener("click", () => {
      if (cert.url) {
        window.open(cert.url, "_blank", "noopener,noreferrer");
        return;
      }
      if (!certModal || !cert.filename) return;

      modalCertTitle.textContent = cert.title;
      modalCertIssuer.textContent = cert.issuer;
      const fileUrl = `Certificates/${encodeURIComponent(cert.filename)}`;
      if (modalCertDownload) {
        modalCertDownload.href = fileUrl;
        modalCertDownload.setAttribute("download", cert.filename);
      }

      if (cert.type === "pdf" || cert.filename.toLowerCase().endsWith(".pdf")) {
        modalCertBody.innerHTML = `<iframe src="${fileUrl}#toolbar=0" title="${cert.title}" style="width:100%; height:100%; border:none; border-radius:4px;"></iframe>`;
      } else {
        modalCertBody.innerHTML = `<img src="${fileUrl}" alt="${cert.title}" style="max-width:100%; max-height:100%; object-fit:contain; border-radius:4px; box-shadow: 0 8px 32px rgba(0,0,0,0.5);" />`;
      }

      certModal.classList.add("active");
      certModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });

    certsGrid.appendChild(card);
  });
}

const closeModal = () => {
  if (!certModal) return;
  certModal.classList.remove("active");
  certModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  setTimeout(() => {
    if (!certModal.classList.contains("active") && modalCertBody) {
      modalCertBody.innerHTML = "";
    }
  }, 300);
};

if (certModalClose) certModalClose.addEventListener("click", closeModal);
if (certModalBackdrop) certModalBackdrop.addEventListener("click", closeModal);
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && certModal && certModal.classList.contains("active")) {
    closeModal();
  }
});

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
addReveal(document.querySelectorAll(".certs-grid .cert-card"), {
  direction: (i) => (i % 2 === 0 ? "tilt-left" : "tilt-right"),
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
  .querySelectorAll(".project-card, .skill-category, .stat-card, .cert-card")
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
