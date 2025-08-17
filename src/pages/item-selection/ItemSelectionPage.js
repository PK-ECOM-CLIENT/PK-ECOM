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
import BackButton from "../../components/backbutton/BackButton";

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
         <BackButton />
      <div className="itemSelection">
        <div className="itemSelection_container">
          {/* LEFT: gallery */}
          <section className="itemSelection_gallery">
            <div className="gallery_panel">
              <div className="gallery_media">
                {/* thumbnails rail */}
                <div className="thumbs">
                  {images?.map((img, i) => (
                    <img
                      key={i}
                      className={
                        img.secure_url === image
                          ? "thumb thumb--active"
                          : "thumb"
                      }
                      src={img.secure_url}
                      alt="thumbnail"
                      onClick={() => handleOnImageClick(img.secure_url)}
                    />
                  ))}
                </div>

                {/* main item card */}
                <div className="main_card">
                  {image && (
                    <ItemCard
                      name={name}
                      img={image}
                      price={price}
                      ratingsRate="3.5"
                      ratingsCount="990"
                      location="selection"
                      id={_iid}
                      description={description}
                    />
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT: checkout */}
          <aside className="itemSelection_checkout">
            <Form onSubmit={handleOnAddToCart} className="checkout_panel">
              <div className="checkout_rows">
                <div className="row_price">
                  <label htmlFor="unitPrice" className="lbl">
                    Unit Price:
                  </label>
                  <input
                    className="ro"
                    id="unitPrice"
                    value={price ?? ""}
                    readOnly
                  />
                </div>

                {selectedItem?.filters?.length ? (
                  <div className="row_filter">
                    <div className="lbl">{filterName}:</div>
                    <Form.Select
                      id="filterSelect"
                      ref={filterRef}
                      required
                      className="filter_select"
                    >
                      <option value="">choose</option>
                      {filters.map((f, i) => (
                        <option key={i} value={f}>
                          {f}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                ) : null}

                <div className="row_qty">
                  <label htmlFor="number" className="lbl">
                    No of items:
                  </label>
                  <Button
                    variant="none"
                    type="button"
                    className="qty_btn"
                    onClick={handleOnDecrement}
                  >
                    -
                  </Button>
                  <input
                    className="qty_count ro"
                    id="number"
                    value={count}
                    readOnly
                  />
                  <Button
                    variant="none"
                    type="button"
                    className="qty_btn"
                    onClick={handleOnIncrement}
                  >
                    +
                  </Button>
                </div>

                <div className="row_total">
                  <label htmlFor="totalPrice" className="lbl">
                    Total Price:
                  </label>
                  <input
                    className="ro"
                    id="totalPrice"
                    value={totalPrice ?? ""}
                    readOnly
                  />
                </div>

                <div className="row_cta">
                  <Button
                    size="lg"
                    className="-util-btn-positive w-100"
                    type="submit"
                  >
                    Add to cart
                  </Button>
                  <Button
                    className="btn-fav -util-fav w-100"
                    onClick={handleOnAddToFav}
                  >
                    Add to favourites
                  </Button>
                  <Button
                    className="-util-share w-100"
                    onClick={() =>
                      copyOnClick(process.env.REACT_APP_ROOTURL + url)
                    }
                  >
                    Share
                  </Button>
                </div>
              </div>
            </Form>
          </aside>
        </div>

        {/* Reviews */}
        <section className="itemSelection_reviews">
          <h3 className="itemSelection_reviews__heading">Recent Reviews</h3>
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
            </div>{" "}
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
            </div>{" "}
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
            </div>{" "}
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
            </div>{" "}
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
        </section>
      </div>
    </AppLayOut>
  );
};

export default ItemSelectionPage;
