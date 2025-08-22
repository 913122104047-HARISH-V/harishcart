import { Link } from "react-router-dom";

export default function CheckoutSteps({ shipping, confirmOrder, payment }) {
  return (
    <div className="flex justify-center items-center mt-10 space-x-8">
      {/* Shipping Step */}
      {shipping ? (
        <Link to="/shipping" className="flex flex-col items-center group">
          <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 bg-blue-600 text-white border-blue-600">
            1
          </div>
          <span className="mt-2 text-sm font-medium text-blue-600">
            Shipping Info
          </span>
        </Link>
      ) : (
        <span className="flex flex-col items-center group cursor-not-allowed">
          <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 bg-gray-200 text-gray-500 border-gray-300">
            1
          </div>
          <span className="mt-2 text-sm font-medium text-gray-500">
            Shipping Info
          </span>
        </span>
      )}

      {/* Connector */}
      <div
        className={`h-0.5 w-16 ${
          confirmOrder || payment ? "bg-blue-600" : "bg-gray-300"
        }`}
      ></div>

      {/* Confirm Order Step */}
      {confirmOrder ? (
        <Link to="/order/confirm" className="flex flex-col items-center group">
          <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 bg-blue-600 text-white border-blue-600">
            2
          </div>
          <span className="mt-2 text-sm font-medium text-blue-600">
            Confirm Order
          </span>
        </Link>
      ) : (
        <span className="flex flex-col items-center group cursor-not-allowed">
          <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 bg-gray-200 text-gray-500 border-gray-300">
            2
          </div>
          <span className="mt-2 text-sm font-medium text-gray-500">
            Confirm Order
          </span>
        </span>
      )}

      {/* Connector */}
      <div
        className={`h-0.5 w-16 ${payment ? "bg-blue-600" : "bg-gray-300"}`}
      ></div>

      {/* Payment Step */}
      {payment ? (
        <Link to="/payment" className="flex flex-col items-center group">
          <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 bg-blue-600 text-white border-blue-600">
            3
          </div>
          <span className="mt-2 text-sm font-medium text-blue-600">
            Payment
          </span>
        </Link>
      ) : (
        <span className="flex flex-col items-center group cursor-not-allowed">
          <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 bg-gray-200 text-gray-500 border-gray-300">
            3
          </div>
          <span className="mt-2 text-sm font-medium text-gray-500">
            Payment
          </span>
        </span>
      )}
    </div>
  );
}
