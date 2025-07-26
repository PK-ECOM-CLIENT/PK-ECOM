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
    // <Navbar expand="sm" variant="dark" className="header_navbar color-white">
    //   <div className="container-fluid">
    //     <Col md={2}>
    //       <Navbar.Brand className="navbar-brand d-flex flex-column justify-content-center align-items-center">
    //         <img src={logo} alt="logo" className="logo" />
    //       </Navbar.Brand>
    //     </Col>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="navbar-nav">
    //         <div className="navdiv">
    //           <div className="user_profile">
    //             <div className="user_profile__user user_profile__address">
    //               {user?._id
    //                 ? `Hello ${user.firstName} ! Delivery Address: ${address}`
    //                 : `Dear valued client! Wishing you a great ${
    //                     hour < 4
    //                       ? "night"
    //                       : hour < 12
    //                       ? "morning"
    //                       : hour < 17
    //                       ? "day"
    //                       : hour < 21
    //                       ? "evening"
    //                       : "night"
    //                   }!`}
    //             </div>
    //             <div className="user_profile_login">
    //               {user?._id ? (
    //                 <p
    //                   className="user_profile__profile"
    //                   onClick={handleDropdownToggle}
    //                   style={{ cursor: "pointer" }}
    //                 >
    //                   <div className="user_profile__profie-btn btn-logout text-white d-flex align-items-center">
    //                     <i className="fa-solid fa-user -util-font15"></i>
    //                     <i
    //                       className={`fa-solid fa-caret-down ${
    //                         isDropdownOpen ? "-util-rotate_180" : ""
    //                       }`}
    //                     ></i>
    //                   </div>
    //                   <Dropdown show={isDropdownOpen}>
    //                     <Dropdown.Menu
    //                       variant="light"
    //                       className="user_profile__profie-dropdown-items"
    //                     >
    //                       <Link className="nav-link dropdown-item">
    //                         Profile
    //                       </Link>
    //                       <Link
    //                         className="nav-link dropdown-item"
    //                         to="/purchases"
    //                       >
    //                         Purchases
    //                       </Link>
    //                       <Link className="nav-link dropdown-item">
    //                         Reviews
    //                       </Link>
    //                       <Link className="nav-link dropdown-item">
    //                         Payment Methods
    //                       </Link>
    //                       <Link className="nav-link dropdown-item">
    //                         Close Account
    //                       </Link>
    //                       <Link className="nav-link dropdown-item">
    //                         Switch Account
    //                       </Link>
    //                       <Link
    //                         className="nav-link dropdown-item"
    //                         onClick={handleOnLogout}
    //                       >
    //                         Sign Out
    //                       </Link>
    //                     </Dropdown.Menu>
    //                   </Dropdown>
    //                 </p>
    //               ) : (
    //                 <div
    //                   className="nav-link header_login-btn"
    //                   onClick={handleOnLogin}
    //                 >
    //                   Login
    //                 </div>
    //               )}
    //             </div>
    //           </div>
    //           <div className="search-and-icons">
    //             <Form
    //               className="d-flex align-items-center mb-2 categories_search"
    //               role="search"
    //             >
    //               <Form.Control
    //                 className="form-control me-2 search_form__control"
    //                 type="text"
    //                 aria-label="Search"
    //                 placeholder="Search"
    //               />
    //               <Button variant="none" className="search_icon">
    //                 <i className="fa-solid fa-magnifying-glass -util-font15 color-pastrelred"></i>
    //               </Button>
    //             </Form>
    //           </div>
    //           <div className="nav-link">
    //             {url !== "/" && (
    //               <li className="nav-item">
    //                 <Link className="nav-link active" to="/">
    //                   Home
    //                 </Link>
    //               </li>
    //             )}
    //             <li className="nav-item">
    //               <Link
    //                 className={`nav-link active ${
    //                   url.includes("/offers")
    //                     ? "-util-underline"
    //                     : "-util-underline-transparent"
    //                 }`}
    //                 to="/offers"
    //               >
    //                 Offers
    //               </Link>
    //             </li>
    //             <li className="nav-item">
    //               <Link
    //                 className={`nav-link active ${
    //                   url.includes("/bestsellers")
    //                     ? "-util-underline"
    //                     : "-util-underline-transparent"
    //                 }`}
    //                 to="/bestsellers"
    //               >
    //                 Best Sellers
    //               </Link>
    //             </li>
    //             <li className="nav-item">
    //               <Link
    //                 className={`nav-link active ${
    //                   url.includes("/newarrivals")
    //                     ? "-util-underline"
    //                     : "-util-underline-transparent"
    //                 }`}
    //                 to="/newarrivals"
    //               >
    //                 New Arrivals
    //               </Link>
    //             </li>
    //             <li className="nav-item">
    //               <Link
    //                 className={`nav-link active ${
    //                   url.includes("/dealsandsales")
    //                     ? "-util-underline"
    //                     : "-util-underline-transparent"
    //                 }`}
    //                 to="/dealsandsales"
    //               >
    //                 Deals and Sales
    //               </Link>
    //             </li>
    //             <li className="nav-item nav_icons">
    //               <Link
    //                 className={`nav-link active nav_icons__icon ${
    //                   url.includes("/favourites")
    //                     ? "-util-underline"
    //                     : "-util-underline-transparent"
    //                 }`}
    //                 to="/favourites"
    //               >
    //                 <i className="fa-solid fa-heart -util-font15"></i>
    //               </Link>
    //               <span className="nav_icons__count">{favourites?.length}</span>
    //             </li>

    //             <li className="nav-item nav_icons">
    //               <Link
    //                 className={`nav-link active nav_icons__icon ${
    //                   url.includes("/cart")
    //                     ? "-util-underline"
    //                     : "-util-underline-transparent"
    //                 }`}
    //                 to="/cart"
    //               >
    //                 <i className="fa-solid fa-cart-shopping -util-font15"></i>
    //               </Link>
    //               <span className="nav_icons__count">{cart?.length}</span>
    //             </li>
    //           </div>
    //         </div>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </div>
    // </Navbar>
    <div className="navdiv">
      <div className="logo">LOGO</div>
      <div className="contents">
        <div className="client_login_search_wrapper">
          <div className="client_login_search">
            <div className="client_login">
              <div className="client">
                Dear ClienFDFSDFSDFSDDFSDFSDFSFSDFDFSDFt
              </div>
              <div className="login">Login</div>
            </div>
            <input className="search" placeholder="Search..." />
          </div>
        </div>
        <div className="content_options">
          <div className="options">Categories</div>
          <div className="options">Offers</div>
          <div className="options">New Arrivals</div>
          <div className="options">Favourites</div>
          <div className="options">Cart</div>{" "}
          <div className="options">Offers</div>
          <div className="options">New Arrivals</div>
          <div className="options">Favourites</div>
          <div className="options">Cart</div>
        </div>
      </div>
    </div>
  );
};

export default Bigscreens;
