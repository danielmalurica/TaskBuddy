import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/authSlice'
import { apiSlice } from "../features/apiSlice";

const store = configureStore({
  reducer: {
   auth: authReducer,
   [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: false
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch