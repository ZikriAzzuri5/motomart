import { apiSlice } from "./apiSlice";

const CARTS_URL = "/api/carts";

export const CartsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateCarts: builder.mutation({
      query: (data) => ({
        url: `${CARTS_URL}`,
        method: "PUT",
        body: data,
      }),
    }),
    fetchCart: builder.query({
      query: () => ({
        url: `${CARTS_URL}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useFetchCartQuery, useUpdateCartsMutation } = CartsApiSlice;
