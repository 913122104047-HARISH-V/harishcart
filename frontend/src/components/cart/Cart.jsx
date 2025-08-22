import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  decreaseCartItemQty,
  increaseCartItemQty,
  removeItemFromCart,
} from "../slices/cartSlice";

export default function Cart() {
  const { items } = useSelector((state) => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const increaseQty = (item) => {
    const count = item.quantity;
    if (item.stock === 0 || count >= item.stock) return;
    dispatch(increaseCartItemQty(item.product));
  };
  const decreaseQty = (item) => {
    const count = item.quantity;
    if (count === 1) return;
    dispatch(decreaseCartItemQty(item.product));
  };
  const { user } = useSelector(state => state.authState);

  const checkoutHandler = () => {
    if (!user) {
      navigate('/login?redirect=shipping'); // not logged in
    } else {
      navigate('/shipping'); // already logged in
    }
  };

  return (
    <Fragment>
      {items.length === 0 ? (
        <h2 className="mt-10 text-center text-2xl font-semibold text-gray-700">
          Your Cart is Empty
        </h2>
      ) : (
        <Fragment>
          <h2 className="mt-8 text-xl font-semibold text-gray-800">
            Your Cart: <b>{items.length} items</b>
          </h2>

          <div className="flex flex-col lg:flex-row justify-between mt-6 gap-6">
            {/* Cart Items */}
            <div className="flex-1">
              {items.map((item) => (
                <Fragment key={item.product}>
                  <hr className="my-4 border-gray-300" />

                  <div className="bg-white rounded-lg shadow p-4 mb-4">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* Image */}
                      <div className="col-span-4 lg:col-span-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-28 h-24 object-contain rounded"
                        />
                      </div>

                      {/* Product Name */}
                      <div className="col-span-5 lg:col-span-3">
                        <Link
                          to={`/product/${item.product}`}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {item.name}
                        </Link>
                      </div>

                      {/* Price */}
                      <div className="col-span-3 lg:col-span-2">
                        <p className="text-gray-800 font-semibold">
                          ${item.price}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="col-span-5 lg:col-span-3 flex items-center space-x-2">
                        <button
                          onClick={() => decreaseQty(item)}
                          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="w-14 text-center border rounded"
                          value={item.quantity}
                          readOnly
                        />
                        <button
                          onClick={() => increaseQty(item)}
                          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove */}
                      <div className="col-span-2 lg:col-span-1 flex justify-center">
                        <button
                          onClick={() =>
                            dispatch(removeItemFromCart(item.product))
                          }
                          className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          <i className="fa fa-trash"></i>
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-1/3 bg-white shadow-lg rounded-lg p-6 h-fit">
              <h4 className="text-lg font-semibold text-gray-800">
                Order Summary
              </h4>
              <hr className="my-3 border-gray-300" />

              <p className="flex justify-between text-gray-700 mb-2">
                Subtotal:
                <span className="font-medium">
                  {items.reduce((acc, item) => acc + item.quantity, 0)} Units
                </span>
              </p>

              <p className="flex justify-between text-gray-700 mb-2">
                Est. total:
                <span className="font-semibold text-green-600">
                  $
                  {items.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}
                </span>
              </p>

              <hr className="my-3 border-gray-300" />

              <button
                id="checkout_btn"
                onClick={checkoutHandler}
                className="w-full py-2 mt-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Check out
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
