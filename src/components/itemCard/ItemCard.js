import React from "react";
import "./itemCard.css";
import { useNavigate } from "react-router-dom";
import {
  addCartsAction,
  addFavsAction,
  deleteFavsAction,
} from "../../slices/system/systemAction";
import { useDispatch, useSelector } from "react-redux";
import { setPublicUrl } from "../../slices/system/systemSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export const ItemCard = ({
  name,
  img,
  price,
  id,
  ratingsRate,
  ratingsCount,
  location,     // "items" | "selection" | "favs"
  catId,
  productId,
  description,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const url = window.location.pathname;

  const requireLogin = () => {
    dispatch(setPublicUrl(url));
    navigate("/login");
  };

  const handleOnAddToFav = (_id) => {
    if (!user._id) return requireLogin();
    dispatch(addFavsAction({ itemId: _id }));
  };

  const handleOnAddToCart = (_id) => {
    if (!user._id) return requireLogin();
    dispatch(addCartsAction({ itemId: _id, count: "1", filter: "" }));
  };

  const handleOnDeleteFromFav = (_id) => {
    if (!user._id) return requireLogin();
    if (window.confirm("Remove this item from favourites?")) {
      dispatch(deleteFavsAction(_id));
    }
  };

  const handleOnItemClick = (catId, productId, id) => {
    if (!catId || !productId || !id) return;
    navigate(`/categories/${catId}/products/${productId}/item/${id}`);
  };

  return (
    <div className="itemCard">
      {/* Image */}
      <div className="itemCard_img">
        <img
          src={img}
          className="itemCard_img__img"
          alt={name || "item"}
          onClick={() => handleOnItemClick(catId, productId, id)}
        />

        {/* Overlay icons ONLY on items & selection (NOT on favs) */}
        {(location === "items" || location === "selection") && (
          <div>
            <i
              className="itemCard_img__fav fa-solid fa-heart -util-font20"
              onClick={() => handleOnAddToFav(id)}
              aria-label="Add to favourites"
              title="Add to favourites"
            >
              <span className="addto">Add to fav</span>
            </i>

            <i
              className="itemCard_img__cart fa-solid fa-cart-shopping"
              onClick={() => handleOnAddToCart(id)}
              aria-label="Add to cart"
              title="Add to cart"
            >
              <span className="addto addtocart">Add to Cart</span>
            </i>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="itemCard_body">
        <div className="itemCard_body__name -util-borderbottom">{name}</div>

        {/* Meta row */}
        {location === "favs" ? (
          // FAVOURITES: centered row with price + rating + actions (always visible)
          <div className="itemCard_meta itemCard_meta--favs -util-borderbottom">
            <div className="itemCard_price">${price}</div>

            <div className="itemCard_rating" aria-label="rating">
              <FontAwesomeIcon icon={faStar} className="star" />
              <span className="rate">{ratingsRate}</span>
              <span className="count">({ratingsCount})</span>
            </div>

            <div className="itemCard_actions">
              <button
                type="button"
                className="itemCard_action"
                onClick={() => handleOnAddToCart(id)}
                aria-label="Add to cart"
                title="Add to cart"
              >
                <i className="fa-solid fa-cart-shopping"></i>
              </button>

              <button
                type="button"
                className="itemCard_action"
                onClick={() => handleOnDeleteFromFav(id)}
                aria-label="Remove from favourites"
                title="Remove from favourites"
              >
                <i className="fa-solid fa-trash-can -util-trashcan"></i>
              </button>
            </div>
          </div>
        ) : (
          // ITEMS / SELECTION: price left, rating right, no inline actions
          <div className="itemCard_meta -util-borderbottom">
            <div className="itemCard_price">${price}</div>
            <div className="itemCard_rating" aria-label="rating">
              <FontAwesomeIcon icon={faStar} className="star" />
              <span className="rate">{ratingsRate}</span>
              <span className="count">({ratingsCount})</span>
            </div>
          </div>
        )}

        {/* Only selection page shows description */}
        {location === "selection" && description ? (
          <div className="itemCard_body__description">{description}</div>
        ) : null}
      </div>
    </div>
  );
};
