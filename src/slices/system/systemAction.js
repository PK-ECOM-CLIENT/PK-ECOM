import { toast } from "react-toastify";
import {
  deleteCart,
  deleteFav,
  getCarts,
  getFavs,
  getPurchases,
  postCart,
  postFav,
} from "../../helpers/axiosHelper";
import { setCart, setFavourites, updateCartItem,setPurchases} from "./systemSlice";

// Favs Action
export const getFavsAction = () => async (dispatch) => {
  const { status, favs } = await getFavs();
  status === "success" && dispatch(setFavourites(favs));
};
export const addFavsAction = (data) => async (dispatch) => {
  const promisePending = postFav(data);
  toast.promise(promisePending, { pending: "Please wait" });
  const { status, message } = await promisePending;
  toast[status](message);
  status === "success" && dispatch(getFavsAction());
};
export const deleteFavsAction = (_id) => async (dispatch) => {
  const promisePending = deleteFav(_id);
  toast.promise(promisePending, { pending: "Please wait" });
  const { status, message } = await promisePending;
  toast[status](message);
  status === "success" && dispatch(getFavsAction());
};
// Carts Action
export const getCartsAction = () => async (dispatch) => {
  const { status, carts } = await getCarts();
  status === "success" && dispatch(setCart(carts));
};
export const addCartsAction = (data) => async (dispatch) => {
  const promisePending = postCart(data);
  toast.promise(promisePending, { pending: "Please wait" });
  const { status, message } = await promisePending;
  toast[status](message);
  status === "success" && dispatch(getCartsAction());
};

export const deleteCartsAction = (_id) => async (dispatch) => {
  const promisePending = deleteCart(_id);
  toast.promise(promisePending, { pending: "Please wait" });
  const { status, message } = await promisePending;
  toast[status](message);
  status === "success" && dispatch(getCartsAction());
};
export const updateCartItemAction =
  (itemId, updatedCount, updatedFilter) => (dispatch) => {
    // Dispatch the updateCartItem action with the provided parameters
    dispatch(
      updateCartItem({
        itemId,
        updatedCount,
        updatedFilter,
      })
    );
  };
  // purchases action
  export const getPurchasesAction = () => async (dispatch) => {
  const { status, purchases } = await getPurchases();
  status === "success" && dispatch(setPurchases(purchases));
};