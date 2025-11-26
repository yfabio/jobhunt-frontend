import { useNavigate, useLocation, Outlet } from "react-router";

import FilterJobs from "../components/FilterJobs";

import JobItem from "../member/JobItem";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";

import { useEffect, useState } from "react";

import { useFetch } from "../hooks/useFetch";

const HomePage = () => {
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    currentPage: 1,
    jobs: [],
  });

  const [accordion, setAccordion] = useState({ open: false, id: null });

  const [send, loading] = useFetch();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (pagination.jobs.length > 0 && location.pathname === "/") {
      navigate(`${pagination.jobs[0]._id}`, { replace: true });
    }
  }, [pagination.jobs, location.pathname, navigate]);

  const loadJobs = async (page = 1, searched = "") => {
    const data = await send(`/api/api/v1/jobs?page=${page}&search=${searched}`);
    setPagination(data);
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handlePageChange = (page) => {
    loadJobs(page);
  };

  const handleSearchChange = (formData) => {
    loadJobs(pagination.currentPage, `${formData.search} ${formData.location}`);
  };

  const clearSearch = (clear) => {
    clear();
    loadJobs();
  };

  return (
    <>
      {loading && <Spinner />}
      <section className="container mx-auto">
        {/* Filter */}
        <FilterJobs
          handleSearchChange={handleSearchChange}
          clearSearch={clearSearch}
        />
        <div className="flex flex-col gap-5 mt-4 md:flex-row">
          <div className="flex flex-col items-center flex-1 md:items-start gap-4">
            {pagination.jobs.map((job) => (
              <JobItem
                key={job._id}
                job={job}
                accordion={accordion}
                setAccordion={setAccordion}
              />
            ))}
            <Pagination
              totalPages={pagination.totalPages}
              pageChange={handlePageChange}
            />
          </div>
          <div className="flex-2">
            <Outlet />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
