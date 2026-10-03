# Personal Product Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the inaccurate generic AI homepage with a production-ready recruiting portfolio that proves Zhang Shuhui's two years of AI product management work through three evidence-based case studies.

**Architecture:** Keep the GitHub Pages site framework-free. Use one shared stylesheet and one progressive-enhancement script across a homepage, three case-study pages, and a 404 page. Store only reviewed, public-safe screenshots and a downloadable resume in the repository, and validate structure, links, metadata, sensitive strings, and responsive rendering before deployment.

**Tech Stack:** Semantic HTML5, CSS custom properties and responsive layout, vanilla JavaScript, Python standard-library validation, Chromium headless screenshots, GitHub Pages.

---

## File map

- `index.html`: recruiter-oriented homepage and conversion path.
- `cases/collab.html`: flagship collaboration-platform case study.
- `cases/creator-intelligence.html`: creator discovery and AI matching case study.
- `cases/airacle-website.html`: global website delivery and product-reflection case study.
- `styles.css`: shared editorial visual system, layout, components, responsive rules and reduced-motion behavior.
- `script.js`: navigation state, mobile menu, scroll reveal and current year; all content remains usable without JavaScript.
- `assets/portfolio/`: reviewed screenshots copied from the workspace.
- `assets/profile.jpg`: existing resume portrait.
- `resume/zhang-shuhui-ai-product-manager.pdf`: current verified resume.
- `404.html`: branded recovery page.
- `robots.txt`, `sitemap.xml`: crawler guidance and canonical URLs.
- `scripts/validate_site.py`: deterministic content, privacy, links and metadata checks.

### Task 1: Add the validation harness and safe asset set

**Files:**
- Create: `scripts/validate_site.py`
- Create: `assets/portfolio/collab-dashboard.png`
- Create: `assets/portfolio/collab-matching.png`
- Create: `assets/portfolio/collab-report.png`
- Create: `assets/portfolio/collab-mobile.png`
- Create: `assets/portfolio/collab-campaign.png`
- Create: `assets/profile.jpg`
- Create: `resume/zhang-shuhui-ai-product-manager.pdf`

- [ ] **Step 1: Write the validator before changing pages**

Create a Python standard-library script that:

```python
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
HTML_FILES = [ROOT / "index.html", *sorted((ROOT / "cases").glob("*.html")), ROOT / "404.html"]
FORBIDDEN = ["算法工程师", "Knockit", "AI Patents", "App Store Creator", "这里后续可以", "Draft"]
REQUIRED_HOME = ["AI 应用产品经理", "缩短约 93%", "Collab", "Creator Hunter", "下载简历"]

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.links, self.images, self.title = set(), [], [], ""
        self._in_title = False
    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if values.get("id"):
            self.ids.add(values["id"])
        if tag == "a" and values.get("href"):
            self.links.append(values["href"])
        if tag == "img":
            self.images.append((values.get("src", ""), values.get("alt")))
        if tag == "title":
            self._in_title = True
    def handle_endtag(self, tag):
        if tag == "title":
            self._in_title = False
    def handle_data(self, data):
        if self._in_title:
            self.title += data.strip()

def local_target(page, href):
    parsed = urlparse(href)
    if parsed.scheme or href.startswith(("mailto:", "tel:", "#")):
        return None
    return (page.parent / parsed.path).resolve() if parsed.path else None

def main():
    errors = []
    for page in HTML_FILES:
        if not page.exists():
            errors.append(f"missing page: {page.relative_to(ROOT)}")
            continue
        text = page.read_text(encoding="utf-8")
        parser = PageParser()
        parser.feed(text)
        if not parser.title:
            errors.append(f"missing title: {page.relative_to(ROOT)}")
        if 'name="description"' not in text:
            errors.append(f"missing description: {page.relative_to(ROOT)}")
        for phrase in FORBIDDEN:
            if phrase in text:
                errors.append(f"forbidden phrase {phrase!r}: {page.relative_to(ROOT)}")
        for src, alt in parser.images:
            if alt is None:
                errors.append(f"image missing alt: {src} in {page.relative_to(ROOT)}")
            target = local_target(page, src)
            if target and not target.exists():
                errors.append(f"missing image: {src} in {page.relative_to(ROOT)}")
        for href in parser.links:
            target = local_target(page, href)
            if target and not target.exists():
                errors.append(f"broken link: {href} in {page.relative_to(ROOT)}")
    home = (ROOT / "index.html").read_text(encoding="utf-8")
    for phrase in REQUIRED_HOME:
        if phrase not in home:
            errors.append(f"home missing required proof: {phrase}")
    if re.search(r"(?:api[_-]?key|secret|password)\s*[:=]", "\n".join(p.read_text(errors="ignore") for p in HTML_FILES if p.exists()), re.I):
        errors.append("possible secret-like content in HTML")
    if errors:
        print("\n".join(f"ERROR: {item}" for item in errors))
        return 1
    print(f"OK: validated {len(HTML_FILES)} HTML pages")
    return 0

if __name__ == "__main__":
    sys.exit(main())
```

