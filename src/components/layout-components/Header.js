import "./Header.css";
import React, { useEffect, useState } from "react";
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

export const Header = () => {
  const [windowWidth, setwindowWidth] = useState(window.innerWidth);
  const { categories } = useSelector((state) => state.categories);
  const { user } = useSelector((state) => state.user);
  const { favourites, cart } = useSelector((state) => state.system);

  const url = window.location.pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);

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
    if (!categories.length) dispatch(getCategoriesAction());
    if (!user._id) dispatch(autoLogin());
    if (!favourites.length) dispatch(getFavsAction());
    if (!cart.length) dispatch(getCartsAction());
    if (user._id) dispatch(getPurchasesAction());
  }, [dispatch, user._id, categories.length, favourites.length, cart.length]);

  const hour = new Date().getHours();

  return (
    <Navbar expand="lg" variant="dark" className="header_navbar color-white">
      <div className="container-fluid">
        <Col md={2}>
          <Navbar.Brand className="navbar-brand d-flex flex-column justify-content-center align-items-center">
            <img src={logo} alt="logo" className="logo" />
          </Navbar.Brand>
        </Col>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-nav ms-auto mb-2 mb-lg-0">
            {windowWidth < 992 && (
              <div className="dropdown-wrapper" style={{ position: "relative" }}>
                <div className="color-white search__filter-toggle" onClick={handleCategoriesDropdownToggle} style={{ cursor: "pointer" }}>
                  Categories
                  <i className={`fa-solid fa-caret-down ${isCategoriesDropdownOpen ? "-util-rotate_180" : ""}`} style={{ marginLeft: "5px" }}></i>
                </div>
                <Dropdown show={isCategoriesDropdownOpen}>
                  <Dropdown.Menu variant="light" className="user_profile__profie-dropdown-items" style={{ position: "absolute", top: "100%", left: 0 }}>
                    {categories.map(
                      (item, i) =>
                        !item.catId && (
                          <Link className="nav-link dropdown-item" to={`/categories/${item._id}`} key={i}>
                            {item.name === "Home & Kitchen" ? (
                              <span>{item.name}<span className="-util-nav">*</span></span>
                            ) : (
                              item.name
                            )}
                          </Link>
                        )
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}

            {url !== "/" && <li className="nav-item"><Link className="nav-link active" to="/">Home</Link></li>}
            <li className="nav-item"><Link className={`nav-link active ${url.includes("/offers") && windowWidth > 991 ? "-util-underline" : "-util-underline-transparent"}`} to="/offers">Offers</Link></li>
            <li className="nav-item"><Link className={`nav-link active ${url.includes("/bestsellers") && windowWidth > 991 ? "-util-underline" : "-util-underline-transparent"}`} to="/bestsellers">Best Sellers</Link></li>
            <li className="nav-item"><Link className={`nav-link active ${url.includes("/newarrivals") && windowWidth > 991 ? "-util-underline" : "-util-underline-transparent"}`} to="/newarrivals">New Arrivals</Link></li>
            <li className="nav-item"><Link className={`nav-link active ${url.includes("/dealsandsales") && windowWidth > 991 ? "-util-underline" : "-util-underline-transparent"}`} to="/dealsandsales">Deals and Sales</Link></li>

            <li className="nav-item nav_icons">
              <Link className={`nav-link active nav_icons__icon ${url.includes("/favourites") && windowWidth > 991 ? "-util-underline" : "-util-underline-transparent"}`} to="/favourites">
                {windowWidth > 991 ? <i className="fa-solid fa-heart -util-font15"></i> : "Favourites"}
              </Link>
              <span className="nav_icons__count">{favourites?.length}</span>
            </li>

            <li className="nav-item nav_icons">
              <Link className={`nav-link active nav_icons__icon ${url.includes("/cart") && windowWidth > 991 ? "-util-underline" : "-util-underline-transparent"}`} to="/cart">
                {windowWidth > 991 ? <i className="fa-solid fa-cart-shopping -util-font15"></i> : "Cart"}
              </Link>
              <span className="nav_icons__count">{cart?.length}</span>
            </li>

            {windowWidth < 992 && user?._id ? (
              <div className="dropdown-wrapper" style={{ position: "relative" }}>
                <div className="profile-toggle text-white" onClick={handleDropdownToggle} style={{ cursor: "pointer" }}>
                  Profile
                  <i className={`fa-solid fa-caret-down ${isDropdownOpen ? "-util-rotate_180" : ""}`} style={{ marginLeft: "5px" }}></i>
                </div>
                <Dropdown show={isDropdownOpen}>
                  <Dropdown.Menu className="user_profile__profie-dropdown-items" style={{ position: "absolute", top: "100%", right: 0 }}>
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
              <div className="-util-pointer" onClick={handleOnLogin}>Login</div>
            )}
          </Nav>

          <div className="search-and-icons">
            <Form className="d-flex align-items-center mb-2 categories_search" role="search">
              <Dropdown>
                <Dropdown.Toggle variant="none" id="dropdown-basic" className="search__filter-toggle">All</Dropdown.Toggle>
                <Dropdown.Menu variant="dark" className="categories_search__menu -util-togglemenu">
                  <Dropdown.Item href="#">All</Dropdown.Item>
                  <Dropdown.Item href="#">Category 1</Dropdown.Item>
                  <Dropdown.Item href="#">Category 2</Dropdown.Item>
                  <Dropdown.Item href="#">Category 3</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Form.Control className="form-control me-2 search_form__control" type="text" aria-label="Search" />
              <Button variant="none" className="search_icon">
                <i className="fa-solid fa-magnifying-glass -util-font15 color-pastrelred"></i>
              </Button>
            </Form>
          </div>

          <div className="user color-white">
            {windowWidth > 991 && (
              <div className="user_profile">
                <p className="user_profile__user user_profile__address">
                  {user?._id
                    ? `Hello ${user.firstName} ! Delivery Address: ${address}`
                    : `Dear valued client! Wishing you a great ${
                        hour < 4 ? "night" : hour < 12 ? "morning" : hour < 17 ? "day" : hour < 21 ? "evening" : "night"
                      }!`}
                </p>
                {user?._id ? (
                  <p className="user_profile__profile" onClick={handleDropdownToggle} style={{ cursor: "pointer" }}>
                    <div className="user_profile__profie-btn btn-logout text-white d-flex align-items-center">
                      <i className="fa-solid fa-user -util-font15"></i>
                      <i className={`fa-solid fa-caret-down ${isDropdownOpen ? "-util-rotate_180" : ""}`}></i>
                    </div>
                    <Dropdown show={isDropdownOpen}>
                      <Dropdown.Menu variant="light" className="user_profile__profie-dropdown-items">
                        <Link className="nav-link dropdown-item">Profile</Link>
                        <Link className="nav-link dropdown-item" to="/purchases">Purchases</Link>
                        <Link className="nav-link dropdown-item">Reviews</Link>
                        <Link className="nav-link dropdown-item">Payment Methods</Link>
                        <Link className="nav-link dropdown-item">Close Account</Link>
                        <Link className="nav-link dropdown-item">Switch Account</Link>
                        <Link className="nav-link dropdown-item" onClick={handleOnLogout}>Sign Out</Link>
                      </Dropdown.Menu>
                    </Dropdown>
                  </p>
                ) : (
                  <div className="nav-link header_login-btn" onClick={handleOnLogin}>Login</div>
                )}
              </div>
            )}
          </div>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};
