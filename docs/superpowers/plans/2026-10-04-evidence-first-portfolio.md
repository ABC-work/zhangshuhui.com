# Evidence-first Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the portfolio into a recruiter decision page that proves business ownership, AI product judgment, and measurable delivery.

**Architecture:** Keep the static HTML/CSS/JS architecture and existing accessible tab behavior. Replace marketing-first copy with evidence-first sections, extend the validator with content contracts, then tune responsive styles without adding dependencies.

**Tech Stack:** Semantic HTML, CSS, vanilla JavaScript, Python HTML validation, Chromium visual QA.

---

### Task 1: Define content contracts

**Files:**
- Modify: `scripts/validate_site.py`

- [ ] Add required homepage evidence, Collab metric definition, and Creator Intelligence AI-layer assertions.
- [ ] Run `python3 scripts/validate_site.py` and verify it fails on the old pages.

### Task 2: Rebuild the homepage hierarchy

**Files:**
- Modify: `index.html`
- Modify: `styles.css`

- [ ] Replace the abstract hero with experience, domain, ownership, and proof.
- [ ] Promote two core cases and visually demote the website case.
- [ ] Add a concrete capability-to-evidence matrix.
- [ ] Replace the percentage claim with raw before/after timing.

### Task 3: Strengthen case evidence

**Files:**
- Modify: `cases/collab.html`
- Modify: `cases/creator-intelligence.html`
- Modify: `cases/airacle-website.html`
- Modify: `styles.css`

- [ ] Add role, users, state flow, metric definition, and limitation evidence to Collab.
- [ ] Add model/rule/human architecture, failure states, and evaluation gap to Creator Intelligence.
- [ ] Reframe the website as a supporting delivery and reflection case.

### Task 4: Verify and deploy

**Files:**
- Verify: all public HTML, CSS and JavaScript files

- [ ] Run site validation, JavaScript syntax check, and `git diff --check`.
- [ ] Capture desktop and mobile screenshots and inspect hierarchy and overflow.
- [ ] Commit, fast-forward main, push, wait for Pages, and verify public routes.

