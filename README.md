# Nonu's Computer - Class III Study App

A study + practice app for **Class III Computer, Half-Yearly exam (Chapters 2 & 3)** —
Chapter 2 *Introduction to GUI Operating System (Windows 10)* and Chapter 3 *Microsoft Word*.
Nirmal Hrudaya E.M. School (ICSE) · KIPS Logix 2.0 · Session 2026-27.

**All 116 questions with answers** are in the app: 6 sections + the full 25-mark practice paper.

## What it does

| Mode | What it is |
|---|---|
| **Study Mode** | Reads questions and answers slowly, section by section or chapter by chapter. Big text, tap the 🔊 button to hear any card read out loud. |
| **Quiz Mode** | Pick any mix of sections, 10 / 20 / 30 / all questions, shuffle on/off, timer on/off. Answers are marked instantly and every wrong answer shows the reason. |
| **Mock Exam** | The real 25-mark paper in 5 parts (I–V), same pattern as the school's mid-semester paper. Optional 15/30-minute timer. Turn "show answers" off to sit a proper exam on paper. |
| **My Progress** | Scores, per-section accuracy bars, daily 🔥 streak, last 10 tests, and the questions he gets wrong most often. |

**Read aloud** — turn it on with the 🔊 button in the top bar. Questions, options and answers
are then spoken automatically. Uses the browser's built-in speech, so no internet is needed
and it works in English (an en-IN voice is used when available).

**Marking** — MCQ, True/False and the short fill-in-the-blank answers are marked by the app.
Written answers (Sections E & F, and Part V of the paper) show the model answer first, then he
marks himself *"I got it right"* or *"Need to revise"*.

**Saving** — everything is stored on the device only (`localStorage`). Nothing is uploaded,
no account, no internet needed after the first load.

## Open it on a phone

It is a plain website, so any phone browser works.

**Easiest — on the computer first**

1. Double-click `index.html`. It opens in the browser straight away.
2. To get it onto the phone, serve the folder on your computer:
   ```
   python -m http.server 8000
   ```
3. Phone and computer must be on the **same Wi-Fi**. Open `http://<computer's-IP>:8000` on the phone
   (find the IP with `ipconfig` — it looks like `192.168.1.x`).

**Or put it online free** — drag the whole folder onto [Netlify Drop](https://app.netlify.com/drop)
(or push it to GitHub Pages). You then get a link you can bookmark, and on Android/iOS use
**Add to Home screen** so it opens like a normal app icon.

> Phone keyboards can be finicky for little fingers, so for younger children **Study Mode with
> read-aloud** is the easier route than typing answers.

## Files

```
index.html                 the whole app shell
app.js                     all logic: modes, marking, timer, read-aloud, progress
data/questions.js          the 116 questions + answers  <- edit this to change content
assets/styles.css          styling (light + dark, works on phone & laptop)
manifest.webmanifest       for "Add to Home screen" when served over http
assets/icon.svg            app icon
```

## Changing or adding questions

Everything lives in `data/questions.js` as one array. Copy an existing entry, change the text,
and add it to the right section — the app picks it up automatically (counts, marks, progress
bars and the 25-mark total all recalculate).

```js
{ id: "A19", section: "A", chapter: 3, q: "The question text?",
  options: ["first", "second", "third"], a: 0, note: "Why this is the answer." },

{ id: "B21", section: "B", chapter: 2, q: "Something is the __________.", a: "something" },

{ id: "C16", section: "C", chapter: 3, q: "A statement.", a: false, note: "The reason it is false." },

{ id: "E22", section: "E", chapter: 3, q: "A question to answer.", a: "The model answer." }
```

* `a` is the **zero-based** index for MCQ (`0` = a, `1` = b, `2` = c), `true`/`false` for
  True-or-False, and the text itself for everything else.
* `chapter` is `2` (Windows 10) or `3` (MS Word).
* Mock-exam questions in section `P` also carry `part: "I"`–`"V"` and `marks:`.
* To clear saved scores, use **My Progress → Reset all my progress**.