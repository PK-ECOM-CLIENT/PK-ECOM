import React, { useEffect, useState } from "react";
import styles from "./tabletScreens.module.css"; // ✅ Updated for CSS Modules
import logo from "../../assits/images/logo/pk.png";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { Button, Col, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAction } from "../../slices/categories/categoriesAction";
import { autoLogin, logoutUserAction } from "../../slices/user/userAction";
import {
  getCartsAction,
  getFavsAction,
  getPurchasesAction,
} from "../../slices/system/systemAction";
import { setPublicUrl } from "../../slices/system/systemSlice";

const MediumScreens = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url = window.location.pathname;

  const { categories } = useSelector((state) => state.categories);
  const { user } = useSelector((state) => state.user);
  const { favourites, cart } = useSelector((state) => state.system);

  const handleOnLogin = () => {
    dispatch(setPublicUrl(url));
    navigate("/login");
  };

  const handleOnLogout = () => {
    dispatch(logoutUserAction({}));
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsCategoriesDropdownOpen(false);
  };

  const handleCategoriesDropdownToggle = () => {
    setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    if (!categories.length) dispatch(getCategoriesAction());
    if (!user._id) dispatch(autoLogin());
    if (!favourites.length) dispatch(getFavsAction());
    if (!cart.length) dispatch(getCartsAction());
    if (user._id) dispatch(getPurchasesAction());
  }, [dispatch, user._id, categories.length, favourites.length, cart.length]);

  return (
    <div className={styles.maindiv}>
      <div className={styles.top}>
        <Col sm={2} className={styles.logo}>
          <Navbar.Brand className="navbar-brand d-flex flex-column justify-content-center align-items-center">
            <img src={logo} alt="logo" className={styles.logo_icon} />
          </Navbar.Brand>
        </Col>
        <div className={styles.search_login}>
          <div className={styles.search}>
            <Form className={styles.search} role="search">
              <Form.Control
                className={`form-control ${styles.search_form__control}`}
                type="text"
                aria-label="Search"
                placeholder="Search"
              />
              <Button variant="none" className={styles.search_icon}>
                <i className="fa-solid fa-magnifying-glass -util-font15 color-pastrelred"></i>
              </Button>
            </Form>
          </div>
          <div className={styles.login}>
            {user?._id ? (
              <div
                className={styles.user_profile__profile}
                onClick={handleDropdownToggle}
                style={{ cursor: "pointer" }}
              >
                <div className={`${styles.user_profile__profie_btn} btn-logout text-white d-flex align-items-center`}>
                  <i className="fa-solid fa-user -util-font15"></i>
                  <i
                    className={`fa-solid fa-caret-down ${
                      isDropdownOpen ? "-util-rotate_180" : ""
                    }`}
                  ></i>
                </div>
                <Dropdown show={isDropdownOpen}>
                  <Dropdown.Menu
                    variant="light"
                    className={styles.user_profile__profie_dropdown_items}
                  >
                    <Link className="nav-link dropdown-item">Profile</Link>
                    <Link className="nav-link dropdown-item" to="/purchases">Purchases</Link>
                    <Link className="nav-link dropdown-item">Reviews</Link>
                    <Link className="nav-link dropdown-item">Payment Methods</Link>
                    <Link className="nav-link dropdown-item">Close Account</Link>
                    <Link className="nav-link dropdown-item">Switch Account</Link>
                    <Link className="nav-link dropdown-item" onClick={handleOnLogout}>Sign Out</Link>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            ) : (
              <div className={`nav-link ${styles.header_login_btn}`} onClick={handleOnLogin}>
                Login
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <Col sm={2} className={styles.logo}></Col>
        <ul className={styles.content_options}>
          <li className="nav-item" style={{ position: "relative" }}>
            <Link
              className="nav-link active"
              to="/"
              onClick={handleCategoriesDropdownToggle}
            >
              Categories
              <i
                className={`fa-solid fa-caret-down ${
                  isCategoriesDropdownOpen ? "-util-rotate_180" : ""
                }`}
                style={{ marginLeft: "5px" }}
              ></i>
            </Link>
            <Dropdown show={isCategoriesDropdownOpen}>
              <Dropdown.Menu
                variant="light"
                className={styles.user_profile__profie_dropdown_items}
                style={{ position: "absolute", top: "100%", left: 0 }}
              >
                {categories.map(
                  (item, i) =>
                    !item.catId && (
                      <Link
                        className="nav-link dropdown-item"
                        to={`/categories/${item._id}`}
                        key={i}
                      >
                        {item.name === "Home & Kitchen" ? (
                          <span>
                            {item.name}
                            <span className="-util-nav">*</span>
                          </span>
                        ) : (
                          item.name
                        )}
                      </Link>
                    )
                )}
              </Dropdown.Menu>
            </Dropdown>
          </li>
          {url !== "/" && (
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
          )}

          <li className="nav-item">
            <Link
              className={`nav-link active ${
                url.includes("/offers") ? "-util-underline" : "-util-underline-transparent"
              }`}
              to="/offers"
            >
              Offers
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link active ${
                url.includes("/bestsellers") ? "-util-underline" : "-util-underline-transparent"
              }`}
              to="/bestsellers"
            >
              Best Sellers
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link active ${
                url.includes("/newarrivals") ? "-util-underline" : "-util-underline-transparent"
              }`}
              to="/newarrivals"
            >
              New Arrivals
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link active ${
                url.includes("/dealsandsales") ? "-util-underline" : "-util-underline-transparent"
              }`}
              to="/dealsandsales"
            >
              Deals and Sales
            </Link>
          </li>

          <li className={`nav-item ${styles.nav_icons}`}>
            <Link
              className={`nav-link active ${styles.nav_icons__icon} ${
                url.includes("/favourites") ? "-util-underline" : "-util-underline-transparent"
              }`}
              to="/favourites"
            >
              <i className="fa-solid fa-heart -util-font15"></i>
            </Link>
            <span className={styles.nav_icons__count}>{favourites?.length}</span>
          </li>

          <li className={`nav-item ${styles.nav_icons}`}>
            <Link
              className={`nav-link active ${styles.nav_icons__icon} ${
                url.includes("/cart") ? "-util-underline" : "-util-underline-transparent"
              }`}
              to="/cart"
            >
              <i className="fa-solid fa-cart-shopping -util-font15"></i>
            </Link>
            <span className={styles.nav_icons__count}>{cart?.length}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MediumScreens;
