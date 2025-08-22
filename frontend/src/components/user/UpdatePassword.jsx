import { useEffect, useState } from "react";
import {
  updatePassword as updatePasswordAction,
  clearAuthError,
} from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const dispatch = useDispatch();
  const { isUpdated, error } = useSelector((state) => state.authState);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("oldPassword", oldPassword);
    formData.append("newPassword", password);
    dispatch(updatePasswordAction(formData));
  };

  useEffect(() => {
    if (isUpdated) {
      toast("Password updated successfully", {
        type: "success",
      });
      setOldPassword("");
      setPassword("");
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
  }, [isUpdated, error, dispatch]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Update Password
        </h1>

        <form onSubmit={submitHandler} className="space-y-5">
          {/* Old Password */}
          <div>
            <label
              htmlFor="old_password_field"
              className="block text-sm font-medium text-gray-700"
            >
              Old Password
            </label>
            <input
              type="password"
              id="old_password_field"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>

          {/* New Password */}
          <div>
            <label
              htmlFor="new_password_field"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="new_password_field"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-200"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
