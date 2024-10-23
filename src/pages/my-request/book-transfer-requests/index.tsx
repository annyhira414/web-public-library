import React, {FC, useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import Cookies from "js-cookie";
import {Col, Row, Button, Modal, message} from "antd";
import {MyRequestCommon} from "@/components/my-request/MyRequest";
import {getData, patchData} from "@/lib/services";
import {AiFillCaretDown, AiFillCaretUp} from "react-icons/ai";
import {
  commaRemover,
  currencyFormatter,
  localeString,
} from "@/lib/helpers/utils";
import {SelectControl} from "@/components/controls/form-controls/SelectControl";
import {useRouter} from "next/router";
import {DataNotFound} from "../../../components/common/DataNotFound";
import {
  IStatusItem,
  IBookTransfer,
  IDetailsData,
  IOptionBookTransferRequests,
} from "../../../lib/model/myRequest/index";
import moment from "moment";

interface IBookTransferRequests {
  language: string | undefined;
}
const BookTransferRequests: FC<IBookTransferRequests> = ({}) => {
  const language: string | undefined = Cookies.get("language");
  const userToken: number | string | undefined = Cookies.get("token");

  const [bookTransfer, setBookTransfer] = useState<IBookTransfer[]>([]);
  const [perPage, setPerPage] = useState<number>();
  const [detailsData, setDetailsData] = useState<IDetailsData>();
  const [messageApi, contextHolder] = message.useMessage();
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
  let router = useRouter();

  const {
    handleSubmit,
    control,
    reset,
    getValues,
    watch,
    formState: {errors, isDirty, isValid, isSubmitting},
  } = useForm<any>({
    defaultValues: {
      status: router?.query?.status ? router?.query?.status : null,
    },
    mode: "all",
  });

  const statusOptions = [
    {
      id: 1,
      value: "",
      name: <>{localeString(language, "allStatus")}</>,
    },
    {
      id: 2,
      value: "accepted",
      name: <>{localeString(language, "accepted")}</>,
    },

    {
      id: 3,
      value: "pending",
      name: <>{localeString(language, "pending")}</>,
    },
    {
      id: 4,
      value: "rejected",
      name: <>{localeString(language, "rejected")}</>,
    },
    {
      id: 5,
      value: "cancelled",
      name: <>{localeString(language, "cancelled")}</>,
    },
  ];
  const [showMoreAccepted, setShowMoreAccepted] = useState<number | null>(null);

  const [statusData, setStatusData] = useState<IOptionBookTransferRequests[]>(
    []
  );

  useEffect(() => {
    fetchStatus();
  }, []);
  const fetchStatus = async () => {
    setStatusData(
      statusOptions?.map((item: IStatusItem) => ({
        value: item?.value,
        label: item?.name,
      }))
    );
  };
  const status = watch("status");

  const bookTransferData = async () => {
    const res = await getData(
      `public_library/book_transfer_orders`,
      {
        per_page: perPage,
        // status: status,
        ...(status && {status}),
      },
      language,
      Cookies.get("token")
    );
    if (res?.success) {
      setBookTransfer(res?.data);
    }
  };

  useEffect(() => {
    bookTransferData();
    router.push({
      pathname: "/my-request/book-transfer-requests",
      query: {
        status,
      },
    });
  }, [status]);

  const handleShowMoreAccepted = async (id: any) => {
    setShowMoreAccepted((prev) => (prev === id ? null : id));
    const res = await getData(
      `public_library/book_transfer_orders/${id}`,
      {},
      language,
      Cookies.get("token")
    );
    if (res?.success) {
      setDetailsData(res?.data);
    }
  };

  const handleShowLessAccepted = () => {
    setShowMoreAccepted(null);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState();
  const showModal = (id: any) => {
    setId(id);
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    const res: any = await patchData(
      `public_library/book_transfer_orders/${id}/cancel`,
      {},
      Cookies.get("token"),
      language
    );
    setIsModalOpen(false);
    if (res?.success) {
      successMsg(res?.success);
      bookTransferData();
    } else {
      errorMsg(res?.data?.error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="pl-content-container">
        <Row gutter={[16, 25]}>
          <Col
            xs={{span: 24}}
            sm={{span: 24}}
            md={{span: 6}}
            lg={{span: 6}}
            xl={{span: 6}}
            xxl={{span: 6}}
          >
            <MyRequestCommon language={language} />
          </Col>

          <Col
            xs={{span: 24}}
            sm={{span: 24}}
            md={{span: 18}}
            lg={{span: 18}}
            xl={{span: 18}}
            xxl={{span: 18}}
          >
            <>
              {isModalOpen && (
                <Modal
                  className="bookTransferModel"
                  title="Do you want to cancel?"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                ></Modal>
              )}

              <div className="lg:pl-10 md:pl-6 w-full xl:w-10/12 pb-12">
                <div className="pt-4">
                  <div>
                    <div className="lg:pt-10 md:pt-6 w-full lg:flex lg:justify-end md:flex md:justify-between  md:mt-2">
                      <div className="w-full">
                        <h3 className="section-title ">
                          {localeString(language, "bookTransferRequest")}
                        </h3>
                      </div>

                      <div className="w-full md:w-72 md:pl-6 md:mt-1 mt-4 ">
                        <div className="lg:w-full">
                          <SelectControl
                            name="status"
                            control={control}
                            errors={errors}
                            options={statusData}
                            placeholder={localeString(language, "selectStatus")}
                            className=""
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      {bookTransfer?.length < 1 ? (
                        <div className="pt-6">
                          <DataNotFound
                            title={localeString(language, "bookTransferText")}
                          />
                        </div>
                      ) : (
                        <>
                          {bookTransfer?.map(
                            (item: IBookTransfer, index: number) => (
                              <div key={index}>
                                <div className="pt-4">
                                  <div className="py-8 bg-white px-8 rounded-lg">
                                    <div className="flex justify-between pb-2">
                                      <div>
                                        {localeString(language, "status")}
                                      </div>
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
                                      <div>
                                        {localeString(language, "bookName")}
                                      </div>
                                      <div>{item?.biblio}</div>
                                    </div>

                                    <hr className="status-hr-color" />

                                    {!showMoreAccepted ||
                                    showMoreAccepted !== item?.id ? (
                                      <>
                                        {item?.status === "pending" ? (
                                          <div className="flex justify-between section-sub-title-light  ">
                                            <div className="pt-4">
                                              <Button
                                                danger
                                                onClick={() =>
                                                  showModal(item?.id)
                                                }
                                              >
                                                {localeString(
                                                  language,
                                                  "cancelBookTransfer"
                                                )}
                                              </Button>
                                            </div>

                                            <div className="">
                                              <button
                                                className="flex justify-between pt-4"
                                                onClick={() =>
                                                  handleShowMoreAccepted(
                                                    item?.id
                                                  )
                                                }
                                              >
                                                {localeString(
                                                  language,
                                                  "seeDetails"
                                                )}
                                                <div className="items-center pl-1 pt-1">
                                                  <AiFillCaretDown />
                                                </div>
                                              </button>
                                            </div>
                                          </div>
                                        ) : (
                                          <>
                                            <div className="flex justify-end section-sub-title-light ">
                                              <button
                                                className="flex justify-between pt-4"
                                                onClick={() =>
                                                  handleShowMoreAccepted(
                                                    item?.id
                                                  )
                                                }
                                              >
                                                {localeString(
                                                  language,
                                                  "seeDetails"
                                                )}
                                                <div className="items-center pl-1 pt-1">
                                                  <AiFillCaretDown />
                                                </div>
                                              </button>
                                            </div>
                                          </>
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        <>
                                          <div className="flex justify-between py-2">
                                            <div>
                                              {" "}
                                              {localeString(
                                                language,
                                                "preferredLibrary"
                                              )}
                                            </div>
                                            <div>
                                              {
                                                detailsData?.receiver_library
                                                  ?.name
                                              }
                                            </div>
                                          </div>
                                          <hr className="status-hr-color" />
                                          <div className="flex justify-between py-2">
                                            <div>
                                              {localeString(
                                                language,
                                                "requestdate"
                                              )}
                                            </div>
                                            <span className="">
                                              {detailsData?.created_at ? (
                                                <>
                                                  {currencyFormatter(
                                                    language,
                                                    parseInt(
                                                      moment(
                                                        detailsData?.created_at
                                                      )?.format("D")
                                                    )
                                                  )}{" "}
                                                  {localeString(
                                                    language,
                                                    `${moment(
                                                      detailsData?.created_at
                                                    ).format("MMMM")}`
                                                  )}{" "}
                                                  {commaRemover(
                                                    currencyFormatter(
                                                      language,
                                                      parseInt(
                                                        moment(
                                                          detailsData?.created_at
                                                        )?.format(`YYYY`)
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
                                          <div className="flex justify-between py-2">
                                            <div>
                                              {" "}
                                              {localeString(
                                                language,
                                                "arrivalDate"
                                              )}
                                            </div>

                                            <span className="">
                                              {detailsData?.arrived_at ? (
                                                <>
                                                  {currencyFormatter(
                                                    language,
                                                    parseInt(
                                                      moment(
                                                        detailsData?.arrived_at
                                                      )?.format("D")
                                                    )
                                                  )}{" "}
                                                  {localeString(
                                                    language,
                                                    `${moment(
                                                      detailsData?.arrived_at
                                                    ).format("MMMM")}`
                                                  )}{" "}
                                                  {commaRemover(
                                                    currencyFormatter(
                                                      language,
                                                      parseInt(
                                                        moment(
                                                          detailsData?.arrived_at
                                                        )?.format(`YYYY`)
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
                                        </>
                                        <>
                                          {item?.status === "pending" ? (
                                            <div className="flex justify-between section-sub-title-light  ">
                                              <div className="pt-4">
                                                <Button
                                                  danger
                                                  className=""
                                                  onClick={() =>
                                                    showModal(item?.id)
                                                  }
                                                >
                                                  {localeString(
                                                    language,
                                                    "cancelBookTransfer"
                                                  )}
                                                </Button>
                                              </div>

                                              <div className="">
                                                <button
                                                  className="flex justify-between pt-4"
                                                  onClick={
                                                    handleShowLessAccepted
                                                  }
                                                >
                                                  {localeString(
                                                    language,
                                                    "seeLess"
                                                  )}
                                                  <div className="items-center pl-1 pt-1">
                                                    <AiFillCaretUp />
                                                  </div>
                                                </button>
                                              </div>
                                            </div>
                                          ) : (
                                            <>
                                              <div className="flex justify-end section-sub-title-light ">
                                                <button
                                                  className="flex justify-between pt-4"
                                                  onClick={
                                                    handleShowLessAccepted
                                                  }
                                                >
                                                  {localeString(
                                                    language,
                                                    "seeLess"
                                                  )}
                                                  <div className="items-center pl-1 pt-1">
                                                    <AiFillCaretUp />
                                                  </div>
                                                </button>
                                              </div>
                                            </>
                                          )}
                                        </>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </>
                      )}
                      {contextHolder}
                    </div>
                  </div>
                </div>
              </div>
            </>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default BookTransferRequests;
