import React from "react";
import { AppLayOut } from "../../components/layout/AppLayOut";
import { PurchasesCard } from "../../components/purchases-card/PurchasesCard";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./purchases.css";
import { convertToAESTWithTimeZone } from "../../helpers/functions/dateConversion";

const Purchases = () => {
  const { purchases } = useSelector((state) => state.system);

  return (
    <AppLayOut>
      <div className="purchases">
        <Row>
          {purchases.map((item, i) => {
            return (
              <Col lg={6} md={6} sm={12} className="purchases-column">
                <PurchasesCard
                  image={item.image}
                  orderDate={convertToAESTWithTimeZone(item.createdAt)}
                  itemId={item.itemId}
                  name={item.name}
                  catId={item.catId}
                  productId={item.productId}
                  itemPrice={item.itemPrice}
                ></PurchasesCard>
              </Col>
            );
          })}
        </Row>
      </div>
    </AppLayOut>
  );
};
export default Purchases;
