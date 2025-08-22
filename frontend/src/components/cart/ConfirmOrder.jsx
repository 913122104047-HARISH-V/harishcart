import { Fragment, useEffect } from "react";
import { validateShipping } from "./Shipping";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutStep";

export default function ConfirmOrder() {
  const { shippingInfo, items: cartItems } = useSelector(
    (state) => state.cartState
  );
  const { user } = useSelector((state) => state.authState);
  const navigate = useNavigate();

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 25;
  let taxPrice = Number(0.05 * itemsPrice);
  const totalPrice = Number(itemsPrice + shippingPrice + taxPrice).toFixed(2);
  taxPrice = Number(taxPrice).toFixed(2);

  const processPayment = () => {
    const data = {
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  };

  useEffect(() => {
    validateShipping(shippingInfo, navigate);
  }, []);

  return (
    <Fragment>
      <CheckoutSteps shipping confirmOrder />

      <div className="flex flex-col lg:flex-row justify-between gap-8 mt-6 px-4 lg:px-12">
        {/* Left Section - Shipping Info & Cart */}
        <div className="flex-1 bg-white shadow-md rounded-xl p-6">
          <h4 className="text-xl font-semibold mb-4 border-b pb-2">
            Shipping Info
          </h4>
          <p className="mb-1">
            <span className="font-bold">Name:</span> {user.name}
          </p>
          <p className="mb-1">
            <span className="font-bold">Phone:</span> {shippingInfo.phoneNo}
          </p>
          <p className="mb-4">
            <span className="font-bold">Address:</span> {shippingInfo.address},{" "}
            {shippingInfo.city}, {shippingInfo.postalCode},{" "}
            {shippingInfo.state}, {shippingInfo.country}
          </p>

          <h4 className="text-xl font-semibold mt-6 mb-4 border-b pb-2">
            Your Cart Items
          </h4>

          {cartItems.map((item) => (
            <div
              key={item.product}
              className="flex items-center justify-between border-b py-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-12 object-contain rounded-md"
                />
                <Link
                  to={`/product/${item.product}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  {item.name}
                </Link>
              </div>
              <p className="text-gray-700">
                {item.quantity} × ${item.price}{" "}
                <span className="font-bold ml-1">
                  = ${item.quantity * item.price}
                </span>
              </p>
            </div>
          ))}
        </div>

        {/* Right Section - Order Summary */}
        <div className="w-full lg:w-1/3 bg-white shadow-md rounded-xl p-6">
          <h4 className="text-xl font-semibold mb-4 border-b pb-2">
            Order Summary
          </h4>

          <div className="space-y-2 text-gray-700">
            <p className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold">${itemsPrice.toFixed(2)}</span>
            </p>
            <p className="flex justify-between">
              <span>Shipping:</span>
              <span className="font-semibold">${shippingPrice.toFixed(2)}</span>
            </p>
            <p className="flex justify-between">
              <span>Tax:</span>
              <span className="font-semibold">${taxPrice}</span>
            </p>
          </div>

          <hr className="my-3" />

          <p className="flex justify-between text-lg font-bold text-gray-900">
            <span>Total:</span>
            <span>${totalPrice}</span>
          </p>

          <button
            id="checkout_btn"
            onClick={processPayment}
            className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-200 shadow"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </Fragment>
  );
}
