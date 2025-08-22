import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview, getReviews } from "../actions/productActions";
import { clearError, clearReviewDeleted } from "../slices/productSlice";
import Loader from "../layouts/Loader";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";

export default function ReviewList() {
  const { reviews = [], loading = true, error, isReviewDeleted } =
    useSelector((state) => state.productState);
  const [productId, setProductId] = useState("");
  const dispatch = useDispatch();

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteReview(productId, id));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getReviews(productId));
  };

  useEffect(() => {
    if (error) {
      toast(error, {
        type: "error",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }
    if (isReviewDeleted) {
      toast("Review Deleted Successfully!", {
        type: "success",
        onOpen: () => dispatch(clearReviewDeleted()),
      });
      dispatch(getReviews(productId));
      return;
    }
  }, [dispatch, error, isReviewDeleted]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Review List</h1>

        {/* Search Box */}
        <div className="flex justify-center mb-8">
          <form
            onSubmit={submitHandler}
            className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
          >
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Product ID
              </label>
              <input
                type="text"
                onChange={(e) => setProductId(e.target.value)}
                value={productId}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              Search
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          {loading ? (
            <Loader />
          ) : (
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Rating</th>
                  <th className="px-6 py-3">User</th>
                  <th className="px-6 py-3">Comment</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <tr
                      key={review._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-3">{review._id}</td>
                      <td className="px-6 py-3">{review.rating}</td>
                      <td className="px-6 py-3">{review.user.name}</td>
                      <td className="px-6 py-3">{review.comment}</td>
                      <td className="px-6 py-3">
                        <button
                          onClick={(e) => deleteHandler(e, review._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center text-gray-500 py-6 italic"
                    >
                      No reviews found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
