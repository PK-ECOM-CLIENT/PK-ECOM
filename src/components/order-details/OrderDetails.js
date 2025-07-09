import React from "react";
import "./orderDetails.css";
import { useSelector } from "react-redux";
import { convertToAESTWithTimeZone } from "../../helpers/functions/dateConversion";
import { generateRandomId } from "../../helpers/functions/randomIdGenerate";
import { Link } from "react-router-dom";

const OrderDetails = () => {
      const { selectedPurchase } = useSelector((state) => state.system);
  
  return (
    <div className="order-details">
      <div className="order-info-section info-section">
        <div className="section-title">Order Info</div>
        <div className="order-section-content section-content">
          <div className="time-placed order-content">
            <div className="label">Time Placed:</div>
            <div className="value">{convertToAESTWithTimeZone(selectedPurchase.createdAt)}</div>
          </div>
          <div className="order-number order-content">
            <div className="label">Order Number:</div>
            <div className="value">{generateRandomId()}</div>
          </div>
          <div className="total-paid order-content">
            <div className="label">Total Paid:</div>
            <div className="value">AU {selectedPurchase.itemCount*selectedPurchase.itemPrice}</div>
          </div>
        </div>
      </div>

      <div className="delivery-info-section info-section">
        <div className="section-title">Delivery Info</div>
        <div className="delivery-section-content section-content">
          <div className="delivery-address delivery-content">
            <div className="label">Delivery Address:</div>
            <div className="value">
             { selectedPurchase.deliveryAddress }
            </div>
          </div>
          <div className="delivery-status delivery-content">
            <div className="label">Status:</div>
            <div className="value">Order received</div>
          </div>
          <div className="tracking-number delivery-content">
            <div className="label">Tracking Number:</div>
            <div className="value">{generateRandomId()}</div>
          </div>
        </div>
      </div>

      <div className="item-info-section info-section">
        <div className="section-title">Item Info</div>
        <div className="item-section-content section-content">
          <div className="item-details item-content">
            <div className="label">
              <img
                className="item-image"
                src={selectedPurchase.image}
                alt=""
              />
            </div>
            <div className="value">
               <Link
                          className="nav-link"
                          // to={`${process.env.REACT_APP_ROOTURL}/categories/${selectedPurchase.catId}/products/${selectedPurchase.productId}/item/${selectedPurchase.itemId}`}
                          to={`${process.env.REACT_APP_ROOTURL}/categories/${selectedPurchase.catId}/products/${selectedPurchase.productId}/item/${selectedPurchase.itemId}`}
                        >
                          Buy again
                        </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;