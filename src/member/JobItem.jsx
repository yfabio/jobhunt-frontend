import { useState } from "react";
import { Link } from "react-router";

import { FaBriefcase, FaLocationDot, FaChevronDown } from "react-icons/fa6";
import { useAuthCtx } from "../context/AuthContext";

import Modal from "../components/Modal";
import ButtonsAction from "../components/ButtonsAction";
import { toast } from "react-toastify";

const JobItem = ({ job, accordion, setAccordion }) => {
  const [modal, setModal] = useState({ open: false, job: {} });
  const [isJobAlreadyApplied, setIsJobAlreadyApplied] = useState(false);
  const { user } = useAuthCtx();

  const handleSubmit = (e) => {
    e.preventDefault();
    setModal(false);
  };

  useState(() => {
    const getIsJobAlreadyApplied = async () => {
      try {
        if (user.token && job._id) {
          const res = await fetch(`/api/api/v1/members/apply/${job._id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          });

          if (res.ok) {
            const { data } = await res.json();
            setIsJobAlreadyApplied(data);
          } else {
            const { message } = await res.json();
            toast.error(message);
          }
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    if (user.token) {
      getIsJobAlreadyApplied();
    }
  }, []);

  return (
    <>
      {modal.open && (
        <Modal
          title={"Job confirmation"}
          close={() => setModal({ open: false, job: {} })}>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-center text-rose-500">
                Are you sure, you want to apply for this job?
              </p>
              <div className="border-[1px] border-gray-100 p-6 rounded">
                <h2 className="font-bold text-lg">{modal.job.title}</h2>
                <span className="text-gray-500">{modal.job.company}</span>
                <p className="text-gray-500">{modal.job.location}</p>
                <p className="font-semibold">{modal.job.jobType}</p>
                <p className="text-gray-500">{modal.job.address}</p>
              </div>
              <ButtonsAction
                onCancel={() => setModal({ open: false, job: {} })}
                btnLeft="No"
                btnRight="Yes"
              />
            </div>
          </form>
        </Modal>
      )}
      <Link
        to={`${job._id}`}
        className="max-w-xl w-full rounded-xl p-4 border cursor-pointer hover:shadow-xl">
        <h2 className="text-2xl font-extrabold">{job.title}</h2>

        {/* 
          This piece of jsx is for mobile and small devices 
      */}
        {user.role === "member" && !isJobAlreadyApplied && (
          <button
            onClick={() => setModal({ open: true, job })}
            type="button"
            className="md:hidden w-20 bg-rose-500 text-white py-1 px-6 rounded border text-sm font-semibold transition-all duration-300 hover:bg-rose-600 ">
            Apply
          </button>
        )}
        {user.role === "member" && isJobAlreadyApplied && (
          <p className="md:hidden text-lg font-semibold text-rose-500 underline mt-2">
            Applied
          </p>
        )}
        <p className="font-medium text-gray-500">{job.company}</p>
        <p className="font-medium text-gray-500">{job.location}</p>
        <button
          onClick={() =>
            setAccordion((prev) => ({ open: !prev.open, id: job._id }))
          }
          type="button"
          className="md:hidden rounded-sm w-full px-4 py-3 flex justify-between items-center bg-gray-50 hover:bg-gray-100 ">
          <span className="font-medium text-left">Show Job Detail</span>
          <FaChevronDown
            className={`w-5 h-5 transition-transform duration-300 ${
              accordion.open && accordion.id === job._id ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* 
          This piece of jsx is for mobile and small devices 
      */}
        {accordion.open && accordion.id === job._id && (
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
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold">Job Detail</h2>
              <div className="flex items-center gap-8">
                <FaBriefcase size={16} />
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
                <FaLocationDot size={16} />
                <p className="text-gray-500">{job.location}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold">Full job description</h2>
              <p className="text-gray-500 text-justify">{job.description}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold">Full job responsibilities</h2>
              <p className="text-gray-500 text-justify">
                {job.responsibilities}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold">Full job requirements </h2>
              <p className="text-gray-500 text-justify">{job.requirements}</p>
            </div>
          </div>
        )}
      </Link>
    </>
  );
};

export default JobItem;
