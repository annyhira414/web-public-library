import {
  DocumentDetails,
  ProfileSidebar,
} from "@/components/user/my-profile";
import { localeString } from "@/lib/helpers/utils";
import { Col, Row } from "antd";
import Cookies from "js-cookie";
import { NextSeo } from "next-seo";
import React, { FC } from "react";
interface IPasswordChange {}
const PasswordChange: FC<IPasswordChange> = () => {
  const language = Cookies.get("language");
  return (
    <>
      <NextSeo
        title={`${localeString(language, "documentDetailsTitle")}`}
        description="Document Details"
        openGraph={{
          title: "Public Library : Document Details",
          description:
            "The public libraries' Document Details Will Be Shown here",
          images: [
            {
              url: "/library_logo.svg",
              alt: "Public Library : Document Details",
            },
          ],
        }}
      />
      <div className="my-6">
        <div className="pl-content-container">
          <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 6 }}
              lg={{ span: 6 }}
              xl={{ span: 6 }}
              xxl={{ span: 8 }}
            >
              <ProfileSidebar />
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 18 }}
              lg={{ span: 18 }}
              xl={{ span: 16 }}
              xxl={{ span: 16 }}
            >
              <DocumentDetails />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default PasswordChange;
