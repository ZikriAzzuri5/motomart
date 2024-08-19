import { apiSlice } from "./apiSlice";

const ORDERS_URL = "/api/orders";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
        method: "GET",
      }),

      providesTags: ["Order"],
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: ORDERS_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const { useCreateOrderMutation, useFetchOrdersQuery } = ordersApiSlice;
