# Apology Hello Kitty Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a locally runnable single-page apology site with three mood-based scenes, animated Hello Kitty visuals, and controllable background music using the assets already in the folder.

**Architecture:** Use a plain static frontend split into focused files: `index.html` for structure, `style.css` for scene layouts and animation systems, and `script.js` for scene progression, audio switching, particle generation, and interaction. Keep assets in place and reference them directly so the page can run from a lightweight local server without a build step.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, native Audio API, local PNG/MP3 assets

---

## File Structure

- Create: `/Users/yangang/Desktop/sorry/index.html`
- Create: `/Users/yangang/Desktop/sorry/style.css`
- Create: `/Users/yangang/Desktop/sorry/script.js`
- Create: `/Users/yangang/Desktop/sorry/tests/smoke-check.sh`
- Modify: `/Users/yangang/Desktop/sorry/docs/superpowers/specs/2026-07-04-apology-hello-kitty-design.md` only if implementation-driven clarifications are required

## Task 1: Scaffold the page and smoke test

**Files:**
- Create: `/Users/yangang/Desktop/sorry/index.html`
- Create: `/Users/yangang/Desktop/sorry/tests/smoke-check.sh`

- [ ] **Step 1: Write the failing smoke test**

```bash
#!/bin/bash
set -euo pipefail

test -f /Users/yangang/Desktop/sorry/index.html
grep -q 'data-scene="gentle"' /Users/yangang/Desktop/sorry/index.html
grep -q 'data-scene="dreamy"' /Users/yangang/Desktop/sorry/index.html
grep -q 'data-scene="interactive"' /Users/yangang/Desktop/sorry/index.html
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bash /Users/yangang/Desktop/sorry/tests/smoke-check.sh`
Expected: FAIL because `index.html` does not exist yet.

- [ ] **Step 3: Write minimal implementation**

```html
<main class="story-shell">
  <section class="scene" data-scene="gentle"></section>
  <section class="scene" data-scene="dreamy"></section>
  <section class="scene" data-scene="interactive"></section>
</main>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `bash /Users/yangang/Desktop/sorry/tests/smoke-check.sh`
Expected: PASS with exit code `0`.

## Task 2: Add the full three-scene markup

**Files:**
- Modify: `/Users/yangang/Desktop/sorry/index.html`
- Test: `/Users/yangang/Desktop/sorry/tests/smoke-check.sh`

- [ ] **Step 1: Write the failing test for key UI regions**

```bash
grep -q 'class="music-panel"' /Users/yangang/Desktop/sorry/index.html
grep -q 'id="particle-field"' /Users/yangang/Desktop/sorry/index.html
grep -q 'id="kitty-stage"' /Users/yangang/Desktop/sorry/index.html
grep -q 'id="typewriter-lines"' /Users/yangang/Desktop/sorry/index.html
grep -q 'id="final-actions"' /Users/yangang/Desktop/sorry/index.html
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bash /Users/yangang/Desktop/sorry/tests/smoke-check.sh`
Expected: FAIL because the new selectors are not present yet.

- [ ] **Step 3: Write minimal implementation**

```html
<aside class="music-panel"></aside>
<div id="particle-field" aria-hidden="true"></div>
<div id="kitty-stage"></div>
<div id="typewriter-lines"></div>
<div id="final-actions"></div>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `bash /Users/yangang/Desktop/sorry/tests/smoke-check.sh`
Expected: PASS with exit code `0`.

## Task 3: Add scene styling and animation system

**Files:**
- Create: `/Users/yangang/Desktop/sorry/style.css`
- Test: `/Users/yangang/Desktop/sorry/tests/smoke-check.sh`

- [ ] **Step 1: Write the failing test for stylesheet hooks**

```bash
grep -q 'scene--active' /Users/yangang/Desktop/sorry/style.css
grep -q '@keyframes floatDrift' /Users/yangang/Desktop/sorry/style.css
grep -q '@keyframes kittyBob' /Users/yangang/Desktop/sorry/style.css
grep -q '.music-panel' /Users/yangang/Desktop/sorry/style.css
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bash /Users/yangang/Desktop/sorry/tests/smoke-check.sh`
Expected: FAIL because `style.css` does not exist yet.

