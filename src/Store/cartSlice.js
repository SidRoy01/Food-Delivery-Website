import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addCart: (state, action) => {
      state.items.push(action.payload);
    },
    removeCart: (state, action) => {
      state.items = state.items.filter((item) => item.id != action.payload.id);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addCart, removeCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
