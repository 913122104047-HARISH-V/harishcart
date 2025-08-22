export default function ProductReview({ reviews }) {
    return (
      <div className="w-3/4 mx-auto p-4 bg-white rounded-2xl shadow">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Others' Reviews:</h3>
        <hr className="mb-4 border-gray-300" />
  
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review._id}
              className="mb-4 p-4 bg-gray-50 rounded-xl shadow-sm border border-gray-200"
            >
              {/* Rating */}
              <div className="relative w-32 h-5 mb-2">
                <div className="absolute inset-0 bg-gray-300 rounded"></div>
                <div
                  className="absolute inset-0 bg-yellow-400 rounded"
                  style={{ width: `${(review.rating / 5) * 100}%` }}
                ></div>
              </div>
  
              {/* User */}
              <p className="text-sm text-gray-600 font-medium">
                by <span className="text-gray-800">{review.user.name}</span>
              </p>
  
              {/* Comment */}
              <p className="mt-2 text-gray-700">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No reviews yet.</p>
        )}
      </div>
    );
  }
  