import React, { useEffect, useState } from "react";
import "./computerScreens.css";
import logo from "../../assits/images/logo/pk.png";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
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

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] =
    useState(false);

  const address = user._id
    ? `${user.address.streetAddress} ${user.address.suburb} ${user.address.state} ${user.address.postCode}`
    : "";

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
    <div className="navdiv header_navbar color-white">
      <Col md={2}>
        <Navbar.Brand className="navbar-brand d-flex flex-column justify-content-center align-items-center">
          <img src={logo} alt="logo" className="logo" />
        </Navbar.Brand>
      </Col>
      <div className="contents">
        <div className="client_login_search_wrapper">
          <div className="client_login_search">
            {/* Wrapper for client and login */}
            <div className="client_login">
              <div className="client">
                {user?._id
                  ? `Hello ${user.firstName} ! Delivery Address: ${address}`
                  : `Dear valued client! Wishing you a great ${
                      hour < 4
                        ? "night"
                        : hour < 12
                        ? "morning"
                        : hour < 17
                        ? "day"
                        : hour < 21
                        ? "evening"
                        : "night"
                    }!`}
              </div>
              <div>
                {user?._id ? (
                  <p
                    onClick={handleDropdownToggle}
                    style={{ cursor: "pointer" }}
                  >
                    <div>
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
                        className="user_profile__profie-dropdown-items"
                      >
                        <Link className="nav-link dropdown-item">Profile</Link>
                        <Link
                          className="nav-link dropdown-item"
                          to="/purchases"
                        >
                          Purchases
                        </Link>
                        <Link className="nav-link dropdown-item">Reviews</Link>
                        <Link className="nav-link dropdown-item">
                          Payment Methods
                        </Link>
                        <Link className="nav-link dropdown-item">
                          Close Account
                        </Link>
                        <Link className="nav-link dropdown-item">
                          Switch Account
                        </Link>
                        <Link
                          className="nav-link dropdown-item"
                          onClick={handleOnLogout}
                        >
                          Sign Out
                        </Link>
                      </Dropdown.Menu>
                    </Dropdown>
                  </p>
                ) : (
                  <div
                    className="nav-link header_login-btn -util-link"
                    onClick={handleOnLogin}
                  >
                    Login
                  </div>
                )}
              </div>
            </div>

            {/* Search form that matches width of client_login */}
            <div className="search_form_wrapper">
              <Form className="search_form" role="search">
                <Form.Control
                  className="form-control search_form__control"
                  type="text"
                  aria-label="Search"
                  placeholder="Search"
                />
                <Button variant="none" className="search_icon">
                  <i className="fa-solid fa-magnifying-glass -util-font15 color-pastrelred"></i>
                </Button>
              </Form>
            </div>
          </div>
        </div>

        <ul className="content_options">
          <li>dfsdf</li>
          <li>Categories</li>
          <li>Offers</li>
          <li>New Arrivals</li>
          <li>Favourites</li>
          <li>Cart</li> <li>Offers</li>
          <li>New Arrivals</li>
          <li>Favourites</li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  );
};

export default Bigscreens;
