import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  orderDetail as orderDetailAction,
  updateOrder,
} from "../actions/orderActions";
import { toast } from "react-toastify";
import { clearOrderUpdated, clearError } from "../slices/orderSlice";

export default function UpdateOrder() {
  const { loading, isOrderUpdated, error, orderDetail } = useSelector(
    (state) => state.orderState
  );
  const {
    user = {},
    orderItems = [],
    shippingInfo = {},
    totalPrice = 0,
    paymentInfo = {},
  } = orderDetail;
  const isPaid = paymentInfo.status === "succeeded" ? true : false;
  const [orderStatus, setOrderStatus] = useState("Processing");
  const { id: orderId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const orderData = { orderStatus };
    dispatch(updateOrder(orderId, orderData));
  };

  useEffect(() => {
    if (isOrderUpdated) {
      toast("Order Updated Successfully!", {
        type: "success",
        onOpen: () => dispatch(clearOrderUpdated()),
      });
      return;
    }

    if (error) {
      toast(error, {
        type: "error",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }

    dispatch(orderDetailAction(orderId));
  }, [isOrderUpdated, error, dispatch, orderId]);

  useEffect(() => {
    if (orderDetail._id) {
      setOrderStatus(orderDetail.orderStatus);
    }
  }, [orderDetail]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-full md:w-1/5 bg-white shadow-md">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-full md:w-4/5 p-6">
        <Fragment>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Order Details */}
            <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow p-6">
              <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                Order # {orderDetail._id}
              </h1>

              <h4 className="text-lg font-semibold text-gray-700 mb-3">
                Shipping Info
              </h4>
              <p className="text-gray-600">
                <b>Name:</b> {user.name}
              </p>
              <p className="text-gray-600">
                <b>Phone:</b> {shippingInfo.phoneNo}
              </p>
              <p className="text-gray-600 mb-4">
                <b>Address:</b> {shippingInfo.address}, {shippingInfo.city},{" "}
                {shippingInfo.postalCode}, {shippingInfo.state},{" "}
                {shippingInfo.country}
              </p>
              <p className="text-gray-600 mb-4">
                <b>Amount:</b> ${totalPrice}
              </p>

              <hr className="my-4" />

              <h4 className="text-lg font-semibold text-gray-700 mb-3">
                Payment
              </h4>
              <p className={isPaid ? "text-green-600" : "text-red-600"}>
                <b>{isPaid ? "PAID" : "NOT PAID"}</b>
              </p>

              <h4 className="text-lg font-semibold text-gray-700 my-4">
                Order Status:
              </h4>
              <p
                className={
                  orderStatus && orderStatus.includes("Delivered")
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                <b>{orderStatus}</b>
              </p>

              <h4 className="text-lg font-semibold text-gray-700 my-4">
                Order Items:
              </h4>
              <hr className="mb-4" />
              <div className="space-y-6">
                {orderItems &&
                  orderItems.map((item) => (
                    <div
                      key={item.product}
                      className="flex flex-col sm:flex-row items-center justify-between border-b pb-4"
                    >
                      <div className="w-16 h-16 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain rounded-md"
                        />
                      </div>

                      <div className="flex-1 text-center sm:text-left px-4">
                        <Link
                          to={`/product/${item.product}`}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {item.name}
                        </Link>
                      </div>

                      <div className="text-gray-700">${item.price}</div>
                      <div className="text-gray-700">
                        {item.quantity} Piece(s)
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Order Update Section */}
            <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow p-6">
              <h4 className="text-lg font-semibold text-gray-700 mb-4">
                Update Order Status
              </h4>
              <div className="mb-4">
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  onChange={(e) => setOrderStatus(e.target.value)}
                  value={orderStatus}
                  name="status"
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
              <button
                disabled={loading}
                onClick={submitHandler}
                className={`w-full px-4 py-2 rounded-lg shadow font-medium text-white ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 transition"
                }`}
              >
                {loading ? "Updating..." : "Update Status"}
              </button>
            </div>
          </div>
        </Fragment>
      </div>
    </div>
  );
}
