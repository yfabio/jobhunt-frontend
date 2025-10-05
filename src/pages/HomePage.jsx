import { useState } from "react";

import FilterJobs from "../components/FilterJobs";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import data from "../data/jobs";

const HomePage = () => {
  const [jobs, setJobs] = useState(data);
  const [pages, setPages] = useState(
    Array.from({ length: 5 }, (_, idx) => (idx += 1))
  );

  return (
    <>
      {/* Filter */}
      <FilterJobs />
      <section className="flex flex-col gap-5 mt-4 md:flex-row">
        <div className="flex flex-col items-center flex-1 md:items-start gap-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="max-w-xl w-full rounded-xl p-4 border cursor-pointer hover:shadow-xl">
              <h2 className="text-2xl font-extrabold">{job.title}</h2>
              <p className="font-medium text-gray-500">{job.companyName}</p>
              <p className="font-medium text-gray-500">{job.location}</p>

              <div className="max-h-96 overflow-y-scroll border border-gray-300 text-xl space-y-2 rounded mt-2 p-4 ease-in-out transition-all duration-1000 md:hidden">
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
                  You must create an JobHunt account before continuing to the
                  company website to apply
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
                  <p className="text-gray-500 text-justify">
                    {job.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-2 flex items-center justify-center gap-2 p-4">
            <button className="py-4 px-4 bg-gray-200 rounded-lg hover:bg-gray-300">
              <FaAngleLeft className="text-black" />
            </button>
            {pages.map((page) => (
              <button
                key={page}
                className="py-3 px-5 text-black font-bold bg-gray-200 rounded-lg hover:bg-gray-300 focus:bg-black focus:text-white">
                {page}
              </button>
            ))}
            <button className="py-4 px-4 bg-gray-200 rounded-lg hover:bg-gray-300">
              <FaAngleRight className="text-black" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:hidden border border-gray-300 text-xl rounded p-4 gap-3 flex-2 md:block">
          <h2 className="text-4xl font-bold capitalize">
            full-stack developer
          </h2>
          <p className="space-x-1">
            <span className="text-gray-500">Avanade</span>
            <i className="fa-solid fa-circle text-[4px] align-middle p-2"></i>
            <span className="text-2xl font-semibold">3.8</span>
            <i className="fa-solid fa-star text-xl"></i>
          </p>
          <p className="text-gray-500">
            700 9th Avenue SW, Calgary, AB T2P 3V4
          </p>
          <p className="font-semibold">Full Time</p>
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
                  Full time
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Location</h2>
            <div className="flex items-center gap-8">
              <i className="fa-solid fa-location-dot"></i>
              <p className="text-gray-500">
                700 9th Avenue SW, Calgary, AB T2P 3V4
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Full job description</h2>
            <p className="text-gray-500 text-justify">
              We are looking for the right people — people who want to innovate,
              achieve, grow and lead. We attract and retain the best talent by
              investing in our employees and empowering them to develop
              themselves and their careers. Experience the challenges, rewards
              and opportunity of working for one of the world’s largest
              providers of products and services to the global energy industry.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
