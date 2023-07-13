import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: [],
  selectedItem: {},
};
const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems: (state, { payload = [] }) => {
      state.items = payload;
    },
    setSelectedItem: (state, { payload }) => {
      state.selectedItem = payload;
    },
  },
});
const { reducer, actions } = itemsSlice;
export const { setItems, setSelectedItem } = actions;
export default reducer;
