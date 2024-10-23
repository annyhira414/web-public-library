import {FC} from "react";
import {GetStaticProps} from "next";
import {Static} from "@/components/static/Static";
import {getDetails} from "@/lib/services";
import {IStaticPages} from "@/lib/model/static";
import {Col, Row} from "antd";
import Cookies from "js-cookie";
import {localeString} from "@/lib/helpers/utils";
import {NextSeo} from "next-seo";

interface ContactUsProps {
  pageData: IStaticPages;
}
const ContactUs: FC<ContactUsProps> = ({pageData}) => {
  const language: string | undefined = Cookies.get("language");

  return (
    <div>
      <NextSeo
        title={localeString(language, "publicLibraryContactUs")}
        description={pageData?.description}
        openGraph={{
          title: "Public Library: ContactUs",
          description: pageData?.description,
          images: [
            {
              url: "/library_logo.svg",
              alt: "Public Library: ContactUs",
            },
          ],
        }}
      />
      <div className="pb-12">
        <div className="flex justify-center text-3xl mt-10 text-black font-normal">
          {localeString(language, "contactUs")}
        </div>
        <Row>
          <Col
            xs={{span: 24}}
            sm={{span: 24}}
            md={{span: 24}}
            lg={{span: 24}}
            xl={{span: 24}}
          >
            <Static pageData={pageData} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ContactUs;

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await getDetails(`public_library/pages`, "contact-us");

  if (res?.success) {
    return {
      props: {
        pageData: res?.data,
      },
      revalidate: 3 * 3600,
    };
  } else {
    return {
      props: {
        pageData: {},
      },
    };
  }
};
