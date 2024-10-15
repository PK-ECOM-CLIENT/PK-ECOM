import React, { useState, useEffect, useMemo } from "react";
import "./cartPage.css";
import { AppLayOut } from "../../components/layout/AppLayOut";
import { useDispatch, useSelector } from "react-redux";
import { CartCard } from "../../components/cart-card/CartCard";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  calculateDeliveryFee,
  createStripeSession,
} from "../../helpers/axiosHelper";
import { setApplicationModal } from "../../slices/system/systemSlice";
import { CustomModal } from "../../components/custom-modal/CustomModal";
import { calculateDimensionsAndWeight } from "../../helpers/functions/cartDimension";

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

  // State to store the dynamically calculated delivery charge
  const [deliveryDetails, setDeliveryDetails] = useState({
    service: "",
    deliveryTime: "",
    totalCost: 0, // Store delivery cost as a number for calculations
  });

  const calculatedDimension = useMemo(
    () => calculateDimensionsAndWeight(cart),
    [cart]
  );

  // Fetch delivery fee when the component mounts or when cart or user details change
  useEffect(() => {
    const fetchDeliveryFee = async () => {
      try {
        if (user?.address?.postCode) {
          const result = await calculateDeliveryFee(
            {
              fromPostcode: 6107, // Hardcoded origin postcode
              toPostcode: user.address.postCode, // Use the user's address for delivery
              ...calculatedDimension,
            },
            {
              fromPostcode: 6107, // Hardcoded origin postcode
              toPostcode: user.address.postCode, // Use the user's address for delivery
              ...calculatedDimension,
            },
            {
              fromPostcode: 6107, // Hardcoded origin postcode
              toPostcode: user.address.postCode, // Use the user's address for delivery
              ...calculatedDimension,
            }
          );
          console.log(result);

          // Update the delivery details state
          setDeliveryDetails({
            service: result?.service || "Unknown service",
            deliveryTime: result?.delivery_time || "Unknown delivery time",
            totalCost: Number(result?.total_cost || 0), // Ensure it's a number
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchDeliveryFee();
  }, [cart, user, calculatedDimension]); // Memoized 'calculatedDimension' won't cause unnecessary triggers

  // Calculate GST and round to 2 decimals
  const gst = (totalPrice * process.env.REACT_APP_GST_CHARGE_RATE).toFixed(2);

  // Calculate cart total and round to 2 decimals
  let cartTotal = (
    Number(totalPrice) +
    Number(gst) +
    Number(deliveryDetails.totalCost)
  ).toFixed(2);

  const makePayment = async () => {
    try {
      const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);

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
                  key={item._id}
                  name={item.name}
                  count={parseInt(item.count, 10)}
                  filter={item.filter}
                  filterName={item.filterName}
                  filters={item.filters}
                  price={item.price}
                  thumbnail={item.thumbnail}
                  id={item._id}
                  quantity={item.quantity}
                />
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
                      ${totalPrice.toFixed(2)}
                    </div>
                  </div>
                  <div className="cart_body__checkout-gst">
                    <div className="cart_body__checkout-gst-text">GST:</div>
                    <div className="cart_body__checkout-gst-value">${gst}</div>
                  </div>
                  <div className="cart_body__checkout-delivery">
                    <div className="cart_body__checkout-delivery-info">
                      <div className="cart_body__checkout-delivery-text">
                        Delivery :
                      </div>
                      <div className="cart_body__checkout-delivery-value">
                        ${deliveryDetails.totalCost.toFixed(2)}
                      </div>
                    </div>

                    <div className="cart_body__checkout-delivery-alert">
                      Delivery Address: {user.address?.streetAddress},{" "}
                      {user.address?.suburb}, {user.address?.state},{" "}
                      {user.address?.postCode}
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
                    <div className="cart_body__checkout-delivery-time">
                      <span className="cart_body__checkout-delivery-alert">
                        {deliveryDetails.deliveryTime}
                      </span>
                    </div>
                  </div>

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
        {applicationModal.state && <CustomModal />}
      </div>
    </AppLayOut>
  );
};

export default Cart;
