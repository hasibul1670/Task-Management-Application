import { api } from "../../api/apiSlice";
const noteApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotes: builder.query({
      query: () => "/note",
      providesTags: ["category", "bgColor", "data", "noteDescription", "title"],
    }),

    singlenote: builder.query({
      query: (id) => `/note/${id}`,
    }),

    postNote: builder.mutation({
      query: ({ data }) => ({
        url: `/note/create-note`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [
        "category",
        "bgColor",
        "data",
        "noteDescription",
        "title",
      ],
    }),

    deleteNote: builder.mutation({
      query: (id) => ({
        url: `/note/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        "category",
        "bgColor",
        "data",
        "noteDescription",
        "title",
      ],
    }),

    editNote: builder.mutation({
      query: ({ id, data, headers }) => ({
        url: `note/${id}`,
        method: "PATCH",
        body: data,
        headers: headers,
      }),
      invalidatesTags: [
        "category",
        "bgColor",
        "data",
        "noteDescription",
        "title",
      ],
    }),
  }),
});

export const {
  useGetAllNotesQuery,
  useEditNoteMutation,
  usePostNoteMutation,
  useDeleteNoteMutation,
  useSinglenoteQuery,
} = noteApi;
