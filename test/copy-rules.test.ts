import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "fs";
import path from "path";

const PAGE_FILES = ["page.tsx", "sobre/page.tsx", "metodo/page.tsx", "planos/page.tsx", "contato/page.tsx"].map(
  (p) => path.join(__dirname, "..", "app", p)
);

describe("Site-wide copy rules", () => {
  it("no page uses an em dash", () => {
    for (const file of PAGE_FILES) {
      const content = readFileSync(file, "utf-8");
      expect(content.includes("—")).toBe(false);
    }
  });

  it("components directory has no em dash either", () => {
    const dir = path.join(__dirname, "..", "components");
    for (const entry of readdirSync(dir)) {
      if (!entry.endsWith(".tsx")) continue;
      const content = readFileSync(path.join(dir, entry), "utf-8");
      expect(content.includes("—")).toBe(false);
    }
  });
});
