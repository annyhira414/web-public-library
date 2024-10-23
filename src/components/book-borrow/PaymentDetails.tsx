import { Button, Col, Row } from "antd";
import { CustomRadioGroup } from "../controls";
import { FC } from "react";
import { currencyFormatter, localeString } from "@/lib/helpers/utils";
import { TbCurrencyTaka } from "react-icons/tb";

interface IPaymentDetails {
  paymentData: any;
  language: string | undefined;
}

const PaymentDetails: FC<IPaymentDetails> = ({ language, paymentData }) => {
  return (
    <>
      <div className="bg-library-sky rounded mt-8 h-52">
        <h1 className="section-title text-xl ml-5 lg:ml-10 pt-5">
          {localeString(language, "borrowPayment")}
        </h1>
        <Row className="lg:ml-12 ml-5 space-y-4 mt-4 p-1">
          <Col
            className="flex justify-between"
            xs={{ span: 23 }}
            lg={{ span: 22 }}
          >
            <h3>{localeString(language, "borrowDeliveryfee")}</h3>
            <span className="flex">
              <TbCurrencyTaka className="w-5 h-5" />
              {currencyFormatter(language, paymentData?.delivery_charge)}
            </span>
          </Col>
          <Col
            xs={{ span: 23 }}
            lg={{ span: 22 }}
            className="border-b-2 flex justify-between pb-2 border-library-primary"
          >
            <h3 className="uppercase">{localeString(language, "borrowVat")}</h3>
            <span className="flex">
              <TbCurrencyTaka className="w-5 h-5" />{" "}
              {paymentData?.delivery_charge &&
                currencyFormatter(
                  language,
                  (paymentData?.delivery_charge * 15) / 100
                )}
            </span>
          </Col>
          <Col
            className="uppercase font-bold flex justify-between text-library-primary"
            xs={{ span: 23 }}
            lg={{ span: 22 }}
          >
            <h3>{localeString(language, "borrowTotal")}</h3>
            <span className="flex">
              <TbCurrencyTaka className="w-5 h-5" />
              {paymentData?.delivery_charge &&
                currencyFormatter(
                  language,
                  (paymentData?.delivery_charge * 15) / 100 +
                    paymentData?.delivery_charge
                )}
            </span>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PaymentDetails;
