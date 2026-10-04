from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
import re
import sys


ROOT = Path(__file__).resolve().parents[1]
HTML_FILES = [
    ROOT / "index.html",
    *sorted((ROOT / "cases").glob("*.html")),
    ROOT / "404.html",
]
FORBIDDEN = ["算法工程师", "Knockit", "AI Patents", "App Store Creator", "这里后续可以", "Draft"]
FORBIDDEN_PUBLIC_COPY = ["下载简历", "zhang-shuhui-ai-product-manager.pdf"]
REQUIRED_HOME = [
    "复杂业务，我负责把它做成产品。",
    'data-flagship="collab"',
    "3 个真实活动",
    "50+",
    "93%",
]


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.links = []
        self.images = []
        self.title = ""
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
    if parsed.path.startswith("/"):
        return (ROOT / parsed.path.lstrip("/")).resolve()
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
        for phrase in FORBIDDEN_PUBLIC_COPY:
            if phrase in text:
                errors.append(f"forbidden public resume reference {phrase!r}: {page.relative_to(ROOT)}")
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
    readable_pages = [p.read_text(errors="ignore") for p in HTML_FILES if p.exists()]
    if re.search(r"(?:api[_-]?key|secret|password)\s*[:=]", "\n".join(readable_pages), re.I):
        errors.append("possible secret-like content in HTML")
    if errors:
        print("\n".join(f"ERROR: {item}" for item in errors))
        return 1
    print(f"OK: validated {len(HTML_FILES)} HTML pages")
    return 0


if __name__ == "__main__":
    sys.exit(main())
