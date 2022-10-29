import "./App.css";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/home";
import WebFont from "webfontloader";
import React, {  useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import ProductCard from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import User from "./component/UserAccount/User";
import Profile from "./component/UserAccount/Profile";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/UserAccount/UpdateProfile";
import UpdatePassword from "./component/UserAccount/UpdatePassword";
import ForgetPassword from "./component/UserAccount/forgetPassword";
import ResetPassword from "./component/UserAccount/ResetPassword";
import Cart from "./component/cart/Cart";
import Shipping from "./component/cart/Shipping";
import ShippingConfirm from "./component/cart/ShippingConfirm";
import ElementRap from "./component/cart/ElementRap";
import Payment from "./component/cart/Payment";
import PaySuccess from './component/cart/PaySuccess'
import MyOrders from './component/orders/MyOrders'
import OrderDetails from './component/orders/OrderDetails'
import Dashboard from "./component/Dashboard/Dashboard";
import AdminProducts from './component/Dashboard/AdminProducts'
import NewProduct from './component/Dashboard/NewProduct'
import UpdateProduct from './component/Dashboard/UpdateProduct.js'
import OrderList from './component/Dashboard/OrderList.js'
import UpdateOrder from './component/Dashboard/UpdateOrder.js'
import Users from './component/Dashboard/Users.js'
import UpdateUser from './component/Dashboard/UpdateUser.js'
import ProductReviews from './component/Dashboard/ProductRevierws'
import AboutUs from './component/layout/AboutUs.js'
import ContectUs from './component/layout/ContectUs.js'
import NotFound from './component/layout/NotFound.js'





function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);



  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka "],
      },
    });
    store.dispatch(loadUser());

    
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductCard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/search" element={<Search />} />
          <Route path="/user" element={<User />} />
          <Route
            path="/account"
            element={<ProtectedRoute Component={Profile} />}
          />
          <Route path="/profile/update" element={<UpdateProfile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/password/forget" element={<ForgetPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/user/shipping"
            element={<ProtectedRoute Component={Shipping} />}
          />
            <Route
              path="/order/confirm/process/payment"
              element={<ElementRap Component={Payment} />}
            />
          <Route path="/success" element={<ProtectedRoute Component={PaySuccess} />} />
          <Route path="/orders/me" element={<ProtectedRoute Component={MyOrders} />} />
          <Route path="/order/:id" element={<ProtectedRoute Component={OrderDetails} />} />
          <Route path="/order/confirm" element={<ProtectedRoute Component={ShippingConfirm} />} />
        
          <Route path="/admin/dashboard"  element={<ProtectedRoute IsAdmin={true} Component={Dashboard} />} />
          <Route path="/admin/products"  element={<ProtectedRoute IsAdmin={true} Component={AdminProducts} />} />
          <Route path="/admin/product"  element={<ProtectedRoute IsAdmin={true} Component={NewProduct} />} />
          <Route path="/admin/product/update/:id"  element={<ProtectedRoute IsAdmin={true} Component={UpdateProduct} />} />
          <Route path="/admin/orders"  element={<ProtectedRoute IsAdmin={true} Component={OrderList} />} />
          <Route path="/admin/orders/update/:id"  element={<ProtectedRoute IsAdmin={true} Component={UpdateOrder} />} />
          <Route path="/admin/users"  element={<ProtectedRoute IsAdmin={true} Component={Users} />} />
          <Route path="/admin/user/update/:id"  element={<ProtectedRoute IsAdmin={true} Component={UpdateUser} />} />
          <Route path="/admin/reviews"  element={<ProtectedRoute IsAdmin={true} Component={ProductReviews} />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContectUs />} />
          <Route path="/*" element={<NotFound />} />

        </Routes>

        <Footer />
      </BrowserRouter>
    </div>

    //  <h1>hello</h1>
  );
}

export default App;
