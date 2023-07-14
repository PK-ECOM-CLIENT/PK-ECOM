import React, { useEffect, useState } from "react";
import "./itemSelectionPage.css";
import { AppLayOut } from "../../components/layout/AppLayOut";
import { ItemCard } from "../../components/itemCard/ItemCard";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIndividualItemAction } from "../../slices/items/itemsAction";
const ItemSelectionPage = () => {
  const { _cid, _pid, _iid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedItem } = useSelector((state) => state.items);
  const { name, description, images, price } = selectedItem;
  const [image, setImage] = useState("");

  useEffect(() => {
    dispatch(getIndividualItemAction(_iid));
  }, [_iid, dispatch]);

  useEffect(() => {
    if (selectedItem?._id) {
      setImage(selectedItem?.thumbnail);
    }
  }, [selectedItem]);
  const onButtonBuynowClick = () => {
    navigate(`/categories/${_cid}/products/${_pid}/item/${_iid}/buynow`);
  };
  const handleOnImageClick = (img) => {
    setImage(img);
  };
  // for sharing
  const copyOnClick = (content) => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy:", error);
      });
  };
  return (
    <div>
      <AppLayOut>
        <div className="itemSelection">
          <div className="itemSelection_body">
            <div className="itemSelection_body__img">
              <div className="itemSelection_body__img-images">
                {images &&
                  images.map((img, i) => (
                    <img
                      className="item-subImages"
                      src={img.secure_url}
                      alt="img1"
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
                  ></ItemCard>
                )}

                <div className="itemSelection_body__img-image--description">
                  {description}
                </div>
              </div>
            </div>
            <div className="itemSelection_body__shopping">
              <div className="itemSelection_body__shoping-price">
                Unit Price: $ {price}
              </div>
              <div className="itemSelection_body__shoping-filter">
                Size:
                <Form>
                  <Form.Select name="state" className="filter_heading">
                    <option value="choose">choose</option>
                    <option value="nsw">11.5 inch</option>
                    <option value="act">13 inch</option>
                    <option value="nt">15 inch</option>
                  </Form.Select>
                </Form>
              </div>
              <div className="itemSelection_body_shopping-no">
                Number of items:
                <span className="itemSelection_body__shopping-btn">+</span>1
                <span className="itemSelection_body__shopping-btn">-</span>
              </div>
              <div className="itemSelection_body_shopping-totalPrice">
                Total Price: 2200
              </div>
              <div className="itemSelection_body_shopping-buy d-grid mt-2 border-0">
                <Button
                  size="lg"
                  className="btn-positive"
                  onClick={onButtonBuynowClick}
                >
                  Buy Now
                </Button>
              </div>
              <div className="d-grid">
                <Button id="copyButton" onClick={() => copyOnClick("copy url")}>
                  Share
                </Button>
              </div>
              <div className="itemSelection_body_shopping-options">
                <Button className="btn-fav">Add to fav</Button>
                <Button className="btn-cart">Add to cart</Button>
              </div>
            </div>
          </div>

          <div className="itemSelection_reviews">
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
      </AppLayOut>
    </div>
  );
};

export default ItemSelectionPage;
