import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userOrders as userOrdersAction } from "../actions/orderActions";
import { Link } from "react-router-dom";

export default function UserOrders() {
  const { userOrders = [] } = useSelector((state) => state.orderState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userOrdersAction());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8 py-6">
        <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            My Orders
          </h1>

          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                    Number of Items
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {userOrders.length > 0 ? (
                  userOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 border-b text-sm text-gray-800">
                        {order._id}
                      </td>
                      <td className="px-6 py-4 border-b text-sm text-gray-800">
                        {order.orderItems.length}
                      </td>
                      <td className="px-6 py-4 border-b text-sm text-gray-800">
                        ${order.totalPrice}
                      </td>
                      <td className="px-6 py-4 border-b text-sm">
                        {order.orderStatus &&
                        order.orderStatus.includes("Delivered") ? (
                          <span className="text-green-600 font-medium">
                            {order.orderStatus}
                          </span>
                        ) : (
                          <span className="text-red-600 font-medium">
                            {order.orderStatus}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 border-b text-sm">
                        <Link
                          to={`/order/${order._id}`}
                          className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded-lg shadow hover:bg-blue-700 transition"
                        >
                          <i className="fa fa-eye mr-2"></i> View
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
