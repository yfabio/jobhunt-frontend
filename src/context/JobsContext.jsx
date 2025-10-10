import { createContext, useContext, useState } from "react";

const JobsContext = createContext();

import data from "../data/jobs";

const JOBS_PER_PAGE = 5;

const MAX_PAGE = 5;

const getJobs = (limit, offset) => {
  const jobs = [];
  const index = offset === 0 ? 0 : offset - 1;
  for (let i = index; i < limit + index; i++) {
    jobs.push(data[i]);
  }
  return jobs.sort((a, b) => b - a);
};

export function JobsProvider({ children }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(0);

  console.log(data.length);

  const items = getJobs(JOBS_PER_PAGE, (currentPage - 1) * JOBS_PER_PAGE);

  const totalPages = Math.ceil(data.length / JOBS_PER_PAGE);

  const startPage = pageGroup * MAX_PAGE + 1;

  const endPage = Math.min(startPage + MAX_PAGE - 1, totalPages);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const nextPageHandler = (page) => {
    setCurrentPage(page);
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
    <JobsContext.Provider
      value={{
        jobs: items,
        totalPages,
        endPage,
        pageGroup,
        pageNumbers,
        nextPage,
        previousPage,
        nextPageHandler,
      }}>
      {children}
    </JobsContext.Provider>
  );
}

export function useJobsCtx() {
  return useContext(JobsContext);
}
