import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, clearAuthError } from "../actions/userActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "", // Cloudinary URL
  });
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authState
  );

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // handle avatar upload
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Select an image file");
      return;
    }
  
    const reader = new FileReader();
  
    reader.onloadend = () => {
      setUserData({ ...userData, avatar: reader.result }); // Base64 string
    };
  
    reader.readAsDataURL(file);
  };
  

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(userData)); // send JSON including avatar URL
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      return;
    }
    if (error) {
      toast(error, {
        onOpen: () => {
          dispatch(clearAuthError());
        },
      });
      return;
    }
  }, [error, isAuthenticated, dispatch, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Register
        </h1>
        <form onSubmit={submitHandler} className="space-y-5">
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={onChange}
            placeholder="Name"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={onChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={onChange}
            placeholder="Password"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          {/* Avatar Upload */}
          <input
  type="file"
  accept="image/png, image/jpeg, image/jpg"
  onChange={handleAvatarChange}
/>

          {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
          {userData.avatar && (
            <img
              src={userData.avatar}
              alt="Avatar Preview"
              className="w-16 h-16 rounded-full mt-2"
            />
          )}

          <button
            type="submit"
            disabled={loading || uploading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            {loading ? "Registering..." : "REGISTER"}
          </button>
        </form>
      </div>
    </div>
  );
}
