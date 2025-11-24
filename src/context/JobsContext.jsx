import { createContext, use, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useAuthCtx } from "./AuthContext";

const JobsContext = createContext();

export function JobsProvider({ children }) {
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    currentPage: 1,
    jobs: [],
  });

  const { user } = useAuthCtx();

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
        const res = await fetch(`/api/api/v1/businesses/jobs/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (res.ok) {
          setPagination((pag) => ({
            ...pag,
            jobs: pag.jobs.filter((job) => job._id !== id),
          }));
        } else {
          const { message } = await res.json();
          toast.error(message);
          console.log(message);
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
        const res = await fetch(`/api/api/v1/businesses/jobs?page=${page}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (res.ok) {
          const { data } = await res.json();
          setPagination(data);
        } else {
          const { message } = await res.json();
          toast.error(message);
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
