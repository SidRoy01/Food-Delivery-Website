import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authenticationReducer from "./authenticationSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    authentication: authenticationReducer,
  },
});

export default store;
