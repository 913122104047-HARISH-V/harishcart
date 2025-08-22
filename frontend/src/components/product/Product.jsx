import { Link } from "react-router-dom";

export default function Product({ product }) {
  // Determine image URL (fallback if missing)
  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0].url || product.images[0].image // support both {url} and {image}
      : "https://via.placeholder.com/300x300.png?text=No+Image";

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col">
      {/* Product Image */}
      <img
        src={imageUrl}
        alt={product.name}
        className="h-48 w-full object-contain mb-4"
      />

      {/* Product Details */}
      <div className="flex flex-col flex-grow">
        <h5 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </h5>

        {/* Ratings */}
        <div className="flex items-center mt-auto mb-2">
          <div className="relative w-24 h-4 bg-gray-200 rounded overflow-hidden">
            <div
              className="absolute top-0 left-0 h-4 bg-yellow-400"
              style={{ width: `${(product.ratings / 5) * 100}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-500 ml-2">
            ({product.numOfReviews} Reviews)
          </span>
        </div>

        {/* Price */}
        <p className="text-lg font-bold text-green-600 mb-3">
          ${product.price}
        </p>

        {/* View Details Button */}
        <Link
          to={`/product/${product._id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white text-center py-2 rounded-md transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
