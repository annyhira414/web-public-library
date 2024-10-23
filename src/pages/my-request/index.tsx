import React, {FC, useState} from "react";
import {localeString} from "@/lib/helpers/utils";
import {Button, Col, Row} from "antd";
import Cookies from "js-cookie";
import {MyRequestCommon} from "@/components/my-request/MyRequest";
import {MainBookDemand} from "@/components/my-request/MainBookDemand";
import MainBookDemandRequestHistory from "@/components/my-request/MainBookDemandRequestHistory";
import {IBookDemand} from "@/lib/model/myRequest";

interface IMyRequestProps {
  requestHistory: IBookDemand[];
}

const MyRequest: FC<IMyRequestProps> = ({requestHistory}) => {
  const language: string | undefined = Cookies.get("language");

  const [isBookDemand, isNotBookDemand] = useState(false);

  const handleShowBookDemand = () => {
    isNotBookDemand(false);
  };

  const handleShowRequestHistory = () => {
    isNotBookDemand(true);
  };

  return (
    <>
      <div className="pb-20 pl-content-container">
        <Row gutter={[16, 25]}>
          <Col
            xs={{span: 24}}
            sm={{span: 24}}
            md={{span: 6}}
            lg={{span: 6}}
            xl={{span: 6}}
            xxl={{span: 6}}
          >
            <MyRequestCommon language={language} />
          </Col>

          <Col
            xs={{span: 24}}
            sm={{span: 24}}
            md={{span: 18}}
            lg={{span: 16}}
            xl={{span: 18}}
            xxl={{span: 18}}
          >
            <div className="lg:pl-10 w-full xl:w-10/12 md:pl-4">
              <h3 className="text-left section-title md:pt-12">
                {localeString(language, "bookDemand")}
              </h3>
              <div className="w-full flex justify-between gap-4 pt-4">
                <div className="w-full">
                  <Button
                    onClick={handleShowBookDemand}
                    className={`${
                      !isBookDemand
                        ? "myRequestPrimaryButton"
                        : " myRequesSecondarytButton"
                    }`}
                  >
                    {localeString(language, "bookDemandRequest")}
                  </Button>
                </div>
                <div className="w-full">
                  <div className="w-full">
                    <Button
                      onClick={handleShowRequestHistory}
                      className={`${
                        isBookDemand
                          ? "myRequestPrimaryButton"
                          : " myRequesSecondarytButton"
                      }`}
                    >
                      {localeString(language, "requestHistory")}
                    </Button>
                  </div>
                </div>
              </div>
              {!isBookDemand && <MainBookDemand />}
              {isBookDemand && (
                <MainBookDemandRequestHistory
                  requestHistory={requestHistory}
                  language={language}
                />
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default MyRequest;
