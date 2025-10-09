import React from "react";

const Searchbar = React.forwardRef(function Searchbar(
  { query, setQuery },
  ref
) {
  return (
    <input
      ref={ref}
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
});

export default Searchbar;