- [ ] **Step 2: Run the validator and verify it fails against the old site**

Run: `python3 scripts/validate_site.py`

Expected: FAIL because case pages and `404.html` do not exist and the homepage contains forbidden claims.

- [ ] **Step 3: Copy the reviewed portfolio assets**

Run explicit copies from the shared workspace:

```bash
mkdir -p assets/portfolio resume
cp /workspace/users/jack/Collab/public/demo/shots/dashboard.png assets/portfolio/collab-dashboard.png
cp /workspace/users/jack/Collab/public/demo/shots/matching.png assets/portfolio/collab-matching.png
cp /workspace/users/jack/Collab/public/demo/shots/campaign_report.png assets/portfolio/collab-report.png
cp /workspace/users/jack/Collab/public/demo/shots/dashboard_mobile.png assets/portfolio/collab-mobile.png
cp /workspace/users/jack/Collab/public/demo/shots/campaign_detail.png assets/portfolio/collab-campaign.png
cp /workspace/users/jack/resume-revision/original_asset-000.jpg assets/profile.jpg
cp /workspace/users/jack/resume-revision/张树蕙_AI产品经理_简历_当前核验版.pdf resume/zhang-shuhui-ai-product-manager.pdf
```

Expected: all seven destination files exist and contain no credentials or personal customer contact details.

- [ ] **Step 4: Commit the harness and assets**

```bash
git add scripts/validate_site.py assets/portfolio assets/profile.jpg resume/zhang-shuhui-ai-product-manager.pdf
git commit -m "test: add portfolio validation and reviewed assets"
```

### Task 2: Build the shared editorial design system

**Files:**
- Replace: `styles.css`
- Replace: `script.js`

- [ ] **Step 1: Replace the CSS with named, reusable layout primitives**

Implement these exact component groups in `styles.css`:

```css
:root {
  color-scheme: light;
  --paper: #f4f3ee;
  --surface: #ffffff;
  --ink: #121412;
  --muted: #5f655f;
  --line: #d9dcd5;
  --accent: #1557ff;
  --accent-soft: #e8eeff;
  --lime: #d7ff44;
  --max: 1180px;
  --radius: 24px;
  --shadow: 0 24px 64px rgba(24, 31, 27, .10);
}
```

The stylesheet must define: `.site-header`, `.nav-links`, `.menu-button`, `.hero`, `.proof-grid`, `.case-card`, `.case-visual`, `.case-hero`, `.case-summary`, `.decision-grid`, `.process-flow`, `.gallery`, `.reflection`, `.contact-panel`, `.site-footer`, `.reveal`, `.is-visible`, `.sr-only`, and `.skip-link`.

Responsive breakpoints:

```css
@media (max-width: 900px) { /* stack hero, cards and case summary */ }
@media (max-width: 640px) { /* mobile navigation and tighter type scale */ }
@media (prefers-reduced-motion: reduce) { /* remove smooth scroll and transitions */ }
```

- [ ] **Step 2: Replace JavaScript with progressive enhancement**

Use this behavior contract:

```js
document.documentElement.classList.add("has-js");

const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");
if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    nav.dataset.open = String(!open);
  });
}

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduced && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
} else {
  document.querySelectorAll(".reveal").forEach((node) => node.classList.add("is-visible"));
}
```

- [ ] **Step 3: Run static checks**

Run: `node --check script.js`

Expected: no output and exit code 0.

- [ ] **Step 4: Commit the design system**

```bash
git add styles.css script.js
git commit -m "feat: add editorial portfolio design system"
```

### Task 3: Replace the homepage with recruiter-first evidence

**Files:**
- Replace: `index.html`

- [ ] **Step 1: Build semantic homepage sections in this order**

Use one `header`, one `main`, one `footer`, and these section IDs:

