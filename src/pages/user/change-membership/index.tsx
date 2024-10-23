import { MembershipBenefit, UpgradeMembership } from "@/components/membership";
import { localeString } from "@/lib/helpers/utils";
import { getData } from "@/lib/services";
import { Col, Row, message } from "antd";
import Cookies from "js-cookie";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";

interface IChangeMembership {}
const ChangeMembership: FC<IChangeMembership> = () => {
  const language = Cookies.get("language");
  const userToken = Cookies.get("token");
  const [messageApi, contextHolder] = message.useMessage();
  const [memberDetails, setMemberDetails] = useState<any>();
  const errorMsg = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };
  const getMeberDetails = async () => {
    const res = await getData(
      `public_library/membership_requests/details`,
      {},
      language,
      userToken
    );
    if (res?.success) {
      setMemberDetails(res?.data?.request_detail);
    } else {
      errorMsg(res?.data?.error);
    }
  };
  useEffect(() => {
    getMeberDetails();
  }, []);
  return (
    <div className="pl-content-container mt-6">
      {contextHolder}
      <Row gutter={[25, 25]}>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
          xl={{ span: 12 }}
        >
          <MembershipBenefit />
        </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
          xl={{ span: 12 }}
        >
          <div className="p-12 border">
            <div className="member-heading flex justify-between mb-3">
              <h2 className="font-playfairDisplay text-xl font-semibold">
                {localeString(language, "membership")}
              </h2>
            </div>
            <div className="membership-status bg-[#E0FFED] p-12">
              <div className="status-img flex justify-center ">
                <Image
                  src="/images/successIcon.png"
                  alt=""
                  width={30}
                  height={30}
                />
              </div>
              <div className="status-text text-center">
                <h2 className="my-2.5 text-library-primary font-playfairDisplay text-xl font-semibold">
                  {memberDetails?.membership_category}
                </h2>
                <span className="text-library-primary text-xs">
                  {localeString(language, "membershipCategory")}
                </span>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Row gutter={[25, 25]}>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
          xl={{ span: 12 }}
        >
          <h3 className="font-bold text-3xl font-playfairDisplay p-10">
            {localeString(language, "upgradeMembership")}
          </h3>
        </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
          xl={{ span: 12 }}
          className="pt-6"
        >
          <UpgradeMembership />
        </Col>
      </Row>
    </div>
  );
};

export default ChangeMembership;
