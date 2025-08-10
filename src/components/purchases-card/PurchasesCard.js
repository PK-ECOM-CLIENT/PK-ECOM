import React from "react";
import "./purchasesCard.css";
import { useDispatch, useSelector } from "react-redux";
import { setApplicationModal } from "../../slices/system/systemSlice";
import { CustomModal } from "../custom-modal/CustomModal";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { setSelectedPurchaseRecord } from "../../slices/system/systemAction";

export const PurchasesCard = ({
  name,
  image,
  orderDate,
  catId,
  productId,
  itemId,
  itemPrice,
  dropdownVisible,
  onToggleDropdown,
  item,
}) => {
  const { applicationModal } = useSelector((state) => state.system);
  const dispatch = useDispatch();

  const productUrl = `${process.env.REACT_APP_ROOTURL}/categories/${catId}/products/${productId}/item/${itemId}`;

  return (
    <article className={`pcard ${dropdownVisible ? "is-open" : ""}`}>
      <div className="pcard__main">
        {/* Image */}
        <Link to={productUrl} className="pcard__thumb">
          <img src={image} alt={name} />
        </Link>

        {/* Info */}
        <div className="pcard__info">
          <div className="pcard__top">
            <div className="pcard__date">
              <i className="fa-regular fa-calendar"></i>
              <span>Ordered on: {orderDate}</span>
            </div>
            <div className="pcard__price">
              <i className="fa-solid fa-dollar-sign"></i>
              <span>{itemPrice}</span>
            </div>
          </div>

          <Link className="pcard__name" to={productUrl}>
            {name}
          </Link>

          <div className="pcard__actions">
            <Button size="sm" className="-util-btn-positive pcard__buy">
              <Link className="pcard__buylink" to={productUrl}>
                Buy again
              </Link>
            </Button>

            <div className={`pcard__more ${dropdownVisible ? "is-open" : ""}`}>
              <button
                type="button"
                className="pcard__morebtn"
                onClick={() => {
                  onToggleDropdown(item._id);
                  dispatch(setSelectedPurchaseRecord(item));
                }}
                aria-expanded={dropdownVisible ? "true" : "false"}
                aria-haspopup="menu"
              >
                <span>More Actions</span>
                <i
                  className={`fa-solid fa-caret-down pcard__caret ${
                    dropdownVisible ? "is-open" : ""
                  }`}
                  aria-hidden="true"
                ></i>
              </button>

              {dropdownVisible && (
                <div className="pcard__menu" role="menu">
                  <button
                    className="pcard__menuitem"
                    onClick={() =>
                      dispatch(
                        setApplicationModal({
                          title: "Contact Seller",
                          body: "contact-seller",
                        })
                      )
                    }
                  >
                    <i className="fa-regular fa-envelope"></i>
                    Contact Seller
                  </button>

                  <button
                    className="pcard__menuitem"
                    onClick={() =>
                      dispatch(
                        setApplicationModal({
                          title: "Report Item",
                          body: "report-item",
                        })
                      )
                    }
                  >
                    <i className="fa-regular fa-flag"></i>
                    Report Item
                  </button>

                  <button
                    className="pcard__menuitem"
                    onClick={() =>
                      dispatch(
                        setApplicationModal({
                          title: "",
                          body: "leave-review",
                        })
                      )
                    }
                  >
                    <i className="fa-regular fa-star"></i>
                    Leave Review
                  </button>

                  <button className="pcard__menuitem" disabled>
                    <i className="fa-regular fa-circle-xmark"></i>
                    Cancel Purchase
                  </button>

                  <button
                    className="pcard__menuitem"
                    onClick={() =>
                      dispatch(
                        setApplicationModal({
                          title: "Payment Details",
                          body: "payment-details",
                        })
                      )
                    }
                  >
                    <i className="fa-regular fa-credit-card"></i>
                    Payment Details
                  </button>

                  <button
                    className="pcard__menuitem"
                    onClick={() =>
                      dispatch(
                        setApplicationModal({
                          title: "Order Details",
                          body: "order-details",
                        })
                      )
                    }
                  >
                    <i className="fa-regular fa-file-lines"></i>
                    Order Details
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {applicationModal.state && <CustomModal />}
    </article>
  );
};
