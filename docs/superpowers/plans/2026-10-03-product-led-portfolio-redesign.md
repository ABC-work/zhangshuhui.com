# Product-Led Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild zhangshuhui.com as a concise, visual product portfolio that proves product judgment through Collab and removes every résumé-download experience.

**Architecture:** Keep the existing static HTML/CSS/JavaScript stack. Rework the shared visual system in `styles.css`, use semantic HTML and native `details` elements for progressive disclosure, and extend the existing Python validator so information hierarchy and résumé-removal requirements are enforced automatically.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Python 3 static validation, GitHub Pages

---

## File Structure

- `scripts/validate_site.py`: validates routes, local assets, required positioning, résumé-link removal, and compact case structure.
- `index.html`: product-led homepage with Collab as the flagship product.
- `cases/collab.html`: flagship case with visual evidence and progressive detail.
- `cases/creator-intelligence.html`: compact AI workflow case.
- `cases/airacle-website.html`: compact 0→1 delivery case.
- `styles.css`: shared product-launch visual system and responsive behavior.
- `script.js`: navigation, reveal behavior, and reduced-motion-safe visual feedback.
- `sitemap.xml`: public portfolio routes only.

### Task 1: Enforce the New Portfolio Contract

**Files:**
- Modify: `scripts/validate_site.py`

- [ ] **Step 1: Add failing assertions for removed résumé experiences**

Add checks that scan every public HTML page and fail when any of these values appear:

```python
FORBIDDEN_PUBLIC_COPY = (
    "下载简历",
    "zhang-shuhui-ai-product-manager.pdf",
)

for page, text in html_by_page.items():
    for forbidden in FORBIDDEN_PUBLIC_COPY:
        assert forbidden not in text, f"{page}: forbidden public résumé reference: {forbidden}"
```

Also require the homepage to contain the exact positioning and flagship markers:

```python
for required in (
    "复杂业务，我负责把它做成产品。",
    "data-flagship=\"collab\"",
    "3 个真实活动",
    "50+",
    "93%",
):
    assert required in html_by_page["index.html"], f"index.html: missing {required}"
```

- [ ] **Step 2: Run validation and confirm it fails**

Run: `python3 scripts/validate_site.py`

Expected: FAIL because the current pages contain résumé links and the old headline.

- [ ] **Step 3: Commit the contract test**

```bash
git add scripts/validate_site.py
git commit -m "test: define product-led portfolio contract"
```

### Task 2: Rebuild the Homepage Around the Product

**Files:**
- Modify: `index.html`
- Modify: `styles.css`

- [ ] **Step 1: Replace the hero with a product-first stage**

Use one positioning statement, one primary action, and a Collab interface composition:

```html
<section class="launch-hero page-shell" id="top">
  <div class="launch-copy">
    <p class="eyebrow">ZHANG SHUHUI · AI PRODUCT MANAGER</p>
    <h1>复杂业务，我负责把它做成产品。</h1>
    <p>主导业务建模、产品设计与上线交付，让 AI 进入真正有价值的工作环节。</p>
    <a class="button primary" href="#collab">查看旗舰产品 <span aria-hidden="true">↘</span></a>
  </div>
  <div class="product-stage" aria-label="Collab 产品界面预览">
    <img class="stage-primary" src="assets/portfolio/collab-dashboard.png" alt="Collab 运营工作台" width="1280" height="900">
    <img class="stage-secondary" src="assets/portfolio/collab-mobile.png" alt="Collab 移动端状态页面" width="390" height="844">
  </div>
</section>
```

- [ ] **Step 2: Make Collab the flagship section**

Add `data-flagship="collab"`, the verified result strip, three decision statements, and a single case link. Avoid biography and process prose.

- [ ] **Step 3: Reduce the remaining projects to visual proof cards**

Each card contains one claim, one evidence line, one visual, and one case link. Creator Intelligence uses a compact workflow visual; Airacle uses the product-browser visual.

- [ ] **Step 4: Remove résumé, timeline, method grid, and long About content**

Delete all résumé links, the résumé CTA, hero biography card, education and work timeline, four-card method section, and long personal description. End with the principle and mail link only.

- [ ] **Step 5: Implement the product-launch CSS system**

Use the existing color tokens but establish these layout rules:

```css
.launch-hero { min-height: min(900px, 92dvh); display: grid; grid-template-columns: minmax(0, .8fr) minmax(520px, 1.2fr); align-items: center; gap: clamp(48px, 7vw, 112px); }
.launch-copy h1 { max-width: 9ch; font-size: clamp(4rem, 8vw, 8.5rem); line-height: .9; letter-spacing: -.075em; }
.product-stage { position: relative; min-height: 640px; isolation: isolate; }
.stage-primary { width: min(920px, 100%); transform: perspective(1400px) rotateY(-8deg) rotateX(3deg); }
.stage-secondary { position: absolute; right: -1%; bottom: -4%; width: min(230px, 30%); }
```

For viewports below 760px, stack copy above the product stage, remove perspective rotation, keep body text at least 16px, and ensure no horizontal overflow.

- [ ] **Step 6: Run validation and inspect the expected remaining failures**

Run: `python3 scripts/validate_site.py`

Expected: homepage requirements pass; failures remain only in case-page résumé links.

