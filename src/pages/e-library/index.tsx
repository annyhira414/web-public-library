import React, { FC, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs, Page as ReactPdfPage } from "react-pdf";
import { BsZoomIn, BsZoomOut } from "react-icons/bs";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = () => {
  const [numPages, setNumPages] = useState();
  const [page, setPage] = useState(1);
  function onDocumentLoadSuccess({ numPages: nextNumPages }: any) {

    setNumPages(nextNumPages);
  }

  const width = 400;
  const height = 300;

  const Page = React.forwardRef(({ pageNumber }: any, ref: any) => {
    const [innerZoom, setInnerzoom] = useState(1.5);
    return (
      <div
        ref={ref}
        className="page-content overflow-auto shadow-lg border border-gray-700"
      >
        <div className="flex justify-center">
          <div>
            <div className="mr-5">
              <button
                className="text-xl"
                style={{ zIndex: 1000, position: "absolute", top: 0 }}
                onClick={() => setInnerzoom(innerZoom + 0.5)}
              >
                <BsZoomIn />
              </button>
            </div>
            <div className="ml-8">
              {innerZoom == 1 ? (
                <button
                  className="text-xl cursor-not-allowed"
                  style={{ zIndex: 1000, position: "absolute", top: 0 }}
                  onClick={() => setInnerzoom(innerZoom - 0.5)}
                  disabled
                >
                  <BsZoomOut />
                </button>
              ) : (
                <button
                  className="text-xl"
                  style={{ zIndex: 1000, position: "absolute", top: 0 }}
                  onClick={() => setInnerzoom(innerZoom - 0.5)}
                >
                  <BsZoomOut />
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="page-text ">
          <ReactPdfPage pageNumber={pageNumber} width={575} scale={innerZoom} />
        </div>
      </div>
    );
  });

  Page.displayName = "MyComponent";

  const book = useRef(null);
  return (
    <div className="pb-12 w-full mx-auto border border-green-600 flex justify-center">
      {/* <button onClick={() => setZoom(zoom + 0.5)}>zoom</button> */}
    </div>
  );
};

export default PDFViewer;
