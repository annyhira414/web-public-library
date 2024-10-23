import React, {useEffect, useState} from "react";
import {Sidebar} from "@/components/payments&fine/Sidebar";
import Cookies from "js-cookie";
import {Button, Col, Row} from "antd";
import {
  commaRemover,
  currencyFormatter,
  localeString,
} from "@/lib/helpers/utils";
import moment from "moment";
import {getData} from "@/lib/services";
import {DataNotFound} from "@/components/common";

const PaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState<any>([]);
  const language = Cookies.get("language");

  useEffect(() => {
    getPayments();
  }, []);

  const getPayments = async () => {
    const res = await getData(
      "public_library/payments",
      {},
      language,
      Cookies.get("token")
    );
    console.log("payments", res);
    if (res?.success) {
      setPaymentHistory(res?.data);
    }
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
          <div className="lg:pl-10 w-full xl:w-10/12 md:pl-4 mb-24">
            <h3 className="text-left text-xl section-title md:pt-12">
              {localeString(language, "finePaymentHis")}
            </h3>
            {paymentHistory?.length > 0 ? (
              <>
                <div className="pt-6">
                  <Row className="bg-library-primary font-semibold text-library-white pl-8 py-3 rounded-t-lg">
                    <Col lg={{span: 4}}>{localeString(language, "fineSl")}</Col>
                    <Col lg={{span: 4}}>
                      {localeString(language, "finedate")}
                    </Col>
                    <Col lg={{span: 4}}>
                      {localeString(language, "fineAmount")}
                    </Col>
                    <Col lg={{span: 4}}>
                      {localeString(language, "fineTrxId")}
                    </Col>
                    <Col lg={{span: 6, offset: 2}}>
                      {localeString(language, "finePayment")}
                    </Col>
                  </Row>
                  {paymentHistory?.map((user: any, index: number) => (
                    <Row
                      key={user.id}
                      className="pl-8 text-library-gray-700 text-sm py-3 "
                    >
                      <Col lg={{span: 4}}>
                        {/* {currencyFormatter(language, parseInt(user?.id))} */}
                        {index + 1}
                      </Col>
                      <Col lg={{span: 4}}>
                        {currencyFormatter(
                          language,
                          parseInt(moment(user?.created_at)?.format("D"))
                        )}
                        {"."}
                        {currencyFormatter(
                          language,
                          parseInt(moment(user?.created_at)?.format("M"))
                        )}
                        {"."}
                        {commaRemover(
                          currencyFormatter(
                            language,
                            parseInt(moment(user?.created_at)?.format(`YYYY`))
                          )
                        )}
                      </Col>
                      <Col className="pl-3" lg={{span: 4}}>
                        {currencyFormatter(language, parseInt(user?.amount))}
                      </Col>
                      <Col className="pl-4" lg={{span: 4}}>
                        {commaRemover(
                          currencyFormatter(language, parseInt(user?.trx_id))
                        )}
                      </Col>
                      <Col className="text-right" lg={{span: 4, offset: 2}}>
                        {user?.payment_method}
                      </Col>
                    </Row>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="mt-6">
                  <DataNotFound />
                </div>
              </>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PaymentHistory;

