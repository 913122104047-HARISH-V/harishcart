import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../actions/userActions";
import Search from "./Search";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { items: cartItems } = useSelector((state) => state.cartState);

  const [open, setOpen] = useState(false);

  const logoutHandler = () => {
    setOpen(false);
    dispatch(logout());
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex flex-col md:flex-row items-center justify-between">
      {/* Logo */}
      <div className="flex-shrink-0 mb-2 md:mb-0">
        {/* <Link to="/"> <img src="/assets/logo.png" alt="JVLcart" className="w-36" />  </Link>*/}
        <img src="/assets/logo.png" alt="logo" className="h-8 select-none cursor-default" />
      </div>

      {/* Search */}
      <div className="flex-grow w-full md:w-auto md:mx-6">
        <Search />
      </div>

      {/* Login/User + Cart */}
      <div className="flex items-center mt-3 md:mt-0 space-x-4 relative">
        {isAuthenticated ? (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md focus:outline-none"
            >
              <img
                src={user.avatar || "/images/default_avatar.png"}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium">{user.name}</span>
              <svg
                className={`w-4 h-4 transform transition-transform ${open ? "rotate-180" : "rotate-0"
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                <ul className="py-1 text-gray-700">
                  {user.role === "admin" && (
                    <li>
                      <button
                        onClick={() => {
                          navigate("/admin/dashboard");
                          setOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Dashboard
                      </button>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={() => {
                        navigate("/myprofile");
                        setOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        navigate("/orders");
                        setOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Orders
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={logoutHandler}
                      className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Login
          </Link>
        )}

        {/* Cart */}
        <Link
          to="/cart"
          className="flex items-center space-x-1 cursor-pointer relative"
        >
          <FaShoppingCart className="text-gray-700 text-lg" />
          <span id="cart" className="text-gray-700 font-medium">
            Cart
          </span>
          <span
            id="cart_count"
            className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"
          >
            {cartItems?.length || 0}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
