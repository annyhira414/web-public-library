import React, { FC, useEffect, useState } from "react";
import { Button, Pagination, Popconfirm, message } from "antd";
import Link from "next/link";
import { useMediaQuery } from "usehooks-ts";
import {
  commaRemover,
  currencyFormatter,
  localeString,
  scrollToTop,
} from "@/lib/helpers/utils";
import Cookies from "js-cookie";
import Image from "next/image";
import { getPaginatedData, patchData } from "@/lib/services";
import moment from "moment";
import { isEmpty } from "lodash";
import { DataNotFound, Loader } from "@/components/common";
import { useRouter } from "next/router";
import { QuestionCircleOutlined } from "@ant-design/icons";

interface IOrderCard {}

export const OrderCard: FC<IOrderCard> = () => {
  let router = useRouter();
  const width = useMediaQuery("(min-width: 768px)");
  const language = Cookies.get("language");
  const userToken = Cookies.get("token");
  const [page, setPage] = useState(
    router?.query?.page ? parseInt(router?.query?.page as string) : 1
  );
  const [totalPages, setTotalPages] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [messageApi, contextHolder] = message.useMessage();
  const [myOrder, setMyOrder] = useState<any>([]);
  const [loader, setLoader] = useState(false);
  const successMsg = (msg: string) => {
    messageApi.open({
      type: "success",
      content: msg,
    });
  };
  const errorMsg = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };

  const myOrderData = async () => {
    setLoader(true);
    const res: any = await getPaginatedData(
      `public_library/orders`,
      { per_page: perPage, page: page },
      language,
      userToken
    );

    if (res?.success) {
      setTotalPages(parseInt(res?.data?.headers["x-total"]));
      setPage(parseInt(res?.data?.headers["x-page"]));
      router.push(`/user/my-orders?page=${page}`, undefined, {
        shallow: false,
      });
      setMyOrder(res?.data);
      setLoader(false);
    } else {
      errorMsg(res?.data?.error);
    }
  };
  const handlePageChange = (page: number) => {
    router.push(`/user/my-orders?page=${page}`, undefined, {
      shallow: false,
    });
    setPage(page);
    scrollToTop();
  };

  const cancelMyOrder = async (id: any) => {
    const res = await patchData(
      `public_library/orders/${id}/cancel`,
      {},
      userToken
    );
    if (res?.success) {
      successMsg(`${localeString(language, "cancelOrderMsg")}`);
      myOrderData();
    } else {
      errorMsg(res?.data?.error);
    }
  };
  useEffect(() => {
    myOrderData();
  }, [page]);
  const handleCancelOrder = (id: any) => {
    cancelMyOrder(id);
  };

  return (
    <>
      {contextHolder}
      {loader ? (
        <Loader />
      ) : (
        <>
          {myOrder?.data?.length > 0 ? (
            <>
              <div className="order-card-title mb-6">
                <h4 className="text-gray-700 font-bold font-playfairDisplay text-xl">
                  {localeString(language, "order")}
                </h4>
              </div>
              {myOrder?.data?.map((singleOrder: any) => {
                return (
                  <div key={singleOrder.unique_id}>
                    <div className="order-card bg-white p-6 mb-6">
                      <div className="oder-card-heading flex justify-between border-b">
                        <div className="issue-date">
                          <p className="text-gray-700 text-sm">
                            <span className="font-semibold">
                              {localeString(language, "issueDate")} :
                            </span>
                            <span> </span>
                            <span>
                              {currencyFormatter(
                                language,
                                parseInt(
                                  moment(singleOrder?.created_at)?.format("D")
                                )
                              )}{" "}
                              {localeString(
                                language,
                                `${moment(singleOrder?.created_at).format(
                                  "MMMM"
                                )}`
                              )}{" "}
                              {commaRemover(
                                currencyFormatter(
                                  language,
                                  parseInt(
                                    moment(singleOrder?.created_at)?.format(
                                      `YYYY`
                                    )
                                  )
                                )
                              )}
                            </span>
                          </p>
                        </div>
                        <div className="bg-[#FFEDCA] font-semibold text-xs p-1 rounded order-body-status mb-3 uppercase text-library-order-pending">
                          {singleOrder?.status}
                        </div>
                      </div>
                      {singleOrder?.order_items?.map((singleBook: any) => {
                        return (
                          <>
                            <div key={singleBook?.id}>
                              <div className="flex mt-4 border-b">
                                <div className="order-book-image mb-3">
                                  {!isEmpty(singleBook?.image_url) && (
                                    <Image
                                      src={
                                        width
                                          ? singleBook?.image_url?.desktop_image
                                            ? singleBook?.image_url
                                                ?.desktop_image
                                            : "/no-image.png"
                                          : singleBook?.image_url?.tab_image
                                          ? singleBook?.image_url?.tab_image
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
                                    {singleBook?.title}
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                      {singleOrder?.status_key === "order_placed" && (
                        <div className="order-body-footer flex justify-between mt-3">
                          <div className="order-body-cancel">
                            <Popconfirm
                              okButtonProps={{
                                type: "ghost",
                                className:
                                  "border border-[#FFEAEA] text-library-royal-red transition-all duration-500 hover:border-library-royal-red p-2 ",
                              }}
                              title={localeString(language, "deleteOrder")}
                              okText={localeString(language, "deleteBtn")}
                              cancelText={localeString(language, "cancel")}
                              onConfirm={() =>
                                handleCancelOrder(singleOrder?.id)
                              }
                              description={localeString(
                                language,
                                "deleteOrderMessage"
                              )}
                              icon={
                                <QuestionCircleOutlined
                                  style={{
                                    color: "red",
                                  }}
                                />
                              }
                            >
                              <div className="bookButton">
                                <Button className="button-cancel px-5 md:px-16 lg:px-24 xl:px-28">
                                  {localeString(language, "cancelOrder")}
                                </Button>
                              </div>
                            </Popconfirm>
                          </div>
                          <div>
                            <Link
                              className="bookButton"
                              href={`/user/my-orders/${singleOrder?.id}`}
                            >
                              <Button className="button-primary px-5 ml-2 h-10 md:px-16 lg:px-24 xl:px-28">
                                {localeString(language, "viewDetails")}
                              </Button>
                            </Link>
                          </div>
                        </div>
                      )}
                      {singleOrder?.status_key === "cancelled" && (
                        <div className="flex justify-end mt-3">
                          <Link
                            className="bookButton"
                            href={`/user/my-orders/${singleOrder?.id}`}
                          >
                            <Button className="button-primary px-5 ml-2 h-10 md:px-16 lg:px-24 xl:px-36">
                              {localeString(language, "viewDetails")}
                            </Button>
                          </Link>
                        </div>
                      )}
                      {singleOrder?.status_key === "order_confirmed" && (
                        <div className="order-body-footer flex justify-between mt-3">
                          <div className="track-order underline mt-2">
                            <Link
                              href={`/track-order/${singleOrder?.unique_id}`}
                            >
                              {localeString(language, "trackOrder")}
                            </Link>
                          </div>
                          <div className="order-view-details">
                            <Link
                              href={`/user/my-orders/${singleOrder?.id}`}
                              className="bookButton"
                            >
                              <Button className="button-primary px-5 ml-2 h-10 md:px-16 lg:px-24 xl:px-36">
                                {localeString(language, "viewDetails")}
                              </Button>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
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
            <DataNotFound title="You have no order" />
          )}
        </>
      )}
    </>
  );
};
