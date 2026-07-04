# Apology Tab Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the left side of the apology page into a cleaner tab-switching content panel while preserving the Hello Kitty sprite stage on the right.

**Architecture:** Keep the page as one static HTML document, but replace the current button-plus-expand-block structure with a tabbed content shell inside the main card. Update CSS to support a compact segmented-control interaction and a single shared content area, and update JavaScript to drive active-tab state instead of independent expand/collapse state.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, native Audio API

---

## File Structure

- Modify: `/Users/yangang/Desktop/sorry/index.html`
- Modify: `/Users/yangang/Desktop/sorry/style.css`
- Modify: `/Users/yangang/Desktop/sorry/script.js`
- Modify: `/Users/yangang/Desktop/sorry/tests/smoke-check.sh`

## Task 1: Replace the left-side content structure

**Files:**
- Modify: `/Users/yangang/Desktop/sorry/index.html`
- Test: `/Users/yangang/Desktop/sorry/tests/smoke-check.sh`

- [ ] **Step 1: Write the failing smoke checks**

```bash
grep -q 'class="tab-switcher"' /Users/yangang/Desktop/sorry/index.html
grep -q 'data-tab="comfort"' /Users/yangang/Desktop/sorry/index.html
grep -q 'data-tab="serious"' /Users/yangang/Desktop/sorry/index.html
grep -q 'id="tab-panel-title"' /Users/yangang/Desktop/sorry/index.html
grep -q 'id="tab-panel-body"' /Users/yangang/Desktop/sorry/index.html
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bash /Users/yangang/Desktop/sorry/tests/smoke-check.sh`
Expected: FAIL until the old button/expand layout is replaced.

- [ ] **Step 3: Write minimal implementation**

```html
<div class="tab-switcher">
  <button type="button" data-tab="comfort"></button>
  <button type="button" data-tab="serious"></button>
</div>
<div class="tab-panel">
  <h3 id="tab-panel-title"></h3>
  <p id="tab-panel-body"></p>
</div>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `bash /Users/yangang/Desktop/sorry/tests/smoke-check.sh`
Expected: PASS with exit code `0`.

## Task 2: Add tabbed layout and states in CSS

**Files:**
- Modify: `/Users/yangang/Desktop/sorry/style.css`
- Test: `/Users/yangang/Desktop/sorry/tests/smoke-check.sh`

- [ ] **Step 1: Write the failing smoke checks**

```bash
grep -q '.tab-switcher' /Users/yangang/Desktop/sorry/style.css
grep -q '.tab-pill.is-active' /Users/yangang/Desktop/sorry/style.css
grep -q '.tab-panel' /Users/yangang/Desktop/sorry/style.css
grep -q '@keyframes panelFade' /Users/yangang/Desktop/sorry/style.css
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bash /Users/yangang/Desktop/sorry/tests/smoke-check.sh`
Expected: FAIL until tab-specific styles exist.

- [ ] **Step 3: Write minimal implementation**

```css
.tab-switcher {}
.tab-pill.is-active {}
.tab-panel {}

@keyframes panelFade {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `bash /Users/yangang/Desktop/sorry/tests/smoke-check.sh`
Expected: PASS with exit code `0`.

## Task 3: Replace expand logic with tab state logic

**Files:**
- Modify: `/Users/yangang/Desktop/sorry/script.js`
- Test: `/Users/yangang/Desktop/sorry/tests/smoke-check.sh`

- [ ] **Step 1: Write the failing smoke checks**

```bash
grep -q 'const tabContent' /Users/yangang/Desktop/sorry/script.js
grep -q 'function switchTab' /Users/yangang/Desktop/sorry/script.js
grep -q 'data-tab' /Users/yangang/Desktop/sorry/script.js
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bash /Users/yangang/Desktop/sorry/tests/smoke-check.sh`
Expected: FAIL until the old independent expand/collapse logic is replaced.

- [ ] **Step 3: Write minimal implementation**

```js
const tabContent = {};

function switchTab() {}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `bash /Users/yangang/Desktop/sorry/tests/smoke-check.sh`
Expected: PASS with exit code `0`.

## Task 4: Verify the rebuilt single-page layout

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
Expected: The page is served from the project root.

- [ ] **Step 3: Verify the payloads**

Run: `curl -I http://127.0.0.1:8000/ && curl -I http://127.0.0.1:8000/style.css && curl -I http://127.0.0.1:8000/script.js`
Expected: `HTTP/1.0 200 OK` for each asset.
