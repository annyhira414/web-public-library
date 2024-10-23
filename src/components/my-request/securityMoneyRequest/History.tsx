import React, {FC, useState} from "react";
import {
  commaRemover,
  currencyFormatter,
  humanize,
  localeString,
} from "@/lib/helpers/utils";
import {AiFillCaretDown, AiFillCaretUp} from "react-icons/ai";
import Link from "next/link";
import {BiArrowBack} from "react-icons/bi";
import {
  ISecurityHistorylistData,
  ISecurityHistoryItem,
} from "../../../lib/model/myRequest/index";
import {DataNotFound} from "../../../components/common/DataNotFound";
import moment from "moment";

interface IHistory {
  language: string | undefined;
  listData: ISecurityHistorylistData[];
}

export const History: FC<IHistory> = ({listData, language}) => {
  const [showMoreAccepted, setShowMoreAccepted] = useState(false);

  const handleShowMoreAccepted = () => {
    setShowMoreAccepted(true);
  };

  const handleShowLessAccepted = () => {
    setShowMoreAccepted(false);
  };
  return (
    <>
      <div className="pl-content-container pb-12">
        <>
          <div className="pt-14">
            <>
              <Link href={"/my-request/security-money-request"}>
                <div className="flex justify-start">
                  <div className="mt-2 text-xl">
                    <BiArrowBack />
                  </div>
                  <button className="pl-2 pt-1 text-lg ">
                    {localeString(language, "back")}
                  </button>
                </div>
              </Link>
            </>

            <div className="pt-8">
              <h3 className="section-title">
                {localeString(language, "securityMoneyRequest")}
              </h3>
            </div>
          </div>
        </>
        {listData?.length > 0 ? (
          <>
            {listData?.map((item: ISecurityHistoryItem, index: number) => (
              <div key={index}>
                <div className="pt-8">
                  <div className="py-8  bg-white px-8 rounded-lg">
                    <div className="flex justify-between pb-2">
                      <div>{localeString(language, "status")}</div>

                      <>
                        {item?.status === "pending" ? (
                          <div className="status-text bg-pending-color p-2 ">
                            {item?.status}
                          </div>
                        ) : item?.status === "accepted" ? (
                          <div className="status-text bg-accepted-bg p-2 ">
                            {item?.status}
                          </div>
                        ) : item?.status === "cancelled" ? (
                          <div className="status-text bg-canceld-color p-2 ">
                            {item?.status}
                          </div>
                        ) : item?.status === "rejected" ? (
                          <div className="status-text bg-canceld-color p-2 ">
                            {item?.status}
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    </div>
                    <hr className="status-hr-color" />
                    <div className="flex justify-between py-2">
                      <div>{localeString(language, "date")}</div>

                      <span className="">
                        {item?.created_at ? (
                          <>
                            {currencyFormatter(
                              language,
                              parseInt(moment(item?.created_at)?.format("D"))
                            )}{" "}
                            {localeString(
                              language,
                              `${moment(item?.created_at).format("MMMM")}`
                            )}{" "}
                            {commaRemover(
                              currencyFormatter(
                                language,
                                parseInt(
                                  moment(item?.created_at)?.format(`YYYY`)
                                )
                              )
                            )}
                          </>
                        ) : (
                          "..."
                        )}
                      </span>
                    </div>
                    <hr className="status-hr-color" />
                    {!showMoreAccepted && (
                      <div>
                        <div className="flex justify-center section-sub-title-light pt-4 ">
                          <button
                            className="flex justify-between "
                            onClick={handleShowMoreAccepted}
                          >
                            {localeString(language, "seeDetails")}
                            <div className="items-center pl-1 pt-1">
                              <AiFillCaretDown />
                            </div>
                          </button>
                        </div>
                      </div>
                    )}

                    {showMoreAccepted && (
                      <>
                        <>
                          <div className="flex justify-between py-2">
                            <div> {localeString(language, "phone")}</div>
                            <div>{item?.user?.phone}</div>
                          </div>
                          <hr className="status-hr-color" />
                          <div className="flex justify-between py-2">
                            <div>{localeString(language, "fineAmount")}</div>
                            <div>{item?.amount}</div>
                          </div>
                          <hr className="status-hr-color" />
                          <div className="flex justify-between py-2">
                            <div>{localeString(language, "paymentMethod")}</div>
                            <div>{humanize(item?.payment_method)}</div>
                          </div>
                          <hr className="status-hr-color" />
                        </>
                        <div className="flex justify-center section-sub-title-light pt-4  ">
                          <button onClick={handleShowLessAccepted}>
                            {localeString(language, "seeLess")}
                          </button>
                          <div className="flex justify-center items-center pl-1">
                            <AiFillCaretUp />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="py-12">
            <DataNotFound title={localeString(language, "noData")} />
          </div>
        )}
      </div>
    </>
  );
};
