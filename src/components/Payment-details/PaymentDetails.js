import React from "react";
import "./paymentDetails.css";
import { useSelector } from "react-redux";
import { convertToAESTWithTimeZone } from "../../helpers/functions/dateConversion";
const PaymentDetails = () => {
    const { selectedPurchase } = useSelector((state) => state.system);
  console.log(selectedPurchase);
  return (
    <div>
      <div className="card-info">
        <svg
          width="50"
          height="32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20.303 8.113h9.395v15.55h-9.395V8.113Z" fill="#FF5F00" />
          <path
            d="M39.856 21.7v.318h-.059v-.319h-.127v-.066h.322v.066h-.136Zm.627-.067v.385h-.066v-.291l-.106.25h-.074l-.106-.25v.29h-.07v-.384h.098l.113.275.114-.275h.097Z"
            fill="#F79E1B"
          />
          <path
            d="M21.273 15.888A9.917 9.917 0 0 1 25 8.115 9.667 9.667 0 0 0 11.8 9.18c-3.453 3.789-3.453 9.63 0 13.419A9.667 9.667 0 0 0 25 23.664a9.912 9.912 0 0 1-3.727-7.776Z"
            fill="#EB001B"
          />
          <path
            d="M40.79 15.888c0 3.786-2.134 7.24-5.494 8.895A9.654 9.654 0 0 1 25 23.663a9.936 9.936 0 0 0 3.728-7.775c0-3.034-1.374-5.9-3.728-7.774a9.654 9.654 0 0 1 10.294-1.12c3.36 1.655 5.494 5.107 5.494 8.893v.001h.002Z"
            fill="#F79E1B"
          />
        </svg>
        <div className="card-details">
          <div className="card-number">Ending in {selectedPurchase.cardEnding}</div>
          <div className="card-holder-name">{selectedPurchase.cardHolderName}</div>
        </div>
        <div className="payment-info">
          <div className="price-paid">{selectedPurchase.itemCount*selectedPurchase.itemPrice}</div>
          <div className="time-paid">{convertToAESTWithTimeZone(selectedPurchase.createdAt)}</div>
        </div>
      </div>
      <div className="order-details">
        <div className="items-summary">
          <div className="item-count">{selectedPurchase.itemCount} items</div>
          <div className="items-price">{selectedPurchase.itemPrice}</div>
        </div>
        <div className="postage-details">
          <div className="postage-text">Postage</div>
          <div className="postage-cost">AU $15</div>
        </div>
        <div className="voucher-details">
          <div className="voucher-text">Voucher discount</div>
          <div className="voucher-discount">AU $5</div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
