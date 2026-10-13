/* Nonu's Computer - Class III Study App
   Study mode, Quiz mode, 25-mark Mock Exam, read-aloud, progress & streaks. */
(function () {
  "use strict";

  var Q = window.QUESTIONS;
  var SEC = window.SECTIONS;
  var META = window.APP_META;

  var byId = {};
  Q.forEach(function (q) { byId[q.id] = q; });
  function sectionOf(id) { return SEC.filter(function (s) { return s.id === id; })[0]; }
  function qsIn(secId) { return Q.filter(function (q) { return q.section === secId; }); }

  /* ============================== STORAGE ============================== */
  var KEY = "nonuComputer.v1";
  var DEFAULTS = {
    name: "Nonu", tts: false, streak: 0, lastDay: null,
    tests: [], stats: {}, qstat: {}
  };
  var P = load();

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return JSON.parse(JSON.stringify(DEFAULTS));
      var o = JSON.parse(raw);
      Object.keys(DEFAULTS).forEach(function (k) { if (o[k] === undefined) o[k] = JSON.parse(JSON.stringify(DEFAULTS[k])); });
      return o;
    } catch (e) { return JSON.parse(JSON.stringify(DEFAULTS)); }
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(P)); } catch (e) {} }

  function today() { return new Date().toISOString().slice(0, 10); }
  function daysBetween(a, b) {
    return Math.round((new Date(b + "T00:00:00") - new Date(a + "T00:00:00")) / 86400000);
  }
  function bumpStreak() {
    var t = today();
    if (P.lastDay === t) return;
    P.streak = (P.lastDay && daysBetween(P.lastDay, t) === 1) ? P.streak + 1 : 1;
    P.lastDay = t;
  }

  /* ============================== HELPERS ============================== */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function norm(s) {
    return String(s || "").toLowerCase().replace(/[^\w\s.]/g, " ").replace(/\s+/g, " ").trim();
  }
  function checkFill(given, answer) {
    var g = norm(given), a = norm(answer);
    if (!g) return false;
    if (g === a) return true;
    if (g.replace(/\bthe\b/g, "").trim() === a.replace(/\bthe\b/g, "").trim()) return true;
    return Math.min(g.length, a.length) >= 3 && (g.indexOf(a) > -1 || a.indexOf(g) > -1);
  }
  function marksOf(q) { return q.marks || (sectionOf(q.section).marks || 1); }
  function kindOf(q) { return q.kind || sectionOf(q.section).type; }
  function isWritten(q) { var k = kindOf(q); return k === "short" || k === "brief" || k === "long"; }
  function qNum(q) { return (String(q.id).match(/(\d+)$/) || ["", ""])[1]; }
  function isAuto(q) { return !isWritten(q); }
  function fmtTime(s) { var m = Math.floor(s / 60), x = s % 60; return (m < 10 ? "0" + m : m) + ":" + (x < 10 ? "0" + x : x); }
  function fmtDate(iso) {
    var d = new Date(iso), t = today();
    if (iso === t) return "Today";
    if (iso === new Date(Date.now() - 864e5).toISOString().slice(0, 10)) return "Yesterday";
    return d.toLocaleDateString(undefined, { day: "numeric", month: "short" });
  }

  var toastTimer;
  function toast(msg) {
    var el = $("#toast"); el.textContent = msg; el.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { el.hidden = true; }, 2200);
  }

  /* ============================ READ ALOUD ============================ */
  var TTS = {
    voice: null,
    supported: typeof speechSynthesis !== "undefined",
    init: function () {
      if (!this.supported) return;
      var pick = function () {
        var vs = speechSynthesis.getVoices() || [];
        this.voice = vs.filter(function (v) { return /^en-IN/i.test(v.lang); })[0] ||
                     vs.filter(function (v) { return /^en/i.test(v.lang); })[0] || vs[0] || null;
      }.bind(this);
      pick();
      speechSynthesis.onvoiceschanged = pick;
    },
    speak: function (text) {
      if (!this.supported || !text) return;
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(String(text));
      if (this.voice) u.voice = this.voice;
      u.rate = 0.88; u.pitch = 1.05; u.lang = (this.voice && this.voice.lang) || "en-IN";
      speechSynthesis.speak(u);
    },
    queue: function (texts, gap) {
      if (!this.supported) { toast("Read aloud is not supported on this device."); return; }
      speechSynthesis.cancel();
      var i = 0, self = this;
      (function next() {
        if (i >= texts.length) return;
        var u = new SpeechSynthesisUtterance(texts[i++]);
        if (self.voice) u.voice = self.voice;
        u.rate = 0.88; u.pitch = 1.05; u.lang = (self.voice && self.voice.lang) || "en-IN";
        u.onend = function () { setTimeout(next, gap || 350); };
        speechSynthesis.speak(u);
      })();
      toast("Reading aloud...");
    },
    stop: function () { if (this.supported) speechSynthesis.cancel(); }
  };

  function syncTtsBtn() {
    var b = $("#ttsToggle");
    b.setAttribute("aria-pressed", P.tts ? "true" : "false");
    b.title = P.tts ? "Read aloud is ON" : "Read aloud is OFF";
  }

  /* ============================== ROUTER ============================== */
  var VIEWS = {
    home:         { title: "Nonu's Computer", sub: "Class III · Ch 2 & 3" },
    "study-setup":{ title: "Study Mode", sub: "Choose what to read" },
    study:        { title: "Study Mode", sub: "Questions & answers" },
    "quiz-setup": { title: "Quiz Mode", sub: "Set up your practice" },
    "paper-setup":{ title: "Mock Exam", sub: "25 marks · same as school paper" },
    quiz:         { title: "Quiz", sub: "" },
    results:      { title: "Your Results", sub: "" },
    progress:     { title: "My Progress", sub: "Scores & streaks" }
  };
  var current = "home";

  function go(name, opts) {
    current = name;
    Object.keys(VIEWS).forEach(function (k) { $("#view-" + k).hidden = (k !== name); });
    $("#barTitle").textContent = VIEWS[name].title;
    $("#barSub").textContent = VIEWS[name].sub;
    $("#backBtn").hidden = (name === "home");
    window.scrollTo(0, 0);
    TTS.stop();
    if (!(opts && opts.keepVoice)) TTS.stop();
  }

  /* =============================== HOME =============================== */
  function renderHome() {
    $("#heroName").textContent = P.name;
    $("#statQ").textContent = Q.length;
    var acc = overallStats();
    $("#statAcc").textContent = acc.total ? Math.round(acc.correct / acc.total * 100) + "%" : "-";
    $("#statTests").textContent = P.tests.length;
    $("#streakChip").hidden = !P.streak;
    $("#streakNum").textContent = P.streak;

    var wrap = $("#homeSections"); wrap.innerHTML = "";
    var h = document.createElement("h3"); h.className = "sub-title"; h.textContent = "Jump into a section";
    wrap.appendChild(h);

    var list = document.createElement("div"); list.className = "list";
    SEC.forEach(function (s) {
      var n = qsIn(s.id).length;
      var b = document.createElement("button");
      b.className = "row-card";
      b.innerHTML =
        '<span class="row-letter" style="background:' + colorOf(s.id) + '">' + letterOf(s) + '</span>' +
        '<span><b>' + esc(s.name) + '</b><small>' + esc(s.desc) + '</small></span>' +
        '<span class="count">' + n + ' Q</span>';
      b.onclick = function () { openStudy(qsIn(s.id), s.name); };
      list.appendChild(b);
    });
    wrap.appendChild(list);
    renderAbout();
  }

  function renderAbout() {
    var m = META;
    var body = $("#aboutBody");
    if (!body) return;
    body.innerHTML =
      '<p><b>' + esc(m.title) + "</b><br>" + esc(m.school) + "<br>" + esc(m.book) + " &middot; " + esc(m.session) + "</p>" +
      "<p class='muted'>Chapters covered</p>" +
      m.chapters.map(function (c) {
        var n = Q.filter(function (q) { return q.chapter === c.n; }).length;
        return '<div class="about-row"><span><b>Chapter ' + c.n + "</b> &middot; " + esc(c.name) + "</span><span>" + c.pages + " &middot; " + n + " Q</span></div>";
      }).join("") +
      '<p class="muted">' + esc(m.pattern) + "</p>" +
      '<div class="about-row"><span>Mock Exam total</span><span>' + m.totalMarks + " marks</span></div>";
    $("#footNote").textContent = "Every answer from the question bank is in this app \u00b7 " + Q.length + " questions.";
  }
  function colorOf(secId) {
    return { A: "#4f6bd6", B: "#2f9e7a", C: "#e2a03f", D: "#8a5cd6", E: "#d9648a", F: "#3aa0c9", P: "#d94f5c" }[secId] || "#4f6bd6";
  }
  function letterOf(s) { return s.id === "P" ? "P" : s.short.replace("Section ", ""); }

  /* ============================ STUDY MODE ============================ */
  var chaptersOn = { study: 0, quiz: 0 }; // 0 = all

  function renderStudySetup() {
    var chips = $("#studyChapterChips"); chips.innerHTML = "";
    [["0", "All chapters"], ["2", "Ch 2 · Windows 10"], ["3", "Ch 3 · MS Word"]].forEach(function (c) {
      var b = document.createElement("button");
      b.className = "chip" + (chaptersOn.study === c[0] ? " on" : "");
      b.textContent = c[1];
      b.onclick = function () { chaptersOn.study = c[0]; renderStudySetup(); };
      chips.appendChild(b);
    });

    var list = $("#studySectionList"); list.innerHTML = "";
    SEC.filter(function (s) { return s.id !== "P"; }).forEach(function (s) {
      var items = qsIn(s.id).filter(function (q) { return !chaptersOn.study || String(q.chapter) === chaptersOn.study; });
      if (!items.length) return;
      var b = document.createElement("button");
      b.className = "row-card";
      b.innerHTML =
        '<span class="row-letter" style="background:' + colorOf(s.id) + '">' + letterOf(s) + '</span>' +
        '<span><b>' + esc(s.name) + '</b><small>' + esc(s.desc) + '</small></span>' +
        '<span class="count">' + items.length + ' Q</span>';
      b.onclick = function () { openStudy(items, s.name); };
      list.appendChild(b);
    });
    if (!list.children.length) list.innerHTML = '<p class="empty">No questions in this chapter for that section.</p>';
  }

  function openStudy(items, title) {
    $("#studyTitle").textContent = title;
    var box = $("#studyList"); box.innerHTML = "";
    items.forEach(function (q, idx) {
      box.appendChild(studyCard(q, idx + 1, items.length));
    });
    go("study");
  }

  function studyCard(q, num, total) {
    var s = sectionOf(q.section);
    var card = document.createElement("article");
    card.className = "qa";
    card.style.borderTopColor = colorOf(q.section);

    var answerText = answerOf(q);
    var head =
      '<div class="qa-top"><span class="qa-num">' + esc(s.short) + ' · Q' + num + ' of ' + total +
      ' · Ch ' + q.chapter + '</span><span class="qa-tools">' +
      '<button class="mini-btn" data-speak="q" title="Read the question">&#128266;</button></span></div>';

    var body = "";
    if (q.options) {
      body = '<ul class="qa-opts">' + q.options.map(function (o, i) {
        var cls = i === q.a ? "correct" : "";
        return '<li class="' + cls + '"><span class="k">' + "abc"[i] + '</span><span>' + esc(o) + "</span></li>";
      }).join("") + "</ul>";
    }
    card.innerHTML = head +
      '<div class="qa-q">' + esc(q.q) + "</div>" + body +
      '<div class="qa-a' + (isWritten(q) ? " written" : "") + '">' + (isWritten(q) ? "Answer: " : "") + esc(answerText) + "</div>" +
      (q.note ? '<div class="qa-note">' + esc(q.note) + "</div>" : "") +
      '<div class="qa-btns"><button class="qa-speak" data-speak="all">&#128266; Read question &amp; answer</button></div>';

    card.querySelector('[data-speak="q"]').onclick = function () { TTS.speak(q.q); };
    card.querySelector('[data-speak="all"]').onclick = function () {
      TTS.queue([q.q, answerText].concat(q.note ? [q.note] : []));
    };
    return card;
  }

  function answerOf(q) {
    if (q.options) return q.options[q.a];
    if (q.a === true || q.a === false) return q.a ? "True" : "False";
    return q.a;
  }

  /* ============================ QUIZ SETUP ============================ */
  var quizCfg = { sections: { A: true, B: true, C: true, D: true, E: true, F: true }, n: 0, timer: 0, reveal: true, shuffle: true };

  function renderQuizSetup() {
    var ch = $("#quizChapterChips"); ch.innerHTML = "";
    [["0", "All"], ["2", "Ch 2"], ["3", "Ch 3"]].forEach(function (c) {
      var b = document.createElement("button");
      b.className = "chip" + (chaptersOn.quiz === c[0] ? " on" : "");
      b.textContent = c[1];
      b.onclick = function () { chaptersOn.quiz = c[0]; renderQuizSetup(); };
      ch.appendChild(b);
    });

    var sc = $("#quizSectionChips"); sc.innerHTML = "";
    SEC.forEach(function (s) {
      var n = qsIn(s.id).filter(function (q) { return !chaptersOn.quiz || String(q.chapter) === chaptersOn.quiz; }).length;
      var b = document.createElement("button");
      b.className = "chip" + (quizCfg.sections[s.id] ? " on" : "");
      b.textContent = s.short + " (" + n + ")";
      b.onclick = function () {
        var on = Object.keys(quizCfg.sections).filter(function (k) { return quizCfg.sections[k]; });
        if (quizCfg.sections[s.id] && on.length === 1) { toast("Keep at least one section."); return; }
        quizCfg.sections[s.id] = !quizCfg.sections[s.id];
        renderQuizSetup();
      };
      sc.appendChild(b);
    });

    $("#quizReveal").checked = quizCfg.reveal;
    $("#quizShuffle").checked = quizCfg.shuffle;
    updateQuizSummary();
  }

  function buildQuizList() {
    var list = [];
    Object.keys(quizCfg.sections).forEach(function (sid) {
      if (!quizCfg.sections[sid]) return;
      list = list.concat(qsIn(sid).filter(function (q) { return !chaptersOn.quiz || String(q.chapter) === chaptersOn.quiz; }));
    });
    if (quizCfg.shuffle) list = shuffle(list);
    if (quizCfg.n) list = list.slice(0, quizCfg.n);
    return list;
  }

  function updateQuizSummary() {
    var on = Object.keys(quizCfg.sections).filter(function (k) { return quizCfg.sections[k]; });
    $("#quizSectionCount").textContent = "(" + on.length + " selected)";
    var n = buildQuizList().length;
    $("#quizSummary").textContent = n ? n + " questions ready · about " + Math.max(2, Math.round(n * 0.5)) + " minutes" : "Choose at least one section with questions.";
    $("#startQuizBtn").disabled = !n;
  }

  /* ========================== MOCK EXAM SETUP ========================== */
  function renderPaperSetup() {
    var box = $("#paperMap"); box.innerHTML = "";
    var parts = { I: ["Choose the correct answer", "5 × 1 = 5"], II: ["Fill in the blanks", "5 × 1 = 5"], III: ["True or False", "5 × 1 = 5"], IV: ["Answer in one word", "5 × 1 = 5"], V: ["Answer the following", "2 + 3 = 5"] };
    Object.keys(parts).forEach(function (k) {
      box.innerHTML += '<div><span>Part ' + k + " — " + parts[k][0] + "</span><span>" + parts[k][1] + "</span></div>";
    });
    box.innerHTML += '<div><span>Total</span><span>25 marks</span></div>';
  }

  /* ============================== QUIZ RUN ============================== */
  var quiz = null, tick = null;

  function startQuiz(list, cfg) {
    quiz = {
      list: list, i: 0, answers: {}, cfg: cfg,
      seconds: cfg.timer || 0, ended: false, name: cfg.name || "Practice Quiz"
    };
    renderQuestion();
    go("quiz");
    if (quiz.seconds) {
      tick = setInterval(function () {
        quiz.seconds--;
        paintTimer();
        if (quiz.seconds <= 0) { clearInterval(tick); tick = null; toast("Time is over!"); finishQuiz(); }
      }, 1000);
    }
    paintTimer();
  }

  function paintTimer() {
    var box = $("#quizTimerBox");
    if (!quiz || !quiz.seconds) { box.hidden = true; return; }
    box.hidden = false;
    box.textContent = "\u23F1 " + fmtTime(quiz.seconds);
    box.classList.toggle("low", quiz.seconds <= 30);
  }

  function renderQuestion() {
    var q = quiz.list[quiz.i];
    if (!q) return;
    var s = sectionOf(q.section);
    var ans = quiz.answers[q.id];
    var revealed = !!(ans && ans.locked);

    $("#quizPos").textContent = (quiz.i + 1) + " / " + quiz.list.length;
    $("#qpFill").style.width = ((quiz.i) / quiz.list.length * 100) + "%";

    var tag = $("#quizSectionTag");
    if (quiz.list[0].section === "P") {
      tag.textContent = "Part " + (q.part || "") + " · " + ({
        I: "Choose the correct answer", II: "Fill in the blanks", III: "True or False",
        IV: "Answer in one word", V: "Answer the following"
      }[q.part] || "");
    } else {
      tag.textContent = s.short + " · " + s.name;
    }
    tag.style.background = colorOf(q.section);
    $("#quizMarksTag").textContent = marksOf(q) + (marksOf(q) > 1 ? " marks" : " mark");

    var html = '<div class="qc-q">' + esc(q.q) + "</div>";

    if (q.options) {
      html += '<div class="opts">' + q.options.map(function (o, i) {
        var cls = "opt" + (o.length > 26 ? " full" : "");
        if (revealed) {
          if (i === q.a) cls += " ok";
          else if (ans.value === i) cls += " no";
          cls += " locked";
        } else if (ans && ans.value === i) cls += " sel";
        return '<button class="' + cls + '" data-o="' + i + '"><span class="k">' + "abc"[i] + "</span><span>" + esc(o) + "</span></button>";
      }).join("") + "</div>";
    } else if (q.a === true || q.a === false) {
      html += '<div class="tf-row">' +
        '<button class="tf-btn' + (revealed ? (q.a === true ? " ok" : "") : (ans && ans.value === true ? " sel" : "")) + '" data-t="1">&#10003;<small>TRUE</small></button>' +
        '<button class="tf-btn' + (revealed ? (q.a === false ? " ok" : "") : (ans && ans.value === false ? " sel" : "")) + '" data-t="0">&#10007;<small>FALSE</small></button>' +
        "</div>";
    } else if (kindOf(q) === "fill") {
      var v = ans ? ans.value : "";
      html += '<div class="fill-in"><input id="fillInput" type="text" inputmode="text" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="Type the answer..." value="' + esc(v) + '"' + (revealed ? " disabled" : "") + ">" +
        '<button class="btn btn-primary" id="fillCheck"' + (revealed ? " disabled" : "") + ">Check</button></div>";
    } else {
      /* written answer: think on paper, then self-mark */
      html += '<p class="muted center">Write your answer on paper first, then check yourself.</p>' +
        '<button class="btn btn-ghost wide" id="revealBtn">' + (revealed ? "Hide the answer" : "Show the answer") + "</button>";
      if (revealed) {
        html += '<div class="qa-a written" style="margin-top:.7rem">' + esc(answerOf(q)) + "</div>" +
          (q.note ? '<div class="qa-note">' + esc(q.note) + "</div>" : "");
        html += (ans && ans.self)
          ? '<div class="feedback ' + (ans.correct ? "ok" : "no") + '"><b>' +
            (ans.correct ? "\u2714 Well done!" : "\ud83d\udcda Revise this one from the book") + "</b></div>"
          : '<div class="self-mark" id="selfMark">' +
            '<button class="self-btn ok" data-s="ok">&#10003;<br>I got it right</button>' +
            '<button class="self-btn no" data-s="no">&#128218;<br>Need to revise</button></div>';
      }
    }

    if (revealed && !isWritten(q)) html += feedbackHtml(q, ans);

    var card = $("#quizCard");
    card.innerHTML = html;
    card.style.borderTopColor = colorOf(q.section);

    wireQuestion(q, revealed);

    $("#prevQ").disabled = quiz.i === 0;
    $("#nextQ").textContent = (quiz.i === quiz.list.length - 1) ? "Finish \u2713" : "Next \u00BB";

    if (P.tts) TTS.speak("Question " + (quiz.i + 1) + ". " + q.q);
  }

  function feedbackHtml(q, ans) {
    var ok = ans.correct;
    return '<div class="feedback ' + (ok ? "ok" : "no") + '"><b>' + (ok ? "\u2714 Correct! " : "\u2718 Not quite. ") + "</b>" +
      (ok ? "" : "The right answer is <u>" + esc(answerOf(q)) + "</u>. ") +
      (q.note ? '<div class="why">' + esc(q.note) + "</div>" : "") + "</div>";
  }

  function wireQuestion(q, revealed) {
    var card = $("#quizCard");

    $$(".opt", card).forEach(function (b) {
      b.onclick = function () {
        if (revealed) return;
        var i = +b.dataset.o;
        setAnswer(q, i, i === q.a);
        if (quiz.cfg.reveal) renderQuestion(); else nextQ();
      };
    });

    $$(".tf-btn", card).forEach(function (b) {
      b.onclick = function () {
        if (revealed) return;
        var v = b.dataset.t === "1";
        setAnswer(q, v, v === q.a);
        if (quiz.cfg.reveal) renderQuestion(); else nextQ();
      };
    });

    var input = $("#fillInput", card);
    if (input && !revealed) {
      var check = $("#fillCheck", card);
      var doCheck = function () {
        var v = input.value.trim();
        if (!v) { toast("Type an answer first."); input.focus(); return; }
        setAnswer(q, v, checkFill(v, q.a));
        renderQuestion();
      };
      check.onclick = doCheck;
      input.onkeydown = function (e) { if (e.key === "Enter") doCheck(); };
      setTimeout(function () { input.focus(); }, 30);
    }

    var rev = $("#revealBtn", card);
    if (rev) {
      rev.onclick = function () {
        if (!quiz.answers[q.id]) quiz.answers[q.id] = { value: "", correct: false, locked: false, self: false, given: false };
        quiz.answers[q.id].locked = !quiz.answers[q.id].locked;
        renderQuestion();
      };
    }

    var mark = $("#selfMark", card);
    if (mark) {
      $$(".self-btn", card).forEach(function (b) {
        b.onclick = function () {
          var a = quiz.answers[q.id];
          a.correct = b.dataset.s === "ok";
          a.self = true;
          a.given = true;
          renderQuestion();
        };
      });
    }
  }

  function setAnswer(q, value, correct) {
    quiz.answers[q.id] = { value: value, correct: correct, locked: true, self: false, given: true };
    if (quiz.cfg.reveal) bumpStreak();
  }

  function nextQ() {
    var q = quiz.list[quiz.i];
    var a = q && quiz.answers[q.id];
    if (isWritten(q) && a && a.locked && !a.self) toast("Mark your answer before moving on.");
    if (quiz.i >= quiz.list.length - 1) { finishQuiz(); return; }
    quiz.i++; renderQuestion();
  }

  /* ============================ FINISH / SCORE ============================ */
  function finishQuiz() {
    if (quiz.ended) return;
    quiz.ended = true;
    if (tick) { clearInterval(tick); tick = null; }
    TTS.stop();

    var res = quiz.list.map(function (q) {
      var a = quiz.answers[q.id];
      var given = !!(a && a.given);
      var locked = !!(a && a.locked);
      return {
        q: q,
        answered: given,
        correct: !!(a && a.correct),
        needsReview: !given || !a.correct,
        your: a ? a.value : null
      };
    });

    var got = 0, tot = 0;
    res.forEach(function (r) { tot += marksOf(r.q); if (r.correct) got += marksOf(r.q); });

    // record progress
    quiz.list.forEach(function (q) {
      var a = quiz.answers[q.id];
      if (!a || !a.given) return;
      var st = P.qstat[q.id] || { t: 0, w: 0 };
      st.t++; if (!a.correct) st.w++;
      P.qstat[q.id] = st;
      var sec = P.stats[q.section] || { c: 0, t: 0 };
      sec.t++; if (a.correct) sec.c++;
      P.stats[q.section] = sec;
    });
    bumpStreak();
    P.tests.push({
      d: today(), name: quiz.name, correct: res.filter(function (r) { return r.correct; }).length,
      total: res.length, marks: got + "/" + tot
    });
    if (P.tests.length > 60) P.tests = P.tests.slice(-60);
    save();

    showResults(res, got, tot);
    go("results");
  }

  function showResults(res, got, tot) {
    var pct = tot ? Math.round(got / tot * 100) : 0;
    $("#scorePct").textContent = pct + "%";
    $("#scoreRaw").textContent = got + " / " + tot + " marks";
    $("#scoreRing").style.setProperty("--p", pct + "%");
    $("#starsMsg").textContent =
      pct === 100 ? "Perfect! Full marks! \u2b50\u2b50\u2b50" :
      pct >= 80 ? "Excellent work! \u2b50\u2b50\u2b50" :
      pct >= 60 ? "Good job, keep going! \u2b50\u2b50" :
      pct >= 40 ? "Nice try. Revise and retry. \u2b50" : "Let's study a little more. \ud83d\udcaa";
    var todo = res.filter(function (r) { return r.needsReview; }).length;
    $("#marksMsg").textContent = "You got " + got + " out of " + tot + " marks. " +
      (todo ? todo + (todo === 1 ? " question" : " questions") + " to revise." : "Nothing to revise.");

    // section bars
    var bysec = {};
    res.forEach(function (r) {
      var k = r.q.section;
      bysec[k] = bysec[k] || { c: 0, t: 0 };
      bysec[k].t += 1; if (r.correct) bysec[k].c += 1;
    });
    $("#resultBars").innerHTML = Object.keys(bysec).map(function (k) {
      var s = sectionOf(k), b = bysec[k], p = Math.round(b.c / b.t * 100);
      return '<div class="bar-row"><b>' + esc(s.name) + " — " + b.c + "/" + b.t + "</b>" +
        '<div class="bar-track"><div class="bar-fill ' + clsOf(p) + '" style="width:' + p + '%"></div></div></div>';
    }).join("");

    // review
    var rl = $("#reviewList"); rl.innerHTML = "";
    res.forEach(function (r) {
      var q = r.q, s = sectionOf(q.section);
      var div = document.createElement("div");
      div.className = "rev " + (r.correct ? "ok" : "no");
      var your = !r.answered ? "Not answered" :
        (q.options ? "abc"[r.your] + ") " + q.options[r.your] :
         (q.a === true || q.a === false ? (r.your ? "True" : "False") : "\u201c" + esc(r.your) + "\u201d"));
      div.innerHTML =
        '<div class="rev-h"><span>' + esc(s.short) + " · Q" + qNum(q) + "</span><span>" +
        (r.correct ? "\u2714 Correct" : (r.answered ? "\u2718 Wrong" : "\u2013 Skipped")) + "</span></div>" +
        '<div class="rev-q">' + esc(q.q) + "</div>" +
        (r.correct && r.answered ? "" : '<div class="rev-line mine ' + (r.answered ? "bad" : "") + '">Your answer: ' + esc(your) + "</div>") +
        '<div class="rev-line right">Right answer: ' + esc(answerOf(q)) + "</div>" +
        (q.note ? '<div class="rev-note">' + esc(q.note) + "</div>" : "") +
        '<div class="qa-btns"><button class="qa-speak" data-speak>Read aloud</button></div>';
      div.querySelector("[data-speak]").onclick = function () { TTS.queue([q.q, answerOf(q)].concat(q.note ? [q.note] : [])); };
      rl.appendChild(div);
    });
  }

  function clsOf(p) { return p >= 80 ? "high" : p >= 50 ? "mid" : "low"; }

  /* ============================== PROGRESS ============================== */
  function overallStats() {
    var c = 0, t = 0;
    Object.keys(P.stats).forEach(function (k) { c += P.stats[k].c; t += P.stats[k].t; });
    return { correct: c, total: t };
  }

  function renderProgress() {
    var o = overallStats();
    var acc = o.total ? Math.round(o.correct / o.total * 100) : 0;
    var best = P.tests.length ? Math.max.apply(null, P.tests.map(function (t) { return Math.round(parseFloat(t.marks) / (+t.marks.split("/")[1] || 1) * 100); })) : 0;

    $("#progTiles").innerHTML =
      tile(P.tests.length, "Tests completed") + tile(o.total, "Questions answered") +
      tile(o.total ? acc + "%" : "-", "Overall accuracy") +
      tile(P.streak + (P.streak === 1 ? " day" : " days"), "Current streak") +
      tile((best || 0) + "%", "Best score") + tile(Q.length, "Questions in bank");

    $("#progBars").innerHTML = SEC.filter(function (s) { return P.stats[s.id]; }).map(function (s) {
      var v = P.stats[s.id], p = v.t ? Math.round(v.c / v.t * 100) : 0;
      return '<div class="bar-row"><b>' + esc(s.name) + " — " + v.c + "/" + v.t + "</b>" +
        '<div class="bar-track"><div class="bar-fill ' + clsOf(p) + '" style="width:' + p + '%"></div></div>' +
        "<small>" + (v.t === 0 ? "not attempted yet" : p + "% correct") + "</small></div>";
    }).join("") || '<p class="empty">No tests yet. Try a Quiz!</p>';

    var hist = P.tests.slice(-10).reverse();
    $("#progHistory").innerHTML = hist.map(function (t) {
      var tot = +t.marks.split("/")[1] || 1;
      var p = Math.round(parseFloat(t.marks) / tot * 100);
      return '<div class="hist"><span class="h-dot ' + clsOf(p) + '"></span>' +
        '<span class="h-name">' + esc(t.name) + " · " + fmtDate(t.d) + "</span>" +
        '<span class="h-val">' + t.marks + "</span></div>";
    }).join("") || '<p class="empty">Your last 10 tests will show up here.</p>';

    var weak = Object.keys(P.qstat)
      .map(function (id) { return { id: id, m: P.qstat[id].w, t: P.qstat[id].t }; })
      .filter(function (x) { return x.m > 0; })
      .sort(function (a, b) { return b.m - a.m; }).slice(0, 8);

    $("#weakList").innerHTML = weak.map(function (x) {
      var q = byId[x.id];
      var times = x.m === 1 ? "once" : x.m + " times";
      return '<div class="weak"><b>' + esc(q.q) + "</b><small>Missed " + times + " · answer: " + esc(answerOf(q)) + "</small></div>";
    }).join("") || '<p class="empty">Nothing yet — no repeat mistakes. \u2714</p>';

    $("#streakChip").hidden = !P.streak;
    $("#streakNum").textContent = P.streak;
  }

  function tile(v, label) { return '<div class="tile"><b>' + esc(String(v)) + "</b><small>" + esc(label) + "</small></div>"; }

  /* =============================== EVENTS =============================== */
  function init() {
    TTS.init();
    syncTtsBtn();

    /* PWA manifest only over http(s) - file:// cannot load it */
    if (location.protocol === "http:" || location.protocol === "https:") {
      var link = document.createElement("link");
      link.rel = "manifest";
      link.href = "manifest.webmanifest";
      document.head.appendChild(link);
    }

    renderHome(); renderStudySetup(); renderQuizSetup(); renderPaperSetup(); renderProgress();

    $("#backBtn").onclick = function () {
      if (current === "results") { go("home"); renderHome(); }
      else if (current === "study") { go("study-setup"); renderStudySetup(); }
      else if (current === "quiz") { if (confirm("Leave this test? Your answers will be lost.")) { if (tick) clearInterval(tick); quiz = null; go("quiz-setup"); renderQuizSetup(); } }
      else if (current === "quiz-setup") { go("home"); renderHome(); }
      else if (current === "paper-setup") { go("home"); renderHome(); }
      else if (current === "study-setup") { go("home"); renderHome(); }
      else { go("home"); renderHome(); }
    };

    $$("[data-go]").forEach(function (b) {
      b.onclick = function () {
        var t = b.dataset.go;
        if (t === "study-setup") { renderStudySetup(); go("study-setup"); }
        else if (t === "quiz-setup") { renderQuizSetup(); go("quiz-setup"); }
        else if (t === "paper-setup") { renderPaperSetup(); go("paper-setup"); }
        else if (t === "progress") { renderProgress(); go("progress"); }
      };
    });

    $("#ttsToggle").onclick = function () {
      P.tts = !P.tts; save(); syncTtsBtn();
      if (P.tts) { toast("Read aloud is ON"); TTS.speak("Read aloud is on."); } else { TTS.stop(); toast("Read aloud is OFF"); }
    };

    $("#stopBtn").onclick = function () { TTS.stop(); toast("Stopped."); };
    $("#speakAllBtn").onclick = function () {
      var texts = [];
      $$("#studyList .qa").forEach(function (card) {
        texts.push($(".qa-q", card).textContent, $(".qa-a", card).textContent.replace(/^Answer:\s*/, ""));
      });
      TTS.queue(texts, 500);
    };

    // quiz setup controls
    $$("#quizCount button").forEach(function (b) {
      b.onclick = function () {
        $$("#quizCount button").forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on"); quizCfg.n = +b.dataset.n; updateQuizSummary();
      };
    });
    $$("#quizTimer button").forEach(function (b) {
      b.onclick = function () {
        $$("#quizTimer button").forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on"); quizCfg.timer = +b.dataset.t;
      };
    });
    $$("#paperTimer button").forEach(function (b) {
      b.onclick = function () {
        $$("#paperTimer button").forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on");
      };
    });
    $("#quizReveal").onchange = function () { quizCfg.reveal = this.checked; };
    $("#quizShuffle").onchange = function () { quizCfg.shuffle = this.checked; updateQuizSummary(); };
    $("#startQuizBtn").onclick = function () {
      var list = buildQuizList();
      if (!list.length) return;
      quizCfg.name = "Quiz";
      startQuiz(list, quizCfg);
    };

    $("#startPaperBtn").onclick = function () {
      var t = 0;
      $$("#paperTimer button").forEach(function (x) { if (x.classList.contains("on")) t = +x.dataset.t; });
      var reveal = $("#paperReveal").checked;
      startQuiz(qsIn("P"), { timer: t, reveal: reveal, shuffle: false, sections: { P: true }, name: "Mock Exam (25 marks)" });
    };

    $("#nextQ").onclick = nextQ;
    $("#prevQ").onclick = function () { if (quiz.i > 0) { quiz.i--; renderQuestion(); } };

    $("#retryBtn").onclick = function () {
      if (!quiz) { go("home"); renderHome(); return; }
      var list = quiz.cfg.shuffle ? shuffle(quiz.list) : quiz.list;
      startQuiz(list, quiz.cfg);
    };
    $("#studyWrongBtn").onclick = function () {
      var items = [];
      if (quiz) quiz.list.forEach(function (q) {
        var a = quiz.answers[q.id];
        if (!a || !a.correct) items.push(q);
      });
      if (!items.length) { toast("Nothing to revise - full marks!"); return; }
      openStudy(items, "Revise: " + items.length + (items.length === 1 ? " question" : " questions"));
    };
    $("#homeBtn").onclick = function () { renderHome(); go("home"); };

    $("#resetBtn").onclick = function () {
      if (!confirm("Delete all scores, streaks and history?")) return;
      P = JSON.parse(JSON.stringify(DEFAULTS)); P.name = "Nonu";
      save(); renderProgress(); renderHome(); toast("Progress reset.");
    };

    document.addEventListener("visibilitychange", function () { if (document.hidden) TTS.stop(); });
    window.addEventListener("beforeunload", function () { TTS.stop(); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();