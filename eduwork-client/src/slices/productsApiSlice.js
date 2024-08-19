import { apiSlice } from "./apiSlice";

const PRODUCTS_URL = "/api";

export const ProductsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProducts: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/products`,
        method: "POST",
        body: data,
      }),
    }),
    updateProducts: builder.mutation({
      query: ({ id, data }) => ({
        url: `${PRODUCTS_URL}/products/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    fetchProducts: builder.query({
      query: ({ page, limit, q, category, tags }) => ({
        url: `${PRODUCTS_URL}/products`,
        params: { skip: (page - 1) * limit, limit, q, category, tags },
        method: "GET",
      }),
      transformResponse: (res) => ({ products: res.data, total: res.count }),
    }),
    fetchCategories: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/categories`,
        method: "GET",
      }),
    }),
    fetchTags: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/tags`,
        method: "GET",
      }),
    }),
    deleteProducts: builder.mutation({
      query: (id) => ({
        url: `${PRODUCTS_URL}/products/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddProductsMutation,
  useUpdateProductsMutation,
  useDeleteProductsMutation,
  useFetchProductsQuery,
  useFetchCategoriesQuery,
  useFetchTagsQuery,
} = ProductsApiSlice;
