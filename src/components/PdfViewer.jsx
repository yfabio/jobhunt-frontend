import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import Modal from "./Modal";
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import ButtonsAction from "./ButtonsAction";
import Spinner from "./Spinner";

import { toast } from "react-toastify";
import { useAuthCtx } from "../context/AuthContext";

const PdfViewer = ({ file, reset, update }) => {
  const [pdfData, setPdfData] = useState(null);

  const { user } = useAuthCtx();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPdfData(new Uint8Array(fileReader.result));
    };
    fileReader.readAsArrayBuffer(file);
  }, [file]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const postResume = async () => {
      try {
        const formData = new FormData();
        formData.append("cv", file);
        const res = await fetch(`/api/api/v1/members/resume`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          body: formData,
        });
        if (res.ok) {
          toast.success("Profile updated successfully!");
          update();
        } else {
          const { message } = await res.json();
          toast.error(message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        handleClose();
      }
    };

    postResume();
  };

  const handleClose = () => {
    setPdfData(null);
    reset();
  };

  const handleError = (e) => {
    setPdfData(null);
    toast.error("Error downloading file");
  };

  return (
    <>
      {pdfData && (
        <Modal
          close={handleClose}
          title={"Resume File"}>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4">
            <Document
              file={{ data: pdfData }}
              onLoadError={handleError}
              loading={<Spinner />}>
              <Page
                pageNumber={1}
                scale={1.5}
              />
            </Document>
            <ButtonsAction
              disabled={false}
              onCancel={handleClose}
            />
          </form>
        </Modal>
      )}
    </>
  );
};

export default PdfViewer;
