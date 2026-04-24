#!/usr/bin/env python3
"""
sync-compare.py — sync comparison notes from rik-docs vault into content/compare/.

Source of truth:  ~/Documents/rik-docs/wiki/ai/compare/*.md
Destination:      content/compare/<slug>.md

Transformations applied during sync:
- YAML frontmatter -> JSON frontmatter (AM convention, matches load-issue.ts style).
- Derives `cluster` from the `compare/<cluster>` tag.
- Extracts inline `<!-- src: URL -->` HTML comments into a numbered `sources` array
  in frontmatter, replacing the comment in-body with a `[^N]` footnote marker.
- Resolves wikilinks `[[slug]]` / `[[slug|alias]]` to markdown links
  `[alias](/compare/slug)` when the target is one of the 23 synced notes.
  Cross-vault wikilinks (e.g. `[[../foo]]`) are rendered as plain text.
- Parses the `> **TL;DR:** ...` blockquote at the top of each note into a `tldr`
  frontmatter field so the hub landing can render it without parsing the body.

Usage:
    python pipeline/sync-compare.py
    python pipeline/sync-compare.py --source ~/Documents/rik-docs/wiki/ai/compare
    python pipeline/sync-compare.py --dry-run
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path


SKIP_FILES = {"_index.md"}
SKIP_PREFIXES = ("_",)  # any file starting with `_` is a meta/private note
DEFAULT_SOURCE = Path.home() / "Documents" / "rik-docs" / "wiki" / "ai" / "compare"


def parse_yaml_frontmatter(raw: str) -> tuple[dict, str]:
    """Parse the narrow YAML subset used by compare notes.

    Supports: scalar key: value, inline list `key: [a, b, c]`. Values are
    strings, booleans, ints, or lists of strings. No nested maps, no block
    sequences, no anchors - the compare notes do not need them.
    """
    if not raw.startswith("---"):
        raise ValueError("missing opening frontmatter fence")
    rest = raw[3:]
    if rest.startswith("\r\n"):
        rest = rest[2:]
    elif rest.startswith("\n"):
        rest = rest[1:]
    end = rest.find("\n---")
    if end == -1:
        raise ValueError("missing closing frontmatter fence")
    fm_text = rest[:end]
    body = rest[end + 4 :]
    if body.startswith("\r\n"):
        body = body[2:]
    elif body.startswith("\n"):
        body = body[1:]

    fm: dict = {}
    for line in fm_text.splitlines():
        line = line.rstrip()
        if not line or line.startswith("#"):
            continue
        if ":" not in line:
            continue
        key, _, val = line.partition(":")
        key = key.strip()
        val = val.strip()
        fm[key] = parse_yaml_value(val)
    return fm, body


def parse_yaml_value(val: str):
    if val == "":
        return None
    if val.startswith("[") and val.endswith("]"):
        inner = val[1:-1].strip()
        if not inner:
            return []
        return [parse_scalar(p.strip()) for p in split_inline_list(inner)]
    return parse_scalar(val)


def split_inline_list(s: str) -> list[str]:
    out, depth, buf = [], 0, []
    for ch in s:
        if ch == "," and depth == 0:
            out.append("".join(buf).strip())
            buf = []
            continue
        if ch in "[{":
            depth += 1
        elif ch in "]}":
            depth -= 1
        buf.append(ch)
    if buf:
        out.append("".join(buf).strip())
    return out


def parse_scalar(val: str):
    if len(val) >= 2 and val[0] == val[-1] and val[0] in ('"', "'"):
        return val[1:-1]
    if val == "true":
        return True
    if val == "false":
        return False
    if val == "null" or val == "~":
        return None
    if re.fullmatch(r"-?\d+", val):
        return int(val)
    return val


def derive_cluster(tags) -> str | None:
    """Pull the cluster slug from a `compare/<cluster>` tag."""
    if not isinstance(tags, list):
        return None
    for t in tags:
        if isinstance(t, str) and t.startswith("compare/"):
            c = t.split("/", 1)[1]
            if c != "index":
                return c
    return None


def extract_title(body: str) -> str:
    """Pull the first `# Title` line."""
    for line in body.splitlines():
        line = line.strip()
        if line.startswith("# "):
            return line[2:].strip()
    return ""


def extract_tldr(body: str) -> str:
    """Find the `> **TL;DR:**` blockquote and return its text (stripped)."""
    m = re.search(
        r"^>\s*\*\*TL;DR:\*\*\s*(.+?)(?:\n(?!>)|\Z)",
        body,
        re.MULTILINE | re.DOTALL,
    )
    if not m:
        return ""
    text = m.group(1)
    # Collapse any continuation `> ...` lines.
    text = re.sub(r"\n>\s*", " ", text)
    return text.strip()


SRC_COMMENT = re.compile(r"<!--\s*src:\s*(\S+?)\s*-->")


def extract_sources(body: str) -> tuple[str, list[dict]]:
    """Replace `<!-- src: URL -->` with `[^N]` markers; return deduped sources."""
    url_to_id: dict[str, int] = {}
    sources: list[dict] = []

    def repl(m: re.Match[str]) -> str:
        url = m.group(1)
        if url not in url_to_id:
            url_to_id[url] = len(sources) + 1
            sources.append({"id": url_to_id[url], "url": url})
        return f"[^{url_to_id[url]}]"

    new_body = SRC_COMMENT.sub(repl, body)
    return new_body, sources


WIKILINK = re.compile(r"\[\[([^\]|]+?)(?:\|([^\]]+))?\]\]")


def resolve_wikilinks(body: str, valid_slugs: set[str]) -> str:
    """Resolve `[[slug]]` / `[[slug|alias]]` that point to synced notes.

    Anything pointing elsewhere (e.g. `[[../reasoning-models-...]]`) renders as
    plain text of the alias or the last path segment.
    """

    def repl(m: re.Match[str]) -> str:
        target = m.group(1).strip()
        alias = (m.group(2) or "").strip()
        # Cross-vault link: render alias-or-last-segment as plain text.
        if "/" in target or target.startswith(".."):
            label = alias or target.split("/")[-1].replace("-", " ")
            return label
        # In-cluster link that resolves.
        if target in valid_slugs:
            label = alias or target.replace("-", " ")
            return f"[{label}](/compare/{target})"
        # Unresolved: plain text fallback.
        return alias or target.replace("-", " ")

    return WIKILINK.sub(repl, body)


def strip_first_title_and_tldr(body: str) -> str:
    """Remove the `# Title` and the `> **TL;DR:** ...` blockquote so the rendered
    body does not duplicate what the hero already shows."""
    lines = body.splitlines()
    out: list[str] = []
    skip_tldr = False
    seen_title = False
    for line in lines:
        stripped = line.strip()
        if not seen_title and stripped.startswith("# "):
            seen_title = True
            continue
        if stripped.startswith("> **TL;DR:**") or (skip_tldr and stripped.startswith(">")):
            skip_tldr = True
            continue
        if skip_tldr and not stripped.startswith(">"):
            skip_tldr = False
        out.append(line)
    # Trim leading blank lines.
    while out and not out[0].strip():
        out.pop(0)
    return "\n".join(out)


def build_json_frontmatter(fm: dict, slug: str, title: str, tldr: str, sources: list[dict]) -> str:
    """Serialize the JSON frontmatter block AM's loader expects."""
    out = {
        "slug": slug,
        "title": title,
        "tldr": tldr,
        "cluster": derive_cluster(fm.get("tags")),
        "confidence": fm.get("confidence", "medium"),
        "created": str(fm.get("created", "")),
        "updated": str(fm.get("updated", "")),
        "aliases": fm.get("aliases") or [],
        "sources": sources,
    }
    return json.dumps(out, indent=2)


