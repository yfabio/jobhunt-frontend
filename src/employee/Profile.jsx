import { useState, useReducer } from "react";

import { VALIDATOR_REQUIRE, validate } from "../util/validators";
import { FaPen } from "react-icons/fa";

const formReducer = (state, action) => {
  let input;
  switch (action.type) {
    case "CHANGE":
      let isFormValid = true;
      input = state[action.name];
      input.value = action.value;
      input.isValid = validate(action.value, input.validators);
      if (input.isValid) {
        input.touch = false;
      }
      for (const key in state) {
        if (key !== "isFormValid") {
          if (key === action.name) {
            isFormValid = isFormValid && input.isValid;
          } else {
            isFormValid = isFormValid && state[key].isValid;
          }
        }
      }
      return {
        ...state,
        [action.name]: input,
        isFormValid,
      };
    case "TOUCH":
      input = state[action.name];
      input.touch = action.touch;
      return {
        ...state,
        [action.name]: input,
      };
    default:
      return state;
  }
};

const Profile = () => {
  const [edit, setEdit] = useState(false);

  const [state, dispatch] = useReducer(formReducer, {
    empStatus: {
      value: "employed",
      isValid: true,
      validators: [VALIDATOR_REQUIRE],
    },
    firstName: {
      value: "",
      isValid: false,
      touched: false,
      validators: [VALIDATOR_REQUIRE()],
    },
    lastName: {
      value: "",
      isValid: false,
      touched: false,
      validators: [VALIDATOR_REQUIRE()],
    },
    jobTitle: {
      value: "",
      isValid: false,
      touched: false,
      validators: [VALIDATOR_REQUIRE()],
    },
    location: {
      value: "",
      isValid: false,
      touched: false,
      validators: [VALIDATOR_REQUIRE()],
    },
    primaryIndustry: {
      value: "",
      isValid: false,
      validators: [VALIDATOR_REQUIRE],
    },
    isFormValid: false,
  });

  const submitHandler = (e) => {
    e.preventDefault();

    const values = [];

    for (const key in state) {
      if (state[key].value) {
        values.push(state[key].value);
      }
    }

    console.log(values);

    setEdit(false);
  };

  const handleChange = (e) => {
    dispatch({ type: "CHANGE", name: e.target.name, value: e.target.value });
  };

  const handleTouch = (e) => {
    dispatch({ type: "TOUCH", name: e.target.name, touch: true });
  };

  return (
    <div className="rounded p-6 border-[1px] border-gray-200">
      <h1 className="text-2xl font-bold my-20">Profile</h1>
      <div className="flex items-center gap-4">
        <h2 className="font-semibold text-2xl text-gray-600">My information</h2>
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
              className="block w-full py-2"
            />
          )}
          {!edit && <p className="text-lg">Fabio</p>}
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
              placeholder="Last Name"
              className="block w-full py-2"
            />
          )}
          {!edit && <p className="text-lg">Yamshita</p>}
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
              placeholder="Job Title"
              className="block w-full py-2"
            />
          )}
          {!edit && <p className="text-lg">Software Developer</p>}
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
              placeholder="Job Title"
              className="block w-full py-2"
            />
          )}
          {!edit && <p className="text-lg">Sao Paulo, SP Brazil</p>}
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
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => setEdit(false)}
              type="button"
              className="text-slate-700 border rounded w-full py-2 hover:text-white hover:bg-indigo-600">
              Cancel
            </button>
            <button
              disabled={!state.isFormValid}
              className="bg-black text-white rounded w-full py-2 disabled:opacity-35 hover:bg-indigo-600">
              Save
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;
