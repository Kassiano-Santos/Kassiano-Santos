import { useState } from "react";

const SearchBar = ({ setQuery, setCategory, setActivateSearch }) => {
  const [localQuery, setLocalQuery] = useState("");
  const categories = [
    "Nature",
    "Person",
    "Tecnology",
    "Animals",
    "Sports",
  ];

  return (
    <div className="search-bar">
      <input
        type="text"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        placeholder="Search Photos..."
      />
      <button
        onClick={() => {
          setQuery(localQuery);
          setActivateSearch(true);
        }}
      >
        Search
      </button>
      <select
        onChange={(e) => {
          setCategory(e.target.value);
          setActivateSearch(true);
        }}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar;