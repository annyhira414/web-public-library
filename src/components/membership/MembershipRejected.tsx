import { localeString } from "@/lib/helpers/utils";
import { Col, Row } from "antd";
import Cookies from "js-cookie";
import Image from "next/image";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsInfo } from "react-icons/bs";

export const MembershipRejected = () => {
  const language = Cookies.get("language");
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
            {localeString(language, "reason")}
            </h4>
            <div className="benefit-list flex">
              <div className="list-icon mt-1 mr-2 text-library-royal-red">
                <AiOutlineClose />
              </div>
              <div className="list-text">
                <p className="text-gray-700 text-sm">
                  {localeString(language, "bookCollection")}
                </p>
              </div>
            </div>
            <div className="benefit-list flex my-3">
              <div className="list-icon mt-1 mr-2 text-library-royal-red">
                <AiOutlineClose />
              </div>
              <div className="list-text">
                <p className="text-gray-700 text-sm">
                  {localeString(language, "meterials")}
                </p>
              </div>
            </div>
            <div className="benefit-list flex ">
              <div className="list-icon mt-1 mr-2 text-library-royal-red">
                <AiOutlineClose />
              </div>
              <div className="list-text">
                <p className="text-gray-700 text-sm">
                  {localeString(language, "discount")}
                </p>
              </div>
            </div>
            <div className="benefit-list flex my-3">
              <div className="list-icon mt-1 mr-2 text-library-royal-red">
                <AiOutlineClose />
              </div>
              <div className="list-text ">
                <p className="text-gray-700 text-sm">
                  {localeString(language, "useOfLibraryMaterials")}
                </p>
              </div>
            </div>
            <div className="benefit-list flex">
              <div className="list-icon mt-1 mr-2 text-library-royal-red">
                <AiOutlineClose />
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
            <div className="membership-status bg-[#FFF0F0] py-12">
              <div className="status-img flex justify-center">
                <Image
                  src="/images/membership/reject.png"
                  alt=""
                  width={30}
                  height={30}
                />
              </div>
              <div className="status-text text-center">
                <h2 className="my-2.5 text-[#D81D1E] font-playfairDisplay text-xl font-semibold">
                {localeString(language, "requestReject")}
                </h2>
                <span className="inline-block mr-1 bg-[#D81D1E] text-white rounded-full">
                  <BsInfo />
                </span>
                <span className="text-library-primary text-xs">
                {localeString(language, "requestRejectMsg")}
                </span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
