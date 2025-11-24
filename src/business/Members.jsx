import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";

import { Document, Page, pdfjs } from "react-pdf";

import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

import Modal from "../components/Modal";
import Member from "./Member";
import Spinner from "../components/Spinner";

import { useAuthCtx } from "../context/AuthContext";
import { toast } from "react-toastify";

const Members = () => {
  const [loading, setLoading] = useState(false);
  const [pdfData, setPdfData] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    currentPage: 1,
    members: [],
  });

  const { user } = useAuthCtx();

  const loadCandidates = async (page = 1) => {
    try {
      try {
        const res = await fetch(`/api/api/v1/businesses/members?page=${page}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (res.ok) {
          const { data } = await res.json();
          setPagination(data);
        } else {
          const { message } = await res.json();
          toast.error(message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user.token) {
      loadCandidates();
    }
  }, []);

  const handlePageChange = (page) => {
    loadCandidates(page);
  };

  const handleResumeDownload = async (id) => {
    try {
      const res = await fetch(`/api/api/v1/businesses/resume/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        //window.open(url, "_blank");
        const link = document.createElement("a");
        link.href = url;
        link.download = "resume.pdf";
        link.click();
      } else {
        const { message } = await res.json();
        toast.error(message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePreview = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/api/v1/businesses/resume/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (res.ok) {
        const blob = await res.blob();
        const fileReader = new FileReader();
        fileReader.onload = () => {
          setPdfData(new Uint8Array(fileReader.result));
        };
        fileReader.readAsArrayBuffer(blob);
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

  const handleCloseModal = () => {
    setPdfData(null);
  };

  const handleErrorPreview = (error) => {
    setPdfData(null);
    toast.error("Error downloading file");
  };

  return (
    <>
      {loading && <Spinner />}
      {pdfData && (
        <Modal
          close={handleCloseModal}
          title={"Previvew Resume"}>
          <Document
            file={{ data: pdfData }}
            onLoadError={handleErrorPreview}
            loading={<Spinner />}>
            <Page
              pageNumber={1}
              scale={1.5}
            />
          </Document>
        </Modal>
      )}
      <section className="w-full rounded p-6 border-[1px] border-gray-200">
        <h1 className="text-2xl font-bold my-20">Candidates</h1>
        {pagination.members.length > 0 ? (
          <>
            <div className="flex flex-col gap-2">
              {pagination.members.map((member, idx) => (
                <Member
                  key={idx}
                  member={member}
                  handlePreview={handlePreview}
                  handleResumeDownload={handleResumeDownload}
                />
              ))}
            </div>
            <Pagination
              pageChange={handlePageChange}
              totalPages={pagination.totalPages}
            />
          </>
        ) : (
          <p className="w-full text-center font-semibold text-lg text-sky-600">
            You have no candidates yet!
          </p>
        )}
      </section>
    </>
  );
};

export default Members;
