import React, {FC, useEffect, useState} from "react";
import Cookies from "js-cookie";
import {getData} from "@/lib/services";
import {
  ISecurityHistorylistData,
} from "../../../lib/model/myRequest/index";
import {History} from "@/components/my-request/securityMoneyRequest/History";

interface IRequestHistory {
  language: string | undefined;
}

const RequestHistory: FC<IRequestHistory> = ({}) => {
  const language: string | undefined = Cookies.get("language");

  const [listData, setListData] = useState<ISecurityHistorylistData[]>([]);

  const getList = async () => {
    const res: any = await getData(
      `public_library/security_money_requests`,
      {},
      language,
      Cookies.get("token")
    );

    if (res?.success) {
      setListData(res?.data);
    }
  };
  useEffect(() => {
    getList();
  }, []);

  return <>{<History language={language} listData={listData} />}</>;
};
export default RequestHistory;
