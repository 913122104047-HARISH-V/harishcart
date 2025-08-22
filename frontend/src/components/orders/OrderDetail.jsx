import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loader from "../layouts/Loader";
import { orderDetail as orderDetailAction } from "../actions/orderActions";

export default function OrderDetail() {
  const { orderDetail, loading } = useSelector((state) => state.orderState);
  const {
    shippingInfo = {},
    user = {},
    orderStatus = "Processing",
    orderItems = [],
    totalPrice = 0,
    paymentInfo = {},
  } = orderDetail;

  const isPaid = paymentInfo && paymentInfo.status === "succeeded";
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(orderDetailAction(id));
  }, [id, dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8 py-6">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow p-6">
              <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                Order # {orderDetail._id}
              </h1>

              {/* Shipping Info */}
              <h4 className="text-lg font-medium text-gray-700 mb-3">
                Shipping Info
              </h4>
              <p>
                <b>Name:</b> {user.name}
              </p>
              <p>
                <b>Phone:</b> {shippingInfo.phoneNo}
              </p>
              <p className="mb-4">
                <b>Address:</b> {shippingInfo.address}, {shippingInfo.city},{" "}
                {shippingInfo.postalCode}, {shippingInfo.state},{" "}
                {shippingInfo.country}
              </p>
              <p>
                <b>Amount:</b> ${totalPrice}
              </p>

              <hr className="my-4 border-gray-200" />

              {/* Payment */}
              <h4 className="text-lg font-medium text-gray-700 mb-3">Payment</h4>
              <p
                className={`font-semibold ${
                  isPaid ? "text-green-600" : "text-red-600"
                }`}
              >
                {isPaid ? "PAID" : "NOT PAID"}
              </p>

              {/* Order Status */}
              <h4 className="text-lg font-medium text-gray-700 mt-6 mb-3">
                Order Status
              </h4>
              <p
                className={`font-semibold ${
                  orderStatus && orderStatus.includes("Delivered")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {orderStatus}
              </p>

              {/* Order Items */}
              <h4 className="text-lg font-medium text-gray-700 mt-6 mb-3">
                Order Items
              </h4>
              <hr className="mb-4 border-gray-200" />

              <div className="space-y-6">
                {orderItems &&
                  orderItems.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center"
                    >
                      {/* Image */}
                      <div className="flex justify-center sm:justify-start">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-contain rounded"
                        />
                      </div>

                      {/* Name */}
                      <div className="sm:col-span-2 text-center sm:text-left">
                        <Link
                          to={`/product/${item.product}`}
                          className="text-blue-600 hover:underline"
                        >
                          {item.name}
                        </Link>
                      </div>

                      {/* Price & Quantity */}
                      <div className="flex flex-col sm:flex-row sm:justify-between text-center sm:text-right text-gray-700">
                        <p className="font-medium">${item.price}</p>
                        <p className="mt-1 sm:mt-0">
                          {item.quantity} Piece(s)
                        </p>
                      </div>
                    </div>
                  ))}
              </div>

              <hr className="mt-6 border-gray-200" />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
