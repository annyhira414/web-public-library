import React, {FC, useEffect, useState} from "react";
import {localeString} from "@/lib/helpers/utils";
import Link from "next/link";
import Cookies from "js-cookie";
import {CommonSidebar} from "@/components/user/common";

interface ICommon {
  language: string | undefined;
}
export const Common: FC<ICommon> = ({}) => {
  const language: string | undefined = Cookies.get("language");
  const [isAppRendered, setIsAppRendered] = useState(false);

  useEffect(() => {
    setIsAppRendered(true);
  }, []);
  const sideMenuItems = [
    {
      value: "/physical-book-review",
      label: `${localeString(language, "bookConditionReview")}`,
    },

    {
      value: "/physical-book-review/online-book-review",
      label: `${localeString(language, "onlineBookReview")}`,
    },
  ];
  return (
    <div>
      <div className="md:pt-10">
        <div className=" md:bg-white  md:border-gray-300 md:mt-4 md:mb-8 md:shadow-sm md:pb-5 ">
          <h1 className="pt-4 md:pl-4 pl-0  card-title">
            {localeString(language, "bookReview")}
          </h1>
          <div className="lg:pt-0 pt-4 md:pt-0">
            <CommonSidebar sideMenuItems={sideMenuItems} />
          </div>
        </div>
      </div>
    </div>
  );
};
