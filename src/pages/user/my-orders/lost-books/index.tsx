import {  LostBook } from "@/components/user/my-orders";
import { OrderStatus } from "@/components/user/my-orders/OrderStatus";
import { localeString } from "@/lib/helpers/utils";
import { Col, Row } from "antd";
import Cookies from "js-cookie";
import { NextSeo } from "next-seo";
import React from "react";

const LostBooks = () => {
  const language = Cookies.get("language");
  return (
    <div className="my-6">
      <NextSeo
        title={`${localeString(language, "lostBookTitle")}`}
        description="The public libraries' Return Books Will SShown here"
        openGraph={{
          title: "Public Library : Lost Books",
          description:
            "The public libraries' all notice has been published here",
          images: [
            {
              url: "/library_logo.svg",
              alt: "Public Library : Lost Books",
            },
          ],
        }}
      />
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
            <OrderStatus />
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 18 }}
            lg={{ span: 18 }}
            xl={{ span: 16 }}
            xxl={{ span: 16 }}
          >
            <LostBook />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LostBooks;
