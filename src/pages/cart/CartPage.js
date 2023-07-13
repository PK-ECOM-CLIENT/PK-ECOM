import React from "react";
import "./cartPage.css";
import { AppLayOut } from "../../components/layout/AppLayOut";
import sofa from "../../assits/images/offersimg/sofa.jpg";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const Cart = () => {
  return (
    <AppLayOut>
      <div className="cart">
        <div className="cart_content">
          <div className="cart_content__items-div">
            <div className="cart_content__items">
              <img className="cart_content__items-img" alt="" src={sofa}></img>
              <div className="cart_content__items-description -util-borderbottom">
                description Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Laboriosam labore officiis cumque a, commodi omnis
                accusantium et repellat cupiditate voluptatibus. Explicabo iusto
                aliquid nobis repellat quam expedita dolorem tenetur provident.
              </div>
              <div className="cart_content__items-pricenfilter -util-borderbottom">
                <div className="cart_content__items-pricenfilter--price">
                  Unit Price: $22
                </div>
                <div className="cart_content__items-pricenfilter--filter">
                  Size: 2m
                </div>
              </div>
              <div className="cart_content__items-totalcountnprice -util-borderbottom">
                <div className="cart_content__items-totalcountnprice--count">
                  No of items: 2
                </div>
                <div className="cart_content__items-totalcountnprice--price">
                  Total Price: $ 44
                </div>
              </div>
              <div className="cart_content__items-option">
                <div className="cart_content__items-option--remove">
                  <Link>remove</Link>
                </div>
                <div className="cart_content__items-option--cart">
                  <Link>Add to favourites</Link>
                </div>
                <div className="cart_content__items-option--share">
                  <Link>share</Link>
                </div>
              </div>
            </div>
            <div className="cart_content__items">
              <img className="cart_content__items-img" alt="" src={sofa}></img>
              <div className="cart_content__items-description -util-borderbottom">
                description Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Laboriosam labore officiis cumque a, commodi omnis
                accusantium et repellat cupiditate voluptatibus. Explicabo iusto
                aliquid nobis repellat quam expedita dolorem tenetur provident.
              </div>
              <div className="cart_content__items-pricenfilter -util-borderbottom">
                <div className="cart_content__items-pricenfilter--price">
                  Unit Price: $22
                </div>
                <div className="cart_content__items-pricenfilter--filter">
                  Size: 2m
                </div>
              </div>
              <div className="cart_content__items-totalcountnprice -util-borderbottom">
                <div className="cart_content__items-totalcountnprice--count">
                  No of items: 2
                </div>
                <div className="cart_content__items-totalcountnprice--price">
                  Total Price: $ 44
                </div>
              </div>
              <div className="cart_content__items-option">
                <div className="cart_content__items-option--remove">
                  <Link>remove</Link>
                </div>
                <div className="cart_content__items-option--cart">
                  <Link>Add to favourites</Link>
                </div>
                <div className="cart_content__items-option--share">
                  <Link>share</Link>
                </div>
              </div>
            </div>
            <div className="cart_content__items">
              <img className="cart_content__items-img" alt="" src={sofa}></img>
              <div className="cart_content__items-description -util-borderbottom">
                description Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Laboriosam labore officiis cumque a, commodi omnis
                accusantium et repellat cupiditate voluptatibus. Explicabo iusto
                aliquid nobis repellat quam expedita dolorem tenetur provident.
              </div>
              <div className="cart_content__items-pricenfilter -util-borderbottom">
                <div className="cart_content__items-pricenfilter--price">
                  Unit Price: $22
                </div>
                <div className="cart_content__items-pricenfilter--filter">
                  Size: 2m
                </div>
              </div>
              <div className="cart_content__items-totalcountnprice -util-borderbottom">
                <div className="cart_content__items-totalcountnprice--count">
                  No of items: 2
                </div>
                <div className="cart_content__items-totalcountnprice--price">
                  Total Price: $ 44
                </div>
              </div>
              <div className="cart_content__items-option">
                <div className="cart_content__items-option--remove">
                  <Link>remove</Link>
                </div>
                <div className="cart_content__items-option--cart">
                  <Link>Add to favourites</Link>
                </div>
                <div className="cart_content__items-option--share">
                  <Link>share</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="cart_content__checkout">
            <div className="cart_content__checkout-div">
              <div className="cart_content__checkout-items ">
                <div className="cart_content__cheout-items--subject">
                  Total Items
                </div>
                <div className="cart_content__checkout-items--values">2</div>
              </div>
          
              <div className="cart_content__checkout-items">
                <div className="cart_content__cheout-items--subject">
                  GST Total
                </div>
                <div className="cart_content__checkout-items--values">70</div>
              </div>
              <div className="cart_content__checkout-items">
                <div className="cart_content__cheout-items--subject">
                  Total Prices
                </div>
                <div className="cart_content__checkout-items--values">2551</div>
              </div>
              <div className="cart_content__checkout-items">
                <div className="cart_content__cheout-items--subject">
                  Delivery Address
                </div>
                <div className="cart_content__checkout-items--values">
                  101/1-3 Clarence Street Strathfield NSW 2135
                </div>
              </div>
            </div>
            <div className="d-grid">
              <Button className="cart_content__checkout-btn btn-positive">
                Checkout
              </Button>
            </div>
          </div>
        </div>
        <div className="cart_recommendations">
          <h5 className="cart_recommendations__heading">Recommended For You</h5>
          <div className="cart_recommendations__items">
            <div className="cart__recommendations__items-item">
              Recommendation 1
            </div>
            <div className="cart__recommendations__items-item">
              Recommendation 2
            </div>
            <div className="cart__recommendations__items-item">
              Recommendation 3
            </div>
          </div>
        </div>
      </div>
    </AppLayOut>
  );
};

export default Cart;
