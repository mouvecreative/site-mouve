import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Nav } from "@/components/nav";

describe("Nav", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_MOUVE_WHATSAPP = "5511900000000";
  });

  it("links to all five pages", () => {
    render(<Nav />);
    expect(screen.getByRole("link", { name: /^Mouve$/i })).toBeDefined();
    expect(document.querySelectorAll(`a[href="/sobre"]`)).toHaveLength(1);
    expect(document.querySelectorAll(`a[href="/metodo"]`)).toHaveLength(1);
    expect(document.querySelectorAll(`a[href="/planos"]`)).toHaveLength(1);
    expect(document.querySelectorAll(`a[href="/contato"]`)).toHaveLength(1);
  });
});
