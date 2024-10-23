import { DataNotFound } from "@/components/common";
import {
  commaRemover,
  currencyFormatter,
  localeString,
  scrollToTop,
} from "@/lib/helpers/utils";
import { getData, getPaginatedData } from "@/lib/services";
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

export const DamageBook = () => {
  let router = useRouter();
  const language = Cookies.get("language");
  const userToken = Cookies.get("token");
  const [page, setPage] = useState(
    router?.query?.page ? parseInt(router?.query?.page as string) : 1
  );
  const [totalPages, setTotalPages] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const width = useMediaQuery("(min-width: 768px)");
  const [damageBooksList, setDamageBooksList] = useState<any>();
  const [damageBookDetails, setDamageBookDetails] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const DamageBooks = async () => {
    let params = {
      status_key: "damaged_returned",
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
      router.push(`/user/my-orders/damage-books?page=${page}`, undefined, {
        shallow: false,
      });
      setDamageBooksList(res?.data?.data);
    } else {
      messageApi.open({
        type: "error",
        content: res?.data?.error,
      });
    }
  };
  useEffect(() => {
    DamageBooks();
  }, [page]);
  const damageBooksDetail = (item: any) => {
    setDamageBookDetails(item);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handlePageChange = (page: number) => {
    router.push(`/user/my-orders/damage-books?page=${page}`, undefined, {
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
            {localeString(language, "damageBooks")}
          </h4>
        </div>
      </div>
      <div className="lost-card-body  p-2 rounded">
        {damageBooksList?.length > 0 ? (
          damageBooksList?.map((damageBook: any) => {
            return (
              <>
                <div key={damageBook?.id} className="mb-6">
                  <div className="lost-card-body bg-white p-6 rounded">
                    <div className="flex border-b ">
                      <div className="order-book-image mb-3">
                        {!isEmpty(damageBook?.item_info?.image_url) && (
                          <Image
                            src={
                              width
                                ? damageBook?.item_info?.image_url
                                    ?.desktop_image
                                  ? damageBook?.item_info?.image_url
                                      ?.desktop_image
                                  : "/no-image.png"
                                : damageBook?.item_info?.image_url?.tab_image
                                ? damageBook?.item_info?.image_url?.tab_image
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
                          {damageBook?.item_info?.title}
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
                                moment(damageBook?.issue_date)?.format("D")
                              )
                            )}{" "}
                            {localeString(
                              language,
                              `${moment(damageBook?.issue_date).format("MMMM")}`
                            )}{" "}
                            {commaRemover(
                              currencyFormatter(
                                language,
                                parseInt(
                                  moment(damageBook?.issue_date)?.format(`YYYY`)
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
                                moment(damageBook?.return_date)?.format("D")
                              )
                            )}{" "}
                            {localeString(
                              language,
                              `${moment(damageBook?.return_date).format(
                                "MMMM"
                              )}`
                            )}{" "}
                            {commaRemover(
                              currencyFormatter(
                                language,
                                parseInt(
                                  moment(damageBook?.return_date)?.format(
                                    `YYYY`
                                  )
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
                            onClick={() => damageBooksDetail(damageBook)}
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
            title={`${localeString(language, "damageBookNotFound")}`}
          />
        )}
      </div>

      <CommonModal
        isModalOpen={isModalOpen}
        onCancel={handleCancel}
        closable={false}
        footer={null}
        booksDetails={damageBookDetails}
      />
    </div>
  );
};
