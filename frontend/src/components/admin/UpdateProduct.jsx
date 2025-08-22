import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../actions/productActions";
import { clearError, clearProductUpdated } from "../slices/productSlice";
import { toast } from "react-toastify";

export default function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const { id: productId } = useParams();

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);


  const { loading, isProductUpdated, error, product } = useSelector(
    (state) => state.productState
  );

  const categories = [
    "Electronics", "Mobile Phones", "Laptops", "Accessories", "Headphones", "Food", "Books", "Clothes/Shoes",
    "Beauty/Health", "Sports", "Outdoor", "Home",
  ];
  const dispatch = useDispatch();


  const submitHandler = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("category", category);
    formData.set("stock", stock);
    formData.set("seller", seller);
  
    // Append images
    if (images.length > 0) {
      Array.from(images).forEach((file) => {
        formData.append("images", file);
      });
    }
  
    dispatch(updateProduct(productId, formData));
  };
  

  useEffect(() => {
    if (isProductUpdated) {
      toast("Product Updated Successfully!", {
        type: "success",
        onOpen: () => dispatch(clearProductUpdated()),
      });
      return;
    }

    if (error) {
      toast(error, {
        type: "error",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }

    dispatch(getProduct(productId));
  }, [isProductUpdated, error, dispatch, productId]);

  useEffect(() => {
    if (product._id) {
      setName(product.name);
      setPrice(product.price);
      setStock(product.stock);
      setDescription(product.description);
      setSeller(product.seller);
      setCategory(product.category);
  
      if (product.images) {
        setImagesPreview(product.images.map((img) => img.url));
      }
    }
  }, [product]);
  

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/5 bg-gray-100 min-h-screen">
        <Sidebar />
      </div>
      <div className="md:w-4/5 p-6">
        <Fragment>
          <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
              Update Product
            </h1>

            <form onSubmit={submitHandler} encType="multipart/form-data" className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name_field" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name_field"
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price_field" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="text"
                  id="price_field"
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description_field" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description_field"
                  rows="6"
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                ></textarea>
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category_field" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  id="category_field"
                >
                  <option value="">Select</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Stock */}
              <div>
                <label htmlFor="stock_field" className="block text-sm font-medium text-gray-700">
                  Stock
                </label>
                <input
                  type="number"
                  id="stock_field"
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={(e) => setStock(e.target.value)}
                  value={stock}
                />
              </div>

              {/* Images Upload */}
              <div>
                <label htmlFor="images_field" className="block text-sm font-medium text-gray-700">
                  Product Images
                </label>
                <input
                  type="file"
                  id="images_field"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={(e) => setImages(e.target.files)}
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                />

                {/* Preview */}
                <div className="flex gap-4 mt-3 flex-wrap">
                  {imagesPreview &&
                    imagesPreview.map((img, index) => (
                      <img
                        src={img}
                        key={index}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded-md border"
                      />
                    ))}
                </div>
              </div>


              {/* Seller */}
              <div>
                <label htmlFor="seller_field" className="block text-sm font-medium text-gray-700">
                  Seller Name
                </label>
                <input
                  type="text"
                  id="seller_field"
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={(e) => setSeller(e.target.value)}
                  value={seller}
                />
              </div>


              {/* Submit Button */}
              <button
                id="update_button"
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white font-medium py-2 rounded-lg hover:bg-indigo-700 transition duration-200 disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Product"}
              </button>
            </form>
          </div>
        </Fragment>
      </div>
    </div>
  );
}
