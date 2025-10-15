import { createContext, useContext, useState } from "react";

const JobsContext = createContext();

import data from "../data/jobs";

const JOBS_PER_PAGE = 5;

const getJobs = (page, limit) => {
  const jobs = [];
  let index = (page - 1) * limit;
  let count = 0;
  while (true) {
    if (count === limit || index === data.length - 1) {
      break;
    }
    jobs.push(data[index++]);
    count++;
  }
  return jobs;
};

export function JobsProvider({ children }) {
  const [jobs, setJobs] = useState(getJobs(1, JOBS_PER_PAGE));

  const getJobById = (id) => {
    return data.find((job) => job.id == id);
  };

  const nextCurrentPage = (page, limit) => {
    setJobs(getJobs(page, limit));
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
