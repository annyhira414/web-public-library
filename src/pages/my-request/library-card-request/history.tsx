import React, {FC, useState} from "react";
import {Button, Modal} from "antd";
import {
  commaRemover,
  currencyFormatter,
  localeString,
} from "@/lib/helpers/utils";
import Cookies from "js-cookie";
import {getData} from "@/lib/services";
import {ILibraryCardHistoryData} from "../../../lib/model/myRequest/index";
import Image from "next/image";
import moment from "moment";

interface ILibraryCardHistory {
  language: string | undefined;
  cardData: ILibraryCardHistoryData[];
}

const LibraryCardHistory: FC<ILibraryCardHistory> = ({cardData}) => {
  const language: string | undefined = Cookies.get("language");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [modalData, setModalData] = useState<ILibraryCardHistoryData>();

  const getModalData = async (id: number) => {
    if (cardData) {
      const res = await getData(
        `public_library/library_cards/${id}`,
        {},
        language,
        Cookies.get("token")
      );
      if (res?.success) {
        setModalData(res?.data);
        setIsModalOpen(true);
      }
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="py-12">
          {cardData?.map((item: ILibraryCardHistoryData) => (
            <div className="" key={item?.name}>
              <div className="bg-white pt-6 pl-6 rounded-lg">
                <div className="">
                  <>
                    <div className="sub-card-title pb-2">
                      {localeString(language, "issueDate")}:
                    </div>

                    <p className=" font-normal text-sm">
                      {currencyFormatter(
                        language,
                        parseInt(moment(item?.issue_date)?.format("D"))
                      )}{" "}
                      {localeString(
                        language,
                        `${moment(item?.issue_date).format("MMMM")}`
                      )}{" "}
                      {commaRemover(
                        currencyFormatter(
                          language,
                          parseInt(moment(item?.issue_date)?.format(`YYYY`))
                        )
                      )}
                      {", "}
                      {localeString(
                        language,
                        `${moment(item?.issue_date).format("dddd")}`
                      )}
                    </p>

                    <br />
                  </>
                  <div className="pb-2 pr-4 ">
                    {item?.is_lost === true && (
                      <div className="rounded-md text-center  bg-lost-color text-red-500 pt-1 pb-1 px-6 w-28">
                        {localeString(language, "lost")}
                      </div>
                    )}

                    {item?.is_damaged === true && (
                      <div className="rounded-md text-center  bg-lost-color text-red-500 pt-1 pb-1 px-6 w-28">
                        {localeString(language, "damaged")}
                      </div>
                    )}
                  </div>
                </div>
                <hr />
                <div className="pt-4">
                  <span className="sub-card-title">
                    {localeString(language, "library")}
                  </span>
                  <div className="py-2">{item?.issued_library?.name}</div>
                  <hr className="pt-1" />
                  <div className="sub-card-title pt-4">
                    {localeString(language, "address")}
                  </div>
                  <div className="py-2">
                    {item?.delivery_address ? item?.delivery_address : "..."}
                  </div>
                  <hr className="pt-1" />
                </div>
                <>
                  <div className="py-3 pr-4 flex bookButton justify-end pb-6">
                    <Button
                      className="sub-button button-primary"
                      onClick={() => getModalData(item?.id)}
                    >
                      {localeString(language, "viewDetails")}
                    </Button>
                  </div>
                </>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        bodyStyle={{padding: 16}}
        open={isModalOpen}
        footer={false}
        onCancel={handleCancel}
        centered
      >
        <div className="min-section-title ">
          {localeString(language, "details")}
        </div>
        <div>
          <div className="pt-8 pb-3">
            <div className="sub-section-title ">
              {localeString(language, "issueDate")}
            </div>
            <p className=" font-normal text-sm">
              {currencyFormatter(
                language,
                parseInt(moment(modalData?.issue_date)?.format("D"))
              )}{" "}
              {localeString(
                language,
                `${moment(modalData?.issue_date).format("MMMM")}`
              )}{" "}
              {commaRemover(
                currencyFormatter(
                  language,
                  parseInt(moment(modalData?.issue_date)?.format(`YYYY`))
                )
              )}
              {", "}
              {localeString(
                language,
                `${moment(modalData?.issue_date).format("dddd")}`
              )}
            </p>
          </div>
          <hr />
        </div>

        <div>
          <div className="pt-6 pb-3">
            <div className="sub-section-title">
              {localeString(language, "reason")}
            </div>
            {modalData?.is_lost === true && <div className="pt-2">Lost</div>}
            {modalData?.is_damaged === true && (
              <div className="pt-2">DAMAGED</div>
            )}
            {!modalData?.is_lost && !modalData?.is_damaged && (
              <div className="pt-2">...</div>
            )}
          </div>
          <hr />
        </div>

        <div className="pt-6 pb-3">
          <div className="sub-section-title">
            {localeString(language, "library")}
          </div>
          <div className="pt-2">
            {modalData?.issued_library?.name
              ? modalData?.issued_library?.name
              : "..."}
          </div>
        </div>
        <hr />
        <div className="pt-8 pb-3">
          <div className="sub-section-title">
            {localeString(language, "address")}
          </div>
          <div className="pt-2">
            {modalData?.delivery_address ? modalData?.delivery_address : "..."}
          </div>
        </div>
        <hr />
        <div className="pt-6 pb-3">
          <div className="sub-section-title">
            {localeString(language, "generalDiary")}
          </div>
          <div className="pt-2">
            <div className="">
              {modalData?.gd_image_url ? (
                <Image
                  className="p-4 "
                  src={modalData?.gd_image_url || ""}
                  alt=""
                  height={40}
                  width={40}
                />
              ) : (
                <>{localeString(language, "noImage")}</>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LibraryCardHistory;
