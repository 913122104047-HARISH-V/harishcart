import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// Layouts
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import ProductSearch from "./components/product/ProductSearch";
// Pages
import ProtectedRoute from "./route/ProtectedRoute";
import Home from "./components/user/Home";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { loadUser } from "./components/actions/userActions";
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPassword from "./components/user/ResetPassword";
import UpdatePassword from "./components/user/UpdatePassword";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import ProductDetail from "./components/product/ProductDetail";
import Cart from "./components/cart/Cart";



import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrderList from './components/admin/OrderList';
import UpdateOrder from './components/admin/UpdateOrder';
import UserList from './components/admin/UserList';
import UpdateUser from './components/admin/UpdateUser';
import ReviewList from './components/admin/ReviewList';
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import OrderSuccess from "./components/cart/OrderSuccess";
import Payment from "./components/cart/Payment";
import UserOrders from "./components/orders/UserOrders";
import OrderDetail from "./components/orders/OrderDetail";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser()); // re-fetch user info on app load
  }, [dispatch]);
  return (
    <Router>
      {/* Header */}
      <Header />
      {/* Global Toast Notifications */}
      <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover
      />



      {/* Page Content */}
      <main className="min-h-screen">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/search/:keyword" element={<ProductSearch />} />
          <Route path='/product/:id' element={<ProductDetail/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/shipping' element={<ProtectedRoute><Shipping/></ProtectedRoute> } />
          <Route path='/order/confirm' element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute> } />
          <Route path='/order/success' element={<ProtectedRoute><OrderSuccess/></ProtectedRoute> } />
          <Route path='/payment' element={<ProtectedRoute><Payment/></ProtectedRoute> } />
          <Route path='/orders' element={<ProtectedRoute><UserOrders/></ProtectedRoute> } />
          <Route path='/order/:id' element={<ProtectedRoute><OrderDetail/></ProtectedRoute> } />

          {/* User protected routes */}
          <Route path="/myprofile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/myprofile/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
          <Route path="/myprofile/update/password" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />

          {/* Admin protected routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute isAdmin={true}><ProductList /></ProtectedRoute>} />
          <Route path="/admin/products/create" element={<ProtectedRoute isAdmin={true}><NewProduct /></ProtectedRoute>} />
          <Route path="/admin/product/:id" element={<ProtectedRoute isAdmin={true}><UpdateProduct /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute isAdmin={true}><OrderList /></ProtectedRoute>} />
          <Route path="/admin/order/:id" element={<ProtectedRoute isAdmin={true}><UpdateOrder /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute isAdmin={true}><UserList /></ProtectedRoute>} />
          <Route path="/admin/user/:id" element={<ProtectedRoute isAdmin={true}><UpdateUser /></ProtectedRoute>} />
          <Route path="/admin/reviews" element={<ProtectedRoute isAdmin={true}><ReviewList /></ProtectedRoute>} />
        </Routes>
      </main>


      {/* Footer */}
      <Footer />
    </Router>
  );
}

