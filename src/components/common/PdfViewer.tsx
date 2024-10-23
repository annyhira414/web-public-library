import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

//for second pdf viewer

import { Viewer, Worker } from "@react-pdf-viewer/core";

// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
interface SinglePagePdfViewerProps {
  file: string;
}

export const PdfViewer: FC<SinglePagePdfViewerProps> = ({ file }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <div className="">
      <div className="w-full mx-auto  py-12">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.js">
          {/* <Viewer fileUrl={file} /> */}
          <Viewer
            fileUrl={file}
            // plugins={[
            //   //Register plugins
            //   defaultLayoutPluginInstance,
            // ]}
          />
        </Worker>
      </div>
    </div>
  );
};

// const [data, setData] = useState<any>();
// const router = useRouter();
// const { locale } = useRouter();
// const { id } = router.query;

// const [numPages, setNumPages] = useState(null);
// const [pageNumber] = useState(1);

// const onDocumentLoadSuccess = ({ numPages }: any) => {
//   setNumPages(numPages);
// };

// const [pages, setPages] = useState<number[]>([]);
// const [scale, setScale] = useState(2);

{
  /* <div className="flex justify-center"> */
}
{
  /* <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={450}
              className=" border border-black shadow-xl overflow-x-auto"
              scale={scale}
              hideTextLayer={false}
              // zoom={scale}
            />
          ))}
        </Document> */
}
{
  /* </div> */
}
{
  /* </div> */
}
{
  /* <div className="mb-5 flex justify-center md:justify-start">
        <div>
          <button
            className="bg-red-600 p-3 rounded-lg"
            onClick={() => setScale(scale + 1)}
          >
            zoom In +
          </button>
          {"   "}
          {scale > 1 ? (
            <button
              className="bg-green-600 p-3 rounded-lg"
              onClick={() => setScale(scale - 1)}
            >
              zoom out -
            </button>
          ) : (
            <button
              className="bg-green-200 p-3 rounded-lg"
              onClick={() => setScale(scale - 1)}
              disabled
            >
              zoom out -
            </button>
          )}
        </div>
      </div> */
}
