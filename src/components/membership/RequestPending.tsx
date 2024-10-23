import React from "react";
import {IoMdCheckmark} from "react-icons/io";
import {BsInfo} from "react-icons/bs";
import Image from "next/image";
import {localeString} from "@/lib/helpers/utils";
import {Col, Row} from "antd";
import Cookies from "js-cookie";
export const RequestPending = () => {
  const language = Cookies.get("language");
  return (
    <div className="pl-content-container mt-8">
      <Row>
        <Col
          xs={{span: 24}}
          sm={{span: 24}}
          md={{span: 12}}
          lg={{span: 12}}
          xl={{span: 12}}
        >
          <div className="benefit pl-8 pr-16 py-8">
            <h4 className="font-playfairDisplay font-bold text-library-primary text-xl mb-4">
              {localeString(language, "instruction")}
            </h4>
            <div className="benefit-list flex">
              <div className="list-icon mt-1 mr-2 text-library-primary">
                <IoMdCheckmark />
              </div>
              <div className="list-text">
                <p className="text-gray-700 text-sm">
                  {localeString(language, "procssing")}
                </p>
              </div>
            </div>
            <div className="benefit-list flex my-3">
              <div className="list-icon mt-1 mr-2 text-library-primary">
                <IoMdCheckmark />
              </div>
              <div className="list-text">
                <p className="text-gray-700 text-sm">
                  {localeString(language, "acceptMsg")}
                </p>
              </div>
            </div>
            <div className="benefit-list flex ">
              <div className="list-icon mt-1 mr-2 text-library-primary">
                <IoMdCheckmark />
              </div>
              <div className="list-text">
                <p className="text-gray-700 text-sm">
                  {localeString(language, "rejectMsg")}
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
                  {localeString(language, "notificationMsg")}
                </p>
              </div>
            </div>
          </div>
        </Col>
        <Col
          xs={{span: 24}}
          sm={{span: 24}}
          md={{span: 12}}
          lg={{span: 12}}
          xl={{span: 12}}
        >
          <div className="membership-status p-8  bg-white rounded">
            <h4 className="font-bold font-playfairDisplay text-grey-900 mb-4">
              {localeString(language, "yourMembership")}
            </h4>
            <div className="membership-status bg-[#FFFAE8] py-12">
              <div className="status-img flex justify-center">
                <Image
                  src="/images/membership/membershipStatus.png"
                  alt=""
                  width={30}
                  height={30}
                />
              </div>
              <div className="status-text text-center">
                <h2 className="my-2.5 text-[#95390D] font-playfairDisplay text-xl font-semibold">
                  {localeString(language, "requestPending")}...
                </h2>
                <span className="inline-block mr-1 bg-[#FD8E39] text-white rounded-full">
                  <BsInfo />
                </span>
                <span className="text-library-primary text-xs">
                  {localeString(language, "applicationSubmission")}
                </span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
