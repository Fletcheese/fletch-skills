/* ask-me-artifact reference app.
 *
 * Two documents, and the page owns exactly one of them:
 *   questions/<slug>  written by Claude with ArtifactData set, read here, NEVER written here
 *   answers/<slug>    created and written here, read by Claude with ArtifactData get, NEVER
 *                     written by Claude
 *
 * The page never calls set() on an existing document and never writes on load.
 * Either one wipes answers.
 */

const SLUG = "__SLUG__";
const TITLE = "__TITLE__";

/* The complete document republished on Submit. This is the doorbell: a republish
 * wakes the session watching this artifact. It carries no answers, because every
 * answer lives in db, and no logic, because the logic lives in app.js, a supporting
 * file that survives the republish. Keep it in step with page.html, in the skeleton
 * shape the Artifact tool publishes so a later tool publish replaces it cleanly. */
const SHELL =
  '<!doctype html><html><head><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover">' +
  "<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style></head><body>" +
  "<title>" + TITLE + '</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n<link rel="stylesheet" href="app.css">\n<div id="root"></div>\n<script src="app.js"></script>' +
  "</body></html>";

const root = document.getElementById("root");
const ANSWERS = "answers/" + SLUG;

let db = null;
let artifact = null;
let spec = null;
let answers = {};
let statusEl = null;
let submitEl = null;

