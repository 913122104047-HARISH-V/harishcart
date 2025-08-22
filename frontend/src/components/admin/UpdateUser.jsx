import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser, updateUser } from "../actions/userActions";
import { clearError, clearUserUpdated } from "../slices/userSlice";
import { toast } from "react-toastify";

export default function UpdateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { id: userId } = useParams();

  const { loading, isUserUpdated, error, user } = useSelector(
    (state) => state.userState
  );
  const { user: authUser } = useSelector((state) => state.authState);

  const dispatch = useDispatch();

// Submit handler
const submitHandler = (e) => {
  e.preventDefault();
  if (!name || !email) {
    toast("Name and Email are required", { type: "warning" });
    return;
  }
  dispatch(updateUser(userId, { name, email, role }));
};

// Fetch user on mount only
useEffect(() => {
  dispatch(getUser(userId));
}, [dispatch, userId]);

// Handle update & error cases
useEffect(() => {
  if (isUserUpdated) {
    toast("User Updated Successfully!", {
      type: "success",
      onOpen: () => {
        dispatch(clearUserUpdated());
        dispatch(getUser(userId)); // 🔹 refetch after update
      },
    });
  }

  if (error) {
    toast(error, {
      type: "error",
      onOpen: () => {
        dispatch(clearError());
      },
    });
  }
}, [isUserUpdated, error, dispatch, userId]);

// Sync form fields with store
useEffect(() => {
  if (user && user._id === userId) {
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
  }
}, [user, userId]);


  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-1/5 bg-gray-800 text-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-full md:w-4/5 flex justify-center items-center p-6">
        <Fragment>
          <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Update User
            </h1>

            <form onSubmit={submitHandler} className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="name_field"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name_field"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email_field"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email_field"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              {/* Role */}
              <div>
                <label
                  htmlFor="role_field"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Role
                </label>
                <select
                  disabled={user._id === authUser._id}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  id="role_field"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition disabled:bg-gray-400"
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </form>
          </div>
        </Fragment>
      </div>
    </div>
  );
}
