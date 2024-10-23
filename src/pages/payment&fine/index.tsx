import React, {useState} from "react";
import {Sidebar, FineCurrent, FineHistory} from "@/components/payments&fine";
import Cookies from "js-cookie";
import {Button, Col, Row} from "antd";
import {localeString} from "@/lib/helpers/utils";

const PaymentFine = () => {
  const language = Cookies.get("language");
  const [isFine, isNotFine] = useState(false);

  const handleShowFine = () => {
    isNotFine(false);
  };

  const handleShowFineHistory = () => {
    isNotFine(true);
  };
  return (
    <div className="pl-content-container">
      <Row gutter={[16, 25]}>
        <Col
          xs={{span: 24}}
          sm={{span: 24}}
          md={{span: 6}}
          lg={{span: 6}}
          xl={{span: 6}}
          xxl={{span: 6}}
        >
          <Sidebar language={language} />
        </Col>
        <Col
          xs={{span: 24}}
          sm={{span: 24}}
          md={{span: 18}}
          lg={{span: 16}}
          xl={{span: 18}}
          xxl={{span: 18}}
        >
          <div className="lg:pl-10 w-full xl:w-10/12 md:pl-4 mb-24" >
            <h3 className="text-left section-title text-xl md:pt-12">
              {localeString(language, "fineFine")}
            </h3>
            <div className="w-full flex justify-between gap-4 pt-4">
              <div className="w-full">
                <Button
                  onClick={handleShowFine}
                  className={`${
                    !isFine
                      ? "myRequestPrimaryButton"
                      : " myRequesSecondarytButton"
                  }`}
                >
                  {localeString(language, "fineFine")}
                </Button>
              </div>
              <div className="w-full mb-6">
                <div className="w-full">
                  <Button
                    onClick={handleShowFineHistory}
                    className={`${
                      isFine
                        ? "myRequestPrimaryButton"
                        : " myRequesSecondarytButton"
                    }`}
                  >
                    {localeString(language, "fineHistory")}
                  </Button>
                </div>
              </div>
            </div>
            {!isFine && <FineCurrent language={language} />}
            {isFine && <FineHistory language={language} />}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PaymentFine;
