import { useJobsCtx } from "../context/JobsContext";

import JobApplied from "./JobApplied";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuthCtx } from "../context/AuthContext";

const Jobs = () => {
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    currentPage: 1,
    jobs: [],
  });

  const { user } = useAuthCtx();

  const loadAppliedJobs = async (page = 1) => {
    try {
      const res = await fetch(`/api/api/v1/members/jobs?page=${page}`, {
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
  };

  useEffect(() => {
    loadAppliedJobs();
  }, []);

  const updateJobs = () => {
    loadAppliedJobs();
  };

  const handlePageChange = (page) => {
    loadAppliedJobs(page);
  };

  return (
    <section className="w-full rounded p-6 border-[1px] border-gray-200">
      <h1 className="text-2xl font-bold my-20">Jobs</h1>
      <div className="flex flex-col gap-2">
        {pagination.jobs.map((job, idx) => (
          <JobApplied
            update={updateJobs}
            key={idx}
            job={job}
          />
        ))}
      </div>
      <Pagination
        totalPages={pagination.totalPages}
        pageChange={handlePageChange}
      />
    </section>
  );
};

export default Jobs;
