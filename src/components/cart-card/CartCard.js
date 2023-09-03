import React, { useEffect, useState } from "react";
import "./cartCard.css";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavsAction,
  deleteCartsAction,
} from "../../slices/system/systemAction";
import { useNavigate } from "react-router-dom";
import { setPublicUrl } from "../../slices/system/systemSlice";
export const CartCard = ({
  name,
  count,
  filter,
  filterName,
  filters,
  price,
  thumbnail,
  id,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [num, setNum] = useState(count);
  const [totalPrice, setTotalPrice] = useState(num * price);
  const url = window.location.pathname;
  const { user } = useSelector((state) => state.user);
  const handleOnIncrement = () => {
    setNum(num + 1);
    setTotalPrice((num + 1) * price);
  };
  const handleOnDecrement = () => {
    if (num < 2) {
      return;
    }
    setNum(num - 1);
    setTotalPrice((num - 1) * price);
  };
  const handleOnDeleteFromCart = (_id) => {
    if (
      window.confirm("Are you sure, you want to remove the item from cart?")
    ) {
      dispatch(deleteCartsAction(_id));
    }
  };
  const handleOnAddToFav = (_id) => {
    if (!user._id) {
      dispatch(setPublicUrl(url));
      navigate("/login");
      return;
    }
    const obj = { itemId: _id };
    dispatch(addFavsAction(obj));
  };
  useEffect(() => {
    setNum(count);
  }, [count]);
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
            <span
              className="itemSelection_body__shopping-btn"
              onClick={handleOnDecrement}
            >
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
              value={num}
            />
            <span
              className="itemSelection_body__shopping-btn"
              onClick={handleOnIncrement}
            >
              <Button className="btn-noFocus" variant="none" type="button">
                +
              </Button>
            </span>
          </div>
        </Form>
        <div className="cart_items_item_details-total">
          Item total Price: <span className="price">${totalPrice}</span>
        </div>
        <div
          className="cart_items_item_details-remove -util-pointer"
          onClick={() => handleOnDeleteFromCart(id)}
        >
          <i className="fa-solid fa-trash-can -util-trashcan"></i>
        </div>
        <div
          className="cart_items_item_details-later -util-pointer"
          onClick={() => handleOnAddToFav(id)}
        >
          <i className="fa-solid fa-heart -util-font15"></i>
        </div>
      </div>
    </div>
  );
};
