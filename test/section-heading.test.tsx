import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionHeading } from "@/components/section-heading";

describe("SectionHeading", () => {
  it("renders the eyebrow and title", () => {
    render(<SectionHeading eyebrow="Diferencial" title="Nem toda agência sustenta o que promete." />);
    expect(screen.getByText("Diferencial")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Nem toda agência sustenta o que promete." })
    ).toBeInTheDocument();
  });
});
