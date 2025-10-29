import { useState } from "react";
import { Link } from "react-router";

const JobItem = ({ job }) => {
  const [jobDetail, setJobDetail] = useState(false);

  return (
    <Link
      to={`${job.id}`}
      className="max-w-xl w-full rounded-xl p-4 border cursor-pointer hover:shadow-xl">
      <h2 className="text-2xl font-extrabold">{job.title}</h2>
      <p className="font-medium text-gray-500">{job.companyName}</p>
      <p className="font-medium text-gray-500">{job.location}</p>

      <button
        onClick={() => setJobDetail((prev) => !prev)}
        type="button"
        className="md:hidden w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-600">
        <span className="font-semibold">Show Job Detail</span>
      </button>

      {jobDetail && (
        <div className="max-h-96 border border-gray-300 text-xl space-y-2 rounded mt-2 p-4 overflow-y-scroll transition-all duration-700 ease-in-out md:hidden">
          <h2 className="text-4xl font-bold capitalize">{job.title}</h2>
          <p className="space-x-1">
            <span className="text-gray-500">{job.companyName}</span>
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
      )}
    </Link>
  );
};

export default JobItem;
