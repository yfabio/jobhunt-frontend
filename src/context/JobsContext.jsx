import { createContext, use, useEffect, useState } from "react";

import { useAuthCtx } from "./AuthContext";

import { toast } from "react-toastify";

const JobsContext = createContext();

const JOBS_PER_PAGE = 5;

export function JobsProvider({ children }) {
  const [jobs, setJobs] = useState([]);

  const nextCurrentPage = (page, limit) => {};

  const { user } = useAuthCtx();

  const addNewJob = (value) => {
    setJobs((jobs) => [...jobs, value]);
  };

  const getJobById = (id) => {
    return jobs.find((job) => job._id === id);
  };

  const deleteJob = (id) => {
    setData((prev) => prev.filter((job) => job.id !== id));
  };

  const reset = () => {
    setJobs([]);
  };

  const loadJobs = async () => {
    if (user.token) {
      try {
        const res = await fetch("/api/api/v1/businesses/jobs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (res.ok) {
          const { data } = await res.json();
          setJobs(data);
        } else {
          const { message } = await res.json();
          toast.error(message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <JobsContext.Provider
      value={{
        jobs,
        totalJobs: jobs.length,
        getJobById,
        nextCurrentPage,
        deleteJob,
        addNewJob,
        reset,
        loadJobs,
      }}>
      {children}
    </JobsContext.Provider>
  );
}

export function useJobsCtx() {
  return use(JobsContext);
}
