import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionHeading } from "@/components/section-heading";

describe("SectionHeading", () => {
  it("renders the eyebrow and title", () => {
    render(<SectionHeading eyebrow="Diferencial" title="Nem toda agência sustenta o que promete." />);
    expect(screen.getByText("Diferencial")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Nem toda agência sustenta o que promete." })
    ).toBeInTheDocument();
  });

  it("renders an h1 when as=\"h1\" is passed", () => {
    render(<SectionHeading as="h1" eyebrow="Sobre" title="Marcas fortes não acontecem por acaso." />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Marcas fortes não acontecem por acaso." })
    ).toBeInTheDocument();
  });
});
