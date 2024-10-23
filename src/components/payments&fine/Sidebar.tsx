import React, {FC, useEffect, useState} from "react";
import {localeString} from "@/lib/helpers/utils";
import Link from "next/link";
import Cookies from "js-cookie";
import {CommonSidebar} from "@/components/user/common";

interface Isidebar {
  language: string | undefined;
}
export const Sidebar: FC<Isidebar> = ({}) => {
  const language: string | undefined = Cookies.get("language");
  const [isAppRendered, setIsAppRendered] = useState(false);

  useEffect(() => {
    setIsAppRendered(true);
  }, []);
  const sideMenuItems = [
    {
      value: "/payment&fine",
      label: `${localeString(language, "fineFine")}`,
    },

    {
      value: "/payment&fine/paymentHistory",
      label: `${localeString(language, "finePaymentHis")}`,
    },
  ];
  return (
    <div>
      <div className="md:pt-10">
        <div className="  md:bg-white  md:border-gray-300 md:mt-4 md:mb-8 md:shadow-sm md:pb-5 ">
          <h1 className="pt-4 pl-4 card-title mb-4">
            {localeString(language, "fineTitle")}
          </h1>
          <CommonSidebar sideMenuItems={sideMenuItems} />
        </div>
      </div>
    </div>
  );
};
