import { createContext, useContext, useEffect, useState } from "react";

const JobsContext = createContext();

import values from "../data/jobs";

const JOBS_PER_PAGE = 5;

export function JobsProvider({ children }) {
  const [data, setData] = useState(values);

  const getJobs = (page, limit) => {
    const batchJobs = [];
    let index = (page - 1) * limit;
    let count = 0;
    while (true) {
      if (count === limit || index === data.length - 1) {
        break;
      }
      batchJobs.push(data[index++]);
      count++;
    }
    return batchJobs;
  };

  const [jobs, setJobs] = useState(getJobs(1, JOBS_PER_PAGE));

  const nextCurrentPage = (page, limit) => {
    setJobs(getJobs(page, limit));
  };

  const getId = () => data.sort((a, b) => a.id - b.id)[data.length - 1].id + 1;

  const addNewJob = (value) => {
    const job = { ...value, id: getId() };
    setData((prev) => [...prev, job]);
  };

  const getJobById = (id) => {
    return data.find((job) => job.id == id);
  };

  const deleteJob = (id) => {
    setData((prev) => prev.filter((job) => job.id !== id));
  };

  useEffect(() => {
    setJobs(getJobs(1, JOBS_PER_PAGE));
  }, [data]);

  return (
    <JobsContext.Provider
      value={{
        jobs,
        totalJobs: data.length,
        getJobById,
        nextCurrentPage,
        deleteJob,
        addNewJob,
      }}>
      {children}
    </JobsContext.Provider>
  );
}

export function useJobsCtx() {
  return useContext(JobsContext);
}
