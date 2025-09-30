const FilterJobs = () => {
  return (
    <div className="container mx-auto text-center">
      <div className="flex flex-col items-center justify-center max-w-4xl mx-auto rounded-xl border md:flex-row">
        <div
          tabIndex="0"
          className="flex items-center gap-2 w-full flex-1 rounded-t-xl py-2 md:rounded-xl focus-within:ring-2 focus-within:ring-indigo-600">
          <span>
            <i className="fa-solid fa-magnifying-glass text-2xl ml-4"></i>
          </span>
          <input
            className="w-full py-2.5 focus:ring-0 focus:outline-none"
            type="text"
            name="search"
            placeholder="Job title, keywords, or company"
          />
        </div>
        <div className="hidden border-1 border-gray-500 m-0 p-0 w-10 rotate-90 md:block"></div>
        <div
          tabIndex="0"
          className="flex items-center gap-2 w-full flex-1 rounded-b-xl py-2 md:rounded-xl focus-within:ring-2 focus-within:ring-indigo-600">
          <span>
            <i className="fa-solid fa-location-dot text-2xl ml-4"></i>
          </span>
          <input
            className="w-full py-2.5 focus:ring-0 focus:outline-none"
            type="text"
            name="search"
            placeholder="City, province, or remote"
          />
        </div>
        <button className="hidden md:block mx-5 py-2 px-4 bg-indigo-600 text-white font-bold rounded-2xl transition duration-500 hover:bg-indigo-900 cursor-pointer">
          Find jobs
        </button>
      </div>
      <button className="block md:hidden w-full mt-4 py-4 px-4 bg-indigo-600 text-white font-bold rounded-2xl transition duration-500 hover:bg-indigo-900 cursor-pointer">
        Find jobs
      </button>
    </div>
  );
};

export default FilterJobs;
