import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./productsSlice";

export const store = configureStore({
  reducer: productsReducer,
});

export type RootState = ReturnType<typeof productsReducer>;
export type AppDispatch = typeof store.dispatch;
