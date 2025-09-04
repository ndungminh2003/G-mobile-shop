import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const types = [];

export default function SearchBar() {
  const [activeSearch, setActiveSearch] = useState([]);
  const [showActiveSearch, setShowActiveSearch] = useState(false);
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return () => setActiveSearch([]);
  }, []);

  const handleChangeKeyword = (e) => {
    const value = e.target.value;
    setKeyword(value);
    setActiveSearch(types.filter((type) => type.includes(value)).slice(0, 8));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search-product/?keyword=${keyword}`);
  };

  const handleSearchInputClick = () => {
    setShowActiveSearch(true);
  };

  const handleSearchInputBlur = () => {
    setShowActiveSearch(false);
  };
  return (
    <form
      className=" w-96 relative min-w-[250px] xsm:w-[200px] p-4"
      onSubmit={handleSubmit}
    >
      <div className=" relative">
        <input
          type="search"
          placeholder="Bạn cần tìm gì..."
          className=" w-full p-4 rounded-full"
          onChange={handleChangeKeyword}
          value={keyword}
          onClick={handleSearchInputClick}
          onBlur={handleSearchInputBlur}
        />
        <button
          type="submit"
          className=" absolute right-1 top-1/2 -translate-y-1/2 bg-gray-400 rounded-full p-3"
        >
          <SearchIcon />
        </button>
      </div>

      {showActiveSearch && activeSearch.length > 0 && (
        <div className=" absolute bg-gray-400 w-full top-16 p-4 rounded-xl flex flex-col gap-2 left-1/2 -translate-x-1/2 z-50 ">
          {activeSearch.map((s) => (
            <span className=" hover:bg-gray-500 hover:rounded-lg hover:px-2 cursor-pointer">
              {s}
            </span>
          ))}
        </div>
      )}
    </form>
  );
}
