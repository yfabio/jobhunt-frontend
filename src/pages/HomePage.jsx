import { Routes, Route, useNavigate, useLocation } from "react-router";

import FilterJobs from "../components/FilterJobs";

import JobItem from "../components/JobItem";

import { useJobsCtx } from "../context/JobsContext";
import JobInfo from "../components/JobInfo";
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
      {/* Filter */}
      <FilterJobs />
      <section className="flex flex-col gap-5 mt-4 md:flex-row">
        <div className="flex flex-col items-center flex-1 md:items-start gap-4">
          {jobs.map((job) => (
            <JobItem
              key={job.id}
              job={job}
            />
          ))}
        </div>

        <Routes>
          <Route
            path="/:id"
            Component={JobInfo}
          />
        </Routes>
      </section>
    </>
  );
};

export default HomePage;
