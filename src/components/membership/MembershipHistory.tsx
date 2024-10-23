import { localeString } from "@/lib/helpers/utils";
import { getData } from "@/lib/services";
import { Col, Row, Table } from "antd";
import Cookies from "js-cookie";
import moment from "moment";
import React, { FC, useEffect, useState } from "react";
interface IMembershipHistory {}
export const MembershipHistory: FC<IMembershipHistory> = () => {
  const language = Cookies.get("language");
  const userToken = Cookies.get("token");
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColmuns] = useState([
    {
      title: `${localeString(language, "serial")}`,
      dataIndex: "serial",
      key: "serial",
    },
    {
      title: `${localeString(language, "date")}`,
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: `${localeString(language, "requestType")}`,
      dataIndex: "request_type",
      key: "request_type",
    },
    {
      title: `${localeString(language, "status")}`,
      dataIndex: "status",
      key: "status",
    },
  ]);
  const getMembershipRequestList = async () => {
    const res = await getData(
      `public_library/membership_requests`,
      {},
      language,
      userToken
    );
    if (res?.success) {
      const dataList = res?.data?.map((singleData: any, index: any) => {
        return {
          serial: index + 1,
          created_at: `${moment(
            singleData?.request_detail?.library?.created_at
          ).format("DD/MM/YYYY")}`,
          request_type: singleData?.request_type,
          status: singleData?.status,
        };
      });
      setDataSource(dataList);
    }
  };
  useEffect(() => {
    getMembershipRequestList();
  }, []);
  return (
    <div className="pl-content-container mt-6">
      <h3 className="font-bold font-playfairDisplay text-3xl text-library-light-black">
        {localeString(language, "membershipHistory")}
      </h3>
      <Row>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 24 }}
          xl={{ span: 24 }}
          xxl={{ span: 24 }}
          className="p-12"
        >
          <div className="membership-history-table">
            <Table
              pagination={false}
              dataSource={dataSource}
              columns={columns}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};
// const dataSources = [
//   {
//     key: "1",
//     serial: "Mike",
//     date: 32,
//     requestType: "Nai",
//     status: "Pending",
//     age: "12",
//   },
//   {
//     key: "2",
//     serial: "John",
//     date: 42,
//     requestType: "Banani",
//     status: "Accept",
//     age: "20",
//   },
//   {
//     key: "2",
//     serial: "John",
//     date: 42,
//     requestType: "Banani",
//     status: "Accept",
//     age: "20",
//   },
// ];
