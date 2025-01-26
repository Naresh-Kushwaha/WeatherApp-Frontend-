import React, { useState } from "react";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  // Handle search on Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  };

  // Handle search button click
  const performSearch = () => {
    if (searchValue.trim()) {
      console.log("Searching for:", searchValue);
      
    } else {
      console.log("Search input is empty.");
    }
  };

  return (
    <div className="flex justify-between items-center border rounded-lg  ">
      {/* Search Input */}
      <input
        type="text"
        placeholder="City.."
        value={searchValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className=" flex grow py-3 focus:outline-none  px-2 bg-transparent   "
      />

      {/* Search Button */}
      <button
        onClick={performSearch}
        className=" mr-8"
        
      >
          <i className="fas fa-search search-icon font-bold    transform text-gray-500" />

      </button>
    </div>
  );
};

export default SearchBar;
