import { getAllCategories } from "../../helpers/axiosHelper";
import { setCategories } from "./categoriesSlice";

// get categories action
export const getCategoriesAction = () => async (dispatch) => {
  try {
    const { status, categories } = await getAllCategories();
    status === "success" && dispatch(setCategories(categories));
  } catch (error) {
    console.log("Error while fetching the data from the database");
  }
};

// get single category action
// export const getSingleCategoryAction = (_id) => async (dispatch) => {
//   const { status, categories } = await getSingleCategory(_id);
//   status === "success" && dispatch(setSelectedCategory(categories));
// };
