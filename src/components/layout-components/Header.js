import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAction } from "../../slices/categories/categoriesAction";
import {
  getCartsAction,
  getFavsAction,
  getPurchasesAction,
} from "../../slices/system/systemAction";
import Bigscreens from "../navbarsvariant/Bigscreens";
import MediumScreens from "../navbarsvariant/MediumScreens";
import SmallScreens from "../navbarsvariant/SmallScreens";

export const Header = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { user } = useSelector((state) => state.user);
  const { favourites, cart } = useSelector((state) => state.system);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load data needed for header; DO NOT call autoLogin() here.
  useEffect(() => {
    if (!categories.length) dispatch(getCategoriesAction());
    if (!favourites.length) dispatch(getFavsAction());
    if (!cart.length) dispatch(getCartsAction());
    if (user._id) dispatch(getPurchasesAction());
  }, [dispatch, user._id, categories.length, favourites.length, cart.length]);

  return (
    <div>
      {windowWidth > 991 && <Bigscreens />}
      {windowWidth <= 991 && windowWidth >= 576 && <MediumScreens />}
      {windowWidth < 576 && <SmallScreens />}
    </div>
  );
};
