import { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";

import Modal from "../components/Modal";
import ButtonsAction from "../components/ButtonsAction";

const JobApplied = ({ job }) => {
  const [show, setShow] = useState(false);

  const handleSubmit = (e, id) => {
    e.preventDefault();
    console.log("id that will be removed", id);
    setShow(false);
  };

  return (
    <>
      {show && (
        <Modal
          title={"Remove applied Job"}
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
        <div className="flex items-center gap-2">
          {/* Company Logo */}
          <h2 className="text-slate-600">{job.company}</h2>
        </div>
        <p className="font-semibold text-lg">{job.title}</p>
        <p className="text-sm font-light">{job.location}</p>
        <p>{job.salary.toString().substring(0, 2)}K</p>
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

export default JobApplied;