const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const now = () => new Date().toISOString();
const cssEsc = (s) => String(s).replace(/["\\]/g, "\\$&");

function setStatus(text, cls) {
  if (!statusEl) return;
  statusEl.textContent = text;
  statusEl.className = "status" + (cls ? " " + cls : "");
}

boot();

async function boot() {
  root.innerHTML = '<p class="status">Loading the questions.</p>';

  db = await claude.use("db");
  artifact = await claude.use("artifact");

  if (!db) {
    root.innerHTML =
      '<div class="banner warn"><strong>This page cannot reach its database.</strong><br>' +
      "Nothing you typed here would be saved, so the form is not being shown. Reload, or answer in chat instead.</div>";
    return;
  }

  try {
    const snap = await db.doc("questions/" + SLUG).get();
    spec = snap.exists ? snap.data() : null;
  } catch (e) {
    spec = null;
  }

  if (!spec || !Array.isArray(spec.sections)) {
    root.innerHTML = '<div class="banner warn">The questions have not been written to this page yet, so there is nothing to answer.</div>';
    return;
  }

  /* One subscription, set up once, never inside render. */
  db.doc(ANSWERS).onSnapshot(
    (snap) => {
      answers = snap.exists ? snap.data() : {};
      if (!document.querySelector(".q")) render();
      else syncFromAnswers();
    },
    () => setStatus("Lost the live connection. Reload before answering more.", "warn")
  );

  render();
}

/* ---- writes -------------------------------------------------------------
 * One write at a time per document, so every write goes through this chain.
 * update() rejects invalid_argument when the document does not exist, so the
 * first write creates it. That set() is safe only because it can only ever run
 * when there is nothing in the document to lose. */

let chain = Promise.resolve();

function queueWrite(patch) {
  chain = chain.then(async () => {
    try {
      await db.doc(ANSWERS).update(patch);
    } catch (e) {
      if (e && e.code === "invalid_argument") {
        const snap = await db.doc(ANSWERS).get();
        if (!snap.exists) {
          await db.doc(ANSWERS).set(Object.assign({ createdAt: now() }, patch));
          return;
        }
      }
      throw e;
    }
  });
  return chain;
}

function render() {
  const s = spec;
  const parts = [];

  if (answers.submittedAt) {
    parts.push('<div class="banner"><strong>Submitted ' + esc(fmt(answers.submittedAt)) + ".</strong><br>The session that built this page has been notified. You can still change any answer below and submit again.</div>");
  }

  parts.push("<h1>" + esc(s.title || TITLE) + "</h1>");
  if (s.ask) parts.push('<div class="ask"><strong>The ask</strong>' + esc(s.ask) + "</div>");
  if (s.summary) parts.push('<p class="summary">' + esc(s.summary) + "</p>");

  if (Array.isArray(s.findings) && s.findings.length) {
    parts.push('<ol class="findings">' + s.findings.map((f) => "<li>" + esc(f) + "</li>").join("") + "</ol>");
  }
  if (s.boundary) parts.push('<p class="boundary">' + esc(s.boundary) + "</p>");

  s.sections.forEach((sec) => {
    if (sec.heading) parts.push("<h2>" + esc(sec.heading) + "</h2>");
    (sec.questions || []).forEach((q) => parts.push(questionHtml(q)));
  });

  parts.push('<div class="submit-bar"><button class="submit" id="submit">Submit answers</button><span class="status" id="status"></span></div>');

  root.innerHTML = parts.join("");
  statusEl = document.getElementById("status");
  submitEl = document.getElementById("submit");

  wire();
  syncFromAnswers();

  if (!artifact) {
    submitEl.disabled = true;
    setStatus("Answers are saving, but this view cannot notify the session. Say so in chat when you are done.", "warn");
  } else {
    setStatus("Answers save as you go.");
  }
}

/* Figures: what each choice looks like. modes:
 *   wide    full column width (default)
 *   phone   a phone screenshot, shown at most 375 CSS px wide
 *   crop    a fixed-height crop (item.height, default 160 px), cover, at most 540 px wide
 *   native  the image at its own CSS width (or item.width), scrolling sideways inside its box */
function figuresHtml(groups) {
  if (!Array.isArray(groups)) return "";
  return groups
    .map((g) => {
      const items = (g.items || [])
        .map((it) => {
          const mode = it.mode || "wide";
          const img = '<img src="' + esc(it.src) + '" alt="' + esc(it.alt || it.caption || "") + '" loading="lazy" decoding="async"' + (it.width ? ' style="width:' + Number(it.width) + 'px;max-width:none"' : "") + ">";
          const frame =
            mode === "crop" ? '<div class="fig-crop" style="height:' + (Number(it.height) || 160) + 'px">' + img + "</div>"
            : mode === "native" ? '<div class="fig-native">' + img + "</div>"
            : img;
          return '<figure class="fig fig-' + esc(mode) + '">' + frame + (it.caption ? "<figcaption>" + esc(it.caption) + "</figcaption>" : "") + "</figure>";
        })
        .join("");
      return '<div class="figs' + (g.cols === 2 ? " figs-2" : "") + '">' + (g.label ? '<p class="figs-label">' + esc(g.label) + "</p>" : "") + '<div class="figs-row">' + items + "</div></div>";
    })
    .join("");
}

function questionHtml(q) {
  if (q.type === "text") {
    return (
      '<div class="q" data-qid="' + esc(q.id) + '">' +
      '<p class="q-title">' + esc(q.title) + "</p>" +
      (q.body ? '<p class="q-body">' + esc(q.body) + "</p>" : "") +
      '<label class="note-label" for="note-' + esc(q.id) + '">Optional.</label>' +
      '<textarea id="note-' + esc(q.id) + '" class="tall" data-field="note" data-q="' + esc(q.id) + '"></textarea></div>'
    );
  }
  const type = q.type === "checkbox" ? "checkbox" : "radio";
  const opts = (q.options || []).map((o) => {
    const rec = o.recommended ? ' <span class="rec-tag">recommended</span>' : "";
    return (
      '<label class="opt' + (o.recommended ? " recommended" : "") + '">' +
      '<input type="' + type + '" name="' + esc(q.id) + '" value="' + esc(o.value) + '" data-q="' + esc(q.id) + '">' +
      '<span class="opt-label">' + esc(o.label) + rec + "</span></label>"
    );
  });

  if (type === "radio" && q.allowOther !== false) {
    opts.push(
      '<label class="opt"><input type="radio" name="' + esc(q.id) + '" value="__other__" data-q="' + esc(q.id) + '">' +
        '<span class="opt-label">Other, described below</span></label>' +
        '<div class="other-box" data-other-for="' + esc(q.id) + '" hidden>' +
        '<textarea data-field="other" data-q="' + esc(q.id) + '" placeholder="What should happen instead?"></textarea></div>'
    );
  }

  return (
    '<div class="q" data-qid="' + esc(q.id) + '">' +
    '<p class="q-title">' + esc(q.title) + "</p>" +
    (q.body ? '<p class="q-body">' + esc(q.body) + "</p>" : "") +
    (q.why ? '<p class="q-why">Why this matters: ' + esc(q.why) + "</p>" : "") +
    figuresHtml(q.figures) +
    (q.tradeoff ? '<p class="q-tradeoff">' + esc(q.tradeoff) + "</p>" : "") +
    opts.join("") +
    '<label class="note-label" for="note-' + esc(q.id) + '">Anything that should shape this answer? Optional, and read even when an option is selected.</label>' +
    '<textarea id="note-' + esc(q.id) + '" data-field="note" data-q="' + esc(q.id) + '"></textarea></div>'
  );
}

function wire() {
  root.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach((el) => {
    el.addEventListener("change", () => {
      toggleOther(el.dataset.q);
      saveQuestion(el.dataset.q);
    });
  });

  const timers = {};
  root.querySelectorAll("textarea").forEach((el) => {
    el.addEventListener("input", () => {
      const qid = el.dataset.q;
      clearTimeout(timers[qid]);
      timers[qid] = setTimeout(() => saveQuestion(qid), 600);
    });
  });

  submitEl.addEventListener("click", submit);
}

function readQuestion(qid) {
  const box = root.querySelector('.q[data-qid="' + cssEsc(qid) + '"]');
  if (!box) return null;
  const checked = [...box.querySelectorAll("input:checked")].map((i) => i.value);
  const other = box.querySelector('textarea[data-field="other"]');
  const note = box.querySelector('textarea[data-field="note"]');
  const rec = { at: now() };
  if (box.querySelector('input[type="checkbox"]')) rec.choices = checked;
  else rec.choice = checked[0] || "";
  rec.other = other ? other.value.trim() : "";
  rec.note = note ? note.value.trim() : "";
  return rec;
}

/* Only ever this one question's field. A set() over the whole document would take
 * every other answer with it. */
function saveQuestion(qid) {
  const rec = readQuestion(qid);
  if (!rec || !db) return;
  setStatus("Saving.");
  queueWrite({ [qid]: rec })
    .then(() => setStatus("Saved " + fmt(now()) + ".", "ok"))
    .catch(() => setStatus("That answer did not save. Change it again to retry.", "warn"));
}

function syncFromAnswers() {
  Object.keys(answers).forEach((qid) => {
    if (qid === "submittedAt" || qid === "createdAt") return;
    const rec = answers[qid] || {};
    const box = root.querySelector('.q[data-qid="' + cssEsc(qid) + '"]');
    if (!box) return;
    const picked = rec.choices || (rec.choice ? [rec.choice] : []);
    box.querySelectorAll("input").forEach((i) => {
      const want = picked.indexOf(i.value) !== -1;
      if (i.checked !== want) i.checked = want;
    });
    ["other", "note"].forEach((field) => {
      const el = box.querySelector('textarea[data-field="' + field + '"]');
      if (el && document.activeElement !== el && rec[field] != null && el.value !== rec[field]) el.value = rec[field];
    });
    toggleOther(qid);
  });
}

function toggleOther(qid) {
  const box = root.querySelector('.q[data-qid="' + cssEsc(qid) + '"]');
  if (!box) return;
  const wrap = box.querySelector("[data-other-for]");
  if (wrap) wrap.hidden = !box.querySelector('input[value="__other__"]:checked');
}

async function submit() {
  submitEl.disabled = true;
  setStatus("Submitting.");

  try {
    await queueWrite({ submittedAt: now() });
  } catch (e) {
    setStatus("Could not record the submission. Nothing was lost, try again.", "warn");
    submitEl.disabled = false;
    return;
  }

  if (!artifact) {
    setStatus("Answers saved. This view cannot notify the session, so say so in chat.", "warn");
    submitEl.disabled = false;
    return;
  }

  try {
    await artifact.publish(SHELL);
    setStatus("Submitted. The session that built this page has been notified.", "ok");
  } catch (e) {
    if (e && e.code === "conflict") setStatus("Submitted. Your answers are saved.", "ok");
    else setStatus("Answers saved, but the notification did not go through. Say so in chat.", "warn");
  }
  submitEl.disabled = false;
}

function fmt(iso) {
  try {
    return new Date(iso).toLocaleString(undefined, { hour: "2-digit", minute: "2-digit", day: "numeric", month: "short" });
  } catch (e) {
    return iso;
  }
}
