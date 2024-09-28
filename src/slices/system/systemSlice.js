import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  modalShow: true,
  favourites: [],
  cart: [],
  publicUrl: "",
  applicationModal: false,
};
const systemSlice = createSlice({
  name: "systemSlice",
  initialState,
  reducers: {
    setModalShow: (state) => {
      state.modalShow = !state.modalShow;
    },
    setapplicationModal: (state) => {
      state.applicationModal = !state.applicationModal;
    },
    setFavourites: (state, { payload = {} }) => {
      state.favourites = payload;
    },
    setCart: (state, { payload = {} }) => {
      state.cart = payload;
    },
    updateCartItem: (state, action) => {
      const { itemId, updatedCount, updatedFilter } = action.payload;
      const cartItemIndex = state.cart.findIndex((item) => item._id === itemId);

      if (cartItemIndex !== -1) {
        const updatedCartItem = {
          ...state.cart[cartItemIndex],
          count: updatedCount,
          filter: updatedFilter,
        };
        const updatedCart = [...state.cart];
        updatedCart[cartItemIndex] = updatedCartItem;
        state.cart = updatedCart;
      }
    },
    setPublicUrl: (state, action) => {
      state.publicUrl = action.payload;
    },
  },
});
const { reducer, actions } = systemSlice;
export const {
  setModalShow,
  setFavourites,
  setCart,
  setPublicUrl,
  updateCartItem,
  setApplicationModal,
} = actions;
export default reducer;
