import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, clearAuthError } from "../actions/userActions";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authState
  );

 // Extract query parameters from the current URL (?redirect=/myprofile)
//const queryParams = new URLSearchParams(location.search);

// If there is a redirect query param (ex: ?redirect=/myprofile),
// then after successful login, user should be redirected back to /myprofile.
// Otherwise (if there is no redirect param), user should be redirected to home ("/").
//const redirect = queryParams.get("redirect") || "/";
const redirect = location.search?'/'+location.search.split('=')[1]:'/'; 


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email.trim(), password));

  };

  useEffect(() => {
    if (isAuthenticated) navigate(redirect);

    if (error) {
      toast(error, {
        type: "error",
        onOpen: () => {
          dispatch(clearAuthError());
        },
      });
      return;
    }
  }, [error, isAuthenticated, dispatch, navigate, redirect]);

  return (
    <Fragment>
      <div className="flex justify-center mt-10">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white shadow-lg p-6 rounded-md"
        >
          <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

          <div className="mb-4">
            <label htmlFor="email_field" className="block mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email_field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password_field" className="block mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password_field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <Link
            to="/password/forgot"
            className="text-blue-500 text-sm float-right mb-4"
          >
            Forgot Password?
          </Link>

          <button
            type="submit"
            disabled={loading || !email || !password}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md mb-3"
          >
             {loading ? "Logging in..." : "Login"} 
          </button>

          <Link to="/register" className="text-blue-500 text-sm float-right">
            New User?
          </Link>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
