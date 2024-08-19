export const localStorageMiddleware = (storeAPI) => (next) => (action) => {
  const result = next(action);
  if (action.type.startsWith("cart/")) {
    const state = storeAPI.getState();
    localStorage.setItem("cart", JSON.stringify(state.cart.cartItems));
  }
  return result;
};
