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
} from "../../slices/system/systemAction";
import { setPublicUrl } from "../../slices/system/systemSlice";
export const Header = () => {
  const [windowWidth, setwindowWidth] = useState(window.innerWidth);
  const { categories } = useSelector((state) => state.categories);
  const { user } = useSelector((state) => state.user);
  const { favourites } = useSelector((state) => state.system);
  const { cart } = useSelector((state) => state.system);
  const url = window.location.pathname;
  const navigate = useNavigate();
  let address = "";
  if (user._id) {
    address =
      user.address.streetAddress +
      " " +
      user.address.suburb +
      " " +
      user.address.state +
      " " +
      user.address.postCode;
  }
  const dispatch = useDispatch();
  const handleOnLogin = () => {
    dispatch(setPublicUrl(url));
    navigate("/login");
  };
  const handleOnLogout = () => {
    dispatch(logoutUserAction({}));
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  useEffect(() => {
    !categories.length && dispatch(getCategoriesAction());
    !user._id && dispatch(autoLogin());
    !favourites.length && dispatch(getFavsAction());
    !cart.length && dispatch(getCartsAction());
    function handleWindowResize() {
      setwindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [
    dispatch,
    user._id,
    categories.length,
    favourites.length,
    cart.length,
    url,
  ]);
  let today = new Date();
  let hour = today.getHours();
  return (
    <Navbar expand="lg" variant="dark" className="header_navbar color-white">
      <div className="container-fluid ">
        <Col md={2}>
          <Navbar.Brand className="navbar-brand d-flex flex-column justify-content-center align-items-center">
            <img src={logo} alt="" className="logo " />
          </Navbar.Brand>
        </Col>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav ">
          <Nav className="navbar-nav ms-auto mb-2 mb-lg-0 ">
            {windowWidth < 992 && (
              <Dropdown>
                <Dropdown.Toggle
                  variant="none"
                  id="dropdown-basic"
                  className="color-white dropdown-toggle search__filter-toggle"
                >
                  Categories
                </Dropdown.Toggle>
                <Dropdown.Menu
                  variant="dark"
                  className="categories__toggle-menu -util-togglemenu"
                >
                  {categories.map(
                    (item, i) =>
                      !item.catId && (
                        <Link
                          className="nav-link text-white"
                          to={"/categories/" + item._id}
                          key={i}
                          id={item._id}
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
            )}

            {url !== "/" && (
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link
                className={
                  url.includes("/offers") & (windowWidth > 991)
                    ? "nav-link active -util-underline"
                    : "nav-link active -util-underline-transparent"
                }
                aria-current="page"
                to="/offers"
              >
                Offers
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  url.includes("/bestsellers") & (windowWidth > 991)
                    ? "nav-link active -util-underline"
                    : "nav-link active -util-underline-transparent"
                }
                to="/bestsellers"
              >
                Best Sellers
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  url.includes("/newarrivals") & (windowWidth > 991)
                    ? "nav-link active -util-underline"
                    : "nav-link active -util-underline-transparent"
                }
                to="/newarrivals"
              >
                New Arrivals
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  url.includes("/dealsandsales") & (windowWidth > 991)
                    ? "nav-link active -util-underline"
                    : "nav-link active -util-underline-transparent"
                }
                to="/dealsandsales"
              >
                Deals and Sales
              </Link>
            </li>

            <li className="nav-item nav_icons">
              <Link
                className={
                  url.includes("/favourites") & (windowWidth > 991)
                    ? "nav-link active nav_icons__icon -util-underline"
                    : "nav-link active nav_icons__icon -util-underline-transparent"
                }
                to="/favourites"
              >
                {windowWidth > 991 ? (
                  <i className="fa-solid fa-heart -util-font15"></i>
                ) : (
                  "Favourites"
                )}
              </Link>
              <Link to="paymentfailed">failed pay</Link>
              <span className="nav_icons__count">{favourites?.length}</span>
            </li>

            <li className="nav-item nav_icons">
              <Link
                className={
                  url.includes("/cart") & (windowWidth > 991)
                    ? "nav-link active nav_icons__icon -util-underline"
                    : "nav-link active nav_icons__icon -util-underline-transparent"
                }
                to="/cart"
              >
                {windowWidth > 991 ? (
                  <i className="fa-solid fa-cart-shopping -util-font15"></i>
                ) : (
                  "Cart"
                )}
              </Link>
              <span className="nav_icons__count">{cart?.length}</span>
            </li>

            {windowWidth < 992 &&
              (user?._id ? (
                <Dropdown>
                  <Dropdown.Toggle
                    variant="none"
                    id="dropdown-basic"
                    className="color-white dropdown-toggle "
                  >
                    Profile
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    variant="dark"
                    className="profile__toggle-menu -util-togglemenu"
                  >
                    <Link className="nav-link">Profile</Link>
                    <Link className="nav-link">Purchases</Link>
                    <Link className="nav-link">Reviews</Link>
                    <Link className="nav-link">Payment Methods</Link>
                    <Link className="nav-link">Close Account</Link>
                    <Link className="nav-link">Switch Account</Link>
                    <Link className="nav-link" onClick={handleOnLogout}>
                      Sign Out
                    </Link>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <div className="-util-pointer" onClick={handleOnLogin}>
                  Login
                </div>
              ))}
          </Nav>
          <div className="search-and-icons">
            <Form
              className="d-flex align-items-center mb-2 categories_search"
              role="search"
            >
              <Dropdown>
                <Dropdown.Toggle
                  variant="none"
                  id="dropdown-basic"
                  className="color-white dropdown-toggle search__filter-toggle"
                >
                  All
                </Dropdown.Toggle>
                <Dropdown.Menu
                  variant="dark"
                  className="categories_search__menu -util-togglemenu"
                >
                  <Dropdown.Item href="#/action-1">All</Dropdown.Item>
                  <Dropdown.Item href="#/action-1">Category 1</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Category 2</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Category 3</Dropdown.Item>
                  <Dropdown.Item href="#/action-1">Category 4</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Category 5</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Category 6</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Form.Control
                className="form-control me-2 search_form__control"
                type="text"
                aria-label="Search"
              />
              <Button variant="none" className="search_icon">
                <i className="fa-solid fa-magnifying-glass -util-font15 color-pastrelred "></i>
              </Button>
            </Form>
          </div>
          <div className="user color-white ">
            {windowWidth > 991 && (
              <div className="user_profile">
                <p className="user_profile__user user_profile__address">
                  {user?._id
                    ? `Hello ${user.firstName} ! Delivery Address: ${address}`
                    : `Dear valued client ! Wishing you a great
            ${
              hour < 4
                ? " night"
                : hour < 12
                ? " morning"
                : hour < 17
                ? " day"
                : hour < 21
                ? " evening"
                : " night"
            }
            
           !`}
                </p>
                {user?._id ? (
                  <p className="user_profile__profile">
                    <Button
                      variant="none"
                      className=" user_profile__profie-btn btn-logout text-white"
                    >
                      <i className="fa-solid fa-user -util-font15"></i>
                      <i
                        className={`fa-solid fa-caret-down ${
                          isDropdownOpen ? "-util-rotate_180" : ""
                        }`}
                      ></i>
                    </Button>
                    <Dropdown
                      show={isDropdownOpen}
                      onToggle={handleDropdownToggle}
                    >
                      <Dropdown.Toggle
                        variant="success"
                        id="dropdown-basic"
                        className="user_profile__profie-dropdown"
                      ></Dropdown.Toggle>
                      <Dropdown.Menu className="user_profile__profie-dropdown-items -util-togglemenu">
                        <Link className="nav-link">Profile</Link>
                        <Link className="nav-link">Purchases</Link>
                        <Link className="nav-link">Reviews</Link>
                        <Link className="nav-link">Payment Methods</Link>
                        <Link className="nav-link">Close Account</Link>
                        <Link className="nav-link">Switch Account</Link>
                        <Link className="nav-link" onClick={handleOnLogout}>
                          Sign Out
                        </Link>
                      </Dropdown.Menu>
                    </Dropdown>
                  </p>
                ) : (
                  <div
                    className="nav-link header_login-btn"
                    onClick={handleOnLogin}
                  >
                    Login
                  </div>
                )}
              </div>
            )}
          </div>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};
