import React from 'react'
import boots from "./../../assits/images/offersimg/boots.jpg"
import "./purchasesCard.css"
export const PurchasesCard = () => {
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
        <div className="more-actions-btn">More Actions</div>
      </div>
    </div>
  );
};
