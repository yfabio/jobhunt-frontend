import { useJobsCtx } from "../context/JobsContext";

import JobApplied from "./JobApplied";
import Pagination from "../components/Pagination";

const Jobs = () => {
  const { jobs } = useJobsCtx();

  return (
    <section className="rounded p-6 border-[1px] border-gray-200">
      <h1 className="text-2xl font-bold my-20">Jobs</h1>
      <div className="flex flex-col gap-0.5">
        {jobs.map((job) => (
          <JobApplied
            key={job.id}
            job={job}
          />
        ))}
      </div>
      <Pagination />
    </section>
  );
};

export default Jobs;
