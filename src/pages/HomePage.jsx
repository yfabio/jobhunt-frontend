import { Routes, Route } from "react-router";

import FilterJobs from "../components/FilterJobs";
import Pagination from "../components/Pagination";
import JobItem from "../components/JobItem";

import { useJobsCtx } from "../context/JobsContext";
import JobInfo from "../components/JobInfo";

const HomePage = () => {
  const { jobs } = useJobsCtx();

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
          <Pagination />
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
