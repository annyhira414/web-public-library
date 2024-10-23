/** @format */

import React, { FC } from "react";
import { Col, Row, Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import { HeaderIcon } from "@/components/header";

import Image from "next/image";

interface IFooterTop {
  language: string | undefined;
}

export const FooterTop: FC<IFooterTop> = ({ language }) => {
  return (
    <Row>
      <Col>
        <div className="flex mt-12">
          <HeaderIcon language={language} />
        </div>
      </Col>
    </Row>
  );
};
