/* ==========================================================================
   InnovateX Hub — shared site behaviour
   Injects nav + footer, handles EN/TA language toggle, mobile menu,
   scroll-reveal animations, and copy-to-clipboard for code blocks.
   ========================================================================== */

(function () {
  "use strict";

  // base = relative path back to site root, read from <body data-base="../">
  var body = document.body;
  var base = body.getAttribute("data-base") || "";
  var page = body.getAttribute("data-page") || "";

  /* ---------------- Background layers (added once, on every page) --------- */
  var bpGlow = document.createElement("div");
  bpGlow.className = "bp-glow";
  var bpGrid = document.createElement("div");
  bpGrid.className = "bp-grid";
  document.body.prepend(bpGrid);
  document.body.prepend(bpGlow);

  /* ---------------- Nav ---------------------------------------------------- */
  var navLinks = [
    { href: base + "index.html", key: "home", en: "Home", ta: "முகப்பு" },
    { href: base + "learn/index.html", key: "learn", en: "Learn Academy", ta: "கற்றல் அகாடமி" },
    { href: base + "weeks/week1.html", key: "weeks", en: "Weeks", ta: "வாரங்கள்" },
    { href: base + "gallery/index.html", key: "gallery", en: "Gallery", ta: "படத்தொகுப்பு" },
    { href: base + "about/index.html", key: "about", en: "About", ta: "எங்களை பற்றி" }
  ];

  function navLinkHTML(link, mobile) {
    var active = link.key === page ? " active" : "";
    return '<a href="' + link.href + '" class="' + active.trim() + '">' +
      '<span data-en>' + link.en + '</span><span data-ta>' + link.ta + '</span>' +
      '</a>';
  }

  var navHTML =
    '<nav class="site-nav">' +
      '<div class="container">' +
        '<a href="' + base + 'index.html" class="brand">' +
          '<span class="brand-mark">X</span>' +
          '<span><span data-en>InnovateX Hub</span><span data-ta>InnovateX Hub</span></span>' +
        '</a>' +
        '<div class="nav-links">' + navLinks.map(function (l) { return navLinkHTML(l, false); }).join("") + '</div>' +
        '<div class="nav-right">' +
          '<div class="lang-toggle" role="group" aria-label="Language">' +
            '<button type="button" data-lang-btn="en">EN</button>' +
            '<button type="button" data-lang-btn="ta">தமிழ்</button>' +
          '</div>' +
          '<button class="nav-toggle" id="navToggle" aria-label="Menu">☰</button>' +
        '</div>' +
      '</div>' +
      '<div class="nav-mobile" id="navMobile">' + navLinks.map(function (l) { return navLinkHTML(l, true); }).join("") + '</div>' +
    '</nav>';

  var navRoot = document.getElementById("nav-root");
  if (navRoot) navRoot.outerHTML = navHTML;

  var toggleBtn = document.getElementById("navToggle");
  var mobileNav = document.getElementById("navMobile");
  if (toggleBtn && mobileNav) {
    toggleBtn.addEventListener("click", function () {
      mobileNav.classList.toggle("open");
    });
  }

  /* ---------------- Footer -------------------------------------------------- */
  var footerHTML =
    '<footer class="site-footer">' +
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div>' +
            '<div class="brand mb-3"><span class="brand-mark">X</span><span>InnovateX Hub</span></div>' +
            '<p class="muted" data-en style="max-width:340px">A 7-week AIoT learning journey for students aged 11–18 — from a single LED to a full ESP32 smart-robotics project.</p>' +
            '<p class="muted" data-ta style="max-width:340px">11 முதல் 18 வயது மாணவர்களுக்கான 7 வார AIoT கற்றல் பயணம் — ஒரு LED விளக்கிலிருந்து முழுமையான ESP32 திட்டம் வரை.</p>' +
          '</div>' +
          '<div>' +
            '<h5 data-en>Explore</h5><h5 data-ta>ஆராயுங்கள்</h5>' +
            '<a href="' + base + 'learn/index.html"><span data-en>Learn Academy</span><span data-ta>கற்றல் அகாடமி</span></a>' +
            '<a href="' + base + 'weeks/week1.html"><span data-en>Weekly Program</span><span data-ta>வாராந்திர திட்டம்</span></a>' +
            '<a href="' + base + 'gallery/index.html"><span data-en>Gallery</span><span data-ta>படத்தொகுப்பு</span></a>' +
          '</div>' +
          '<div>' +
            '<h5 data-en>Program</h5><h5 data-ta>திட்டம்</h5>' +
            '<a href="' + base + 'about/index.html"><span data-en>About InnovateX</span><span data-ta>InnovateX பற்றி</span></a>' +
            '<a href="' + base + 'about/index.html#contact"><span data-en>Contact</span><span data-ta>தொடர்பு</span></a>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<span>© 2026 InnovateX 3.0 · Hemmathagama</span>' +
          '<span data-en>Built for 100 young innovators 🚀</span>' +
          '<span data-ta>100 இளம் கண்டுபிடிப்பாளர்களுக்காக 🚀</span>' +
        '</div>' +
      '</div>' +
    '</footer>';

  var footerRoot = document.getElementById("footer-root");
  if (footerRoot) footerRoot.outerHTML = footerHTML;

  /* ---------------- Language toggle ----------------------------------------- */
  var LANG_KEY = "ix-lang";
  function applyLang(lang) {
    document.documentElement.setAttribute("lang", lang);
    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang-btn") === lang);
    });
    localStorage.setItem(LANG_KEY, lang);
  }
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-lang-btn]");
    if (btn) applyLang(btn.getAttribute("data-lang-btn"));
  });
  applyLang(localStorage.getItem(LANG_KEY) || "en");

  /* ---------------- Scroll reveal -------------------------------------------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  });

  /* ---------------- Copy-to-clipboard for code blocks ------------------------ */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".copy-btn");
    if (!btn) return;
    var block = btn.closest(".code-block");
    var codeEl = block && block.querySelector("pre code");
    if (!codeEl) return;
    navigator.clipboard.writeText(codeEl.textContent).then(function () {
      var original = btn.textContent;
      btn.textContent = "Copied ✓";
      btn.classList.add("copied");
      setTimeout(function () { btn.textContent = original; btn.classList.remove("copied"); }, 1800);
    });
  });

  /* ---------------- Diagram hotspot tooltips ---------------------------------- */
  document.addEventListener("click", function (e) {
    var hotspot = e.target.closest("[data-hotspot]");
    document.querySelectorAll(".diagram-tooltip.show").forEach(function (t) {
      if (!hotspot || t.id !== "tip-" + hotspot.getAttribute("data-hotspot")) t.classList.remove("show");
    });
    if (!hotspot) return;
    var id = hotspot.getAttribute("data-hotspot");
    var tip = document.getElementById("tip-" + id);
    if (tip) tip.classList.toggle("show");
  });

  /* ---------------- Mini-quiz (Learn Academy self-check) --------------------- */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-quiz-check]");
    if (!btn) return;
    var quiz = btn.closest(".mini-quiz");
    if (!quiz) return;
    var questions = quiz.querySelectorAll(".quiz-q");
    var correctCount = 0;
    questions.forEach(function (q) {
      var name = q.getAttribute("data-name");
      var correct = q.getAttribute("data-correct");
      var picked = quiz.querySelector('input[name="' + name + '"]:checked');
      var feedback = q.querySelector(".quiz-feedback");
      if (!feedback) return;
      if (!picked) {
        feedback.className = "quiz-feedback show incorrect";
        feedback.querySelectorAll("[data-en]").forEach(function (s) { s.textContent = "Pick an answer first."; });
        feedback.querySelectorAll("[data-ta]").forEach(function (s) { s.textContent = "முதலில் ஒரு பதிலைத் தேர்ந்தெடுக்கவும்."; });
        return;
      }
      var isCorrect = picked.value === correct;
      if (isCorrect) correctCount++;
      feedback.className = "quiz-feedback show " + (isCorrect ? "correct" : "incorrect");
    });
    var scoreEl = quiz.querySelector(".quiz-score");
    if (scoreEl) {
      scoreEl.innerHTML =
        '<span data-en>Score: ' + correctCount + ' / ' + questions.length + '</span>' +
        '<span data-ta>மதிப்பெண்: ' + correctCount + ' / ' + questions.length + '</span>';
      var lang = document.documentElement.getAttribute("lang") || "en";
      scoreEl.style.display = "block";
    }
  });

  /* expose helper for other scripts */
  window.IX = { base: base };
})();
