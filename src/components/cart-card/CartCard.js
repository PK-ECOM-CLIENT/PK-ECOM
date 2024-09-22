import React, { useEffect, useState } from "react";
import "./cartCard.css";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavsAction,
  deleteCartsAction,
  updateCartItemAction,
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
  quantity,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [num, setNum] = useState(count);
  const [filterValue, setFilterValue] = useState(filter);
  const [totalPrice, setTotalPrice] = useState(num * price);
  const url = window.location.pathname;
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.system);
  const handleOnDeleteFromCart = (_id) => {
    if (
      window.confirm("Are you sure, you want to remove the item from cart?")
    ) {
      dispatch(deleteCartsAction(_id));
    }
  };
  const handleOnCountChange = (id, count, filter) => {
    dispatch(updateCartItemAction(id, count, filter));
    setTotalPrice(count * price);
  };
  const handleOnFilterChange = (id, count, filter) => {
    dispatch(updateCartItemAction(id, count, filter));
    console.log(cart);
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
    setFilterValue(filter);
  }, [count, filter]);
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
              <Form.Select
                name="filter"
                className="filter_heading"
                onChange={(e) => handleOnFilterChange(id, num, e.target.value)}
              >
                {!filter && <option value="">choose</option>}
                {filters.map((item, i) => {
                  return (
                    <option
                      key={i}
                      value={item}
                      selected={item === filterValue}
                      required
                    >
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
            <Form.Select
              name="count"
              className="count_heading"
              onChange={(e) =>
                handleOnCountChange(id, e.target.value, filterValue)
              }
            >
              {Array.from({ length: quantity }).map((_, i) => (
                <option key={i} value={i + 1} selected={i + 1 === num}>
                  {i + 1}
                </option>
              ))}
            </Form.Select>
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
