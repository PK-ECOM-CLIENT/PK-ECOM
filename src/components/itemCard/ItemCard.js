import React from "react";
import "./itemCard.css";
export const ItemCard = ({ name, img, price, ratingsRate, ratingsCount }) => {
  return (
    <div className="itemCard">
      <div className="itemCard_img">
        <img
          src={img}
          className="itemCard_img__img"
          alt="itemimg"
          // crossOrigin="anonymous"
        ></img>
        <i className="itemCard_img__fav fa-solid fa-heart -util-font20 ">
          <span className="addto ">Add to fav</span>
        </i>
        <i className="itemCard_img__cart fa-solid fa-cart-shopping -util-font20">
          <span className="addto addtocart">Add to Cart</span>
        </i>
      </div>
      <div className="itemCard_body">
        <div className="itemCard_body__name -util-borderbottom">{name}</div>

        <div className="itemCard_body__content -util-borderbottom">
          <div className="itemCard_body__content-price"> ${price}</div>
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
