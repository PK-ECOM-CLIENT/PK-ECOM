import React from "react";
import "./cartCard.css";
import { Button, Form } from "react-bootstrap";
export const CartCard = ({
  name,
  count,
  filter,
  filterName,
  filters,
  price,
  thumbnail,
}) => {
  return (
    <div className="cart_items_item">
      <div className="cart_items_item_image">
        <img src={thumbnail} alt="img" className="cart_items_item_image-img" />
      </div>
      <div className="cart_items_item_details">
        <div className="cart_items_item_details-name">{name}</div>
        <div className="cart_items_item_details-price">
          Unit Price: <span className="price">{price}</span>
        </div>
        <Form>
          {filters?.length ? (
            <div className="itemSelection_body__shoping-filter">
              <div className="filterName">{filterName}:</div>
              <Form.Select name="filter" className="filter_heading">
                {!filter && <option value="">choose</option>}
                {filters.map((item, i) => {
                  return (
                    <option key={i} value={item} selected={item === filter}>
                      {item}
                    </option>
                  );
                })}
              </Form.Select>
            </div>
          ) : null}

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
              value={count}
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
