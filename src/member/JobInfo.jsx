import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import { FaBriefcase, FaLocationDot } from "react-icons/fa6";
import { useFetch } from "../hooks/useFetch";

import { useJobsCtx } from "../context/JobsContext";
import { useAuthCtx } from "../context/AuthContext";

import Modal from "../components/Modal";
import ButtonsAction from "../components/ButtonsAction";
import { toast } from "react-toastify";

const JobInfo = () => {
  const [job, setJob] = useState({});
  const [isJobAlreadyApplied, setIsJobAlreadyApplied] = useState(false);
  const [modal, setModal] = useState({ open: false, job: {} });

  const [send] = useFetch();

  const { user } = useAuthCtx();

  const params = useParams();

  let imageStyle;

  if (job.business?.logoPath) {
    imageStyle = {
      backgroundImage: `url("http://localhost:8000/${job.business.logoPath}")`,
    };
  } else {
    imageStyle = {};
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await send(`/api/api/v1/members/apply/${job._id}`, "PATCH");
      toast.success("Job applied successfully!");
      setModal({ open: false, job: {} });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const loadJob = async () => {
      try {
        let data = await send(`/api/api/v1/jobs/${params.id}`);
        setJob(data);

        if (user.token && params.id) {
          data = await send(`/api/api/v1/members/apply/${params.id}`);
          setIsJobAlreadyApplied(data);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    loadJob();
  }, [params.id]);

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
      {job ? (
        <section className="hidden flex-2 md:block">
          <div className="flex flex-col border border-gray-300 rounded p-4 gap-2 flex-2">
            <h2 className="text-4xl font-bold capitalize">{job.title}</h2>
            {user.role === "member" && !isJobAlreadyApplied && (
              <button
                onClick={() => setModal({ open: true, job })}
                type="button"
                className="w-20 bg-rose-500 text-white py-1 px-6 rounded border text-sm font-semibold transition-all duration-300 hover:bg-rose-600">
                Apply
              </button>
            )}
            {user.role === "member" && isJobAlreadyApplied && (
              <p className="text-lg font-semibold text-rose-500 underline mt-2">
                Applied
              </p>
            )}
            <p></p>
            <span
              className="w-20 h-20 rounded-full bg-contain bg-no-repeat bg-center"
              style={imageStyle}></span>
            <span className="text-gray-500">{job.company}</span>
            <p className="text-gray-500">{job.address}</p>
            <p className="font-semibold">{job.jobType}</p>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold">Job Detail</h2>
              <div className="flex items-center gap-8">
                <FaBriefcase />
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
                <FaLocationDot />
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
        </section>
      ) : (
        <Navigate to="*" />
      )}
    </>
  );
};

export default JobInfo;
