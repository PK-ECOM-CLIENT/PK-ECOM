import { toast } from "react-toastify";
import {
  getNewAccessJWT,
  getUser,
  loginUser,
  updateUserAddress,
} from "../../helpers/axiosHelper";
import { setUser } from "./userSlice";
import { setCart, setFavourites } from "../system/systemSlice";

export const logInUserAction = (data) => async (dispatch) => {
  const resultPromise = loginUser(data);
  toast.promise(resultPromise, { pending: "please wait..." });
  const { status, message, user, refreshJWT, accessJWT } = await resultPromise;
  toast[status](message);
  if (status === "success") {
    sessionStorage.setItem("accessJWT", accessJWT);
    localStorage.setItem("refreshJWT", refreshJWT);
    dispatch(setUser(user));
    return status;
  }
};
export const logoutUserAction = () => (dispatch) => {
  dispatch(setUser({}));
  dispatch(setFavourites([]));
  dispatch(setCart([]));
  sessionStorage.removeItem("accessJWT");
  localStorage.removeItem("refreshJWT");
};
export const getUserAction = (token) => async (dispatch) => {
  const { status, user } = await getUser(token);
  status === "success" && dispatch(setUser(user));
};
// update users Address Action
export const updateUserAddressAction = (data) => async (dispatch) => {
  const { status, user } = await updateUserAddress(data);
  status === "success" && dispatch(setUser(user));
};
export const autoLogin = () => async (dispatch) => {
  const accessJWT = sessionStorage.getItem("accessJWT");
  const refreshJWT = localStorage.getItem("refreshJWT");
  // if accessJWT exist, fetch user and mount user in out redux store
  if (accessJWT) {
    dispatch(getUserAction());
  }

  // if only refreshJWT exist , fetch new access JWT and fetch user using newly fetched accessJWT
  else if (refreshJWT) {
    const token = await getNewAccessJWT();
    token ? dispatch(getUserAction(token)) : dispatch(logoutUserAction());
  } else {
    dispatch(logoutUserAction());
  }
};
