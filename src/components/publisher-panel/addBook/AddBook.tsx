import {
  commaRemover,
  currencyFormatter,
  localeString,
} from "@/lib/helpers/utils";
import {IMemorandumData} from "@/lib/model/publisher";
import {Button} from "antd";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import React, {FC, useEffect} from "react";
import {useMediaQuery} from "usehooks-ts";

interface IAddBook {
  setIsFrom: (status: boolean) => void;
  memorandumsData: IMemorandumData | undefined;
  setListID: (status: any) => void;
}

export const AddBook: FC<IAddBook> = ({
  setIsFrom,
  memorandumsData,
  setListID,
}) => {
  const language: string | undefined = Cookies.get("language");

  useEffect(() => {
    setListID("");
  }, []);

  const addBookFunc = () => {
    setIsFrom(true);
  };
  const width = useMediaQuery("(min-width: 768px)");

  const memorandumNo = memorandumsData?.memorandum_no;

  const fineTenderSession = memorandumsData?.tender_session;
  const fineArray: string[] = fineTenderSession?.split("-") || [];

  return (
    <>
      <div>
        <div className="min-section-title pb-4">
          {localeString(language, "activeMemorandum")}
        </div>
        {width ? (
          <div className="pt-6 ">
            <div className="border-2 border-library-tertiary py-2 px-4  rounded-lg  ">
              <div className="flex justify-between">
                <div>
                  <div className="sub-text">
                    <span className="">
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
                  </div>
                  <div className="sub-text pt-3">
                    <div>
                      {localeString(language, "memorandumNo")}: {memorandumNo}
                    </div>
                  </div>
                </div>
                <div className="pt-4 md:pt-0 borrowBookButton">
                  <Button
                    onClick={() => {
                      addBookFunc();
                    }}
                    className="px-12 h-12 button-secondary "
                    disabled={!memorandumsData}
                  >
                    {localeString(language, "addBook")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="pb-8">
            <div className="bg-white p-4 rounded-lg">
              <div className="sub-text">
                <span>{localeString(language, "yearpublisher")}:</span>
                {fineArray.map((value, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <span className="pl-2">-</span>}
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
              </div>
              <div className="pt-3">
                <span> {localeString(language, "memorandumNo")}:</span>
                <span className="pl-2"> {memorandumNo}</span>
              </div>
              <div className="py-4 md:pt-0 w-full bookButton">
                <Button
                  onClick={() => {
                    addBookFunc();
                  }}
                  className="px-12 button-primary  w-full rounded-lg"
                  disabled={!memorandumsData}
                >
                  {localeString(language, "addBook")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
