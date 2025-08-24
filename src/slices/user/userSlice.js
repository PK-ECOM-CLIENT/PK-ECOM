// src/slices/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {}, // your logged-in user object
  hydrated: false, // becomes true once we've loaded user (from storage/API)
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload = {} }) => {
      state.user = payload || {};
    },
    setHydrated: (state, { payload = true }) => {
      state.hydrated = Boolean(payload);
    },
    clearUser: (state) => {
      state.user = {};
      state.hydrated = true; // state is known (no user)
    },
  },
});

export const { setUser, setHydrated, clearUser } = userSlice.actions;
export default userSlice.reducer;
