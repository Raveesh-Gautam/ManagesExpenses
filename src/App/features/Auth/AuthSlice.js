import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem("token") || null,
  email: localStorage.getItem("email") || null,
  isLoggedIn: !!localStorage.getItem("token")
};
export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredential: (state, action) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("email", action.payload.email);
    },
    logout: (state, action) => {
      state.token = null;
      state.email = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
  },
});

export const { setCredential, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
