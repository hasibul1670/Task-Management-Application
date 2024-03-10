/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../Providers/AuthProvider";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    //baseUrl: "http://localhost:5000/api/v1",
     baseUrl: `${baseUrl}`,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["category", "bgColor", "noteDescription", "data", "title"],

  endpoints: () => ({}),
});
