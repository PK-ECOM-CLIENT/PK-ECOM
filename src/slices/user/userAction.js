import { toast } from "react-toastify";
import { loginUser } from "../../helpers/axiosHelper";
import { setUser } from "./userSlice";

export const logInUserAction = (data) => async (dispatch) => {
  const resultPromise = loginUser(data);
  toast.promise(resultPromise, { pending: "please wait..." });
  const { status, message, user } = await resultPromise;
  toast[status](message);
  if (status === "success") {
    dispatch(setUser(user));
  }
};
