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
  const [qtyInput, setQtyInput] = useState(String(count));
  const [filterValue, setFilterValue] = useState(filter);
  const [totalPrice, setTotalPrice] = useState(count * price);
  const url = window.location.pathname;
  const { user } = useSelector((state) => state.user);

  const handleOnDeleteFromCart = (_id) => {
    if (window.confirm("Are you sure, you want to remove the item from cart?")) {
      dispatch(deleteCartsAction(_id));
    }
  };

  const applyCountChange = (nextCount) => {
    if (nextCount < 0) nextCount = 0;
    if (quantity && nextCount > quantity) nextCount = quantity;

    setNum(nextCount);
    setQtyInput(String(nextCount));
    setTotalPrice(nextCount * price);
    dispatch(updateCartItemAction(id, nextCount, filterValue));
  };

  const handleOnIncrement = () => {
    applyCountChange(num + 1);
  };

  const handleOnDecrement = () => {
    applyCountChange(num - 1);
  };

  const handleOnInputChange = (e) => {
    const raw = e.target.value;

    // If cleared, revert to "0"
    if (raw === "") {
      setQtyInput("0");
      setNum(0);
      applyCountChange(0);
      return;
    }

    // Only digits allowed
    if (!/^\d+$/.test(raw)) {
      return;
    }

    let normalized = raw;

    // Strip leading zeros
    if (normalized.length > 1 && normalized.startsWith("0")) {
      normalized = normalized.replace(/^0+/, "");
      if (normalized === "") normalized = "0";
    }

    const n = parseInt(normalized, 10);
    setQtyInput(normalized);
    setNum(Number.isNaN(n) ? 0 : n);

    if (!Number.isNaN(n)) {
      applyCountChange(n);
    }
  };

  const handleOnFilterChange = (id, nextCount, flt) => {
    setFilterValue(flt);
    dispatch(updateCartItemAction(id, nextCount, flt));
  };

  const handleOnAddToFav = (_id) => {
    if (!user._id) {
      dispatch(setPublicUrl(url));
      navigate("/login");
      return;
    }
    dispatch(addFavsAction({ itemId: _id }));
  };

  useEffect(() => {
    setNum(count);
    setQtyInput(String(count));
    setFilterValue(filter);
    setTotalPrice(count * price);
  }, [count, filter, price]);

  return (
    <div className="cart_items_item">
      <div className="cart_items_item_image">
        <img src={thumbnail} alt={name} className="cart_items_item_image-img" />
      </div>

      <div className="cart_items_item_details">
        {/* Title spans full width */}
        <div className="cart_items_item_details-name">{name}</div>

        <div className="cart_rows">
          {/* Unit price */}
          <div className="label">Unit Price:</div>
          <div className="value price">${price}</div>

          {/* Filter (if any) */}
          {filters?.length ? (
            <>
              <div className="label">{filterName}:</div>
              <div className="value">
                <Form.Select
                  size="sm"
                  className="cart_select cart_filter"
                  value={filterValue || ""}
                  onChange={(e) =>
                    handleOnFilterChange(id, num, e.target.value)
                  }
                >
                  {!filter && <option value="">choose</option>}
                  {filters.map((item, i) => (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </>
          ) : null}

          {/* Quantity */}
          <div className="label">No of items:</div>
          <div className="value cart_qty_wrapper">
            <span className="qty_btn qty_btn_-" onClick={handleOnDecrement}>
              -
            </span>
            <input
              type="text"
              className="qty_input"
              value={qtyInput}
              inputMode="numeric"
              pattern="[0-9]*"
              onChange={handleOnInputChange}
            />
            <span className="qty_btn" onClick={handleOnIncrement}>
              +
            </span>
          </div>

          {/* Total */}
          <div className="label">Item total Price:</div>
          <div className="value price">${totalPrice}</div>
        </div>

        {/* Corners: absolute icons */}
        <button
          className="cart_icon cart_icon--delete -util-pointer"
          onClick={() => handleOnDeleteFromCart(id)}
          aria-label="Remove from cart"
        >
          <i className="fa-solid fa-trash-can -util-trashcan -util-font15"></i>
        </button>
        <button
          className="cart_icon cart_icon--fav -util-pointer"
          onClick={() => handleOnAddToFav(id)}
          aria-label="Move to favourites"
        >
          <i className="fa-solid fa-heart -util-fav -util-font15"></i>
        </button>
      </div>
    </div>
  );
};
