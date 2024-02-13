import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../test/utils/test-utils";
import Cart from "./Cart";

describe("Cart", () => {
  //add more tests
  it("should render successfully", () => {
    const { baseElement } = renderWithProviders(<Cart />);

    expect(baseElement).toBeTruthy();
  });
});
