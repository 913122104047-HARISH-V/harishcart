import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Loader from "../layouts/Loader";
import Product from "../product/Product";
import { toast } from "react-toastify";
import { clearError } from "../slices/productsSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  );

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(productsCount / resPerPage);

  const handlePageClick = (pageNo) => {
    if (pageNo >= 1 && pageNo <= totalPages) {
      setCurrentPage(pageNo);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    dispatch(getProducts(null, null, null, null, currentPage));
  }, [dispatch, currentPage]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center mt-8">
            Latest Products
          </h1>

          <section className="container mx-auto px-4 mt-8">
            {/* flex-wrap and justify-center ensures cards are centered even if there are fewer items */}
            <div className="flex flex-wrap justify-center gap-6">
              {products?.length > 0 ? (
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))
              ) : (
                <p className="text-center w-full">No products found</p>
              )}
            </div>
          </section>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageClick(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                  (pageNo) => (
                    <button
                      key={pageNo}
                      onClick={() => handlePageClick(pageNo)}
                      className={`px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 ${
                        currentPage === pageNo
                          ? "bg-blue-500 text-white cursor-default"
                          : "cursor-pointer"
                      }`}
                    >
                      {pageNo}
                    </button>
                  )
                )}

                <button
                  onClick={() => handlePageClick(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
