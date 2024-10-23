import {Row, Col} from "antd";
import React, {FC} from "react";
import {localeString} from "@/lib/helpers/utils";
import {QrGenerateForm} from "@/components/enter-library/Index";
import Cookies from "js-cookie";
import Link from "next/link";
import {useRouter} from "next/router";

interface IEnterLibrary {
  language: string;
  response: any;
  getQrcode: any;
}
const EnterLibrary: FC<IEnterLibrary> = () => {
  const lang = Cookies.get("language");
  const router = useRouter();

  return (
    <div>
      <Row className="pl-content-container mt-10 mb-24">
        <Col
          lg={{span: 6}}
          className="bg-library-white w-full md:h-52 md:mt-12 md:p-5"
        >
          <h2 className="xs:text-3xl section-title lg:text-base border-b font-semibold border-black ">
            {localeString(lang, "enterTheLibrary")}
          </h2>
          <div className="mt-4 flex justify-around md:flex-col">
            <Link href={"/enter-library"}>
              <div
                className={`${
                  router.pathname === "/enter-library"
                    ? "bg-library-order-sidebar-background text-library-primary p-2  font-semibold mb-2"
                    : " p-2 text-gray-700 hover:bg-library-order-sidebar-background hover:text-library-primary hover:font-semibold mb-2 transition-all "
                }`}
              >
                {localeString(lang, "EnterLibraryGenerate")}
              </div>
            </Link>
            <Link href={"/enter-library/previous-code-history"}>
              <div
                className={`${
                  router.pathname === "/enter-library/previous-code-history"
                    ? "bg-library-order-sidebar-background text-library-primary p-2  font-semibold mb-2"
                    : " p-2 text-gray-700 hover:bg-library-order-sidebar-background hover:text-library-primary hover:font-semibold mb-2 transition-all"
                }`}
              >
                {localeString(lang, "previousQRCode")}
              </div>
            </Link>
          </div>
        </Col>
        <Col className="mt-2" xs={{span: 24}} lg={{span: 14, offset: 2}}>
          <QrGenerateForm language={lang} />
        </Col>
      </Row>
    </div>
  );
};

export default EnterLibrary;
