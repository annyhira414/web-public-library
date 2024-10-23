import {
  commaRemover,
  currencyFormatter,
  localeString,
} from "@/lib/helpers/utils";
import Cookies from "js-cookie";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { getData, patchData, postData } from "@/lib/services";
import { useRouter } from "next/router";
import { useMediaQuery } from "usehooks-ts";
import { Button, Popconfirm, message } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { IoArrowBackOutline } from "react-icons/io5";
import { getPublicIp } from "@/lib/services/baseServices";
const OrderDetails = () => {
  const language = Cookies.get("language");
  const userToken = Cookies.get("token");
  const router = useRouter();
  const { slug } = router?.query;
  const width = useMediaQuery("(min-width: 768px)");
  const [myOrderDetailsData, setMyOrderDetailsData] = useState<any>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const myOrderDetails = async () => {
    const res = await getData(
      `public_library/orders/${slug}`,
      {},
      language,
      userToken
    );
    if (res?.success) {
      setMyOrderDetailsData(res?.data);
    } else {
      errorMsg("No Data Found");
    }
  };
  useEffect(() => {
    myOrderDetails();
  }, []);
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
  const cancelMyOrder = async (id: any) => {
    const res = await patchData(
      `public_library/orders/${id}/cancel`,
      {},
      userToken
    );
    if (res?.success) {
      successMsg(`${localeString(language, "cancelOrderMsg")}`);
    } else {
      errorMsg("");
    }
  };
  const handlePreviousButton = () => {
    router.push("/user/my-orders");
  };
  const makePayment = async () => {
    const myIp = await getPublicIp();
    const res = await postData(
      `/public_library/payments/nagad/initiate`,
      {
        invoice_id: myOrderDetailsData?.invoice_id,
        invoice_type: "third_party",
        ip_address: myIp,
      },
      language,
      userToken
    );
    console.log("my payment result is = ", res?.data?.error);
    if (res?.success) {
      router.push(res?.data?.redirect_url);
    } else {
      errorMsg(res?.data?.error);
    }
  };
  return (
    <>
      {contextHolder}
      <div className="pl-content-container">
        <div className="pl-content-container ">
          <div className="pl-content-container my-6">
            <div className="order-card-title mb-4 flex justify-between">
              <div className="heading">
                <h4 className="text-gray-700 font-bold font-playfairDisplay">
                  {localeString(language, "details")}
                </h4>
              </div>
              <div className="back-to-previous">
                <button
                  className="h-9 px-6 flex items-center"
                  onClick={handlePreviousButton}
                >
                  <span className=" inline-block mr-2">
                    <IoArrowBackOutline />
                  </span>
                </button>
              </div>
            </div>

            <div className="order-card-body bg-white p-6 mb-6">
              <div>
                <div className="order-body-heading flex justify-between border-b">
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
                            moment(myOrderDetailsData?.placed_at)?.format("D")
                          )
                        )}{" "}
                        {localeString(
                          language,
                          `${moment(myOrderDetailsData?.placed_at).format(
                            "MMMM"
                          )}`
                        )}{" "}
                        {commaRemover(
                          currencyFormatter(
                            language,
                            parseInt(
                              moment(myOrderDetailsData?.placed_at)?.format(
                                `YYYY`
                              )
                            )
                          )
                        )}
                      </span>
                    </p>
                  </div>
                  <div className="bg-[#FFEDCA] font-semibold text-xs p-1 rounded order-body-status mb-3 uppercase text-library-order-pending">
                    <p>{myOrderDetailsData?.status}</p>
                  </div>
                </div>
                <div className="order-book-image my-3">
                  {myOrderDetailsData?.order_items?.map(
                    (singleOrderDetails: any) => {
                      return (
                        <div key={singleOrderDetails?.id}>
                          <div className="single-order flex">
                            {!isEmpty(singleOrderDetails?.image_url) && (
                              <Image
                                src={
                                  width
                                    ? singleOrderDetails?.image_url
                                        ?.desktop_image
                                      ? singleOrderDetails?.image_url
                                          ?.desktop_image
                                      : "/no-image.png"
                                    : singleOrderDetails?.image_url?.tab_image
                                    ? singleOrderDetails?.image_url?.tab_image
                                    : "/no-image.png"
                                }
                                alt="gallery-img"
                                width={180}
                                height={150}
                                className="rounded"
                              />
                            )}
                            <div className="order-book-title ml-2">
                              <h5 className="text-gray-700 text-base">
                                {singleOrderDetails?.title}
                              </h5>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>

                <div className="order-info bg-gray-100 p-4 mt-5 rounded">
                  <div className="delivery-method flex justify-between  py-3 border-b">
                    <div className="delivery-method-title">
                      <h5 className="text-gray-700 font-bold font-playfairDisplay">
                        {localeString(language, "orderId")}
                      </h5>
                    </div>
                    <div className="delivery-method-content">
                      <p className="text-gray-600">
                        {myOrderDetailsData?.unique_id}
                      </p>
                    </div>
                  </div>
                  <div className="delivery-method flex justify-between  py-3 border-b">
                    <div className="delivery-method-title">
                      <h5 className="text-gray-700 font-bold font-playfairDisplay">
                        {localeString(language, "deliveryMethod")}
                      </h5>
                    </div>
                    <div className="delivery-method-content">
                      <p className="text-gray-600 capitalize">
                        {myOrderDetailsData?.delivery_type}
                      </p>
                    </div>
                  </div>
                  <div className="delivey-address flex justify-between py-3 border-b">
                    <div className="delivery-address-title">
                      <h5 className="text-gray-700 font-bold font-playfairDisplay">
                        {localeString(language, "deliveryAddress")}
                      </h5>
                    </div>
                    <div className="delivery-address-content">
                      <p className="text-gray-600">
                        {myOrderDetailsData?.address}
                      </p>
                    </div>
                  </div>
                  <div className="payment-info flex justify-between py-3">
                    <div className="payment-info-title">
                      <h5 className="text-gray-700 font-bold font-playfairDisplay">
                        {localeString(language, "paymentInfo")}
                      </h5>
                    </div>
                    <div className="payment-info-content">
                      <p className="text-gray-600 capitalize">
                        {myOrderDetailsData?.pay_type}
                      </p>
                    </div>
                  </div>
                  {myOrderDetailsData?.pay_status === "paid" && (
                    <div className="payment-info flex justify-between py-3">
                      <div className="payment-info-title">
                        <h5 className="text-gray-700 font-bold font-playfairDisplay">
                          {localeString(language, "tranxID")}
                        </h5>
                      </div>
                      <div className="payment-info-content">
                        <p className="text-gray-600">
                          {myOrderDetailsData?.trx_id}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="order-body-footer flex justify-between mt-3">
                <div className="track-order underline">
                  <Link
                    href={`/track-order?id=${myOrderDetailsData?.id}&order_id=${myOrderDetailsData?.unique_id}`}
                  >
                    {localeString(language, "trackOrder")}
                  </Link>
                </div>
                {myOrderDetailsData?.status_key === "order_placed" ? (
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
                      onConfirm={() => cancelMyOrder(myOrderDetailsData?.id)}
                      description={localeString(language, "deleteOrderMessage")}
                      icon={
                        <QuestionCircleOutlined
                          style={{
                            color: "red",
                          }}
                        />
                      }
                    >
                      <div className="bookButton">
                        <Button className="button-cancel px-5 md:px-16 lg:px-24 xl:px-36">
                          {localeString(language, "cancelOrder")}
                        </Button>
                      </div>
                    </Popconfirm>
                  </div>
                ) : myOrderDetailsData?.status_key === "order_confirmed" ? (
                  <div className="borrowBookButton">
                    {myOrderDetailsData?.pay_status !== "paid" && (
                      <Button
                        onClick={() => makePayment()}
                        className="button-primary px-5 ml-2 h-10 md:px-16 lg:px-24 xl:px-36 bg-library-primary uppercase text-white"
                      >
                        {localeString(language, "makePayment")}
                      </Button>
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
