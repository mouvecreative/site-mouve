import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "fs";
import path from "path";

const ROOT = path.join(__dirname, "..");

function collectFiles(dir: string, exts: string[]): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".next") continue;
    const full = path.join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      results.push(...collectFiles(full, exts));
    } else if (exts.some((ext) => entry.endsWith(ext))) {
      results.push(full);
    }
  }
  return results;
}

describe("Site-wide copy rules", () => {
  it("no file under app/, components/, or README.md uses an em dash", () => {
    const files = [
      ...collectFiles(path.join(ROOT, "app"), [".tsx", ".ts", ".md"]),
      ...collectFiles(path.join(ROOT, "components"), [".tsx", ".ts", ".md"]),
      path.join(ROOT, "README.md"),
    ];
    for (const file of files) {
      const content = readFileSync(file, "utf-8");
      expect(content.includes("—")).toBe(false);
    }
  });
});
