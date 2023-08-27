import React from "react";
import "./cartPage.css";
import { AppLayOut } from "../../components/layout/AppLayOut";
// import { useSelector } from "react-redux";
import { CartCard } from "../../components/cart-card/CartCard";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const Cart = () => {
  // const { cart } = useSelector((state) => state.system);
  return (
    <AppLayOut>
      <div className="items">
        <h1 className="text-center">Cart Page still  under development</h1>
        <div className="cart_body">
          <div className="cart_body__items">
            <CartCard></CartCard>
            <CartCard></CartCard>
            <CartCard></CartCard>
            <CartCard></CartCard>
            <CartCard></CartCard>
            <CartCard></CartCard>
            <CartCard></CartCard>
            <CartCard></CartCard>
          </div>
          <div className="cart_body__checkout">
            <div className="checkout_div">
              <div className="checkout_flex">
                <h4 className="cart_body__checkout-heading">Cart Summary</h4>
                <div className="cart_body__checkout-productCount">
                  <div className="cart_body__checkout-productCount-text">
                    Total number of products:
                  </div>
                  <div className="cart_body__checkout-productCount-value">
                    7
                  </div>
                </div>
                <div className="cart_body__checkout-productTotal">
                  <div className="cart_body__checkout-productTotal-text">
                    Total product cost:
                  </div>
                  <div className="cart_body__checkout-productTotal-value">
                    $450
                  </div>
                </div>
                <div className="cart_body__checkout-gst">
                  <div className="cart_body__checkout-gst-text">GST:</div>
                  <div className="cart_body__checkout-gst-value">$32</div>
                </div>
                <div className="cart_body__checkout-delivery">
                  <div className="cart_body__checkout-delivery-text">
                    Delivery:
                  </div>
                  <div className="cart_body__checkout-delivery-value">$55</div>
                </div>
                <div className="cart_body__checkout-total -util-brdr-btm-none">
                  <div className="cart_body__checkout-total-text">
                    Subtotal:
                  </div>
                  <div className="cart_body__checkout-total-value">$750</div>
                </div>
              </div>

              <div className="d-grid">
                <Button size="lg" className="-util-btn-positive mb-1">
                  Buy Now
                </Button>
              </div>

              <p className="checkout_paragraph">
                By checking out, you are agreeing to our &nbsp;
                <Link to="">Terms and Conditions</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayOut>
  );
};

export default Cart;
