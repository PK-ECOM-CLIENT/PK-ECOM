import createSLice from "@reduxjs/toolkit";
const initialState = {
  categoriesList: [],
  selectedCategory: {},
};
const categoriesSlice = createSLice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, { payload = [] }) => {
      state.categoriesList = payload;
    },
    setSelectedCategories: (state, { payload }) => {
      state.selectedCategory = payload;
    },
  },
});
const { reducer, actions } = categoriesSlice;
export const { setCategories, setSelectedCategories } = actions;
export default reducer;
