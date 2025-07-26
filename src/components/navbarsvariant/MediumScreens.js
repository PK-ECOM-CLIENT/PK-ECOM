import React, { useEffect, useState } from "react";
import "./tabletScreens.css";
import "./computerScreens.css";
import logo from "../../assits/images/logo/pk.png";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { Button } from "react-bootstrap";
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
  const [windowWidth, setwindowWidth] = useState(window.innerWidth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url = window.location.pathname;

  const { categories } = useSelector((state) => state.categories);
  const { user } = useSelector((state) => state.user);
  const { favourites, cart } = useSelector((state) => state.system);

  const address = user._id
    ? `${user.address.streetAddress} ${user.address.suburb} ${user.address.state} ${user.address.postCode}`
    : "";

  const hour = new Date().getHours();

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

  return (
    <div className="maindiv">
      <div className="logo">
        <img src={logo} alt="logo" style={{ maxHeight: "100%", maxWidth: "100%" }} />
      </div>

      <div className="side">
        <div className="top">
          <Form className="search d-flex align-items-center" role="search">
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

          <div className="login">
            {user?._id ? (
              <div className="user_profile__profile" onClick={handleDropdownToggle} style={{ cursor: "pointer" }}>
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
              </div>
            ) : (
              <div className="nav-link header_login-btn" onClick={handleOnLogin}>Login</div>
            )}
          </div>
        </div>

        <div className="bottom">
          <div className="options" onClick={handleCategoriesDropdownToggle}>
            Categories
            <i className={`fa-solid fa-caret-down ${isCategoriesDropdownOpen ? "-util-rotate_180" : ""}`} style={{ marginLeft: "5px" }}></i>
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

          <div className="options"><Link to="/offers">Offers</Link></div>
          <div className="options"><Link to="/bestsellers">Best Sellers</Link></div>
          <div className="options"><Link to="/newarrivals">New Arrivals</Link></div>
          <div className="options"><Link to="/dealsandsales">Deals & Sales</Link></div>

          <div className="options">
            <Link to="/favourites">
              <i className="fa-solid fa-heart -util-font15"></i>
              <span className="nav_icons__count">{favourites?.length}</span>
            </Link>
          </div>

          <div className="options">
            <Link to="/cart">
              <i className="fa-solid fa-cart-shopping -util-font15"></i>
              <span className="nav_icons__count">{cart?.length}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediumScreens;
