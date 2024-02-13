import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../test/utils/test-utils";
import ProductItem from "./ProductItem";
import { mockedUser } from "../../mockData/mockData";

describe("ProductItem", () => {
  it("should render successfully", () => {
    const { baseElement } = renderWithProviders(
      <ProductItem {...mockedUser} />
    );

    expect(baseElement).toBeTruthy();
  });
});
