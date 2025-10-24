import { useState, useRef } from "react";
import { FaPen, FaUpload } from "react-icons/fa";

import useValidate from "../hooks/useValidate";
import ProfileInputs from "../model/ProfileInput";
import ButtonsAction from "../components/ButtonsAction";
import PdfViewer from "../components/PDFViewer";
import MessageBoxError from "../components/MessageBoxError";
import MessageError from "../components/MessageError";
import Modal from "../components/Modal";

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const [file, setFile] = useState(null);
  const [tooBigFileError, setTooBigFileError] = useState(false);
  const [state, dispatch, formData] = useValidate(ProfileInputs);

  const filePickerRef = useRef();

  const MAX_FILE_SIZE_MB = 2;

  const submitHandler = (e) => {
    e.preventDefault();

    if (state.isFormValid) {
      console.log(formData);
    }
    setEdit(false);
  };

  const handleChange = (e) => {
    dispatch({ type: "CHANGE", name: e.target.name, value: e.target.value });
  };

  const handleTouch = (e) => {
    dispatch({ type: "TOUCH", name: e.target.name, touched: true });
  };

  const handleCancel = () => {
    setEdit(false);
  };

  const handleFilePicker = () => {
    filePickerRef.current.click();
  };

  const handleFile = (e) => {
    if (e.target.files && e.target.files.length === 1) {
      const file = e.target.files[0];

      if (file && file.type === "application/pdf") {
        const fileSizeMB = file.size / 1024 / 1024;
        if (fileSizeMB > MAX_FILE_SIZE_MB) {
          setTooBigFileError(true);
        } else {
          setFile(file);
        }
      }
    }
  };

  return (
    <>
      {file && (
        <PdfViewer
          file={file}
          reset={() => setFile(null)}
        />
      )}
      <section className="rounded p-6 border-[1px] border-gray-200">
        <h1 className="text-2xl font-bold my-20">Profile</h1>
        <div className="flex items-center gap-4">
          <h2 className="font-semibold text-2xl text-slate-600">
            My information
          </h2>
          {!edit && (
            <button
              onClick={() => setEdit(true)}
              className="group p-2 cursor-pointer hover:bg-indigo-600 rounded-full">
              <FaPen
                size={16}
                className="group-hover:text-white"
              />
            </button>
          )}
        </div>
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-2 mt-4">
          <div>
            <label
              htmlFor="empStatus"
              className="text-sm">
              Employment Status
            </label>
            {edit && (
              <select
                id="empStatus"
                name="empStatus"
                value={state.empStatus.value}
                onChange={handleChange}
                onBlur={handleTouch}
                className="block w-full py-2">
                <option value="employed">Employed</option>
                <option value="not_employed">Not Employed</option>
              </select>
            )}
            {!edit && <p className="text-lg">Employed</p>}
          </div>
          <div>
            <label
              htmlFor="firstName"
              className="text-sm">
              First Name
            </label>
            {edit && (
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={state.firstName.value}
                onChange={handleChange}
                onBlur={handleTouch}
                placeholder="First Name"
                className={`block w-full pl-4 py-2 border outline-none  rounded transition-colors duration-200
              ${
                state.firstName.touched && !state.firstName.isValid
                  ? "border-red-500 bg-red-100 placeholder:text-red-600"
                  : ""
              }`}
              />
            )}
            {!edit && <p className="text-lg">Fabio</p>}
            {edit && state.firstName.touched && !state.firstName.isValid && (
              <span className="text-red-500 text-sm">
                First name is required
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="text-sm">
              Last Name
            </label>
            {edit && (
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={state.lastName.value}
                onChange={handleChange}
                onBlur={handleTouch}
                placeholder="Last Name"
                className={`block w-full pl-4 py-2 border outline-none  rounded transition-colors duration-200 
                ${
                  state.lastName.touched && !state.lastName.isValid
                    ? "border-red-500 bg-red-100 placeholder:text-red-600"
                    : ""
                }`}
              />
            )}
            {!edit && <p className="text-lg">Yamshita</p>}
            {edit && state.lastName.touched && !state.lastName.isValid && (
              <span className="text-red-500 text-sm">
                Last name is required
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="jobTitle"
              className="text-sm">
              Job Title
            </label>
            {edit && (
              <input
                type="text"
                name="jobTitle"
                id="jobTitle"
                value={state.jobTitle.value}
                onChange={handleChange}
                onBlur={handleTouch}
                placeholder="Job Title"
                className={`block w-full pl-4 py-2 border outline-none  rounded transition-colors duration-200 
                ${
                  state.jobTitle.touched && !state.jobTitle.isValid
                    ? "border-red-500 bg-red-100 placeholder:text-red-600"
                    : ""
                }`}
              />
            )}
            {!edit && <p className="text-lg">Software Developer</p>}
            {edit && state.jobTitle.touched && !state.jobTitle.isValid && (
              <span className="text-red-500 text-sm">
                Job title is required
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="location"
              className="text-sm">
              Location
            </label>
            {edit && (
              <input
                type="text"
                name="location"
                id="location"
                value={state.location.value}
                onChange={handleChange}
                onBlur={handleTouch}
                placeholder="Location"
                className={`block w-full pl-4 py-2 border outline-none  rounded transition-colors duration-200 
                  ${
                    state.location.touched && !state.location.isValid
                      ? "border-red-500 bg-red-100 placeholder:text-red-600"
                      : ""
                  }`}
              />
            )}
            {!edit && <p className="text-lg">Sao Paulo, SP Brazil</p>}
            {edit && state.location.touched && !state.location.isValid && (
              <span className="text-red-500 text-sm">Location is required</span>
            )}
          </div>

          <div>
            <label
              htmlFor="employer"
              className="text-sm">
              Employer
            </label>
            {edit && (
              <input
                type="text"
                name="employer"
                id="employer"
                value={state.employer.value}
                onChange={handleChange}
                onBlur={handleTouch}
                placeholder="Employer"
                className={`block w-full pl-4 py-2 border outline-none  rounded transition-colors duration-200 
                  ${
                    state.employer.touched && !state.employer.isValid
                      ? "border-red-500 bg-red-100 placeholder:text-red-600"
                      : ""
                  }`}
              />
            )}
            {!edit && <p className="text-lg">Tata Consultancy Services</p>}
            {edit && state.employer.touched && !state.employer.isValid && (
              <span className="text-red-500 text-sm">
                Employer name is required
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="primaryIndustry"
              className="text-sm">
              Primary industry
            </label>
            {edit && (
              <select
                id="primaryIndustry"
                name="primaryIndustry"
                value={state.primaryIndustry.value}
                onChange={handleChange}
                className="block w-full py-2">
                <option value="tech">Tech</option>
                <option value="consulting">Consulting</option>
                <option value="accounting">Accounting</option>
                <option value="finance">Finance</option>
                <option value="advertising">Advertising</option>
                <option value="human_resources">Human Resources</option>
              </select>
            )}
            {!edit && <p className="text-lg">Consulting</p>}
          </div>

          {edit && (
            <ButtonsAction
              disabled={!state.isFormValid}
              onCancel={handleCancel}
            />
          )}
        </form>
        <div className="flex flex-col gap-4 mt-6">
          <h2 className="font-semibold text-2xl text-slate-600">CV</h2>
          <div
            onClick={handleFilePicker}
            className="flex py-4 px-4 gap-2 cursor-pointer rounded border border-dotted">
            <FaUpload size={22} />
            <div>
              <h3 className="text-xl">Upload CV</h3>
              <p className="text-sm">Use a pdf file only</p>
            </div>
            <input
              id="cv"
              type="file"
              name="cv"
              className="hidden"
              accept=".pdf"
              ref={filePickerRef}
              onChange={handleFile}
            />
          </div>
          {tooBigFileError && (
            <Modal close={() => setTooBigFileError(false)}>
              <MessageError>File too big, only 2MB is accepted</MessageError>
            </Modal>
          )}
        </div>
      </section>
    </>
  );
};

export default Profile;
