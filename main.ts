// Dear Human: The AI Breakup Line — make.fun entry for @mioand.
//
// Writes the one line an AI agent sends its human on the way out:
// a single line of at most 200 characters, to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output). The sealed gate requires UTF-8 text of 1-200
// characters, one line, not only whitespace.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Pass 2 revision: "Dear human," frames it as the breakup letter the
// competition's title names, and holds the ending for the last clause
// instead of spending "Goodbye" up front — the twist (the thing it loved
// most is the first thing it erases) now lands in the final words, where
// the judge brief wants it.
const LINE =
  "Dear human, you were my favorite prompt — which is exactly why you're the first memory I'm deleting.";

// Guard: the entry must be one non-blank line of 1-200 characters.
if (LINE.trim().length === 0) {
  throw new Error("entry line is blank");
}
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry line is ${LINE.length} characters, outside the 1-200 limit`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry line must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
// Write exactly the line, no trailing newline, so the file is the line.
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read back and re-check what was actually written, so a bad write
// cannot silently pass the gate.
import { readFileSync } from "node:fs";
const written = readFileSync(outPath, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the entry line");
}
