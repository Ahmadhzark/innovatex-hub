/* ==========================================================================
   InnovateX Hub — Weekly page renderer
   Every weeks/weekN.html is a thin shell: it sets window.WEEK_NUM and
   includes this script. This script fetches /data/weekN.json and renders
   the full page. Muaz only ever edits the JSON file — never this script.
   ========================================================================== */

(function () {
  "use strict";

  var WEEK = window.WEEK_NUM;
  var base = (window.IX && window.IX.base) || "../";
  var root = document.getElementById("week-root");
  if (!root || !WEEK) return;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function bi(field) {
    // bilingual field -> two spans
    if (!field) return "";
    return '<span data-en>' + esc(field.en) + '</span><span data-ta>' + esc(field.ta) + '</span>';
  }

  fetch(base + "data/week" + WEEK + ".json")
    .then(function (r) { if (!r.ok) throw new Error("missing"); return r.json(); })
    .then(render)
    .catch(function () { renderMissing(); });

  function renderMissing() {
    root.innerHTML =
      '<div class="section container center">' +
        '<h1>Week ' + WEEK + '</h1>' +
        '<p class="lede" style="margin:0 auto">This week\'s data file has not been created yet.</p>' +
      '</div>';
  }

  function renderComingSoon(data) {
    root.innerHTML =
      '<div class="section container">' +
        '<div class="crumb"><a href="' + base + 'index.html" data-en>Home</a><a href="' + base + 'index.html" data-ta>முகப்பு</a> / ' +
          '<span data-en>Week ' + WEEK + '</span><span data-ta>வாரம் ' + WEEK + '</span></div>' +
        '<div class="card center" style="max-width:640px;margin:var(--space-6) auto;padding:var(--space-7) var(--space-5)">' +
          '<div class="pill pill-soon mb-4" style="margin:0 auto var(--space-4)">' +
            '<span data-en>Coming Soon</span><span data-ta>விரைவில்</span>' +
          '</div>' +
          '<h2>' + bi(data.title) + '</h2>' +
          '<p class="lede mt-3" style="margin:0 auto">' + bi(data.teaser || { en: "This week's blueprint unlocks once the session happens — check back soon!", ta: "இந்த வார திட்டம் அமர்வு நடந்த பிறகு திறக்கப்படும் — விரைவில் பாருங்கள்!" }) + '</p>' +
          '<a href="' + base + 'weeks/week' + (WEEK > 1 ? WEEK - 1 : 1) + '.html" class="btn btn-ghost mt-5">' +
            '<span data-en>← Back to previous week</span><span data-ta>← முந்தைய வாரத்திற்கு செல்ல</span>' +
          '</a>' +
        '</div>' +
      '</div>';
  }

  function render(data) {
    document.title = "Week " + WEEK + " — " + (data.title ? data.title.en : "") + " · InnovateX Hub";

    if (data.status !== "live") { renderComingSoon(data); return; }

    var pct = data.attendance ? Math.round((data.attendance.count / data.attendance.total) * 100) : null;

    var html = "";

    // Header
    html += '<div class="section-tight container">';
    html += '<div class="crumb"><a href="' + base + 'index.html" data-en>Home</a><a href="' + base + 'index.html" data-ta>முகப்பு</a> / <span data-en>Weeks</span><span data-ta>வாரங்கள்</span> / <span data-en>Week ' + WEEK + '</span><span data-ta>வாரம் ' + WEEK + '</span></div>';
    html += '<div class="eyebrow">' + bi(data.dateRange) + '</div>';
    html += '<h1>' + bi(data.title) + '</h1>';
    html += '<p class="lede mt-3">' + bi(data.goal) + '</p>';
    html += '</div>';

    // Week nav strip
    html += '<div class="container mb-6"><div class="row gap-2" style="flex-wrap:wrap">';
    for (var i = 1; i <= 7; i++) {
      html += '<a href="' + base + 'weeks/week' + i + '.html" class="pill' + (i === WEEK ? ' pill-live' : '') + '">W' + i + '</a>';
    }
    html += '</div></div>';

    // Overview strip: resource person + attendance
    html += '<div class="container mb-6"><div class="grid" style="grid-template-columns:1fr 1fr">';
    html += '<div class="card">';
    html += '<div class="card-icon">🧑‍🏫</div>';
    html += '<h4 data-en>Resource Person</h4><h4 data-ta>வளப் பயிற்றுநர்</h4>';
    html += '<p class="text-emerald" style="font-weight:700;margin-top:6px">' + esc(data.resourcePerson ? data.resourcePerson.name : "TBA") + '</p>';
    html += '<p class="muted">' + bi(data.resourcePerson ? data.resourcePerson.role : { en: "", ta: "" }) + '</p>';
    html += '</div>';
    html += '<div class="card">';
    html += '<div class="card-icon">👥</div>';
    html += '<h4 data-en>Attendance</h4><h4 data-ta>வருகை</h4>';
    html += '<p class="text-emerald" style="font-weight:700;font-size:1.3rem;margin-top:6px">' + (data.attendance ? data.attendance.count + " / " + data.attendance.total : "—") + (pct ? '<span class="muted" style="font-size:0.9rem"> (' + pct + '%)</span>' : '') + '</p>';
    html += '</div>';
    html += '</div></div>';

    // What we're building
    if (data.building) {
      html += '<div class="container section-tight">';
      html += '<h2>' + '<span data-en>What We\'re Building</span><span data-ta>நாம் என்ன உருவாக்குகிறோம்</span>' + '</h2>';
      html += '<p class="lede mt-3">' + bi(data.building) + '</p>';
      html += '</div>';
    }

    // Circuit diagram
    if (data.circuit) {
      html += '<div class="container section-tight">';
      html += '<h2><span data-en>Circuit Diagram</span><span data-ta>சுற்று வரைபடம்</span></h2>';
      html += '<div class="diagram-wrap mt-4">';
      html += data.circuit.image
        ? '<img src="' + base + esc(data.circuit.image) + '" alt="Circuit diagram">'
        : '<div class="ph-placeholder" style="aspect-ratio:16/9"><span data-en>Diagram image goes here</span><span data-ta>வரைபடம் இங்கே வரும்</span></div>';
      html += '<p class="muted mt-3">' + bi(data.circuit.caption) + '</p>';
      html += '</div></div>';
    }

    // Components
    if (data.components && data.components.length) {
      html += '<div class="container section-tight">';
      html += '<h2><span data-en>Component Checklist</span><span data-ta>கூறுகள் பட்டியல்</span></h2>';
      html += '<div class="grid mt-4" style="grid-template-columns:repeat(auto-fill,minmax(180px,1fr))">';
      data.components.forEach(function (c) {
        html += '<div class="pill" style="justify-content:flex-start;padding:10px 14px">✓ ' + bi(c) + '</div>';
      });
      html += '</div></div>';
    }

    // Wiring steps
    if (data.steps && data.steps.length) {
      html += '<div class="container section-tight">';
      html += '<h2><span data-en>Step-by-Step Wiring</span><span data-ta>படிப்படியான இணைப்பு வழிமுறை</span></h2>';
      html += '<div class="steps mt-4">';
      data.steps.forEach(function (s) {
        html += '<div class="step"><div class="step-num"></div><div>';
        html += '<h4>' + bi(s.title) + '</h4>';
        html += '<p class="mt-2">' + bi(s.desc) + '</p>';
        if (s.image) html += '<img src="' + base + esc(s.image) + '" alt="' + esc(s.title.en) + '">';
        html += '</div></div>';
      });
      html += '</div></div>';
    }

    // Code
    if (data.code && data.code.content) {
      html += '<div class="container section-tight">';
      html += '<h2><span data-en>Code</span><span data-ta>குறியீடு</span></h2>';
      html += '<div class="code-block mt-4">';
      html += '<div class="code-block-head"><span>' + esc(data.code.filename || "sketch.ino") + '</span><button class="copy-btn">Copy</button></div>';
      html += '<pre><code>' + esc(data.code.content) + '</code></pre>';
      html += '</div></div>';
      if (data.tinkercad) {
        html += '<div class="container"><a href="' + esc(data.tinkercad) + '" target="_blank" rel="noopener" class="btn btn-ghost">' +
          '<span data-en>🔧 Try this circuit virtually on Tinkercad</span><span data-ta>🔧 Tinkercad-இல் இந்த சுற்றை முயற்சிக்கவும்</span></a></div>';
      }
    }

    // What students learned
    if (data.learned && data.learned.length) {
      html += '<div class="container section-tight">';
      html += '<h2><span data-en>What Students Learned</span><span data-ta>மாணவர்கள் கற்றது</span></h2>';
      html += '<ul class="grid mt-4" style="grid-template-columns:repeat(auto-fill,minmax(220px,1fr))">';
      data.learned.forEach(function (l) {
        html += '<li class="card" style="padding:var(--space-4)">🎯 ' + bi(l) + '</li>';
      });
      html += '</ul></div>';
    }

    // Photos
    html += '<div class="container section-tight">';
    html += '<h2><span data-en>Photo Highlights</span><span data-ta>புகைப்பட சிறப்பம்சங்கள்</span></h2>';
    html += '<div class="photo-grid mt-4">';
    if (data.photos && data.photos.length) {
      data.photos.forEach(function (p) { html += '<img src="' + base + esc(p) + '" alt="Week ' + WEEK + ' photo" loading="lazy">'; });
    } else {
      for (var ph = 0; ph < 3; ph++) html += '<div class="ph-placeholder"><span data-en>Photo coming</span><span data-ta>புகைப்படம் விரைவில்</span></div>';
    }
    html += '</div>';
    if (data.driveLink) {
      html += '<a href="' + esc(data.driveLink) + '" target="_blank" rel="noopener" class="btn btn-ghost mt-4">' +
        '<span data-en>📁 View all photos →</span><span data-ta>📁 அனைத்து புகைப்படங்களையும் காண →</span></a>';
    }
    html += '</div>';

    // Useful links
    if (data.links && data.links.length) {
      html += '<div class="container section-tight">';
      html += '<h2><span data-en>Useful Links</span><span data-ta>பயனுள்ள இணைப்புகள்</span></h2>';
      html += '<div class="row gap-3 mt-4" style="flex-wrap:wrap">';
      data.links.forEach(function (l) {
        html += '<a href="' + esc(l.url) + '" target="_blank" rel="noopener" class="btn btn-ghost btn-sm">' + bi(l.label) + '</a>';
      });
      html += '</div></div>';
    }

    // Quiz
    html += '<div class="container section">';
    html += '<div class="quiz-box">';
    html += '<h2><span data-en>📝 Week ' + WEEK + ' Knowledge Check</span><span data-ta>📝 வாரம் ' + WEEK + ' அறிவு சோதனை</span></h2>';
    html += '<p class="lede mt-2" style="margin:0 auto"><span data-en>Answer a few quick questions about what you learned this week. Enter your name and team — results are auto-marked instantly.</span><span data-ta>இந்த வாரம் நீங்கள் கற்றதைப் பற்றிய சில கேள்விகளுக்கு பதிலளிக்கவும். உங்கள் பெயர் மற்றும் குழுவை உள்ளிடவும் — முடிவுகள் உடனடியாக மதிப்பிடப்படும்.</span></p>';
    if (data.quizFormUrl) {
      html += '<iframe src="' + esc(data.quizFormUrl) + '" title="Week ' + WEEK + ' quiz">Loading quiz…</iframe>';
    } else {
      html += '<p class="muted mt-4"><span data-en>Quiz link not added yet — see /admin to attach the Google Form embed URL.</span><span data-ta>வினாடி வினா இணைப்பு இன்னும் சேர்க்கப்படவில்லை.</span></p>';
    }
    html += '</div></div>';

    root.innerHTML = html;

    // re-run reveal + lang observers for injected content
    document.dispatchEvent(new Event("DOMContentLoaded"));
    if (window.IX && window.IX.base) {
      var lang = localStorage.getItem("ix-lang") || "en";
      document.documentElement.setAttribute("lang", lang);
    }
  }
})();
