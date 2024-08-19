import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    setCartItems(state, action) {
      state.cartItems = action.payload;
    },
    addToCart(state, action) {
      const item = action.payload;
      const existingItem = state.cartItems.find((x) => x._id === item._id);
      if (existingItem) {
        existingItem.qty += item.qty;
      } else {
        state.cartItems.push(item);
      }
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
    },
    decreaseItemQty(state, action) {
      const item = state.cartItems.find((x) => x._id === action.payload);
      if (item) {
        item.qty -= 1;
      }
    },
    clearCart(state) {
      state.cartItems = [];
    },
  },
});

export const {
  setCartItems,
  addToCart,
  removeFromCart,
  clearCart,
  decreaseItemQty,
} = cartSlice.actions;
export default cartSlice.reducer;
