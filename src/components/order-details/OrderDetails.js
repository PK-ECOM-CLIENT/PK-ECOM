import React from "react";
import "./orderDetails.css";

const OrderDetails = () => {
  return (
    <div className="order-details">
      <div className="order-info-section info-section">
        <div className="section-title">Order Info</div>
        <div className="order-section-content section-content">
          <div className="time-placed order-content">
            <div className="label">Time Placed:</div>
            <div className="value">29 Sep 2024 at 12:5 AM</div>
          </div>
          <div className="order-number order-content">
            <div className="label">Order Number:</div>
            <div className="value">3gder43dgdtt4ds324</div>
          </div>
          <div className="total-paid order-content">
            <div className="label">Total Paid:</div>
            <div className="value">AU $57</div>
          </div>
        </div>
      </div>

      <div className="delivery-info-section info-section">
        <div className="section-title">Delivery Info</div>
        <div className="delivery-section-content section-content">
          <div className="delivery-address delivery-content">
            <div className="label">Delivery Address:</div>
            <div className="value">
              101/6 Clarence Street Strathfield NSW 2135
            </div>
          </div>
          <div className="delivery-status delivery-content">
            <div className="label">Status:</div>
            <div className="value">--------------------------------------</div>
          </div>
          <div className="tracking-number delivery-content">
            <div className="label">Tracking Number:</div>
            <div className="value">8dfjd8yfhdf7ds9sd</div>
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
                src="https://media.istockphoto.com/id/474862754/photo/yellow-boots.jpg?s=612x612&w=0&k=20&c=wlaxHn6a5BOjOPGi92VypLutLfumhp6Woru6P_gFAww="
                alt=""
              />
            </div>
            <div className="value">
              Name of the item with the link to open it
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
