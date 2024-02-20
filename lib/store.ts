import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./features/image-generated/image-slice";

export const makeStore = () => {
  return configureStore({
    reducer: { image: imageReducer },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
