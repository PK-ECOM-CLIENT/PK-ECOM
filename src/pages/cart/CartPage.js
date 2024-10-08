import React, { useState } from "react";
import "./cartPage.css";
import { AppLayOut } from "../../components/layout/AppLayOut";
import { useDispatch, useSelector } from "react-redux";
import { CartCard } from "../../components/cart-card/CartCard";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { createStripeSession } from "../../helpers/axiosHelper";
import { setApplicationModal } from "../../slices/system/systemSlice";
import { CustomModal } from "../../components/custom-modal/CustomModal";
const Cart = () => {
  const { cart } = useSelector((state) => state.system);
  const { user } = useSelector((state) => state.user);
  const { applicationModal } = useSelector((state) => state.system);
  const dispatch = useDispatch();

  const { totalItems, totalPrice } = cart.reduce(
    (accumulator, item) => {
      return {
        totalItems: accumulator.totalItems + parseInt(item.count, 10),
        totalPrice: accumulator.totalPrice + item.count * item.price,
      };
    },
    { totalItems: 0, totalPrice: 0 }
  );
  let gst = Math.ceil(process.env.REACT_APP_GST_CHARGE_RATE * totalPrice);
  let deliveryCharge = Math.ceil(
    process.env.REACT_APP_DELIVERY_CHARGE_RATE * totalPrice
  );
  console.log(user);
  let cartTotal = totalPrice + gst + deliveryCharge;
  const makePayment = async () => {
    try {
      const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
      const paymentData = {
        products: cart,
        deliveryCharge,
        gstRate: process.env.REACT_APP_GST_CHARGE_RATE,
      };

      const response = await createStripeSession({ products: cart });
      if (response.sessionId) {
        await stripe.redirectToCheckout({
          sessionId: response.sessionId,
        });
      }
    } catch (error) {
      console.error("Error during payment initiation", error);
    }
  };
  return (
    <AppLayOut>
      <div className="items">
        <div className="cart_body">
          <div className="cart_body__items">
            {cart.map((item, i) => {
              return (
                <CartCard
                  name={item.name}
                  count={parseInt(item.count, 10)}
                  filter={item.filter}
                  filterName={item.filterName}
                  filters={item.filters}
                  price={item.price}
                  thumbnail={item.thumbnail}
                  id={item._id}
                  quantity={item.quantity}
                ></CartCard>
              );
            })}
          </div>
          {cart.length > 0 && (
            <div className="cart_body__checkout">
              <div className="checkout_div">
                <div className="checkout_flex">
                  <h4 className="cart_body__checkout-heading">Cart Summary</h4>
                  <div className="cart_body__checkout-productCount">
                    <div className="cart_body__checkout-productCount-text">
                      Number of items:
                    </div>
                    <div className="cart_body__checkout-productCount-value">
                      {totalItems}
                    </div>
                  </div>
                  <div className="cart_body__checkout-productTotal">
                    <div className="cart_body__checkout-productTotal-text">
                      Total items cost:
                    </div>
                    <div className="cart_body__checkout-productTotal-value">
                      ${totalPrice}
                    </div>
                  </div>
                  <div className="cart_body__checkout-gst">
                    <div className="cart_body__checkout-gst-text">GST:</div>
                    <div className="cart_body__checkout-gst-value">${gst}</div>
                  </div>
                  <div className="cart_body__checkout-delivery">
                    <div className="cart_body__checkout-delivery-info">
                      <div className="cart_body__checkout-delivery-text">
                        Delivery:
                      </div>
                      <div className="cart_body__checkout-delivery-value">
                        ${deliveryCharge}
                      </div>
                    </div>
                    <div className="cart_body__checkout-delivery-alert">
                      Delivery Address: {user.address.streetAddress},{" "}
                      {user.address.suburb}, {user.address.state},{" "}
                      {user.address.postCode}{" "}
                      <span
                        onClick={() =>
                          dispatch(
                            setApplicationModal({
                              title: "Update User Address",
                              body: "update-address",
                            })
                          )
                        }
                      >
                        edit
                      </span>
                    </div>
                  </div>{" "}
                  <div className="cart_body__checkout-total -util-brdr-btm-none">
                    <div className="cart_body__checkout-total-text">
                      Subtotal:
                    </div>
                    <div className="cart_body__checkout-total-value">
                      ${cartTotal}
                    </div>
                  </div>
                </div>

                <div className="d-grid">
                  <Button
                    size="lg"
                    className="-util-btn-positive mb-1"
                    onClick={makePayment}
                  >
                    Pay ${cartTotal}
                  </Button>
                </div>
                <p className="checkout_paragraph">
                  By checking out, you are agreeing to our &nbsp;
                  <Link to="">Terms and Conditions</Link>.
                </p>
              </div>
            </div>
          )}
        </div>
        {applicationModal.state && <CustomModal></CustomModal>}
      </div>
    </AppLayOut>
  );
};

export default Cart;
