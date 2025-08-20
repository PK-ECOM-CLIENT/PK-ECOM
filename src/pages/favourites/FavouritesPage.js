import React from "react";
import "./favouritesPage.css";
import { AppLayOut } from "../../components/layout/AppLayOut";
import { useSelector, useDispatch } from "react-redux";
import { ItemCard } from "../../components/itemCard/ItemCard";
import { Button } from "react-bootstrap";
import {
  setApplicationModal,
  setPublicUrl,
} from "../../slices/system/systemSlice";
import {
  addCartsAction,
  deleteFavsAction,
} from "../../slices/system/systemAction";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/backbutton/BackButton";

const Favourites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { favourites } = useSelector((state) => state.system);
  const { user } = useSelector((state) => state.user);
  const url = window.location.pathname;

  const requireLogin = () => {
    dispatch(setPublicUrl(url));
    navigate("/login");
  };

  const handleClearAll = () => {
    dispatch(
      setApplicationModal({
        title: "Clear favourites",
        body: "clear-favourites",
      })
    );
  };

  const handleAddToCart = (itemId) => {
    if (!user?._id) return requireLogin();
    dispatch(addCartsAction({ itemId, count: "1", filter: "" }));
  };

  const handleRemoveFromFavs = (itemId) => {
    if (!user?._id) return requireLogin();
    if (window.confirm("Remove this item from favourites?")) {
      dispatch(deleteFavsAction(itemId));
    }
  };

  return (
    <AppLayOut>
      <div className="-util-back_btn_wraper d-flex justify-content-between">
        <BackButton></BackButton>
        <header className="favs__header">
          {favourites.length > 0 && (
            <Button
              variant="outline-secondary"
              size="sm"
              className="favs__clear"
              onClick={handleClearAll}
            >
              Clear all
            </Button>
          )}
        </header>
      </div>
      <section className="favs">
        {favourites.length === 0 ? (
          <div className="favs__empty">
            <i className="fa-solid fa-heart -util-fav -util-font15"></i>
            <h4>No favourites yet</h4>
            <p>Add items to your favourites and they’ll show up here.</p>
            <a className="favs__browse -util-btn-positive" href="/">
              Browse products
            </a>
          </div>
        ) : (
          <div className="favs__grid">
            {favourites.map(
              ({ name, thumbnail, price, catId, productId, _id }, i) => (
                <div className="favs__cell" key={_id || i}>
                  <div className="favs__card">
                    <ItemCard
                      name={name}
                      img={thumbnail}
                      price={price}
                      ratingsRate="4.3"
                      ratingsCount="500"
                      location="favs" // keep icons visible but non-interactive inside the card
                      catId={catId}
                      productId={productId}
                      id={_id}
                    />
                    {/* Quick actions (functional) */}
                    <div className="favs__hoverbar">
                      <span className="favs__hint">Quick actions</span>

                      <div
                        className="favs__qa-btn"
                        aria-label="Add to cart"
                        title="Add to cart"
                        onClick={() => handleAddToCart(_id)}
                      >
                        <i className="fa-solid fa-cart-shopping -util-cart"></i>
                      </div>

                      <div
                        className="favs__qa-btn"
                        aria-label="Remove from favourites"
                        title="Remove from favourites"
                        onClick={() => handleRemoveFromFavs(_id)}
                      >
                        <i className="fa-solid fa-trash-can -util-trashcan"></i>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </section>
    </AppLayOut>
  );
};

export default Favourites;
