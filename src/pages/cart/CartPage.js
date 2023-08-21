import React from "react";
import "./cartPage.css";
import { AppLayOut } from "../../components/layout/AppLayOut";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { ItemCard } from "../../components/itemCard/ItemCard";
const Cart = () => {
  const {cart}=useSelector(state=>state.system)
  return (
    <AppLayOut>
      <div className="cart">
        <Row>
          {cart.map((item, i) => {
            const { name, thumbnail, price, catId, productId, _id } = item;
            return (
              <Col key={i} lg={4} md={4} sm={6}>
                <ItemCard
                  name={name}
                  img={thumbnail}
                  price={price}
                  ratingsRate="4.3"
                  ratingsCount="500"
                  location="cart"
                  catId={catId}
                  productId={productId}
                  id={_id}
                ></ItemCard>
              </Col>
            );
          })}
        </Row>
      </div>
    </AppLayOut>
  );
};

export default Cart;
