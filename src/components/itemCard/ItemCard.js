import React from "react";
import "./itemCard.css";
import { Link } from "react-router-dom";
import { addFavsAction } from "../../slices/system/systemAction";
import { useDispatch } from "react-redux";
export const ItemCard = ({
  name,
  img,
  price,
  id,
  ratingsRate,
  ratingsCount,
  location,
  onItemClick,
}) => {
  const dispatch = useDispatch();
  const handleOnAddToFav = (_id) => {
    const obj = { itemId: _id };
    dispatch(addFavsAction(obj));
  };
  return (
    <div className="itemCard">
      <div className="itemCard_img">
        <img
          src={img}
          className="itemCard_img__img"
          alt="itemimg"
          onClick={()=>onItemClick(id)}
          // crossOrigin="anonymous"
        ></img>
        {location === "item" || location === "selection" ? (
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
          {location === "fav" ? (
            <>
              {" "}
              <Link>Add to cart</Link>
              <Link>Remove from favs</Link>
            </>
          ) : location === "cart" ? (
            <Link>Add to favs</Link>
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
