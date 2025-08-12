import React from "react";
import "./orderDetails.css";
import { useSelector } from "react-redux";
import { convertToAESTWithTimeZone } from "../../helpers/functions/dateConversion";
import { generateRandomId } from "../../helpers/functions/randomIdGenerate";
import { Link } from "react-router-dom";

const formatAUD = (n) =>
  new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(
    Number(n || 0)
  );

const OrderDetails = () => {
  const { selectedPurchase } = useSelector((state) => state.system);

  const qty = Number(selectedPurchase?.itemCount || 0);
  const unit = Number(selectedPurchase?.itemPrice || 0);
  const total = qty * unit;

  return (
    <section className="od">
      {/* ORDER INFO */}
      <div className="od__section">
        <h3 className="od__title">Order Info</h3>
        <div className="od__grid">
          <div className="od__label">Time Placed:</div>
          <div className="od__value">
            {selectedPurchase?.createdAt
              ? convertToAESTWithTimeZone(selectedPurchase.createdAt)
              : ""}
          </div>

          <div className="od__label">Order Number:</div>
          <div className="od__value">{generateRandomId()}</div>

          <div className="od__label">Total Paid:</div>
          <div className="od__value od__strong">{formatAUD(total)}</div>
        </div>
      </div>

      {/* DELIVERY INFO */}
      <div className="od__section">
        <h3 className="od__title">Delivery Info</h3>
        <div className="od__grid">
          <div className="od__label">Delivery Address:</div>
          <div className="od__value">{selectedPurchase?.deliveryAddress}</div>

          <div className="od__label">Status:</div>
          <div className="od__value">
            <span className="od__badge">Order received</span>
          </div>

          <div className="od__label">Tracking Number:</div>
          <div className="od__value">{generateRandomId()}</div>
        </div>
      </div>

      {/* ITEM INFO */}
      <div className="od__section">
        <h3 className="od__title">Item Info</h3>
        <div className="od__itemrow">
          <img
            className="od__img"
            src={selectedPurchase?.image}
            alt="Ordered item"
          />
          <div className="od__itemmeta">
            <div className="od__small">
              Qty: {qty} × {formatAUD(unit)}
            </div>
            <Link
              className="od__link nav-link"
              to={`${process.env.REACT_APP_ROOTURL}/categories/${selectedPurchase?.catId}/products/${selectedPurchase?.productId}/item/${selectedPurchase?.itemId}`}
            >
              Buy again
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
