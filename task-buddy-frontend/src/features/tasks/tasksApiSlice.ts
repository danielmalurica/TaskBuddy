import { apiSlice } from "../apiSlice";
import { DataResponse, Task } from "../types/Types";


export const tasksApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTasksByUser: builder.query<DataResponse<Task>, string>({
            query: (id) => `task/${id}`,
            providesTags: (result, error, id) => [{ type: 'Tasks', id }],
          }),
          getTaskById: builder.query<Task, string>({
            query: () => `task/getById`,
            providesTags: (result, error, id) => [{ type: 'Tasks', id }],
          }),
          addPost: builder.mutation<Task, Partial<Task>>({
            query(body) {
              return {
                url: `task/add`,
                method: 'POST',
                body,
              }
            },
            invalidatesTags: ['Tasks'],
          }),
          updatePost: builder.mutation<Task, Partial<Task>>({
            query(body) {
               return {
                url: `task/update/${body._id}`,
                method: 'PUT',
                body 
              }  
            },
            invalidatesTags: ['Tasks'],
          }),
          deletePost: builder.mutation<Task, string>({
            query(_id) {
              return {
                url: `task/delete/${_id}`,
                method: 'DELETE',
              }
            },
            invalidatesTags: ['Tasks'],
          }),
    }),
  });


export const {useGetTasksByUserQuery, useGetTaskByIdQuery, useAddPostMutation, useUpdatePostMutation, useDeletePostMutation} = tasksApiSlice;