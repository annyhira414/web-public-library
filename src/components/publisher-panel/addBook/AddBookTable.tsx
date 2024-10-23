import React, {FC, useEffect, useState} from "react";
import {MdEdit} from "react-icons/md";
import type {TableColumnsType} from "antd";
import {Button, Col, Modal, Row, Space, Table, Tooltip, message} from "antd";
import {RiDeleteBin5Line} from "react-icons/ri";
import {humanize, localeString} from "@/lib/helpers/utils";
import Cookies from "js-cookie";
import {IbookTable, IMemorandumData} from "@/lib/model/publisher";
import {IoEyeSharp} from "react-icons/io5";
import {useRouter} from "next/router";
import {deleteData, updateData} from "@/lib/services";
import {useMediaQuery} from "usehooks-ts";
import {DataNotFound} from "@/components/common";
import {ActiveTableDetails} from "../ActiveTableDetails";

interface IAddBookTable {
  listData: IbookTable[];
  setListData: any;
  getListData: (memorandumsData: any) => void;
  setListID: (record: any) => void;
  memorandumsData: IMemorandumData | undefined;
}

export const AddBookTable: FC<IAddBookTable> = ({
  listData,
  getListData,
  setListID,
  memorandumsData,
}) => {
  const language: string | undefined = Cookies.get("language");
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowDetails, setIsShowDetails] = useState(false);
  const [detailsId, setDetailsId] = useState<number>();
  const [id, setId] = useState();

  const width = useMediaQuery("(min-width: 1024px)");

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

  const userToken = Cookies.get("token");

  const router = useRouter();

  const editItem = (record: any) => {
    setListID(record);
  };

  const detailsView = (id: number) => {
    setDetailsId(id);
    setIsShowDetails(true);
  };

  const handleOk = async (id: number | undefined) => {
    const res: any = await deleteData(
      `public_library/publisher_biblios/${id}`,
      "",
      userToken
    );
    if (res?.success) {
      setIsModalOpen(false);
      successMsg(localeString(language, "successfullyDeleted"));
      getListData(memorandumsData?.id);
    } else {
      errorMsg(res?.data?.error);
    }
  };

  useEffect(() => {
    getListData(memorandumsData?.id);
  }, []);

  const columns: TableColumnsType<IbookTable> = [
    {
      title: <>{localeString(language, "no")}</>,
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: <>{localeString(language, "title")}</>,
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <Tooltip className="w-28 line-clamp-2" title={record?.title}>
          {record?.title}
        </Tooltip>
      ),
    },
    {
      title: <>{localeString(language, "author")}</>,
      dataIndex: "author_name",
      key: "author_name",
      render: (text, record) => (
        <Tooltip className="w-28 line-clamp-2" title={record?.author_name}>
          {record?.author_name}
        </Tooltip>
      ),
    },
    {
      title: <>{localeString(language, "isbn")}</>,
      dataIndex: "isbn",
      key: "isbn",
      render: (text, record) => (
        <Tooltip className="w-28 line-clamp-2" title={record?.isbn}>
          {record?.isbn}
        </Tooltip>
      ),
    },
    {
      title: <>{localeString(language, "dateOfPublication")}</>,
      dataIndex: "publication_date",
      key: "publication_date",
    },
    {
      title: (
        <div className="flex justify-center">
          {localeString(language, "action")}
        </div>
      ),
      dataIndex: "action",
      key: "action",

      render: (text, record, item) => (
        <Space size="small">
          <div className="flex justify-center" role="group">
            <a
              className="hover:text-library-primary"
              onClick={() => editItem(record?.id)}
            >
              <Tooltip placement="top" title={"Edit"}>
                <MdEdit />
              </Tooltip>
            </a>
            <a
              className=" hover:text-library-royal-red text-library-royal-red pl-1"
              onClick={() => showModal(record?.id)}
            >
              <Tooltip placement="top" title={"Delete"}>
                <RiDeleteBin5Line />
              </Tooltip>
            </a>
            <a
              className="hover:text-library-primary pl-1"
              onClick={() => detailsView(record?.id)}
            >
              <Tooltip placement="top" title={"View"}>
                <IoEyeSharp />
              </Tooltip>
            </a>
          </div>
        </Space>
      ),
    },
    Table.EXPAND_COLUMN,
  ];

  const showModal = (id: any) => {
    setId(id);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (id: number | undefined) => {
    const params = {
      memorandum_id: id,
    };
    const res: any = await updateData(
      `public_library/memorandum_publishers/submit`,
      params,
      undefined,
      Cookies.get("token")
    );

    if (res?.success) {
      successMsg("successfully submitted");
      router.push("/publisher-panel/active-memorandum/successMsgPublisher");
    } else {
      errorMsg(res?.data?.data?.error);
    }
  };

  // const handleSubmit = async (id: number | undefined) => {
  //   const params = {
  //     memorandum_id: id,
  //   };
  //   const res: any = await updateData(
  //     `public_library/memorandum_publishers/submit`,
  //     params,
  //     undefined,
  //     Cookies.get("token")
  //   );

  //   if (res?.success) {
  //     const isFinalSubmitted = res?.data?.is_final_submitted;

  //     if (isFinalSubmitted) {
  //       // Do something when is_final_submitted is true
  //       console.log("The memorandum is already finally submitted.");
  //     } else {
  //       // Do something when is_final_submitted is false
  //       successMsg("Successfully submitted");
  //       router.push("/publisher-panel/active-memorandum/successMsgPublisher");
  //     }
  //   } else {
  //     errorMsg(res?.data?.data?.error);
  //   }
  // };

  return (
    <div>
      {listData?.length > 0 ? (
        <div>
          {isModalOpen && (
            <Modal
              className="bookTransferModel"
              title="Do you want to delete?"
              open={isModalOpen}
              onOk={() => handleOk(id)}
              onCancel={handleCancel}
            ></Modal>
          )}
          {isShowDetails ? (
            detailsId && (
              <ActiveTableDetails
                id={detailsId}
                setIsShowDetails={setIsShowDetails}
              />
            )
          ) : (
            <>
              {width ? (
                <div className="">
                  <div className="pt-10">
                    <Table
                      pagination={{
                        showQuickJumper: true,
                        defaultPageSize: 25,
                        position: ["bottomLeft"],
                        size: "default",
                      }}
                      size="small"
                      columns={columns}
                      dataSource={listData}
                    />
                  </div>

                  <div className="">
                    <div className="flex justify-between py-6 lg:flex lg:justify-end  md:flex md:justify-end gap-4">
                      <div className="w-40 bookButton">
                        <Button
                          htmlType="submit"
                          className="button-primary h-12"
                          block
                          onClick={() => handleSubmit(memorandumsData?.id)}
                        >
                          {localeString(language, "submit")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="pt-8">
                    {listData?.map((item: IbookTable) => (
                      <div className="pb-8" key={item?.id}>
                        <div className=" bg-white rounded-lg pb-6 ">
                          <Row>
                            <Col xs={{span: 24}} sm={{span: 24}}>
                              <div className="p-4 rounded-lg">
                                <>
                                  <div className="pb-4 flex justify-between w-30">
                                    <div>
                                      <span className="sub-title">
                                        {localeString(language, "title")}:
                                      </span>
                                      <span className="pl-2">
                                        {humanize(item?.title)}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <a
                                        className="hover:text-library-primary"
                                        onClick={() => editItem(item?.id)}
                                      >
                                        <Tooltip placement="top" title={"Edit"}>
                                          <MdEdit />
                                        </Tooltip>
                                      </a>
                                      <a className="pl-4 hover:text-library-royal-red text-library-royal-red">
                                        <Tooltip
                                          placement="top"
                                          title={"Delete"}
                                        >
                                          <RiDeleteBin5Line
                                            onClick={() => showModal(item?.id)}
                                          />
                                        </Tooltip>
                                      </a>
                                    </div>
                                  </div>
                                  <div className="pb-4">
                                    <span className="sub-title ">
                                      {localeString(language, "authorName")}:
                                    </span>
                                    <span className="pl-2">
                                      {humanize(item?.author_name)}
                                    </span>
                                  </div>
                                  <div className="pb-4">
                                    <span className="sub-title ">
                                      {localeString(
                                        language,
                                        "dateOfPublication"
                                      )}
                                      :
                                    </span>
                                    <span className="pl-2">
                                      {item?.publication_date}
                                    </span>
                                  </div>
                                  <div className="pb-4">
                                    <span className="sub-title ">
                                      {localeString(language, "isbn")}:
                                    </span>
                                    <span className="pl-2">{item?.isbn}</span>
                                  </div>
                                </>

                                <div className="pt-4 md:pt-0  w-full bookButton">
                                  <Button
                                    onClick={() => {
                                      detailsView(item?.id);
                                    }}
                                    className="button-primary w-full rounded-lg"
                                  >
                                    {localeString(language, "viewDetails")}
                                  </Button>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="">
                    <div className="flex justify-between py-6 gap-4">
                      <div className="w-full bookButton">
                        <Button
                          htmlType="submit"
                          className="button-primary h-12"
                          block
                          onClick={() => handleSubmit(memorandumsData?.id)}
                        >
                          {localeString(language, "submit")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          {contextHolder}
        </div>
      ) : (
        <div className="pt-8">
          <DataNotFound title={localeString(language, "noBookAdd")} />
        </div>
      )}
    </div>
  );
};

export default AddBookTable;
