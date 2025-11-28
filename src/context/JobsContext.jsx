import { createContext, use, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useAuthCtx } from "./AuthContext";
import { useFetch } from "../hooks/useFetch";

const JobsContext = createContext();

export function JobsProvider({ children }) {
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    currentPage: 1,
    jobs: [],
  });

  const [send] = useFetch();

  const { user } = useAuthCtx();

  useEffect(() => {
    if (user.token) {
      loadJobs();
    }
  }, []);

  const addNewJob = (value) => {
    setPagination((pag) => {
      const newJobs = [...pag.jobs];
      newJobs.push(value);
      return { ...pag, jobs: newJobs };
    });
  };

  const getJobById = (id) => {
    return pagination.jobs.find((job) => job._id === id);
  };

  const deleteJob = async (id) => {
    if (user.token) {
      try {
        const data = await send(`/api/api/v1/businesses/jobs/${id}`, "DELETE");
        if (data) {
          setPagination((pag) => ({
            ...pag,
            jobs: pag.jobs.filter((job) => job._id !== id),
          }));
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const reset = () => {
    setPagination({
      total: 0,
      totalPages: 0,
      currentPage: 1,
      jobs: [],
    });
  };

  const loadJobs = async (page = 1) => {
    if (user.token) {
      try {
        const data = await send(`/api/api/v1/businesses/jobs?page=${page}`);
        if (data) {
          setPagination(data);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handlePageChange = (page) => loadJobs(page);

  return (
    <JobsContext.Provider
      value={{
        jobs: pagination.jobs,
        totalPages: pagination.totalPages,
        getJobById,
        deleteJob,
        addNewJob,
        reset,
        loadJobs,
        handlePageChange,
      }}>
      {children}
    </JobsContext.Provider>
  );
}

export function useJobsCtx() {
  return use(JobsContext);
}
