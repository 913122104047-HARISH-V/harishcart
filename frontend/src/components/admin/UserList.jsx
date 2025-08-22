import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, getUsers } from "../actions/userActions";
import { clearError, clearUserDeleted } from "../slices/userSlice";
import Loader from "../layouts/Loader";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";

export default function UserList() {
  const {
    users = [],
    loading = true,
    error,
    isUserDeleted,
  } = useSelector((state) => state.userState);

  const dispatch = useDispatch();

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteUser(id));
  };

// Fetch users (on mount + whenever isUserDeleted changes so list refreshes)
useEffect(() => {
  dispatch(getUsers());
}, [dispatch, isUserDeleted]);

// Handle errors
useEffect(() => {
  if (error) {
    toast.error(error);
    dispatch(clearError());
  }
}, [error, dispatch]);

//  Handle delete success
useEffect(() => {
  if (isUserDeleted) {
    toast.success("User Deleted Successfully!");
    dispatch(clearUserDeleted());
  }
}, [isUserDeleted, dispatch]);


  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/5">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-6">
        <h1 className="text-2xl font-bold mb-6">User List</h1>

        {loading ? (
          <Loader />
        ) : (
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4">{user._id}</td>
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td
                      className={`px-6 py-4 font-medium ${
                        user.role === "admin"
                          ? "text-green-600"
                          : "text-blue-600"
                      }`}
                    >
                      {user.role}
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <Link
                        to={`/admin/user/${user._id}`}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
                      >
                        <i className="fa fa-pencil"></i>
                        <span>Update</span>
                      </Link>
                      <button
                        onClick={(e) => deleteHandler(e, user._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                      >
                        <i className="fa fa-trash"></i>
                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
