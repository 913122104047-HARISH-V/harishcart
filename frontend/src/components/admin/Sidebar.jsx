import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = useState({ products: false });
  const [collapsed, setCollapsed] = useState(false); // desktop collapse
  const [isOpen, setIsOpen] = useState(false); // mobile sidebar toggle

  const handleMenuToggle = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <>
      {/* Hamburger (always visible on mobile) */}
      <button
        className="md:hidden fixed top-3 left-3 z-50 bg-gray-100 dark:bg-gray-800 p-2 rounded-md shadow"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {/* Hamburger Icon */}
        <svg
          className="w-6 h-6 text-gray-800 dark:text-gray-200"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Overlay (only on mobile when open) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside
        className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-lg z-40 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        ${collapsed ? "w-20" : "w-64"} md:translate-x-0`}
      >
        <nav className="h-full flex flex-col overflow-y-auto p-2">
          {/* Collapse toggle (desktop only) */}
          <div className="flex justify-between items-center px-2 py-2">
            {!collapsed && (
              <h2 className="text-xl font-semibold">Admin Panel</h2>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:block text-sm bg-gray-100 dark:bg-gray-800 rounded-full p-1"
              title={collapsed ? "Expand" : "Collapse"}
            >
              {collapsed ? "→" : "←"}
            </button>
          </div>

          <ul className="flex-1 mt-4 space-y-2">
            <li>
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                
                {!collapsed && <span>Dashboard</span>}
              </Link>
            </li>

            {/* Products menu */}
            <li>
              <button
                onClick={() => handleMenuToggle("products")}
                className="flex items-center justify-between w-full gap-2 rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <div className="flex items-center gap-2">
                  
                  {!collapsed && <span>Products</span>}
                </div>
                {!collapsed && (
                  <svg
                    className={`w-4 h-4 transform transition-transform ${
                      openMenus.products ? "rotate-180" : "rotate-0"
                    }`}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 8l5 5 5-5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>

              {openMenus.products && !collapsed && (
                <ul className="ml-8 mt-1 space-y-1">
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
              <Link
                to="/admin/orders"
                className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
               
                {!collapsed && <span>Orders</span>}
              </Link>
            </li>

            <li>
              <Link
                to="/admin/users"
                className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
               
                {!collapsed && <span>Users</span>}
              </Link>
            </li>

            <li>
              <Link
                to="/admin/reviews"
                className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                
                {!collapsed && <span>Reviews</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
