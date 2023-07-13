import { getProducts, getSingleProduct } from "../../helpers/axiosHelper";
import { setProducts, setSelectedProduct } from "./productsSlice";

//
export const getProductsAction = () => async (dispatch) => {
  const { status, products } = await getProducts();
  status === "success" && dispatch(setProducts(products));
};

export const getSingleProductAction = (_pid) => async (dispatch) => {
  const { status, products } = await getSingleProduct(_pid);
  status === "success" && dispatch(setSelectedProduct(products));
};
