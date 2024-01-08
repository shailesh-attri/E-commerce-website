import "./Style.scss";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// Components
import Home from "./components/Home/Home";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import Category from "./components/Category/Category";
import Newsletter from "./components/Footer/Newsletter/Newsletter";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Success from "./pages/success";
import Cancel from "./cancel";
import Payment from "./pages/Payment";
import { FirebaseProvider } from "./context/firebaseContext";
import UserProfile from "./pages/UserProfile";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
// Context_API
import { FilterProvider } from "./context/CategoryContext";
import AppContext from "./utils/context";
import { WishlistProvider } from "./context/Wishlist-Cart";
import { ProductProvider } from "./context/productDetail";
import { ProductProviderDetails } from "./context/ProductContext";
import { BrandFilterProvider } from "./context/BrandFilterContext";
const stripePromise = loadStripe(
  "pk_live_51OSiwTSGNZwePlLcsMHt4EafYcN11gJ8a7le30UT1JFD17X9YwkwfO8FOx8G961Xt2HclBBrLi2SWpZVhPQAtIuD006oWORq0j"
);
function App() {
  return (
    <BrowserRouter>
    <BrandFilterProvider>
      <FirebaseProvider>
        <AppContext>
          <ProductProvider>
            <FilterProvider>
              <WishlistProvider>
                <Header />
                <div className="MainApp">

                <Routes>
                  <Route path="/" element={<Home></Home>}></Route>
                  <Route path="/login" element={<Login></Login>}></Route>
                  <Route path="/signup" element={<Signup></Signup>}></Route>

                  <Route
                    path="/category/:id"
                    element={<Category></Category>}
                  ></Route>

                  <Route
                    path="/payment"
                    element={
                      <Elements stripe={stripePromise}>
                        <Payment />
                      </Elements>
                    }
                  />
                  <Route
                    path="/product/:id"
                    element={<SingleProduct></SingleProduct>}
                  ></Route>
                </Routes>
                </div>
                <Footer id='footer' className=''></Footer>
              
              </WishlistProvider>
            </FilterProvider>
          </ProductProvider>
        </AppContext>
      </FirebaseProvider>
      </BrandFilterProvider>
    </BrowserRouter>
  );
}

export default App;
