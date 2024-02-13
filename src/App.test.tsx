import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "../test/utils/test-utils";
import App from "./App";

describe("App", () => {
  it("should render successfully", () => {
    const { baseElement } = renderWithProviders(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(baseElement).toBeTruthy();
  });
});
