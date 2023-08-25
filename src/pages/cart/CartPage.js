import React from "react";
import "./cartPage.css";
import { AppLayOut } from "../../components/layout/AppLayOut";
// import { useSelector } from "react-redux";
import { CartCard } from "../../components/cart-card/CartCard";
const Cart = () => {
  // const { cart } = useSelector((state) => state.system);
  return (
    <AppLayOut>
      <div className="items">
        <CartCard></CartCard>
        <CartCard></CartCard>
        <CartCard></CartCard>
        <CartCard></CartCard>
      </div>
    </AppLayOut>
  );
};

export default Cart;
