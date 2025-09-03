export default function OrderSuccess() {
    return (
      <div className="flex justify-center">
        <div className="w-full max-w-md mt-10 text-center">
          <img
            className="my-8 mx-auto w-48 h-48 object-contain"
            src="https://thumbs.dreamstime.com/b/confirmation-approval-order-operation-payment-successful-completion-girl-confirms-business-success-man-hand-shows-class-239104068.jpg"
            alt="Order Success"
          />
  
          <h2 className="text-2xl font-semibold text-gray-800">
            Your Order has been placed successfully.
          </h2>
  
          <a
            href="/"
            className="mt-6 inline-block px-6 py-2 bg-green-600 text-white font-medium rounded-lg shadow hover:bg-green-700 transition"
          >
            Go to Home page
          </a>
        </div>
      </div>
    );
  }
  
