import { Routes, Route, useNavigate, useLocation, Outlet } from "react-router";

import FilterJobs from "../components/FilterJobs";

import JobItem from "../member/JobItem";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";

import { useJobsCtx } from "../context/JobsContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [accordion, setAccordion] = useState({ open: false, id: null });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (jobs.length > 0 && location.pathname === "/") {
      navigate(`${jobs[0]._id}`, { replace: true });
    }
  }, [jobs, location.pathname, navigate]);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const res = await fetch("/api/api/v1/jobs");
        if (res.ok) {
          const { data } = await res.json();
          setJobs(data);
        } else {
          const { message } = await res.json();
          toast.error(message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  return (
    <>
      {loading && <Spinner />}
      <section className="container mx-auto">
        {/* Filter */}
        <FilterJobs />
        <div className="flex flex-col gap-5 mt-4 md:flex-row">
          <div className="flex flex-col items-center flex-1 md:items-start gap-4">
            {jobs.map((job) => (
              <JobItem
                key={job._id}
                job={job}
                accordion={accordion}
                setAccordion={setAccordion}
              />
            ))}
            <Pagination />
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
