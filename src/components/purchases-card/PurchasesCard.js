import React, { useState } from "react";
import "./purchasesCard.css";
import CustomModall from "../custom-modall/CustomModall";

export const PurchasesCard = ({imgsource}) => {
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
            <img className="product-image" src={imgsource} alt="boots" />
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
              <CustomModall>
                <div className="modal-content">
                  <div className="card-info">
                    <svg
                      width="50"
                      height="32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.303 8.113h9.395v15.55h-9.395V8.113Z"
                        fill="#FF5F00"
                      ></path>
                      <path
                        d="M39.856 21.7v.318h-.059v-.319h-.127v-.066h.322v.066h-.136Zm.627-.067v.385h-.066v-.291l-.106.25h-.074l-.106-.25v.29h-.07v-.384h.098l.113.275.114-.275h.097Z"
                        fill="#F79E1B"
                      ></path>
                      <path
                        d="M21.273 15.888A9.917 9.917 0 0 1 25 8.115 9.667 9.667 0 0 0 11.8 9.18c-3.453 3.789-3.453 9.63 0 13.419A9.667 9.667 0 0 0 25 23.664a9.912 9.912 0 0 1-3.727-7.776Z"
                        fill="#EB001B"
                      ></path>
                      <path
                        d="M40.79 15.888c0 3.786-2.134 7.24-5.494 8.895A9.654 9.654 0 0 1 25 23.663a9.936 9.936 0 0 0 3.728-7.775c0-3.034-1.374-5.9-3.728-7.774a9.654 9.654 0 0 1 10.294-1.12c3.36 1.655 5.494 5.107 5.494 8.893v.001h.002Z"
                        fill="#F79E1B"
                      ></path>
                    </svg>
                    <div className="card-details">
                      <div className="card-no">Ending in 4242</div>
                      <div className="holder-name">Card holder name</div>
                    </div>
                    <div>
                      <div className="price-paid">AU $92.00</div>
                      <div className="time-paid">29 Sep at 10:46 PM</div>
                    </div>
                  </div>
                  <div className="all-details">
                    <div className="itemsnprice">
                      <div className="item-count">3 items</div>
                      <div className="items-price">AU $56</div>
                    </div>
                    <div className="postagedetails">
                      <div className="postage-text">Postage</div>
                      <div className="postage-cost">AU $15</div>
                    </div>
                    <div className="voucher-details">
                      <div className="voucher-text">Voucher discount</div>
                      <div className="voucher-discount">AU $5</div>
                    </div>
                  </div>
                </div>
              </CustomModall>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
