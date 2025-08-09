import React, { useEffect, useRef, useState } from "react";
import "./itemSelectionPage.css";
import { AppLayOut } from "../../components/layout/AppLayOut";
import { ItemCard } from "../../components/itemCard/ItemCard";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIndividualItemAction } from "../../slices/items/itemsAction";
import {
  addCartsAction,
  addFavsAction,
} from "../../slices/system/systemAction";
import { setPublicUrl } from "../../slices/system/systemSlice";

const itemInitialState = {
  price: null,
  filter: "",
  count: null,
  totalPrice: null,
};

const ItemSelectionPage = () => {
  const { _cid, _pid, _iid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url = window.location.pathname;

  const [form, setForm] = useState(itemInitialState);
  const [image, setImage] = useState("");
  const [count, setCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(null);

  const filterRef = useRef(null);
  const { selectedItem } = useSelector((state) => state.items);
  const { user } = useSelector((state) => state.user);
  const { name, description, images, price, filterName, filters } =
    selectedItem;

  const handleOnIncrement = () => {
    setCount((c) => c + 1);
    setTotalPrice((count + 1) * price);
  };

  const handleOnDecrement = () => {
    if (count < 2) return;
    setCount((c) => c - 1);
    setTotalPrice((count - 1) * price);
  };

  const handleOnAddToFav = () => {
    if (!user._id) {
      dispatch(setPublicUrl(url));
      navigate("/login");
      return;
    }
    dispatch(addFavsAction({ itemId: _iid }));
  };

  const handleOnImageClick = (img) => setImage(img);

  const copyOnClick = (content) => {
    navigator.clipboard
      .writeText(content)
      .then(() => alert("Link copied to clipboard!"))
      .catch((error) => console.error("Failed to copy:", error));
  };

  const handleOnAddToCart = (e) => {
    e.preventDefault();
    if (!user._id) {
      dispatch(setPublicUrl(url));
      navigate("/login");
      return;
    }
    const selectedFilter = filterRef.current?.value;
    dispatch(
      addCartsAction({
        itemId: _iid,
        filter: selectedFilter ? selectedFilter : "",
        count,
      })
    );
  };

  useEffect(() => {
    dispatch(getIndividualItemAction(_iid));
    filterRef.current = document.getElementById("filterSelect");
  }, [_iid, dispatch]);

  useEffect(() => {
    if (selectedItem?._id) {
      setImage(selectedItem?.thumbnail);
      setTotalPrice(selectedItem?.price);
      setForm({
        price: selectedItem.price,
        filter: null,
        count: 1,
        totalPrice: selectedItem.price,
      });
    }
  }, [selectedItem]);

  return (
    <AppLayOut>
      <div className="itemSelection">
        <div className="itemSelection_body">
          <div className="itemSelection_body__img">
            <div className="itemSelection_body__img-images">
              {images &&
                images.map((img, i) => (
                  <img
                    className={
                      img.secure_url === image
                        ? "item-subImages item-subImages-border"
                        : "item-subImages"
                    }
                    src={img.secure_url}
                    alt="thumbnail"
                    key={i}
                    onClick={() => handleOnImageClick(img.secure_url)}
                  />
                ))}
            </div>

            <div className="itemSelection_body__img-image">
              {image && (
                <ItemCard
                  name={name}
                  img={image}
                  price={price}
                  ratingsRate="3.5"
                  ratingsCount="990"
                  location="selection"
                  id={_iid}
                  description={description} /* Description now INSIDE card */
                />
              )}
            </div>
          </div>

          <div className="itemSelection_body__shopping">
            <Form onSubmit={handleOnAddToCart}>
              <div className="body_shopping">
                <div className="itemSelection_body__shoping-price">
                  <label htmlFor="unitPrice_label" className="unitPrice_label">
                    Unit Price:
                  </label>
                  <input
                    className="unitPrice_input"
                    type="text"
                    id="unitPrice"
                    value={price ?? ""}
                    readOnly
                    name="price"
                  />
                </div>

                {selectedItem?.filters?.length ? (
                  <div className="itemSelection_body__shoping-filter">
                    <div className="filterName">{filterName}:</div>
                    <Form.Select
                      name="filter"
                      className="filter_heading"
                      id="filterSelect"
                      ref={filterRef}
                      required
                    >
                      <option value="">choose</option>
                      {filters.map((filter, i) => (
                        <option key={i} value={filter}>
                          {filter}
                        </option>
                      ))}
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
                    <Button
                      variant="none"
                      type="button"
                      className="btn-noFocus"
                    >
                      -
                    </Button>
                  </span>
                  <input
                    className="count"
                    type="text"
                    id="number"
                    value={count}
                    readOnly
                    name="count"
                  />
                  <span
                    className="itemSelection_body__shopping-btn"
                    onClick={handleOnIncrement}
                  >
                    <Button
                      className="btn-noFocus"
                      variant="none"
                      type="button"
                    >
                      +
                    </Button>
                  </span>
                </div>

                <div className="itemSelection_body_shopping-totalPrice">
                  <label className="totalPrice" htmlFor="totalPrice">
                    Total Price:
                  </label>
                  <input
                    className="totalPriceValue"
                    type="text"
                    id="readOnlyField"
                    value={totalPrice ?? ""}
                    readOnly
                    name="totalPrice"
                  />
                </div>

                <div className="itemSelection_buttonoptions">
                  <div className="itemSelection_body_shopping-buy d-grid border-0">
                    <Button
                      size="lg"
                      className="-util-btn-positive"
                      type="submit"
                    >
                      Add to cart
                    </Button>
                  </div>
                  <div className="d-grid border-0">
                    <Button
                      className="btn-fav -util-fav"
                      onClick={handleOnAddToFav}
                    >
                      Add to favourites
                    </Button>
                  </div>
                  <div className="d-grid border-0">
                    <Button
                      className="-util-share"
                      onClick={() =>
                        copyOnClick(process.env.REACT_APP_ROOTURL + url)
                      }
                    >
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>

        <div className="itemSelection_reviews">
          <h3 className="itemSelection_reviews__heading">Recent Reviews</h3>
          <div className="itemSelection_reviews__content">
            <div className="itemSelection_reviews__content">
              <div className="itemSelection_reviews__content-review">
                <div className="itemSelection_reviews__content-review--first -util-borderbottom">
                  <div className="itemSelection_reviews__content-review--first_name">
                    Pradeep
                  </div>
                  <div className="itemSelection_reviews__content-review--first_date">
                    19/06/2023
                  </div>
                </div>

                <div className="itemSelection_reviews__content-review--second">
                  <div className="itemSelection_reviews__content-review--second_description">
                    Is a really nice Product Lorem ipsum, dolor sit amet
                    consectetur adipisicing elit. Laboriosam aut culpa dolor
                    explicabo illum voluptatem distinctio beatae dicta cum
                    tempora.
                  </div>
                  <div className="itemSelection_reviews__content-review--second_star">
                    5 stars
                  </div>
                </div>
              </div>
              <div className="itemSelection_reviews__content-review">
                <div className="itemSelection_reviews__content-review--first -util-borderbottom">
                  <div className="itemSelection_reviews__content-review--first_name">
                    Pradeep
                  </div>
                  <div className="itemSelection_reviews__content-review--first_date">
                    19/06/2023
                  </div>
                </div>

                <div className="itemSelection_reviews__content-review--second">
                  <div className="itemSelection_reviews__content-review--second_description">
                    Is a really nice Product Lorem ipsum, dolor sit amet
                    consectetur adipisicing elit. Laboriosam aut culpa dolor
                    explicabo illum voluptatem distinctio beatae dicta cum
                    tempora.
                  </div>
                  <div className="itemSelection_reviews__content-review--second_star">
                    5 stars
                  </div>
                </div>
              </div>
              <div className="itemSelection_reviews__content-review">
                <div className="itemSelection_reviews__content-review--first -util-borderbottom">
                  <div className="itemSelection_reviews__content-review--first_name">
                    Pradeep
                  </div>
                  <div className="itemSelection_reviews__content-review--first_date">
                    19/06/2023
                  </div>
                </div>

                <div className="itemSelection_reviews__content-review--second">
                  <div className="itemSelection_reviews__content-review--second_description">
                    Is a really nice Product Lorem ipsum, dolor sit amet
                    consectetur adipisicing elit. Laboriosam aut culpa dolor
                    explicabo illum voluptatem distinctio beatae dicta cum
                    tempora.
                  </div>
                  <div className="itemSelection_reviews__content-review--second_star">
                    5 stars
                  </div>
                </div>
              </div>
              <div className="itemSelection_reviews__content-review">
                <div className="itemSelection_reviews__content-review--first -util-borderbottom">
                  <div className="itemSelection_reviews__content-review--first_name">
                    Pradeep
                  </div>
                  <div className="itemSelection_reviews__content-review--first_date">
                    19/06/2023
                  </div>
                </div>

                <div className="itemSelection_reviews__content-review--second">
                  <div className="itemSelection_reviews__content-review--second_description">
                    Is a really nice Product Lorem ipsum, dolor sit amet
                    consectetur adipisicing elit. Laboriosam aut culpa dolor
                    explicabo illum voluptatem distinctio beatae dicta cum
                    tempora.
                  </div>
                  <div className="itemSelection_reviews__content-review--second_star">
                    5 stars
                  </div>
                </div>
              </div>
              <div className="itemSelection_reviews__content-review">
                <div className="itemSelection_reviews__content-review--first -util-borderbottom">
                  <div className="itemSelection_reviews__content-review--first_name">
                    Pradeep
                  </div>
                  <div className="itemSelection_reviews__content-review--first_date">
                    19/06/2023
                  </div>
                </div>

                <div className="itemSelection_reviews__content-review--second">
                  <div className="itemSelection_reviews__content-review--second_description">
                    Is a really nice Product Lorem ipsum, dolor sit amet
                    consectetur adipisicing elit. Laboriosam aut culpa dolor
                    explicabo illum voluptatem distinctio beatae dicta cum
                    tempora.
                  </div>
                  {/* to make the content of the star rating show in a single line min-width is applied to the following class */}
                  <div className="itemSelection_reviews__content-review--second_star">
                    5 stars
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayOut>
  );
};

export default ItemSelectionPage;
