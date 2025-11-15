import { useJobsCtx } from "../context/JobsContext";

import JobApplied from "./JobApplied";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuthCtx } from "../context/AuthContext";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  const { user } = useAuthCtx();

  const loadAppliedJobs = async () => {
    try {
      const res = await fetch("/api/api/v1/members/jobs", {
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
  };

  useEffect(() => {
    loadAppliedJobs();
  }, []);

  const updateJobs = () => {
    loadAppliedJobs();
  };

  return (
    <section className="w-full rounded p-6 border-[1px] border-gray-200">
      <h1 className="text-2xl font-bold my-20">Jobs</h1>
      <div className="flex flex-col gap-2">
        {jobs.map((job, idx) => (
          <JobApplied
            update={updateJobs}
            key={idx}
            job={job}
          />
        ))}
      </div>
      <Pagination />
    </section>
  );
};

export default Jobs;
