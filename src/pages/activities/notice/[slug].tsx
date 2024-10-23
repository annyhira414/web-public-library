import {PdfViewer} from "@/components/common";
import {
  commaRemover,
  currencyFormatter,
  localeString,
} from "@/lib/helpers/utils";
import {INotice} from "@/lib/model/activities/notice";
import {getDetails} from "@/lib/services";
import {Button} from "antd";
import Cookies from "js-cookie";
import moment from "moment";
import {GetServerSideProps} from "next";
import React, {FC} from "react";
import {BsDownload} from "react-icons/bs";

interface INoticeDetailsProps {
  NoticeDetails: INotice;
}

const NoticeDetails: FC<INoticeDetailsProps> = ({NoticeDetails}) => {
  const language = Cookies.get("language");
  return (
    <div className="content-container">
      <div className="my-10 ">
        <h1 className="section-title">Notice Details</h1>
      </div>
      <div className="bg-white p-8">
        <div className=" w-full lg:w-10/12">
          <p className="text-xs mb-2">
            {currencyFormatter(
              language,
              parseInt(moment(NoticeDetails?.published_date)?.format("D"))
            )}{" "}
            {localeString(
              language,
              `${moment(NoticeDetails?.published_date).format("MMMM")}`
            )}{" "}
            {commaRemover(
              currencyFormatter(
                language,
                parseInt(moment(NoticeDetails?.published_date)?.format(`YYYY`))
              )
            )}
          </p>
          <h2 className="text-xl font-bold">
            {NoticeDetails?.title ? NoticeDetails?.title : "No Notice Found"}
          </h2>
        </div>
        <div>
          {/* <div className=" flex-center-gap"> */}
          {NoticeDetails?.document_url && (
            <PdfViewer file={NoticeDetails?.document_url} />
          )}
          {/* </div> */}

          <div className="flex-center-gap ">
            <a
              href={NoticeDetails?.document_url}
              download
              className="hover:text-red-600"
              target="_blank"
            >
              <div className="borrowBookButton w-44 flex-center-gap cursor-pointer">
                <Button className="button-secondary flex gap-2">
                  <h1 className="pt-1">
                    {localeString(language, "qrCodeButton")}
                  </h1>
                  <span className="pt-1">
                    <BsDownload />
                  </span>
                </Button>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetails;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const session: any = await getSession(context);
  const {slug} = context?.query;
  const res = await getDetails(
    `public_library/notices/${slug}`,
    "",
    context?.req?.cookies?.["language"] || "bn"
  );

  if (res?.success) {
    return {
      props: {
        NoticeDetails: res?.data,
      },
    };
  } else {
    return {
      props: {
        NoticeDetails: {},
      },
    };
  }
};
