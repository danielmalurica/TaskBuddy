import { apiSlice } from "../apiSlice";
import { User } from "../types/Types";



export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPost: builder.query<User, number>({
            query: (id) => `user/${id}`,
            providesTags: (result, error, id) => [{ type: 'Users', id }],
          }),
      register: builder.mutation<User, Partial<User>>({
        query: (data) => ({
          url: `user/create`,
          method: "POST",
          withCredentials: true,
          credentials: "include",
          body: data,
        }),
        invalidatesTags: ['Users'],
      }),
      login: builder.mutation<User, Partial<User>>({
        query: (data) => ({
          url: `user/login`,
          method: "POST",
          withCredentials: true,
          credentials: "include",
          body: data,
        }),
      }),
      logout: builder.mutation<void, void>({
        query: () => ({
          url: `user/logout`,
          method: "POST",
          withCredentials: true,
          credentials: "include",
        }),
      }),
    }),
  });

  export const {useGetPostQuery, useRegisterMutation, useLoginMutation, useLogoutMutation} = usersApiSlice