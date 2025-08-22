import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { createReview, getProduct } from "../actions/productActions"
import Loader from '../layouts/Loader';
import { addCartItem } from "../actions/cartActions";
import { clearReviewSubmitted, clearError, clearProduct } from '../slices/productSlice';
import { toast } from "react-toastify";
import ProductReview from "./ProductReview";
import { FaStar } from "react-icons/fa";


export default function ProductDetail() {
  const { loading, product = {}, isReviewSubmitted, error } = useSelector((state) => state.productState);
  const { user } = useSelector(state => state.authState);
  const dispatch = useDispatch();
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => {
    if (quantity >= product.stock) return;
    setQuantity(quantity + 1);
  };
  const decreaseQty = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const reviewHandler = () => {
    const formData = new FormData();
    formData.append('rating', rating);
    formData.append('comment', comment);
    formData.append('productId', id);
    dispatch(createReview(formData))
  }

  useEffect(() => {
    if (isReviewSubmitted) {
      handleClose()
      toast('Review Submitted successfully', {
        type: 'success',
        onOpen: () => dispatch(clearReviewSubmitted())
      })
    }
    if (error) {
      toast(error, {
        type: 'error',
        onOpen: () => { dispatch(clearError()) }
      })
      return
    }
    if (!product._id || isReviewSubmitted) {
      dispatch(getProduct(id))
    }
    return () => {
      dispatch(clearProduct())
    }
  }, [dispatch, id, isReviewSubmitted, error])

  return (
    <Fragment>
      {loading ? <Loader /> :
        <Fragment>
          <div className="flex flex-col lg:flex-row justify-around items-start gap-10 p-6">

            {/* Product Image */}
<div className="flex gap-4 overflow-x-auto">
  {product.images && product.images.length > 0 ? (
    product.images.map((imgObj, index) => (
      <img
        key={index}
        src={imgObj.url}   // <-- use url from backend
        alt={`Product ${index + 1}`}
        className="w-40 h-40 object-cover rounded-lg border shadow"
      />
    ))
  ) : (
    <img
      src="https://via.placeholder.com/300x300.png?text=No+Image"
      alt="No product"
      className="w-40 h-40 object-cover rounded-lg border shadow"
    />
  )}
</div>



            {/* Product Details */}
            <div className="w-full lg:w-1/2 space-y-4">
              <h3 className="text-2xl font-semibold">{product.name}</h3>
              <p className="text-gray-500">Product # {product._id}</p>

              <div className="flex items-center gap-2">
                <div className="relative h-5 w-28 bg-gray-200 rounded">
                  <div
                    className="absolute top-0 left-0 h-5 bg-yellow-400 rounded"
                    style={{ width: `${product.ratings / 5 * 100}%` }}
                  ></div>
                </div>
                <span className="text-gray-600">({product.numOfReviews} Reviews)</span>
              </div>

              <p className="text-3xl font-bold text-indigo-600">${product.price}</p>

              {/* Quantity Selector */}
              <div className="flex items-center gap-3">
                <button
                  onClick={decreaseQty}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >-</button>
                <input
                  type="number"
                  className="w-16 text-center border rounded-md count"
                  value={quantity}
                  readOnly
                />
                <button
                  onClick={increaseQty}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >+</button>
              </div>

              {/* Add to Cart */}
              <button
                type="button"
                disabled={product.stock === 0}
                onClick={() => {
                  dispatch(addCartItem(product._id, quantity))
                  toast('Cart Item Added!', {
                    type: 'success',
                  })
                }}
                className="mt-3 px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 disabled:bg-gray-400"
              >
                Add to Cart
              </button>

              <p>
                Status:{" "}
                <span className={`${product.stock > 0 ? 'text-green-600' : 'text-red-600'} font-semibold`}>
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </p>

              <div>
                <h4 className="text-lg font-semibold">Description:</h4>
                <p className="text-gray-700">{product.description}</p>
              </div>

              <p className="text-gray-600">Sold by: <strong>{product.seller}</strong></p>

              {/* Review Button */}
              {user ?
                <button
                  onClick={handleShow}
                  className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
                >
                  Submit Your Review
                </button>
                :
                <div className="mt-5 p-3 bg-red-100 text-red-600 rounded-lg">Login to Post Review</div>
              }

              {/* Review Modal */}
              {show && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
                  <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">

                    {/* Close button */}
                    <button
                      onClick={handleClose}
                      className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg font-bold"
                    >
                      ✕
                    </button>

                    {/* Modal Header */}
                    <h2 className="text-2xl font-semibold mb-2 text-gray-800">Submit Your Review</h2>
                    <p className="text-gray-500 mb-4 text-sm">
                      Rate the product and share your thoughts.
                    </p>

                    {/* Rating stars */}
                    <ul className="flex gap-2 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <li
                          key={star}
                          onClick={() => setRating(star)}
                          className={`cursor-pointer transition ${star <= rating ? "text-yellow-400 scale-110" : "text-gray-300"
                            }`}
                        >
                          <FaStar className="text-2xl" />
                        </li>
                      ))}
                    </ul>

                    {/* Comment box */}
                    <textarea
                      onChange={(e) => setComment(e.target.value)}
                      value={comment}
                      name="review"
                      id="review"
                      className="w-full h-28 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700 resize-none mb-4"
                      placeholder="Write your review here..."
                    ></textarea>

                    {/* Submit button */}
                    <div className="flex justify-end">
                      <button
                        disabled={loading}
                        onClick={reviewHandler}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        {loading ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Reviews */}
          <div className="mt-10">
            {product.reviews && product.reviews.length > 0 && (
              <ProductReview reviews={product.reviews} />
            )}
          </div>
        </Fragment>}
    </Fragment>
  )
}
