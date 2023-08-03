import React from "react";
import "./buynowPage.css";
import { AppLayOut } from "../../components/layout/AppLayOut";
import { Button } from "react-bootstrap";

const BuyNowPage = () => {
  return (
    <div>
      <AppLayOut>
        <div className="buynow">
          <div className="buynow_details">
            <div className="buynow_details__firstname">
              First Name: Pradeep Kumar
            </div>
            <div className="buynow_details__lastname">Last Name: Dhital</div>
            <div className="buynow_details__email -util-textdecoration-none">
              Email: Pradeepdhital@gmail.com
            </div>
            <div className="buynow_details__phone">Phone: 0451644499</div>
            <div className="buynow_details__deliveryaddress">
              <div className="buynow_details__deliveryaddress-heading">
                Delivery Address
              </div>
              <div className="buynow_details__deliveryaddress_content">
                <div className="buynow_details__deliveryaddress_content-div">
                  <div className="buynow_details__deliveryaddress_content-items ">
                    <div className="buynow_details__deliveryaddress_content-items--subject">
                      Street Address
                    </div>
                    <div className="buynow_details__deliveryaddress_content-items--values">
                      302/1-3 Clarence Street
                    </div>
                  </div>
                  <div className="buynow_details__deliveryaddress_content-items ">
                    <div className="buynow_details__deliveryaddress_content-items--subject">
                      Suburb
                    </div>
                    <div className="buynow_details__deliveryaddress_content-items--values">
                      Strathfield
                    </div>
                  </div>
                  <div className="buynow_details__deliveryaddress_content-items ">
                    <div className="buynow_details__deliveryaddress_content-items--subject">
                      State
                    </div>
                    <div className="buynow_details__deliveryaddress_content-items--values">
                      NSW
                    </div>
                  </div>
                  <div className="buynow_details__deliveryaddress_content-items ">
                    <div className="buynow_details__deliveryaddress_content-items--subject">
                      Post Code
                    </div>
                    <div className="buynow_details__deliveryaddress_content-items--values">
                      2135
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="buynow_details__paymentmethods">
              <div className="buynow_details__paymentmethods-heading">
                Payment Methods
              </div>
              <div className="buynow_details__paymentmethods_content">
                <div className="buynow_details__paymentmethods-paymentmethod1">
                  <Button variant="none" className="paypal">
                    Pay Pal
                  </Button>
                </div>
                <div className="buynow_details__paymentmethods-paymentmethod2">
                  <Button variant="none" className="steppay">
                    Step Pay
                  </Button>
                </div>
                <div className="buynow_details__paymentmethods-paymentmethod3">
                  <Button variant="none" className="mastercard">
                    Master Card
                  </Button>
                </div>
              </div>
            </div>
            <div className="buynow_features d-flex gap-2">
              <div className="buynow_features1">
                <Button variant="none" size="lg" className="giftcard">
                  Add Gift Card
                </Button>
              </div>
              <div className="buynow_features2">
                <Button variant="none" size="lg" className="coupan">
                  Add Coupan
                </Button>
              </div>
            </div>
            <div className="buynow_details__noofitems">Number of items: 1</div>
            <div className="buynow_details__totalcost -util-brdr-btm-none">
              Total cost $: 2200
            </div>

            <div className="buynow_details__submitorder d-grid gap-2">
              <Button className="-util-btn-positive">Submit order</Button>
            </div>
          </div>
        </div>
      </AppLayOut>
    </div>
  );
};

export default BuyNowPage;
