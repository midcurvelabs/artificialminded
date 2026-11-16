// Every word on the homepage lives here. The page is the abstract 3D brain with
// four small corner labels; positioning is a hint, not a pitch. Keep it that way:
// one short line per corner, no prices, no numbers, no em dashes.

export const HOME = {
  topRight: "Book a call",
  // Bottom-left: two short lines, the only positioning on the page.
  lines: [
    "AI agents and workflows for agencies and SMBs.",
    "Built into the tools you already run. A human approves. EU hosted.",
  ] as const,
  bottomRight: "Process // Build // Approve",
} as const;
