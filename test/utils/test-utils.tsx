import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { ProductsState, productsReducer } from "../../src/redux/productsSlice";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: ProductsState;
  store?: any;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {
      products: [],
      productsStatus: "idle",
      productsError: null,
      cart: [],
      discount: 0,
      shippingPrice: 0,
      totalPrice: 0,
    },
    store = configureStore({ reducer: productsReducer, preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
