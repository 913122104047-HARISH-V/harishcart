import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateProfile, clearAuthError } from "../actions/userActions";
import { clearUpdateProfile } from "../slices/authSlice";

export default function UpdateProfile() {
  const { error, user, isUpdated } = useSelector((state) => state.authState);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProfile({name,email}));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }

    if (isUpdated) {
      toast("Profile updated successfully", {
        type: "success",
        onOpen: () => dispatch(clearUpdateProfile()),
      });
      return;
    }

    if (error) {
      toast(error, {
        type: "error",
        onOpen: () => {
          dispatch(clearAuthError());
        },
      });
      return;
    }
  }, [user, isUpdated, error, dispatch]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <form onSubmit={submitHandler} encType="multipart/form-data">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Update Profile
          </h1>

          {/* Name Input */}
          <div className="mb-4">
            <label
              htmlFor="name_field"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name_field"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 text-gray-900"
              placeholder="Enter your name"
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email_field"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email_field"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 text-gray-900"
              placeholder="Enter your email"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
