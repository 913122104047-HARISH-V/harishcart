import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex w-full">
      <input
        type="text"
        placeholder="Enter Product Name ..."
        className="flex-grow border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:border-blue-500"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button
        type="submit"
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 rounded-r-md"
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default Search;
