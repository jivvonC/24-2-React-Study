import React, { useState } from "react";
import './Paging.css';
import Pagination from "react-js-pagination";

export const Paging = () => {
  const [page, setPage] = useState(1);
  const [list, setList] = useState("");

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={16}
      totalItemsCount={150}
      pageRangeDisplayed={5}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={handlePageChange}
    />
  );
};


