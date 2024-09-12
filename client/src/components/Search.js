import React from "react";

function Search({ onSearchChange, searchTerm }) {
  return (
    <div className="relative z-10">
      <div className="bg-white shadow-md py-4 px-4 md:px-8 mx-4 md:mx-8 mt-4 md:mt-8 rounded-lg">
        <div className="searchbar flex flex-col items-center my-4 w-full max-w-3xl mx-auto">
          <label
            htmlFor="search"
            className="text-gray-700 font-semibold text-base md:text-lg mb-2"
          >
            Search Destination:
          </label>
          <input
            type="text"
            id="search"
            placeholder="Type a destination to search..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-green-600 text-base md:text-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default Search;
