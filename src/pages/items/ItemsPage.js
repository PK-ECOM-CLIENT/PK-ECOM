import React, { useEffect } from "react";
import "./itemsPage.css";
import { AppLayOut } from "../../components/layout/AppLayOut";
import { Col, Row } from "react-bootstrap";
import { ItemCard } from "../../components/itemCard/ItemCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProductAction } from "../../slices/products/productsAction";
import { getItemsByProductAction } from "../../slices/items/itemsAction";
const ItemsPage = () => {
  const { _cid, _pid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.items);
  useEffect(() => {
    dispatch(getSingleProductAction(_pid));
    dispatch(getItemsByProductAction(_pid));
  }, [_pid, dispatch]);
  const handleOnItemClick = (_iid) => {
    navigate(`/categories/${_cid}/products/${_pid}/item/${_iid}`);
  };
  return (
    <div>
      <AppLayOut>
        <div className="items">
          <Row>
            {items.map((item, i) => {
              const { name, thumbnail, price } = item;

              return (
                <Col
                  key={i}
                  lg={4}
                  md={4}
                  sm={6}
                  onClick={() => handleOnItemClick(item._id)}
                >
                  <ItemCard
                    name={name}
                    img={thumbnail}
                    price={price}
                    ratingsRate="4.3"
                    ratingsCount="500"
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
