import React, {FC, useEffect, useState} from "react";
import {Button} from "antd";
import {
  commaRemover,
  currencyFormatter,
  localeString,
} from "@/lib/helpers/utils";
import Cookies from "js-cookie";
import {AiOutlineArrowLeft} from "react-icons/ai";
import {getData} from "@/lib/services";
import {IHistory, IMemorandumDetailsData} from "@/lib/model/publisher/index";
import {useMediaQuery} from "usehooks-ts";
import dayjs from "dayjs";
import {PreviousMemorandumTable} from "@/components/publisher-panel";

interface IMemorandumDetails {
  id?: number;
  setIsDetailsOpen: (status: boolean) => void;
  history: IHistory | undefined;
}

const handlePrint = () => {
  window.print();
};

const MemorandumDetails: FC<IMemorandumDetails> = ({
  id,
  setIsDetailsOpen,
  history,
}) => {
  const language: string | undefined = Cookies.get("language");

  const [MemorandumDetailsData, setMemorandumDetailsData] =
    useState<IMemorandumDetailsData>();

  const getMemorandamDetails = async () => {
    const res = await getData(
      `public_library/memorandum_publishers/${id}`,
      {},
      language,
      Cookies.get("token")
    );

    if (res?.success) {
      setMemorandumDetailsData(res?.data);
    }
  };

  useEffect(() => {
    getMemorandamDetails();
  }, [id]);

  const width = useMediaQuery("(min-width: 768px)");

  const fineTenderSession = history?.memorandum?.tender_session;
  const fineArray: string[] = fineTenderSession?.split("-") || [];

  return (
    <>
      <div className="">
        <div className="md:pt-12 pt-0 ">
          <div
            onClick={() => {
              setIsDetailsOpen(false);
            }}
            className=" pb-4 pt-2 cursor-pointer flex items-center gap-2"
          >
            <AiOutlineArrowLeft />
            {localeString(language, "back")}
          </div>
          {width ? (
            <>
              <div className="pt-4">
                <div className="border-2 border-library-tertiary py-2 px-4  rounded-lg  ">
                  <div className="flex justify-between">
                    <div>
                      <div className="sub-title">
                        {localeString(language, "yearpublisher")}:
                        {fineArray?.map((value, index) => (
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
                      <div className="pt-2 sub-title">
                        {localeString(language, "memorandumNo")}:
                        <span className="pl-2">
                          {history?.memorandum?.memorandum_no}
                        </span>
                      </div>
                    </div>

                    <div className="bookButton pt-2 ">
                      <Button className="button-primary" onClick={handlePrint}>
                        {localeString(language, "print")}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="pb-8">
                <div className="bg-white p-4 rounded-lg">
                  <div className="pt-2 ">
                    <div className="sub-title">
                      {localeString(language, "yearpublisher")}:
                      {fineArray?.map((value, index) => (
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
                    <div className="pt-2 sub-title">
                      {localeString(language, "memorandumNo")}:
                      <span className="pl-2">
                        {history?.memorandum?.memorandum_no}
                      </span>
                    </div>
                  </div>

                  {/* <div className="py-4 md:pt-0 w-full bookButton">
                    <Button onClick={handlePrint} className="px-12 button-primary w-full rounded-lg ">
                      {localeString(language, "print")}
                    </Button>
                  </div> */}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="pt-4">
          <PreviousMemorandumTable
            MemorandumDetailsData={MemorandumDetailsData}
          />
        </div>
      </div>
    </>
  );
};
export default MemorandumDetails;
