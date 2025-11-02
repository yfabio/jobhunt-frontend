import { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";

import Modal from "../components/Modal";
import ButtonsAction from "../components/ButtonsAction";
import { useJobsCtx } from "../context/JobsContext";
import { useNavigate } from "react-router";

const Job = ({ job }) => {
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const { deleteJob } = useJobsCtx();

  const handleSubmit = (e, id) => {
    e.preventDefault();

    if (edit) {
      navigate(`../postjob/${id}`, { replace: true });
    } else {
      deleteJob(id);
    }
    setShow(false);
    setEdit(false);
  };

  const handleEdit = () => {
    setEdit(true);
    setShow(true);
  };

  return (
    <>
      {show && (
        <Modal
          title={`${edit ? "Edit Job" : "Remove Job"}`}
          close={() => setShow(false)}>
          <form
            onSubmit={(e) => handleSubmit(e, job.id)}
            className="flex flex-col gap-2">
            <p className="text-center font-medium text-red-500">
              {`Are you sure, you want to ${
                edit ? "edit" : "remove"
              } this Job?`}
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

        <p className="text-gray-500 text-sm mt-2">{job.company}</p>

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

        <div className="flex items-center justify-start space-x-2 mt-4">
          <button
            onClick={() => setShow(true)}
            type="button"
            className="group border-0 cursor-pointer py-2 px-2 rounded hover:bg-red-500">
            <FaTrashCan
              size={16}
              className="text-red-500 group-hover:text-white"
            />
          </button>
          <button
            onClick={handleEdit}
            type="button"
            className="group border-0 cursor-pointer py-2 px-2 rounded hover:bg-indigo-500">
            <FaPen
              size={16}
              className="group-hover:text-white"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default Job;
