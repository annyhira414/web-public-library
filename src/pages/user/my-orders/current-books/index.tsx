import { CurrentBooks } from "@/components/user/my-orders";
import { OrderStatus } from "@/components/user/my-orders/OrderStatus";
import { localeString } from "@/lib/helpers/utils";
import { Col, Row } from "antd";
import Cookies from "js-cookie";
import { NextSeo } from "next-seo";
import React, { FC } from "react";

interface ICurrentOrder {}

const CurrentOrder: FC<ICurrentOrder> = ({}) => {
  const language = Cookies.get("language");
  return (
    <div className="my-6">
      <NextSeo
        title={`${localeString(language, "currentOrderTitle")}`}
        description="The public libraries' Current Books Will SShown here"
        openGraph={{
          title: "Public Library : Current Books",
          description:
            "The public libraries' all notice has been published here",
          images: [
            {
              url: "/library_logo.svg",
              alt: "Public Library : Current Books",
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
            <CurrentBooks />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CurrentOrder;
