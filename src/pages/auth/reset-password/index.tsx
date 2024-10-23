import React from "react";
import { PasswordForm } from "@/components/auth";
import { Row, Col } from "antd";
import { localeString } from "@/lib/helpers/utils";

const ResetPassword = ({ language }: any) => {
  return (
    <div>
      <Row>
        <Col
          xs={{ span: 14, offset: 5 }}
          sm={{ span: 12, offset: 6 }}
          md={{ span: 10, offset: 7 }}
          lg={{ span: 8, offset: 8 }}
          xl={{ span: 8, offset: 8 }}
        >
          <h1 className="mt-20 mb-8 h-11 font-serif font-semibold text-3xl text-library-light-black text-center">
            {localeString(language, "resetPassword")}
          </h1>
          <PasswordForm formType="RESET_PASSWORD" language={language} />
        </Col>
      </Row>
    </div>
  );
};

export default ResetPassword;
