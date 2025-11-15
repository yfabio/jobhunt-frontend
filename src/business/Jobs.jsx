import Pagination from "../components/Pagination";
import { useJobsCtx } from "../context/JobsContext";

import Job from "./Job";

const Jobs = () => {
  const { jobs } = useJobsCtx();

  return (
    <section className="w-full rounded p-6 border-[1px] border-gray-200">
      <h1 className="text-2xl font-bold my-20">Jobs</h1>
      <div className="flex flex-col gap-2">
        {jobs.map((job, idx) => (
          <Job
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
