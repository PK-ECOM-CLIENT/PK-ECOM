import React from "react";
import "./itemCard.css";
import { useNavigate } from "react-router-dom";
import {
  addFavsAction,
  deleteFavsAction,
} from "../../slices/system/systemAction";
import { useDispatch } from "react-redux";
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
  const handleOnAddToFav = (_id) => {
    const obj = { itemId: _id };
    dispatch(addFavsAction(obj));
  };
  const handleOnDeleteFromFav = (_id) => {
     if (window.confirm("Are you sure, you want to remove the item from favs list?")) {
        dispatch(deleteFavsAction(_id));
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
            location === "items" || location === "favs"
              ? () => handleOnItemClick(catId, productId, id)
              : null
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
            <i className="itemCard_img__cart fa-solid fa-cart-shopping -util-font20">
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
              <div className="itemCard__actionoptions">Add to cart</div>
              <div
                className="itemCard__actionoptions"
                onClick={() => handleOnDeleteFromFav(id)}
              >
                Remove from favs{" "}
              </div>
            </>
          ) : location === "cart" ? (
            <>
              <div className="itemCard__actionoptions">Add to favs</div>
              <div className="itemCard__actionoptions">Remove from cart </div>
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
