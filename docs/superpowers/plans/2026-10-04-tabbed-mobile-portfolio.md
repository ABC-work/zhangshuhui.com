# Tabbed Mobile Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace long sequential portfolio reading with a concise project selector and accessible tabbed case studies using one consistent visual system.

**Architecture:** Keep the static HTML/CSS/JavaScript stack. The homepage becomes a short project index; each case exposes four semantic tab panels controlled by one shared progressive-enhancement script. URL hashes store active state and static validation enforces the shared contract.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Python 3 validator, GitHub Pages

---

### Task 1: Add the Tabbed-Case Contract

**Files:**
- Modify: `scripts/validate_site.py`

- [ ] Require every case page to include `role="tablist"`, four `role="tab"` elements, four `role="tabpanel"` elements, and hashes `overview`, `decisions`, `product`, `outcome`.
- [ ] Require the homepage to include exactly three project cards and reject the previous full flagship section.
- [ ] Run `python3 scripts/validate_site.py` and confirm failure before implementation.
- [ ] Commit with `test: define tabbed portfolio contract`.

### Task 2: Shorten the Homepage

**Files:**
- Modify: `index.html`
- Modify: `styles.css`

- [ ] Keep the positioning hero and replace the expanded Collab narrative with three equal project cards.
- [ ] Add a compact proof strip with three verified results and a single contact section.
- [ ] Keep the page on the shared warm-white surface; remove all full-width black sections.
- [ ] Verify at 1440px and 390px.
- [ ] Commit with `feat: turn homepage into a project index`.

### Task 3: Build Shared Accessible Tabs

**Files:**
- Modify: `script.js`
- Modify: `styles.css`

- [ ] Implement hash-aware activation, click switching, browser history restoration, ArrowLeft/ArrowRight/Home/End navigation, `aria-selected`, and `hidden` panel state.
- [ ] Preserve progressive enhancement by applying hidden states only after JavaScript initializes.
- [ ] Implement sticky horizontal mobile tabs and sticky left-column desktop tabs.
- [ ] Run `node --check script.js`.
- [ ] Commit with `feat: add accessible case navigation`.

### Task 4: Convert All Cases

**Files:**
- Modify: `cases/collab.html`
- Modify: `cases/creator-intelligence.html`
- Modify: `cases/airacle-website.html`

- [ ] Convert each case to the same hero, result summary, tablist, and four panels.
- [ ] Keep each panel focused: one claim, supporting evidence, and no duplicated background.
- [ ] Use real Collab and Airacle imagery; label Creator Intelligence visuals as workflow diagrams.
- [ ] Run the full validator and inspect all tab hashes locally.
- [ ] Commit with `feat: convert cases to guided product stories`.

### Task 5: Verify and Publish

**Files:**
- Modify: `sitemap.xml` only if routes change.

- [ ] Run `python3 scripts/validate_site.py`, `node --check script.js`, and `git diff --check`.
- [ ] Capture desktop and 390px screenshots for the homepage and all three cases.
- [ ] Test tab clicks, direct hashes, browser navigation, and keyboard switching in Chromium.
- [ ] Merge to `main`, push, wait for GitHub Pages, and verify all public routes return 200 with the new tab contract.

