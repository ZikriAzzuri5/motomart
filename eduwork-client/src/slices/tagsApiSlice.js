import { apiSlice } from "./apiSlice";

const TAGS_URL = "/api";

export const TagsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addTags: builder.mutation({
      query: (data) => ({
        url: `${TAGS_URL}/tags`,
        method: "POST",
        body: data,
      }),
    }),
    updateTags: builder.mutation({
      query: ({ id, data }) => ({
        url: `${TAGS_URL}/tags/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    fetchTags: builder.query({
      query: () => ({
        url: `${TAGS_URL}/tags`,
        method: "GET",
      }),
    }),
    deleteTags: builder.mutation({
      query: (id) => ({
        url: `${TAGS_URL}/tags/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddTagsMutation,
  useUpdateTagsMutation,
  useDeleteTagsMutation,
  useFetchTagsQuery,
} = TagsApiSlice;
