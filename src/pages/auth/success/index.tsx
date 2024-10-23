import { SuccessMsg } from "@/components/auth";
import { localeString } from "@/lib/helpers/utils";
import { Col, Row } from "antd";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { FC } from "react";
interface ISuccess {
  language: string;
}

const Index: FC<ISuccess> = ({language}) => {
  return (
    <div className="bg-[#006A4E] py-16">
       <NextSeo
        title={`${localeString(language, "registerFavicon")}`}
        openGraph={{
          title: "Register",
        }}
      />
      <Row>
        <Col
          xs={{ offset: 1, span: 22 }}
          sm={{ offset: 1, span: 22 }}
          md={{ offset: 8, span: 8 }}
          lg={{ offset: 8, span: 8 }}
          xl={{ offset: 8, span: 8 }}
        >
          <SuccessMsg language={language} />
        </Col>
      </Row>
    </div>
  );
};

export default Index;
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      language: context?.req?.cookies?.["language"] || "bn",
    },
  };
};
