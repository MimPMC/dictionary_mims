import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../App";

describe("App", () => {
  it("renders headline", () => {
    render(<App />);
    expect(screen.getByText("Hello Dictionary!")).toBeInTheDocument();
  });
});