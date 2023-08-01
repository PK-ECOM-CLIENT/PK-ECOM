import React from "react";
import "./favouritesPage.css";
import { AppLayOut } from "../../components/layout/AppLayOut";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ItemCard } from "../../components/itemCard/ItemCard";
const Favourites = () => {
  const { favourites } = useSelector((state) => state.system);
  return (
    <AppLayOut>
      <div className="items">
        <Row>
          {favourites.map((item, i) => {
            const { name, thumbnail, price, catId, productId, _id } = item;
            return (
              <Col key={i} lg={4} md={4} sm={6}>
                <ItemCard
                  name={name}
                  img={thumbnail}
                  price={price}
                  ratingsRate="4.3"
                  ratingsCount="500"
                  location="favs"
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

export default Favourites;
