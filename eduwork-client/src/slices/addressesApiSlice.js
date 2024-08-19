import { apiSlice } from "./apiSlice";

const ADDRESSES_URL = "/api/addresses";

export const addressesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAddress: builder.mutation({
      query: (data) => ({
        url: ADDRESSES_URL,
        method: "POST",
        body: data,
      }),
    }),
    updateAddress: builder.mutation({
      query: ({ id, data }) => ({
        url: `${ADDRESSES_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    fetchAddresses: builder.query({
      query: () => ({
        url: ADDRESSES_URL,
        method: "GET",
      }),
    }),
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `${ADDRESSES_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useFetchAddressesQuery,
} = addressesApiSlice;
