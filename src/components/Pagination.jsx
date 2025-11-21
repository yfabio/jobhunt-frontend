import { useState } from "react";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const MAX_PAGE = 5;

const Pagination = ({ totalPages, pageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(0);

  const startPage = pageGroup * MAX_PAGE + 1;

  const endPage = Math.min(startPage + MAX_PAGE - 1, totalPages);

  const pageNumbers = [];

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const nextPageHandler = (page) => {
    setCurrentPage((_) => page);
    pageChange(page);
  };

  const nextPage = () => {
    if (endPage < totalPages) {
      setPageGroup(pageGroup + 1);
      setCurrentPage(startPage + MAX_PAGE);
    }
  };

  const previousPage = () => {
    if (pageGroup > 0) {
      setPageGroup(pageGroup - 1);
      setCurrentPage(startPage - MAX_PAGE);
    }
  };

  return (
    <div className="mt-2 flex items-center justify-center gap-2 p-4">
      <button
        disabled={pageGroup === 0}
        onClick={previousPage}
        className="py-4 px-4 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50">
        <FaAngleLeft className="text-black" />
      </button>
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => nextPageHandler(page)}
          className={`${
            currentPage === page
              ? "bg-black text-white"
              : "text-black bg-gray-200"
          } py-3 px-5 font-bold rounded-lg hover:bg-gray-300 focus:bg-black focus:text-white`}>
          {page}
        </button>
      ))}
      <button
        disabled={endPage === totalPages}
        onClick={nextPage}
        className="py-4 px-4 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-60">
        <FaAngleRight className="text-black" />
      </button>
    </div>
  );
};

export default Pagination;
