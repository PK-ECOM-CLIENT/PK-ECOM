// src/App.jsx
import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setPrevUrl } from "./slices/system/systemSlice";
import { autoLogin } from "./slices/user/userAction";

import HomePage from "./pages/home/HomePage";
import ForgotPasswordPage from "./pages/forgot-password/ForgotPasswordPage";
import ItemSelectionPage from "./pages/item-selection/ItemSelectionPage";
import ItemsPage from "./pages/items/ItemsPage";
import LoginPage from "./pages/login/LoginPage";
import ProvideOTPPage from "./pages/provideOTP/ProvideOTPPage";
import RegistrationPage from "./pages/registration/RegistrationPage";
import BestSellersPage from "./pages/best-seller/BestSellersPage";
import NewArrivals from "./pages/new-arrival/NewArrivalsPage";
import DealsAndSales from "./pages/deals-and-sales/DealsAndSalesPage";
import Profile from "./pages/profile/ProfilePage";
import Favourites from "./pages/favourites/FavouritesPage";
import Cart from "./pages/cart/CartPage";
import OffersPage from "./pages/offers/OffersPage";
import Categories from "./pages/categories/Categories";
import EmailVerification from "./pages/registration/EmailVerification";
import { PrivateRouter } from "./components/private-router/PrivateRouter";
import SuccessfulPayment from "./pages/successfulpayment/successfulPayent";
import FailedPayment from "./pages/successfulpayment/failedPayment";
import Purchases from "./pages/purchases/purchasesPage";

import AuthLoading from "./components/loading-effect/Authloading";

/**
 * Boot + Route tracker
 */
const BootAndRouteTracker = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  // One-time auto login
  const bootRef = useRef(false);
  useEffect(() => {
    if (bootRef.current) return;
    bootRef.current = true;
    dispatch(autoLogin());
  }, [dispatch]);

  // Track previous URL
  const lastSeenRef = useRef(null);
  useEffect(() => {
    const current = location.pathname + location.search + location.hash;
    if (lastSeenRef.current && lastSeenRef.current !== current) {
      dispatch(setPrevUrl(lastSeenRef.current));
    }
    lastSeenRef.current = current;
  }, [location, dispatch]);

  return null;
};

/** Show full-screen brand loader while auth is resolving */
const HydrationGate = ({ children }) => {
  const hydrated = useSelector((s) => s.user.hydrated);
  if (!hydrated) return <AuthLoading />;
  return children;
};

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <BootAndRouteTracker />
        <HydrationGate>
          <Routes>
            {/* public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/user/verify-email" element={<EmailVerification />} />
            <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
            <Route
              path="/forgotpassword/provideotp"
              element={<ProvideOTPPage />}
            />
            <Route path="/categories/:_cid" element={<Categories />} />
            <Route
              path="/categories/:_cid/products/:_pid"
              element={<ItemsPage />}
            />
            <Route
              path="/categories/:_cid/products/:_pid/item/:_iid"
              element={<ItemSelectionPage />}
            />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/bestsellers" element={<BestSellersPage />} />
            <Route path="/newarrivals" element={<NewArrivals />} />
            <Route path="/dealsandsales" element={<DealsAndSales />} />
            <Route path="/profile" element={<Profile />} />

            {/* private routes */}
            <Route
              path="/favourites"
              element={
                <PrivateRouter>
                  <Favourites />
                </PrivateRouter>
              }
            />
            <Route
              path="/cart"
              element={
                <PrivateRouter>
                  <Cart />
                </PrivateRouter>
              }
            />
            <Route
              path="/purchases"
              element={
                <PrivateRouter>
                  <Purchases />
                </PrivateRouter>
              }
            />

            {/* payment result pages (public) */}
            <Route path="/paymentsuccessful" element={<SuccessfulPayment />} />
            <Route path="/paymentfailed" element={<FailedPayment />} />
          </Routes>
        </HydrationGate>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
