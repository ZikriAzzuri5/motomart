import { apiSlice } from "./apiSlice";

const INVOICES_URL = "/api/invoices";

export const invoicesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchInvoices: builder.query({
      query: () => ({
        url: INVOICES_URL,
        method: "GET",
      }),
    }),
    fetchInvoiceById: builder.query({
      query: (order_id) => ({
        url: `${INVOICES_URL}/${order_id}`,
        method: "GET",
      }),
    }),
    updateInvoiceAndOrder: builder.mutation({
      query: (order_id) => ({
        url: `${INVOICES_URL}/${order_id}/pay`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useFetchInvoicesQuery,
  useFetchInvoiceByIdQuery,
  useUpdateInvoiceAndOrderMutation,
} = invoicesApiSlice;
