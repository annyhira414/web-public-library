import { MyAddress, ProfileSidebar } from "@/components/user/my-profile";
import { localeString } from "@/lib/helpers/utils";
import { Col, Row } from "antd";
import locale from "antd/es/date-picker/locale/en_US";
import Cookies from "js-cookie";
import { NextSeo } from "next-seo";
import React from "react";

const Address = () => {
  const language = Cookies.get("language");
  return (
    <>
      <NextSeo
        title={`${localeString(language, "myAddressTitle")}`}
        description="User Address"
        openGraph={{
          title: "Public Library : My Address",
          description: "The public libraries' User Address Will Be Shown here",
          images: [
            {
              url: "/library_logo.svg",
              alt: "Public Library : My Address",
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
              <MyAddress />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Address;
