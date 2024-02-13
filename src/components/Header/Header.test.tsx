import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

describe("Header", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(baseElement).toBeTruthy();
  });
});
