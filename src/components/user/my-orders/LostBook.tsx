import { DataNotFound } from "@/components/common";
import {
  commaRemover,
  currencyFormatter,
  localeString,
  scrollToTop,
} from "@/lib/helpers/utils";
import { getPaginatedData } from "@/lib/services";
import { Button, Modal, Pagination, message } from "antd";
import Cookies from "js-cookie";
import { isEmpty } from "lodash";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { CommonModal } from "./CommonModal";

export const LostBook = () => {
  let router = useRouter();
  const language = Cookies.get("language");
  const userToken = Cookies.get("token");
  const [page, setPage] = useState(
    router?.query?.page ? parseInt(router?.query?.page as string) : 1
  );
  const [totalPages, setTotalPages] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const width = useMediaQuery("(min-width: 768px)");
  const [lostBooksList, setLostBooksList] = useState<any>([]);
  const [lostBooksDetails, setLostBooksDetails] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const LostBooks = async () => {
    let params = { status_key: "lost", per_page: perPage, page: page };
    const res: any = await getPaginatedData(
      `public_library/circulations`,
      params,
      language,
      userToken
    );
    if (res?.success) {
      setTotalPages(parseInt(res?.data?.headers["x-total"]));
      setPage(parseInt(res?.data?.headers["x-page"]));
      router.push(`/user/my-orders/lost-books?page=${page}`, undefined, {
        shallow: false,
      });
      setLostBooksList(res?.data?.data);
    } else {
      messageApi.open({
        type: "error",
        content: res?.data?.error,
      });
    }
  };
  useEffect(() => {
    LostBooks();
  }, [page]);
  const lostBooksDetail = (item: any) => {
    setLostBooksDetails(item);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handlePageChange = (page: number) => {
    router.push(`/user/my-orders/lost-books?page=${page}`, undefined, {
      shallow: false,
    });
    setPage(page);
    scrollToTop();
  };
  return (
    <div>
      {contextHolder}
      <div className="lost-books-header flex justify-between">
        <div className="lost-card-title mb-6">
          <h4 className="text-gray-700 font-bold font-playfairDisplay text-xl">
            {localeString(language, "lostBook")}
          </h4>
        </div>
      </div>
      <div className="lost-card-body  p-2 rounded">
        {lostBooksList?.length > 0 ? (
          lostBooksList?.map((lostBook: any) => {
            return (
              <>
                <div key={lostBook?.id} className="mb-6">
                  <div className="lost-card-body bg-white p-6 rounded">
                    <div className="flex border-b ">
                      <div className="order-book-image mb-3">
                        {!isEmpty(lostBook?.item_info?.image_url) && (
                          <Image
                            src={
                              width
                                ? lostBook?.item_info?.image_url?.desktop_image
                                  ? lostBook?.item_info?.image_url
                                      ?.desktop_image
                                  : "/no-image.png"
                                : lostBook?.item_info?.image_url?.tab_image
                                ? lostBook?.item_info?.image_url?.tab_image
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
                          {lostBook?.item_info?.title}
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
                                moment(lostBook?.issue_date)?.format("D")
                              )
                            )}{" "}
                            {localeString(
                              language,
                              `${moment(lostBook?.issue_date).format("MMMM")}`
                            )}{" "}
                            {commaRemover(
                              currencyFormatter(
                                language,
                                parseInt(
                                  moment(lostBook?.issue_date)?.format(`YYYY`)
                                )
                              )
                            )}
                          </span>
                        </p>
                      </div>
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
                                moment(lostBook?.return_date)?.format("D")
                              )
                            )}{" "}
                            {localeString(
                              language,
                              `${moment(lostBook?.return_date).format("MMMM")}`
                            )}{" "}
                            {commaRemover(
                              currencyFormatter(
                                language,
                                parseInt(
                                  moment(lostBook?.return_date)?.format(`YYYY`)
                                )
                              )
                            )}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="current-body-footer flex justify-end mt-3 ">
                      <div className="current-view-details  py-3">
                        <Link href="">
                          <Button
                            onClick={() => lostBooksDetail(lostBook)}
                            className="h-10 rounded bg-[#E6F0ED] text-library-primary px-2 md:px-16 lg:px-32 border border-library-primary"
                          >
                            {localeString(language, "viewDetails")}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <Pagination
                  total={totalPages}
                  showSizeChanger={false}
                  pageSize={perPage}
                  defaultCurrent={1}
                  current={page}
                  onChange={handlePageChange}
                />
              </>
            );
          })
        ) : (
          <DataNotFound
            title={`${localeString(language, "lostBookNotFound")}`}
          />
        )}
      </div>

      <CommonModal
        isModalOpen={isModalOpen}
        onCancel={handleCancel}
        closable={false}
        footer={null}
        booksDetails={lostBooksDetails}
      />
    </div>
  );
};
