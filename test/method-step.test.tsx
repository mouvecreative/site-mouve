import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MethodStep } from "@/components/method-step";

describe("MethodStep", () => {
  it("renders the step number, title and description", () => {
    render(
      <MethodStep
        number="01"
        title="Diagnóstico"
        description="Entendemos sua marca, seu mercado e onde estão as oportunidades reais."
      />
    );
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Diagnóstico" })).toBeInTheDocument();
  });
});
