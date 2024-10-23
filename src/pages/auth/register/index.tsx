import React, { FC } from "react";
import { RegisterForm } from "@/components/auth";
import { Col, Row } from "antd";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { localeString } from "@/lib/helpers/utils";
interface IRegister {
  language?: string;
}

const Register: FC<IRegister> = ({ language }) => {
  return (
    <div className="pl-content-container">
      <NextSeo
        title={`${localeString(language, "registerFavicon")}`}
        openGraph={{
          title: "Register",
        }}
      />
      {/* <Link href="/"> */}
      {/* <CreadentialHeading /> */}
      {/* </Link> */}
      <Row>
        <Col
          xs={{ offset: 1, span: 22 }}
          sm={{ offset: 1, span: 22 }}
          md={{ offset: 7, span: 10 }}
          lg={{ offset: 7, span: 10 }}
          xl={{ offset: 7, span: 10 }}
        >
          <RegisterForm language={language} />
        </Col>
      </Row>
    </div>
  );
};

export default Register;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      language: context?.req?.cookies?.["language"] || "bn",
    },
  };
};
