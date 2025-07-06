import { toast } from "react-toastify";
import {
  deleteCart,
  deleteFav,
  getCarts,
  getFavs,
  getIndividualItem,
  getPurchases,
  postCart,
  postFav,
} from "../../helpers/axiosHelper";
import {
  setCart,
  setFavourites,
  updateCartItem,
  setPurchases,
} from "./systemSlice";

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
    dispatch(
      updateCartItem({
        itemId,
        updatedCount,
        updatedFilter,
      })
    );
  };

// Purchases Action, here action also adds fresh catId, subCatId and productId for the purchases
export const getPurchasesAction = () => async (dispatch) => {
  const { status, purchases } = await getPurchases();

  if (status === "success") {
    const detailedPurchases = await Promise.all(
      purchases.map(async (purchase) => {
        try {
          const response = await getIndividualItem(purchase.itemId);
          if (response.status === "success" && response.items) {
            // Here 'items' is the item object (not an array for single id)
            const item = response.items;
            return {
              ...purchase,
              catId: item.catId || null,
              subCatId: item.subCatId || null,
              productId: item._id || null,
              name:item.name
            };
          } else {
            return {
              ...purchase,
              catId: null,
              subCatId: null,
              productId: null,
            };
          }
        } catch (error) {
          console.error("Failed to fetch item for purchase:", purchase.itemId, error);
          return {
            ...purchase,
            catId: null,
            subCatId: null,
            productId: null,
          };
        }
      })
    );

    dispatch(setPurchases(detailedPurchases));
  }
};