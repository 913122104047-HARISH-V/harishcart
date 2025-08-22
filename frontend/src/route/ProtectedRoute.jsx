import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../components/layouts/Loader';

export default function ProtectedRoute({ children, isAdmin }) {
  const { isAuthenticated, loading, user } = useSelector(state => state.authState);
  const location = useLocation();

  /*Example: A guest tries to visit /orders or /profile.
Since isAuthenticated = false, the ProtectedRoute redirects them to the login page, and also stores the path (redirect=/orders) so after login, the user is sent back to the intended page.*/

/*Reason for checking loading

When your app starts (or on page refresh), Redux/auth state might not be immediately ready.
For example:

You may be validating the JWT token with the backend.

Redux may still be fetching user data from API or localStorage.

During this short period, isAuthenticated could be false (default), but you’re not sure yet if the user is actually logged in.*/
  if (!isAuthenticated && !loading) {
    // Pass current path as redirect query param
    return <Navigate to={`/login?redirect=${location.pathname}`} />;// For the URL https://www.example.com/products/category?id=123#top, location.pathname would return: /products/category

  }

  // Logged in but trying to access admin-only routes (Role-based protection)
  // If we remove isAdmin, then, we rely only on user.role, then every protected route will always enforce role checking, even when not needed for like normal pages (/profile) might incorrectly require user.role === "admin"
  if (isAuthenticated) {
    if (isAdmin === true && user.role !== 'admin') {
      return <Navigate to="/" />;
    }
    return children;
  }


  /*On page refresh, Redux is still fetching authentication status (token validation with backend).

During this short time, loading = true → the ProtectedRoute shows a Loader spinner until the user’s auth state is confirmed.*/
  if (loading) {
    return <Loader />;
  }
}




/*
Not logged in → Redirects to login

Logged in but not admin → Redirects to home

Logged in and (if needed) admin → Shows page

Loading → Shows Loader*/