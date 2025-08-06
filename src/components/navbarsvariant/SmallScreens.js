import React, { useEffect, useState } from "react";
import styles from "./smallScreens.module.css";
import logo from "../../assits/images/logo/pk.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
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
  const [showProfile, setShowProfile] = useState(false);

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

  const handleOnLogin = () => {
    dispatch(setPublicUrl(url));
    navigate("/login");
  };

  const handleOnLogout = () => {
    dispatch(logoutUserAction({}));
    setShowProfile(false);
    setShowMain(true);
  };

  const handleCloseCategories = () => {
    setShowCategories(false);
    setShowMain(true);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setShowMain(false);
    setShowCategories(false);
    setShowProfile(false);
  };

  return (
    <div className={styles.navdiv}>
      <img src={logo} alt="logo" className={styles.logo} />
      {!showMain && (
        <div className={styles.toggle_icon} onClick={() => setShowMain(true)}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      )}

      {/* MAIN MENU Offcanvas */}
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
              Favourites ({favourites.length})
            </li>
            <li onClick={() => handleNavigate("/cart")}>
              Cart ({cart.length})
            </li>
            <li
              onClick={() => {
                setShowMain(false);
                setShowProfile(true);
              }}
            >
              Profile
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>

      {/* CATEGORIES Offcanvas */}
      <Offcanvas
        show={showCategories}
        onHide={handleCloseCategories}
        placement="top"
        className={styles.fullscreen_offcanvas}
      >
        <div className={styles.toggle_icon} onClick={handleCloseCategories}>
          <FontAwesomeIcon icon={faXmark} />
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

      {/* PROFILE Offcanvas */}
      <Offcanvas
        show={showProfile}
        onHide={() => {
          setShowProfile(false);
          setShowMain(true);
        }}
        placement="top"
        className={styles.fullscreen_offcanvas}
      >
        <div
          className={styles.toggle_icon}
          onClick={() => {
            setShowProfile(false);
            setShowMain(true);
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </div>
        <Offcanvas.Body>
          <ul className={styles.offcanvas_list}>
            {!user._id ? (
              <li
                onClick={() => {
                  handleOnLogin();
                  setShowProfile(false);
                }}
              >
                Login
              </li>
            ) : (
              <>
                <li onClick={() => handleNavigate("/profile")}>Profile</li>
                <li onClick={() => handleNavigate("/purchases")}>Purchases</li>
                <li onClick={() => handleNavigate("/reviews")}>Reviews</li>
                <li onClick={handleOnLogout}>Sign Out</li>
              </>
            )}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default SmallScreens;
