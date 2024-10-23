import React, { useEffect, useState } from "react";

import {
  commaRemover,
  currencyFormatter,
  localeString,
} from "@/lib/helpers/utils";
import Cookies from "js-cookie";
import { Button, Checkbox, Modal, message } from "antd";
import Image from "next/image";
import { IoMdInformation } from "react-icons/io";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { getData, patchData } from "@/lib/services";
import moment from "moment";
import { isEmpty } from "lodash";
import { useMediaQuery } from "usehooks-ts";
import { useRouter } from "next/router";

const CurrentBooksDetails = () => {
  const language = Cookies.get("language");
  const userToken = Cookies.get("token");
  const [currentBooksList, setCurrentBooksList] = useState<any>();
  const [isOkDisabled, setIsOkDesabled] = useState<boolean>(false);
  const [isExtendModalOpen, setIsExtendModalOpen] = useState(false);
  const [extendOrder, setExtendOrder] = useState(true);
  const [lostBook, setLostBook] = useState(false);
  const [extendButtonDesign, setExtendButtonDesign] = useState("");
  const [lostButtonDesign, setLostButtonDesign] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const width = useMediaQuery("(min-width: 768px)");
  const onChange = (e: CheckboxChangeEvent) => {
    setIsOkDesabled(e.target.checked);
  };
  const router = useRouter();
  const { slug } = router?.query;
  const currentBooks = async () => {
    let params = { status_key: "borrowed" };
    const res = await getData(
      `public_library/circulations/${slug}`,
      params,
      language,
      userToken
    );

    if (res?.success) {
      setCurrentBooksList(res?.data);
    } else {
    }
  };
  useEffect(() => {
    currentBooks();
  }, []);
  const now: any = new Date();
  const calculateDays = (returnDate: any) => {
    const now: any = new Date();
    const days =
      Math.floor(((new Date(returnDate) as any) - now) / 1000 / 60 / 60 / 24) +
      1;
    return days;
  };
  const errorMsg = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };
  const successExtendModal = () => {
    setIsExtendModalOpen(true);
  };
  const handleCancel = () => {
    setIsExtendModalOpen(false);
  };
  const handleExtend = async () => {
    const res = await patchData(
      `public_library/circulations/${slug}/extend`,
      {},
      userToken
    );

    if (res?.success) {
      successExtendModal();
    } else {
      errorMsg(`${localeString(language, "extendOver")}`);
    }
  };
  const handleLostbook = async () => {
    const res = await patchData(
      `public_library/circulations/${slug}/lost`,
      {},
      userToken
    );

    if (res?.success) {
      alert("show lost");
    } else {
    }
  };
  const handleExtentOrder = () => {
    setExtendOrder(true);
    setLostBook(false);
    setExtendButtonDesign("active");
    setLostButtonDesign("");
  };
  const handleLost = () => {
    setLostBook(true);
    setExtendOrder(false);
    setLostButtonDesign("active");
    setExtendButtonDesign("");
  };
  return (
    <div className="pl-content-container ">
      {contextHolder}
      <div className="pl-content-container">
        <div className="pl-content-container">
          <div className="my-6  ">
            <div className="current-book-details bg-white px-8 shadow-lg">
              <div className="order-card-title py-4">
                <h4 className="text-gray-700 font-bold font-playfairDisplay">
                  {localeString(language, "details")}
                </h4>
              </div>
              <div className="flex mt-4 border-b ">
                {
                  <div className="order-book-image mb-3">
                    {!isEmpty(currentBooksList?.item_info?.image_url) && (
                      <Image
                        src={
                          width
                            ? currentBooksList?.item_info?.image_url
                                ?.desktop_image
                              ? currentBooksList?.item_info?.image_url
                                  ?.desktop_image
                              : "/no-image.png"
                            : currentBooksList?.item_info?.image_url?.tab_image
                            ? currentBooksList?.item_info?.image_url?.tab_image
                            : "/no-image.png"
                        }
                        alt="gallery-img"
                        width={180}
                        height={150}
                        className="rounded"
                      />
                    )}
                  </div>
                }
                <div className="order-book-title ml-2">
                  <h5 className="text-gray-700 text-base">
                    {currentBooksList?.item_info?.title}
                  </h5>
                </div>
              </div>
              <div className="current-date flex justify-between border-b py-4 ">
                <div className="issue-date">
                  <p className="text-gray-700 text-xs md:text-sm lg:text-sm">
                    <span className="font-semibold">
                      {localeString(language, "issueDate")} :
                    </span>
                    <span> </span>
                    <span>
                      {currencyFormatter(
                        language,
                        parseInt(
                          moment(currentBooksList?.issue_date)?.format("D")
                        )
                      )}{" "}
                      {localeString(
                        language,
                        `${moment(currentBooksList?.issue_date).format("MMMM")}`
                      )}{" "}
                      {commaRemover(
                        currencyFormatter(
                          language,
                          parseInt(
                            moment(currentBooksList?.issue_date)?.format(`YYYY`)
                          )
                        )
                      )}
                    </span>
                  </p>
                </div>
                <div className="return-date">
                  <p className="text-gray-700 text-xs md:text-sm lg:text-sm">
                    <span className="font-semibold">
                      {localeString(language, "returnDate")} :
                    </span>
                    <span> </span>
                    <span>
                      {currencyFormatter(
                        language,
                        parseInt(
                          moment(currentBooksList?.return_date)?.format("D")
                        )
                      )}{" "}
                      {localeString(
                        language,
                        `${moment(currentBooksList?.return_date).format(
                          "MMMM"
                        )}`
                      )}{" "}
                      {commaRemover(
                        currencyFormatter(
                          language,
                          parseInt(
                            moment(currentBooksList?.return_date)?.format(
                              `YYYY`
                            )
                          )
                        )
                      )}
                    </span>
                  </p>
                </div>
              </div>
              <div className="current-return-status py-3 flex justify-start">
                {now > moment(currentBooksList?.return_date) ? (
                  <p className="uppercase px-3 rounded bg-[#FFEBEB] text-[#FD0C0F] ">
                    {localeString(language, "returnDateOver")}
                  </p>
                ) : (
                  <p className="uppercase px-3 rounded bg-[#E1EDFF] text-[#024F9C] ">
                    {calculateDays(currentBooksList?.return_date)}
                    <span> </span>
                    {localeString(language, "daysToReturn")}
                  </p>
                )}
              </div>
            </div>
            <div className="px-8 bg-white py-6 shadow-lg">
              <div className="return-book-footer">
                <div className="flex justify-between gap-2">
                  <div className="extent-btn mb-6">
                    <Button
                      onClick={handleExtentOrder}
                      className={`${
                        extendButtonDesign
                          ? "active border rounded border-library-primary px-5 md:px-12 xl:px-28"
                          : "border rounded  border-library-primary bg-library-order-sidebar-background px-5 md:px-12  xl:px-28"
                      }`}
                    >
                      {localeString(language, "extendOrder")}
                    </Button>
                  </div>
                  <div className="lost-btn ">
                    <Button
                      onClick={handleLost}
                      className={`${
                        lostButtonDesign
                          ? "active border rounded border-library-primary px-5 md:px-12  xl:px-28"
                          : "border rounded border-library-primary bg-library-order-sidebar-background px-5 md:px-12  xl:px-28"
                      }`}
                    >
                      {localeString(language, "lostBook")}
                    </Button>
                  </div>
                </div>
                {extendOrder && (
                  <>
                    <div className="extendent-info flex p-4 bg-white border rounded border-library-royal-blue">
                      <div className="extendent-icon bg-library-royal-blue text-white rounded-full h-5 text-xl mr-2">
                        <IoMdInformation />
                      </div>
                      <p className="text-black text-xs md:text-sm lg:text">
                        {localeString(language, "extendCheckBoxMsg")}
                      </p>
                    </div>
                    <div className="extendent-checkbox flex justify-end my-6">
                      <Checkbox onChange={onChange}>
                        {localeString(language, "extendCheckBoxlbl")}
                      </Checkbox>
                    </div>

                    <div className="extendent-button flex justify-end">
                      <Button
                        onClick={handleExtend}
                        disabled={!isOkDisabled}
                        className="h-10 bg-green-900 text-white px-6 border rounded ease-in-out delay-75"
                      >
                        {localeString(language, "extendOrder")}
                      </Button>
                    </div>
                  </>
                )}
                {lostBook && (
                  <>
                    <div className="extendent-info flex p-4 bg-white border rounded border-library-royal-blue">
                      <div className="extendent-icon bg-library-royal-blue text-white rounded-full h-5 text-xl mr-2">
                        <IoMdInformation />
                      </div>
                      <p className="text-library-royal-blue text-xs md:text-sm lg:text">
                        {localeString(language, "lostCheckBoxMsg")}
                        <span className="font-semibold">
                          <a href="" className="underline">
                            {localeString(language, "borrowPolicy")}
                          </a>
                        </span>
                      </p>
                    </div>
                    <div className="lost-fee flex justify-between bg-white p-4 mt-6 text-library-royal-red">
                      <div className="lost-fee-title ">
                        <p>{localeString(language, "lostFee")}</p>
                      </div>
                      <div className="lost-fee-amount">
                        <p className="font-bold">BDT 2000</p>
                      </div>
                    </div>
                    <div className="lost-checkbox flex justify-end my-6">
                      <Checkbox onChange={onChange}>
                        {localeString(language, "lostCheckBoxlbl")}
                      </Checkbox>
                    </div>
                    <div className="lost-button flex justify-end">
                      <Button
                        onClick={handleLostbook}
                        disabled={!isOkDisabled}
                        className="h-10 bg-green-900 text-white px-6 border rounded ease-in-out delay-75"
                      >
                        {localeString(language, "makePayment")}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="extend-modal">
              <Modal
                footer={null}
                maskClosable={false}
                open={isExtendModalOpen}
                onOk={handleCancel}
                onCancel={handleCancel}
              >
                <div className="extend-message bg-white rounded">
                  <div>
                    <p>{localeString(language, "extendMessage")}</p>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentBooksDetails;