- [ ] **Step 7: Commit the homepage**

```bash
git add index.html styles.css
git commit -m "feat: turn homepage into a product showcase"
```

### Task 3: Recut the Collab Flagship Case

**Files:**
- Modify: `cases/collab.html`
- Modify: `styles.css`

- [ ] **Step 1: Reorder the case into five scannable sections**

Use the fixed sequence `挑战 → 判断 → 决策 → 产品 → 结果`. Start with the dashboard image and result strip. Keep the three primary decisions visible and move role boundaries, full state details, and statistical caveats into accessible `details` elements.

```html
<details class="case-detail">
  <summary>查看统计口径与职责边界</summary>
  <div class="case-detail-body">
    <p>近期样本包括 3 个活动与 50+ 笔可观察达人确认记录。</p>
    <p>我主导业务流程、PRD、交互、状态与权限规则、验收测试和生产部署；代码由 AI 工具辅助生成，并由其他开发人员参与复核。</p>
  </div>
</details>
```

- [ ] **Step 2: Turn product screenshots into a guided visual sequence**

Show dashboard, matching, campaign, report, and mobile screens with captions limited to one sentence each. Use one wide image per visual beat instead of a dense gallery grid.

- [ ] **Step 3: Remove résumé links and redundant navigation**

Keep only brand, all products, and contact in the case header.

- [ ] **Step 4: Commit the flagship case**

```bash
git add cases/collab.html styles.css
git commit -m "feat: recut Collab as the flagship product story"
```

### Task 4: Compress the Supporting Cases

**Files:**
- Modify: `cases/creator-intelligence.html`
- Modify: `cases/airacle-website.html`
- Modify: `styles.css`

- [ ] **Step 1: Compress Creator Intelligence**

Keep the six-step workflow, four guardrails, 8,905-candidate evidence, and the distinction between a predefined AI workflow and an autonomous Agent. Move reply-rate methodology and incomplete funnel details into one `details` element.

- [ ] **Step 2: Compress Airacle Website**

Keep the ambiguous starting point, four visual directions, the decision not to fabricate case studies, and the delivery-versus-business-outcome distinction. Move eight-page and SEO implementation details into one `details` element.

- [ ] **Step 3: Remove résumé links from both headers**

Keep navigation consistent with the Collab case.

- [ ] **Step 4: Run the complete static validator**

Run: `python3 scripts/validate_site.py`

Expected: `OK: validated 5 HTML pages`.

- [ ] **Step 5: Commit supporting cases**

```bash
git add cases/creator-intelligence.html cases/airacle-website.html styles.css
git commit -m "feat: compress supporting product cases"
```

### Task 5: Polish Interaction, Accessibility, and Public Routes

**Files:**
- Modify: `script.js`
- Modify: `sitemap.xml`
- Modify: `styles.css`

- [ ] **Step 1: Keep motion meaningful and reduced-motion safe**

Use `IntersectionObserver` only for section entry. Do not block content when JavaScript is unavailable. Disable transforms and transitions for reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; animation: none !important; transition: none !important; }
  .stage-primary, .stage-secondary { transform: none !important; }
}
```

- [ ] **Step 2: Remove the résumé route from public discovery**

Ensure `sitemap.xml` contains only homepage and three case routes. Do not link the PDF from HTML, robots, sitemap, metadata, or structured data.

- [ ] **Step 3: Run syntax and content checks**

```bash
python3 scripts/validate_site.py
node --check script.js
git diff --check
```

Expected: all commands exit 0 and validator prints `OK: validated 5 HTML pages`.

- [ ] **Step 4: Commit interaction polish**

```bash
git add script.js styles.css sitemap.xml scripts/validate_site.py
git commit -m "feat: polish portfolio interaction and discovery"
```

### Task 6: Browser Verification and Deployment

**Files:**
- Create: `artifacts/verification/product-led-home-desktop.png`
- Create: `artifacts/verification/product-led-home-mobile.png`
- Create: `artifacts/verification/product-led-collab-desktop.png`

- [ ] **Step 1: Start a local static server**

Run: `python3 -m http.server 4173 --bind 127.0.0.1`

Expected: server listens on `http://127.0.0.1:4173`.

- [ ] **Step 2: Verify desktop and mobile journeys**

Capture homepage at 1440×1000 and 390×844, then Collab at 1440×1000. Confirm positioning is visible without scrolling, product imagery dominates, no résumé CTA exists, no horizontal overflow occurs, and every project/contact link works.

- [ ] **Step 3: Run fresh final verification**

```bash
python3 scripts/validate_site.py
node --check script.js
git diff --check
git status --short --branch
```

Expected: all checks pass and only intentionally ignored verification artifacts remain outside tracked changes.

- [ ] **Step 4: Push and verify GitHub Pages**

```bash
git push origin main
```

Verify these URLs return HTTP 200 and the homepage contains `复杂业务，我负责把它做成产品。`:

- `https://www.zhangshuhui.com/`
- `https://www.zhangshuhui.com/cases/collab.html`
- `https://www.zhangshuhui.com/cases/creator-intelligence.html`
- `https://www.zhangshuhui.com/cases/airacle-website.html`
- `https://www.zhangshuhui.com/robots.txt`
- `https://www.zhangshuhui.com/sitemap.xml`

