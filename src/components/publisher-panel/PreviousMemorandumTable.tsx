import React, {FC, useState} from "react";
import type {TableColumnsType} from "antd";
import {localeString} from "@/lib/helpers/utils";
import Cookies from "js-cookie";
import {
  IMemorandumDetailsData,
  IBookPublisher,
  ITableDetailsProps,
} from "@/lib/model/publisher";
import {IoEyeSharp} from "react-icons/io5";
import {useMediaQuery} from "usehooks-ts";
import {Button, Col, Row, Space, Table, Tooltip} from "antd";
import {PreviousTableDetails} from "./PreviousTableDetails";

interface IAddBookTable {
  key?: React.Key;
  date?: string;
  title?: string;
  MemorandumDetailsData: IMemorandumDetailsData | undefined;
}

export const PreviousMemorandumTable: FC<IAddBookTable> = ({
  MemorandumDetailsData,
}) => {
  const language: string | undefined = Cookies.get("language");
  const [tableDetailsProps, setTableDetailsProps] =
    useState<ITableDetailsProps | null>();

  const width = useMediaQuery("(min-width: 1024px)");

  const columns: TableColumnsType<IBookPublisher> = [
    {
      title: <>{localeString(language, "no")}</>,
      dataIndex: "no",
      key: "no",
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
      dataIndex: "authors",
      key: "authors",
      render: (text, record) => (
        <Tooltip className="w-28 line-clamp-2" title={record?.authors}>
          {record?.authors}
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
        <Space className="flex justify-center" size="middle">
          <a
            className="hover:text-library-primary"
            onClick={() => setTableDetailsProps({id: record?.id})}
          >
            <IoEyeSharp />
          </a>
        </Space>
      ),
    },
    Table.EXPAND_COLUMN,
  ];

  return (
    <>
      {tableDetailsProps ? (
        <div className="">
          <PreviousTableDetails
            language={language}
            tableDetailsProps={tableDetailsProps}
            onBack={() => setTableDetailsProps(null)}
          />
        </div>
      ) : (
        <div className="">
          {width ? (
            <div className="pt-10 pb-10">
              <Table
                className="pb-12"
                pagination={{
                  showQuickJumper: true,
                  defaultPageSize: 25,
                  position: ["bottomLeft"],
                  size: "default",
                }}
                columns={columns}
                dataSource={MemorandumDetailsData?.publisher_biblios}
              />
            </div>
          ) : (
            <>
              <div className="">
                <div className="pb-8">
                  <div className="rounded-lg pb-8 ">
                    <Row>
                      <Col xs={{span: 24}} sm={{span: 24}}>
                        <div className="">
                          {MemorandumDetailsData?.publisher_biblios?.map(
                            (item: IBookPublisher) => (
                              <div key={item?.id} className="pb-8">
                                <div className="bg-white  rounded-lg p-4">
                                  <div className="pb-4 flex justify-between w-30">
                                    <div>
                                      <span className="sub-title">
                                        {localeString(language, "title")}:
                                      </span>
                                      <span className="pl-2">
                                        {item?.title}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="pb-4">
                                    <span className="sub-title ">
                                      {localeString(language, "authorName")}:
                                    </span>
                                    <span className="pl-2">
                                      {item?.authors}
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
                                  <div className="py-4 md:pt-0  bookButton">
                                    <Button
                                      onClick={() => {
                                        setTableDetailsProps({id: item?.id});
                                      }}
                                      className="px-12 button-primary  w-full rounded-lg"
                                    >
                                      {localeString(language, "viewDetails")}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
