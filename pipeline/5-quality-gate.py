#!/usr/bin/env python3
"""
5-quality-gate.py — defensive check between synthesis and article generation.

Reads pipeline/research/<date>/synthesis.json and validates it meets the bar
to publish a full issue. Rewrites it as a quiet-day stub if not.

Runs AFTER 2-synthesize.py and BEFORE 3-write-articles.py. The synthesis prompt
already self-reports quiet days, but the gate catches:
  - synthesis returned < 3 cross-platform trends despite claiming not quiet
  - a trend is missing required fields (sources, key_facts)
  - a trend's `signal` string doesn't match an actual multi-platform presence

On downgrade: rewrites synthesis.json with `quiet_day: true` + preserved
editorial_note_seed. Downstream scripts handle the rest.

Usage:
    python pipeline/5-quality-gate.py --date 2026-04-22
    python pipeline/5-quality-gate.py
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

MIN_TOTAL_TRENDS = 3  # headline + 2 trends minimum
REQUIRED_TREND_FIELDS = {
    "slug", "title", "deck", "signal", "sources",
    "one_line_thesis", "key_facts",
}


def today_sofia() -> str:
    return datetime.now(ZoneInfo("Europe/Sofia")).strftime("%Y-%m-%d")


def is_cross_platform(signal: str) -> bool:
    """True if the signal string claims 2+ platforms."""
    return "+" in (signal or "")


def validate_trend(trend: dict) -> list[str]:
    """Return a list of reasons this trend is invalid; empty list = OK."""
    problems = []
    missing = REQUIRED_TREND_FIELDS - set(trend.keys())
    if missing:
        problems.append(f"missing fields: {sorted(missing)}")
    if not trend.get("sources") or len(trend["sources"]) < 2:
        problems.append("fewer than 2 sources")
    if not trend.get("key_facts") or len(trend["key_facts"]) < 2:
        problems.append("fewer than 2 key_facts")
    return problems


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

    if synthesis.get("quiet_day"):
        print("[pass] synthesis already marked quiet_day — no action")
        return 0

    headline = synthesis.get("headline")
    trends = synthesis.get("trends", [])

    dropped = []
    kept_trends = []
    for i, t in enumerate(trends):
        tp = validate_trend(t)
        if tp:
            dropped.append(f"trend #{i + 1} ({t.get('slug', '?')}): {tp}")
        else:
            kept_trends.append(t)

    headline_problems = []
    if not headline:
        headline_problems.append("no headline")
    else:
        hp = validate_trend(headline)
        if hp:
            headline_problems.append(f"headline invalid: {hp}")

    if headline_problems and kept_trends:
        promoted = kept_trends.pop(0)
        promoted["isHeadline"] = True
        dropped.append(f"headline promoted from trend: {promoted.get('slug', '?')}")
        headline = promoted
        headline_problems = []

    reasons = list(headline_problems)

    total = (1 if headline else 0) + len(kept_trends)
    if total < MIN_TOTAL_TRENDS:
        reasons.append(f"only {total} valid trends after drop (need >= {MIN_TOTAL_TRENDS})")

    cross_platform_count = sum(
        1 for t in ([headline] if headline else []) + kept_trends
        if is_cross_platform(t.get("signal", ""))
    )
    if cross_platform_count < 2:
        reasons.append(
            f"only {cross_platform_count} valid trends have cross-platform signal (need >= 2)"
        )

    if not reasons:
        if dropped:
            print("[filter] dropped invalid trends:")
            for d in dropped:
                print(f"  - {d}")
            synthesis["headline"] = headline
            synthesis["trends"] = kept_trends
            synthesis_path.write_text(
                json.dumps(synthesis, indent=2, ensure_ascii=False) + "\n"
            )
            print(f"[write] rewrote {synthesis_path.relative_to(REPO_ROOT)} with {total} valid trends")
        print(f"[pass] {total} trends, {cross_platform_count} cross-platform — ship it")
        return 0

    print("[downgrade] quality gate failed:")
    for r in reasons:
        print(f"  - {r}")
    for d in dropped:
        print(f"  - dropped: {d}")

    seed = synthesis.get("editorial_note_seed") or (
        "Signal was low today. The pipeline could not find three stories with strong "
        "cross-platform presence. We do not manufacture stories. Back tomorrow.\n\n— Rik"
    )
    quiet = {
        "quiet_day": True,
        "headline": None,
        "trends": [],
        "editorial_note_seed": seed,
        "downgrade_reasons": reasons,
    }
    synthesis_path.write_text(json.dumps(quiet, indent=2, ensure_ascii=False) + "\n")
    print(f"[write] rewrote {synthesis_path.relative_to(REPO_ROOT)} as quiet-day stub")
    return 0


if __name__ == "__main__":
    sys.exit(main())
