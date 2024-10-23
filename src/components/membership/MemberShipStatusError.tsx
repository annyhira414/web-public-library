import { localeString } from "@/lib/helpers/utils";
import { getData } from "@/lib/services";
import { Button, Col, Row } from "antd";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsInfo } from "react-icons/bs";
import { IoMdCheckmark } from "react-icons/io";

export const MembershipStatusError = () => {
  const language = Cookies.get("language");
  const userToken = Cookies.get("token");
  const router = useRouter();
  const [membershipCategory, setMembershipCategory] = useState<any>();

  const getMembershipDetails = async () => {
    const res = await getData(
      `public_library/membership_requests/details`,
      {},
      language,
      userToken
    );
    if (res?.success) {
      setMembershipCategory(res?.data?.request_detail?.membership_category);
    }
  };
  useEffect(() => {
    getMembershipDetails();
  }, []);
  const handleErroeEdit = () => {
    if (membershipCategory === "general")
      router.push(
        "/membership/general-membership?membershipType=general&&mode=edit"
      );
    if (membershipCategory === "student")
      router.push(
        "/membership/student-membership?membershipType=student&&mode=edit"
      );
    if (membershipCategory === "child")
      router.push(
        "/membership/child-membership?membershipType=child&&mode=edit"
      );
  };

  return (
    <div className="pl-content-container mt-8">
      <Row>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
          xl={{ span: 12 }}
        >
          <div className="benefit pl-8 pr-16 py-8">
            <h4 className="font-playfairDisplay font-bold text-library-primary text-xl mb-4">
              {localeString(language, "instruction")}
            </h4>
            <div className="benefit-list flex">
              <div className="list-icon mt-1 mr-2 text-library-primary">
                <span className="inline-block mr-1 bg-[#FD8E39] text-white rounded-full">
                  <BsInfo />
                </span>
              </div>
              <div className="list-text">
                <p className="text-gray-700 text-sm">
                  {localeString(language, "fatherName")}
                </p>
              </div>
            </div>
            <div className="benefit-list flex my-3">
              <div className="list-icon mt-1 mr-2 text-library-primary">
                <span className="inline-block mr-1 bg-[#FD8E39] text-white rounded-full">
                  <BsInfo />
                </span>
              </div>
              <div className="list-text">
                <p className="text-gray-700 text-sm">
                  {localeString(language, "faultyAddress")}
                </p>
              </div>
            </div>
            <div className="benefit-list flex ">
              <div className="list-icon mt-1 mr-2 text-library-primary">
                <span className="inline-block mr-1 bg-[#FD8E39] text-white rounded-full">
                  <BsInfo />
                </span>
              </div>
              <div className="list-text">
                <p className="text-gray-700 text-sm">
                  {localeString(language, "unclearImg")}
                </p>
              </div>
            </div>
            <div className="benefit-list flex my-3">
              <div className="list-icon mt-1 mr-2 text-library-primary">
                <IoMdCheckmark />
              </div>
              <div className="list-text ">
                <p className="text-gray-700 text-sm">
                  {localeString(language, "useOfLibraryMaterials")}
                </p>
              </div>
            </div>
            <div className="benefit-list flex">
              <div className="list-icon mt-1 mr-2 text-library-primary">
                <IoMdCheckmark />
              </div>
              <div className="list-text">
                <p className="text-gray-700 text-sm">
                  {localeString(language, "opportunities")}
                </p>
              </div>
            </div>
          </div>
        </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
          xl={{ span: 12 }}
        >
          <div className="membership-status p-8 bg-white rounded">
            <h4 className="font-bold font-playfairDisplay text-grey-900 mb-4">
              {localeString(language, "yourMembership")}
            </h4>
            <div className="membership-status bg-[#FFFAE8] py-12 text-center">
              <span className="px-2 rounded text-xs font-bold text-library-primary bg-library-order-sidebar-background">
                {localeString(language, "acctionRequired")}
              </span>
              <div className="status-img flex justify-center mt-3">
                <Image
                  src="/images/membership/membershipStatus.png"
                  alt=""
                  width={30}
                  height={30}
                />
              </div>
              <div className="status-text ">
                <h2 className="my-2.5 text-[#95390D] font-playfairDisplay text-xl font-semibold">
                  {localeString(language, "correcttionRequired")}...
                </h2>
                <span className="inline-block mr-1 bg-[#FD8E39] text-white rounded-full">
                  <BsInfo />
                </span>
                <span className="text-library-primary text-xs">
                  {localeString(language, "informationCorrection")}
                </span>
              </div>
            </div>
          </div>
          <div className="error-edit flex justify-end mt-4">
            <Button
              className="font-semibold bg-library-primary px-16 h-10 rounded text-white hover:bg-white hover:text-library-primary"
              onClick={handleErroeEdit}
            >
              {localeString(language, "edit")}
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};
