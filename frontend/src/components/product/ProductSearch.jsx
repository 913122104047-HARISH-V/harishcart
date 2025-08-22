import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Loader from "../layouts/Loader";
import Product from "../product/Product";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";

export default function ProductSearch() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.productsState
  );

  const { keyword } = useParams();

  const [price, setPrice] = useState([1, 1000]);
  const [priceChanged, setPriceChanged] = useState(price);
  const [category, setCategory] = useState(null);
  const [rating, setRating] = useState(0);

  const categories = [
    "Electronics",
    "Mobile Phones",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  // Fetch products whenever filters change
  useEffect(() => {
    if (error) {
      toast.error(error, { position: toast.POSITION.BOTTOM_CENTER });
    }
    dispatch(getProducts(keyword, priceChanged, category, rating));
  }, [error, dispatch, keyword, priceChanged, category, rating]);

  // Check if filtered results are empty
  const noProductsFound =
    !loading &&
    products?.length === 0 &&
    (category || keyword || priceChanged[0] > 1 || rating > 0);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h1 className="text-3xl font-bold text-center my-6">Search Products</h1>

          <div className="container mx-auto px-4 flex flex-col md:flex-row gap-6">
            {/* Filters Sidebar */}
            <div className="md:w-1/4 bg-white p-4 rounded shadow-md">
              {/* Price Filter */}
              <div className="mb-6" onMouseUp={() => setPriceChanged(price)}>
                <h3 className="font-semibold mb-2">Price Range</h3>
                <Slider
                  range
                  min={1}
                  max={1000}
                  marks={{ 1: "$1", 1000: "$1000" }}
                  defaultValue={price}
                  onChange={(price) => setPrice(price)}
                  handleRender={(renderProps) => (
                    <Tooltip overlay={`$${renderProps.props["aria-valuenow"]}`}>
                      <div {...renderProps.props}></div>
                    </Tooltip>
                  )}
                />
                <p className="mt-2">
                  ${priceChanged[0]} - ${priceChanged[1]}
                </p>
              </div>

              <hr className="my-6" />

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((cat) => (
                    <li
                      key={cat}
                      className={`cursor-pointer hover:text-blue-500 ${
                        category === cat ? "text-blue-600 font-semibold" : ""
                      }`}
                      onClick={() => setCategory(cat)}
                    >
                      {cat}
                    </li>
                  ))}
                </ul>
              </div>

              <hr className="my-6" />

              {/* Ratings Filter */}
              <div>
                <h3 className="font-semibold mb-2">Ratings</h3>
                <ul className="space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <li
                      key={star}
                      className="cursor-pointer hover:text-yellow-500"
                      onClick={() => setRating(star)}
                    >
                      <div className="relative w-24 h-4 bg-gray-300 rounded">
                        <div
                          className="absolute top-0 left-0 h-4 bg-yellow-400 rounded"
                          style={{ width: `${star * 20}%` }}
                        ></div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Products Grid */}
            <div className="md:w-3/4">
              {noProductsFound ? (
                <div className="text-center text-gray-500 mt-10 text-lg">
                  No products found matching your filters.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products?.map((product) => (
                    <Product key={product._id} col={4} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
