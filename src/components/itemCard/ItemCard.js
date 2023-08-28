import React from "react";
import "./itemCard.css";
import { useNavigate } from "react-router-dom";
import {
  addCartsAction,
  addFavsAction,
  deleteCartsAction,
  deleteFavsAction,
} from "../../slices/system/systemAction";
import { useDispatch, useSelector } from "react-redux";
import { setPublicUrl } from "../../slices/system/systemSlice";
export const ItemCard = ({
  name,
  img,
  price,
  id,
  ratingsRate,
  ratingsCount,
  location,
  catId,
  productId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const url = window.location.pathname;
  const handleOnAddToFav = (_id) => {
    if (!user._id) {
      dispatch(setPublicUrl(url));
      navigate("/login");
      return;
    }
    const obj = { itemId: _id };
    dispatch(addFavsAction(obj));
  };
  const handleOnAddToCart = (_id) => {
    if (!user._id) {
      dispatch(setPublicUrl(url));
      navigate("/login");
      return;
    }
    const obj = { itemId: _id, count: "1", filter: "" };
    dispatch(addCartsAction(obj));
  };
  const handleOnDeleteFromFav = (_id) => {
    if (
      window.confirm(
        "Are you sure, you want to remove the item from favourites?"
      )
    ) {
      dispatch(deleteFavsAction(_id));
    }
  };
  const handleOnDeleteFromCart = (_id) => {
    if (
      window.confirm("Are you sure, you want to remove the item from cart?")
    ) {
      dispatch(deleteCartsAction(_id));
    }
  };
  const handleOnItemClick = (catId, productId, id) => {
    navigate(`/categories/${catId}/products/${productId}/item/${id}`);
  };
  return (
    <div className="itemCard">
      <div className="itemCard_img">
        <img
          src={img}
          className="itemCard_img__img"
          alt="itemimg"
          onClick={
            () => handleOnItemClick(catId, productId, id)
          }
          // crossOrigin="anonymous"
        ></img>
        {location === "items" || location === "selection" ? (
          <div>
            <i
              className="itemCard_img__fav fa-solid fa-heart -util-font20"
              onClick={() => handleOnAddToFav(id)}
            >
              <span className="addto">Add to fav</span>
            </i>
            <i
              className="itemCard_img__cart fa-solid fa-cart-shopping -util-font20"
              onClick={() => handleOnAddToCart(id)}
            >
              <span className="addto addtocart">Add to Cart</span>
            </i>
          </div>
        ) : null}
      </div>
      <div className="itemCard_body">
        <div className="itemCard_body__name -util-borderbottom">{name}</div>
        <div className="itemCard_body__content -util-borderbottom">
          <div className="itemCard_body__content-price"> ${price}</div>
          {location === "favs" ? (
            <>
              <div
                className="itemCard__actionoptions"
                onClick={() => handleOnAddToCart(id)}
              >
                <i className="fa-solid fa-cart-shopping -util-font15"></i>
              </div>
              <div
                className="itemCard__actionoptions"
                onClick={() => handleOnDeleteFromFav(id)}
              >
                <i class="fa-solid fa-trash-can -util-trashcan"></i>
              </div>
            </>
          ) : location === "cart" ? (
            <>
              <div
                className="itemCard__actionoptions"
                onClick={() => handleOnAddToFav(id)}
              >
                <i className="fa-solid fa-heart -util-font15"></i>
              </div>
              <div
                className="itemCard__actionoptions"
                onClick={() => handleOnDeleteFromCart(id)}
              >
                <i class="fa-solid fa-trash-can -util-trashcan"></i>
              </div>
            </>
          ) : null}
          <div className="itemCard_body__content-ratings">
            <span className="itemCard_body__content-ratings-rate">
              {ratingsRate}
            </span>
            <span className="itemCard_body__content-ratings-count">
              ({ratingsCount})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
