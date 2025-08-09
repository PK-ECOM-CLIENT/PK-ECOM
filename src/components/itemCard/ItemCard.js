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

// Font Awesome (already in your deps)
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

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
    if (
      window.confirm(
        "Are you sure, you want to remove the item from favourites?"
      )
    ) {
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
              className="itemCard_img__cart fa-solid fa-cart-shopping -util-font20"
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
        {/* Title */}
        <div className="itemCard_body__name -util-borderbottom">{name}</div>

        {/* Price + Rating row */}
        <div className="itemCard_meta -util-borderbottom">
          <div className="itemCard_price">${price}</div>

          {/* show actions on favs list */}
          {location === "favs" ? (
            <>
              <div
                className="itemCard__actionoptions"
                onClick={() => handleOnAddToCart(id)}
                title="Add to cart"
              >
                <i className="fa-solid fa-cart-shopping -util-font15"></i>
              </div>
              <div
                className="itemCard__actionoptions"
                onClick={() => handleOnDeleteFromFav(id)}
                title="Remove from favourites"
              >
                <i className="fa-solid fa-trash-can -util-trashcan"></i>
              </div>
            </>
          ) : null}

          <div className="itemCard_rating" aria-label="rating">
            <FontAwesomeIcon icon={faStar} className="star" />
            <span className="rate">{ratingsRate}</span>
            <span className="count">({ratingsCount})</span>
          </div>
        </div>

        {/* Description (only on selection page) */}
        {location === "selection" && description ? (
          <div className="itemCard_body__description">{description}</div>
        ) : null}
      </div>
    </div>
  );
};
