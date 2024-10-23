import React, {FC, useState} from "react";
import {getData} from "@/lib/services";
import {localeString} from "@/lib/helpers/utils";
import Cookies from "js-cookie";
import {Button, Modal} from "antd";
import {IBookDemand, IModalData} from "@/lib/model/myRequest";
import {DataNotFound} from "@/components/common";

interface IBookDemandRequstHistory {
  requestHistory: IBookDemand[];
  language: string | undefined;
}
export const BookDemandRequstHistory: FC<IBookDemandRequstHistory> = ({
  requestHistory,
}) => {
  const language: string | undefined = Cookies.get("language");
  const [modalData, setModalData] = useState<IModalData>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getModalData = async (id: number) => {
    if (requestHistory) {
      const res = await getData(
        `public_library/requested_biblios/${id}`,
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

  const getAuthor = modalData?.authors?.map((item: string) => item);
  const getSubject = modalData?.biblio_subjects?.map((item: string) => item);
  return (
    <>
      <>
        {requestHistory?.length < 1 ? (
          <div className="pt-6">
            <DataNotFound title={localeString(language, "bookTransferText")} />
          </div>
        ) : (
          <div>
            {requestHistory?.map((item: IBookDemand) => (
              <div className="pt-6" key={item?.id}>
                <div className="p-4 bg-white rounded-xl">
                  <div className="h-full w-full">
                    <div className="pt-4 pb-2">
                      <span className="card-title">
                        {localeString(language, "bookName")}:
                      </span>
                      <span className="pl-2">
                        {item?.biblio_title ? item?.biblio_title : "..."}
                      </span>
                    </div>
                    <hr className="pt-5" />
                    <div className="pb-2">
                      <span className="card-title">
                        {localeString(language, "authorName")}:
                      </span>
                      <span className="pl-2">
                        {item?.authors?.join(", ")
                          ? item?.authors?.join(", ")
                          : "..."}
                      </span>
                    </div>
                    <hr className="pt-1" />
                    <>
                      <div className="py-3 md:flex md:justify-end borrowBookButton">
                        <Button
                          className="w-full md:w-40 md:px-4 lg:px-4  text-center button-secondary"
                          onClick={() => getModalData(item?.id)}
                        >
                          {localeString(language, "viewDetails")}
                        </Button>
                      </div>
                    </>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </>

      <Modal
        bodyStyle={{padding: 16}}
        open={isModalOpen}
        footer={false}
        onCancel={handleCancel}
        centered
      >
        <div className="min-section-title ">
          {localeString(language, "bookDetails")}
        </div>
        <div>
          <div className="pt-8 pb-3">
            <div className="sub-section-title ">
              {localeString(language, "bookName")}
            </div>
            <div className="pt-2">
              <span>
                {modalData?.biblio_title ? modalData?.biblio_title : "_"}
              </span>
            </div>
          </div>
          <hr />
        </div>
        <div>
          <div className="pt-8 pb-3 ">
            <div className="sub-section-title">
              {localeString(language, "authorName")}
            </div>
            <div className="pt-2">
              {getAuthor?.join(", ") ? getAuthor?.join(", ") : "_"}
            </div>
          </div>
          <hr />
        </div>
        <div className="pt-8 pb-3">
          <div className="sub-section-title">
            {localeString(language, "subject")}
          </div>
          <div className="pt-2">
            {getSubject?.join(", ") ? getSubject?.join(", ") : "_"}
          </div>
        </div>
        <hr />
        <div className="pt-8 pb-3">
          <div className="sub-section-title">
            {localeString(language, "isbn")}
          </div>
          <div className="pt-2">{modalData?.isbn ? modalData?.isbn : "_"}</div>
        </div>
        <hr />
        <div className="pt-8 pb-3">
          <div className="sub-section-title">
            {localeString(language, "publication")}
          </div>
          <div className="pt-2">
            {modalData?.publication ? modalData?.publication : "_"}
          </div>
        </div>
        <hr />
        <div className="pt-8 pb-3">
          <div className="sub-section-title">
            {localeString(language, "edition")}
          </div>
          <div className="pt-2">
            {modalData?.edition ? modalData?.edition : "_"}
          </div>
        </div>
        <hr />
        <div className="pt-8 pb-3">
          <div className="sub-section-title">
            {localeString(language, "volume")}
          </div>
          <div className="pt-2">
            {modalData?.volume ? modalData?.volume : "_"}
          </div>
        </div>
      </Modal>
    </>
  );
};
