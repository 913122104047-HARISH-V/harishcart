import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useSelector((state) => state.authState);

  return (
    <div className="flex flex-col md:flex-row justify-around mt-10 gap-10">
      {/* Left Section */}
      <div className="flex flex-col items-center md:w-1/3">
        <figure className="w-40 h-40 rounded-full overflow-hidden shadow-lg">
          <img
            className="w-full h-full object-cover"
            src={user.avatar ?? "./images/default_avatar.png"}
            alt="profile"
          />
        </figure>
        <Link
          to="/myprofile/update"
          id="edit_profile"
          className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-2 mt-6 transition"
        >
          Edit Profile
        </Link>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 space-y-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-700">Full Name</h4>
          <p className="text-gray-900">{user.name}</p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-700">Email Address</h4>
          <p className="text-gray-900">{user.email}</p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-700">Joined</h4>
          <p className="text-gray-900">
            {String(user.createdAt).substring(0, 10)}
          </p>
        </div>

        <Link
          to="/orders"
          className="block w-full text-center bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg py-2 mt-6 transition"
        >
          My Orders
        </Link>

        <Link
          to="/myprofile/update/password"
          className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-2 mt-3 transition"
        >
          Change Password
        </Link>
      </div>
    </div>
  );
}