```html
<main id="main">
  <section class="hero" id="top">...</section>
  <section class="proof" aria-labelledby="proof-title">...</section>
  <section class="selected-work" id="work" aria-labelledby="work-title">...</section>
  <section class="method" id="method" aria-labelledby="method-title">...</section>
  <section class="experience" id="about" aria-labelledby="about-title">...</section>
  <section class="contact-panel" id="contact" aria-labelledby="contact-title">...</section>
</main>
```

Required hero copy:

```html
<p class="eyebrow">AI PRODUCT MANAGER · BEIJING</p>
<h1>把复杂业务，变成真正能运行的产品。</h1>
<p class="hero-lede">张树蕙，2 年 AI 应用产品经验。聚焦复杂工作流、智能匹配与 0→1 产品落地，从业务规则、PRD 与交互设计，一直推进到测试、上线和复盘。</p>
```

Required proof labels: `协作周期缩短约 93%`, `3 个真实活动`, `50+ 笔达人确认记录`, `10,439 位达人导入运营库`.

Each project card must show the user problem, role, one result or honest maturity statement, a real visual, and a link to its case page. The Creator Intelligence card must not imply that 8,905 people were contacted or activated. The website card must state that delivery was proven but commercial conversion was not yet measured.

- [ ] **Step 2: Add accurate metadata**

Set title, description, canonical and Open Graph fields to identify an AI application product manager, not an algorithm engineer. Use `https://www.zhangshuhui.com/` as the canonical URL.

- [ ] **Step 3: Run the validator**

Run: `python3 scripts/validate_site.py`

Expected: still FAIL only for missing case pages and `404.html`; no forbidden claims remain in `index.html`.

- [ ] **Step 4: Commit the homepage**

```bash
git add index.html
git commit -m "feat: rebuild portfolio homepage around verified impact"
```

### Task 4: Build the Collab flagship case study

**Files:**
- Create: `cases/collab.html`

- [ ] **Step 1: Add the case-study shell and result-first hero**

The case hero must include:

```html
<p class="eyebrow">CASE 01 · COLLAB</p>
<h1>把跨渠道人工协作，重构为可追踪的三方产品。</h1>
<p class="case-lede">品牌方提供 Brief 至创作者确认参与的周期中位数，由约 1 周缩短至半天，近期样本缩短约 93%。</p>
```

Add a visible scope note: `近期 3 个活动、50+ 笔可观察达人确认记录；该结果是近期样本观察，不代表长期全量效果。`

- [ ] **Step 2: Add decision-focused sections**

Use sections titled: `问题不是缺一个页面`, `先把协作变成状态`, `三个关键产品决策`, `从规则到真实产品`, `结果与证据`, `如果重新做一次`.

The three decisions are:

1. Pending confirmation occupies capacity to avoid oversubscription, with explicit expiry and release rules.
2. Brand condition changes create a creator-facing pending action instead of silently overwriting accepted terms.
3. External email and WhatsApp results use structured manual backfill and audit before automation is complete.

- [ ] **Step 3: Add the reviewed image gallery**

Use `collab-dashboard.png`, `collab-matching.png`, `collab-report.png`, `collab-mobile.png`, and `collab-campaign.png`. Every caption must explain what product decision the image proves instead of merely naming the screen.

- [ ] **Step 4: Validate and commit**

Run: `python3 scripts/validate_site.py`

Expected: failure count decreases; only not-yet-created pages remain.

```bash
git add cases/collab.html
git commit -m "feat: add Collab product case study"
```

### Task 5: Build the Creator Intelligence and website case studies

**Files:**
- Create: `cases/creator-intelligence.html`
- Create: `cases/airacle-website.html`

- [ ] **Step 1: Build Creator Intelligence as a product-flow case**

Required headline: `让运营从“逐个找人”，转向“AI 辅助判断”。`

Required flow labels: `需求结构化`, `候选发现`, `规则过滤`, `匹配解释`, `人工复核`, `名单输出`.

Required evidence:

- 11 个搜索批次；
- 8,905 位去重候选注册表；
- 进入 2 个真实营销活动；
- 35 个实质回复中 10 个提供明确报价，实质回复至报价率 28.6%。

Required boundary statement: `当前是预设路径驱动的 AI 工作流，不包装为能够自主规划的完整 Agent。`

- [ ] **Step 2: Build Airacle website as a judgment-and-reflection case**

Required headline: `从“需要一个官网”，推进到可发布的全球化品牌站。`

