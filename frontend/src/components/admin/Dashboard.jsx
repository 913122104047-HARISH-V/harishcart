
// dashboard.js
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAdminProducts } from "../actions/productActions";
import { getUsers } from "../actions/userActions";
import { adminOrders as adminOrdersAction } from "../actions/orderActions";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { products = [] } = useSelector((state) => state.productsState);
  const { adminOrders = [] } = useSelector((state) => state.orderState);
  const { users = [] } = useSelector((state) => state.userState);
  const dispatch = useDispatch();

  // optional: local state to control sidebar on small screens
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  let outOfStock = products.filter((p) => p.stock === 0).length;
  let totalAmount = adminOrders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getUsers());
    dispatch(adminOrdersAction());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(false)} />

      <main className="md:ml-64 p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
        </div>

        {/* Total Amount Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="rounded-xl shadow p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <p className="text-sm font-medium">Total Amount</p>
            <p className="text-2xl md:text-3xl font-extrabold mt-2">${totalAmount.toFixed(2)}</p>
          </div>

          {/* filler cards to keep grid consistent on wide screens */}
          <div className="hidden lg:block" />
          <div className="hidden lg:block" />
          <div className="hidden lg:block" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Products */}
          <div className="rounded-xl shadow overflow-hidden bg-white">
            <div className="p-6 text-center">
              <p className="text-sm font-medium text-gray-600">Products</p>
              <p className="text-2xl md:text-3xl font-bold mt-2 text-gray-800">{products.length}</p>
            </div>
            <Link to="/admin/products" className="block bg-gray-50 hover:bg-gray-100 text-center py-3 text-sm">
              View Details →
            </Link>
          </div>

          {/* Orders */}
          <div className="rounded-xl shadow overflow-hidden bg-white">
            <div className="p-6 text-center">
              <p className="text-sm font-medium text-gray-600">Orders</p>
              <p className="text-2xl md:text-3xl font-bold mt-2 text-gray-800">{adminOrders.length}</p>
            </div>
            <Link to="/admin/orders" className="block bg-gray-50 hover:bg-gray-100 text-center py-3 text-sm">
              View Details →
            </Link>
          </div>

          {/* Users */}
          <div className="rounded-xl shadow overflow-hidden bg-white">
            <div className="p-6 text-center">
              <p className="text-sm font-medium text-gray-600">Users</p>
              <p className="text-2xl md:text-3xl font-bold mt-2 text-gray-800">{users.length}</p>
            </div>
            <Link to="/admin/users" className="block bg-gray-50 hover:bg-gray-100 text-center py-3 text-sm">
              View Details →
            </Link>
          </div>

          {/* Out of Stock */}
          <div className="rounded-xl shadow overflow-hidden bg-white">
            <div className="p-6 text-center">
              <p className="text-sm font-medium text-gray-600">Out of Stock</p>
              <p className="text-2xl md:text-3xl font-bold mt-2 text-gray-800">{outOfStock}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}