def sync_file(path: Path, valid_slugs: set[str]) -> tuple[str, str]:
    raw = path.read_text(encoding="utf-8")
    fm, body = parse_yaml_frontmatter(raw)
    title = extract_title(body)
    tldr = extract_tldr(body)
    body = strip_first_title_and_tldr(body)
    body, sources = extract_sources(body)
    body = resolve_wikilinks(body, valid_slugs)
    slug = path.stem
    json_fm = build_json_frontmatter(fm, slug, title, tldr, sources)
    out = f"---\n{json_fm}\n---\n\n{body.strip()}\n"
    return slug, out


def main() -> int:
    ap = argparse.ArgumentParser(description="Sync compare notes from vault into AM.")
    ap.add_argument("--source", type=Path, default=DEFAULT_SOURCE)
    ap.add_argument(
        "--dest",
        type=Path,
        default=Path(__file__).resolve().parent.parent / "content" / "compare",
    )
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    src_dir: Path = args.source.expanduser()
    if not src_dir.is_dir():
        print(f"error: source dir not found: {src_dir}", file=sys.stderr)
        return 1

    files = [
        p
        for p in sorted(src_dir.glob("*.md"))
        if p.name not in SKIP_FILES and not p.name.startswith(SKIP_PREFIXES)
    ]
    valid_slugs = {p.stem for p in files}

    if not args.dry_run:
        args.dest.mkdir(parents=True, exist_ok=True)

    wrote = 0
    copied_charts = 0
    for p in files:
        slug, content = sync_file(p, valid_slugs)
        dest = args.dest / f"{slug}.md"
        if args.dry_run:
            print(f"[dry-run] would write {dest}")
        else:
            dest.write_text(content, encoding="utf-8")
        wrote += 1

        # Copy sidecar chart spec file if it exists.
        sidecar = p.with_suffix(".charts.json")
        if sidecar.exists():
            dest_sidecar = args.dest / f"{slug}.charts.json"
            if args.dry_run:
                print(f"[dry-run] would copy {sidecar} -> {dest_sidecar}")
            else:
                dest_sidecar.write_text(
                    sidecar.read_text(encoding="utf-8"), encoding="utf-8"
                )
            copied_charts += 1

    print(f"synced {wrote} compare notes -> {args.dest}")
    if copied_charts:
        print(f"  (+ {copied_charts} chart sidecar{'s' if copied_charts != 1 else ''})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
