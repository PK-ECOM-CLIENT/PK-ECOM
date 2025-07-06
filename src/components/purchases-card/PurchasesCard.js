import React, { useState } from "react";
import "./purchasesCard.css";
import { useDispatch, useSelector } from "react-redux";
import { setApplicationModal } from "../../slices/system/systemSlice";
import { CustomModal } from "../custom-modal/CustomModal";
export const PurchasesCard = ({ image,orderDate,itemId }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { applicationModal } = useSelector((state) => state.system);
  const dispatch = useDispatch();
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  return (
    <div className="purchase-card">
      <div className="card-content">
        <div className="image-and-title">
          <div>
            <img className="product-image" src={image} alt="boots" />
          </div>
          <div className="product-title">Boots</div>
        </div>
        <div className="details">
          <div className="order-status">Ordered on: {orderDate}</div>
          <div className="product-link">{process.env.REACT_APP_ROOTURL}</div>
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
                <li
                  onClick={() =>
                    dispatch(
                      setApplicationModal({
                        title: "Contact Seller",
                        body: "contact-seller",
                      })
                    )
                  }
                >
                  Contact Seller
                </li>
                <li
                  onClick={() =>
                    dispatch(
                      setApplicationModal({
                        title: "Report Item",
                        body: "report-item",
                      })
                    )
                  }
                >
                  Report Item
                </li>
                <li
                  onClick={() =>
                    dispatch(
                      setApplicationModal({
                        title: "",
                        body: "leave-review",
                      })
                    )
                  }
                >
                  Leave Review
                </li>
                <li>Cancel Purchase</li>
                <li
                  onClick={() =>
                    dispatch(
                      setApplicationModal({
                        title: "Payment Details",
                        body: "payment-details",
                      })
                    )
                  }
                >
                  Payment Details
                </li>
                <li
                  onClick={() =>
                    dispatch(
                      setApplicationModal({
                        title: "Order Details",
                        body: "order-details",
                      })
                    )
                  }
                >
                  Order Details
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {applicationModal.state && <CustomModal></CustomModal>}
    </div>
  );
};
