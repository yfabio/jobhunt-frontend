import { useEffect, useState } from "react";

import Input from "../components/Input";
import PostJobInput from "../model/business/PostJobInput";
import TextArea from "../components/TextArea";
import useValidate from "../hooks/useValidate";
import Modal from "../components/Modal";

import { useJobsCtx } from "../context/JobsContext";
import { useNavigate, useParams } from "react-router";
import ButtonsAction from "../components/ButtonsAction";

const PostJob = () => {
  const [step, setStep] = useState(1);
  const [state, dispatch, formData] = useValidate(PostJobInput);
  const [show, setShow] = useState(false);

  const { addNewJob, getJobById } = useJobsCtx();

  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      const job = getJobById(params.id);
      console.log(job);
      dispatch({ type: "UPDATE", job });
    }
  }, [params.id]);

  const totalSteps = 5;

  const handleChange = (e) => {
    dispatch({ type: "CHANGE", name: [e.target.name], value: e.target.value });
  };

  const handleTouch = (e) => {
    dispatch({ type: "TOUCH", name: e.target.name, touched: true });
  };

  const clear = () => {
    dispatch({ type: "CLEAR" });
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (step === 5) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [step]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewJob(formData);
    navigate("../jobs");
    clear();
  };

  return (
    <>
      {show && (
        <Modal
          title={"Summary job"}
          close={() => setShow(false)}>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 w-4xl">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-center">
                Review Your Job Post
              </h3>
              <div className="space-y-2 text-gray-700">
                {Object.entries(formData).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between border-b pb-1 text-sm">
                    <span className="capitalize font-medium">
                      {key.replace(/([A-Z])/g, " $1")}
                    </span>
                    <span className="text-right text-gray-600">
                      {value || "—"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <ButtonsAction
              btnLeft="No"
              btnRight="Yes"
              onCancel={() => setShow(false)}
            />
          </form>
        </Modal>
      )}
      <section className="w-full rounded p-6 border-[1px] border-gray-200">
        <h1 className="text-2xl font-bold my-20">Post a New Job</h1>
        <div className="mb-8">
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(step / totalSteps) * 100}%` }}></div>
          </div>
          <p className="text-sm text-gray-500 text-center mt-2">
            Step {step} of {totalSteps}
          </p>
        </div>
        <form>
          <div className="transition-all duration-500 ease-in-out">
            {step === 1 && (
              <div className="space-y-4 ">
                <Input
                  label="Company Name"
                  id="company"
                  value={state.company.value}
                  onChange={handleChange}
                  onBlur={handleTouch}
                  placeholder="e.g. TechNova Inc."
                  isValid={state.company.touched && !state.company.isValid}
                  message="Company name is required"
                />
                <Input
                  id="title"
                  label="Job Title"
                  value={state.title.value}
                  onChange={handleChange}
                  onBlur={handleTouch}
                  placeholder="e.g. Frontend Developer"
                  isValid={state.title.touched && !state.title.isValid}
                  message="Title is required"
                />
                <Input
                  id="location"
                  label="Location"
                  value={state.location.value}
                  onChange={handleChange}
                  onBlur={handleTouch}
                  placeholder="e.g. Halifax, NS"
                  isValid={state.location.touched && !state.location.isValid}
                  message="Location is required"
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 ">
                <Input
                  id="salary"
                  label="Salary"
                  type="number"
                  value={state.salary.value}
                  onChange={handleChange}
                  onBlur={handleTouch}
                  placeholder="e.g. $60,000 / year"
                  isValid={state.salary.touched && !state.salary.isValid}
                  message="Salary is required"
                />
                <Input
                  id="hoursPerWeek"
                  type="number"
                  label="Hours per Week"
                  value={state.hoursPerWeek.value}
                  onChange={handleChange}
                  placeholder="e.g. 40"
                  isValid={
                    state.hoursPerWeek.touched && !state.hoursPerWeek.isValid
                  }
                  message="Hours Per Week is required"
                />
                <div>
                  <label
                    htmlFor="jobType"
                    className="block mb-2 font-medium">
                    Job Type
                  </label>
                  <select
                    id="jobType"
                    name="jobType"
                    value={state.jobType.value || "full-time"}
                    onChange={handleChange}
                    onBlur={handleTouch}
                    className="block w-full pl-4 py-2 border outline-none  rounded transition-colors duration-200">
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 ">
                <TextArea
                  id="description"
                  label="Description"
                  value={state.description.value}
                  onChange={handleChange}
                  onBlur={handleTouch}
                  placeholder="Describe the job role..."
                  isValid={
                    state.description.touched && !state.description.isValid
                  }
                  message="description is required"
                />
                <TextArea
                  label="Responsibilities"
                  id="responsibilities"
                  value={state.responsibilities.value}
                  onChange={handleChange}
                  onBlur={handleTouch}
                  placeholder="List main responsibilities..."
                  isValid={
                    state.responsibilities.touched &&
                    !state.responsibilities.isValid
                  }
                  message="responsibilities is required"
                />
                <TextArea
                  label="Requirements"
                  id="requirements"
                  value={state.requirements.value}
                  onChange={handleChange}
                  onBlur={handleTouch}
                  placeholder="List qualifications..."
                  isValid={
                    state.requirements.touched && !state.requirements.isValid
                  }
                  message="requirements is required"
                />
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4 ">
                <Input
                  label="Contact Email"
                  type="email"
                  id="contactEmail"
                  value={state.contactEmail.value}
                  onChange={handleChange}
                  onBlur={handleTouch}
                  placeholder="e.g. hr@technova.com"
                  isValid={
                    state.contactEmail.touched && !state.contactEmail.isValid
                  }
                  message="Contact email is required"
                />
              </div>
            )}

            {/* {step === 5 && (
              
            )} */}

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 pt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">
                  Back
                </button>
              )}

              {step < totalSteps && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  Next
                </button>
              )}
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default PostJob;
