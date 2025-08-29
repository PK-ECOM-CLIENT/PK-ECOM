// src/slices/user/userAction.js
import { toast } from "react-toastify";
import {
  getNewAccessJWT,
  getUser,
  loginUser,
  updateUserAddress,
} from "../../helpers/axiosHelper";
import { setUser, setHydrated } from "./userSlice";
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
  // auth state is now known (guest)
  dispatch(setHydrated(true));
};

export const getUserAction = (token) => async (dispatch) => {
  const { status, user } = await getUser(token);
  if (status === "success") {
    dispatch(setUser(user));
    return true;
  }
  return false;
};

export const updateUserAddressAction = (data) => async (dispatch) => {
  const { status, user } = await updateUserAddress(data);
  status === "success" && dispatch(setUser(user));
};

// >>> Critical: drive hydration from here <<<
export const autoLogin = () => async (dispatch) => {
  try {
    // We're starting an auth check
    dispatch(setHydrated(false));

    const accessJWT = sessionStorage.getItem("accessJWT");
    const refreshJWT = localStorage.getItem("refreshJWT");

    if (accessJWT) {
      // Use existing access token
      const ok = await dispatch(getUserAction(accessJWT));
      if (ok) {
        dispatch(setHydrated(true));
        return;
      }
      // fallthrough to refresh
    }

    if (refreshJWT) {
      // Try to refresh
      const token = await getNewAccessJWT();
      if (token) {
        const ok = await dispatch(getUserAction(token));
        dispatch(setHydrated(true));
        if (ok) return;
      } else {
        // refresh failed, clear tokens
        dispatch(logoutUserAction());
        return;
      }
    } else {
      // no tokens at all
      dispatch(logoutUserAction());
      return;
    }
  } catch (e) {
    // any unexpected failure → guest
    dispatch(logoutUserAction());
  }
};
