import {
  commaRemover,
  currencyFormatter,
  localeString,
} from "@/lib/helpers/utils";
import {getData} from "@/lib/services";
import {Col, Row} from "antd";
import Cookies from "js-cookie";
import moment from "moment";
import React, {FC, useEffect, useState} from "react";
import {DataNotFound} from "../common";

interface IfineHistory {
  language: string | undefined;
}
export const FineHistory: FC<IfineHistory> = ({language}) => {
  const [fineHistory, setFineHistory] = useState<any>([]);
  // const language = Cookies.get("language");
  useEffect(() => {
    getFine();
  }, []);

  const getFine = async () => {
    const res = await getData(
      "public_library/payments",
      {purpose: "fine"},
      language,
      Cookies.get("token")
    );
    console.log("payments", res);
    if (res?.success) {
      setFineHistory(res?.data);
    }
  };
  return (
    <div className="mb-24">
      {fineHistory?.length > 0 ? (
        <>
          <Row className="bg-library-primary font-semibold text-library-white pl-8 py-3 rounded-t-lg">
            <Col lg={{span: 4}}>{localeString(language, "fineSl")}</Col>
            <Col lg={{span: 4}}>{localeString(language, "finedate")}</Col>
            <Col lg={{span: 4}}>{localeString(language, "fineAmount")}</Col>
            <Col lg={{span: 4}}>{localeString(language, "fineTrxId")}</Col>
            <Col lg={{span: 6, offset: 2}}>
              {localeString(language, "finePayment")}
            </Col>
          </Row>
          {fineHistory?.map((user: any, i: number) => (
            <Row key={i} className="pl-8 text-library-gray-700 text-sm py-3 ">
              <Col lg={{span: 4}}>{i + 1}</Col>
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
        </>
      ) : (
        <>
          <DataNotFound />
        </>
      )}
    </div>
  );
};
