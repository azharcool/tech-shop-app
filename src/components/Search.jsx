import { FaRegWindowClose } from "react-icons/fa";

import React from "react";

function Search(props) {
  const { search, setSearch } = props;
  return (
    <form
      className="searchForm"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input
        type="text"
        placeholder="search tech"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button>
        <FaRegWindowClose />
      </button>
    </form>
  );
}

export default Search;
