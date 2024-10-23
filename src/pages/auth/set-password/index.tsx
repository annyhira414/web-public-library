import React, { FC } from "react";
import { PasswordForm } from "@/components/auth";
import { Row, Col } from "antd";
import CreadentialHeading from "@/components/auth/CreadentialHeading";
import { GetServerSideProps } from "next";
import { localeString } from "@/lib/helpers/utils";
import { NextSeo } from "next-seo";
interface IPassword {
  language: string;
}

const setPassword: FC<IPassword> = ({ language }) => {
  return (
    <div className="pl-content-container">
      <NextSeo
        title={`${localeString(language, "registerFavicon")}`}
        openGraph={{
          title: "Register",
        }}
      />
      {/* <CreadentialHeading /> */}

      <Row>
        <Col
          xs={{ offset: 1, span: 22 }}
          sm={{ offset: 1, span: 22 }}
          md={{ offset: 8, span: 8 }}
          lg={{ offset: 8, span: 8 }}
          xl={{ offset: 8, span: 8 }}
          xxl={{ offset: 8, span: 8 }}
        >
          <div className="set-password-area bg-white border-gray-300 rounded-2xl my-20 shadow-sm  ">
            <h3 className="py-8 font-[playfairDisplay] font-bold text-3xl text-library-light-black text-center ">
              {localeString(language, "setPassword")}
            </h3>
            <PasswordForm formType="SET_PASSWORD" language={language} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default setPassword;
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      language: context?.req?.cookies?.["language"] || "bn",
    },
  };
};