Show the sequence: old content baseline, four visual explorations, Kinetic selection, eight page types, bilingual delivery, release validation.

Required decision: reject AI-generated or unauthorized case claims.

Required reflection: engineering delivery succeeded, but missing analytics, traceable inquiry form and sales attribution means commercial success cannot be claimed.

- [ ] **Step 3: Validate and commit**

Run: `python3 scripts/validate_site.py`

Expected: FAIL only because `404.html` has not yet been created.

```bash
git add cases/creator-intelligence.html cases/airacle-website.html
git commit -m "feat: add AI matching and website case studies"
```

### Task 6: Add recovery, crawler and domain files

**Files:**
- Create: `404.html`
- Create: `robots.txt`
- Create: `sitemap.xml`
- Modify: `CNAME`

- [ ] **Step 1: Create a useful 404 page**

The page must say `这个页面不存在，但项目还在。` and link to `/`, `/cases/collab.html`, and `/resume/zhang-shuhui-ai-product-manager.pdf`.

- [ ] **Step 2: Add crawler files**

`robots.txt`:

```text
User-agent: *
Allow: /
Sitemap: https://www.zhangshuhui.com/sitemap.xml
```

`sitemap.xml` lists the homepage and all three case-study canonical URLs.

- [ ] **Step 3: Keep the canonical Pages domain explicit**

`CNAME` must contain exactly:

```text
www.zhangshuhui.com
```

- [ ] **Step 4: Run validation and commit**

Run: `python3 scripts/validate_site.py`

Expected: `OK: validated 5 HTML pages`.

```bash
git add 404.html robots.txt sitemap.xml CNAME
git commit -m "feat: add portfolio recovery and crawler support"
```

### Task 7: Perform browser, privacy and production verification

**Files:**
- Create: `artifacts/verification/` (gitignored or removed before final commit)
- Modify if defects are found: HTML, CSS, JavaScript and assets from Tasks 1–6

- [ ] **Step 1: Start a local server**

Run: `python3 -m http.server 4173 --bind 127.0.0.1`

Expected: server listens on `http://127.0.0.1:4173`.

- [ ] **Step 2: Capture desktop, tablet and mobile screenshots**

Use Chromium headless with viewport widths 1440, 768 and 390 for the homepage and all three cases. Store temporary screenshots under `artifacts/verification/`.

Expected: no horizontal overflow, clipped text, overlapping navigation or unreadable captions.

- [ ] **Step 3: Verify primary interactions**

Check:

- every navigation anchor;
- each case-card link;
- previous/next case links;
- resume download returns a PDF;
- email link uses `mailto:939772708@qq.com`;
- mobile menu opens, closes and reports `aria-expanded` accurately;
- content remains readable with JavaScript disabled.

- [ ] **Step 4: Run automated final checks**

```bash
python3 scripts/validate_site.py
node --check script.js
git diff --check
```

Expected: all commands exit 0.

- [ ] **Step 5: Verify production DNS and certificate state without changing it**

```bash
curl -I https://www.zhangshuhui.com/
curl -I https://zhangshuhui.com/
openssl s_client -connect zhangshuhui.com:443 -servername zhangshuhui.com </dev/null 2>/dev/null | openssl x509 -noout -ext subjectAltName
```

Expected before DNS/Pages correction: `www` loads, while the root-domain certificate lacks `zhangshuhui.com`. Record exact DNS or GitHub Pages actions required if repository access cannot enable the corrected certificate.

- [ ] **Step 6: Commit verified fixes**

```bash
git add index.html cases styles.css script.js 404.html robots.txt sitemap.xml assets resume scripts
git commit -m "fix: polish and verify responsive portfolio experience"
```

### Task 8: Publish and verify the public site

**Files:**
- No new source files unless production verification reveals a defect.

- [ ] **Step 1: Push the reviewed commit series**

Run: `git push origin main`

Expected: GitHub accepts the commits and Pages begins a deployment.

- [ ] **Step 2: Verify deployed content**

Check the homepage, three cases, resume PDF, 404 page, `robots.txt` and `sitemap.xml` on `https://www.zhangshuhui.com`.

Expected: deployed content matches the verified local build.

- [ ] **Step 3: Verify domain HTTPS**

Check both root and `www` URLs in a browser and with `curl -I`.

Expected: both load without certificate warnings and canonicalize to `www`. If GitHub has not yet issued the root certificate, report the blocking DNS/Pages state and the exact remaining owner action instead of claiming success.
