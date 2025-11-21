import { FaMagnifyingGlass, FaLocationDot } from "react-icons/fa6";

import FilterInput from "../model/FilterInput";
import useValidate from "../hooks/useValidate";
import { FaTimes } from "react-icons/fa";

const FilterJobs = ({ handleSearchChange, clearSearch }) => {
  const [state, dispatch, formData] = useValidate(FilterInput);

  const handleChange = (e) => {
    dispatch({ type: "CHANGE", name: e.target.name, value: e.target.value });
  };

  const handleTouch = (e) => {
    dispatch({ type: "TOUCH", name: e.target.name, touched: true });
  };

  const clear = (e) => {
    dispatch({ type: "CLEAR" });
  };

  const handleSearch = () => {
    handleSearchChange(formData);
  };

  const handleClearInputs = () => {
    clearSearch(clear);
  };

  return (
    <div className="container mx-auto text-center">
      <div className="flex flex-col items-center justify-center max-w-4xl mx-auto rounded-xl border md:flex-row">
        <div
          tabIndex="0"
          className="flex items-center gap-2 w-full flex-1 rounded-t-xl md:rounded-xl focus-within:ring-2 focus-within:ring-indigo-600">
          <span>
            <FaMagnifyingGlass className="ml-4" />
          </span>
          <input
            className="w-full py-2.5 focus:ring-0 focus:outline-none"
            type="text"
            name="search"
            value={state.search.value}
            onChange={handleChange}
            onBlur={handleTouch}
            placeholder="Job title, keywords, or company"
          />
        </div>
        <div className="hidden border-1 border-gray-500 m-0 p-0 w-10 rotate-90 md:block"></div>
        <div
          tabIndex="0"
          className="flex items-center gap-2 w-full flex-1 rounded-b-xl md:rounded-xl focus-within:ring-2 focus-within:ring-indigo-600">
          <span>
            <FaLocationDot className="ml-4" />
          </span>
          <input
            className="w-full py-2.5 focus:ring-0 focus:outline-none"
            type="text"
            name="location"
            value={state.location.value}
            onChange={handleChange}
            onBlur={handleTouch}
            placeholder="City, province, or remote"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={!state.isFormValid}
          className="hidden md:block mx-5 py-2 px-4 bg-indigo-600 text-white font-bold rounded-lg transition duration-500  cursor-pointer 
          disabled:opacity-35 disabled:cursor-not-allowed disabled:bg-gray-400 hover:bg-indigo-700">
          Find jobs
        </button>
      </div>
      {formData.isFormValid && (
        <div className="max-w-4xl mx-auto my-2">
          <button
            onClick={handleClearInputs}
            className="w-full text-start text-sky-600 ml-4 cursor-pointer hover:underline hover:text-sky-700">
            clear inputs
          </button>
        </div>
      )}
      <button
        onClick={handleSearch}
        disabled={!state.isFormValid}
        className="block md:hidden w-full mt-4 py-2 px-4 bg-indigo-600 text-white font-bold rounded-lg transition duration-500  cursor-pointer 
        disabled:opacity-35 disabled:cursor-not-allowed disabled:bg-gray-400 hover:bg-indigo-700">
        Find jobs
      </button>
    </div>
  );
};

export default FilterJobs;
