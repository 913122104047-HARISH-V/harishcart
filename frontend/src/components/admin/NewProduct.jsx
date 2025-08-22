// newproduct.js
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewProduct } from "../actions/productActions";
import { clearError, clearProductCreated } from "../slices/productSlice";
import { toast } from "react-toastify";

export default function NewProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");

  const { loading, isProductCreated, error } = useSelector((state) => state.productState || {});

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

  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const submitHandler = (e) => {
    e.preventDefault();
  
    const productData = {
      name,
      price: parseFloat(price) || 0,
      stock: Number(stock) || 0,
      description,
      seller,
      category,
      images: images.length > 0 ? images : []

    };
  
    if (productData.images.length === 0) {
      alert("Please upload at least one product image");
      return;
    }
  
    dispatch(createNewProduct(productData));
  };
  


  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagePreviews([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);  // base64 string
          setImagePreviews((old) => [...old, reader.result]); // preview
        }
      };
      reader.readAsDataURL(file);
    });
  };


  useEffect(() => {
    if (isProductCreated) {
      toast("Product Created Successfully!", {
        type: "success",
        onOpen: () => dispatch(clearProductCreated()),
      });
      navigate("/admin/products");
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
  }, [isProductCreated, error, dispatch, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <main className="md:ml-64 p-6 md:p-10">
        <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6 md:p-8">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">Create New Product</h1>

          <form onSubmit={submitHandler} className="space-y-5" encType="multipart/form-data">
            <div>
              <label htmlFor="name_field" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name_field"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="price_field" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  id="price_field"
                  step="0.01"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  required
                />
              </div>

              <div>
                <label htmlFor="stock_field" className="block text-sm font-medium text-gray-700">
                  Stock
                </label>
                <input
                  type="number"
                  id="stock_field"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  onChange={(e) => setStock(e.target.value)}
                  value={stock}
                />
              </div>
            </div>

            <div>
              <label htmlFor="description_field" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description_field"
                rows="6"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category_field" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category_field"
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  <option value="">Select</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="images_field" className="block text-sm font-medium text-gray-700">
                  Product Images
                </label>
                <input
                  type="file"
                  id="images_field"
                  accept="image/*"
                  multiple
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 shadow-sm"
                  onChange={handleImageChange}
                />
              </div>

              {/* Preview */}
              <div className="flex gap-2 mt-2 flex-wrap">
                {imagePreviews.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="preview"
                    className="h-20 w-20 object-cover rounded-md border"
                  />
                ))}
              </div>


              <div>
                <label htmlFor="seller_field" className="block text-sm font-medium text-gray-700">
                  Seller Name
                </label>
                <input
                  type="text"
                  id="seller_field"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  onChange={(e) => setSeller(e.target.value)}
                  value={seller}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 font-semibold focus:outline-none focus:ring focus:ring-indigo-300 disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}