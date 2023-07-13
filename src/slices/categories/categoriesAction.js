import { getAllCategories } from "../../helpers/axiosHelper";
import { setCategories } from "./categoriesSlice";

// get categories action
export const getCategoriesAction = () => async (dispatch) => {
  const { status, categories } = await getAllCategories();
  status === "success" && dispatch(setCategories(categories));
};

// get single category action
// export const getSingleCategoryAction = (_id) => async (dispatch) => {
//   const { status, categories } = await getSingleCategory(_id);
//   status === "success" && dispatch(setSelectedCategory(categories));
// };
