import { useState } from "react";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useJobsCtx } from "../context/JobsContext";

const Pagination = () => {
  const {
    pageGroup,
    endPage,
    nextPage,
    previousPage,
    nextPageHandler,
    totalPages,
    pageNumbers,
  } = useJobsCtx();

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
          className="py-3 px-5 text-black font-bold bg-gray-200 rounded-lg hover:bg-gray-300 focus:bg-black focus:text-white">
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
