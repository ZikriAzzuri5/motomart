import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";
import cartReducer from "./slices/cartSlice";
// import orderReducer from "./slices/orderSlice";

import { localStorageMiddleware } from "./slices/localStorageMiddleware";
import { ordersApiSlice } from "./slices/ordersApiSlice";

const loadCartFromLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

const preloadedState = {
  cart: {
    cartItems: loadCartFromLocalStorage(),
  },
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    [ordersApiSlice.reducerPath]: ordersApiSlice.reducer,

    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, localStorageMiddleware),
  devTools: true,
  preloadedState,
});

export default store;
