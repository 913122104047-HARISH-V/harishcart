import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, getAdminProducts } from "../actions/productActions";
import { clearError, clearProductDeleted } from "../slices/productSlice";
import Loader from "../layouts/Loader";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";

export default function ProductList() {
  const { products = [], loading = true, error } = useSelector(
    (state) => state.productsState
  );
  const { isProductDeleted, error: productError } = useSelector(
    (state) => state.productState
  );

  const dispatch = useDispatch();

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteProduct(id));
  };

  // 1️⃣ Fetch products (on mount + after delete success)
  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch, isProductDeleted]);

  // 2️⃣ Handle errors (both productsState + productState)
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (productError) {
      toast.error(productError);
      dispatch(clearError());
    }
  }, [error, productError, dispatch]);

  // 3️⃣ Handle delete success
  useEffect(() => {
    if (isProductDeleted) {
      toast.success("Product Deleted Successfully!");
      dispatch(clearProductDeleted());
    }
  }, [isProductDeleted, dispatch]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-1/5 bg-white shadow-md">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-6">
        <h1 className="text-2xl font-bold mb-6">Product List</h1>

        {loading ? (
          <Loader />
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow-md p-4">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-gray-700 font-semibold">ID</th>
                  <th className="py-3 px-4 text-left text-gray-700 font-semibold">Name</th>
                  <th className="py-3 px-4 text-left text-gray-700 font-semibold">Price</th>
                  <th className="py-3 px-4 text-left text-gray-700 font-semibold">Stock</th>
                  <th className="py-3 px-4 text-left text-gray-700 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-t border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-2 px-4">{product._id}</td>
                    <td className="py-2 px-4">{product.name}</td>
                    <td className="py-2 px-4">${product.price}</td>
                    <td className="py-2 px-4">{product.stock}</td>
                    <td className="py-2 px-4 flex gap-2">
                      <Link
                        to={`/admin/product/${product._id}`}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
                      >
                        <i className="fa fa-pencil"></i>
                        <span>Update</span>
                      </Link>
                      <button
                        onClick={(e) => deleteHandler(e, product._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                      >
                        <i className="fa fa-trash"></i>
                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
