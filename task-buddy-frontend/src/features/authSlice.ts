import { createSlice} from '@reduxjs/toolkit'


interface User {
  _id: string,
  username: string,
  todos: []
}

interface AuthState {
  userInfo: User | null

}

const storedUserInfoString = localStorage.getItem("userInfo");

const storedUserInfo = storedUserInfoString
  ? JSON.parse(storedUserInfoString)
  : null;

  console.log(storedUserInfo)

const initialState: AuthState = {
  userInfo: storedUserInfo
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
   setCredentials: (state, action) => {
     state.userInfo = action.payload.user
    localStorage.setItem("userInfo", JSON.stringify(action.payload.user)); 

   },
   removeCredentials: (state) => {
    state.userInfo = null;
   }
  },
})

export const { setCredentials, removeCredentials } = authSlice.actions

export default authSlice.reducer