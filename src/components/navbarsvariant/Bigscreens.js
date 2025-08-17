import React, { useEffect, useRef, useState } from "react";
import styles from "./computerScreens.module.css"; // ✅ CSS Module
import logo from "../../assits/images/logo/pk.png";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
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

const Bigscreens = () => {
  const [windowWidth, setwindowWidth] = useState(window.innerWidth);
  const { categories } = useSelector((state) => state.categories);
  const { user } = useSelector((state) => state.user);
  const { favourites, cart } = useSelector((state) => state.system);

  const url = window.location.pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const address = user._id
    ? `${user.address.streetAddress} ${user.address.suburb} ${user.address.state} ${user.address.postCode}`
    : "";

  const handleOnLogin = () => {
    dispatch(setPublicUrl(url));
    navigate("/login");
  };

  const handleOnLogout = () => {
    dispatch(logoutUserAction({}));
    setIsProfileOpen(false);
  };

  const toggleProfile = () => setIsProfileOpen((v) => !v);

  // Close profile dropdown on outside click
  useEffect(() => {
    const onDocClick = (e) => {
      if (isProfileOpen && profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [isProfileOpen]);

  useEffect(() => {
    const handleResize = () => setwindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!categories.length) dispatch(getCategoriesAction());
    if (!user._id) dispatch(autoLogin());
    if (!favourites.length) dispatch(getFavsAction());
    if (!cart.length) dispatch(getCartsAction());
    if (user._id) dispatch(getPurchasesAction());
  }, [dispatch, user._id, categories.length, favourites.length, cart.length]);

  const hour = new Date().getHours();

  return (
    <div className={`${styles.navdiv} ${styles.header_navbar} ${styles.colorWhite}`}>
      <Col md={2}>
        <Navbar.Brand className="navbar-brand d-flex flex-column justify-content-center align-items-center">
          <img src={logo} alt="logo" className={styles.logo} />
        </Navbar.Brand>
      </Col>

      <div className={styles.contents}>
        <div className={styles.client_login_search_wrapper}>
          <div className={styles.client_login_search}>
            <div className={styles.client_login}>
              <div className={styles.client}>
                {user?._id
                  ? `Hello ${user.firstName} ! Delivery Address: ${address}`
                  : `Dear valued client! Wishing you a great ${
                      hour < 4 ? "night" : hour < 12 ? "morning" : hour < 17 ? "day" : hour < 21 ? "evening" : "night"
                    }!`}
              </div>

              <div>
                {user?._id ? (
                  <div className={styles.hprof} ref={profileRef}>
                    <button
                      type="button"
                      className={styles.hprof__btn}
                      onClick={toggleProfile}
                      aria-expanded={isProfileOpen ? "true" : "false"}
                      aria-haspopup="menu"
                    >
                      <i className="fa-solid fa-user -util-font15"></i>
                      <i
                        className={`fa-solid fa-caret-down ${styles.hprof__caret} ${
                          isProfileOpen ? styles.isopen : ""
                        }`}
                        aria-hidden="true"
                      ></i>
                    </button>

                    {isProfileOpen && (
                      <div className={styles.hprof__menu} role="menu">
                        <Link to="/profile" className={styles.hprof__menuitem} onClick={() => setIsProfileOpen(false)}>
                          <i className="fa-regular fa-id-badge"></i>
                          Profile
                        </Link>

                        <Link to="/purchases" className={styles.hprof__menuitem} onClick={() => setIsProfileOpen(false)}>
                          <i className="fa-regular fa-receipt"></i>
                          Purchases
                        </Link>

                        <Link to="/reviews" className={styles.hprof__menuitem} onClick={() => setIsProfileOpen(false)}>
                          <i className="fa-regular fa-star"></i>
                          Reviews
                        </Link>

                        <Link to="/payments" className={styles.hprof__menuitem} onClick={() => setIsProfileOpen(false)}>
                          <i className="fa-regular fa-credit-card"></i>
                          Payment Methods
                        </Link>

                        <button className={styles.hprof__menuitem} disabled>
                          <i className="fa-regular fa-circle-xmark"></i>
                          Close Account
                        </button>

                        <Link
                          to="/switch-account"
                          className={styles.hprof__menuitem}
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <i className="fa-regular fa-arrows-rotate"></i>
                          Switch Account
                        </Link>

                        <button className={styles.hprof__menuitem} onClick={handleOnLogout}>
                          <i className="fa-regular fa-right-from-bracket"></i>
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    className={`nav-link ${styles.header_login_btn} -util-link mb-3`}
                    onClick={handleOnLogin}
                    role="button"
                  >
                    Login
                  </div>
                )}
              </div>
            </div>

            <div className={styles.search_form_wrapper}>
              <Form className={styles.search_form} role="search">
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
          </div>
        </div>

        <ul className={styles.content_options}>
          {url !== "/" && (
            <li className="nav-item">
              <Link
                className={`nav-link active ${url === "/" ? "-util-underline" : "-util-underline-transparent"}`}
                to="/"
              >
                Home
              </Link>
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
              <div className={styles.icon_wrapper}>
                <i className="fa-solid fa-heart -util-font15"></i>
                <span className={styles.nav_icons__count}>{favourites?.length}</span>
              </div>
            </Link>
          </li>

          <li className={`nav-item ${styles.nav_icons}`}>
            <Link
              className={`nav-link active ${styles.nav_icons__icon} ${
                url.includes("/cart") ? "-util-underline" : "-util-underline-transparent"
              }`}
              to="/cart"
            >
              <div className={styles.icon_wrapper}>
                <i className="fa-solid fa-cart-shopping -util-font15"></i>
                <span className={styles.nav_icons__count}>{cart?.length}</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Bigscreens;
