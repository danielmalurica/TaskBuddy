import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'taskApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://taskbuddybackend.onrender.com/',  prepareHeaders: (headers) => {
        headers.set("Content-Type", "application/json");
        return headers;
      }, credentials: "include"}),
    tagTypes: ["Users", "Tasks"],
    endpoints: (builder) => ({}),
  })