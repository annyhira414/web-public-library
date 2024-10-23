import { localeString } from "@/lib/helpers/utils";
import { Col, Row } from "antd";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const SuccessSubmit = () => {
  const language = Cookies.get("language");
  return (
    <div className="pl-content-container my-6">
      <Row>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ offset: 6, span: 12 }}
          lg={{ offset: 6, span: 12 }}
          xl={{ offset: 6, span: 12 }}
        >
          <div className="membership-status p-8 bg-white rounded">
            <div className="membership-status  py-12">
              <div className="status-img flex justify-center">
                <Image
                  src="/images/membership/membershipNotify.svg"
                  alt=""
                  width={430}
                  height={230}
                />
              </div>
              <div className="status-text text-center">
                <h2 className="my-2.5 text-gray-700 font-playfairDisplay text-3xl font-bold capitalize">
                  {localeString(language, "congratulation")}
                </h2>
                <p className="text-[#595959] text-base capitalize">
                  {localeString(language, "submissionMsg")}
                </p>
              </div>
              <Link href="/membership">
                <div className="browse-btn mt-6 text-center hover:text-white">
                  <button className="px-24 py-2.5 rounded bg-library-primary text-white">
                    {localeString(language, "browseBtn")}
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
