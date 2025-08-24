import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setPrevUrl } from "./slices/system/systemSlice";
import { setUser, setHydrated } from "./slices/user/userSlice";

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

/**
 * Boot + Route tracker
 * - On mount (once): hydrate user from localStorage, then mark hydrated=true
 * - On every route change: store previous URL in Redux
 */
const BootAndRouteTracker = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  // Track last URL to compute "previous"
  const lastSeenRef = useRef(null);

  // Run ONCE: hydrate user -> setHydrated(true)
  const bootRef = useRef(false);
  useEffect(() => {
    if (bootRef.current) return;
    bootRef.current = true;

    try {
      // Adjust key if you store under a different name
      const raw = localStorage.getItem("user");
      const parsed = raw ? JSON.parse(raw) : {};
      dispatch(setUser(parsed && typeof parsed === "object" ? parsed : {}));
    } catch {
      dispatch(setUser({}));
    } finally {
      // Critical: only after setting user, mark hydration complete
      dispatch(setHydrated(true));
    }
  }, [dispatch]);

  // On each route change, push the *previous* URL to Redux
  useEffect(() => {
    const current = location.pathname + location.search + location.hash;
    if (lastSeenRef.current && lastSeenRef.current !== current) {
      dispatch(setPrevUrl(lastSeenRef.current));
    }
    lastSeenRef.current = current;
  }, [location, dispatch]);

  return null;
};

/** Prevents routes (and PrivateRouter) from rendering until user state is hydrated */
const HydrationGate = ({ children }) => {
  const hydrated = useSelector((s) => s.user.hydrated);
  if (!hydrated) return null; // or a small global spinner
  return children;
};

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <BootAndRouteTracker />
        <HydrationGate>
          <Routes>
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

            <Route path="/paymentsuccessful" element={<SuccessfulPayment />} />
            <Route path="/paymentfailed" element={<FailedPayment />} />
            <Route path="/purchases" element={<Purchases />} />
          </Routes>
        </HydrationGate>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
