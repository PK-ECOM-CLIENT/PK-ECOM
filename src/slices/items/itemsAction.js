import { getIndividualItem, getItemsByProduct } from "../../helpers/axiosHelper";
import { setItems, setSelectedItem } from "./itemsSlice";
// Get all items
export const getItemsByProductAction = (_pid) => async (dispatch) => {
  const { status, items } = await getItemsByProduct(_pid);
  status === "success" && dispatch(setItems(items));
};
// get individual items
export const getIndividualItemAction = (_iid) => async (dispatch) => {
  const { status, items } = await getIndividualItem(_iid);
  status === "success" && dispatch(setSelectedItem(items));
};
