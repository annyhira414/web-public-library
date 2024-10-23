import {IHistory} from "@/lib/model/publisher/index";
import React, {FC} from "react";
import Cookies from "js-cookie";
import {Button, Tooltip} from "antd";
import {useMediaQuery} from "usehooks-ts";
import {
  commaRemover,
  currencyFormatter,
  localeString,
} from "@/lib/helpers/utils";
import dayjs from "dayjs";
interface IMemorandumCard {
  history?: IHistory;
  startIndex: number;
  index: number;
  language?: string;
  url: string;
  backgroundImage?: string;
  backgroundColor?: string;
}

export const PreviousMemorandumCard: FC<IMemorandumCard> = ({
  history,
  startIndex,
  index,
  url,
}) => {
  const language: string | undefined = Cookies.get("language");
  const width = useMediaQuery("(min-width: 768px)");

  const fineTenderSession = history?.memorandum?.tender_session;
  const fineArray: string[] = fineTenderSession?.split("-") || [];

  return (
    <div>
      {width ? (
        <div>
          {/* <div
          className={`shadow-xl ${backgroundImage ? "with-background" : ""}`} // Add a class conditionally
          style={{
            backgroundImage: backgroundImage
              ? `url(${backgroundImage})`
              : "none",
            backgroundSize: "cover",
            backgroundColor: backgroundColor || "white",
          }}
        > */}
          <div className="shadow-xl">
            <div className="pb-4 rounded-md shadow-inner bg-white  p-4 flex justify-between items-center border-2 border-white hover:border-2 hover:border-library-primary hover:text-library-primary transition duration-700 ease-in-out group">
              <div className="bg-library-order-sidebar-background text-white rounded-full h-8 w-8">
                <div className="flex justify-center pt-1 text-library-primary">
                  {currencyFormatter(language, startIndex + index + 1)}
                </div>
              </div>
              <div className="w-full pl-4">
                <p className="text-xs mb-3">
                  <span className="sub-section-title">
                    {localeString(language, "yearpublisher")}:
                  </span>
                  {fineArray.map((value, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && <span className="pl-2">-</span>}
                      <span className="pl-2">
                        {commaRemover(
                          currencyFormatter(
                            language,
                            parseInt(dayjs(value)?.format(`YYYY`))
                          )
                        )}
                      </span>
                    </React.Fragment>
                  ))}
                </p>
                <Tooltip>
                  <div className="hover:text-library-primary max-line-limit">
                    <span className="sub-section-title">
                      {localeString(language, "memorandumNo")}:
                    </span>
                    <span className="pl-2 sub-text">
                      {history?.memorandum?.memorandum_no}
                    </span>
                  </div>
                </Tooltip>
              </div>
              <div className="">
                <div className=" rounded-md  borrowBookButton ">
                  <div>
                    <Button className="button-secondary h-12">
                      {localeString(language, "moreInfo")}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className=" pb-8">
          <div className="bg-white p-4 rounded-lg">
            <div className="sub-text">
              <span className="section-sub-title-light">
                {localeString(language, "yearpublisher")}:
              </span>
              {fineArray.map((value, index) => (
                <React.Fragment key={index}>
                  {index > 0 && (
                    <span className="pl-2 section-sub-title-light">-</span>
                  )}
                  <span className="pl-2 section-sub-title-light">
                    {commaRemover(
                      currencyFormatter(
                        language,
                        parseInt(dayjs(value)?.format(`YYYY`))
                      )
                    )}
                  </span>
                </React.Fragment>
              ))}
            </div>
            <div className=" pt-3 ">
              <span className="section-sub-title-light">
                {localeString(language, "memorandumNo")}:
              </span>
              <span className="pl-2 sub-text">
                {history?.memorandum?.memorandum_no}
              </span>
            </div>
            <div className="py-4 md:pt-0  w-full bookButton">
              <Button className="px-12 button-primary  w-full rounded-lg">
                {localeString(language, "moreInfo")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
