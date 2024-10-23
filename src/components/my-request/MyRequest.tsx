import React, {FC, useEffect, useState} from "react";
import {localeString} from "@/lib/helpers/utils";
import Cookies from "js-cookie";
import {CommonSidebar} from "@/components/user/common";

interface IMyRequestCommon {
  language: string | undefined;
}
export const MyRequestCommon: FC<IMyRequestCommon> = ({}) => {
  const language: string | undefined = Cookies.get("language");
  const [isAppRendered, setIsAppRendered] = useState(false);

  useEffect(() => {
    setIsAppRendered(true);
  }, []);
  const sideMenuItems = [
    {
      value: "/my-request",
      label: `${localeString(language, "bookDemandRequest")}`,
    },

    {
      value: "/my-request/book-transfer-requests",
      label: `${localeString(language, "bookTransferRequests")}`,
    },
    {
      value: "/my-request/library-card-request",
      label: `${localeString(language, "libraryCardRequest")}`,
    },
    {
      value: "/my-request/security-money-request",
      label: `${localeString(language, "securityMoneyRequest")}`,
    },
  ];
  return (
    <div>
      <div className="md:pt-10">
        <div className="md:bg-white  md:border-gray-300 md:mt-4 md:mb-8 md:shadow-sm md:pb-5 ">
          <h1 className="pt-4 lg:pl-4 pl-0 md:pl-4 card-title">
            {localeString(language, "myRequest")}
          </h1>
          <div className="lg:pt-0 pt-4 md:pt-0">
            <CommonSidebar sideMenuItems={sideMenuItems} />
          </div>
        </div>
      </div>
    </div>
  );
};
