import { createContext, useContext, useState } from "react";

const JobsContext = createContext();

import data from "../data/jobs";

const JOBS_PER_PAGE = 5;

const getJobs = (limit, offset) => {
  const jobs = [];
  const index = offset === 0 ? 0 : offset - 1;
  for (let i = index; i < limit + index; i++) {
    jobs.push(data[i]);
  }
  return jobs.sort((a, b) => b - a);
};

export function JobsProvider({ children }) {
  const [jobs, setJobs] = useState(getJobs(JOBS_PER_PAGE, 0));

  const getJobById = (id) => {
    return data.find((job) => job.id == id);
  };

  const nextCurrentPage = (perPage, nextBach) => {
    setJobs(getJobs(perPage, nextBach));
  };

  return (
    <JobsContext.Provider
      value={{
        jobs,
        totalJobs: data.length,
        getJobById,
        nextCurrentPage,
      }}>
      {children}
    </JobsContext.Provider>
  );
}

export function useJobsCtx() {
  return useContext(JobsContext);
}
