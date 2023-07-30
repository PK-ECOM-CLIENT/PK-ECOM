import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  modalShow: true,
  favourites: [],
  cart: [],
};
const systemSlice = createSlice({
  name: "systemSlice",
  initialState,
  reducers: {
    setModalShow: (state) => {
      state.modalShow = !state.modalShow;
    },
    setFavourites: (state, { payload = {} }) => {
      state.favourites = payload;
    },
    setCart: (state, { payload = {} }) => {
      state.cart = payload;
    },
  },
});
const { reducer, actions } = systemSlice;
export const { setModalShow, setFavourites, setCart } = actions;
export default reducer;
