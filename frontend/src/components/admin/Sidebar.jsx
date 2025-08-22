// sidebar.js
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Sidebar({ isOpen = true, toggleSidebar }) {
  const navigate = useNavigate();
  const [isProductOpen, setIsProductOpen] = useState(false);

  return (
    <aside
      className={`fixed top-16 left-0 h-[calc(100vh-64px)] w-64 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-lg z-40 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
      aria-label="Sidebar"
    >
      <nav className="h-full overflow-y-auto p-4">
        <h2 className="text-lg md:text-xl font-semibold mb-6">Admin Panel</h2>

        <ul className="space-y-2">
          <li>
            <Link
              to="/admin/dashboard"
              className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Dashboard
            </Link>
          </li>

          <li>
            <button
              onClick={() => setIsProductOpen((s) => !s)}
              className="w-full flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-expanded={isProductOpen}
            >
              <span>Products</span>
              <svg
                className={`w-4 h-4 transform transition-transform ${isProductOpen ? "rotate-180" : "rotate-0"}`}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {isProductOpen && (
              <ul className="mt-2 ml-3 space-y-1">
                <li>
                  <button
                    onClick={() => navigate("/admin/products")}
                    className="w-full text-left rounded-md px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    All Products
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/admin/products/create")}
                    className="w-full text-left rounded-md px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Create Product
                  </button>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link to="/admin/orders" className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
              Orders
            </Link>
          </li>

          <li>
            <Link to="/admin/users" className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
              Users
            </Link>
          </li>

          <li>
            <Link to="/admin/reviews" className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
              Reviews
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile close button */}
      <button
        className="md:hidden absolute top-3 right-3 bg-gray-100 dark:bg-gray-800 rounded-full p-1 text-sm"
        onClick={toggleSidebar}
        aria-label="Close sidebar"
      >
        ✕
      </button>
    </aside>
  );
}