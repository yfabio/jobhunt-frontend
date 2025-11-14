import { createContext, use, useEffect, useState } from "react";

import { useAuthCtx } from "./AuthContext";

import values from "../data/jobs";
import { toast } from "react-toastify";

const JobsContext = createContext();

const JOBS_PER_PAGE = 5;

export function JobsProvider({ children }) {
  const [jobs, setJobs] = useState([]);

  const nextCurrentPage = (page, limit) => {};

  const addNewJob = (value) => {};

  const getJobById = (id) => {
    return values.find((job) => job.id === id);
  };

  const deleteJob = (id) => {
    setData((prev) => prev.filter((job) => job.id !== id));
  };

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const res = await fetch("/api/api/v1/businesses/jobs");
        if (res.ok) {
          const { data } = await res.json();
          setJobs(data);
        } else {
          const { message } = await res.json();
          toast.error(message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadJobs();
  }, []);

  return (
    <JobsContext.Provider
      value={{
        jobs,
        totalJobs: jobs.length,
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
  return use(JobsContext);
}
