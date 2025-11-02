import { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";

import Modal from "../components/Modal";
import ButtonsAction from "../components/ButtonsAction";
import { useJobsCtx } from "../context/JobsContext";

const Job = ({ job }) => {
  const [show, setShow] = useState(false);

  const { deleteJob } = useJobsCtx();

  const handleSubmit = (e, id) => {
    e.preventDefault();
    setShow(false);
    deleteJob(id);
  };

  return (
    <>
      {show && (
        <Modal
          title={"Remove Job"}
          close={() => setShow(false)}>
          <form
            onSubmit={(e) => handleSubmit(e, job.id)}
            className="flex flex-col gap-2">
            <p className="text-center font-medium text-red-500">
              Are you sure, you want to remove this Job?
            </p>
            <ButtonsAction
              onCancel={() => setShow(false)}
              btnLeft="No"
              btnRight="Yes"
            />
          </form>
        </Modal>
      )}
      <div className="p-4 w-full hover:rounded hover:bg-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>

        <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-lg">
          {job.jobType}
        </span>

        <p className="text-gray-500 text-sm mt-2">{job.companyName}</p>

        <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
          <span>{job.location}</span>
        </div>

        <p className="text-gray-700 line-clamp-3">{job.description}</p>

        <div className="flex items-center mt-5 text-sm text-gray-600">
          <span className="font-medium text-gray-700">
            💰 ${job.salary.toLocaleString()}
          </span>
        </div>

        <div className="text-sm text-gray-500">{job.hoursPerWeek} hrs/week</div>

        <button
          onClick={() => setShow(true)}
          type="button"
          className="bg-none border-0 cursor-pointer">
          <FaTrashCan
            size={16}
            color="red"
          />
        </button>
      </div>
    </>
  );
};

export default Job;
