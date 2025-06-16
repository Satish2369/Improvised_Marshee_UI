// userSlice.js
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true, 
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    removeUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});


export const { addUser, removeUser, setLoading } = userSlice.actions;
export default userSlice.reducer;
