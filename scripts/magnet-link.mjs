#!/usr/bin/env node
// Print the tracked DM link for a magnet.  Usage: node scripts/magnet-link.mjs system 71-claude-edit-system
// <short-slug> is the shorts folder name of the reel the keyword goes on (utm_content).
const [keyword, short] = process.argv.slice(2);
if (!keyword || !short) {
  console.error("usage: node scripts/magnet-link.mjs <keyword> <short-slug>");
  process.exit(1);
}
const u = new URL(`https://artificialminded.com/${keyword.toLowerCase()}`);
u.searchParams.set("utm_source", "ig");
u.searchParams.set("utm_medium", "dm");
u.searchParams.set("utm_campaign", keyword.toLowerCase());
u.searchParams.set("utm_content", short);
console.log(u.toString());
