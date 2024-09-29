import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  favourites: [],
  cart: [],
  publicUrl: "",
  applicationModal: {
    state: false,
    modalContent: {
      title: "",
      body: "",
    },
  },
};
const systemSlice = createSlice({
  name: "systemSlice",
  initialState,
  reducers: {
    setApplicationModal: (state, { payload }) => {
      state.applicationModal.state = !state.applicationModal.state; // Reverse the state
      state.applicationModal.modalContent = {
        title: payload.title, // Set new title
        body: payload.body, // Set new body content
      };
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
  setFavourites,
  setCart,
  setPublicUrl,
  updateCartItem,
  setApplicationModal,
} = actions;
export default reducer;
