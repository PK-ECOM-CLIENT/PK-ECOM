import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  products: [],
  categoryFilterProducts: [],
  selectedProduct: {},
};
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, { payload = [] }) => {
      state.products = payload;
    },
    setSelectedProduct: (state, { payload }) => {
      state.selectedProduct = payload;
    },
    // setCategoryFilterProducts: (state, { payload = [] }) => {
    //   state.categoryFilterProducts = payload;
    // },
  },
});
const { reducer, actions } = productsSlice;
export const { setProducts, setSelectedProduct } = actions;
export default reducer;
