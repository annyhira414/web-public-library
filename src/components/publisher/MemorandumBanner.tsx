import {IHistory, IMemorandumData} from "@/lib/model/publisher/index";
import {useRouter} from "next/router";
import React, {FC} from "react";
import {IoIosArrowForward} from "react-icons/io";
import {
  commaRemover,
  currencyFormatter,
  localeString,
} from "@/lib/helpers/utils";
import Cookies from "js-cookie";
import {Row, Col} from "antd";
import dayjs from "dayjs";

interface IMemorandumBanner {
  history?: IHistory;
  startIndex?: number;
  index?: number;
  language?: string;
  url?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  memorandumsData: IMemorandumData;
}

export const MemorandumBanner: FC<IMemorandumBanner> = ({
  history,
  startIndex,
  index,
  url,
  backgroundImage,
  memorandumsData,
}) => {
  const router = useRouter();
  const language: string | undefined = Cookies.get("language");
  const publisher = Cookies.get("is_publisher");

  const PublisherChecker = () => {
    const isPublisher = publisher === "true";
    isPublisher
      ? router.push("publisher-panel/active-memorandum")
      : router.push("/publisher/MemorandumNotice");
  };

  const fineTenderSession = memorandumsData?.tender_session;
  const fineArray: string[] = fineTenderSession?.split("-") || [];

  return (
    <div>
      <div>
        <Row>
          <Col xs={{span: 24}} sm={{span: 24}} lg={{span: 24}} md={{span: 24}}>
            <div
              className="py-6 rounded-lg "
              style={{
                backgroundImage: `url(${backgroundImage})`,
                width: "100%",
                height: "auto",
                maxHeight: "80vh",
              }}
            >
              <div className="lg:flex lg:justify-between md:flex md:justify-between">
                <div className="pl-6">
                  <p className="text-xs mb-2">
                    <span className="text-2xl font-bold-b text-white">
                      {localeString(language, "yearpublisher")}:
                    </span>
                    <span className="pl-1 text-2xl font-bold-b text-white">
                      {fineArray?.map((value, index) => (
                        <React.Fragment key={index}>
                          {index > 0 && <span className="pl-1">-</span>}
                          <span className="pl-2">
                            {commaRemover(
                              currencyFormatter(
                                language,
                                parseInt(dayjs(value)?.format("YYYY"))
                              )
                            )}
                          </span>
                        </React.Fragment>
                      ))}
                    </span>
                  </p>
                  <div className="text-white font-normal text-xl flex justify-start ">
                    <div className="">
                      {localeString(language, "memorandumNo")}:
                    </div>
                    <div className=" pl-2 ">
                      {memorandumsData?.memorandum_no}
                    </div>
                  </div>
                  {/* <div className="sub-text pt-2 text-white lg:w-2/3 sm:w-full md:w-4/5  ">
                    some text
                  </div> */}
                </div>
                <div
                  onClick={PublisherChecker}
                  className="cursor-pointer lg:pr-8  pt-3 sm:pt-4  md:pr-4 px-6"
                >
                  <div className="sm:w-full md:w-32 lg:w-32 p-3 rounded-md text-black bg-white flex justify-center text-center">
                    <button
                      type="submit"
                      className="text-base flex justify-between "
                    >
                      {localeString(language, "moreInfo")}
                      <IoIosArrowForward className="mt-1 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
