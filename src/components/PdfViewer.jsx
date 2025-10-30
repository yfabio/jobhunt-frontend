import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import Modal from "./Modal";
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import ButtonsAction from "./ButtonsAction";

const PdfViewer = ({ file, reset }) => {
  const [pdfData, setPdfData] = useState(null);
  const [display, setDisplay] = useState(false);

  const handleSucces = () => {};

  const handleError = (e) => {
    console.log(e);
  };

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setDisplay(true);
      setPdfData(new Uint8Array(fileReader.result));
    };
    fileReader.readAsArrayBuffer(file);
  }, [file]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("file data");
    handleClose();
  };

  const handleClose = () => {
    setDisplay(false);
    setPdfData(null);
    reset();
  };

  return (
    <>
      {display && (
        <Modal
          close={handleClose}
          title={"Resume File"}>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4">
            <Document
              file={{ data: pdfData }}
              onLoadSuccess={handleSucces}
              onLoadError={handleError}
              loading="Plase wait loading...">
              <Page
                pageNumber={1}
                scale={1.5}
                onAnimationStart={true}
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
