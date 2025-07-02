import { useState, useEffect, useMemo } from "react";
import "./cartPage.css";
import { AppLayOut } from "../../components/layout/AppLayOut";
import { useDispatch, useSelector } from "react-redux";
import { CartCard } from "../../components/cart-card/CartCard";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  createStripeSession,
  getDeliveryDetails,
} from "../../helpers/axiosHelper";
import { setApplicationModal } from "../../slices/system/systemSlice";
import { CustomModal } from "../../components/custom-modal/CustomModal";
import { calculateDimensionsAndWeight } from "../../helpers/functions/cartDimension";
import { Spinnersmall } from "../../helpers/snippets/spinner";

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
const [paymentInitiationSpinner,setPaymentInitiationSpinner]=useState(false);
  const calculatedDimension = useMemo(
    () => calculateDimensionsAndWeight(cart),
    [cart]
  );
console.log(cart)
  // Fetch delivery fee when the component mounts or when cart or user details change
  useEffect(() => {
    const fetchDeliveryDetails = async () => {
      try {
        if (user?.address?.postCode) {
          const result = await getDeliveryDetails(
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

    fetchDeliveryDetails();
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
    setPaymentInitiationSpinner(true); // Start spinner

    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
    const response = await createStripeSession({ items: cart });

    if (response.sessionId) {
      await stripe.redirectToCheckout({
        sessionId: response.sessionId,
      });
    }
  } catch (error) {
    console.error("Error during payment initiation", error);
  } finally {
    setPaymentInitiationSpinner(false); // Stop spinner regardless of success or failure
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
  <h5 className="fw-bold text-center mb-4">
      <i className="fa-solid fa-cart-shopping -util-font15 util-mr-sml"></i>Cart Summary
  </h5>

  <div className="d-flex justify-content-between mb-2">
    <span>Number of items:</span>
    <span className="fw-bold">{totalItems}</span>
  </div>

  <div className="d-flex justify-content-between mb-2">
    <span>Total items cost:</span>
    <span className="fw-bold">${totalPrice.toFixed(2)}</span>
  </div>

  <div className="d-flex justify-content-between mb-2">
    <span>GST:</span>
    <span className="fw-bold">${gst}</span>
  </div>

  <hr />

  <div className="d-flex justify-content-between mb-1">
    <span className="fw-bold">Delivery:</span>
    <span className="fw-bold">${deliveryDetails.totalCost.toFixed(2)}</span>
  </div>

  <div className="small text-danger d-flex justify-content-between align-items-start mb-1">
    <div>
    <i class="fa-solid fa-location-dot util-mr-xsml"></i>{user.address?.streetAddress}, {user.address?.suburb},{" "}
      {user.address?.state}, {user.address?.postCode}
      <div className="fst-italic">Delivered in {deliveryDetails.deliveryTime}</div>
    </div>
    <div
      className="ms-2 text-primary"
      style={{ cursor: "pointer", fontWeight: 500 }}
      onClick={() =>
        dispatch(
          setApplicationModal({
            title: "Update User Address",
            body: "update-address",
          })
        )
      }
    >
      Edit
    </div>
  </div>

  <hr />

  <div className="d-flex justify-content-between fs-5 fw-bold mb-3">
    <span>Subtotal:</span>
    <span>${cartTotal}</span>
  </div>

  <div className="d-grid mb-2">
    <Button
      size="lg"
      className="-util-btn-positive"
      onClick={makePayment}
      disabled={paymentInitiationSpinner}
    >
      {paymentInitiationSpinner ? <Spinnersmall /> : `Pay $${cartTotal}`}
    </Button>
  </div>

  <p className="checkout_paragraph">
    By checking out, you agree to our&nbsp;
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
