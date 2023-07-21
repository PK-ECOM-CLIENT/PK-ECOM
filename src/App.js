import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/home/HomePage";
import BuyNowPage from "./pages/buy-now/BuyNowPage";
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
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route
            path="/register"
            element={<RegistrationPage></RegistrationPage>}
          ></Route>
          <Route
            path="/user/verify-email"
            element={<EmailVerification></EmailVerification>}
          ></Route>
          <Route
            path="/forgotpassword"
            element={<ForgotPasswordPage></ForgotPasswordPage>}
          ></Route>
          <Route
            path="/forgotpassword/provideotp"
            element={<ProvideOTPPage></ProvideOTPPage>}
          ></Route>
          <Route
            path="/categories/:_cid"
            element={<Categories></Categories>}
          ></Route>
          <Route
            path="/categories/:_cid/products/:_pid"
            element={<ItemsPage></ItemsPage>}
          ></Route>
          <Route
            path="/categories/:_cid/products/:_pid/item/:_iid"
            element={<ItemSelectionPage></ItemSelectionPage>}
          ></Route>
          <Route
            path="/categories/:_cid/products/:_pid/item/:_iid/buynow"
            element={<BuyNowPage></BuyNowPage>}
          ></Route>
          <Route path="/offers" element={<OffersPage></OffersPage>}></Route>
          <Route
            path="/bestsellers"
            element={<BestSellersPage></BestSellersPage>}
          ></Route>
          <Route
            path="/newarrivals"
            element={<NewArrivals></NewArrivals>}
          ></Route>
          <Route
            path="/dealsandsales"
            element={<DealsAndSales></DealsAndSales>}
          ></Route>
          <Route path="/profile" element={<Profile></Profile>}></Route>
          <Route path="/favourites" element={<Favourites></Favourites>}></Route>
          <Route path="/cart" element={<Cart></Cart>}></Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
