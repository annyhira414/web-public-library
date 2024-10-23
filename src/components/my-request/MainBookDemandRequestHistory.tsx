import React, {FC, useState, useEffect} from "react";
import {BookDemandRequstHistory} from "@/components/my-request/bookDemandRequetHistory/BookDemandRequstHistory";
import {getData} from "@/lib/services";
import Cookies from "js-cookie";
import {IBookDemand} from "@/lib/model/myRequest";

interface IMainBookDemandRequestHistoryProps {
  language?: string | undefined;
  requestHistory: IBookDemand[];
}

const MainBookDemandRequestHistory: FC<
  IMainBookDemandRequestHistoryProps
> = ({}) => {
  const language: string | undefined = Cookies.get("language");

  const [requestHistory, setRequestHistory] = useState<IBookDemand[]>([]);

  const requestHistoryData = async () => {
    const res = await getData(
      `public_library/requested_biblios`,
      {},
      language,
      Cookies.get("token")
    );
    if (res?.success) {
      setRequestHistory(res?.data);
    }
  };

  useEffect(() => {
    requestHistoryData();
  }, []);

  console.log("requestHistory", requestHistory);

  return (
    <>
      <div className="w-full">
        <BookDemandRequstHistory
          requestHistory={requestHistory}
          language={language}
        />
      </div>
    </>
  );
};

export default MainBookDemandRequestHistory;
