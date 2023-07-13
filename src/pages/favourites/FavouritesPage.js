import React from "react";
import "./favouritesPage.css";
import sofa from "../../assits/images/offersimg/sofa.jpg";
import { AppLayOut } from "../../components/layout/AppLayOut";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Favourites = () => {
  return (
    <AppLayOut>
      <div className="favourites">
        <div className="favourites_content">
          <Row>
            <Col xl={4} lg={6} md={6} className="favourites_content__items-div">
              <div className="favourites_content__items">
                <img
                  className="favourites_content__items-img"
                  alt=""
                  src={sofa}
                ></img>
                <div className="favourites_content__items-description -util-borderbottom">
                  description Lorem ip provident.
                </div>

                <div className="favourites_content__items-pricenfilter -util-borderbottom">
                  <div className="favourites_content__items-pricenfilter--price">
                    Unit Price: $22
                  </div>
                  <div className="favourites_content__items-pricenfilter--filter">
                    Size: 2m
                  </div>
                </div>
                <div className="favourites_content__items-option">
                  <div className="favourites_content__items-option--remove">
                    <Link>remove</Link>
                  </div>
                  <div className="favourites_content__items-option--cart">
                    <Link>Add to cart</Link>
                  </div>
                  <div className="favourites_content__items-option--share">
                    <Link>share</Link>
                  </div>
                </div>
              </div>
            </Col>
            <Col xl={4} lg={6} md={6} className="favourites_content__items-div">
              <div className="favourites_content__items">
                <img
                  className="favourites_content__items-img"
                  alt=""
                  src={sofa}
                ></img>
                <div className="favourites_content__items-description -util-borderbottom">
                  description Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Laborios
                </div>

                <div className="favourites_content__items-pricenfilter -util-borderbottom">
                  <div className="favourites_content__items-pricenfilter--price">
                    Unit Price: $22
                  </div>
                  <div className="favourites_content__items-pricenfilter--filter">
                    Size: 2m
                  </div>
                </div>
                <div className="favourites_content__items-option">
                  <div className="favourites_content__items-option--remove">
                    <Link>remove</Link>
                  </div>
                  <div className="favourites_content__items-option--cart">
                    <Link>Add to cart</Link>
                  </div>
                  <div className="favourites_content__items-option--share">
                    <Link>share</Link>
                  </div>
                </div>
              </div>
            </Col>
            <Col xl={4} lg={6} md={6} className="favourites_content__items-div">
              <div className="favourites_content__items">
                <img
                  className="favourites_content__items-img"
                  alt=""
                  src={sofa}
                ></img>
                <div className="favourites_content__items-description -util-borderbottom">
                  description Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Laboriosam laboate voluptatibus. Explicabo iusto aliquid
                  n quam expedita dolorem tenetur provident.
                </div>

                <div className="favourites_content__items-pricenfilter -util-borderbottom">
                  <div className="favourites_content__items-pricenfilter--price">
                    Unit Price: $22
                  </div>
                  <div className="favourites_content__items-pricenfilter--filter">
                    Size: 2m
                  </div>
                </div>
                <div className="favourites_content__items-option">
                  <div className="favourites_content__items-option--remove">
                    <Link>remove</Link>
                  </div>
                  <div className="favourites_content__items-option--cart">
                    <Link>Add to cart</Link>
                  </div>
                  <div className="favourites_content__items-option--share">
                    <Link>share</Link>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="favourites_recommendations"></div>
      </div>
    </AppLayOut>
  );
};

export default Favourites;
