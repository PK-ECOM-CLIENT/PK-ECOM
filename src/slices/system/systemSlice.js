import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  modalShow: true,
};
const systemSlice = createSlice({
  name: "systemSlice",
  initialState,
  reducers: {
    setModalShow: (state) => {
      state.modalShow = !state.modalShow;
    },
  },
});
const { reducer, actions } = systemSlice;
export const { setModalShow } = actions;
export default reducer;
