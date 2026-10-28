/* =========================================================================
 *  MAIN SCRIPT — rendering, i18n, interactions & visual effects
 *  Konten diambil dari objek PORTFOLIO di js/data.js
 * ========================================================================= */
(() => {
  "use strict";

  const D = PORTFOLIO;
  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];

  let lang = localStorage.getItem("porto-lang") || "id";
  let currentFilter = "all";
  let typed = null;

  /* ------------------------------------------------------------ Helpers */
  const t = (v) => (v == null ? "" : typeof v === "object" && !Array.isArray(v) ? v[lang] ?? v.id ?? "" : v);
  const ui = (key) => t(D.ui[key]);
  const resolve = (path) => path.split(".").reduce((o, k) => (o ? o[k] : undefined), D);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ------------------------------------------------------- Static texts */
  function applyStaticTexts(animate = false) {
    $$("[data-i18n]").forEach((el) => {
      el.innerHTML = ui(el.dataset.i18n);
      if (animate) { el.classList.remove("i18n-fade"); void el.offsetWidth; el.classList.add("i18n-fade"); }
    });
    $$("[data-field]").forEach((el) => (el.textContent = t(resolve(el.dataset.field))));
    $$("[data-i18n-stat]").forEach((el) => {
      const s = D.about.stats[+el.dataset.i18nStat];
      if (!s) return;
      el.textContent = t(s.label);
      el.previousElementSibling.textContent = s.value + s.suffix;
    });

    document.documentElement.lang = lang;
    $("#statusPill").style.display = D.profile.available ? "" : "none";
    $("#btnDownloadCv").href = D.profile.cv;
    $$("#heroPhoto, #aboutPhoto").forEach((img) => { img.src = D.profile.photo; img.alt = D.profile.name; });
    $("#year").textContent = new Date().getFullYear();
  }

  /* --------------------------------------------------------- Renderers */
  const socialsHTML = () =>
    D.profile.socials
      .map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener" class="social-btn" aria-label="${esc(s.label)}" title="${esc(s.label)}"><i class="bi ${s.icon}"></i></a>`)
      .join("");

  function renderAbout() {
    $("#aboutText").innerHTML = D.about.paragraphs.map((p) => `<p>${esc(t(p))}</p>`).join("");

    $("#aboutHighlights").innerHTML = D.about.highlights
      .map((h, i) => `
        <div class="col-sm-4" data-aos="fade-up" data-aos-delay="${150 + i * 100}">
          <div class="highlight-card">
            <i class="bi ${h.icon}"></i>
            <h4>${esc(t(h.title))}</h4>
            <p>${esc(t(h.text))}</p>
          </div>
        </div>`)
      .join("");

    $("#aboutStats").innerHTML = D.about.stats
      .map((s) => `
        <div class="col-6 col-md-3 stat-col">
          <div class="stat-item">
            <h3><span class="counter" data-target="${s.value}">0</span>${esc(s.suffix)}</h3>
            <p>${esc(t(s.label))}</p>
          </div>
        </div>`)
      .join("");
  }

  function renderSkills() {
    // Legend kategori (hover/klik untuk menyorot teknologi dalam kategori tsb.)
    const legend = D.skills
      .map((g, gi) => `
        <button type="button" class="skill-legend-chip cat-${gi % 3}" data-cat="${gi}" id="skill-cat-${gi}">
          <i class="bi ${g.icon}"></i>${esc(t(g.category))}<span class="count">${g.items.length}</span>
        </button>`)
      .join("");

    // Semua teknologi dalam satu grid
    let n = 0;
    const tiles = D.skills
      .flatMap((g, gi) =>
        g.items.map((it) => `
          <div class="tech-cell" data-aos="zoom-in" data-aos-delay="${(n++ % 6) * 70}">
           <div class="tech-tile cat-${gi % 3}" data-cat="${gi}" title="${esc(it.name)}">
            <span class="tech-cat"><i class="bi ${g.icon}"></i>${esc(t(g.category))}</span>
            <div class="tech-logo"><i class="${esc(it.icon || "bi bi-code-slash")}"></i></div>
            <span class="tech-name">${esc(it.name)}</span>
           </div>
          </div>`)
      )
      .join("");

    $("#skillsGrid").innerHTML = `
      <div class="skills-board" data-aos="fade-up">
        <div class="skill-legend">${legend}</div>
        <div class="tech-wall" id="techWall">${tiles}</div>
      </div>`;

    // Interaksi legend: sorot kategori
    const wall = $("#techWall");
    let locked = null;
    const highlight = (cat) => {
      wall.classList.toggle("is-filtering", cat !== null);
      $$(".tech-tile", wall).forEach((el) => el.classList.toggle("is-active", el.dataset.cat === cat));
      $$(".skill-legend-chip").forEach((c) => c.classList.toggle("active", c.dataset.cat === cat));
    };
    $$(".skill-legend-chip").forEach((chip) => {
      chip.addEventListener("mouseenter", () => locked === null && highlight(chip.dataset.cat));
      chip.addEventListener("mouseleave", () => locked === null && highlight(null));
      chip.addEventListener("click", () => {
        locked = locked === chip.dataset.cat ? null : chip.dataset.cat;
        highlight(locked);
      });
    });
  }

  function categoryLabel(key) {
    const c = D.projectCategories.find((x) => x.key === key);
    return c ? t(c.label) : key;
  }

  function renderProjectFilter() {
    $("#projectFilter").innerHTML = D.projectCategories
      .map((c) => {
        const count = c.key === "all" ? D.projects.length : D.projects.filter((p) => p.category === c.key).length;
        if (!count) return "";
        return `<button type="button" class="filter-btn ${c.key === currentFilter ? "active" : ""}" data-filter="${c.key}" id="filter-${c.key}">${esc(t(c.label))}<span class="count">${count}</span></button>`;
      })
      .join("");
  }

  function renderProjects() {
    $("#projectGrid").innerHTML = D.projects
      .map((p, i) => {
        const hidden = currentFilter !== "all" && p.category !== currentFilter;
        return `
        <div class="col-md-6 col-lg-4 project-col ${hidden ? "d-none-anim hide-anim" : ""}" data-category="${p.category}">
         <div class="h-100" data-aos="fade-up" data-aos-delay="${(i % 3) * 100}">
          <article class="project-card" data-index="${i}" tabindex="0" id="project-${i}">
            <div class="project-thumb">
              <img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy" />
              <span class="project-year">${esc(p.year)}</span>
              <span class="project-view"><i class="bi bi-eye"></i> ${esc(ui("project_detail"))}</span>
            </div>
            <div class="project-body">
              <span class="badge-soft">${esc(categoryLabel(p.category))}</span>
              <h3>${esc(p.title)}</h3>
              <p>${esc(t(p.summary))}</p>
              <div class="tech-tags">${p.tech.slice(0, 4).map((x) => `<span class="tech-tag">${esc(x)}</span>`).join("")}${p.tech.length > 4 ? `<span class="tech-tag">+${p.tech.length - 4}</span>` : ""}</div>
            </div>
          </article>
         </div>
        </div>`;
      })
      .join("");

    if (window.VanillaTilt && matchMedia("(hover: hover)").matches) {
      VanillaTilt.init($$(".project-card"), { max: 6, speed: 600, glare: true, "max-glare": 0.15, scale: 1.02 });
    }
  }

  function renderExperience() {
    const line = $(".timeline-line").outerHTML;
    $("#timeline").innerHTML =
      line +
      D.experience
        .map((e, i) => `
        <div class="tl-item ${i % 2 ? "right" : ""}" data-aos="${i % 2 ? "fade-left" : "fade-right"}">
          <span class="tl-dot"></span>
          <div class="tl-card">
            <span class="tl-period"><i class="bi bi-calendar3"></i> ${esc(t(e.period))}</span>
            <h3>${esc(t(e.role))}</h3>
            <div class="tl-company">${esc(e.company)} <small>· ${esc(e.location)}</small></div>
            <ul>${e.points.map((pt) => `<li>${esc(t(pt))}</li>`).join("")}</ul>
          </div>
        </div>`)
        .join("");
  }

  function renderEducation() {
    $("#educationList").innerHTML = D.education
      .map((e, i) => `
        <div class="edu-card" data-aos="fade-up" data-aos-delay="${i * 100}">
          <div class="edu-icon"><i class="bi ${e.icon}"></i></div>
          <div>
            <small>${esc(t(e.period))}</small>
            <h4>${esc(t(e.degree))}</h4>
            <div class="school">${esc(e.school)}</div>
            <p>${esc(t(e.detail))}</p>
          </div>
        </div>`)
      .join("");

    $("#certList").innerHTML = D.certifications
      .map((c, i) => `
        <div class="col-sm-6" data-aos="fade-up" data-aos-delay="${(i % 2) * 100}">
          <div class="cert-card">
            <div class="cert-top"><i class="bi ${c.icon}"></i><span class="cert-year">${esc(c.year)}</span></div>
            <h4>${esc(c.name)}</h4>
            <div class="issuer">${esc(c.issuer)}</div>
            <a href="${esc(c.url)}" target="_blank" rel="noopener" class="cert-link">${esc(ui("cert_view"))} <i class="bi bi-arrow-up-right"></i></a>
          </div>
        </div>`)
      .join("");
  }

  function renderContact() {
    const p = D.profile;
    $("#contactInfo").innerHTML = `
      <li><i class="bi bi-envelope"></i><div><small>Email</small><a href="mailto:${esc(p.email)}">${esc(p.email)}</a></div></li>
      <li><i class="bi bi-telephone"></i><div><small>${lang === "id" ? "Telepon" : "Phone"}</small><a href="tel:${esc(p.phone.replace(/[^\d+]/g, ""))}">${esc(p.phone)}</a></div></li>
      <li><i class="bi bi-geo-alt"></i><div><small>${lang === "id" ? "Lokasi" : "Location"}</small><span>${esc(t(p.location))}</span></div></li>`;
    $("#heroSocials").innerHTML = socialsHTML();
    $("#contactSocials").innerHTML = socialsHTML();
  }

  /* ------------------------------------------------------------- Typed */
  function initTyped() {
    if (typed) typed.destroy();
    const roles = t(D.profile.roles);
    if (window.Typed) {
      typed = new Typed("#typedRole", { strings: roles, typeSpeed: 60, backSpeed: 35, backDelay: 1800, loop: true, smartBackspace: true });
    } else {
      $("#typedRole").textContent = roles[0];
    }
  }

  /* ------------------------------------------------- Render everything */
  function renderAll(animate = false) {
    applyStaticTexts(animate);
    renderAbout();
    renderSkills();
    renderProjectFilter();
    renderProjects();
    renderExperience();
    renderEducation();
    renderContact();
    initTyped();
    observeOnce();
    bindHoverTargets();
    if (window.AOS) AOS.refreshHard();
  }

  /* ---------------------------------------------------------- Language */
  function setLang(next) {
    if (next === lang) return;
    lang = next;
    localStorage.setItem("porto-lang", lang);
    syncLangSwitch();
    renderAll(true);
  }
  function syncLangSwitch() {
    $("#langSwitch").dataset.active = lang;
    $$(".lang-btn").forEach((b) => b.classList.toggle("active", b.dataset.lang === lang));
  }

  /* ------------------------------------------------- Counters on view */
  let io;
  function observeOnce() {
    if (io) io.disconnect();
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          animateCounter(en.target);
          io.unobserve(en.target);
        });
      },
      { threshold: 0.4 }
    );
    $$(".counter").forEach((el) => io.observe(el));
  }
  function animateCounter(el) {
    const target = +el.dataset.target;
    const dur = 1800;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ------------------------------------------------------ Project filter */
  function applyFilter(key) {
    currentFilter = key;
    $$(".filter-btn").forEach((b) => b.classList.toggle("active", b.dataset.filter === key));
    $$(".project-col").forEach((col) => {
      const show = key === "all" || col.dataset.category === key;
      if (show) {
        col.classList.remove("d-none-anim");
        requestAnimationFrame(() => requestAnimationFrame(() => col.classList.remove("hide-anim")));
      } else {
        col.classList.add("hide-anim");
        setTimeout(() => col.classList.contains("hide-anim") && col.classList.add("d-none-anim"), 400);
      }
    });
  }

  /* ------------------------------------------------------- Project modal */
  let modal;
  function openProject(i) {
    const p = D.projects[i];
    if (!p) return;
    $("#modalImg").src = p.image;
    $("#modalImg").alt = p.title;
    $("#modalCategory").textContent = categoryLabel(p.category);
    $("#modalTitle").textContent = p.title;
    $("#modalDesc").textContent = t(p.description);
    $("#modalRole").textContent = t(p.role);
    $("#modalYear").textContent = p.year;
    $("#modalTech").innerHTML = p.tech.map((x) => `<span class="tech-tag">${esc(x)}</span>`).join("");
    const demo = $("#modalDemo"), repo = $("#modalRepo");
    demo.href = p.demo || "#"; demo.classList.toggle("d-none", !p.demo);
    repo.href = p.repo || "#"; repo.classList.toggle("d-none", !p.repo);
    modal.show();
  }

  /* --------------------------------------------------------- Contact form */
  function initContactForm() {
    const form = $("#contactForm");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      form.classList.add("was-validated");
      if (!form.checkValidity()) return;

      const btn = $("#cfSubmit");
      btn.disabled = true;
      $(".btn-label", btn).classList.add("d-none");
      $(".spinner-border", btn).classList.remove("d-none");

      const payload = { name: $("#cfName").value, email: $("#cfEmail").value, subject: $("#cfSubject").value, message: $("#cfMessage").value };
      try {
        if (D.profile.formEndpoint) {
          const res = await fetch(D.profile.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) });
          if (!res.ok) throw new Error("Failed");
        } else {
          await new Promise((r) => setTimeout(r, 1200)); // simulasi
        }
        form.reset();
        form.classList.remove("was-validated");
        bootstrap.Toast.getOrCreateInstance($("#successToast"), { delay: 4000 }).show();
      } catch (err) {
        alert(lang === "id" ? "Maaf, pesan gagal dikirim. Silakan coba lagi." : "Sorry, the message failed to send. Please try again.");
      } finally {
        btn.disabled = false;
        $(".btn-label", btn).classList.remove("d-none");
        $(".spinner-border", btn).classList.add("d-none");
      }
    });
  }

  /* --------------------------------------------------- Scroll effects */
  function onScroll() {
    const y = window.scrollY;
    const h = document.documentElement.scrollHeight - innerHeight;
    $("#scrollProgress").style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    $("#mainNav").classList.toggle("scrolled", y > 40);
    $("#backToTop").classList.toggle("show", y > 600);

    // Scrollspy: tandai link navbar sesuai section yang sedang terlihat
    let current = "home";
    $$("main section[id]").forEach((s) => { if (s.getBoundingClientRect().top <= innerHeight * 0.35) current = s.id; });
    if (innerHeight + y >= document.documentElement.scrollHeight - 4) current = "contact";
    $$("#navMenu .nav-link").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current));

    // Timeline progress line
    const tl = $("#timeline");
    const prog = $("#timelineProgress");
    if (tl && prog) {
      const r = tl.getBoundingClientRect();
      const pct = Math.min(Math.max((innerHeight * 0.6 - r.top) / r.height, 0), 1);
      prog.style.height = pct * 100 + "%";
    }

    // Parallax blobs di hero
    if (y < innerHeight) {
      $$(".hero .blob").forEach((b, i) => (b.style.translate = `0 ${y * (0.15 + i * 0.08)}px`));
    }
  }

  /* --------------------------------------------- Cursor & magnetic btn */
  const ring = $("#cursorRing");
  function bindHoverTargets() {
    $$("a, button, .project-card, .filter-btn, input, textarea").forEach((el) => {
      if (el.dataset.cursorBound) return;
      el.dataset.cursorBound = "1";
      el.addEventListener("mouseenter", () => ring.classList.add("hover"));
      el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
    });
  }
  function initCursor() {
    if (!matchMedia("(hover: hover) and (min-width: 992px)").matches) return;
    const dot = $("#cursorDot");
    let mx = 0, my = 0, rx = 0, ry = 0;
    addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      document.body.classList.add("has-cursor");
    });
    document.addEventListener("mouseleave", () => document.body.classList.remove("has-cursor"));
    (function loop() {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    })();
  }
  function initMagnetic() {
    if (!matchMedia("(hover: hover)").matches) return;
    $$(".magnetic").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
      });
      el.addEventListener("mouseleave", () => (el.style.transform = ""));
    });
  }

  /* --------------------------------------------- Hero photo mouse tilt */
  function initHeroParallax() {
    const visual = $(".hero-visual");
    if (!visual || !matchMedia("(hover: hover)").matches) return;
    $(".hero").addEventListener("mousemove", (e) => {
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      $$(".float-card, .float-chip", visual).forEach((el, i) => (el.style.translate = `${x * (10 + i * 6)}px ${y * (10 + i * 6)}px`));
      $("#heroPhotoFrame").style.translate = `${x * -6}px ${y * -6}px`;
    });
  }

  /* --------------------------------------------------------------- Init */
  function bindEvents() {
    $("#langSwitch").addEventListener("click", (e) => {
      const b = e.target.closest(".lang-btn");
      if (b) setLang(b.dataset.lang);
    });

    $("#projectFilter").addEventListener("click", (e) => {
      const b = e.target.closest(".filter-btn");
      if (b) applyFilter(b.dataset.filter);
    });

    $("#projectGrid").addEventListener("click", (e) => {
      const card = e.target.closest(".project-card");
      if (card) openProject(+card.dataset.index);
    });
    $("#projectGrid").addEventListener("keydown", (e) => {
      const card = e.target.closest(".project-card");
      if (card && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openProject(+card.dataset.index); }
    });

    // Tutup menu mobile setelah klik link
    const menu = $("#navMenu");
    $$("#navMenu .nav-link").forEach((a) =>
      a.addEventListener("click", () => menu.classList.contains("show") && bootstrap.Collapse.getOrCreateInstance(menu).hide())
    );

    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
  }

  document.body.classList.add("loading");
  document.addEventListener("DOMContentLoaded", () => {
    modal = new bootstrap.Modal("#projectModal");
    syncLangSwitch();
    AOS.init({ duration: 900, easing: "ease-out-cubic", once: true, offset: 60 });
    renderAll();
    bindEvents();
    initContactForm();
    initCursor();
    initMagnetic();
    initHeroParallax();
    onScroll();
  });

  addEventListener("load", () => {
    setTimeout(() => {
      $("#preloader").classList.add("hide");
      document.body.classList.remove("loading");
      AOS.refresh();
    }, 500);
  });
})();
