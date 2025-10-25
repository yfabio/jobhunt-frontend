import { Routes, Route, useNavigate, useLocation, Outlet } from "react-router";

import FilterJobs from "../components/FilterJobs";

import JobItem from "../employee/JobItem";
import Pagination from "../components/Pagination";

import { useJobsCtx } from "../context/JobsContext";
import { useEffect } from "react";

const HomePage = () => {
  const { jobs } = useJobsCtx();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (jobs.length > 0 && location.pathname === "/") {
      navigate(`/${jobs[0].id}`, { replace: true });
    }
  }, [jobs, location.pathname, navigate]);

  return (
    <>
      <section className="container mx-auto p-6">
        {/* Filter */}
        <FilterJobs />
        <div className="flex flex-col gap-5 mt-4 md:flex-row">
          <div className="flex flex-col items-center flex-1 md:items-start gap-4">
            {jobs.map((job) => (
              <JobItem
                key={job.id}
                job={job}
              />
            ))}
            <Pagination />
          </div>
          <div className="flex-2">
            <Outlet />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
