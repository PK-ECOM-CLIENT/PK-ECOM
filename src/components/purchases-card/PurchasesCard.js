import React from "react";
import "./purchasesCard.css";
import { useDispatch, useSelector } from "react-redux";
import { setApplicationModal } from "../../slices/system/systemSlice";
import { CustomModal } from "../custom-modal/CustomModal";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export const PurchasesCard = ({
  name,
  image,
  orderDate,
  catId,
  productId,
  itemId,
  itemPrice,
  dropdownVisible,
  onToggleDropdown,
}) => {
  const { applicationModal } = useSelector((state) => state.system);
  const dispatch = useDispatch();

  return (
    <div className="purchase-card">
      <div className="card-content">
        <div className="image-and-title">
          <div>
            <img className="product-image" src={image} alt="product" />
          </div>
          <div className="product-title">{name}</div>
        </div>
        <div className="details">
          <div className="order-status">Ordered on: {orderDate}</div>
          <Link
            className="nav-link"
            to={`${process.env.REACT_APP_ROOTURL}/categories/${catId}/products/${productId}/item/${itemId}`}
          >
            {name}
          </Link>
          <div className="unit-price">{itemPrice}$</div>
        </div>
      </div>

      <div className="card-actions">
        <Button>
          <Link
            className="nav-link"
            to={`${process.env.REACT_APP_ROOTURL}/categories/${catId}/products/${productId}/item/${itemId}`}
          >
            Buy again
          </Link>
        </Button>

        <div className="more-actions">
          <div className="more-actions-btn" onClick={() => onToggleDropdown(itemId)}>
            More Actions
          </div>
          {dropdownVisible && (
            <div className="dropdown-meu">
              <ul className="more-actions-options">
                <li onClick={() => dispatch(setApplicationModal({ title: "Contact Seller", body: "contact-seller" }))}>
                  Contact Seller
                </li>
                <li onClick={() => dispatch(setApplicationModal({ title: "Report Item", body: "report-item" }))}>
                  Report Item
                </li>
                <li onClick={() => dispatch(setApplicationModal({ title: "", body: "leave-review" }))}>
                  Leave Review
                </li>
                <li>Cancel Purchase</li>
                <li onClick={() => dispatch(setApplicationModal({ title: "Payment Details", body: "payment-details" }))}>
                  Payment Details
                </li>
                <li onClick={() => dispatch(setApplicationModal({ title: "Order Details", body: "order-details" }))}>
                  Order Details
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {applicationModal.state && <CustomModal />}
    </div>
  );
};
