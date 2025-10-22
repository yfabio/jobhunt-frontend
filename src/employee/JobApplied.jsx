const JobApplied = ({ job }) => {
  return (
    <>
      <div className="p-4 w-full hover:rounded hover:bg-gray-100">
        <div className="flex items-center gap-2">
          {/* Company Logo */}
          <h2 className="text-slate-600">{job.companyName}</h2>
        </div>
        <p className="font-semibold text-lg">{job.title}</p>
        <p className="text-sm font-light">{job.location}</p>
        <p>{job.salary.toString().substring(0, 2)}K</p>
      </div>
    </>
  );
};

export default JobApplied;
