import axios from "axios";
const rootUrl = process.env.REACT_APP_API_ENDPOINT + "api/v1";
const categoriesEp = rootUrl + "/categories";
const productsEp = rootUrl + "/products";
const itemsEp = rootUrl + "/items";
const userEp = rootUrl + "/users";
const apiProcessor = async ({ method, url, data, isPrivate, token }) => {
  try {
    const headers = isPrivate
      ? { Authorization: token || sessionStorage.getItem("accessJWT") }
      : null;
    const response = await axios({
      method,
      url,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    let message = error.message;
    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem("accessJWT");
      localStorage.removeItem("refreshJWT");
    }
    if (error.response && error.response.data) {
      message = error.response.data.message;
    }
    if (message === "jwt expired") {
      // call the api to get new access jwt and store in the session and re-call the api processor
      const accessJWT = await getNewAccessJWT();
      if (accessJWT) {
        return apiProcessor({ method, url, data, isPrivate, token });
      }
    }
    return {
      status: "error",
      message,
    };
  }
};
//====================  User APIs
export const postUser = (data) => {
  const option = {
    method: "post",
    url: userEp,
    data,
  };
  return apiProcessor(option);
};
export const verifyUserEmail = (data) => {
  const option = {
    method: "patch",
    url: userEp + "/verify-email",
    data,
  };
  return apiProcessor(option);
};
export const loginUser = (data) => {
  const option = {
    method: "post",
    url: userEp + "/login",
    data,
  };
  return apiProcessor(option);
};
export const getUser = (token) => {
  const option = {
    method: "get",
    url: userEp,
    isPrivate: true,
    token,
  };
  return apiProcessor(option);
};

export const getNewAccessJWT = async () => {
  const option = {
    method: "get",
    url: userEp + "/accessjwt",
    isPrivate: true,
    token: localStorage.getItem("refreshJWT"),
  };
  const { status, accessJWT } = await apiProcessor(option);
  status === "success" && sessionStorage.setItem("accessJWT", accessJWT);
  return accessJWT;
};
// ====================Categories APIs
// Get all categories
export const getAllCategories = () => {
  const options = {
    method: "get",
    url: categoriesEp,
  };
  return apiProcessor(options);
};
// Get single category
// export const getSingleCategory = (_id) => {
//   const options = {
//     method: "get",
//     url: categoriesEp + "/" + _id,
//   };
//   return apiProcessor(options);
// };

// ============= Products APIs
// Get products
export const getProducts = () => {
  const options = {
    method: "get",
    url: productsEp,
  };
  return apiProcessor(options);
};
// Get single Product
export const getSingleProduct = (_id) => {
  const options = {
    method: "get",
    url: productsEp + "/" + _id,
  };
  return apiProcessor(options);
};

// Get all products of a specific categories
// export const getproductsbyCategory = (_cid) => {
//   const options = {
//     method: "get",
//     url: productsEp + "/categoriesfilter/" + _cid,
//   };
//   return apiProcessor(options);
// };

// ============= Items APIs
// get all items relevant to the product
export const getItemsByProduct = (_pid) => {
  const options = {
    method: "get",
    url: itemsEp + "/productfilter/" + _pid,
  };
  return apiProcessor(options);
};
// get individual item
export const getIndividualItem = (_iid) => {
  const options = {
    method: "get",
    url: itemsEp + "/" + _iid,
  };
  return apiProcessor(options);
};
