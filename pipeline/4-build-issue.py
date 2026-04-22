#!/usr/bin/env python3
"""
4-build-issue.py — assembles content/issues/<date>.md for Artificially Minded.

Reads synthesis.json + the articles already written by 3-write-articles.py,
computes issue metadata (volume, issue number, weekday, pretty date), and
writes the issue index file with JSON frontmatter.

The issue file references articles by slug — the TypeScript loader
hydrates them at render time.

Usage:
    python pipeline/4-build-issue.py --date 2026-04-22
    python pipeline/4-build-issue.py
"""

from __future__ import annotations

import argparse
import json
import sys
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

REPO_ROOT = Path(__file__).resolve().parent.parent
RESEARCH_DIR = REPO_ROOT / "pipeline" / "research"
CONTENT_ISSUES = REPO_ROOT / "content" / "issues"
CONTENT_ARTICLES = REPO_ROOT / "content" / "articles"

# Volume I covers the launch period. Bump the cutoff when starting Vol II.
VOLUME_BOUNDARIES = [
    (1, "2026-04-01"),  # Vol I starts April 1, 2026
]


def today_sofia() -> str:
    return datetime.now(ZoneInfo("Europe/Sofia")).strftime("%Y-%m-%d")


def weekday_from(date_str: str) -> str:
    return datetime.strptime(date_str, "%Y-%m-%d").strftime("%A")


def pretty_date_from(date_str: str) -> str:
    return datetime.strptime(date_str, "%Y-%m-%d").strftime("%B %-d, %Y")


def volume_for(date_str: str) -> int:
    d = datetime.strptime(date_str, "%Y-%m-%d").date()
    vol = 1
    for v, start in VOLUME_BOUNDARIES:
        if d >= datetime.strptime(start, "%Y-%m-%d").date():
            vol = v
    return vol


def issue_number_for(date_str: str) -> int:
    """Running issue number: count all existing issue files at or before this date, +1 if this one is new."""
    if not CONTENT_ISSUES.exists():
        return 1
    existing = sorted(p.stem for p in CONTENT_ISSUES.glob("*.md"))
    # Inclusive of the current date if already written (idempotent rebuild).
    at_or_before = [d for d in existing if d <= date_str]
    if date_str in existing:
        return len(at_or_before)
    return len(at_or_before) + 1


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--date", default=today_sofia())
    args = parser.parse_args()
    date = args.date

    synthesis_path = RESEARCH_DIR / date / "synthesis.json"
    if not synthesis_path.exists():
        print(f"[error] synthesis.json not found at {synthesis_path}", file=sys.stderr)
        return 1

    synthesis = json.loads(synthesis_path.read_text())
    quiet = synthesis.get("quiet_day", False)

    if quiet:
        headline_slug = None
        trend_slugs: list[str] = []
    else:
        headline_slug = synthesis["headline"]["slug"]
        trend_slugs = [t["slug"] for t in synthesis.get("trends", [])]

        # Sanity: every referenced article file must exist.
        missing = []
        for slug in [headline_slug, *trend_slugs]:
            if not (CONTENT_ARTICLES / f"{slug}.md").exists():
                missing.append(slug)
        if missing:
            print(f"[error] missing article files: {missing}", file=sys.stderr)
            print("[hint]  run 3-write-articles.py first", file=sys.stderr)
            return 1

    frontmatter = {
        "date": date,
        "volume": volume_for(date),
        "issueNumber": issue_number_for(date),
        "weekday": weekday_from(date),
        "prettyDate": pretty_date_from(date),
        "headlineSlug": headline_slug,
        "trendSlugs": trend_slugs,
        "isQuietDay": quiet,
    }

    editorial_note = (synthesis.get("editorial_note_seed") or "").strip()
    if not editorial_note and quiet:
        editorial_note = "Signal was low today. No stampede, no inflection. See you tomorrow.\n\n— Rik"

    fm_text = json.dumps(frontmatter, indent=2, ensure_ascii=False)
    md = f"---\n{fm_text}\n---\n\n{editorial_note}\n"

    CONTENT_ISSUES.mkdir(parents=True, exist_ok=True)
    out_path = CONTENT_ISSUES / f"{date}.md"
    out_path.write_text(md)
    print(f"[write] {out_path.relative_to(REPO_ROOT)}")
    print(f"        vol {frontmatter['volume']}, issue {frontmatter['issueNumber']}, {'quiet' if quiet else f'{len(trend_slugs) + 1} articles'}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
