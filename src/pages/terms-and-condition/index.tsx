import { FC } from "react";
import { GetServerSideProps } from "next";
import { Static } from "@/components/static/Static";
import { getSession } from "next-auth/react";
import { getData, getDetails } from "@/lib/services";
import { IStaticPages, Ihistory } from "@/lib/model/static";
import { Col, Row } from "antd";
//import { humanize, titleCase } from "@/lib/helpers";

interface HistoryProps {
  pageData: IStaticPages;
}
const History: FC<HistoryProps> = ({ pageData }) => {
  return (
    <div>
      <div className="pb-12">
        <div className="flex justify-center text-3xl mt-10 text-black font-normal">
          Terms & Condition
        </div>
        <Row>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 24 }}
            xl={{ span: 24 }}
          >
            <Static pageData={pageData} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default History;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session: any = await getSession(context);

  const res = await getDetails(`public_library/pages`, "terms-and-condition");

  if (res?.success) {
    return {
      props: {
        pageData: res?.data,
      },
    };
  } else {
    return {
      props: {
        pageData: {},
      },
    };
  }
};
