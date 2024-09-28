import React, { useState } from "react";
import boots from "./../../assits/images/offersimg/boots.jpg";
import "./purchasesCard.css";
import CustomModall from "../custom-modall/CustomModall";

export const PurchasesCard = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
    console.log("toggled");
  };

  return (
    <div className="purchase-card">
      <div className="card-content">
        <div className="image-and-title">
          <div>
            <img className="product-image" src={boots} alt="boots" />
          </div>
          <div className="product-title">Boots</div>
        </div>
        <div className="details">
          <div className="order-status">Ordered on: 16/09/2024</div>
          <div className="product-link">Link to the item</div>
          <div className="unit-price">24 AU</div>
        </div>
      </div>
      <div className="card-actions">
        <div className="buy-again-btn">Buy Again</div>
        <div className="more-actions">
          <div className="more-actions-btn" onClick={toggleDropdown}>
            More Actions
          </div>
          {dropdownVisible && (
            <div className="dropdown-meu">
              <ul className="more-actions-options">
                <li>Contact Seller</li>
                <li>Report Item</li>
                <li>Leave Review</li>
                <li>Cancel Purchase</li>
                <li>Payment Info</li>
                <li>Order Info</li>
              </ul>
              <CustomModall></CustomModall>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
