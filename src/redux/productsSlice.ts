import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import getProducts from "../services/getProducts";
import { Product } from "../types";
import { calculateShipping, getDiscountType } from "../utilities/utilities";

export type ProductsState = {
  products: Product[];
  productsStatus: "idle" | "loading" | "succeeded" | "failed";
  productsError?: string | null;
  cart: Product[];
  shippingPrice: number;
  discount: number;
  totalPrice: number;
};

const initialState: ProductsState = {
  products: [],
  productsStatus: "idle",
  productsError: null,
  cart: [],
  discount: 0,
  shippingPrice: 0,
  totalPrice: 0,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const isProductInCart = state.cart.some(
        (product: Product) => product.id === action.payload.id
      );
      if (!isProductInCart) {
        state.cart.push(action.payload);
      } else {
        const addedProductIndex = state.cart.findIndex(
          (product: Product) => product.id === action.payload.id
        );
        state.cart.splice(addedProductIndex, 1, action.payload);
      }

      const allPrices = state.cart.map(
        (product) => product.price * product.quantitySelected
      );
      const updatedTotalPrice = allPrices.reduce(
        (prevState, currState) => prevState + currState,
        0
      );
      state.totalPrice = updatedTotalPrice;
      state.shippingPrice = calculateShipping(state.totalPrice);
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      const updatedProducts = state.cart.filter(
        (product) => product.id !== action.payload.id
      );
      state.cart = updatedProducts;

      const allPrices = state.cart.map(
        (product) => product.price * product.quantitySelected
      );
      const updatedTotalPrice = allPrices.reduce(
        (prevState, currState) => prevState + currState,
        0
      );
      state.totalPrice = updatedTotalPrice;
      state.shippingPrice = calculateShipping(state.totalPrice);
      state.discount = 0;
    },
    clearCart: (state) => {
      state.cart = [];
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const selectedProduct = selectProductFromAll(state, action.payload);
      selectedProduct && selectedProduct.quantitySelected++;
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const selectedProduct = selectProductFromAll(state, action.payload);
      if (selectedProduct && selectedProduct.quantitySelected > 0) {
        selectedProduct.quantitySelected--;
      }
    },
    calculateDiscount: (state) => {
      const discountData = getDiscountType();
      let discount = 0;

      switch (discountData.code) {
        case "APPL10":
          {
            const appleProducts = state.cart.find(
              (product) => product.supplierId === 1
            );

            if (appleProducts && discountData.discount) {
              const appleProductsTotalPrice =
                appleProducts?.price * appleProducts?.quantitySelected;
              discount = appleProductsTotalPrice * discountData.discount;
            } else {
              discount = 0;
            }
          }
          break;
        case "AUDIO15":
          {
            const audioProducts = state.cart.find((product) =>
              product.categories.includes("audio")
            );

            if (audioProducts && discountData.discount) {
              const audioProductsTotalPrice =
                audioProducts?.price * audioProducts?.quantitySelected;
              discount = audioProductsTotalPrice * discountData.discount;
            } else {
              discount = 0;
            }
          }
          break;
        case "ELEC25":
          {
            const electronicProducts = state.cart.find((product) =>
              product.categories.includes("electronic")
            );

            if (electronicProducts && discountData.discount) {
              const electronicProductsTotalPrice =
                electronicProducts?.price *
                electronicProducts?.quantitySelected;
              discount = electronicProductsTotalPrice * discountData.discount;
            } else {
              discount = 0;
            }
          }
          break;
        default:
          discount = state.shippingPrice;
      }

      state.discount = discount;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.productsStatus = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productsStatus = "succeeded";
        state.products = [...state.products, ...action.payload];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.productsStatus = "failed";
        state.productsError = action.error.message;
      });
  },
});

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  getProducts
);

export const selectProductFromAll = (state: ProductsState, id: number) =>
  state.products.find((product: Product) => product.id === id);

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  calculateDiscount,
} = productsSlice.actions;

export const productsReducer = productsSlice.reducer;
