import "./HomePage.css";
import "../../components/layout-components/Footer";
import React from "react";
import { AppLayOut } from "../../components/layout/AppLayOut";
import { CustomCarousels } from "../../components/custom-components/CustomCarousels";
import boots from "../../assits/images/offersimg/boots.jpg";
import laptop from "../../assits/images/offersimg/laptop.jpg";
import sofa from "../../assits/images/offersimg/sofa.jpg";
import trousers from "../../assits/images/offersimg/trousers.jpg";
import { CustomCard } from "../../components/custom-components/CustomCard";
import { Col, Row } from "react-bootstrap";
import { CustomModal } from "../../components/custom-modal/CustomModal";
const HomePage = () => {
  const carouselOffers = [
    {
      name: "boots",
      description: "20% off",
      img: boots,
      id: "djfkld",
    },
    {
      name: "laptop",
      description: "15% off",
      img: laptop,
      id: "djfkld",
    },
    {
      name: "sofa",
      description: "15% off",
      img: sofa,
      id: "djfkld",
    },
    {
      name: "trousers",
      description: "30% off",
      img: trousers,
      id: "djfkld",
    },
  ];
  const clearance = [
    {
      name: "boots",
      description: "20% off",
      img: boots,
      id: "djfkld",
    },
    {
      name: "laptop",
      description: "10% off",
      img: laptop,
      id: "djfkld",
    },
    {
      name: "laptop",
      description: "10% off",
      img: laptop,
      id: "djfkld",
    },
    {
      name: "sofa",
      description: "15% off",
      img: sofa,
      id: "djfkld",
    },
    {
      name: "boots",
      description: "20% off",
      img: boots,
      id: "djfkld",
    },
    {
      name: "trousers",
      description: "30% off",
      img: trousers,
      id: "djfkld",
    },
    {
      name: "laptop",
      description: "10% off",
      img: laptop,
      id: "djfkld",
    },
    {
      name: "boots",
      description: "20% off",
      img: boots,
      id: "djfkld",
    },
    {
      name: "boots",
      description: "20% off",
      img: boots,
      id: "djfkld",
    },
    {
      name: "laptop",
      description: "10% off",
      img: laptop,
      id: "djfkld",
    },
    {
      name: "boots",
      description: "20% off",
      img: boots,
      id: "djfkld",
    },
    {
      name: "sofa",
      description: "15% off",
      img: sofa,
      id: "djfkld",
    },
    {
      name: "trousers",
      description: "30% off",
      img: trousers,
      id: "djfkld",
    },
  ];
  const offers = [
    {
      name: "boots",
      description: "20% off",
      img: boots,
      id: "djfkld",
    },
    {
      name: "laptop",
      description: "10% off",
      img: laptop,
      id: "djfkld",
    },
    {
      name: "boots",
      description: "20% off",
      img: boots,
      id: "djfkld",
    },
    {
      name: "boots",
      description: "20% off",
      img: boots,
      id: "djfkld",
    },
    {
      name: "laptop",
      description: "10% off",
      img: laptop,
      id: "djfkld",
    },
    {
      name: "boots",
      description: "20% off",
      img: boots,
      id: "djfkld",
    },
    {
      name: "trousers",
      description: "30% off",
      img: trousers,
      id: "djfkld",
    },
    {
      name: "laptop",
      description: "10% off",
      img: laptop,
      id: "djfkld",
    },
    {
      name: "boots",
      description: "20% off",
      img: boots,
      id: "djfkld",
    },
    {
      name: "boots",
      description: "20% off",
      img: boots,
      id: "djfkld",
    },
    {
      name: "laptop",
      description: "10% off",
      img: laptop,
      id: "djfkld",
    },
    {
      name: "boots",
      description: "20% off",
      img: boots,
      id: "djfkld",
    },
  ];
  const newArrivals = [
    {
      name: "boots",
      description: "Aussie Product",
      img: boots,
      id: "djfkld",
    },
    {
      name: "laptop",
      description: "Japanese Brand",
      img: laptop,
      id: "djfkld",
    },
    {
      name: "boots",
      description: "Aussie Product",
      img: boots,
      id: "djfkld",
    },
    {
      name: "boots",
      description: "Aussie Product",
      img: boots,
      id: "djfkld",
    },
    {
      name: "laptop",
      description: "Japanese Brand",
      img: laptop,
      id: "djfkld",
    },
    {
      name: "boots",
      description: "Aussie Product",
      img: boots,
      id: "djfkld",
    },
    {
      name: "trousers",
      description: "Hand made",
      img: trousers,
      id: "djfkld",
    },
    {
      name: "laptop",
      description: "Japanese Brand",
      img: laptop,
      id: "djfkld",
    },
    {
      name: "boots",
      description: "Aussie Product",
      img: boots,
      id: "djfkld",
    },
    {
      name: "boots",
      description: "Aussie Product",
      img: boots,
      id: "djfkld",
    },
    {
      name: "laptop",
      description: "Japanese Brand",
      img: laptop,
      id: "djfkld",
    },
    {
      name: "boots",
      description: "Aussie Product",
      img: boots,
      id: "djfkld",
    },
  ];
  const topSales = [
    {
      name: "boots",
      description: "Aussie Product",
      img: boots,
      id: "djfkld",
    },
    {
      name: "laptop",
      description: "Japanese Brand",
      img: laptop,
      id: "djfkld",
    },
    {
      name: "boots",
      description: "Aussie Product",
      img: boots,
      id: "djfkld",
    },
    {
      name: "boots",
      description: "Aussie Product",
      img: boots,
      id: "djfkld",
    },
    {
      name: "laptop",
      description: "Japanese Brand",
      img: laptop,
      id: "djfkld",
    },
    {
      name: "boots",
      description: "Aussie Product",
      img: boots,
      id: "djfkld",
    },
    {
      name: "trousers",
      description: "Hand made",
      img: trousers,
      id: "djfkld",
    },
    {
      name: "laptop",
      description: "Japanese Brand",
      img: laptop,
      id: "djfkld",
    },
    {
      name: "boots",
      description: "Aussie Product",
      img: boots,
      id: "djfkld",
    },
    {
      name: "boots",
      description: "Aussie Product",
      img: boots,
      id: "djfkld",
    },
    {
      name: "laptop",
      description: "Japanese Brand",
      img: laptop,
      id: "djfkld",
    },
    {
      name: "boots",
      description: "Aussie Product",
      img: boots,
      id: "djfkld",
    },
    {
      name: "boots",
      description: "Aussie Product",
      img: boots,
      id: "djfkld",
    },
    {
      name: "laptop",
      description: "Japanese Brand",
      img: laptop,
      id: "djfkld",
    },
    {
      name: "boots",
      description: "Aussie Product",
      img: boots,
      id: "djfkld",
    },
    {
      name: "boots",
      description: "Aussie Product",
      img: boots,
      id: "djfkld",
    },
    {
      name: "laptop",
      description: "Japanese Brand",
      img: laptop,
      id: "djfkld",
    },
    {
      name: "boots",
      description: "Aussie Product",
      img: boots,
      id: "djfkld",
    },
    {
      name: "trousers",
      description: "Hand made",
      img: trousers,
      id: "djfkld",
    },
    {
      name: "laptop",
      description: "Japanese Brand",
      img: laptop,
      id: "djfkld",
    },
    {
      name: "boots",
      description: "Aussie Product",
      img: boots,
      id: "djfkld",
    },
    {
      name: "boots",
      description: "Aussie Product",
      img: boots,
      id: "djfkld",
    },
    {
      name: "laptop",
      description: "Japanese Brand",
      img: laptop,
      id: "djfkld",
    },
    {
      name: "boots",
      description: "Aussie Product",
      img: boots,
      id: "djfkld",
    },
  ];

  return (
    <div>
      <AppLayOut>
        <div className="homepage_content">
          <div className="offer">
            <div className="offer_carousels__carousels">
              <CustomCarousels items={carouselOffers}></CustomCarousels>
            </div>
          </div>
          <div className="clearance">
            <h3 className="clearance_heading">Clearance</h3>
            <Row className="clearance_clearance">
              {clearance.map((item, i) => (
                <Col key={i} lg={4} md={4} sm={6}>
                  <CustomCard
                    name={item.name}
                    img={item.img}
                    description={item.description}
                    parent="clearance"
                  ></CustomCard>
                </Col>
              ))}
            </Row>
          </div>
          <div className="offers">
            <h3 className="offers_heading">Current Offers</h3>
            <Row className="offers_offers">
              {offers.map((item, i) => (
                <Col key={i} lg={4} md={4} sm={6}>
                  <CustomCard
                    name={item.name}
                    img={item.img}
                    description={item.description}
                    parent="offers"
                  ></CustomCard>
                </Col>
              ))}
            </Row>
          </div>
          <div className="newArrivals">
            <h3 className="newArrivals_heading">New Arrivals</h3>
            <Row className="newArrivals_newArrivals">
              {newArrivals.map((item, i) => (
                <Col key={i} lg={4} md={4} sm={6}>
                  <CustomCard
                    name={item.name}
                    img={item.img}
                    description={item.description}
                    parent="newArrivals"
                  ></CustomCard>
                </Col>
              ))}
            </Row>
          </div>
          <div className="topSales">
            <h3 className="topSales_heading">Top Sales</h3>
            <Row className="topSales_topSales">
              {topSales.map((item, i) => (
                <Col key={i} lg={4} md={4} sm={6}>
                  <CustomCard
                    name={item.name}
                    img={item.img}
                    description={item.description}
                    parent="topSales"
                  ></CustomCard>
                </Col>
              ))}
            </Row>
          </div>
        </div>
        {/* <CustomModal></CustomModal> */}
      </AppLayOut>
    </div>
  );
};

export default HomePage;
