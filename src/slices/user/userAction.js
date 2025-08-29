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

/** ---------- Helpers ---------- **/
const MAX_AUTH_MS = 7000; // fail-safe so we never hang the loader

const withTimeout = (promise, ms = MAX_AUTH_MS) =>
  Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("auth-timeout")), ms)
    ),
  ]);

/** ---------- Actions ---------- **/

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
  // clear redux state
  dispatch(setUser({}));
  dispatch(setFavourites([]));
  dispatch(setCart([]));
  // clear tokens
  sessionStorage.removeItem("accessJWT");
  localStorage.removeItem("refreshJWT");
  // do NOT touch 'hydrated' here; autoLogin controls it
};

export const getUserAction = (token) => async (dispatch) => {
  try {
    const { status, user } = await getUser(token);
    if (status === "success" && user && user._id) {
      dispatch(setUser(user));
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

// update users Address Action
export const updateUserAddressAction = (data) => async (dispatch) => {
  const { status, user } = await updateUserAddress(data);
  status === "success" && dispatch(setUser(user));
};

/**
 * Robust autoLogin:
 * - Shows loader (hydrated=false)
 * - Try access token -> /me
 * - Else try refresh -> new access -> /me
 * - On failure or timeout, clears tokens and sets guest user
 * - ALWAYS ends loader (hydrated=true) in finally
 */
export const autoLogin = () => async (dispatch) => {
  dispatch(setHydrated(false)); // start: show AuthLoading
  try {
    let loggedIn = false;

    const accessJWT = sessionStorage.getItem("accessJWT");
    const refreshJWT = localStorage.getItem("refreshJWT");

    // 1) Try access token
    if (accessJWT) {
      loggedIn = await withTimeout(dispatch(getUserAction(accessJWT)));
    }

    // 2) If not logged in, try refresh flow
    if (!loggedIn && refreshJWT) {
      const token = await withTimeout(getNewAccessJWT());
      if (token) {
        // persist new access for downstream calls if you want
        sessionStorage.setItem("accessJWT", token);
        loggedIn = await withTimeout(dispatch(getUserAction(token)));
      } else {
        // refresh failed → nuke tokens
        sessionStorage.removeItem("accessJWT");
        localStorage.removeItem("refreshJWT");
      }
    }

    // 3) If still guest, ensure clean guest state and tokens cleared
    if (!loggedIn) {
      dispatch(setUser({}));
      sessionStorage.removeItem("accessJWT");
      localStorage.removeItem("refreshJWT");
    }
  } catch {
    // Any error (including timeout) → guest
    dispatch(setUser({}));
    sessionStorage.removeItem("accessJWT");
    localStorage.removeItem("refreshJWT");
  } finally {
    // ALWAYS end loader so <HydrationGate> can render routes
    dispatch(setHydrated(true));
  }
};
