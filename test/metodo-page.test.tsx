import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Metodo from "@/app/metodo/page";

describe("Método page", () => {
  it("renders the vanity-vs-real metrics reframe and the process steps", () => {
    render(<Metodo />);
    expect(screen.getByText("Alimentam o ego")).toBeInTheDocument();
    expect(screen.getByText("Pagam o boleto")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Diagnóstico" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Execução" })).toBeInTheDocument();
  });
});
