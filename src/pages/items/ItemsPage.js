import React, { useEffect } from "react";
import "./itemsPage.css";
import { AppLayOut } from "../../components/layout/AppLayOut";
import { ItemCard } from "../../components/itemCard/ItemCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProductAction } from "../../slices/products/productsAction";
import { getItemsByProductAction } from "../../slices/items/itemsAction";
import { Row, Col } from "react-bootstrap"; // ✅ add this

const ItemsPage = () => {
  const { _pid } = useParams();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.items);

  useEffect(() => {
    dispatch(getSingleProductAction(_pid));
    dispatch(getItemsByProductAction(_pid));
    window.scrollTo(0, 0);
  }, [_pid, dispatch]);

  return (
    <AppLayOut>
      <div className="items">
        <div className="items_container">
          <Row className="g-4"> {/* g-4 = spacing between cards */}
            {items.map((item, i) => {
              const { name, thumbnail, price, _id, catId, productId } = item;
              return (
                <Col key={i} lg={4} md={4} sm={6}> {/* 3 / 2 / 1 columns */}
                  <div className="items_grid_card">
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
                    />
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </AppLayOut>
  );
};

export default ItemsPage;
