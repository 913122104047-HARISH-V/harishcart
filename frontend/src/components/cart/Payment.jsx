/*
// frontend/src/components/cart/Payment.js
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { orderCompleted } from "../slices/cartSlice";
import { createOrder } from "../actions/orderActions";
import { clearError as clearOrderError } from "../slices/orderSlice";
import { validateShipping } from "./Shipping";

export default function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { user } = useSelector((state) => state.authState);
  const { items: cartItems, shippingInfo } = useSelector(
    (state) => state.cartState
  );
  const { error: orderError } = useSelector((state) => state.orderState);

  const order = {
    orderItems: cartItems,
    shippingInfo,
    itemsPrice: orderInfo?.itemsPrice,
    shippingPrice: orderInfo?.shippingPrice,
    taxPrice: orderInfo?.taxPrice,
    totalPrice: orderInfo?.totalPrice,
    paymentInfo: {
      id: "dummy_payment_id_" + Date.now(),
      status: "succeeded",
    },
  };

  useEffect(() => {
    validateShipping(shippingInfo, navigate);

    if (orderError) {
      toast(orderError, {
        type: "error",
        onOpen: () => dispatch(clearOrderError()),
      });
    }
  }, [orderError, shippingInfo, dispatch, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    //  Fake payment success
    toast("Payment Success!", {
      type: "success"
    });

    dispatch(orderCompleted()); // clear cart + localStorage
    dispatch(createOrder(order)); // save order to backend

    navigate("/order/success"); // redirect to success page
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Payment
        </h1>

        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label
              htmlFor="card_num_field"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Card Number
            </label>
            <input
              type="text"
              id="card_num_field"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="1111 2222 3333 4444"
              required
            />
          </div>

          
          <div>
            <label
              htmlFor="card_exp_field"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Card Expiry
            </label>
            <input
              type="text"
              id="card_exp_field"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="MM/YY"
              required
            />
          </div>

          
          <div>
            <label
              htmlFor="card_cvc_field"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Card CVC
            </label>
            <input
              type="text"
              id="card_cvc_field"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="123"
              required
            />
          </div>

          
          <button
            id="pay_btn"
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium shadow-md hover:bg-green-700 transition"
          >
            Pay - {`$${orderInfo?.totalPrice}`}
          </button>
        </form>
      </div>
    </div>
  );
} */



// frontend/src/components/cart/Payment.js
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { orderCompleted } from "../slices/cartSlice";
import { createOrder } from "../actions/orderActions";
import { clearError as clearOrderError } from "../slices/orderSlice";
import { useEffect } from "react";

export default function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { items: cartItems, shippingInfo } = useSelector(
    (state) => state.cartState
  );
  const { error: orderError } = useSelector((state) => state.orderState);

  const order = {
    orderItems: cartItems,
    shippingInfo,
    itemsPrice: orderInfo?.itemsPrice,
    shippingPrice: orderInfo?.shippingPrice,
    taxPrice: orderInfo?.taxPrice,
    totalPrice: orderInfo?.totalPrice,
    paymentInfo: {
      id: "dummy_payment_id_" + Date.now(),
      status: "succeeded",
    },
  };

  useEffect(() => {
    if (orderError) {
      toast(orderError, {
        type: "error",
        onOpen: () => dispatch(clearOrderError()),
      });
    }
  }, [orderError, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();

    // ✅ Validate shipping info here
    const { address, city, state, country, phoneNo, postalCode } = shippingInfo || {};
    if (!address || !city || !state || !country || !phoneNo || !postalCode) {
      toast.error("Please fill the shipping information");
      navigate("/shipping");
      return;
    }

    // 🚀 Fake payment success
    toast.success("Payment Success!");

    dispatch(orderCompleted()); // clear cart + localStorage
    dispatch(createOrder(order)); // save order to backend

    navigate("/order/success"); // redirect to success page
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Payment
        </h1>

        <form onSubmit={submitHandler} className="space-y-5">
          {/* Card Number */}
          <div>
            <label
              htmlFor="card_num_field"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Card Number
            </label>
            <input
              type="text"
              id="card_num_field"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="1111 2222 3333 4444"
              required
            />
          </div>

          {/* Card Expiry */}
          <div>
            <label
              htmlFor="card_exp_field"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Card Expiry
            </label>
            <input
              type="text"
              id="card_exp_field"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="MM/YY"
              required
            />
          </div>

          {/* Card CVC */}
          <div>
            <label
              htmlFor="card_cvc_field"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Card CVC
            </label>
            <input
              type="text"
              id="card_cvc_field"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="123"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            id="pay_btn"
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium shadow-md hover:bg-green-700 transition"
          >
            Pay - {`$${orderInfo?.totalPrice}`}
          </button>
        </form>
      </div>
    </div>
  );
}



  
