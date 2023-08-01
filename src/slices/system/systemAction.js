import { toast } from "react-toastify";
import { deleteFav, getFavs, postFav } from "../../helpers/axiosHelper";
import { setFavourites } from "./systemSlice";

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