import "@testing-library/jest-dom";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse, delay } from "msw";
import { setupServer } from "msw/node";
import { renderWithProviders } from "../../../test/utils/test-utils";
import ProductList from "./ProductList";
import { mockedUsers } from "../../mockData/mockData";

export const handlers = [
  http.get(
    "https://man-shopping-cart-test.azurewebsites.net/api/Products",
    async () => {
      await delay(150);
      return HttpResponse.json(mockedUsers);
    }
  ),
];

const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("ProductList", () => {
  it("should render successfully", () => {
    const { baseElement } = renderWithProviders(<ProductList />);

    expect(baseElement).toBeTruthy();
  });

  it("should close Cart modal on click clear button", async () => {
    renderWithProviders(<ProductList />);

    const quantityButton = screen.getByRole("button", { name: "+" });
    userEvent.click(quantityButton);
    const addToCartButton = screen.getByRole("button", { name: "Add to Cart" });
    userEvent.click(addToCartButton);
    const clearButton = screen.getByRole("button", { name: "Clear" });
    userEvent.click(clearButton);
    await waitFor(() =>
      expect(screen.queryByText("Total Cost")).not.toBeInTheDocument()
    );
  });
});
