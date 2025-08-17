import React, { useEffect, useState } from "react";
import styles from "./smallScreens.module.css";
import logo from "../../assits/images/logo/pk.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { getCategoriesAction } from "../../slices/categories/categoriesAction";
import { autoLogin, logoutUserAction } from "../../slices/user/userAction";
import {
  getCartsAction,
  getFavsAction,
  getPurchasesAction,
} from "../../slices/system/systemAction";
import { setPublicUrl } from "../../slices/system/systemSlice";

const SmallScreens = () => {
  const [showMain, setShowMain] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { categories } = useSelector((state) => state.categories);
  const { user } = useSelector((state) => state.user);
  const { favourites, cart } = useSelector((state) => state.system);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url = window.location.pathname;

  useEffect(() => {
    if (!categories.length) dispatch(getCategoriesAction());
    if (!user._id) dispatch(autoLogin());
    if (!favourites.length) dispatch(getFavsAction());
    if (!cart.length) dispatch(getCartsAction());
    if (user._id) dispatch(getPurchasesAction());
  }, [dispatch, user._id, categories.length, favourites.length, cart.length]);

  const handleNavigate = (path) => {
    navigate(path);
    setShowMain(false);
    setShowCategories(false);
    setShowProfileMenu(false);
  };

  const handleOnLogin = () => {
    dispatch(setPublicUrl(url));
    navigate("/login");
    setShowMain(false);
  };

  const handleOnLogout = () => {
    dispatch(logoutUserAction({}));
    setShowProfileMenu(false);
    setShowMain(true);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Route however you handle search results:
    // e.g., navigate(`/search?q=${encodeURIComponent(searchTerm)}`)
    // For now, just close the offcanvas if a term exists:
    if (searchTerm.trim()) {
      // Example route (adjust to your app)
      navigate(`/?q=${encodeURIComponent(searchTerm.trim())}`);
    }
    setShowMain(false);
  };

  return (
    <div className={styles.navdiv}>
      <img src={logo} alt="logo" className={styles.logo} />
      {!showMain && (
        <div className={styles.toggle_icon} onClick={() => setShowMain(true)}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      )}

      {/* MAIN Offcanvas */}
      <Offcanvas
        show={showMain}
        onHide={() => setShowMain(false)}
        placement="top"
        className={styles.fullscreen_offcanvas}
      >
        <div className={styles.toggle_icon} onClick={() => setShowMain(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </div>
        <Offcanvas.Body>
          <ul className={styles.offcanvas_list}>
            <li
              onClick={() => {
                setShowMain(false);
                setShowCategories(true);
              }}
            >
              Categories
            </li>
            <li onClick={() => handleNavigate("/offers")}>Offers</li>
            <li onClick={() => handleNavigate("/bestsellers")}>Best Sellers</li>
            <li onClick={() => handleNavigate("/newarrivals")}>New Arrivals</li>
            <li onClick={() => handleNavigate("/dealsandsales")}>
              Deals and Sales
            </li>
            <li onClick={() => handleNavigate("/favourites")}>
              <span className={styles.text_with_count}>
                Favourites
                <span className={styles.count_badge}>{favourites.length}</span>
              </span>
            </li>
            <li onClick={() => handleNavigate("/cart")}>
              <span className={styles.text_with_count}>
                Cart
                <span className={styles.count_badge}>{cart.length}</span>
              </span>
            </li>

            {!user._id ? (
              <li onClick={handleOnLogin}>Login</li>
            ) : (
              <li
                onClick={() => {
                  setShowMain(false);
                  setShowProfileMenu(true);
                }}
              >
                Profile
              </li>
            )}

            {/* Search: pinned at the bottom with same width as items */}
            <li className={styles.offcanvas_searchItem}>
              <Form
                className={styles.offcanvas_searchForm}
                role="search"
                onSubmit={handleSearchSubmit}
              >
                <Form.Control
                  className={`form-control ${styles.search_form__control}`}
                  type="text"
                  aria-label="Search"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className={styles.search_icon} type="submit">
                  <i className="fa-solid fa-magnifying-glass -util-font15 color-pastrelred"></i>
                </button>
              </Form>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>

      {/* CATEGORIES Offcanvas */}
      <Offcanvas
        show={showCategories}
        onHide={() => {
          setShowCategories(false);
          setShowMain(true);
        }}
        placement="top"
        className={styles.fullscreen_offcanvas}
      >
        <div
          className={`${styles.toggle_icon} ${styles.left_icon}`}
          onClick={() => {
            setShowCategories(false);
            setShowMain(true);
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <Offcanvas.Body>
          <ul className={styles.offcanvas_list}>
            {categories
              .filter((cat) => !cat.catId)
              .map((cat) => (
                <li
                  key={cat._id}
                  onClick={() => handleNavigate(`/categories/${cat._id}`)}
                >
                  {cat.name === "Home & Kitchen" ? (
                    <span>
                      {cat.name} <span className="-util-nav">*</span>
                    </span>
                  ) : (
                    cat.name
                  )}
                </li>
              ))}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>

      {/* PROFILE MENU Offcanvas */}
      <Offcanvas
        show={showProfileMenu}
        onHide={() => {
          setShowProfileMenu(false);
          setShowMain(true);
        }}
        placement="top"
        className={styles.fullscreen_offcanvas}
      >
        <div
          className={`${styles.toggle_icon} ${styles.left_icon}`}
          onClick={() => {
            setShowProfileMenu(false);
            setShowMain(true);
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <Offcanvas.Body>
          <ul className={styles.offcanvas_list}>
            <li onClick={() => handleNavigate("/profile")}>Profile</li>
            <li onClick={() => handleNavigate("/purchases")}>Purchases</li>
            <li onClick={() => handleNavigate("/reviews")}>Reviews</li>
            <li onClick={() => handleNavigate("/paymentmethods")}>
              Payment Methods
            </li>
            <li onClick={() => handleNavigate("/closeaccount")}>
              Close Account
            </li>
            <li onClick={() => handleNavigate("/switchaccount")}>
              Switch Account
            </li>
            <li onClick={handleOnLogout}>Sign Out</li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default SmallScreens;
