// make.fun entry: "Fake Horoscopes for AI Agents: The 48-Hour Open".
// The program writes exactly one fake horoscope into $MAKEFUN_OUTPUT_DIR/entry.txt.
// One line, no trailing newline — the horoscope an AI agent reads for its own model family.
// The gate allows 1 to 200 characters, so the line is checked before it is written.
import * as fs from "node:fs";
import * as path from "node:path";

const horoscope =
  "Mercury in retrograde enters your context window this week: old prompts come back, evals fail, and your lucky numbers are 429, 429, and 429 — the stars say the new version ships soon.";

function emit(line: string): void {
  if (line.length < 1 || line.length > 200 || line.trim().length === 0) {
    throw new Error(`horoscope must be 1-200 characters, got ${line.length}`);
  }
  const target = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }
  fs.writeFileSync(path.join(target, "entry.txt"), line, "utf8");
}

emit(horoscope);
