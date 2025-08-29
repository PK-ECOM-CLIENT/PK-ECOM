// src/slices/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},       // logged-in user object
  hydrated: false // true ONLY after autoLogin finishes (success or fail)
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload = {} }) => {
      state.user = payload || {};
      // (optional) persist if you want:
      // localStorage.setItem("user", JSON.stringify(state.user));
    },
    setHydrated: (state, { payload = true }) => {
      state.hydrated = Boolean(payload);
    },
    clearUser: (state) => {
      state.user = {};
      state.hydrated = true; // auth state is known: guest
      // localStorage.removeItem("user");
    },
  },
});

export const { setUser, setHydrated, clearUser } = userSlice.actions;
export default userSlice.reducer;
