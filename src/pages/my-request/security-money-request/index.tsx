import React, {FC, useEffect, useState} from "react";
import {localeString} from "@/lib/helpers/utils";
import {Col, Row, message} from "antd";
import Cookies from "js-cookie";
import {getData} from "@/lib/services";
import {
  Accepted,
  Pending,
  Rejected,
  MyRequestCommon,
  ApplyForSecurityMoney,
} from "@/components/my-request";
import AvailableWithdraw from "@/components/my-request/AvailableWithdraw";
import Withdrawn from "@/components/my-request/Withdrawn";
import {IuserDetails617, IuserDetails200} from "@/lib/model/myRequest";

interface ISecurityMoneyRequest {
  language: string | undefined;
  label: string;
}

const SecurityMoneyRequest: FC<ISecurityMoneyRequest> = ({}) => {
  const language: string | undefined = Cookies.get("language");
  const userToken = Cookies.get("token");
  const [status, setStatus] = useState("");
  const [rejectedReasons, setRejectedReasons] = useState<string[]>();
  const [userDetails, setUserDetails] = useState<
    IuserDetails617[] | IuserDetails200[]
  >();
  const [messageApi, contextHolder] = message.useMessage();
  const [statusCode, setStatusCode] = useState<number>();
  const [isReApply, setIsReApply] = useState(false);
  const [isMoneyWithdraw, setIsMoneyWithdraw] = useState<boolean>();
  const [latestData, setLatesData] = useState();

  const errorMsg = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };

  const getLatestMoneyRequest = async () => {
    const res = await getData(
      "public_library/security_money_requests/latest",
      {},
      language,
      userToken
    );

    setStatus(res?.data?.status);
    setIsReApply(res?.data?.is_reapply_able);
    setRejectedReasons(res?.data?.rejected_reasons);
    if (res?.data) {
      setLatesData(res?.data);
    }
  };

  const requestValidate = async () => {
    const res = await getData(
      `public_library/security_money_requests/validate`,
      {},
      language,
      userToken
    );

    if (res?.success) {
      setUserDetails(res?.data);
      setStatusCode(res?.status);
    } else {
      errorMsg(res?.data?.error);
    }
  };

  useEffect(() => {
    requestValidate();
  }, []);

  const user = async () => {
    const res = await getData(
      `public_library/users/profile`,
      {},
      language,
      userToken
    );
    if (res?.success) {
      setIsMoneyWithdraw(res?.data?.is_money_withdraw_requested);
    }
  };
  useEffect(() => {
    user();
  }, []);

  useEffect(() => {
    if (isMoneyWithdraw) getLatestMoneyRequest();
  }, [isMoneyWithdraw]);

  return (
    <>
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
            <MyRequestCommon language={language} />
          </Col>
          <Col
            xs={{span: 24}}
            sm={{span: 24}}
            md={{span: 18}}
            lg={{span: 18}}
            xl={{span: 18}}
            xxl={{span: 18}}
          >
            <div className="lg:pl-20 w-full xl:w-10/12 pb-96 ">
              <h3 className="text-left section-title pb-2 lg:pt-12  md:pt-12">
                {localeString(language, "securityMoneyRequest")}
              </h3>
              {isMoneyWithdraw ? (
                <div>
                  {status === "pending" && <Pending />}
                  {status === "approved" && <Accepted />}
                  {status === "rejected" && (
                    <Rejected
                      setIsMoneyWithdraw={setIsMoneyWithdraw}
                      isReApply={isReApply}
                      rejectedReasons={rejectedReasons}
                    />
                  )}
                  {status === "available_to_withdraw" && <AvailableWithdraw />}
                  {status === "withdrawn" && <Withdrawn />}
                </div>
              ) : (
                <ApplyForSecurityMoney
                  userDetails={userDetails}
                  statusCode={statusCode}
                  requestValidate={requestValidate}
                  user={user}
                />
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default SecurityMoneyRequest;
