import React, { useEffect } from "react";
import "./itemsPage.css";
import { AppLayOut } from "../../components/layout/AppLayOut";
import { Col, Row } from "react-bootstrap";
import { ItemCard } from "../../components/itemCard/ItemCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProductAction } from "../../slices/products/productsAction";
import { getItemsByProductAction } from "../../slices/items/itemsAction";
const ItemsPage = () => {
  const { _pid } = useParams();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.items);
  useEffect(() => {
    dispatch(getSingleProductAction(_pid));
    dispatch(getItemsByProductAction(_pid));
  }, [_pid, dispatch]);
  return (
    <div>
      <AppLayOut>
        <div className="items">
          <Row>
            {items.map((item, i) => {
              const { name, thumbnail, price, _id, catId, productId } = item;

              return (
                <Col key={i} lg={4} md={4} sm={6}>
                  <ItemCard
                    name={name}
                    img={thumbnail}
                    price={price}
                    ratingsRate="4.3"
                    ratingsCount="500"
                    location="items"
                    id={_id}
                    catId={catId}
                    productId={productId}
                  ></ItemCard>
                </Col>
              );
            })}
          </Row>
        </div>
      </AppLayOut>
    </div>
  );
};

export default ItemsPage;
