import React from "react";
import "./favouritesPage.css";
import { AppLayOut } from "../../components/layout/AppLayOut";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ItemCard } from "../../components/itemCard/ItemCard";
import { useNavigate } from "react-router-dom";

const Favourites = () => {
  const { favourites } = useSelector((state) => state.system);
  const navigate = useNavigate();
  const handleOnItemClick = (_iid, _pid, _cid) => {
    navigate(`/categories/${_cid}/products/${_pid}/item/${_iid}`);
  };
  return (
    <AppLayOut>
      <div className="items">
        <Row>
          {favourites.map((item, i) => {
            const { name, thumbnail, price } = item;

            return (
              <Col
                key={i}
                lg={4}
                md={4}
                sm={6}
                onClick={() =>
                  handleOnItemClick(item._id, item.productId, item.catId)
                }
              >
                <ItemCard
                  name={name}
                  img={thumbnail}
                  price={price}
                  ratingsRate="4.3"
                  ratingsCount="500"
                  location="fav"
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
