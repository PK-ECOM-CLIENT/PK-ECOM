import React from "react";
import image from "../../assits/images/offersimg/trousers.jpg";
import "./cartCard.css";
import { Button, Form } from "react-bootstrap";
export const CartCard = () => {
  return (
    <div className="cart_items_item">
      <div className="cart_items_item_image">
        <img src={image} alt="" className="cart_items_item_image-img" />
      </div>
      <div className="cart_items_item_details">
        <div className="cart_items_item_details-name">
          Name of the item is laaamo
        </div>
        <div className="cart_items_item_details-price">
          Unit Price: <span className="price">$45</span>
        </div>
        <Form>
          <div className="itemSelection_body__shoping-filter">
            <div className="filterName">filter name:</div>
            <Form.Select name="filter" className="filter_heading">
              <option value="">choose</option>
              <option>filter 1</option>
              <option>filter 2</option>
            </Form.Select>
          </div>

          <div className="itemSelection_body_shopping-no">
            <label htmlFor="number" className="number">
              No of items:
            </label>
            <span className="itemSelection_body__shopping-btn">
              <Button variant="none" type="button" className="btn-noFocus">
                -
              </Button>
            </span>
            <input
              className="count"
              type="text"
              id="number"
              readOnly
              name="count"
              value={2}
            />
            <span className="itemSelection_body__shopping-btn">
              <Button className="btn-noFocus" variant="none" type="button">
                +
              </Button>
            </span>
          </div>
        </Form>
        {/* <div className="cart_items_item_details-filter">Filter Name: Value</div> */}
        {/* <div className="cart_items_item_details-count"> Number of items:7</div> */}
        <div className="cart_items_item_details-total">
          Item total Price: <span className="price">$450</span>
        </div>
        <div className="cart_items_item_details-remove">
          <i className="fa-solid fa-trash-can -util-trashcan"></i>
        </div>
        <div className="cart_items_item_details-later">
          <i className="fa-solid fa-heart -util-font15"></i>
        </div>
      </div>
    </div>
  );
};
