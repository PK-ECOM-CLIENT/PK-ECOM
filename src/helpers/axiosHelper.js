import axios from "axios";
const rootUrl = process.env.REACT_APP_API_ENDPOINT;
const categoriesEp = rootUrl + "/categories";
const productsEp = rootUrl + "/products";
const itemsEp = rootUrl + "/items";

const apiProcessor = async ({ method, url, data }) => {
  try {
    const response = await axios({
      method,
      url,
      data,
    });
    return response.data;
  } catch (error) {}
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
// Get single category
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
