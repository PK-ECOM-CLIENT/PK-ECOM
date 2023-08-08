import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  modalShow: true,
  favourites: [],
  cart: [],
  publicUrl: "",
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
    setPublicUrl: (state,  action ) => {
      state.publicUrl = action.payload;
    },
  },
});
const { reducer, actions } = systemSlice;
export const { setModalShow, setFavourites, setCart, setPublicUrl } = actions;
export default reducer;