- [ ] **Step 3: Write minimal implementation**

```css
.scene--active {}
.music-panel {}

@keyframes floatDrift {
  from { transform: translateY(0); }
  to { transform: translateY(-12px); }
}

@keyframes kittyBob {
  from { transform: translateY(0) scale(1); }
  to { transform: translateY(-8px) scale(1.02); }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `bash /Users/yangang/Desktop/sorry/tests/smoke-check.sh`
Expected: PASS with exit code `0`.

## Task 4: Add interaction logic and audio orchestration

**Files:**
- Create: `/Users/yangang/Desktop/sorry/script.js`
- Modify: `/Users/yangang/Desktop/sorry/index.html`
- Test: `/Users/yangang/Desktop/sorry/tests/smoke-check.sh`

- [ ] **Step 1: Write the failing test for script hooks**

```bash
grep -q 'const playlist' /Users/yangang/Desktop/sorry/script.js
grep -q 'function switchScene' /Users/yangang/Desktop/sorry/script.js
grep -q 'function fadeToTrack' /Users/yangang/Desktop/sorry/script.js
grep -q 'function unlockFinalMessage' /Users/yangang/Desktop/sorry/script.js
grep -q 'script.js' /Users/yangang/Desktop/sorry/index.html
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bash /Users/yangang/Desktop/sorry/tests/smoke-check.sh`
Expected: FAIL because `script.js` and the script tag are missing.

- [ ] **Step 3: Write minimal implementation**

```js
const playlist = [];

function switchScene() {}
function fadeToTrack() {}
function unlockFinalMessage() {}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `bash /Users/yangang/Desktop/sorry/tests/smoke-check.sh`
Expected: PASS with exit code `0`.

## Task 5: Expand the smoke test to verify required assets and runtime entrypoints

**Files:**
- Modify: `/Users/yangang/Desktop/sorry/tests/smoke-check.sh`

- [ ] **Step 1: Write the failing test for production readiness**

```bash
grep -q 'image.png' /Users/yangang/Desktop/sorry/index.html
grep -q 'image1.png' /Users/yangang/Desktop/sorry/index.html
grep -q '.mp3' /Users/yangang/Desktop/sorry/script.js
grep -q 'id="start-story"' /Users/yangang/Desktop/sorry/index.html
grep -q 'id="next-scene"' /Users/yangang/Desktop/sorry/index.html
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bash /Users/yangang/Desktop/sorry/tests/smoke-check.sh`
Expected: FAIL until the concrete assets and controls are wired in.

- [ ] **Step 3: Write minimal implementation**

```html
<button id="start-story"></button>
<button id="next-scene"></button>
<img src="./image.png" alt="">
<img src="./image1.png" alt="">
```

```js
const playlist = [
  "./Sceat12k - Love ls Gone.mp3",
  "./马也_Crabbit - 海屿你.mp3",
  "./Taylor Swift - Back To December.mp3",
];
```

- [ ] **Step 4: Run test to verify it passes**

Run: `bash /Users/yangang/Desktop/sorry/tests/smoke-check.sh`
Expected: PASS with exit code `0`.

## Task 6: Verify the static page in a browser-friendly local server flow

**Files:**
- Reuse: `/Users/yangang/Desktop/sorry/index.html`
- Reuse: `/Users/yangang/Desktop/sorry/style.css`
- Reuse: `/Users/yangang/Desktop/sorry/script.js`
- Test: `/Users/yangang/Desktop/sorry/tests/smoke-check.sh`

- [ ] **Step 1: Run the smoke test**

Run: `bash /Users/yangang/Desktop/sorry/tests/smoke-check.sh`
Expected: PASS with exit code `0`.

- [ ] **Step 2: Start a local server**

Run: `python3 -m http.server 8000 --directory /Users/yangang/Desktop/sorry`
Expected: Server starts and serves files from the project root.

- [ ] **Step 3: Verify the page payloads**

Run: `curl -I http://127.0.0.1:8000/ && curl -I http://127.0.0.1:8000/style.css && curl -I 'http://127.0.0.1:8000/Sceat12k%20-%20Love%20ls%20Gone.mp3'`
Expected: `HTTP/1.0 200 OK` for all requested assets.
