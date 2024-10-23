import { Button, Modal, Pagination, message } from "antd";
import React, { FC, useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import {
  commaRemover,
  currencyFormatter,
  localeString,
  scrollToTop,
} from "@/lib/helpers/utils";
import Cookies from "js-cookie";
import Image from "next/image";
import { IoMdInformation } from "react-icons/io";
import { getPaginatedData } from "@/lib/services";
import moment from "moment";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import { DataNotFound } from "@/components/common";
interface IReturnBook {}

export const ReturnBook: FC<IReturnBook> = ({}) => {
  let router = useRouter();
  const language = Cookies.get("language");
  const userToken = Cookies.get("token");
  const [page, setPage] = useState(
    router?.query?.page ? parseInt(router?.query?.page as string) : 1
  );
  const [totalPages, setTotalPages] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [returnBooks, setReturnBooks] = useState<any>([]);
  const [returnBooksDetails, setReturnBooksDetails] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const width = useMediaQuery("(min-width: 768px)");
  const errorMsg = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };
  const getReturnBooksList = async () => {
    let params = {
      status_key: "returned",
      per_page: perPage,
      page: page,
    };
    const res: any = await getPaginatedData(
      `public_library/circulations`,
      params,
      language,
      userToken
    );
    if (res?.success) {
      setTotalPages(parseInt(res?.data?.headers["x-total"]));
      setPage(parseInt(res?.data?.headers["x-page"]));
      router.push(`/user/my-orders/return-books?page=${page}`, undefined, {
        shallow: false,
      });
      setReturnBooks(res?.data?.data);
    } else {
      errorMsg(res?.data?.error);
    }
  };
  const handlePageChange = (page: number) => {
    router.push(`/user/my-orders/return-books?page=${page}`, undefined, {
      shallow: false,
    });
    setPage(page);
    scrollToTop();
  };
  useEffect(() => {
    getReturnBooksList();
  }, [page]);

  const returnBooksDetail = (returnBook?: any) => {
    setReturnBooksDetails(returnBook);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      <div className="mb-6">
        <div className="card-title my-3 ms:my-0 lg:my-0">
          <h4 className="text-gray-700 font-bold font-playfairDisplay">
            {localeString(language, "returnOrder")}
          </h4>
        </div>
      </div>

      {returnBooks?.length > 0 ? (
        <>
          {returnBooks?.map((returnBook: any) => {
            return (
              <>
                <div key={returnBook?.id} className="mb-6">
                  <div className="return-card-body bg-white p-6 rounded ">
                    {returnBook?.order_items?.map((singleItem: any) => {
                      return (
                        <div key={singleItem?.id} className="mb-4">
                          <div className="flex border-b">
                            <div className="order-book-image mb-3">
                              {!isEmpty(singleItem?.image_url) && (
                                <Image
                                  src={
                                    width
                                      ? singleItem?.image_url?.desktop_image
                                        ? singleItem?.image_url?.desktop_image
                                        : "/no-image.png"
                                      : singleItem?.image_url?.tab_image
                                      ? singleItem?.image_url?.tab_image
                                      : "/no-image.png"
                                  }
                                  alt="gallery-img"
                                  width={180}
                                  height={150}
                                  className="rounded"
                                />
                              )}
                            </div>
                            <div className="order-book-title ml-2">
                              <h5 className="text-gray-700 text-base">
                                {singleItem?.title}
                              </h5>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="return-body-footer flex justify-between gap-2 mt-3">
                      <div className="damge-book pt-3">
                        <button className="bg-[#FFD9D9] text-xs px-1 py-1 rounded text-library-royal-red md:text-sm lg:text-sm">
                          {returnBook?.status}
                        </button>
                      </div>

                      <div className="return-view-details py-3">
                        <Button
                          className="h-10 rounded bg-[#E6F0ED] text-library-primary  md:px-36 lg:px-36 border border-library-primary"
                          onClick={() => returnBooksDetail(returnBook)}
                        >
                          {localeString(language, "viewDetails")}
                        </Button>
                      </div>
                    </div>
                    <div className="return-date flex justify-between border-b py-4">
                      <div className="issue-date">
                        <p className="text-gray-700 text-sm">
                          <span className="font-semibold">
                            {localeString(language, "returnDate")} :
                          </span>
                          <span> </span>
                          <span>
                            {currencyFormatter(
                              language,
                              parseInt(
                                moment(returnBook?.created_at)?.format("D")
                              )
                            )}{" "}
                            {localeString(
                              language,
                              `${moment(returnBook?.created_at).format("MMMM")}`
                            )}{" "}
                            {commaRemover(
                              currencyFormatter(
                                language,
                                parseInt(
                                  moment(returnBook?.created_at)?.format(`YYYY`)
                                )
                              )
                            )}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
          <Pagination
            total={totalPages}
            showSizeChanger={false}
            pageSize={perPage}
            defaultCurrent={1}
            current={page}
            onChange={handlePageChange}
          />
        </>
      ) : (
        <DataNotFound title={`${localeString(language, "returnBooksTitle")}`} />
      )}
      <div className="view-return-details-modal">
        <Modal
          footer={null}
          maskClosable={false}
          open={isModalOpen}
          onOk={handleCancel}
          onCancel={handleCancel}
        >
          <div className="">
            <div className="card-title ">
              <h4 className="text-gray-700 font-bold font-playfairDisplay">
                {localeString(language, "returnOrderDetails")}
              </h4>
            </div>
          </div>
          <div className="return-card-body bg-white p-4 rounded">
            <div className="mb-4">
              {returnBooksDetails?.order_items?.map((returnItem: any) => {
                return (
                  <div key={returnItem?.id}>
                    <div className="flex mt-4 border-b">
                      <div className="order-book-image mb-3">
                        {!isEmpty(returnItem?.image_url) && (
                          <Image
                            src={
                              width
                                ? returnItem?.image_url?.desktop_image
                                  ? returnItem?.image_url?.desktop_image
                                  : "/no-image.png"
                                : returnItem?.image_url?.tab_image
                                ? returnItem?.image_url?.tab_image
                                : "/no-image.png"
                            }
                            alt="gallery-img"
                            width={180}
                            height={150}
                            className="rounded"
                          />
                        )}
                      </div>
                      <div className="order-book-title ml-2">
                        <h5 className="text-gray-700 text-base">
                          {returnItem?.title}
                        </h5>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="return-date flex justify-between border-b py-4">
              <div className="issue-date">
                <p className="text-gray-700 text-xs md:text-sm lg:text-sm">
                  <span className="font-semibold">
                    {localeString(language, "returnDate")} :
                  </span>
                  <span> </span>
                  <span>
                    {currencyFormatter(
                      language,
                      parseInt(
                        moment(returnBooksDetails?.created_at)?.format("D")
                      )
                    )}{" "}
                    {localeString(
                      language,
                      `${moment(returnBooksDetails?.created_at).format("MMMM")}`
                    )}{" "}
                    {commaRemover(
                      currencyFormatter(
                        language,
                        parseInt(
                          moment(returnBooksDetails?.created_at)?.format(`YYYY`)
                        )
                      )
                    )}
                  </span>
                </p>
              </div>
              {/* <div className="return-date">
                      <p className="text-gray-700 text-xs md:text-sm lg:text-sm">
                        <span className="font-semibold">
                          {localeString(language, "returnDate")} :
                        </span>
                        08 Mar 2023
                      </p>
                    </div> */}
            </div>
            <div className="return-body-footer flex justify-between gap-2 mt-3">
              <div className="flex gap-2">
                <div className="return-on-time pt-3">
                  <button className="bg-[#E1EDFF] text-xs px-1 py-1 rounded md:text-sm lg:text-sm text-library-royal-blue">
                    {returnBooksDetails?.status}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="return-info flex p-4 bg-white border rounded border-library-royal-blue my-6">
            <div className="return-icon bg-library-royal-blue text-white rounded-full h-5 text-xl mr-2">
              <IoMdInformation />
            </div>
            <p className="text-library-royal-blue text-sm">
              {localeString(language, "returnBookMsg")}
            </p>
          </div>
          <div className="lost-fee flex justify-between bg-white p-4 mt-6 text-library-royal-red">
            <div className="lost-fee-title font-bold">
              <p>{localeString(language, "lostFee")} :</p>
            </div>
            <div className="lost-fee-amount">
              <p className="font-bold">BDT 2000</p>
            </div>
          </div>
          <div className="payment-button flex justify-end mt-6">
            <button className="bg-green-900 text-white py-2 px-6 border rounded ease-in-out delay-75">
              {localeString(language, "makePayment")}
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};
