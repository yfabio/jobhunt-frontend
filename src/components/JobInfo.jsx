import { useParams } from "react-router";
import { useJobsCtx } from "../context/JobsContext";

const JobInfo = () => {
  const { getJobById } = useJobsCtx();

  const params = useParams();

  const job = getJobById(Number(params.id));

  return (
    <div className="flex flex-col sm:hidden border border-gray-300 text-xl rounded p-4 gap-3 flex-2 md:block">
      <h2 className="text-4xl font-bold capitalize">{job.title}</h2>
      <p className="space-x-1">
        <span className="text-gray-500">{job.company}</span>
        <i className="fa-solid fa-circle text-[4px] align-middle p-2"></i>
        <span className="text-2xl font-semibold">{job.rating}</span>
        <i className="fa-solid fa-star text-xl"></i>
      </p>
      <p className="text-gray-500">{job.address}</p>
      <p className="font-semibold">{job.jobType}</p>
      <p className="font-thin text-gray-500">
        You must create an JobHunt account before continuing to the company
        website to apply
      </p>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Job Detail</h2>
        <div className="flex items-center gap-8">
          <i className="fa-solid fa-briefcase"></i>
          <div>
            <h3 className="inline">Job Type</h3>
            <p className="bg-gray-200 text-sm text-center text-slate-800 py-1 px-2 rounded">
              {job.jobType}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Location</h2>
        <div className="flex items-center gap-8">
          <i className="fa-solid fa-location-dot"></i>
          <p className="text-gray-500">{job.location}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Full job description</h2>
        <p className="text-gray-500 text-justify">{job.description}</p>
      </div>
    </div>
  );
};

export default JobInfo;
