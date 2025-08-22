import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteOrder, adminOrders as adminOrdersAction } from "../actions/orderActions";
import { clearError, clearOrderDeleted } from "../slices/orderSlice";
import Loader from "../layouts/Loader";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";

export default function OrderList() {
  const { adminOrders = [], loading = true, error, isOrderDeleted } =
    useSelector((state) => state.orderState);

  const dispatch = useDispatch();

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteOrder(id));
  };

  // 1️⃣ Fetch orders (on mount + whenever an order is deleted)
  useEffect(() => {
    dispatch(adminOrdersAction());
  }, [dispatch, isOrderDeleted]);

  // 2️⃣ Handle errors
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // 3️⃣ Handle delete success
  useEffect(() => {
    if (isOrderDeleted) {
      toast.success("Order Deleted Successfully!");
      dispatch(clearOrderDeleted());
    }
  }, [isOrderDeleted, dispatch]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-6">Order List</h1>

        {loading ? (
          <Loader />
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow-md p-4">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-gray-700 font-semibold">ID</th>
                  <th className="py-3 px-4 text-left text-gray-700 font-semibold">Number of Items</th>
                  <th className="py-3 px-4 text-left text-gray-700 font-semibold">Amount</th>
                  <th className="py-3 px-4 text-left text-gray-700 font-semibold">Status</th>
                  <th className="py-3 px-4 text-left text-gray-700 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {adminOrders.map((order) => (
                  <tr key={order._id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="py-2 px-4">{order._id}</td>
                    <td className="py-2 px-4">{order.orderItems.length}</td>
                    <td className="py-2 px-4">${order.totalPrice}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`${
                          order.orderStatus.includes("Processing")
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="py-2 px-4 flex gap-2">
                      <Link
                        to={`/admin/order/${order._id}`}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
                      >
                        <i className="fa fa-pencil"></i>
                        <span>Update</span>
                      </Link>
                      <button
                        onClick={(e) => deleteHandler(e, order._id)}
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
